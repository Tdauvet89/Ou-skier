# PRD-004 — Prévisions météo

| Statut | Version | Dernière mise à jour | Fichiers |
| --- | --- | --- | --- |
| En production | 7.35.1 | 2026-11-19 | `index.html` (`processWeatherDataForResort`, `processHourlyDataForResort`, `CloudMeteogram`), `weatherCodes.js`, `icons.js` |

## Problème
Après la neige, le skieur arbitre sur le temps, le vent et la visibilité, au jour puis à l'heure.

## Règles fonctionnelles
| ID | Règle |
| --- | --- |
| RF-004-01 | Un toggle à 3 vues : **Par jour** (défaut), **Par heure**, **Nuages**. |
| RF-004-02 | Par jour : 5 colonnes (Aujourd'hui, Demain, puis « Jour JJ/MM »). Chaque cellule : icône + description, température moyenne (min/max), vent moyen + direction, rafales colorées, précipitations (neige en cm / pluie en mm). |
| RF-004-03 | Couleur des rafales selon la vitesse (`getWindColor`). Direction affichée en point cardinal + flèche. |
| RF-004-04 | Par jour, colonnes J à J+2 : badge de risque avalanche BERA du massif du secteur (PRD-005). |
| RF-004-05 | Par heure : créneaux de 3 h ; icônes jour/nuit selon l'heure. |
| RF-004-06 | Nuages : météogramme canvas en 3 couches (basse 0–4 km, moyenne 4–8 km, haute 8–15 km), opacité = couverture, fond jour/nuit. |
| RF-004-07 | Survol de l'icône météo : description en tooltip. |
| RF-004-08 | Une ligne par secteur du Massif ouvert, dans l'ordre du Massif. |

## Mobile (≤640px)
- Par heure et Nuages : un seul jour affiché à la fois, choisi par des onglets de jours défilants.
- Libellés d'axes raccourcis sur le météogramme.

## Tracking
| Événement | Déclencheur | Paramètres |
| --- | --- | --- |
| `vue_meteo_switch` | Changement de vue | `vue` = `jour` / `heure` / `nuages` |
