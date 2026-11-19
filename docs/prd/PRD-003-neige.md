# PRD-003 — Neige : manteau et chutes

| Statut | Version | Dernière mise à jour | Fichiers |
| --- | --- | --- | --- |
| En production | 7.36.0 | 2026-11-19 | `index.html` (`processSnowDataForResort`), `design-system.css` (`.snow-table`) |

## Problème
Le premier critère d'un skieur est la neige : combien il y en a au sol et combien il va en tomber.

## Règles fonctionnelles
| ID | Règle |
| --- | --- |
| RF-003-01 | Tableau **Manteau neigeux** : hauteur de neige du jour en cm (`snowdepth_mean` du jour × 100, arrondi). |
| RF-003-02 | Si la hauteur journalière vaut 0, on prend la valeur horaire (`data_1h.snowdepth`) la plus proche de maintenant. |
| RF-003-03 | Sous la hauteur : « Dernière chute : JJ/MM/AA : X cm » quand une chute récente est connue. |
| RF-003-04 | Tableau **Chutes de neige 5 jours** : neige fraîche en cm pour aujourd'hui + 4 jours, en-têtes « Jour abrégé + numéro ». |
| RF-003-05 | Une ligne par secteur du Massif ouvert, dans l'ordre du Massif. Nom du secteur + altitude entre parenthèses. |
| RF-003-06 | Sans secteur : « Aucun secteur à afficher ». |
| RF-003-07 | Sous-titre : « Source : Meteoblue, mise à jour à HHhMM ». |

## Mobile (≤640px)
- Les deux tableaux s'empilent ; colonne Secteur figée (sticky) et scroll horizontal **interne** au tableau.

## Hors périmètre
- Historique de neige au-delà de la dernière chute.
