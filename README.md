[README.md](https://github.com/user-attachments/files/25168039/README.md)
# 🏔️ Météo Montagne - Dashboard Ski

Application web pour suivre la météo et les chutes de neige de vos stations de ski préférées.

## 🎯 Fonctionnalités

- **Tableau des chutes de neige** : Suivi sur 7 jours (J-3 à J+3)
- **Météo détaillée** : Températures min/max, conditions, vent
- **Gestion des secteurs** : Ajout/suppression facile via recherche automatique
- **Sauvegarde locale** : Vos secteurs sont mémorisés dans le navigateur
- **Données en temps réel** : Powered by Meteoblue API

## 🚀 Utilisation

1. Ouvrez `index.html` dans votre navigateur
2. Cliquez sur "Ajouter un Secteur"
3. Recherchez votre station de ski (ex: "Guzet", "Saint-Lary")
4. Les données météo s'affichent automatiquement
5. Cliquez sur "Actualiser" pour rafraîchir les données

## ⚙️ Configuration

### Clé API Meteoblue

Le fichier utilise actuellement la clé API : `76O0zHESUwlL5kA1`

Pour utiliser votre propre clé :
1. Ouvrez `index.html`
2. Recherchez la ligne : `const API_KEY = '76O0zHESUwlL5kA1';`
3. Remplacez par votre clé API

### Secteurs par défaut

Les secteurs par défaut sont définis dans la constante `DEFAULT_RESORTS` :

```javascript
const DEFAULT_RESORTS = [
    { name: "Guzet", lat: 42.7857, lon: 1.2261, altitude: 1400 },
    { name: "Piau-Engaly", lat: 42.7833, lon: 0.1667, altitude: 1850 },
    { name: "Saint-Lary", lat: 42.8167, lon: 0.3167, altitude: 1700 }
];
```

## 📦 Déploiement

### Option 1 : GitHub Pages

1. Créez un repository GitHub
2. Uploadez tous les fichiers
3. Activez GitHub Pages dans Settings
4. Votre app sera accessible à : `https://votre-username.github.io/nom-repo/`

### Option 2 : Netlify

1. Allez sur [netlify.com](https://www.netlify.com)
2. Glissez-déposez le dossier du projet
3. Obtenez un lien public instantanément

### Option 3 : Serveur local

```bash
# Avec Python
python -m http.server 8000

# Avec Node.js
npx http-server
```

Puis ouvrez : `http://localhost:8000`

## 🛠️ Technologies utilisées

- **React 18** : Framework UI
- **Meteoblue API** : Données météorologiques
- **LocalStorage** : Sauvegarde des préférences
- **Google Fonts** : Barlow Condensed & JetBrains Mono

## 📝 Structure du fichier

```
mountain-weather-app/
├── index.html          # Application complète (HTML + CSS + JS)
├── README.md           # Documentation
└── .gitignore          # Fichiers à ignorer par Git
```

## 🔄 Évolution future (idées)

- [ ] Export des données en PDF
- [ ] Notifications de neige fraîche
- [ ] Comparaison de plusieurs stations
- [ ] Historique des chutes de neige
- [ ] Mode sombre
- [ ] Graphiques de tendances
- [ ] Partage de configurations

## 📄 Licence

Usage personnel libre. Pour usage commercial, vérifiez les conditions de l'API Meteoblue.

## 🤝 Contribution

Pour améliorer l'application :
1. Modifiez `index.html`
2. Testez dans votre navigateur
3. Documentez vos changements dans ce README

## 📞 Support

API Meteoblue : [Documentation](https://docs.meteoblue.com/)

---

**Version** : 1.0  
**Dernière mise à jour** : Février 2026
