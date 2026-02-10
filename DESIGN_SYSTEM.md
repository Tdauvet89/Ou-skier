# 🎨 Design System - Mountain Weather App

Ce document centralise tous les composants, styles et patterns réutilisables de l'application.

## 📐 Règles Fonctionnelles

### Tableaux avec Scroll Horizontal

**RÈGLE OBLIGATOIRE** : Tout tableau avec scroll horizontal DOIT avoir une première colonne sticky.

**Implémentation** :
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

**Usage** :
```html
<table>
    <thead>
        <tr>
            <th className="sticky-first-col">Secteur</th>
            <th>Jour 1</th>
            <th>Jour 2</th>
        </tr>
    </thead>
</table>
```

**Pourquoi** : Permet à l'utilisateur de toujours savoir quelle ligne il consulte lors du scroll horizontal.

---

## 🎨 Composants

### 1. Section Title with Separator

**Description** : Titre de section avec trait décoratif en dessous

**CSS** :
```css
.section-title-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
}

.section-separator {
    height: 2px;
    background: linear-gradient(90deg, 
        var(--glacier) 0%, 
        rgba(100, 181, 246, 0.3) 50%, 
        transparent 100%
    );
    margin-bottom: 20px;
    border-radius: 2px;
}
```

**HTML** :
```jsx
<div className="section-title-container">
    <h2>
        <span className="icon">🌤️</span>
        Météo Comparative (7 jours)
    </h2>
    <div className="view-toggle">
        {/* Toggle buttons */}
    </div>
</div>
<div className="section-separator"></div>
```

**Quand l'utiliser** : Pour toutes les sections principales de l'app (Chutes de neige, Météo comparative, etc.)

---

### 2. Sticky Column (Tableau)

Voir section "Règles Fonctionnelles" ci-dessus.

---

### 3. Toggle Buttons

**CSS** :
```css
.view-toggle {
    display: flex;
    background: white;
    border-radius: 8px;
    padding: 4px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.view-toggle-btn {
    padding: 10px 20px;
    border: none;
    background: transparent;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 1rem;
    font-weight: 700;
    text-transform: uppercase;
    cursor: pointer;
    border-radius: 6px;
    transition: all 0.3s ease;
    color: var(--storm-gray);
}

.view-toggle-btn.active {
    background: linear-gradient(135deg, var(--deep-blue), #2874a6);
    color: white;
    box-shadow: 0 2px 6px rgba(26, 82, 118, 0.3);
}
```

**Usage** :
```jsx
<div className="view-toggle">
    <button className={`view-toggle-btn ${mode === 'day' ? 'active' : ''}`}>
        📅 Vue Jour
    </button>
    <button className={`view-toggle-btn ${mode === 'hourly' ? 'active' : ''}`}>
        🕐 Vue 5h
    </button>
</div>
```

---

### 4. Weather Data Cell

**Description** : Cellule d'un tableau météo avec icône, température et vent

**CSS** :
```css
.weather-cell {
    text-align: center;
    padding: 10px 6px;
    vertical-align: middle;
}

.cell-icon {
    font-size: 1.4rem;
    margin: 2px 0;
}

.cell-temp {
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--storm-gray);
    margin: 3px 0;
}

.cell-wind {
    font-size: 0.65rem;
    color: #7f8c8d;
    margin-top: 2px;
}
```

**Usage** :
```jsx
<td className="weather-cell">
    <div className="cell-icon">☀️</div>
    <div className="cell-temp">-2°</div>
    <div className="cell-wind">💨 15 km/h</div>
</td>
```

---

### 5. Snow Value Display

**CSS** :
```css
.snow-value {
    font-weight: 600;
    color: var(--deep-blue);
    font-size: 0.95rem;
}

.heavy-snow {
    color: #e67e22;
    font-weight: 700;
}
```

**Règles** :
- Valeur > 15cm → Classe `heavy-snow` (orange)
- Valeur normale → Classe `snow-value` uniquement

---

### 6. Today Highlight

**CSS** :
```css
.today {
    background: rgba(39, 174, 96, 0.12);
    border-left: 3px solid #27ae60;
}

.today-col {
    background: linear-gradient(135deg, #27ae60 0%, #2ecc71 100%);
}

.today-cell {
    background: rgba(39, 174, 96, 0.08);
}
```

**Usage** :
- `.today` : Pour les cellules d'en-tête de colonnes
- `.today-col` : Pour les headers de tableaux (fond vert)
- `.today-cell` : Pour les cellules de données

---

## 🎨 Couleurs (Variables CSS)

```css
:root {
    --deep-blue: #1a5276;
    --glacier: #64b5f6;
    --powder: #e3f2fd;
    --storm-gray: #546e7a;
    --shadow-blue: rgba(100, 181, 246, 0.15);
}
```

---

## 📏 Typographie

### Polices

- **Titres** : 'Barlow Condensed', sans-serif
- **Données** : 'JetBrains Mono', monospace (pour les valeurs numériques)
- **Corps** : System default

### Tailles

- **H2 (Section)** : 1.8rem
- **H3 (Sous-section)** : 1.3rem
- **Données tableau** : 0.8rem
- **Petites infos** : 0.65-0.7rem

---

## 🔧 Bonnes Pratiques

### 1. Responsive Design

Tous les tableaux doivent avoir :
```css
overflow-x: auto;
```

### 2. Animations

Utiliser des transitions douces (0.3s ease) pour :
- Hover sur boutons
- Changement d'état
- Apparition de modaux

### 3. Accessibilité

- Toujours mettre un `title` sur les boutons d'action
- Utiliser des couleurs avec bon contraste
- Taille de police minimum : 0.65rem

---

## 📦 Structure HTML Standard

### Section Complète

```jsx
<section className="section">
    {/* Titre avec toggle optionnel */}
    <div className="section-title-container">
        <h2>
            <span className="icon">❄️</span>
            Titre de la Section
        </h2>
        {/* Toggle si nécessaire */}
    </div>
    
    {/* Trait décoratif */}
    <div className="section-separator"></div>
    
    {/* Contenu */}
    <div className="unified-table-wrapper">
        <table className="unified-weather-table">
            {/* ... */}
        </table>
    </div>
</section>
```

---

## 🚀 Évolution Future

Quand ce design system sera complet, nous pourrons :
1. Créer de nouveaux tableaux en 5 minutes
2. Garantir une cohérence visuelle totale
3. Faciliter la maintenance
4. Accélérer le développement de nouvelles features

---

**Version** : 1.0
**Dernière mise à jour** : 10 février 2026
