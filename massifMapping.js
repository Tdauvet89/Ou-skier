/**
 * MAPPING MASSIFS MÉTÉO FRANCE - PYRÉNÉES
 * 
 * Convertit les coordonnées GPS (lat, lon) en ID de massif Météo France
 * pour les bulletins d'avalanche (BRA)
 * 
 * @module massifMapping
 */

/**
 * Liste des massifs Pyrénées avec leurs zones géographiques
 * Source: Météo France BRA
 */
const MASSIFS_PYRENEES = [
    // PYRÉNÉES OCCIDENTALES
    {
        id: 64,
        name: "Aspe-Ossau",
        zone: "Pyrénées Occidentales",
        bounds: {
            latMin: 42.75,
            latMax: 43.10,
            lonMin: -0.70,
            lonMax: -0.30
        }
    },
    {
        id: 65,
        name: "Haute-Bigorre",
        zone: "Pyrénées Occidentales",
        bounds: {
            latMin: 42.70,
            latMax: 43.05,
            lonMin: -0.10,
            lonMax: 0.35
        }
    },
    {
        id: 66,
        name: "Aure-Louron",
        zone: "Pyrénées Occidentales",
        bounds: {
            latMin: 42.65,
            latMax: 42.95,
            lonMin: 0.25,
            lonMax: 0.65
        }
    },
    {
        id: 67,
        name: "Luchonnais",
        zone: "Pyrénées Centrales",
        bounds: {
            latMin: 42.60,
            latMax: 42.90,
            lonMin: 0.50,
            lonMax: 0.90
        }
    },
    {
        id: 68,
        name: "Couserans",
        zone: "Pyrénées Centrales",
        bounds: {
            latMin: 42.60,
            latMax: 43.00,
            lonMin: 0.80,
            lonMax: 1.30
        }
    },
    {
        id: 69,
        name: "Haute-Ariège",
        zone: "Pyrénées Centrales",
        bounds: {
            latMin: 42.50,
            latMax: 42.85,
            lonMin: 1.40,
            lonMax: 1.90
        }
    },
    {
        id: 70,
        name: "Andorre",
        zone: "Pyrénées Centrales",
        bounds: {
            latMin: 42.40,
            latMax: 42.70,
            lonMin: 1.40,
            lonMax: 1.80
        }
    },
    {
        id: 71,
        name: "Orlu - St-Barthélémy",
        zone: "Pyrénées Centrales",
        bounds: {
            latMin: 42.55,
            latMax: 42.75,
            lonMin: 1.80,
            lonMax: 2.10
        }
    },
    {
        id: 72,
        name: "Capcir-Puymorens",
        zone: "Pyrénées Orientales",
        bounds: {
            latMin: 42.45,
            latMax: 42.65,
            lonMin: 1.95,
            lonMax: 2.25
        }
    },
    {
        id: 73,
        name: "Cerdagne-Canigou",
        zone: "Pyrénées Orientales",
        bounds: {
            latMin: 42.30,
            latMax: 42.60,
            lonMin: 2.00,
            lonMax: 2.50
        }
    }
];

/**
 * MASSIFS ESPAGNOLS LIMITROPHES (pour secteurs côté espagnol)
 * Ces massifs n'ont pas de BRA Météo France mais correspondent aux zones espagnoles
 */
const MASSIFS_ESPAGNOLS_EQUIVALENTS = {
    // Panticosa, Formigal → équivalent Haute-Bigorre
    "Aragon-Gallego": 65,
    // Ordesa, Vignemale → équivalent Haute-Bigorre ou Luchonnais
    "Alto-Aragon": 65
};

/**
 * Trouve le massif Météo France correspondant à des coordonnées GPS
 * 
 * @param {number} lat - Latitude (décimal)
 * @param {number} lon - Longitude (décimal)
 * @returns {object|null} { id: number, name: string, zone: string } ou null si hors zone
 */
function getMassifFromCoords(lat, lon) {
    // Chercher le massif qui contient ces coordonnées
    for (const massif of MASSIFS_PYRENEES) {
        if (
            lat >= massif.bounds.latMin &&
            lat <= massif.bounds.latMax &&
            lon >= massif.bounds.lonMin &&
            lon <= massif.bounds.lonMax
        ) {
            return {
                id: massif.id,
                name: massif.name,
                zone: massif.zone
            };
        }
    }
    
    // Si hors zone française, chercher le massif le plus proche
    let closestMassif = null;
    let minDistance = Infinity;
    
    for (const massif of MASSIFS_PYRENEES) {
        // Calculer le centre du massif
        const centerLat = (massif.bounds.latMin + massif.bounds.latMax) / 2;
        const centerLon = (massif.bounds.lonMin + massif.bounds.lonMax) / 2;
        
        // Distance approximative (formule simple)
        const distance = Math.sqrt(
            Math.pow(lat - centerLat, 2) + Math.pow(lon - centerLon, 2)
        );
        
        if (distance < minDistance) {
            minDistance = distance;
            closestMassif = massif;
        }
    }
    
    // Si le plus proche est à moins de 0.3° (~30km), on l'utilise
    if (minDistance < 0.3 && closestMassif) {
        return {
            id: closestMassif.id,
            name: closestMassif.name,
            zone: closestMassif.zone,
            distance: Math.round(minDistance * 111), // Conversion en km approximatif
            warning: "Hors zone exacte, massif le plus proche"
        };
    }
    
    return null;
}

/**
 * Exemples de mapping pour vos secteurs actuels
 */
const EXEMPLES_SECTEURS = {
    "Pic de Lurtet": {
        coords: { lat: 42.8691, lon: 0.10149 },
        massif: getMassifFromCoords(42.8691, 0.10149)
        // → Haute-Bigorre (65)
    },
    "Pic du Pourtalet": {
        coords: { lat: 42.7833, lon: -0.4167 },
        massif: getMassifFromCoords(42.7833, -0.4167)
        // → Aspe-Ossau (64)
    },
    "Panticosa": {
        coords: { lat: 42.7189, lon: -0.2822 },
        massif: getMassifFromCoords(42.7189, -0.2822)
        // → Aspe-Ossau (64) ou Haute-Bigorre (65)
    },
    "Pic du Midi de Bigorre": {
        coords: { lat: 42.9367, lon: 0.1419 },
        massif: getMassifFromCoords(42.9367, 0.1419)
        // → Haute-Bigorre (65)
    }
};

// Export pour navigateur
if (typeof window !== 'undefined') {
    window.MASSIFS_PYRENEES = MASSIFS_PYRENEES;
    window.getMassifFromCoords = getMassifFromCoords;
    window.EXEMPLES_SECTEURS = EXEMPLES_SECTEURS;
}

// Export pour Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        MASSIFS_PYRENEES,
        getMassifFromCoords,
        EXEMPLES_SECTEURS
    };
}
