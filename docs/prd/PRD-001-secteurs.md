# PRD-001 — Gestion des secteurs

| Statut | Version | Dernière mise à jour | Fichiers |
| --- | --- | --- | --- |
| En production | 8.0.0 | 2026-11-19 | `index.html` (`AddResortModal`, `addResort`, `removeResort`), `peaks.js`, `worker/worker.js` (`/search`) |

## Problème
Un skieur de randonnée veut comparer d'un coup d'œil les conditions de quelques spots précis (stations, pics, cols).
Un **secteur** est un de ces spots : nom, latitude, longitude, altitude.

## Règles fonctionnelles
| ID | Règle |
| --- | --- |
| RF-001-01 | Un secteur = `{ name, lat, lon, altitude, mbUrl? }`. Altitude par défaut : 1000 m si la source n'en donne pas. |
| RF-001-02 | Un secteur est toujours ajouté dans le **Massif ouvert** (voir PRD-002). |
| RF-001-03 | **5 secteurs maximum par Massif** (`MAX_RESORTS`). Au-delà, la modale affiche « Le nombre de secteur maximum est atteint » et un lien « Proposer une amélioration ». |
| RF-001-04 | Recherche lancée à partir de **3 caractères**, après 500 ms sans frappe (debounce). |
| RF-001-05 | Sources de recherche fusionnées : Meteoblue (`/search`), requête alternative sans articles français (« du », « de la »…), base locale de pics pyrénéens (`peaks.js`). Dédoublonnage par nom normalisé (sans accents ni casse). 10 résultats max. |
| RF-001-06 | Chaque résultat affiche nom, pays, région et altitude. |
| RF-001-07 | Aucun résultat : message d'aide en 3 conseils (lieu connu, orthographe, ville ou village). |
| RF-001-08 | Un même secteur (même nom, même lat/lon) ne peut pas exister dans deux Massifs. |
| RF-001-09 | Supprimer un secteur (croix sur son tag) le retire du Massif ouvert et de tous les tableaux, sans recharger les autres secteurs. |
| RF-001-10 | Ajouter un secteur ne charge que ses propres données (météo + BERA), pas tout le Massif. |
| RF-001-11 | Chaque nom de secteur dans les tableaux est un lien vers sa page Meteoblue (slug du nom + lat/lon/asl). |

## Critères d'acceptation
- [ ] À 5 secteurs, la modale d'ajout montre le message de limite au lieu de la recherche.
- [ ] Taper « Pic du barassé » trouve « Pic de Barassé ».
- [ ] Supprimer un secteur ne déclenche aucun appel API.

## Mobile (≤640px)
- Tags de secteurs en retour à la ligne, aucun scroll horizontal de page.
- Modale d'ajout en pleine largeur.

## Tracking
| Événement | Déclencheur | Paramètres |
| --- | --- | --- |
| `ajout_secteur` | Secteur choisi dans la recherche | `nom_secteur`, `region_secteur`, `altitude_secteur`, `query_secteur`, `nb_secteurs` |
| `recherche_vide` | Recherche sans résultat | `query_secteur` |

## Hors périmètre
- Saisie manuelle de coordonnées GPS.
- Renommer un secteur.
