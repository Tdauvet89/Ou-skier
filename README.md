# Ou Skier - Meteo Comparative Ski

Application web de comparaison meteo multi-stations pour le ski, avec bulletins d'avalanche (BERA) integres.

## Fonctionnalites

- **Comparaison multi-stations** : ajout/suppression de stations de ski via recherche Meteoblue
- **Vue jour** (5 jours) : icone meteo + description, temperature moyenne (min/max), vent moyen + direction, rafales min-max colorees, precipitations (neige cm / pluie mm), risque avalanche BERA
- **Vue horaire** : detail heure par heure avec temperatures, vent, precipitation, neige
- **Bulletins d'avalanche (BERA)** : risque avalanche par massif avec badge colore "Risque : X/5"
- **Modale BERA PDF** : affichage du bulletin officiel Meteo France en PDF (rose des pentes, enneigement, risques)
- **Tooltip meteo** : survol de l'icone meteo pour voir la description (vue jour et horaire)
- **Cache localStorage** (TTL 2h) : reduction de 70-90% des appels API en usage normal
- **Design alpin** : degrade bleu montagne, responsive (mobile, tablette, desktop)

## Organisation des Fichiers

```
Ou-skier/
├── index.html              # Application principale (React 18 + Babel standalone)
├── weatherCodes.js         # Correspondances codes meteo Meteoblue -> icones/descriptions
├── massifMapping.js        # Mapping GPS -> massifs Meteo France (BRA Pyrenees)
├── CHANGELOG.md            # Historique des versions
├── API-LOGGING.md          # Documentation du systeme de logs API
├── README.md               # Ce fichier
```

Fichiers obligatoires : `index.html`, `weatherCodes.js`, `massifMapping.js`

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

### Meteoblue
- **Packages utilises** : `basic-1h`, `basic-day`, `snowice-day`, `wind-1h`, `wind-day`
- **Cache** : donnees cachees dans localStorage pendant 2h
- Le bouton "Actualiser" force un appel API frais (bypass cache)
- L'ajout/suppression d'une station invalide le cache

### Meteo France (BRA)
- Bulletins Risque Avalanche par massif (XML depuis `public-api.meteofrance.fr`)
- **Authentification** : API Key statique 1 an via header `apikey:`
- **Parsing** : attributs `RISQUE1`, `RISQUEMAXI`, `RISQUEMAXIJ2` depuis `CARTOUCHERISQUE > RISQUE`
- **PDF BERA** : parametre `format=pdf` sur l'API, fetch avec header apikey -> blob -> iframe
- Support des risques differencies par altitude (`LOC1`/`LOC2`/`RISQUE2`)

## Version Actuelle

**V6.8.0** - Refonte cellules Vue Jour (vent moyen, rafales colorees, precipitations, BERA)

Voir `CHANGELOG.md` pour l'historique complet.

## Deploiement

Heberge sur GitHub Pages. Chaque deploiement est documente dans `CHANGELOG.md` et ce README est mis a jour en consequence.
