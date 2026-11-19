# PRD — Règles fonctionnelles d'Ou-skier

Ce dossier est la **source unique de vérité fonctionnelle** de l'application.
Un PRD = une fonctionnalité = un fichier. Chaque règle porte un identifiant stable (`RF-XXX-NN`)
que l'on cite dans le code, les commits et le CHANGELOG.

> Le design (composants, couleurs, tailles) reste dans `DESIGN_SYSTEM.md` / `design-system.css`.
> Les règles de dev (versioning, git, mobile first) restent dans `CLAUDE.md`.

## Index

| ID | PRD | Statut | Domaine |
| --- | --- | --- | --- |
| PRD-001 | [Gestion des secteurs](PRD-001-secteurs.md) | En production | Recherche, ajout, suppression, limite |
| PRD-002 | [Dossiers Massif](PRD-002-massifs.md) | En développement | Regrouper les secteurs par zone |
| PRD-003 | [Neige : manteau et chutes](PRD-003-neige.md) | En production | Hauteur de neige, chutes 5 jours |
| PRD-004 | [Prévisions météo](PRD-004-previsions-meteo.md) | En production | Vues Par jour / Par heure / Nuages |
| PRD-005 | [Bulletins avalanche (BERA)](PRD-005-bera.md) | En production | Risque, qualité de neige, PDF |
| PRD-006 | [Données, cache et coût API](PRD-006-cache-api.md) | En production | Proxy, caches, stockage local |
| PRD-007 | [Mesure d'audience (GA4)](PRD-007-tracking.md) | En production | Événements analytics |
| PRD-008 | [Partage par lien](PRD-008-partage.md) | Retiré (v8.0.0) | Historique |

## Règles d'usage

1. **Avant de coder** une évolution fonctionnelle : lire le(s) PRD concerné(s).
2. **Nouvelle fonctionnalité** : créer `PRD-NNN-nom.md` à partir de [`_TEMPLATE.md`](_TEMPLATE.md) et l'ajouter à l'index.
3. **Règle modifiée** : mettre à jour le PRD dans le même commit que le code. Ne jamais réutiliser un ID supprimé.
4. **Conflit** entre le code et un PRD : le PRD fait foi, sauf décision produit contraire (alors on met le PRD à jour).
5. Le CHANGELOG cite les règles touchées, ex. `(RF-002-04)`.
