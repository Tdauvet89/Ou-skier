# 📊 Système de Logging des Appels API

## Vue d'ensemble

L'application dispose d'un système de logging intégré pour suivre tous les appels à l'API Meteoblue. Cela vous permet de :
- Surveiller votre consommation d'API
- Identifier les problèmes éventuels
- Respecter les limites de votre plan Meteoblue

## Fonctionnalités

### Affichage des statistiques

Dans le header de l'application, vous verrez :
- **Appels aujourd'hui** : Nombre d'appels effectués depuis minuit
- **Total** : Nombre total d'appels depuis l'installation
- **Échecs** : Nombre d'appels ayant échoué (si > 0)

### Boutons de gestion

**📥 Log** : Télécharge un fichier texte avec l'historique complet
- Format : `meteoblue-api-log-YYYY-MM-DD.txt`
- Contenu : Date, heure, secteur, statut (SUCCESS/FAILED), erreur éventuelle

**🗑️** : Réinitialise le log (vide l'historique)

## Format du fichier de log

```
08/02/2026 14:35:22 | Guzet | SUCCESS
08/02/2026 14:35:23 | Piau-Engaly | SUCCESS
08/02/2026 14:35:24 | Saint-Lary | FAILED | Error: HTTP 429
08/02/2026 16:20:15 | Gavarnie | SUCCESS
```

## Cas d'usage

### Vérifier la consommation quotidienne
1. Regardez "Appels aujourd'hui" dans le header
2. Si vous avez 4 secteurs et actualisez 5 fois = 20 appels

### Diagnostiquer des erreurs
1. Cliquez sur **📥 Log**
2. Ouvrez le fichier téléchargé
3. Recherchez les lignes avec "FAILED"
4. L'erreur indique la cause (rate limit, timeout, etc.)

### Suivre l'historique sur plusieurs jours
1. Téléchargez le log régulièrement
2. Conservez les fichiers datés
3. Analysez les tendances de consommation

## Limites de l'API Meteoblue

Vérifiez votre plan sur https://my.meteoblue.com :
- **Free** : Généralement 250-500 appels/jour
- **Basic** : 3000 appels/mois
- **Standard** : 10000 appels/mois

### Calcul de consommation

**Formule** : `Nb_secteurs × Nb_actualisations_par_jour`

**Exemples** :
- 4 secteurs × 10 actualisations/jour = **40 appels/jour** = ~1200/mois
- 6 secteurs × 15 actualisations/jour = **90 appels/jour** = ~2700/mois

### Conseils pour réduire la consommation

1. **Limitez les secteurs** : N'ajoutez que vos stations favorites
2. **Actualisez intelligemment** : Pas besoin de rafraîchir toutes les 5 minutes
3. **Utilisez le cache** : Les données restent valables plusieurs heures

## Stockage

Les logs sont sauvegardés dans le **localStorage** du navigateur :
- Clé : `apiCallsLog`
- Persistant entre les sessions
- Lié au domaine (différent en local vs GitHub Pages)

### Effacer les données

Pour un reset complet (secteurs + logs) :
1. Ouvrez la console (F12)
2. Tapez : `localStorage.clear()`
3. Rechargez la page

## Debug dans la console

Chaque appel API est également loggé dans la console du navigateur :
```javascript
📊 Appel API: {
  timestamp: "2026-02-08T14:35:22.123Z",
  resort: "Guzet",
  success: true,
  error: null,
  dateFormatted: "08/02/2026 14:35:22"
}
```

Ouvrez les DevTools (F12) → Console pour voir ces logs en temps réel.

## Notes techniques

- **Pas de restriction de fréquence** : Vous pouvez actualiser autant que vous voulez
- **Vous gérez votre quota** : Surveillez les stats pour ne pas dépasser
- **Logs locaux** : Les données ne sont pas envoyées à un serveur externe

---

**Recommandation** : Téléchargez le log une fois par semaine pour suivre votre consommation et ajuster votre utilisation si nécessaire.
