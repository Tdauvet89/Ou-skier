# Ou-skier — Instructions pour Claude

## Design System (OBLIGATOIRE)

Le fichier `design-system.css` est la **source unique de vérité** pour les composants UI partagés.

### Règle absolue

Avant de créer ou modifier un composant UI (bouton, toggle, tag, modal, input, icône), tu **DOIS** :

1. **Consulter** `design-system.css` pour vérifier si une classe partagée existe déjà
2. **Utiliser** les classes partagées (`btn`, `toggle`, `tag`, `modal`, `input`, `icon`) dans le HTML/JSX
3. **Si tu modifies un style de composant**, le modifier dans `design-system.css` (pas dans le `<style>` local)
4. **Si tu ajoutes un nouveau composant réutilisable**, l'ajouter dans `design-system.css` ET dans `design-system.html` (showcase)
5. **Mettre à jour** `design-system.html` pour que le showcase reflète toujours la réalité
6. **Mettre à jour** `DESIGN_SYSTEM.md` si la documentation est impactée

### Classes partagées disponibles

| Composant | Classes | Fichier source |
|-----------|---------|----------------|
| Boutons | `.btn`, `.btn-primary`, `.btn-success`, `.btn-secondary`, `.btn-light` | design-system.css |
| Toggles | `.toggle`, `.toggle-btn` (Inter 12px, 202x36px pill) | design-system.css |
| Tags | `.tag` | design-system.css |
| Modals | `.modal-overlay`, `.modal`, `.modal-header` | design-system.css |
| Inputs | `.input` | design-system.css |
| Icônes | `.icon` | design-system.css |
| Snow Table | `.snow-table`, `.sector-name`, `.sector-altitude`, `.snow-value`, `.snow-unit`, `.day-abbr`, `.day-num` | design-system.css |
| Section Title | `.section-title` | design-system.css |
| Footer CTA | `.footer-cta`, `.footer-cta-title`, `.footer-cta-buttons` | design-system.css |
| Animations | `fadeIn`, `fadeInOverlay`, `slideInModal`, `slideDown` | design-system.css |

### Pattern de composition

Les overrides spécifiques à une page vont dans le `<style>` local. Exemple :

```html
<!-- JSX : classes partagées + classe locale -->
<button className="btn btn-primary feedback-btn">Feedback</button>
```

```css
/* design-system.css : styles de base */
.btn { ... }
.btn-primary { ... }

/* index.html <style> : override local */
.feedback-btn {
    position: fixed;
    top: 16px;
    right: 16px;
    z-index: 900;
}
```

### Checklist avant chaque commit touchant un composant UI

- [ ] Le style de base est dans `design-system.css` (pas dupliqué dans `<style>`)
- [ ] Le HTML/JSX utilise les classes partagées (`.btn`, `.toggle-btn`, `.tag`, etc.)
- [ ] `design-system.html` est mis à jour si le composant est nouveau ou modifié
- [ ] Le paramètre `?v=X.X.X` est incrémenté dans `index.html` ET `design-system.html` pour invalider le cache

### Règle de versioning cache

Tous les fichiers JS/CSS locaux utilisent un paramètre `?v=X.X.X` pour forcer le cache bust.
Quand tu modifies `design-system.css`, `icons.js`, `weatherCodes.js` ou `massifMapping.js`, tu **DOIS** incrémenter le numéro de version dans les balises `<script>` et `<link>` des **deux** fichiers HTML.

### Fichiers du design system

- `design-system.css` — CSS partagé (tokens + composants)
- `design-system.html` — Showcase visuel des composants
- `icons.js` — Bibliothèque SVG (weatherSvg, uiSvg, windArrowSvg)
- `DESIGN_SYSTEM.md` — Documentation technique

## Architecture du projet

- **index.html** — App principale (React/HTM, single-page)
- **design-system.css** — Source unique de vérité CSS (importé par les deux pages HTML)
- **icons.js** — Icônes SVG exportées sur `window`
- **weatherCodes.js** — Mapping codes météo → icônes SVG
- **massifMapping.js** — Mapping communes → massifs
