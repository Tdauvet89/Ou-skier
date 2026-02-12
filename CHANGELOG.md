# Changelog

Tous les changements notables de ce projet seront documentés dans ce fichier.

## [6.7.0] - 2026-02-12

### Corrige
- **Liens Meteoblue corriges** : les noms de stations pointaient vers de mauvaises pages (ex: Missouri, USA au lieu de Guzet, France). Utilisation du champ `url` officiel retourne par l'API de recherche Meteoblue (ex: `guzet-neige_france_7580803`)
- Le `mbUrl` est stocke avec chaque station (DEFAULT_RESORTS et ajout dynamique)

### Modifie
- **Hyperlinks en bleu** : tous les liens dans les tableaux sont desormais en bleu (`#2980b9`) avec soulignement pour indiquer clairement qu'ils sont cliquables
- Suppression des styles inline de couleur sur les liens (centralise en CSS)

## [6.6.0] - 2026-02-12

### Corrige
- **IDs massifs Meteo France corriges** : tous les IDs etaient decales de 1 (ex: Haute-Bigorre etait 65 au lieu de 66). IDs verifies via l'API `DPBRA/v1/massif/BRA`
- Mapping complet : Pays-Basque (64), Aspe-Ossau (65), Haute-Bigorre (66), Aure-Louron (67), Luchonnais (68), Couserans (69), Haute-Ariege (70), Orlu St-Barthelemy (72), Capcir-Puymorens (73), Cerdagne-Canigou (74)
- Ajout du massif Pays-Basque (64), suppression d'Andorre (71, pas de BRA disponible)
- **Mapping direct par nom de station** (`STATIONS_MASSIF_MAP`) base sur meteofrance.com, prioritaire sur les bounding boxes GPS
- `getMassifFromCoords` accepte un 3e parametre `stationName` pour un matching fiable
- Ajout de `CACHE_VERSION` pour invalider automatiquement le cache apres un changement de logique
- Cache-busting sur les fichiers JS externes (`?v=X.X.X`)

## [6.4.0] - 2026-02-12

### Modifie
- **Cellules vue jour redesignees** : layout horizontal 30/70 (icone meteo a gauche x2 taille, infos a droite alignees)
- Suppression des icones inline (temperature, vent, risque) pour plus de lisibilite
- Taille de police harmonisee sur les 4 lignes d'info (temperature, vent, risque, lien BERA)
- **Tooltip sur les icones meteo** : au survol, affiche la description (ex: "Neige legere") en vue jour et vue horaire
- Titre du tableau passe de "Meteo Comparative (7 jours)" a "Meteo Comparative (5 jours)"

## [6.3.0] - 2026-02-12

### Ajoute
- **Modale BERA PDF** : au clic sur "Voir le BERA", le PDF officiel Meteo France est telecharge via l'API et affiche dans un iframe
- Le PDF contient toutes les images officielles : risque avalanche, rose des pentes, enneigement, neige fraiche, apercu meteo
- Lien "Voir le BERA" deplace dans la cellule Jour J (au lieu de la colonne station)
- Modale avec header (titre + X), contenu PDF plein ecran, footer (bouton Fermer)
- Fermeture par clic sur fond sombre, bouton X ou bouton Fermer
- Liberation du blob URL a la fermeture (pas de fuite memoire)

### Supprime
- Ancienne modale BERA textuelle (remplacee par le PDF embed)

## [6.2.0] - 2026-02-11

### Corrige
- **Parsing BRA corrige** : lecture des attributs `RISQUE1`, `RISQUEMAXI`, `RISQUEMAXIJ2` depuis `CARTOUCHERISQUE > RISQUE` (au lieu des balises `ECHEANCE` qui contenaient des donnees meteo, pas les risques)
- Support des risques differencies par altitude (`LOC1`/`LOC2`/`RISQUE2`)
- Extraction des donnees detaillees du BERA : massif, commentaire risque, resume avalanches, stabilite, qualite neige, enneigement, pentes exposees

### Modifie
- Badge BRA simplifie : affiche "Risque : X/5" sans fleches haut/bas

## [6.1.0] - 2026-02-11

### Modifie
- **API Key Meteo France BRA** : remplacement du systeme OAuth2 (token 1h + auto-renouvellement) par une API Key statique 1 an via header `apikey:`
- Suppression de la fonction `getMeteoFranceToken()` et des variables OAuth2 (`MF_APPLICATION_ID`)
- Plus de probleme CORS (le endpoint `/token` bloquait les requetes navigateur, le header `apikey:` fonctionne directement)
- Mise a jour de la cle API Meteoblue (`LuUd7q9wHpiG1aWh`)

## [6.0.0] - 2026-02-11

### Ajouté
- **Cache localStorage des données météo** (TTL 2h) : les données API sont mises en cache et réutilisées pendant 2h, évitant les appels API redondants à chaque rechargement de page
- Badge vert "CACHE" dans le header quand les données proviennent du cache
- Invalidation automatique du cache à l'ajout/suppression d'une station
- Le bouton "Actualiser" force toujours un appel API frais (bypass cache)
- Sauvegarde des données BRA dans le cache (en plus des données Meteoblue)

### Supprimé
- **Packages API `clouds-1h` et `clouds-day`** retirés de l'URL Meteoblue (non utilisés, consommaient des crédits inutilement)

### Impact
- Réduction estimée de 70-90% des appels API en usage normal
- Packages API passés de 7 à 5 par appel (économie de crédits)
- Aucun impact sur l'expérience utilisateur

## [2.3.0] - 2026-02-08

### Ajouté
- Système de logging des appels API Meteoblue
- Compteur d'appels API (aujourd'hui / total / échecs)
- Bouton de téléchargement du log API
- Bouton de réinitialisation du log
- Console logging pour debug en temps réel
- Documentation complète du système de logging (API-LOGGING.md)

### Modifié
- **Suppression des restrictions de temps** (7h-20h et 2h entre actualisations)
- Bouton "Actualiser" maintenant toujours disponible
- Responsabilité de la gestion du quota API laissée à l'utilisateur

### Raison
- Meilleure expérience utilisateur
- L'utilisateur gère lui-même son quota via les statistiques visibles
- Transparence totale sur la consommation API

## [2.2.0] - 2026-02-08

### Corrigé
- Chargement initial qui ignorait les restrictions et ne chargeait pas les données
- Nouvelle fonction `loadInitialWeatherData()` pour le premier chargement

## [2.1.0] - 2026-02-08

### Corrigé
- Suppression du reload de page lors de l'ajout d'un secteur
- Ajout direct dans les tableaux sans rechargement

### Modifié
- Réduction de 2px de la police dans tous les tableaux
- Tableaux plus compacts et lisibles

## [2.0.0] - 2026-02-08

### Ajouté
- Affichage de l'altitude à côté des secteurs dans les tableaux
- Système de contrôle des appels API (toutes les 2h, 7h-20h)
- Compteur "Prochaine mise à jour possible dans X"
- Messages informatifs sur la disponibilité du bouton
- Heure ajoutée dans le bandeau de mise à jour

### Modifié
- Période affichée : J-2 à J+4 (au lieu de J-3 à J+3)
- Traduction complète en français (Today → Aujourd'hui, etc.)
- Bouton "Ajouter un secteur" toujours visible
- Message "Aucun secteur" si liste vide

## [1.0.0] - 2026-02-08

### Ajouté
- Tableau des chutes de neige sur 7 jours (J-3 à J+3)
- Tableau météo détaillé avec températures min/max
- Système d'ajout de secteurs via recherche automatique Meteoblue
- Suppression de secteurs avec bouton (×)
- Sauvegarde automatique des secteurs dans LocalStorage
- Affichage personnalisé des dates (Today, Tomorrow, After tomorrow)
- Mise en évidence de la colonne "Today"
- Bouton d'actualisation des données
- Design alpin avec dégradé bleu montagne
- Indicateurs visuels (neige importante en orange, températures colorées)

### Technique
- React 18 pour l'interface
- API Meteoblue pour les données météo
- Polices personnalisées : Barlow Condensed + JetBrains Mono
- Responsive design (mobile, tablette, desktop)
- Animations CSS fluides

## [À venir]

### Version 3.0
- [ ] Graphiques de tendances
- [ ] Mode sombre
- [ ] Export PDF des prévisions
- [ ] Alertes neige fraîche (push notifications)
- [ ] Comparaison multi-stations

