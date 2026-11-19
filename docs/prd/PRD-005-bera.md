# PRD-005 — Bulletins avalanche (BERA)

| Statut | Version | Dernière mise à jour | Fichiers |
| --- | --- | --- | --- |
| En production | 7.36.0 | 2026-11-19 | `index.html` (`fetchBRAForResorts`, modale BERA), `massifMapping.js`, `worker/worker.js` (`/bra`) |

## Problème
Le risque d'avalanche conditionne la sortie. Il est publié par Météo-France par **massif officiel**, pas par spot.

> Ne pas confondre : le *massif Météo-France* (ex. « Haute-Ariège ») est une zone officielle déduite des coordonnées ;
> le *Massif* de PRD-002 est un dossier créé par l'utilisateur.

## Règles fonctionnelles
| ID | Règle |
| --- | --- |
| RF-005-01 | Chaque secteur est rattaché à un massif Météo-France : d'abord par nom de station connu (`STATIONS_MASSIF_MAP`), sinon par coordonnées GPS. Couverture : Alpes du Nord, Alpes du Sud, Corse, Pyrénées. |
| RF-005-02 | Un secteur hors massif connu n'a pas de BERA : aucun badge, pas d'erreur. |
| RF-005-03 | Risque affiché J, J+1, J+2 en vue Par jour ; risques différenciés haut/bas quand le bulletin les distingue. |
| RF-005-04 | Couleurs : 1 vert, 2 jaune, 3 orange, 4–5 rouge (`getBRAColor`). |
| RF-005-05 | Tableau **Qualité de la neige** : textes enneigement et qualité extraits du BERA ; massifs aux textes identiques regroupés en une ligne. |
| RF-005-06 | Clic sur un massif : modale avec le PDF officiel (chargé via `/bra?format=pdf`), message d'erreur si échec. |
| RF-005-07 | Seuls les massifs Météo-France des secteurs du **Massif ouvert** sont chargés. |
| RF-005-08 | Un BERA vide (échec) n'est jamais mis en cache ; il est re-tenté en arrière-plan. |
| RF-005-09 | La clé Météo-France reste côté Worker, jamais dans le navigateur. |
