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
  // IDs vérifiés via API: https://public-api.meteofrance.fr/public/DPBRA/v1/massif/BRA?id-massif=XX&format=xml
  {
    id: 64,
    name: "Pays-Basque",
    zone: "Pyrénées Occidentales",
    bounds: {
      latMin: 42.9,
      latMax: 43.3,
      lonMin: -1.8,
      lonMax: -0.7,
    },
  },
  {
    id: 65,
    name: "Aspe-Ossau",
    zone: "Pyrénées Occidentales",
    bounds: {
      latMin: 42.75,
      latMax: 43.1,
      lonMin: -0.7,
      lonMax: -0.3,
    },
  },
  {
    id: 66,
    name: "Haute-Bigorre",
    zone: "Pyrénées Occidentales",
    bounds: {
      latMin: 42.7,
      latMax: 43.05,
      lonMin: -0.1,
      lonMax: 0.35,
    },
  },
  {
    id: 67,
    name: "Aure-Louron",
    zone: "Pyrénées Occidentales",
    bounds: {
      latMin: 42.65,
      latMax: 42.95,
      lonMin: 0.25,
      lonMax: 0.65,
    },
  },
  {
    id: 68,
    name: "Luchonnais",
    zone: "Pyrénées Centrales",
    bounds: {
      latMin: 42.6,
      latMax: 42.9,
      lonMin: 0.5,
      lonMax: 0.9,
    },
  },
  {
    id: 69,
    name: "Couserans",
    zone: "Pyrénées Centrales",
    bounds: {
      latMin: 42.6,
      latMax: 43.0,
      lonMin: 0.8,
      lonMax: 1.3,
    },
  },
  {
    id: 70,
    name: "Haute-Ariège",
    zone: "Pyrénées Centrales",
    bounds: {
      latMin: 42.5,
      latMax: 42.85,
      lonMin: 1.4,
      lonMax: 1.9,
    },
  },
  {
    id: 72,
    name: "Orlu - St-Barthélémy",
    zone: "Pyrénées Centrales",
    bounds: {
      latMin: 42.55,
      latMax: 42.75,
      lonMin: 1.8,
      lonMax: 2.1,
    },
  },
  {
    id: 73,
    name: "Capcir-Puymorens",
    zone: "Pyrénées Orientales",
    bounds: {
      latMin: 42.45,
      latMax: 42.65,
      lonMin: 1.95,
      lonMax: 2.25,
    },
  },
  {
    id: 74,
    name: "Cerdagne-Canigou",
    zone: "Pyrénées Orientales",
    bounds: {
      latMin: 42.3,
      latMax: 42.6,
      lonMin: 2.0,
      lonMax: 2.5,
    },
  },
];

/**
 * MAPPING DIRECT STATIONS → MASSIFS (source: meteofrance.com)
 * Plus fiable que les bounding boxes pour les stations connues
 * Clés en minuscules pour matching insensible à la casse
 */
const STATIONS_MASSIF_MAP = {
  // Aspe-Ossau (65)
  artouste: 65,
  gourette: 65,
  issarbe: 65,
  "la pierre st martin": 65,
  "pierre saint martin": 65,
  somport: 65,
  // Haute-Bigorre (66)
  campan: 66,
  "campan payolle": 66,
  gavarnie: 66,
  gedre: 66,
  hautacam: 66,
  "la mongie": 66,
  tourmalet: 66,
  "piau engaly": 66,
  "piau-engaly": 66,
  "saint lary": 66,
  "saint-lary": 66,
  "saint lary soulan": 66,
  "saint-lary-soulan": 66,
  "val d'azun": 66,
  // Aure-Louron (67)
  nistos: 67,
  peyragudes: 67,
  "val louron": 67,
  // Luchonnais (68)
  "le mourtis": 68,
  superbagneres: 68,
  superbagnères: 68,
  luchon: 68,
  "bagneres de luchon": 68,
  // Couserans (69)
  guzet: 69,
  "guzet neige": 69,
  // Haute-Ariège (70)
  "ax les thermes": 70,
  "ax-les-thermes": 70,
  "ax 3 domaines": 70,
  ascou: 70,
  beille: 70,
  "les monts d'olmes": 70,
  "monts d'olmes": 70,
  // Capcir-Puymorens (73)
  "les angles": 73,
  formigueres: 73,
  formiguères: 73,
  "porté puymorens": 73,
  "porte puymorens": 73,
  "cambre d'aze": 73,
  // Cerdagne-Canigou (74)
  "font romeu": 74,
  "font-romeu": 74,
  "err puigmal": 74,
};

/**
 * MASSIFS ESPAGNOLS LIMITROPHES (pour secteurs côté espagnol)
 * Ces massifs n'ont pas de BRA Météo France mais correspondent aux zones espagnoles
 */
const MASSIFS_ESPAGNOLS_EQUIVALENTS = {
  // Panticosa, Formigal → équivalent Haute-Bigorre
  "Aragon-Gallego": 66,
  // Ordesa, Vignemale → équivalent Haute-Bigorre ou Luchonnais
  "Alto-Aragon": 66,
};

/**
 * Trouve le massif Météo France correspondant à un nom de station ou des coordonnées GPS
 * Priorité : 1) mapping direct par nom, 2) bounding boxes, 3) massif le plus proche
 *
 * @param {number} lat - Latitude (décimal)
 * @param {number} lon - Longitude (décimal)
 * @param {string} [stationName] - Nom de la station (optionnel, améliore la précision)
 * @returns {object|null} { id: number, name: string, zone: string } ou null si hors zone
 */
function getMassifFromCoords(lat, lon, stationName) {
  // 1) Chercher par nom de station (le plus fiable)
  if (stationName) {
    const normalizedName = stationName.toLowerCase().trim();
    // Match exact
    if (STATIONS_MASSIF_MAP[normalizedName] !== undefined) {
      const massifId = STATIONS_MASSIF_MAP[normalizedName];
      const massif = MASSIFS_PYRENEES.find((m) => m.id === massifId);
      if (massif) {
        return { id: massif.id, name: massif.name, zone: massif.zone };
      }
    }
    // Match partiel : le nom contient une clé connue ou inversement
    for (const [key, massifId] of Object.entries(STATIONS_MASSIF_MAP)) {
      if (normalizedName.includes(key) || key.includes(normalizedName)) {
        const massif = MASSIFS_PYRENEES.find((m) => m.id === massifId);
        if (massif) {
          return { id: massif.id, name: massif.name, zone: massif.zone };
        }
      }
    }
  }

  // 2) Chercher par bounding box
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
        zone: massif.zone,
      };
    }
  }

  // 3) Si hors zone, chercher le massif le plus proche
  let closestMassif = null;
  let minDistance = Infinity;

  for (const massif of MASSIFS_PYRENEES) {
    const centerLat = (massif.bounds.latMin + massif.bounds.latMax) / 2;
    const centerLon = (massif.bounds.lonMin + massif.bounds.lonMax) / 2;
    const distance = Math.sqrt(
      Math.pow(lat - centerLat, 2) + Math.pow(lon - centerLon, 2),
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
      distance: Math.round(minDistance * 111),
      warning: "Hors zone exacte, massif le plus proche",
    };
  }

  return null;
}

/**
 * Exemples de mapping pour vos secteurs actuels
 * Note: ne pas appeler getMassifFromCoords ici pour eviter les logs au chargement
 */
const EXEMPLES_SECTEURS = {
  "Pic de Lurtet": {
    coords: { lat: 42.8691, lon: 0.10149 },
    expectedMassif: "Haute-Bigorre (65)",
  },
  "Pic du Pourtalet": {
    coords: { lat: 42.7833, lon: -0.4167 },
    expectedMassif: "Aspe-Ossau (64)",
  },
  Panticosa: {
    coords: { lat: 42.7189, lon: -0.2822 },
    expectedMassif: "Aspe-Ossau (64)",
  },
  "Pic du Midi de Bigorre": {
    coords: { lat: 42.9367, lon: 0.1419 },
    expectedMassif: "Haute-Bigorre (65)",
  },
};

// Export pour navigateur
if (typeof window !== "undefined") {
  window.MASSIFS_PYRENEES = MASSIFS_PYRENEES;
  window.getMassifFromCoords = getMassifFromCoords;
  window.EXEMPLES_SECTEURS = EXEMPLES_SECTEURS;
}

// Export pour Node.js
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    MASSIFS_PYRENEES,
    getMassifFromCoords,
    EXEMPLES_SECTEURS,
  };
}
