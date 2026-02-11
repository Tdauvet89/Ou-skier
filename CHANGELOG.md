# Changelog

Tous les changements notables de ce projet seront documentés dans ce fichier.

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

