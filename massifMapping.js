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
      latMax: 43.1,
      lonMin: -0.7,
      lonMax: -0.3,
    },
  },
  {
    id: 65,
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
    id: 66,
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
    id: 67,
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
    id: 68,
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
    id: 69,
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
    id: 70,
    name: "Andorre",
    zone: "Pyrénées Centrales",
    bounds: {
      latMin: 42.4,
      latMax: 42.7,
      lonMin: 1.4,
      lonMax: 1.8,
    },
  },
  {
    id: 71,
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
    id: 72,
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
    id: 73,
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
  // Aspe-Ossau (64)
  artouste: 64,
  gourette: 64,
  issarbe: 64,
  "la pierre st martin": 64,
  "pierre saint martin": 64,
  somport: 64,
  // Haute-Bigorre (65)
  campan: 65,
  "campan payolle": 65,
  gavarnie: 65,
  gedre: 65,
  hautacam: 65,
  "la mongie": 65,
  tourmalet: 65,
  "piau engaly": 65,
  "piau-engaly": 65,
  "saint lary": 65,
  "saint-lary": 65,
  "saint lary soulan": 65,
  "saint-lary-soulan": 65,
  "val d'azun": 65,
  // Aure-Louron (66)
  nistos: 66,
  peyragudes: 66,
  "val louron": 66,
  // Luchonnais (67)
  "le mourtis": 67,
  superbagneres: 67,
  superbagnères: 67,
  luchon: 67,
  "bagneres de luchon": 67,
  // Couserans (68)
  guzet: 68,
  "guzet neige": 68,
  // Haute-Ariège (69)
  "ax les thermes": 69,
  "ax-les-thermes": 69,
  "ax 3 domaines": 69,
  ascou: 69,
  beille: 69,
  "les monts d'olmes": 69,
  "monts d'olmes": 69,
  // Capcir-Puymorens (72)
  "les angles": 72,
  formigueres: 72,
  formiguères: 72,
  "porté puymorens": 72,
  "porte puymorens": 72,
  "cambre d'aze": 72,
  // Cerdagne-Canigou (73)
  "font romeu": 73,
  "font-romeu": 73,
  "err puigmal": 73,
};

/**
 * MASSIFS ESPAGNOLS LIMITROPHES (pour secteurs côté espagnol)
 * Ces massifs n'ont pas de BRA Météo France mais correspondent aux zones espagnoles
 */
const MASSIFS_ESPAGNOLS_EQUIVALENTS = {
  // Panticosa, Formigal → équivalent Haute-Bigorre
  "Aragon-Gallego": 65,
  // Ordesa, Vignemale → équivalent Haute-Bigorre ou Luchonnais
  "Alto-Aragon": 65,
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
 */
const EXEMPLES_SECTEURS = {
  "Pic de Lurtet": {
    coords: { lat: 42.8691, lon: 0.10149 },
    massif: getMassifFromCoords(42.8691, 0.10149),
    // → Haute-Bigorre (65)
  },
  "Pic du Pourtalet": {
    coords: { lat: 42.7833, lon: -0.4167 },
    massif: getMassifFromCoords(42.7833, -0.4167),
    // → Aspe-Ossau (64)
  },
  Panticosa: {
    coords: { lat: 42.7189, lon: -0.2822 },
    massif: getMassifFromCoords(42.7189, -0.2822),
    // → Aspe-Ossau (64) ou Haute-Bigorre (65)
  },
  "Pic du Midi de Bigorre": {
    coords: { lat: 42.9367, lon: 0.1419 },
    massif: getMassifFromCoords(42.9367, 0.1419),
    // → Haute-Bigorre (65)
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
