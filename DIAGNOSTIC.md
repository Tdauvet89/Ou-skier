# 🔍 Guide de Diagnostic - Problème de Fiabilité des Données

## Contexte du Problème

**Symptôme observé** : Les températures affichées pour le Pic de Lurtet ne correspondent pas aux données de Meteoblue officiel.

**Exemple de différence** :
- Meteoblue officiel (DEMAIN): 0°/-8°
- Notre app: Températures différentes

## 🧪 Étapes de Diagnostic

### 1. Ouvrir la Console du Navigateur

1. Ouvrez votre app dans le navigateur
2. Appuyez sur **F12** (ou Cmd+Option+I sur Mac)
3. Cliquez sur l'onglet **Console**

### 2. Actualiser les Données

1. Cliquez sur le bouton **"Actualiser"**
2. Observez les logs qui apparaissent dans la console

### 3. Analyser les Logs pour le Pic de Lurtet

Vous devriez voir apparaître :

```
🌐 ========== APPEL API PIC DE LURTET ==========
📍 Coordonnées utilisées:
   Latitude: XX.XXXX
   Longitude: X.XXXX
   Altitude: XXXX
🔗 URL API (sans clé): ...
✅ Réponse API reçue pour Pic de Lurtet
🌐 ========== FIN APPEL API ==========

🔍 ========== DEBUG PIC DE LURTET ==========
📍 Coordonnées: {lat: XX.XX, lon: X.XX, altitude: XXXX}
📅 Date actuelle: 2026-02-09T...
📊 Données journalières (data_day.time): ['2026-02-07', '2026-02-08', ...]
🌡️ Températures min: [-8, -2, ...]
🌡️ Températures max: [0, 1, ...]
⏰ Premier timestamp horaire: 2026-02-07T00:00:00Z
⏰ Dernier timestamp horaire: 2026-02-13T23:00:00Z
📊 Nombre total d'heures: XXX

📆 Offset -2 (J-2):
   Date: 2026-02-07
   Temp min/max: -8° / 0°
   
📆 Offset -1 (J-1):
   Date: 2026-02-08
   Temp min/max: -2° / 1°
   
📆 Offset 0 (AUJOURD'HUI):
   Date: 2026-02-09
   Temp min/max: ...
   
📆 Offset 1 (J+1):
   Date: 2026-02-10
   Temp min/max: ...
```

## 🎯 Points Critiques à Vérifier

### A. Vérifier les Coordonnées

**Sur Meteoblue officiel** (screenshot 1) :
- Pic de Lurtet : 42.87°N 0.1°E, 2506m

**Dans la console** (cherchez "Coordonnées utilisées") :
- Comparez avec les valeurs affichées
- ❗ **Si différent** → Le problème vient de là

**Action si les coordonnées diffèrent** :
1. Supprimez le secteur "Pic de Lurtet"
2. Ajoutez-le à nouveau via la recherche
3. Vérifiez que l'API retourne les bonnes coordonnées

### B. Vérifier le Décalage de Dates

**Aujourd'hui** = Dimanche 9 février 2026

**Dans les logs**, vérifiez :
- `Offset 0 (AUJOURD'HUI)` doit afficher **2026-02-09**
- `Offset 1 (J+1)` doit afficher **2026-02-10** (Demain/Lundi)
- `Offset -1 (J-1)` doit afficher **2026-02-08** (Hier/Samedi)

**❗ Si le décalage est incorrect** → Le problème est dans le calcul des offsets

### C. Comparer les Températures

**Meteoblue officiel pour DEMAIN (10 février)** :
- Temp min/max attendues : (notez-les depuis le site)

**Dans les logs, cherchez `Offset 1 (J+1):`** :
- Comparez les températures min/max

**❗ Si les températures sont différentes malgré les bonnes dates** → Le problème peut être :
1. Fuseau horaire (UTC vs local)
2. Package API différent
3. Données mises à jour à des moments différents

### D. Vérifier les Heures

**Dans les logs, cherchez les lignes avec les heures** :
```
✓ 8h: temp=-2°, vent=2km/h [2026-02-10T08:00:00Z]
✓ 10h: temp=-1°, vent=3km/h [2026-02-10T10:00:00Z]
```

**Points à vérifier** :
- Les timestamps doivent être en **UTC** (avec Z à la fin)
- Les heures doivent correspondre aux heures UTC, pas aux heures locales
- Si Meteoblue affiche 12h heure locale française (UTC+1), cela correspond à 11h UTC

## 🐛 Problèmes Connus et Solutions

### Problème 1 : Coordonnées Incorrectes

**Symptôme** : Les coordonnées dans les logs ne correspondent pas à Meteoblue

**Solution** :
1. Supprimez le secteur
2. Cherchez "Pic de Lurtet" dans Meteoblue directement
3. Notez les coordonnées EXACTES
4. Vérifiez que notre recherche retourne les mêmes

### Problème 2 : Décalage de Jours

**Symptôme** : "AUJOURD'HUI" ne pointe pas sur la bonne date

**Solution** : Bug dans le code, offset mal calculé
- Vérifiez si `data_day.time[0]` est bien aujourd'hui ou commence dans le passé

### Problème 3 : Fuseau Horaire

**Symptôme** : Les heures ne correspondent pas

**Solution** : 
- Meteoblue renvoie en UTC
- Nous devons afficher en heure locale française (UTC+1)
- Possible besoin de conversion

### Problème 4 : Package API Différent

**Symptôme** : Données complètement différentes

**Solution** :
- Meteoblue.com utilise peut-être un package différent
- Notre package : `basic-1h_basic-day_clouds-1h_clouds-day_snowice-day`
- Vérifier si c'est le bon package pour avoir les mêmes données

## 📋 Checklist de Diagnostic

Cochez au fur et à mesure :

- [ ] Console ouverte (F12)
- [ ] Bouton "Actualiser" cliqué
- [ ] Logs du Pic de Lurtet visibles
- [ ] Coordonnées relevées : lat=___ lon=___ alt=___
- [ ] Coordonnées comparées avec Meteoblue officiel
- [ ] Date "AUJOURD'HUI" vérifiée (doit être 2026-02-09)
- [ ] Date "J+1" vérifiée (doit être 2026-02-10)
- [ ] Températures de demain comparées
- [ ] Timestamps horaires vérifiés (format UTC)

## 📊 Rapport à Fournir

Une fois le diagnostic effectué, notez :

1. **Coordonnées dans les logs** :
   - Lat : 
   - Lon : 
   - Alt : 

2. **Décalage de dates détecté** :
   - Offset 0 pointe sur : 
   - Devrait pointer sur : 2026-02-09

3. **Différence de températures** :
   - Meteoblue officiel (DEMAIN) : min=___ max=___
   - Notre app (J+1) : min=___ max=___

4. **Capture d'écran de la console** avec tous les logs visibles

---

## 🔧 Corrections Probables

Selon le diagnostic, voici les corrections à appliquer :

### Si coordonnées incorrectes
→ Corriger l'API de recherche ou forcer les coordonnées exactes

### Si décalage de dates
→ Corriger le mapping des offsets dans `processWeatherDataForResort()`

### Si fuseau horaire
→ Ajouter conversion UTC → local pour l'affichage

### Si package API
→ Tester d'autres packages ou ajuster le parsing
