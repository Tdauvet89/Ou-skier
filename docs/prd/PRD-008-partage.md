# PRD-008 — Partage par lien (retiré)

| Statut | Version | Dernière mise à jour | Fichiers |
| --- | --- | --- | --- |
| Retiré | 8.0.0 | 2026-11-19 | `index.html` |

## Historique
Un bouton « Partager » copiait une URL `?s=<base64>` contenant la liste des secteurs. Décision produit (2026-11-19) : la fonctionnalité ne marche pas et est retirée avec l'arrivée des Massifs (PRD-002).

## Règles fonctionnelles
| ID | Règle |
| --- | --- |
| RF-008-01 | Plus de bouton Partager ni d'événement `partager_dashboard`. |
| RF-008-02 | Un ancien lien `?s=...` ouvre l'app normalement : le paramètre est ignoré et retiré de l'URL, sans erreur. |
