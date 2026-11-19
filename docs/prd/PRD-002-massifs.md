# PRD-002 — Dossiers Massif

| Statut | Version | Dernière mise à jour | Fichiers |
| --- | --- | --- | --- |
| En production | 8.0.0 | 2026-11-19 | `index.html`, `design-system.css` (`.select`, `.icon-btn`), `design-system.html` |

Document de travail : [PRD — Dossiers Massif](https://claude.ai/artifact/11cD7HJwimmG1tD62f2UqQ)

## Problème
Une seule liste de 5 secteurs mélange les zones (Pyrénées, Alpes…). L'utilisateur veut regrouper ses secteurs
par zone géographique pour gagner en lisibilité et personnaliser son dashboard.

**Vocabulaire** : un **Massif** est un dossier créé par l'utilisateur ; un **Secteur** est un spot suivi (PRD-001).
À ne pas confondre avec les massifs Météo-France du BERA (PRD-005).

## Objectifs et KPIs
| KPI | Cible | Source |
| --- | --- | --- |
| Utilisateurs distincts ayant créé un 2e Massif, 30 jours après la mise en ligne (2026-11-19 → 2026-12-19) | ≥ 5 | GA4 `creation_dossier` avec `nb_dossiers` ≥ 2, métrique « Utilisateurs totaux » |
| Secteurs par Massif | Suivi | GA4 `nb_secteurs` |
| Appels Meteoblue par visite | ≤ niveau actuel (5 max) | Logs Worker |

## Règles fonctionnelles
| ID | Règle |
| --- | --- |
| RF-002-01 | **3 Massifs maximum** par utilisateur (`MAX_MASSIFS`). Au 3e, la création est désactivée avec un message. |
| RF-002-02 | **5 secteurs maximum par Massif** (RF-001-03). |
| RF-002-03 | Un secteur n'appartient qu'à un seul Massif. L'ajout d'un doublon est refusé avec le nom du Massif qui le contient. |
| RF-002-04 | **Seul le Massif ouvert est chargé** (météo, neige, nuages, BERA). |
| RF-002-05 | Le dernier Massif ouvert est mémorisé (`activeMassifId`) et rouvert à la visite suivante. |
| RF-002-06 | Sélecteur de Massif = menu déroulant, Massifs triés par **ordre alphabétique** (insensible aux accents et à la casse). |
| RF-002-07 | Nom de Massif : obligatoire, 30 caractères max, unique (insensible à la casse), espaces en trop retirés. |
| RF-002-08 | Un Massif créé devient le Massif ouvert. |
| RF-002-09 | Renommer un Massif applique RF-002-07 ; le menu se retrie. |
| RF-002-10 | Ordinateur et tablette (> 640px) : les secteurs du Massif ouvert se réordonnent par **glisser-déposer** de leurs tags. Ordre enregistré, aucun appel API. Absent sur mobile. |
| RF-002-11 | Supprimer un Massif supprime **aussi ses secteurs**, après une modale de confirmation qui affiche le nom et le nombre de secteurs. |
| RF-002-12 | Après suppression : ouverture du premier Massif restant (ordre alphabétique) ; s'il n'en reste aucun, écran d'invitation. Supprimer le dernier Massif est autorisé. |
| RF-002-13 | Sans aucun Massif : écran d'invitation « Crée ton premier massif » ; pas de tableaux, aucun appel API. |
| RF-002-14 | **Migration** : au premier lancement, si l'ancienne clé `skiResorts` contient des secteurs, ils sont placés dans un Massif « Mes secteurs » qui devient le Massif ouvert. La migration ne tourne qu'une fois ; `skiResorts` est conservée une version comme sauvegarde. |

## Parcours
```
Ouverture ─▶ Un Massif existe ? ─ non ─▶ Invitation ─▶ Créer un Massif ─┐
                     │ oui                                               ▼
                     └──────────────▶ Ouvrir un Massif (dernier, sinon A→Z) ─▶ Dashboard (1 seul Massif chargé)
                                              ▲   menu : changer de Massif        │ supprimer
                                              └───────────────────────────────────┤
                                     après suppression, on refait le test ◀── Confirmation
```

## Critères d'acceptation
- [ ] Un utilisateur existant retrouve ses secteurs dans « Mes secteurs » sans action.
- [ ] Un nouvel utilisateur voit l'invitation, crée un Massif, puis peut ajouter un secteur.
- [ ] Le bouton de création est désactivé avec 3 Massifs.
- [ ] Changer de Massif ne charge que ses secteurs ; revenir sur un Massif chargé il y a < 4 h ne déclenche aucun appel.
- [ ] Recharger la page rouvre le dernier Massif.
- [ ] Glisser-déposer un tag change l'ordre des lignes dans tous les tableaux, sans appel réseau.
- [ ] Supprimer le dernier Massif ramène à l'invitation.
- [ ] Aucun scroll horizontal de page à 375px.

## Mobile (≤640px)
- Barre Massif en pleine largeur en haut du bloc secteurs : menu déroulant natif + boutons Renommer / Supprimer.
- La dernière option du menu est « + Nouveau massif » (désactivée à 3).
- Pas de glisser-déposer.

## Desktop (≥641px)
- Même barre, largeur limitée ; tags de secteurs déplaçables (curseur « grab »).

## Tracking
| Événement | Déclencheur | Paramètres |
| --- | --- | --- |
| `creation_dossier` | Massif créé | `nb_dossiers` (après création) |
| `changement_dossier` | Autre Massif choisi | `nb_secteurs` du Massif ouvert |
| `suppression_dossier` | Suppression confirmée | `nb_secteurs` supprimés, `nb_dossiers` restants |
| `ajout_secteur` | Secteur ajouté | + `nb_secteurs` du Massif après ajout |

## Hors périmètre (v1)
- Comptes, synchronisation entre appareils.
- Icônes ou couleurs par Massif.
- Déplacer un secteur d'un Massif à un autre (le supprimer puis le rajouter).
- Réordonner les Massifs (ordre alphabétique imposé).
- Partage par lien (retiré, PRD-008).

## Décisions
- 2026-11-19 : KPI mesuré en utilisateurs distincts sur 30 jours (et non en total de Massifs, trop facile à atteindre).
- Prérequis GA4 : déclarer `nb_dossiers` comme dimension personnalisée (portée événement) pour pouvoir filtrer.
