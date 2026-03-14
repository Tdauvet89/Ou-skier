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
| Comparison Card | `.comparison-card`, `.comparison-card-header`, `.comparison-card-body` | design-system.css |
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

## Approche Mobile First (OBLIGATOIRE)

65% des utilisateurs sont sur mobile. **Chaque modification UI doit être pensée mobile first.**

### Règle absolue

1. **Concevoir pour 375px d'abord**, puis enrichir pour desktop
2. **Tester visuellement sur mobile** avant de valider un changement UI
3. **Aucun scroll horizontal** sur la page : tout widget doit tenir dans 375px de large
4. **Texte lisible** : minimum 12px, pas de troncature de mots sur mobile

### Architecture CSS responsive

Les styles sont organisés en **sections numérotées** pour faciliter l'itération :

```
┌─ design-system.css ─────────────────────┐
│ 1. FONTS & TOKENS                       │
│ 2. COMPOSANTS BASE (desktop)            │
│ 3. RESPONSIVE ≤640px (MOBILE)           │
└─────────────────────────────────────────┘

┌─ index.html <style> ────────────────────┐
│ 1. BASE / DESKTOP                       │
│ 2. RESPONSIVE ≤1200px (tablette large)  │
│ 3. RESPONSIVE ≤768px  (tablette)        │
│ 4. RESPONSIVE ≤640px  (MOBILE) ← ICI   │
│ 5. DESKTOP-ONLY ≥641px                  │
└─────────────────────────────────────────┘
```

### Breakpoints

| Breakpoint | Cible | Fichier(s) |
|------------|-------|------------|
| ≤640px | **Mobile** (prioritaire) | `design-system.css` + `index.html` |
| ≤768px | Tablette | `index.html` |
| ≤900px | Layout tableaux neige | `index.html` |
| ≤1200px | Tablette large | `index.html` |
| ≥641px | Desktop-only (masquer éléments mobiles) | `index.html` |

### Workflow pour modifier un widget

1. **Ouvrir la section 4 (≤640px)** dans `index.html` pour les overrides locaux
2. **Ouvrir la section 3 (≤640px)** dans `design-system.css` pour les composants partagés
3. **Ajouter les styles mobile** dans la bonne section
4. **Vérifier** que le widget tient dans 375px sans scroll horizontal

### Checklist mobile avant chaque commit UI

- [ ] Le widget est lisible sur 375px de large
- [ ] Pas de scroll horizontal sur la page
- [ ] Les textes ne sont pas tronqués mot par mot
- [ ] Les styles mobiles sont dans la section ≤640px (pas mélangés avec le desktop)

## Architecture du projet

- **index.html** — App principale (React/HTM, single-page)
- **design-system.css** — Source unique de vérité CSS (importé par les deux pages HTML)
- **icons.js** — Icônes SVG exportées sur `window`
- **weatherCodes.js** — Mapping codes météo → icônes SVG
- **massifMapping.js** — Mapping communes → massifs
- **worker/** — Cloudflare Worker proxy (clé API cachée côté serveur, cache partagé 2h)
  - `worker.js` — routes `/weather` et `/search`
  - `wrangler.toml` — config déploiement
  - `package.json` — dépendance Wrangler CLI

## Documentation & Changelog (OBLIGATOIRE)

### Règle absolue

**Avant chaque commit**, tu **DOIS** mettre à jour `CHANGELOG.md` :

1. **Identifier la version** selon le type de changement :
   - `PATCH` (x.x.+1) — Bugfix sans impact UX (ex: 7.4.0 → 7.4.1)
   - `MINOR` (x.+1.0) — Nouvelle fonctionnalité rétrocompatible (ex: 7.4.0 → 7.5.0)
   - `MAJOR` (+1.0.0) — Changement architectural ou rupture (ex: 7.x.x → 8.0.0)
2. **Créer une section** en haut du fichier avec la date du jour
3. **Remplir les rubriques** pertinentes parmi : `### Ajouté`, `### Modifié`, `### Corrigé`, `### Supprimé`, `### Technique`

### Format de section

```markdown
## [X.Y.Z] - AAAA-MM-JJ

### Ajouté
- **Nom de la feature** (`fichier.js`) : description courte — impact utilisateur

### Corrigé
- **Nom du bug** : cause racine → correctif appliqué

### Technique
- `CACHE_VERSION` X → Y (raison)
- `fichier.js` vX → vY (cache bust)
```

### Checklist avant chaque commit (en plus du design system)

- [ ] `CHANGELOG.md` contient une section pour cette version
- [ ] La version dans le CHANGELOG correspond au type de changement (patch/minor/major)
- [ ] Les fichiers modifiés sont listés avec leur impact

### Workflow Git

```
[feature/fix] → branch claude/* → push → auto-merge dans main → Cloudflare Pages deploy
```

- **Ne jamais commiter directement sur `main`** : risque de conflit avec les merges automatiques
- **Si conflit** : merger `origin/main` dans la branch claude, résoudre, puis push
