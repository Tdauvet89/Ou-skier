/**
 * Cloudflare Worker — Proxy Meteoblue pour Ou-skier
 *
 * Routes :
 *   GET /weather?lat=X&lon=X&asl=X  → my.meteoblue.com  (cache Cloudflare 2h)
 *   GET /search?query=X             → meteoblue.com/search (pas de cache)
 *
 * Cron :
 *   0 7 * * *  → vérification quotidienne des crédits API Météoblue
 *               → email d'alerte si crédits < CREDIT_THRESHOLD
 *
 * Variables d'environnement requises :
 *   METEOBLUE_API_KEY  (wrangler secret put METEOBLUE_API_KEY)
 *   MF_API_KEY         (wrangler secret put MF_API_KEY)
 *                       → token JWT Météo France DPBRA (portail-api.meteofrance.fr)
 *   RESEND_API_KEY     (wrangler secret put RESEND_API_KEY)
 *                       → compte gratuit sur resend.com (3 000 emails/mois)
 *
 * KV namespace requis (anti-spam 24h) :
 *   ALERTS_KV  → wrangler kv:namespace create ALERTS_KV
 *               → coller l'ID retourné dans wrangler.toml
 */

const CORS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
};

const WEATHER_TTL_SECONDS = 2 * 60 * 60; // 2h

// ─── Alertes crédits ─────────────────────────────────────────────────────────
/** Envoyer un email si les crédits restants tombent sous ce seuil */
const CREDIT_THRESHOLD = 100;
/** Destinataire des alertes */
const ALERT_EMAIL = "tdauvet@gmail.com";

// ---------------------------------------------------------------------------

export default {
    async fetch(request, env, ctx) {
        if (request.method === "OPTIONS") {
            return new Response(null, { status: 204, headers: CORS });
        }
        if (request.method !== "GET") {
            return jsonError("Method Not Allowed", 405);
        }

        const url = new URL(request.url);

        switch (url.pathname) {
            case "/weather":
                return handleWeather(url, env, ctx);
            case "/search":
                return handleSearch(url, env);
            case "/bra":
                return handleBRA(url, env);
            default:
                return jsonError("Not Found", 404);
        }
    },

    /**
     * Déclenché par le Cron "0 7 * * *" (tous les jours à 7h UTC).
     * Vérifie les crédits Météoblue et envoie un email si nécessaire.
     */
    async scheduled(event, env, ctx) {
        ctx.waitUntil(checkMeteoblueCredits(env));
    },
};

// ---------------------------------------------------------------------------
// /weather?lat=X&lon=X&asl=X
// ---------------------------------------------------------------------------
async function handleWeather(url, env, ctx) {
    const lat = url.searchParams.get("lat");
    const lon = url.searchParams.get("lon");
    const asl = url.searchParams.get("asl") ?? "1000";

    if (!lat || !lon) {
        return jsonError("Paramètres lat et lon requis", 400);
    }

    // URL upstream avec la clé API (jamais exposée au client)
    // Packages : basic-day + snowice-day + wind-day (vues journalières)
    //          + basic-3h (vue horaire 3h : pictocode, temp, vent, précipitations)
    const upstream = new URL(
        "https://my.meteoblue.com/packages/basic-day_snowice-day_wind-day_basic-3h"
    );
    upstream.searchParams.set("apikey", env.METEOBLUE_API_KEY);
    upstream.searchParams.set("lat", lat);
    upstream.searchParams.set("lon", lon);
    upstream.searchParams.set("asl", asl);
    upstream.searchParams.set("format", "json");
    upstream.searchParams.set("tz", "Europe/Paris"); // dates en heure locale française

    // Clé de cache sans la clé API (sûr à logguer / inspecter)
    // v=3 : force l'invalidation du cache v=2 qui ne contenait pas data_3h
    const cacheKey = new Request(
        `https://cache.ou-skier/weather?lat=${lat}&lon=${lon}&asl=${asl}&v=3`
    );
    const cache = caches.default;

    // Tentative de lecture du cache Cloudflare (partagé entre tous les users)
    const cached = await cache.match(cacheKey);
    if (cached) {
        const resp = new Response(cached.body, cached);
        resp.headers.set("X-Cache", "HIT");
        resp.headers.set("Access-Control-Allow-Origin", "*");
        return resp;
    }

    // Cache miss → appel Meteoblue
    const upstreamResp = await fetch(upstream.toString());

    if (!upstreamResp.ok) {
        const text = await upstreamResp.text();
        console.error(`Meteoblue error ${upstreamResp.status}: ${text}`);
        return new Response(text, { status: upstreamResp.status, headers: CORS });
    }

    const body = await upstreamResp.arrayBuffer();
    const response = new Response(body, {
        status: 200,
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": `public, max-age=${WEATHER_TTL_SECONDS}`,
            "X-Cache": "MISS",
            ...CORS,
        },
    });

    // Stocker en cache de façon asynchrone (ne bloque pas la réponse)
    ctx.waitUntil(cache.put(cacheKey, response.clone()));
    return response;
}

// ---------------------------------------------------------------------------
// /search?query=X
// ---------------------------------------------------------------------------
async function handleSearch(url, env) {
    const query = url.searchParams.get("query");

    if (!query || query.length < 2) {
        return jsonError("Paramètre query trop court (min 2 caractères)", 400);
    }

    const upstream = `https://www.meteoblue.com/en/server/search/query3?query=${encodeURIComponent(query)}&apikey=${env.METEOBLUE_API_KEY}`;
    const resp = await fetch(upstream);
    const text = await resp.text();

    return new Response(text, {
        status: resp.status,
        headers: { "Content-Type": "application/json", ...CORS },
    });
}

// ---------------------------------------------------------------------------
// /bra?massif-id=X&format=xml|pdf
// Proxy vers l'API publique Météo France DPBRA — clé jamais exposée au client
// ---------------------------------------------------------------------------
async function handleBRA(url, env) {
    const massifId = url.searchParams.get("massif-id");
    const format   = url.searchParams.get("format") ?? "xml";

    if (!massifId) {
        return jsonError("Paramètre massif-id requis", 400);
    }
    if (!["xml", "pdf"].includes(format)) {
        return jsonError("format doit être xml ou pdf", 400);
    }

    if (!env.MF_API_KEY) {
        console.error("[BRA] MF_API_KEY non configurée");
        return jsonError("Configuration serveur incomplète", 503);
    }

    const upstream = `https://public-api.meteofrance.fr/public/DPBRA/v1/massif/BRA?id-massif=${encodeURIComponent(massifId)}&format=${format}`;

    const resp = await fetch(upstream, {
        headers: { apikey: env.MF_API_KEY },
    });

    const body = await resp.arrayBuffer();
    const contentType = format === "pdf" ? "application/pdf" : "text/xml; charset=utf-8";

    return new Response(body, {
        status: resp.status,
        headers: { "Content-Type": contentType, ...CORS },
    });
}

// ---------------------------------------------------------------------------
// Vérification quotidienne des crédits Météoblue (appelée par le Cron)
// ---------------------------------------------------------------------------
/**
 * Interroge l'endpoint credits de Météoblue.
 * Si les crédits restants sont sous CREDIT_THRESHOLD, envoie un email d'alerte.
 * Un KV flag évite les envois répétés sur 24h.
 */
async function checkMeteoblueCredits(env) {
    try {
        const resp = await fetch(
            `https://my.meteoblue.com/packages/credits?apikey=${env.METEOBLUE_API_KEY}&format=json`
        );

        if (!resp.ok) {
            console.error(`[Credits] Erreur API Météoblue: ${resp.status}`);
            return;
        }

        const data = await resp.json();
        console.log("[Credits] Réponse brute:", JSON.stringify(data));

        // Météoblue peut retourner le champ sous différents noms selon le plan
        const remaining =
            data?.credits_remaining ??
            data?.remaining ??
            data?.credits?.remaining ??
            data?.quota?.remaining ??
            null;

        if (remaining === null) {
            console.warn("[Credits] Format de réponse inconnu — vérifier les logs ci-dessus");
            return;
        }

        console.log(`[Credits] Crédits restants : ${remaining} (seuil : ${CREDIT_THRESHOLD})`);

        if (remaining >= CREDIT_THRESHOLD) {
            // Tout va bien, rien à faire
            return;
        }

        // Crédits bas → vérifier l'anti-spam KV (1 email max / 24h)
        try {
            const lastAlert = await env.ALERTS_KV.get("last_credit_alert");
            if (lastAlert) {
                const hoursSince = (Date.now() - parseInt(lastAlert)) / (1000 * 60 * 60);
                if (hoursSince < 24) {
                    console.log(`[Credits] Alerte déjà envoyée il y a ${Math.round(hoursSince)}h — skip`);
                    return;
                }
            }
        } catch (kvErr) {
            // KV non configuré → on envoie quand même l'email (setup incomplet)
            console.warn("[Credits] KV non disponible (anti-spam désactivé):", kvErr.message);
        }

        await sendCreditAlert(remaining, env);

        // Mémoriser l'heure d'envoi (expire automatiquement après 24h)
        try {
            await env.ALERTS_KV.put("last_credit_alert", Date.now().toString(), {
                expirationTtl: 86400,
            });
        } catch (_) { /* KV optionnel */ }

    } catch (err) {
        console.error("[Credits] Erreur inattendue:", err.message);
    }
}

// ---------------------------------------------------------------------------
// Envoi email d'alerte via Resend (resend.com — gratuit, 3 000 emails/mois)
// ---------------------------------------------------------------------------
/**
 * Envoie un email d'alerte à ALERT_EMAIL via l'API Resend.
 * Prérequis : wrangler secret put RESEND_API_KEY
 */
async function sendCreditAlert(remaining, env) {
    if (!env.RESEND_API_KEY) {
        console.error("[Credits] RESEND_API_KEY non configurée — email non envoyé");
        return;
    }

    const html = `
        <div style="font-family:sans-serif;max-width:520px;margin:auto;padding:24px">
            <h2 style="color:#e74c3c;margin-top:0">⚠️ Alerte crédits API Météoblue</h2>
            <p>Il ne reste que <strong>${remaining} crédits</strong> sur ton compte Météoblue.</p>
            <p>
                Les prévisions météo sur <strong>Ou-skier</strong> risquent de ne plus fonctionner
                une fois les crédits épuisés.
            </p>
            <p style="margin:24px 0">
                <a href="https://my.meteoblue.com/account"
                   style="background:#2980b9;color:white;padding:10px 20px;border-radius:6px;text-decoration:none;font-weight:bold">
                    Recharger les crédits →
                </a>
            </p>
            <hr style="border:none;border-top:1px solid #eee;margin:24px 0">
            <p style="color:#aaa;font-size:12px;margin:0">
                Cette alerte est envoyée automatiquement chaque jour tant que les crédits
                sont sous ${CREDIT_THRESHOLD}.<br>
                Source : Worker <em>ou-skier-proxy</em> (Cloudflare)
            </p>
        </div>
    `;

    const resp = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            from: "Ou-skier Monitor <onboarding@resend.dev>",
            to: [ALERT_EMAIL],
            subject: `⚠️ Météoblue : plus que ${remaining} crédits API`,
            html,
        }),
    });

    if (resp.ok) {
        console.log(`[Credits] ✅ Email d'alerte envoyé à ${ALERT_EMAIL} (${remaining} crédits restants)`);
    } else {
        const text = await resp.text();
        console.error(`[Credits] ❌ Échec envoi email: ${resp.status} — ${text}`);
    }
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function jsonError(message, status) {
    return new Response(JSON.stringify({ error: message }), {
        status,
        headers: { "Content-Type": "application/json", ...CORS },
    });
}
