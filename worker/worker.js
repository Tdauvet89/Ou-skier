/**
 * Cloudflare Worker — Proxy Meteoblue pour Ou-skier
 *
 * Routes :
 *   GET /weather?lat=X&lon=X&asl=X  → my.meteoblue.com  (cache Cloudflare 2h)
 *   GET /search?query=X             → meteoblue.com/search (pas de cache)
 *
 * Variable d'environnement requise :
 *   METEOBLUE_API_KEY  (wrangler secret put METEOBLUE_API_KEY)
 */

const CORS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
};

const WEATHER_TTL_SECONDS = 2 * 60 * 60; // 2h

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
            default:
                return jsonError("Not Found", 404);
        }
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
    const upstream = new URL(
        "https://my.meteoblue.com/packages/basic-day_snowice-day_wind-day"
    );
    upstream.searchParams.set("apikey", env.METEOBLUE_API_KEY);
    upstream.searchParams.set("lat", lat);
    upstream.searchParams.set("lon", lon);
    upstream.searchParams.set("asl", asl);
    upstream.searchParams.set("format", "json");
    upstream.searchParams.set("tz", "Europe/Paris"); // dates en heure locale française

    // Clé de cache sans la clé API (sûr à logguer / inspecter)
    const cacheKey = new Request(
        `https://cache.ou-skier/weather?lat=${lat}&lon=${lon}&asl=${asl}`
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
// Helpers
// ---------------------------------------------------------------------------
function jsonError(message, status) {
    return new Response(JSON.stringify({ error: message }), {
        status,
        headers: { "Content-Type": "application/json", ...CORS },
    });
}
