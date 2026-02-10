# 📁 Structure de l'Application - Mountain Weather App

## 📂 Organisation des Fichiers

```
mountain-weather-app/
├── index.html              # ⭐ Application principale (React + Alpine.js)
├── weatherCodes.js         # ⭐ Correspondances codes météo Meteoblue
├── design-system/          # Documentation du design system
│   ├── DESIGN_SYSTEM.md    # Composants et règles de design
│   └── API_ANALYSIS.md     # Analyse des problèmes API
├── CHANGELOG.md            # Historique des versions
├── API-LOGGING.md          # Documentation du système de logs API
├── DIAGNOSTIC.md           # Guide de diagnostic des problèmes
├── CORRECTION_FINALE.md    # Correction du décalage de dates
├── CORRECTION_WEATHERCODE.md  # Correction des codes météo
└── README.md              # Ce fichier
```

⭐ = Fichiers obligatoires pour le fonctionnement

## 📄 Description des Fichiers

### Fichiers Principaux

#### `index.html`
- **Rôle** : Application principale React
- **Contenu** : Interface, gestion states, appels API, tableaux
- **Taille** : ~1960 lignes

#### `weatherCodes.js`
- **Rôle** : Module de correspondance des codes météo
- **Export** : `getWeatherInfo(code, hour)`, `adjustWeatherCodeForDaylight()`
- **Taille** : ~120 lignes

## 🚀 Déploiement

### Fichiers Obligatoires
```bash
index.html          # App principale
weatherCodes.js     # Codes météo
```

### Commandes
```bash
git add index.html weatherCodes.js README.md
git commit -m "V3.9 - App structurée"
git push
```

## 📈 Version Actuelle

**V3.9** - App structurée avec fichiers séparés

Voir `CHANGELOG.md` pour l'historique complet.
