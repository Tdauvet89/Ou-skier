# Ou Skier - Meteo Comparative Ski

Application web de comparaison meteo multi-stations pour le ski, avec bulletins d'avalanche (BERA) integres.

## Fonctionnalites

- **Comparaison multi-stations** : ajout/suppression de stations (max 5) via recherche Meteoblue
- **Liens Meteoblue** : chaque secteur dans les tableaux est un lien vers sa page Meteoblue dédiée
- **Vue jour** (5 jours) : icone meteo + description, temperature moyenne (min/max), vent moyen + direction, rafales min-max colorees, precipitations (neige cm / pluie mm), risque avalanche BERA
- **Vue horaire** : detail heure par heure avec temperatures, vent, precipitation, neige
- **Scroll horizontal avec colonne Secteur sticky** : les deux tableaux scrollent horizontalement, la colonne Secteur reste visible
- **Bulletins d'avalanche (BERA)** : risque avalanche par massif avec badge colore "Risque : X/5"
- **Modale BERA PDF** : affichage du bulletin officiel Meteo France en PDF (rose des pentes, enneigement, risques)
- **Tooltip meteo** : survol de l'icone meteo pour voir la description (vue jour et horaire)
- **Cache localStorage** (TTL 2h) : reduction de 70-90% des appels API en usage normal
- **Design alpin** : degrade bleu montagne, responsive (mobile, tablette, desktop)

## Organisation des Fichiers

```
Ou-skier/
├── index.html              # Application principale (React 18 + Babel standalone)
├── design-system.css       # CSS partagé — source unique de vérité
├── design-system.html      # Showcase interactif des composants
├── icons.js                # Bibliothèque icônes SVG (weatherSvg, uiSvg, windArrowSvg)
├── weatherCodes.js         # Correspondances codes meteo Meteoblue -> icones/descriptions
├── massifMapping.js        # Mapping GPS -> massifs Meteo France (BRA Pyrenees)
├── worker/                 # Cloudflare Worker — proxy API Meteoblue
│   ├── worker.js           #   Routes /weather et /search (clé API côté serveur)
│   ├── wrangler.toml       #   Config déploiement Cloudflare
│   └── package.json        #   Dépendance Wrangler CLI
├── CHANGELOG.md            # Historique des versions
├── DESIGN_SYSTEM.md        # Documentation technique du design system
├── API-LOGGING.md          # Documentation du systeme de logs API
└── README.md               # Ce fichier
```

Fichiers obligatoires : `index.html`, `weatherCodes.js`, `massifMapping.js`, `design-system.css`, `icons.js`

## Description des Fichiers

### `index.html`
- Application principale React (JSX via Babel standalone)
- Interface, gestion states, appels API, tableaux meteo, modale BERA
- Cache localStorage des donnees meteo (TTL 2h)
- Layout cellules jour : 30/70 horizontal (icone x2 a gauche, infos alignees a droite)

### `weatherCodes.js`
- Module de correspondance des codes meteo Meteoblue -> icones/descriptions
- Export : `getWeatherInfo(code, hour)`, `adjustWeatherCodeForDaylight()`

### `massifMapping.js`
- Mapping stations/coordonnees GPS -> massifs Pyrenees Meteo France
- Mapping direct par nom de station (`STATIONS_MASSIF_MAP`) + fallback bounding boxes GPS
- Utilise pour recuperer les bulletins d'avalanche (BRA)
- Export : `getMassifFromCoords(lat, lon, stationName)`, `MASSIFS_PYRENEES`

## APIs

### Meteoblue (via Cloudflare Worker)

Les appels Meteoblue transitent par un **proxy Cloudflare Worker** (`worker/`).
La clé API n'est jamais exposée dans le HTML — elle est stockée en variable d'environnement côté Worker.

- **Packages utilises** : `basic-1h`, `basic-day`, `snowice-day`, `wind-1h`, `wind-day`
- **Proxy routes** :
  - `GET /weather?lat=X&lon=X&asl=X` — données météo avec cache Cloudflare 2h partagé
  - `GET /search?query=X` — recherche de stations (modale d'ajout)
- **Cache double couche** :
  - Cache Cloudflare (serveur) : partagé entre tous les utilisateurs → N stations × 1 appel / 2h
  - Cache localStorage (client) : TTL 2h, évite les appels lors des rechargements
- **Déploiement** : `cd worker && npm install && wrangler secret put METEOBLUE_API_KEY && wrangler deploy`

### Meteo France (BRA)
- Bulletins Risque Avalanche par massif (XML depuis `public-api.meteofrance.fr`)
- **Authentification** : API Key statique 1 an via header `apikey:` (appel direct, pas de proxy)
- **Parsing** : attributs `RISQUE1`, `RISQUEMAXI`, `RISQUEMAXIJ2` depuis `CARTOUCHERISQUE > RISQUE`
- **PDF BERA** : parametre `format=pdf` sur l'API, fetch avec header apikey -> blob -> iframe
- Support des risques differencies par altitude (`LOC1`/`LOC2`/`RISQUE2`)

## Version Actuelle

**V7.0.0** - Proxy Cloudflare Worker, limite 5 secteurs, scroll horizontal + sticky, refonte modale

Voir `CHANGELOG.md` pour l'historique complet.

## Deploiement

Hébergé sur GitHub Pages (frontend) + Cloudflare Workers (proxy API).

### Frontend
Push sur `main` → déployé automatiquement via GitHub Pages.

### Worker (proxy Meteoblue)
```bash
cd worker
npm install
wrangler secret put METEOBLUE_API_KEY   # saisir la clé Meteoblue
wrangler deploy
# → copier l'URL affichée dans PROXY_URL de index.html
```
