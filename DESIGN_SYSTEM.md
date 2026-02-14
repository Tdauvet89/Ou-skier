# Design System - Mountain Weather App

Ce document centralise tous les composants, styles et patterns de l'application.

> **Page interactive** : ouvrir `design-system.html` pour voir tous les composants en live.

## Icônes SVG

Depuis la v7.0, **tous les emojis ont été remplacés par des icônes SVG inline** définies dans `icons.js`.

### Architecture

| Fichier | Rôle |
|---|---|
| `design-system.css` | **Source unique de vérité** — tokens + composants partagés |
| `icons.js` | Bibliothèque SVG — weather, wind, UI |
| `weatherCodes.js` | Mapping pictocode Meteoblue → clé SVG + description |
| `design-system.html` | Showcase interactif de tous les composants |
| `CLAUDE.md` | Règles pour maintenir la cohérence du design system |

### Catégories d'icônes

**Weather** (24×24, couleurs intégrées) — accessibles via `weatherSvg.{key}` :

| Clé | Description |
|---|---|
| `sun` | Ciel dégagé |
| `moon` | Nuit claire |
| `partlyCloudy` | Peu nuageux (soleil + nuage) |
| `mostlyCloudy` | Nuageux (soleil caché) |
| `overcast` | Couvert |
| `moonCloud` | Nuit peu nuageuse |
| `moonOvercast` | Nuit nuageuse |
| `fog` | Brouillard |
| `haze` | Brume |
| `lightRain` | Pluie légère |
| `rain` | Pluie |
| `heavyRain` | Pluie forte |
| `lightSnow` | Neige légère |
| `snow` | Neige |
| `heavySnow` | Neige forte |
| `thunder` | Orage |
| `thunderRain` | Orage + pluie |
| `sleet` | Pluie et neige |
| `showers` | Averses |
| `snowShowers` | Averses de neige |
| `hail` | Grêle |
| `freezingRain` | Pluie verglaçante |

**Wind** — accessible via `windArrowSvg(degrees, size)` :

```javascript
// Flèche orientable selon les degrés (0° = Nord)
windArrowSvg(180, 14)  // → SVG string, flèche pointant vers le sud
```

**UI** (20×20, `currentColor`) — accessibles via `uiSvg.{key}` :

`search`, `plus`, `close`, `refresh`, `calendar`, `clock`, `mountain`, `snowflake`, `thermometer`, `droplet`, `mapPin`, `barChart`, `download`, `trash`, `alert`, `sunUi`, `externalLink`, `wind`

### Usage dans le JSX React

```jsx
{/* Icône UI inline */}
<span className="icon" dangerouslySetInnerHTML={{__html: uiSvg.snowflake}}></span>

{/* Icône météo (retournée par getWeatherInfo) */}
<div className="cell-icon"
     title={hourData.condition}
     dangerouslySetInnerHTML={{__html: hourData.icon}}>
</div>

{/* Flèche de vent orientée */}
<span className="wind-arrow"
      dangerouslySetInnerHTML={{__html: windArrowSvg(hourData.windDirection, 12)}}>
</span>
```

### Dimensionnement CSS

Les tailles SVG sont contrôlées par CSS selon le contexte :

```css
.icon svg          { width: 24px; height: 24px; }   /* Titres de section */
.day-cell-icon svg { width: 32px; height: 32px; }   /* Cellule vue jour */
.cell-icon svg     { width: 18px; height: 18px; }   /* Cellule vue horaire */
.hour-icon svg     { width: 22px; height: 22px; }   /* Slot horaire détaillé */
.wind-arrow svg    { width: 14px; height: 14px; }   /* Flèche vent */
```

---

## Couleurs (Variables CSS)

### Palette principale

```css
:root {
    --deep-blue: #1a5276;
    --glacier: #5dade2;
    --powder: #d4e9f7;
    --storm-gray: #5d6d7e;
    --fresh-green: #27ae60;
    --snow-white: #fafbfc;
    --fresh-snow: #ecf0f1;
}
```

### Couleurs météo

```css
--temp-cold: #3498db;
--temp-warm: #e67e22;
--warning-orange: #e67e22;
--heavy-snow: #e74c3c;
```

### Couleurs icônes SVG

| Élément | Couleur |
|---|---|
| Soleil | `#f59e0b` |
| Nuage / Brouillard | `#94a3b8` |
| Pluie / Flèche vent | `#3b82f6` |
| Neige | `#60a5fa` |
| Éclair | `#eab308` |
| Lune | `#64748b` |

---

## Typographie

| Rôle | Police | Poids | Taille |
|---|---|---|---|
| H1 titre principal | Barlow Condensed | 800 | 2.8rem |
| H2 section | Barlow Condensed | 700 | 1.6rem |
| Corps / données | JetBrains Mono | 400 | 0.9rem |
| Détails secondaires | JetBrains Mono | 400 | 0.65-0.7rem |

---

## Règles Fonctionnelles

### Tableaux avec Scroll Horizontal

**RÈGLE OBLIGATOIRE** : Tout tableau avec scroll horizontal DOIT avoir une première colonne sticky.

```css
.sticky-first-col {
    position: -webkit-sticky !important;
    position: sticky !important;
    left: 0 !important;
    z-index: 10 !important;
    background: rgba(212, 233, 247, 0.98) !important;
    box-shadow: 2px 0 8px rgba(0,0,0,0.15);
}
```

---

## Composants partagés (design-system.css)

Les classes partagées sont définies dans `design-system.css` et utilisées par les deux pages.

### Boutons

```jsx
<button className="btn btn-primary">Actualiser</button>
<button className="btn btn-success">Ajouter un Secteur</button>
<button className="btn btn-secondary">Annuler</button>
```

### Toggle Buttons

```jsx
<div className="toggle">
    <button className={`toggle-btn ${mode === 'day' ? 'active' : ''}`}>
        <span className="icon" dangerouslySetInnerHTML={{__html: uiSvg.calendar}}></span> Vue Jour
    </button>
    <button className={`toggle-btn ${mode === 'hourly' ? 'active' : ''}`}>
        <span className="icon" dangerouslySetInnerHTML={{__html: uiSvg.clock}}></span> Vue Horaire
    </button>
</div>
```

### Tags

```jsx
<span className="tag">Guzet</span>
```

### Inputs

```jsx
<input className="input" type="text" placeholder="Rechercher..." />
```

### Modals

```jsx
<div className="modal-overlay">
    <div className="modal">
        <div className="modal-header">Titre</div>
        {/* contenu */}
    </div>
</div>
```

### Weather Data Cell

```jsx
<td className="hourly-cell">
    <div className="cell-icon" title={hourData.condition}
         dangerouslySetInnerHTML={{__html: hourData.icon}}></div>
    <div className="cell-temp">{hourData.temp}°</div>
    <div className="cell-wind">
        <span>{hourData.wind}</span>
        <span className="wind-arrow"
              dangerouslySetInnerHTML={{__html: windArrowSvg(hourData.windDirection, 12)}}></span>
        <span className="wind-cardinal">{windDir.cardinal}</span>
    </div>
</td>
```

### Snow Value Display

```css
.snow-value { font-weight: 600; color: var(--deep-blue); font-size: 1.05rem; }
.heavy-snow { color: var(--warning-orange); font-weight: 700; }
```

Seuil : > 15cm → classe `heavy-snow` (orange)

### Today Highlight

```css
.today      { background: rgba(39, 174, 96, 0.12); border-left: 3px solid #27ae60; }
.today-col  { background: linear-gradient(135deg, #27ae60, #2ecc71); }
.today-cell { background: rgba(39, 174, 96, 0.08); }
```

---

## Espacements

```css
--padding-xs: 4px;   --margin-xs: 4px;
--padding-sm: 8px;   --margin-sm: 8px;
--padding-md: 15px;  --margin-md: 15px;
--padding-lg: 20px;  --margin-lg: 25px;
--padding-xl: 40px;  --margin-xl: 40px;

--space-between-sections: 40px;
--space-between-elements: 15px;
```

---

## Bonnes Pratiques

1. **Responsive** : Tous les tableaux doivent avoir `overflow-x: auto`
2. **Animations** : Transitions douces (0.3s ease) pour hover, état, modaux
3. **Accessibilité** : `title` sur les boutons d'action, bon contraste, taille min 0.65rem
4. **Icônes** : Toujours utiliser `dangerouslySetInnerHTML` pour rendre les SVG dans le JSX React

---

**Version** : 3.0 — CSS partagé + design system centralisé
**Dernière mise à jour** : 14 février 2026
