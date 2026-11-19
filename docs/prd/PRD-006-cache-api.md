# PRD-006 — Données, cache et coût API

| Statut | Version | Dernière mise à jour | Fichiers |
| --- | --- | --- | --- |
| En production | 8.0.0 | 2026-11-19 | `index.html` (cache, stockage), `worker/worker.js` |

## Problème
Chaque appel Meteoblue coûte des crédits. L'app doit rester rapide et pas chère, sans compte utilisateur.

## Objectifs et KPIs
| KPI | Cible | Source |
| --- | --- | --- |
| Appels Meteoblue par visite | ≤ nombre de secteurs du Massif ouvert (5 max) | Logs du Worker |

## Règles fonctionnelles
| ID | Règle |
| --- | --- |
| RF-006-01 | Tous les appels externes passent par le Worker Cloudflare (`/weather`, `/search`, `/bra`). Aucune clé API dans le navigateur. |
| RF-006-02 | Cache serveur Cloudflare 4 h, partagé entre tous les utilisateurs. |
| RF-006-03 | Cache navigateur 4 h (`weatherCache`), **un cache par Massif**, valide seulement si la liste exacte de secteurs (nom + lat + lon + altitude) n'a pas changé. Versionné par `CACHE_VERSION`. |
| RF-006-04 | Seul le **Massif ouvert** est chargé. Changer de Massif réutilise son cache s'il est valide. |
| RF-006-05 | Ajouter ou supprimer un secteur invalide le cache du Massif concerné. Réordonner les secteurs ne l'invalide pas et ne déclenche aucun appel. |
| RF-006-06 | Toutes les données utilisateur vivent dans `localStorage` (pas de compte, pas de synchro) : clé `massifs` (Massifs et secteurs), `activeMassifId` (dernier Massif ouvert), `lastWeatherUpdate`. |
| RF-006-07 | Toute lecture de `localStorage` est protégée : donnée corrompue = état vide, jamais d'écran blanc. |

## Hors périmètre
- Synchronisation entre appareils, comptes utilisateurs.
