# Changelog

Tous les changements notables de ce projet seront documentés dans ce fichier.
Format : [Keep a Changelog](https://keepachangelog.com/) — Versioning : `MAJEUR.MINEUR.PATCH`

---

## [7.27.5] - 2026-02-27

### Corrigé
- **Widget qualité neige** (`index.html`) :
  - Logs debug `[BRA debug]` ajoutés pour diagnostiquer l'extraction QUALITE > TEXTE
  - Lien "Voir le BERA" : `display: block` pour qu'il s'affiche sous le nom du massif

---

## [7.27.4] - 2026-02-27

### Corrigé
- **Widget qualité neige — extraction QUALITE > TEXTE vide** (`index.html`) :
  - Remplacement de `indexOf()` par split `\r?\n` + regex — plus robuste sur CDATA
  - Pattern `/limites\s+skiables/i` et `/tat\s+de\s+la\s+neige/i` (insensible à la casse et aux accents)

---

## [7.27.3] - 2026-02-27

### Modifié
- **Widget qualité neige — résumés texte** (`index.html`) :
  - Suppression de la section "Enneigement"
  - "Limites skiables" : 1re phrase extraite de `QUALITE > TEXTE`
  - "État de la neige" : texte complet de la section `QUALITE > TEXTE`
  - Parsing JS automatique via `extractSection()` dans `fetchBRAData()`

---

## [7.27.2] - 2026-02-27

### Modifié
- **Widget qualité neige — alignement précis sur maquette Figma (API)** (`index.html`) :
  - Label section : Garnett Medium 16px `#1F2023` (était 14px bold)
  - Texte description : Garnett Medium 13px `#5E7690` (gris muted, via `.qualite-bloc-text`)
  - Fond cellule texte : `#F9FAFC` (gris clair Figma, était `#FFF`)
  - Header date "Le JJ/MM" : aligné à gauche (`text-align: left; padding-left: 16px`)
  - Colonne massif : largeur 277px, padding 30px 24px (spec Figma)
  - Lien BERA : 14px, `letter-spacing: -0.15px` (spec Inter Figma)

---

## [7.27.1] - 2026-02-27

### Modifié
- **Widget qualité neige — mise en forme selon maquette Figma** (`index.html`) :
  - Labels désormais inline gras (`**Enneigement** : texte...`) au lieu d'un bloc séparé au-dessus
  - `<thead>` ajouté avec colonnes "Massif" et date bulletin ("Le JJ/MM") — date retirée de la cellule
  - `.qualite-bloc` devient un `<p>` ; `.qualite-bloc-label` passe en Garnett 14px 600 (même police que le texte)

---

## [7.27.0] - 2026-02-27

### Ajouté
- **Widget "Qualité de la neige" — 3 sections structurées** (`index.html`) : la colonne texte est désormais découpée en 3 blocs labellisés : **Enneigement** (extrait de `ENNEIGEMENT TEXTE`), **Limites skiables** (formaté depuis `LimiteNord`/`LimiteSud`), **État de la neige** (extrait de `QUALITE TEXTE`). Chaque bloc est conditionnel (affiché uniquement si la donnée est présente).
- **Lien "Voir le BERA"** dans la colonne massif du widget qualité neige : ouvre la modale PDF BERA existante via `setBeraModal`, même comportement que dans le tableau météo.

### Modifié
- Condition d'affichage du widget élargie : s'affiche si `qualiteNeige`, `enneigementTexte` **ou** `enneigement` sont présents (au lieu de `qualiteNeige` uniquement).
- `td:first-child` passe à `min-width: 200px` + `vertical-align: top`.

### Technique
- `fetchBRAData` : extraction de `enneigementTexte` = `ENNEIGEMENT TEXTE` + stockage dans `_detail`
- Nouvelles classes locales : `.qualite-section`, `.qualite-bloc`, `.qualite-bloc-label`, `.qualite-bloc-text`, `.qualite-neige-bera-link`

## [7.26.0] - 2026-02-27

### Ajouté
- **Widget "Qualité de la neige"** (`index.html`) : nouvelle section positionnée entre les tableaux neige et les prévisions météo — une ligne par massif (dédupliqué par `massifId`), affichant le nom du massif + date MAJ et le texte `qualiteNeige` extrait du BERA de Météo France. Conditionnel : n'apparaît que si au moins un massif a un texte qualité renseigné.

### Technique
- `.qualite-neige-table` ajouté dans `<style>` local (`index.html`) : override `td:first-child` (min-width 180px) et `td:not(:first-child)` (text-align left, bg blanc, Garnett 14px)
- `design-system.html` : 2 nouvelles sections showcase — "Tableau Manteau neigeux (.manteau-last-fall)" et "Widget Qualité de la neige" ; version mise à jour v7.7 → v7.26
- `DESIGN_SYSTEM.md` : documentation de `.manteau-last-fall` + section "Widget Qualité de la neige" complète (JSX, classes, source données) ; v3.4 → v3.5

---

## [7.25.1] - 2026-02-27

### Corrigé
- **Chutes de neige × 10 dans widget comparatif météo** (`index.html`) : `processWeatherData` lisait `snowaccumulation` en mm sans division par 10 — la valeur `snowCm` affichée dans la vue jour comparative était ~10× trop élevée (ex : 76 cm au lieu de 8 cm). Même correctif que le fix `processSnowDataForResort` du [7.23.5].

---

## [7.25.0] - 2026-02-27

### Ajouté
- **Tracking `query_secteur`** (`index.html`) : le paramètre `query_secteur` (texte tapé par l'utilisateur) est désormais inclus dans l'event GA4 `ajout_secteur` — permet de savoir quelle recherche a mené à l'ajout d'un secteur.
- **Event `recherche_vide`** (`index.html`) : nouvel event GA4 déclenché lorsqu'une recherche renvoie 0 résultats — paramètre `query_secteur` pour identifier les requêtes sans résultat.
- **Fallbacks champs nullables** (`index.html`) : `nom_secteur` et `region_secteur` utilisent désormais `'(vide)'` et `'(inconnue)'` comme valeur de repli si l'API renvoie `undefined`/`null`/`""` — élimine les "(not set)" dans GA4 et rend l'origine du problème explicite.

---

## [7.24.0] - 2026-02-25

### Ajouté
- **Dashboard partageable par URL** (`index.html`) : bouton "Partager" dans le bloc secteurs — génère une URL avec les secteurs encodés en base64 (`?s=...`) et la copie dans le presse-papiers. Au clic, le bouton bascule en "Lien copié !" pendant 2,5s.
- **Lecture du paramètre `?s=`** (`index.html`) : au chargement, si l'URL contient `?s=...`, les secteurs sont décodés et chargés à la place du localStorage — permet d'ouvrir un dashboard pré-configuré (ex: "Grand Tourmalet 4 secteurs", "Vallée d'Ossau 5 secteurs").
- **Icône `share` et `check`** (`icons.js`) : deux nouvelles icônes SVG ajoutées à `uiSvg` pour le bouton de partage.
- **Tracking GA4 `partager_dashboard`** (`index.html`) : event GA4 au clic sur "Partager" — paramètres `nb_secteurs` (entier), `secteurs` (noms séparés par virgule), `altitudes` (altitudes séparées par virgule).

### Technique
- `icons.js` v7.14.0 → v7.24.0 (cache bust — ajout `share` + `check`)

---

## [7.23.5] - 2026-02-25

### Corrigé
- **Chutes de neige × 10** (`index.html`) : `snowaccumulation` est en **mm** dans l'API Meteoblue, pas en cm — division par 10 ajoutée pour `snowByDay` et `lastSnowCm` → valeurs affichées correctes (ex : 80.7 mm → 8 cm au lieu de 81 cm)

### Technique
- Logs debug neige supprimés (`index.html`)

---

## [7.23.4] - 2026-02-25

### Corrigé
- **Vue horaire — data_1h absent** (`index.html`) : le worker actuel (`basic-3h`) retourne `data_3h` pour les appels frais ; le cache CF retourne `data_1h` (ancienne réponse). `processHourlyDataForResort` plantait sur les cache-miss. Fix : fallback `data_1h → data_3h`, filtre `hour % 3` activé uniquement pour `data_1h`.

---

## [7.23.3] - 2026-02-24

### Technique
- **PROXY_URL** (`index.html`) : URL rétablie vers `ou-skier-proxy.tdauvet.workers.dev` (revert d'une correction erronée). Le vrai fix est un redéploiement du worker pour activer la route `/bra`.

---

## [7.23.2] - 2026-02-24

### Technique
- **G1 — Guardrail cache BRA** (`index.html`) : `setWeatherCache` ne sauvegarde plus `braData: {}` — si le BRA est en échec, `braData` est omis du cache (valeur `undefined`). Empêche le cache empoisonné de propager l'absence de BERA sur les rechargements suivants.

---

## [7.23.1] - 2026-02-24

### Corrigé
- **Badges BERA absents** (`index.html`) : régression silencieuse — quand un fetch BRA échouait, le cache était écrit avec `braData: {}` ; lors des rechargements suivants, le chemin cache faisait un `return` prématuré sans jamais atteindre le bloc BRA → badges jamais affichés
  - **Fix 1** : `CACHE_VERSION` 12 → 13 pour invalider les caches corrompus et forcer un fetch frais
  - **Fix 2** : dans le chemin cache, si `braData` est vide, le BRA est re-fetché en arrière-plan sans bloquer l'affichage météo
  - **Refacto** : extraction de `fetchBRAForResorts()` pour éliminer la duplication du bloc BRA dans `loadInitialWeatherData` et `fetchAllWeatherData`

### Technique
- `CACHE_VERSION` 12 → 13 (cache BRA corrompu)

---

## [7.23.0] - 2026-02-24

### Modifié
- **Tableaux neige** (`index.html`) : la section neige est désormais scindée en 2 tableaux côte à côte — "Manteau neigeux" (colonne unique avec profondeur actuelle) et "Chutes de Neige (5 jours)" (J à J+4)
- **Chutes de neige** (`index.html`) : suppression de D-2 et D-1 — on n'affiche plus que 5 jours à partir d'aujourd'hui (offset 0 → 4)

### Technique
- `index.html` : layout `.snow-tables-row` flex côte-à-côte + responsive media query ≤ 900px → colonne

---

## [7.22.2] - 2026-02-24

### Corrigé
- **Manteau neigeux à 0** (`index.html`) : l'API Météoblue ne retourne pas `snowdepth` seul mais `snowdepth_mean` (agrégat journalier) — lecture corrigée de `dayData.snowdepth` → `dayData.snowdepth_mean`

### Technique
- Logs diagnostic `[Snow]` supprimés après identification du bug

---

## [7.22.1] - 2026-02-24

### Technique
- **Log diagnostic neige** (`index.html`) : ajout de `console.log` dans `processSnowDataForResort` pour vérifier si `snowdepth` et `snowaccumulation` sont présents dans `data_day` (debug package `snowice-day`)

---

## [7.22.0] - 2026-02-24

### Corrigé
- **Vue horaire vide** (`index.html`) : `data_3h` remplacé par `data_1h` — l'API Météoblue retourne effectivement les données sous la clé `data_1h`, la vue par heure est maintenant fonctionnelle
- **Manteau neigeux à 0** (`index.html`) : ajout d'un fallback sur `data_1h.snowdepth` (à midi du jour J) si `data_day.snowdepth` est absent ou nul
- **Syntaxe JSX invalide** (`index.html`) : remplacement de `html\`<span>...\`` par `<span>...` pur JSX dans le rendu de la dernière chute de neige

### Technique
- `CACHE_VERSION` 11 → 12 (invalide le localStorage v11 sans `data_1h`)
- Cache key CF v=3 → v=4 dans `worker.js` (invalide le cache Cloudflare — nécessite `wrangler deploy`)
- Filtre `hour % 3 !== 0` dans la boucle `data_1h` : affiche 8 créneaux/jour (00h, 03h, …, 21h) même avec des données 1h

---

## [7.21.0] - 2026-02-24

### Ajouté
- **Colonne "Manteau neigeux"** (`index.html`, `design-system.css`) : nouvelle colonne en position 2 du tableau des chutes de neige, affichant l'hauteur totale du manteau neigeux (snowdepth Météoblue, en cm) ainsi que la date et le cumul de la dernière chute de neige — zéro appel API supplémentaire, données déjà disponibles dans le package `snowice-day`

### Technique
- `processSnowDataForResort()` : extraction de `snowdepth` (m → cm) et calcul de la dernière chute (scan rétrospectif sur `snowaccumulation`)
- `.manteau-last-fall` ajouté dans `design-system.css` (10px, #5E7690)
- `design-system.css` v7.20.0 → v7.21.0 (cache bust)

---

## [7.10.1] - 2026-02-21

### Sécurité
- **Clé API Météo France retirée du JS client** : le JWT `MF_API_KEY` (qui contenait l'identifiant `tdauvet@carbon.super` décodable en base64) était visible dans le source de la page. Il est maintenant stocké exclusivement en secret Cloudflare (`wrangler secret put MF_API_KEY`).
- **Nouveau proxy Worker `/bra`** (`worker/worker.js`) : les deux appels DPBRA (XML bulletin + PDF) passent désormais par `PROXY_URL/bra?massif-id=X&format=xml|pdf` — la clé est injectée côté serveur via `env.MF_API_KEY` et jamais transmise au navigateur.

### Technique
- `index.html` : suppression de la constante `MF_API_KEY`, mise à jour de `fetchBRAData()` et du fetch PDF inline
- `worker.js` : ajout route `case "/bra"` + fonction `handleBRA()` — valide `massif-id`, `format` (xml|pdf), retourne le Content-Type adapté
- **Setup ops requis** : `wrangler secret put MF_API_KEY` puis `wrangler deploy`

---

## [7.10.0] - 2026-02-21

### Ajouté
- **Google Analytics — tracking toggle vue météo** (`index.html`) : événement `vue_meteo_switch` envoyé à GA4 (G-CB6G3EL32M) à chaque clic sur "Par jour" ou "Par heure"
  - Paramètre `vue` : `"jour"` ou `"heure"`
  - Permet de mesurer dans GA4 : **quelle vue est la plus utilisée** (Événements → `vue_meteo_switch` → détail par paramètre `vue`)

---

## [7.9.0] - 2026-02-21

### Ajouté
- **Alerte email crédits Météoblue** (`worker/worker.js`, `worker/wrangler.toml`) :
  - Cron Cloudflare `0 7 * * *` (7h UTC) — vérification quotidienne automatique
  - Appel endpoint `GET /packages/credits?apikey=…` → lecture des crédits restants
  - Si crédits < **100** (seuil `CREDIT_THRESHOLD`) → email d'alerte HTML envoyé à `tdauvet@gmail.com` via **Resend** (service gratuit, 3 000 emails/mois)
  - KV namespace `ALERTS_KV` (anti-spam) : 1 email max toutes les 24h
  - Parsing défensif de la réponse credits (plusieurs formats Météoblue couverts)

### Technique
- `wrangler.toml` : ajout `[triggers] crons` + `[[kv_namespaces]]` ALERTS_KV
- `worker.js` : ajout handler `scheduled`, fonctions `checkMeteoblueCredits` + `sendCreditAlert`
- **Setup requis côté ops** (voir README worker) :
  1. `wrangler kv:namespace create ALERTS_KV` → coller l'ID dans `wrangler.toml`
  2. Compte Resend gratuit → `wrangler secret put RESEND_API_KEY`

---

## [7.8.0] - 2026-02-21

### Ajouté
- **Tooltips vue horaire** : chaque élément de cellule porte désormais un tooltip explicatif natif (`title`)
  - Icône météo : description des conditions (ex : "Ensoleillé", "Neige légère")
  - Température : "Température instantanée"
  - Vent : "Vent moyen — vient de {direction}" (ex : "Vent moyen — vient de Nord-Est") — ou "Vent calme" si vitesse = 0
  - Précipitations : "Cumul neige sur 3h : X mm" / "Cumul pluie sur 3h : X mm" / "Aucune précipitation"

### Modifié
- **`getWindDirectionDisplay`** : passage de 8 à **16 points cardinaux** (précision 22.5° au lieu de 45°), noms abrégés en français (NO, NNO, SSO…) et ajout du champ `label` avec le nom complet (ex : "Nord-Nord-Est")
- **Données slot horaire** : champ `windLabel` ajouté dans chaque slot 3h pour alimenter les tooltips

---

## [7.7.0] - 2026-02-21

### Corrigé
- **Vitesse du vent affichée à 0** (vue journalière ET horaire) : l'API Météoblue retourne `windspeed` en **m/s** (`units.windspeed = "ms-1"`), pas en km/h. L'app faisait `Math.round(0.22)` → 0 au lieu de `Math.round(0.22 × 3.6)` → 1 km/h
  - Vue horaire : `d3h.windspeed` × 3.6 avant `Math.round`
  - Vue journalière : `windspeed_mean`, `gust_min`, `gust_max` × 3.6 à la lecture (source)

### Technique
- `CACHE_VERSION` 10 → 11 : invalide le cache localStorage contenant des valeurs vent en m/s

---

## [7.6.0] - 2026-02-21

### Ajouté
- **Garde CHANGELOG obligatoire** dans le workflow CI (`auto-merge-claude.yml`) : le merge dans `main` est bloqué si `CHANGELOG.md` n'a pas été modifié dans les commits de la branch — message d'erreur explicite avec référence à la règle `CLAUDE.md`
- **Récapitulatif de déploiement automatique** dans GitHub Actions Job Summary :
  - Liste des commits mergés (hash + message, sans merges)
  - Liste des fichiers modifiés
  - Section CHANGELOG.md de la version déployée (extraite automatiquement)
  - Statut final ✅ / ❌

### Technique
- `auto-merge-claude.yml` : 3 nouvelles étapes (`fetch`, `vérification CHANGELOG`, `récapitulatif`, `statut final`)
- Extraction CHANGELOG via `awk` (première section jusqu'au séparateur `---`)
- Sécurité : aucun secret exposé dans les logs ou le Job Summary — seuls les messages de commit et noms de fichiers sont affichés

---

## [7.5.0] - 2026-02-21

### Corrigé
- **Direction des flèches vent inversée** (`icons.js`) : `windArrowSvg` appliquait `rotate(degrees)` directement, affichant d'où vient le vent alors que Météoblue UI affiche où il va. Correctif : `rot = (degrees + 180) % 360`. Affecte vue journalière ET vue horaire.
- **Colonne Secteur non-sticky au scroll horizontal** (vue horaire) : les `<td>` du tbody n'avaient pas `position: sticky`, seul le `<th>` l'avait via inline style. Les créneaux 3h (00h, 03h…) passaient sous l'en-tête "Secteur" lors du scroll.
- **Conflit wrangler.toml** : résolution du conflit de merge entre notre branch et main sur `account_id` (ligne modifiée des deux côtés depuis `50cbac5`).

### Technique
- `CACHE_VERSION` 9 → 10 : invalide le cache localStorage v9 stocké sans `data_3h` (avant redéploiement worker avec `basic-3h`)
- `icons.js` v7.13.0 → v7.14.0 (cache bust dans `index.html` et `design-system.html`)

---

## [7.4.0] - 2026-02-21

### Ajouté
- **Package `basic-3h`** ajouté au worker (`worker.js`) : l'API Météoblue retourne maintenant `data_3h` en plus de `data_day`
- **Cache Cloudflare** : clé de cache passée de `v=2` à `v=3` pour invalider l'ancienne réponse sans `data_3h`

### Corrigé
- **`account_id` manquant** dans `wrangler.toml` : le placeholder `REMPLACE_PAR_TON_ACCOUNT_ID` remplacé par le vrai ID pour permettre le déploiement via `CLOUDFLARE_API_TOKEN`

---

## [7.3.0] - 2026-02-21

### Ajouté
- **Vue horaire 3h complète** (5 jours) : tableau scrollable avec icône météo, température, flèche vent + vitesse, précipitations (neige/pluie) par créneau de 3h
- **Toggle "Par jour / Par heure"** : bascule entre vue journalière et vue horaire avec icônes calendrier/horloge
- **Logs de diagnostic** `[Hourly]` dans la console pour vérifier la présence de `data_3h`

### Corrigé
- Secteur manquant en vue horaire lors d'un premier chargement
- Design header jour + typographie 13px sur les créneaux horaires

---

## [7.2.0] - 2026-02-21

### Modifié
- **0 secteurs par défaut** (`DEFAULT_RESORTS = []`) : l'app démarre vide, l'utilisateur ajoute ses propres secteurs
- **Blank state** dans les deux tableaux quand aucun secteur n'est chargé

---

## [7.0.0] - 2026-02-19

### Ajouté
- **Cloudflare Worker proxy** (`worker/`) : la clé API Meteoblue n'est plus exposée dans le HTML public
  - Route `GET /weather?lat&lon&asl` → `my.meteoblue.com` avec cache Cloudflare partagé 2h
  - Route `GET /search?query` → recherche Meteoblue (pas de cache)
  - Cache partagé entre tous les utilisateurs : N stations × 1 appel / 2h quelle que soit la fréquentation
  - Clé stockée en variable d'environnement Cloudflare (`wrangler secret put METEOBLUE_API_KEY`)
- **Limite de 5 secteurs** (`MAX_RESORTS = 5`) : constante centrale, guard dans `addResort`
- **Vue "limite atteinte" dans la modale** : le bouton "Ajouter un Secteur" s'ouvre toujours mais affiche une alerte orange (`.modal-limit-alert`) avec boutons "Proposer une amélioration" (primaire) et "Annuler" (secondaire)
- **Liens Meteoblue dans les tableaux** : chaque nom de secteur est un lien `<a class="resort-link">` vers la page Meteoblue dédiée (`getMeteoblueUrl`), avec soulignement au hover ; "Meteobleu" dans les sous-titres est également un lien

### Corrigé
- **Scroll horizontal** des deux tableaux ("Chutes de Neige" et "Prévisions météo 5 jours") : `.snow-table` n'était pas contraint à `width: 100%`, le `<table>` interne aussi → ajout de `width: max-content; min-width: 100%` sur les deux
- **Colonne "Secteur" sticky** : `position: sticky; left: 0` ajouté sur `th:first-child` et `td:first-child`
  - Racine du problème : `.comparison-card { overflow: hidden }` bloquait sticky → remplacé par `overflow: clip`
  - Second blocage : règle locale `table { overflow: hidden }` → annulée par `overflow: visible` sur `.comparison-card .snow-table table`

### Modifié
- **Modale "Ajouter un Secteur"** :
  - Icône `mountain` retirée, `div.modal-header` → `h2.title` (Garnett 24px)
  - Sous-titre ajouté : "Entrer le nom d'une station, d'un pic..."
  - Icône `mapPin` supprimée des résultats de recherche
  - Bouton Annuler : `btn btn-secondary` pur (classe locale `.modal-btn` supprimée)
- **Design system** : classe `.section-title` supprimée de `design-system.css` (doublon de `.title`) ; `.comparison-card-header .section-title` → `.comparison-card-header .title` ; `design-system.html` mis à jour
- **`index.html`** : `API_KEY` remplacée par `PROXY_URL` (pointe vers le Cloudflare Worker)

## [6.8.0] - 2026-02-12

### Modifie
- **Cellules Vue Jour redesignees** : nouveau layout inspire des apps meteo modernes
  - A gauche : icone meteo + description textuelle en dessous
  - A droite : temperature moyenne en gros + min/max entre parentheses
  - Vent moyen (`windspeed_mean`) avec fleche de direction + cardinal
  - Rafales min-max (`gust_min`-`gust_max`), colorees selon intensite (jaune 30+, orange 50+, rouge 80+ km/h)
  - Precipitations : neige en cm (❄️) ou pluie en mm (🌧️), masquees si <= 0
  - BERA : badge risque + lien "Voir le BERA" visible sur J0 et J1 (avant J0 seulement)
- **Donnees journalieres enrichies** : `wind_mean`, `snowCm`, `rainMm` calcules a partir de l'API
- `CACHE_VERSION` incremente a 6 (invalidation cache)
- Largeur minimum des cellules jour augmentee (200px)

## [6.7.0] - 2026-02-12

### Corrige
- **Liens Meteoblue corriges** : les noms de stations pointaient vers de mauvaises pages (ex: Missouri, USA au lieu de Guzet, France). Utilisation du champ `url` officiel retourne par l'API de recherche Meteoblue (ex: `guzet-neige_france_7580803`)
- Le `mbUrl` est stocke avec chaque station (DEFAULT_RESORTS et ajout dynamique)

### Modifie
- **Hyperlinks en bleu** : tous les liens dans les tableaux sont desormais en bleu (`#2980b9`) avec soulignement pour indiquer clairement qu'ils sont cliquables
- Suppression des styles inline de couleur sur les liens (centralise en CSS)

## [6.6.0] - 2026-02-12

### Corrige
- **IDs massifs Meteo France corriges** : tous les IDs etaient decales de 1 (ex: Haute-Bigorre etait 65 au lieu de 66). IDs verifies via l'API `DPBRA/v1/massif/BRA`
- Mapping complet : Pays-Basque (64), Aspe-Ossau (65), Haute-Bigorre (66), Aure-Louron (67), Luchonnais (68), Couserans (69), Haute-Ariege (70), Orlu St-Barthelemy (72), Capcir-Puymorens (73), Cerdagne-Canigou (74)
- Ajout du massif Pays-Basque (64), suppression d'Andorre (71, pas de BRA disponible)
- **Mapping direct par nom de station** (`STATIONS_MASSIF_MAP`) base sur meteofrance.com, prioritaire sur les bounding boxes GPS
- `getMassifFromCoords` accepte un 3e parametre `stationName` pour un matching fiable
- Ajout de `CACHE_VERSION` pour invalider automatiquement le cache apres un changement de logique
- Cache-busting sur les fichiers JS externes (`?v=X.X.X`)

## [6.4.0] - 2026-02-12

### Modifie
- **Cellules vue jour redesignees** : layout horizontal 30/70 (icone meteo a gauche x2 taille, infos a droite alignees)
- Suppression des icones inline (temperature, vent, risque) pour plus de lisibilite
- Taille de police harmonisee sur les 4 lignes d'info (temperature, vent, risque, lien BERA)
- **Tooltip sur les icones meteo** : au survol, affiche la description (ex: "Neige legere") en vue jour et vue horaire
- Titre du tableau passe de "Meteo Comparative (7 jours)" a "Meteo Comparative (5 jours)"

## [6.3.0] - 2026-02-12

### Ajoute
- **Modale BERA PDF** : au clic sur "Voir le BERA", le PDF officiel Meteo France est telecharge via l'API et affiche dans un iframe
- Le PDF contient toutes les images officielles : risque avalanche, rose des pentes, enneigement, neige fraiche, apercu meteo
- Lien "Voir le BERA" deplace dans la cellule Jour J (au lieu de la colonne station)
- Modale avec header (titre + X), contenu PDF plein ecran, footer (bouton Fermer)
- Fermeture par clic sur fond sombre, bouton X ou bouton Fermer
- Liberation du blob URL a la fermeture (pas de fuite memoire)

### Supprime
- Ancienne modale BERA textuelle (remplacee par le PDF embed)

## [6.2.0] - 2026-02-11

### Corrige
- **Parsing BRA corrige** : lecture des attributs `RISQUE1`, `RISQUEMAXI`, `RISQUEMAXIJ2` depuis `CARTOUCHERISQUE > RISQUE` (au lieu des balises `ECHEANCE` qui contenaient des donnees meteo, pas les risques)
- Support des risques differencies par altitude (`LOC1`/`LOC2`/`RISQUE2`)
- Extraction des donnees detaillees du BERA : massif, commentaire risque, resume avalanches, stabilite, qualite neige, enneigement, pentes exposees

### Modifie
- Badge BRA simplifie : affiche "Risque : X/5" sans fleches haut/bas

## [6.1.0] - 2026-02-11

### Modifie
- **API Key Meteo France BRA** : remplacement du systeme OAuth2 (token 1h + auto-renouvellement) par une API Key statique 1 an via header `apikey:`
- Suppression de la fonction `getMeteoFranceToken()` et des variables OAuth2 (`MF_APPLICATION_ID`)
- Plus de probleme CORS (le endpoint `/token` bloquait les requetes navigateur, le header `apikey:` fonctionne directement)
- Mise a jour de la cle API Meteoblue (`LuUd7q9wHpiG1aWh`)

## [6.0.0] - 2026-02-11

### Ajouté
- **Cache localStorage des données météo** (TTL 2h) : les données API sont mises en cache et réutilisées pendant 2h, évitant les appels API redondants à chaque rechargement de page
- Badge vert "CACHE" dans le header quand les données proviennent du cache
- Invalidation automatique du cache à l'ajout/suppression d'une station
- Le bouton "Actualiser" force toujours un appel API frais (bypass cache)
- Sauvegarde des données BRA dans le cache (en plus des données Meteoblue)

### Supprimé
- **Packages API `clouds-1h` et `clouds-day`** retirés de l'URL Meteoblue (non utilisés, consommaient des crédits inutilement)

### Impact
- Réduction estimée de 70-90% des appels API en usage normal
- Packages API passés de 7 à 5 par appel (économie de crédits)
- Aucun impact sur l'expérience utilisateur

## [2.3.0] - 2026-02-08

### Ajouté
- Système de logging des appels API Meteoblue
- Compteur d'appels API (aujourd'hui / total / échecs)
- Bouton de téléchargement du log API
- Bouton de réinitialisation du log
- Console logging pour debug en temps réel
- Documentation complète du système de logging (API-LOGGING.md)

### Modifié
- **Suppression des restrictions de temps** (7h-20h et 2h entre actualisations)
- Bouton "Actualiser" maintenant toujours disponible
- Responsabilité de la gestion du quota API laissée à l'utilisateur

### Raison
- Meilleure expérience utilisateur
- L'utilisateur gère lui-même son quota via les statistiques visibles
- Transparence totale sur la consommation API

## [2.2.0] - 2026-02-08

### Corrigé
- Chargement initial qui ignorait les restrictions et ne chargeait pas les données
- Nouvelle fonction `loadInitialWeatherData()` pour le premier chargement

## [2.1.0] - 2026-02-08

### Corrigé
- Suppression du reload de page lors de l'ajout d'un secteur
- Ajout direct dans les tableaux sans rechargement

### Modifié
- Réduction de 2px de la police dans tous les tableaux
- Tableaux plus compacts et lisibles

## [2.0.0] - 2026-02-08

### Ajouté
- Affichage de l'altitude à côté des secteurs dans les tableaux
- Système de contrôle des appels API (toutes les 2h, 7h-20h)
- Compteur "Prochaine mise à jour possible dans X"
- Messages informatifs sur la disponibilité du bouton
- Heure ajoutée dans le bandeau de mise à jour

### Modifié
- Période affichée : J-2 à J+4 (au lieu de J-3 à J+3)
- Traduction complète en français (Today → Aujourd'hui, etc.)
- Bouton "Ajouter un secteur" toujours visible
- Message "Aucun secteur" si liste vide

## [1.0.0] - 2026-02-08

### Ajouté
- Tableau des chutes de neige sur 7 jours (J-3 à J+3)
- Tableau météo détaillé avec températures min/max
- Système d'ajout de secteurs via recherche automatique Meteoblue
- Suppression de secteurs avec bouton (×)
- Sauvegarde automatique des secteurs dans LocalStorage
- Affichage personnalisé des dates (Today, Tomorrow, After tomorrow)
- Mise en évidence de la colonne "Today"
- Bouton d'actualisation des données
- Design alpin avec dégradé bleu montagne
- Indicateurs visuels (neige importante en orange, températures colorées)

### Technique
- React 18 pour l'interface
- API Meteoblue pour les données météo
- Polices personnalisées : Barlow Condensed + JetBrains Mono
- Responsive design (mobile, tablette, desktop)
- Animations CSS fluides

## [À venir]

### Version 3.0
- [ ] Graphiques de tendances
- [ ] Mode sombre
- [ ] Export PDF des prévisions
- [ ] Alertes neige fraîche (push notifications)
- [ ] Comparaison multi-stations

