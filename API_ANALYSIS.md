# 🔍 Analyse Problème API - Icône Météo & Vent

## 📊 Comparaison Données

### Meteoblue Officiel (Screenshot) - DEMAIN 10/02

**Horaires affichés** :
- **10h** : ☀️ -3°C, 💨 7 km/h
- **12h** : ☀️ -2°C, 💨 7 km/h  
- **14h** : ☀️ -1°C, 💨 6 km/h

### Nos Logs - Offset 1 (J+1) = 2026-02-10

```
✓ 10h: temp=0°, vent=6km/h [2026-02-10 10:00]
✓ 12h: temp=0°, vent=5km/h [2026-02-10 12:00]
✓ 14h: temp=1°, vent=6km/h [2026-02-10 14:00]
```

## ❌ Problèmes Identifiés

### 1. Températures Différentes

| Heure | Meteoblue | Nos Logs | Écart |
|-------|-----------|----------|-------|
| 10h   | -3°C      | 0°C      | +3°C  |
| 12h   | -2°C      | 0°C      | +2°C  |
| 14h   | -1°C      | 1°C      | +2°C  |

**Écart constant de ~2-3°C**

### 2. Vent Légèrement Différent

| Heure | Meteoblue | Nos Logs | Écart |
|-------|-----------|----------|-------|
| 10h   | 7 km/h    | 6 km/h   | -1    |
| 12h   | 7 km/h    | 5 km/h   | -2    |
| 14h   | 6 km/h    | 6 km/h   | ✅ OK |

### 3. Icône Météo

Meteoblue affiche ☀️ (soleil) pour toute la journée.
Nos logs ne montrent pas l'icône, mais il faut vérifier le `weatherCode` (pictocode).

## 🕐 Hypothèse 1 : Fuseau Horaire

**Théorie** : L'API renvoie les données en UTC, mais Meteoblue les affiche en heure locale française (UTC+1).

**Si c'est le cas** :
- Notre 10h UTC = 11h locale française
- Nous devrions lire 9h UTC pour avoir 10h locale

**Test à faire** :
```javascript
// Au lieu de chercher hour=10
// Chercher hour=9 (car 9h UTC = 10h locale)
const localHour = 10;
const utcHour = localHour - 1; // 9
```

## 🔧 Hypothèse 2 : Coordonnées Altitude

**Coordonnées utilisées** :
- Latitude: 42.8691
- Longitude: 0.10149
- Altitude: 2506m

**Meteoblue officiel** :
- 42.87°N 0.1°E, 2506m s.n.m.

Les coordonnées sont quasiment identiques. Différence négligeable.

## 📡 Hypothèse 3 : Package API Différent

**Notre package** :
```
basic-1h_basic-day_clouds-1h_clouds-day_snowice-day
```

**Meteoblue.com** utilise peut-être un package différent avec :
- Modèle météo différent
- Résolution différente
- Données de station vs modèle

## 🧪 Tests à Effectuer

### Test 1 : Vérifier le Fuseau Horaire

Ajouter dans les logs :
```javascript
console.log('Timestamp brut:', timeStr);
console.log('Contient Z (UTC)?', timeStr.includes('Z'));
```

Si les timestamps contiennent 'Z', ils sont en UTC et il faut décaler.

### Test 2 : Afficher les WeatherCode

Ajouter dans les logs :
```javascript
console.log('WeatherCode (pictocode):', weatherCode);
console.log('Icône mappée:', weatherInfo.icon);
```

Comparer avec la documentation Meteoblue des codes météo.

### Test 3 : Vérifier data_1h vs data_day

Les températures en `data_day` sont-elles plus proches ?

```javascript
console.log('Temp min/max journée:', dayData.temperature_min[index], dayData.temperature_max[index]);
```

## 📋 Plan d'Action

1. ✅ Déployer la version avec logs améliorés (weatherCode visible)
2. ⏳ Analyser les timestamps (UTC vs local)
3. ⏳ Comparer weatherCode avec la doc Meteoblue
4. ⏳ Tester décalage horaire de -1h si UTC détecté
5. ⏳ Si problème persiste, tester un package API différent

## 🔗 Ressources

- Documentation Meteoblue API : https://docs.meteoblue.com
- Liste des WeatherCodes : https://content.meteoblue.com/en/help/standards/symbols-and-pictograms
- Fuseaux horaires : France = UTC+1 (hiver) / UTC+2 (été)

---

**Prochaine étape** : Déployer et analyser les nouveaux logs avec weatherCode visible.
