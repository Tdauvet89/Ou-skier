# PRD-007 — Mesure d'audience (GA4)

| Statut | Version | Dernière mise à jour | Fichiers |
| --- | --- | --- | --- |
| En production | 8.0.0 | 2026-11-19 | `index.html` |

## Règles fonctionnelles
| ID | Règle |
| --- | --- |
| RF-007-01 | Chaque appel `gtag` est protégé par `typeof gtag === 'function'` (bloqueurs de pub). |
| RF-007-02 | Noms d'événements en `snake_case` français ; paramètres en `snake_case`. |
| RF-007-03 | Aucune donnée personnelle dans les paramètres. |

## Catalogue des événements
| Événement | PRD | Déclencheur | Paramètres |
| --- | --- | --- | --- |
| `ajout_secteur` | 001 | Secteur ajouté | `nom_secteur`, `region_secteur`, `altitude_secteur`, `query_secteur`, `nb_secteurs` |
| `recherche_vide` | 001 | Recherche sans résultat | `query_secteur` |
| `creation_dossier` | 002 | Massif créé | `nb_dossiers` |
| `changement_dossier` | 002 | Autre Massif choisi | `nb_secteurs` |
| `suppression_dossier` | 002 | Suppression confirmée | `nb_secteurs`, `nb_dossiers` |
| `vue_meteo_switch` | 004 | Changement de vue météo | `vue` |
| ~~`partager_dashboard`~~ | 008 | Retiré en 8.0.0 | — |
