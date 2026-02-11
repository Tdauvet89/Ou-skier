# 🏔️ Bulletins Risque Avalanche (BRA) - Documentation

## 📊 Affichage dans l'Application

### Emplacement
Les badges BRA s'affichent dans le **Tableau Météo Comparative (7 jours)**, uniquement en **Vue Jour**, sur les colonnes :
- ✅ **Aujourd'hui** (J)
- ✅ **Demain** (J+1)
- ✅ **Après-demain** (J+2)

### Format des Badges

```
☀️
-1° / 4°
💨 15 ↓ N
🔺 3/5 🔻 2/5
```

**🔺 Haute montagne** : Risque en altitude (> 2500m généralement)
**🔻 Basse/Moyenne montagne** : Risque en dessous

## 🎨 Couleurs des Risques

| Niveau | Couleur | Code | Signification |
|--------|---------|------|---------------|
| **1/5** | 🟢 Vert | `#27ae60` | Risque faible |
| **2/5** | 🟡 Jaune | `#f1c40f` | Risque limité |
| **3/5** | 🟠 Orange | `#e67e22` | Risque marqué |
| **4/5** | 🔴 Rouge | `#e74c3c` | Risque fort |
| **5/5** | 🔴 Rouge foncé | `#e74c3c` | Risque très fort |

## 📡 Source des Données

**API** : Météo France DPBRA v1
```
https://public-api.meteofrance.fr/public/DPBRA/v1/massif/BRA
```

**Authentification** : OAuth2 Bearer Token (expire 1h)

**Format** : XML parsé pour extraire :
- Risques par échéance (J, J+1, J+2)
- Risques par altitude (BAS/HAUT)
- Date de validité

## 🗺️ Mapping Massifs

Les coordonnées GPS des secteurs sont automatiquement mappées aux massifs Météo France :

| Secteur | Coords | Massif | ID |
|---------|--------|--------|-----|
| Pic de Lurtet | 42.87, 0.10 | Haute-Bigorre | 65 |
| Pic du Pourtalet | 42.78, -0.42 | Aspe-Ossau | 64 |
| Panticosa | 42.72, -0.28 | Aspe-Ossau | 64 |
| Pic du Midi | 42.94, 0.14 | Haute-Bigorre | 65 |

Voir `massifMapping.js` pour la liste complète des 10 massifs pyrénéens.

## 🔄 Mise à Jour

Les données BRA sont chargées :
- ✅ Au démarrage de l'app
- ✅ Lors de l'ajout d'un nouveau secteur
- ✅ Lors du clic sur "Actualiser"

## ⚠️ Limitations

### Historique J-1
❌ **Non disponible** : L'API BRA ne fournit que les prévisions (J, J+1, J+2), pas l'historique.

Pour consulter les bulletins passés, utilisez le site Météo France directement.

### Données Espagnoles
Les secteurs côté espagnol (Panticosa, etc.) sont mappés au massif français le plus proche. Les données peuvent différer légèrement des bulletins AEMET espagnols.

## 🛠️ Maintenance

### Renouveler le Token
Le token OAuth2 expire après **1 heure**. Pour le renouveler :

1. Aller sur le portail Météo France : https://portail-api.meteofrance.fr/
2. Se connecter
3. Copier le nouveau token
4. Remplacer dans `index.html` :
```javascript
const METEO_FRANCE_TOKEN = "NOUVEAU_TOKEN_ICI";
```

### Ajouter un Massif
Éditer `massifMapping.js` et ajouter dans `MASSIFS_PYRENEES` :
```javascript
{
    id: 74,
    name: "Nouveau Massif",
    zone: "Pyrénées ...",
    bounds: {
        latMin: 42.5,
        latMax: 42.8,
        lonMin: 1.0,
        lonMax: 1.5
    }
}
```

## 📚 Ressources

- **API Swagger** : Voir `Bulletin_Avalanche_swagger.json`
- **Échelle européenne des risques** : https://www.anena.org/5050-echelle-europeenne.htm
- **Bulletins Météo France** : https://meteofrance.com/meteo-montagne
- **ANENA** (Association Nationale d'Étude de la Neige et des Avalanches)

---

**Version** : 5.1
**Dernière mise à jour** : 10 février 2026
