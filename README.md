# Structure de l'Application - Mountain Weather App

## Organisation des Fichiers

```
mountain-weather-app/
├── index.html              # Application principale (React)
├── weatherCodes.js         # Correspondances codes meteo Meteoblue
├── massifMapping.js        # Mapping GPS -> massifs Meteo France (BRA)
├── CHANGELOG.md            # Historique des versions
├── API-LOGGING.md          # Documentation du systeme de logs API
├── README.md               # Ce fichier
```

Fichiers obligatoires pour le fonctionnement : `index.html`, `weatherCodes.js`, `massifMapping.js`

## Description des Fichiers

### `index.html`
- Application principale React (JSX via Babel standalone)
- Interface, gestion states, appels API Meteoblue, tableaux meteo
- Cache localStorage des donnees meteo (TTL 2h)

### `weatherCodes.js`
- Module de correspondance des codes meteo Meteoblue -> icones/descriptions
- Export : `getWeatherInfo(code, hour)`, `adjustWeatherCodeForDaylight()`

### `massifMapping.js`
- Mapping coordonnees GPS -> massifs Pyrenees Meteo France
- Utilise pour recuperer les bulletins d'avalanche (BRA)
- Export : `getMassifFromCoords(lat, lon)`, `MASSIFS_PYRENEES`

## API

### Meteoblue
- **Packages utilises** : `basic-1h`, `basic-day`, `snowice-day`, `wind-1h`, `wind-day`
- **Cache** : Les donnees sont cachees dans localStorage pendant 2h pour reduire la consommation
- Le bouton "Actualiser" force un appel API frais (bypass cache)
- L'ajout/suppression d'une station invalide le cache

### Meteo France (BRA)
- Bulletins Risque Avalanche par massif (XML)
- Token JWT a renouveler manuellement (expire apres 1h)

## Version Actuelle

**V6.0** - Cache API + optimisation consommation Meteoblue

Voir `CHANGELOG.md` pour l'historique complet.
