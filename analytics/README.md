# Google Analytics 4 — Documentation Ou-skier

## Propriété GA4
- **ID** : G-CB6G3EL32M
- **Lien direct** : https://analytics.google.com/analytics/web/#/p/450614976/reports/dashboard

## Structure du dossier

- **`README.md`** ← tu es ici
- **`events.md`** — Événements trackés (code source)
- **`custom-dimensions.md`** — Custom dimensions enregistrées et à enregistrer
- **`checklist.md`** — Checklist pour debug et investigation

## Accès rapides GA4

### DebugView (pour tester le tracking)
1. Ajouter `?debug_mode=1` à l'URL
2. Aller dans GA4 → **Admin** → **DebugView**
3. Les événements en temps réel apparaissent avec tous les paramètres

### Custom Dimensions (paramètres personnalisés)
GA4 → **Admin** → **Custom definitions** → **Create custom dimension**

### Rapports live
GA4 → **Realtime** — voir les utilisateurs et événements en direct

### Explore (data brute)
GA4 → **Explore** → **Free form report** — requêtes SQL-like sur les données brutes

---

## Workflow debug GA4

1. Ajoute `?debug_mode=1` à l'URL
2. Ouvre GA4 DebugView
3. Reproduis l'action (recherche, ajout secteur, etc.)
4. Vérifie que l'événement arrive avec les bons paramètres (`ep.nom_secteur`, etc.)
5. **24-48h après** : le paramètre apparaît dans "Create custom dimension"
6. Crée la custom dimension dans GA4 Admin
7. Update `custom-dimensions.md` pour tracker ce qu'on a créé
