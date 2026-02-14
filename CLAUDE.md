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
| Boutons | `.btn`, `.btn-primary`, `.btn-success`, `.btn-secondary` | design-system.css |
| Toggles | `.toggle`, `.toggle-btn` | design-system.css |
| Tags | `.tag` | design-system.css |
| Modals | `.modal-overlay`, `.modal`, `.modal-header` | design-system.css |
| Inputs | `.input` | design-system.css |
| Icônes | `.icon` | design-system.css |
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

### Fichiers du design system

- `design-system.css` — CSS partagé (tokens + composants)
- `design-system.html` — Showcase visuel des composants
- `icons.js` — Bibliothèque SVG (weatherSvg, uiSvg, windArrowSvg)
- `DESIGN_SYSTEM.md` — Documentation technique

## Architecture du projet

- **index.html** — App principale (React/HTM, single-page)
- **icons.js** — Icônes SVG exportées sur `window`
- **weatherCodes.js** — Mapping codes météo → icônes SVG
- **massifMapping.js** — Mapping communes → massifs
