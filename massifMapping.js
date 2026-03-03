/**
 * MAPPING MASSIFS MÉTÉO FRANCE - FRANCE ENTIÈRE
 *
 * Convertit les coordonnées GPS (lat, lon) en ID de massif Météo France
 * pour les bulletins d'avalanche (BRA / BERA)
 *
 * Massifs couverts :
 *   - Alpes du Nord  : IDs 1–15  (Haute-Savoie, Savoie, Isère)
 *   - Alpes du Sud   : IDs 16–23 (Hautes-Alpes, Alpes-de-Haute-Provence, Alpes-Maritimes)
 *   - Corse          : IDs 40–41
 *   - Pyrénées       : IDs 64–74 (+ 71 Andorre)
 *
 * Source IDs : https://public-api.meteofrance.fr/public/DPBRA/v1/massif/BRA?id-massif=XX&format=xml
 *
 * @module massifMapping
 */

// ---------------------------------------------------------------------------
// ALPES DU NORD — IDs 1–15
// ---------------------------------------------------------------------------
const MASSIFS_ALPES_NORD = [
  {
    id: 1,
    name: "Chablais",
    zone: "Alpes du Nord",
    bounds: { latMin: 46.1, latMax: 46.45, lonMin: 6.4, lonMax: 6.95 },
  },
  {
    id: 2,
    name: "Aravis",
    zone: "Alpes du Nord",
    bounds: { latMin: 45.8, latMax: 46.1, lonMin: 6.3, lonMax: 6.65 },
  },
  {
    id: 3,
    name: "Mont-Blanc",
    zone: "Alpes du Nord",
    bounds: { latMin: 45.75, latMax: 46.1, lonMin: 6.65, lonMax: 7.1 },
  },
  {
    id: 4,
    name: "Bauges",
    zone: "Alpes du Nord",
    bounds: { latMin: 45.5, latMax: 45.85, lonMin: 5.9, lonMax: 6.4 },
  },
  {
    id: 5,
    name: "Beaufortain",
    zone: "Alpes du Nord",
    bounds: { latMin: 45.65, latMax: 45.95, lonMin: 6.35, lonMax: 6.7 },
  },
  {
    id: 6,
    name: "Haute-Tarentaise",
    zone: "Alpes du Nord",
    bounds: { latMin: 45.35, latMax: 45.75, lonMin: 6.65, lonMax: 7.15 },
  },
  {
    id: 7,
    name: "Chartreuse",
    zone: "Alpes du Nord",
    bounds: { latMin: 45.15, latMax: 45.55, lonMin: 5.5, lonMax: 5.9 },
  },
  {
    id: 8,
    name: "Belledonne",
    zone: "Alpes du Nord",
    bounds: { latMin: 45.1, latMax: 45.6, lonMin: 5.9, lonMax: 6.25 },
  },
  {
    id: 9,
    name: "Maurienne",
    zone: "Alpes du Nord",
    bounds: { latMin: 45.05, latMax: 45.5, lonMin: 6.2, lonMax: 6.75 },
  },
  {
    id: 10,
    name: "Vanoise",
    zone: "Alpes du Nord",
    bounds: { latMin: 45.25, latMax: 45.55, lonMin: 6.45, lonMax: 6.75 },
  },
  {
    id: 11,
    name: "Haute-Maurienne",
    zone: "Alpes du Nord",
    bounds: { latMin: 45.05, latMax: 45.45, lonMin: 6.75, lonMax: 7.2 },
  },
  {
    id: 12,
    name: "Grandes-Rousses",
    zone: "Alpes du Nord",
    bounds: { latMin: 44.95, latMax: 45.2, lonMin: 5.95, lonMax: 6.45 },
  },
  {
    id: 13,
    name: "Thabor",
    zone: "Alpes du Nord",
    bounds: { latMin: 44.9, latMax: 45.15, lonMin: 6.45, lonMax: 6.95 },
  },
  {
    id: 14,
    name: "Vercors",
    zone: "Alpes du Nord",
    bounds: { latMin: 44.8, latMax: 45.2, lonMin: 5.2, lonMax: 5.75 },
  },
  {
    id: 15,
    name: "Oisans",
    zone: "Alpes du Nord",
    bounds: { latMin: 44.85, latMax: 45.15, lonMin: 6.0, lonMax: 6.5 },
  },
];

// ---------------------------------------------------------------------------
// ALPES DU SUD — IDs 16–23
// ---------------------------------------------------------------------------
const MASSIFS_ALPES_SUD = [
  {
    id: 16,
    name: "Pelvoux",
    zone: "Alpes du Sud",
    bounds: { latMin: 44.65, latMax: 44.95, lonMin: 6.25, lonMax: 6.65 },
  },
  {
    id: 17,
    name: "Queyras",
    zone: "Alpes du Sud",
    bounds: { latMin: 44.55, latMax: 44.8, lonMin: 6.65, lonMax: 7.05 },
  },
  {
    id: 18,
    name: "Dévoluy",
    zone: "Alpes du Sud",
    bounds: { latMin: 44.5, latMax: 44.9, lonMin: 5.85, lonMax: 6.25 },
  },
  {
    id: 19,
    name: "Champsaur",
    zone: "Alpes du Sud",
    bounds: { latMin: 44.45, latMax: 44.8, lonMin: 6.15, lonMax: 6.55 },
  },
  {
    id: 20,
    name: "Embrunais-Parpaillon",
    zone: "Alpes du Sud",
    bounds: { latMin: 44.25, latMax: 44.6, lonMin: 6.45, lonMax: 6.9 },
  },
  {
    id: 21,
    name: "Ubaye",
    zone: "Alpes du Sud",
    bounds: { latMin: 44.2, latMax: 44.6, lonMin: 6.65, lonMax: 7.05 },
  },
  {
    id: 22,
    name: "Haut-Var Haut-Verdon",
    zone: "Alpes du Sud",
    bounds: { latMin: 43.85, latMax: 44.25, lonMin: 6.5, lonMax: 6.95 },
  },
  {
    id: 23,
    name: "Mercantour",
    zone: "Alpes du Sud",
    bounds: { latMin: 43.85, latMax: 44.25, lonMin: 7.0, lonMax: 7.55 },
  },
];

// ---------------------------------------------------------------------------
// CORSE — IDs 40–41
// ---------------------------------------------------------------------------
const MASSIFS_CORSE = [
  {
    id: 40,
    name: "Cinto-Rotondo",
    zone: "Corse",
    bounds: { latMin: 42.1, latMax: 42.45, lonMin: 8.8, lonMax: 9.15 },
  },
  {
    id: 41,
    name: "Renoso-Incudine",
    zone: "Corse",
    bounds: { latMin: 41.9, latMax: 42.2, lonMin: 8.95, lonMax: 9.3 },
  },
];

// ---------------------------------------------------------------------------
// PYRÉNÉES — IDs 64–74 (+ 71 Andorre)
// ---------------------------------------------------------------------------
const MASSIFS_PYRENEES = [
  // PYRÉNÉES OCCIDENTALES
  {
    id: 64,
    name: "Pays-Basque",
    zone: "Pyrénées Occidentales",
    bounds: { latMin: 42.9, latMax: 43.3, lonMin: -1.8, lonMax: -0.7 },
  },
  {
    id: 65,
    name: "Aspe-Ossau",
    zone: "Pyrénées Occidentales",
    bounds: { latMin: 42.75, latMax: 43.1, lonMin: -0.7, lonMax: -0.3 },
  },
  {
    id: 66,
    name: "Haute-Bigorre",
    zone: "Pyrénées Occidentales",
    bounds: { latMin: 42.7, latMax: 43.05, lonMin: -0.1, lonMax: 0.35 },
  },
  {
    id: 67,
    name: "Aure-Louron",
    zone: "Pyrénées Occidentales",
    bounds: { latMin: 42.65, latMax: 42.95, lonMin: 0.25, lonMax: 0.65 },
  },
  // PYRÉNÉES CENTRALES
  {
    id: 68,
    name: "Luchonnais",
    zone: "Pyrénées Centrales",
    bounds: { latMin: 42.6, latMax: 42.9, lonMin: 0.5, lonMax: 0.9 },
  },
  {
    id: 69,
    name: "Couserans",
    zone: "Pyrénées Centrales",
    bounds: { latMin: 42.6, latMax: 43.0, lonMin: 0.8, lonMax: 1.3 },
  },
  {
    id: 70,
    name: "Haute-Ariège",
    zone: "Pyrénées Centrales",
    bounds: { latMin: 42.5, latMax: 42.85, lonMin: 1.4, lonMax: 1.9 },
  },
  {
    id: 71,
    name: "Andorre",
    zone: "Pyrénées Centrales",
    bounds: { latMin: 42.43, latMax: 42.65, lonMin: 1.41, lonMax: 1.78 },
  },
  {
    id: 72,
    name: "Orlu - St-Barthélémy",
    zone: "Pyrénées Centrales",
    bounds: { latMin: 42.55, latMax: 42.75, lonMin: 1.8, lonMax: 2.1 },
  },
  // PYRÉNÉES ORIENTALES
  {
    id: 73,
    name: "Capcir-Puymorens",
    zone: "Pyrénées Orientales",
    bounds: { latMin: 42.45, latMax: 42.65, lonMin: 1.95, lonMax: 2.25 },
  },
  {
    id: 74,
    name: "Cerdagne-Canigou",
    zone: "Pyrénées Orientales",
    bounds: { latMin: 42.3, latMax: 42.6, lonMin: 2.0, lonMax: 2.5 },
  },
];

// ---------------------------------------------------------------------------
// TABLEAU COMPLET (tous massifs France)
// ---------------------------------------------------------------------------
const MASSIFS_ALL = [
  ...MASSIFS_ALPES_NORD,
  ...MASSIFS_ALPES_SUD,
  ...MASSIFS_CORSE,
  ...MASSIFS_PYRENEES,
];

// ---------------------------------------------------------------------------
// MAPPING DIRECT STATIONS → MASSIFS
// Plus fiable que les bounding boxes pour les stations nommées
// Clés en minuscules pour matching insensible à la casse
// ---------------------------------------------------------------------------
const STATIONS_MASSIF_MAP = {
  // ── ALPES DU NORD ──────────────────────────────────────────────────────
  // Chablais (1) — Haute-Savoie ouest
  morzine: 1,
  avoriaz: 1,
  "les gets": 1,
  châtel: 1,
  chatel: 1,
  abondance: 1,
  "les portes du soleil": 1,
  "portes du soleil": 1,
  thollon: 1,
  "saint-jean-d'aulps": 1,
  "saint jean d'aulps": 1,

  // Aravis (2) — La Clusaz, Grand-Bornand
  "la clusaz": 2,
  "le grand-bornand": 2,
  "grand-bornand": 2,
  "grand bornand": 2,
  manigod: 2,
  "saint-jean-de-sixt": 2,
  "saint jean de sixt": 2,
  "les aravis": 2,

  // Mont-Blanc (3) — Chamonix, Megève
  chamonix: 3,
  megève: 3,
  megeve: 3,
  "saint-gervais": 3,
  "saint gervais": 3,
  "les contamines": 3,
  "les houches": 3,
  combloux: 3,
  passy: 3,
  "notre-dame-de-bellecombe": 3,
  argentière: 3,
  argentiere: 3,

  // Bauges (4) — Entre Chambéry et Annecy
  "le semnoz": 4,
  "la féclaz": 4,
  "la feclaz": 4,
  aillon: 4,
  "aillon-le-jeune": 4,
  "le revard": 4,

  // Beaufortain (5) — Arêches-Beaufort
  "arêches-beaufort": 5,
  "areches-beaufort": 5,
  "arêches": 5,
  areches: 5,
  "les saisies": 5,
  hauteluce: 5,
  "crest-voland": 5,
  "cohennoz": 5,

  // Haute-Tarentaise (6) — Val d'Isère, Tignes, Les Arcs, La Plagne
  "val d'isère": 6,
  "val d'isere": 6,
  "val-d'isère": 6,
  "vald'isère": 6,
  tignes: 6,
  "les arcs": 6,
  "arc 1600": 6,
  "arc 1800": 6,
  "arc 2000": 6,
  "la plagne": 6,
  "plagne bellecôte": 6,
  "belle plagne": 6,
  "la rosière": 6,
  "la rosiere": 6,
  "sainte-foy-tarentaise": 6,
  "sainte foy tarentaise": 6,
  "peisey-vallandry": 6,
  "peisey vallandry": 6,
  landry: 6,
  "bourg-saint-maurice": 6,
  "bourg saint maurice": 6,
  séez: 6,
  seez: 6,

  // Chartreuse (7) — Nord de Grenoble
  "saint-pierre-de-chartreuse": 7,
  "saint pierre de chartreuse": 7,
  "le sappey": 7,
  "col de porte": 7,
  "saint-hilaire-du-touvet": 7,

  // Belledonne (8) — Chamrousse
  chamrousse: 8,
  "les sept-laux": 8,
  "sept laux": 8,
  prapoutel: 8,
  allevard: 8,
  "le collet d'allevard": 8,

  // Maurienne (9) — Saint-Jean-de-Maurienne
  valloire: 9,
  valmeinier: 9,
  "les karellis": 9,
  "saint-sorlin-d'arves": 9,
  "saint sorlin d'arves": 9,
  valfréjus: 9,
  valfrejus: 9,
  "saint-jean-de-maurienne": 9,
  "saint jean de maurienne": 9,
  "saint-colomban-des-villards": 9,

  // Vanoise (10) — Courchevel, Méribel, Val Thorens
  courchevel: 10,
  méribel: 10,
  meribel: 10,
  "val thorens": 10,
  "les menuires": 10,
  "la tania": 10,
  orelle: 10,
  "saint-martin-de-belleville": 10,
  "saint martin de belleville": 10,
  pralognan: 10,
  "pralognan-la-vanoise": 10,
  champagny: 10,
  "champagny-en-vanoise": 10,
  "brides-les-bains": 10,
  "brides les bains": 10,

  // Haute-Maurienne (11) — Val Cenis, Bonneval
  "val cenis": 11,
  "bonneval-sur-arc": 11,
  "bonneval sur arc": 11,
  bessans: 11,
  termignon: 11,
  "lanslebourg": 11,
  "lanslevillard": 11,
  "modane": 11,

  // Grandes-Rousses (12) — L'Alpe d'Huez
  "l'alpe d'huez": 12,
  "alpe d'huez": 12,
  "alpe-d'huez": 12,
  "l'alpe-d'huez": 12,
  vaujany: 12,
  "oz-en-oisans": 12,
  "auris-en-oisans": 12,
  "villard-reculas": 12,
  "villard reculas": 12,

  // Thabor (13) — Montgenèvre, Névache
  montgenèvre: 13,
  mongenèvre: 13,
  montgeneve: 13,
  névache: 13,
  nevache: 13,
  "la clarée": 13,
  "val-des-prés": 13,
  "val des prés": 13,
  "cervières": 13,

  // Vercors (14) — Villard-de-Lans
  "villard-de-lans": 14,
  "villard de lans": 14,
  corrençon: 14,
  correncon: 14,
  méaudre: 14,
  meaudre: 14,
  autrans: 14,
  "font d'urle": 14,
  "gresse-en-vercors": 14,
  "gresse en vercors": 14,

  // Oisans (15) — Les Deux-Alpes, La Grave
  "les deux-alpes": 15,
  "les deux alpes": 15,
  "la grave": 15,
  "le monetier": 15,
  "le monêtier": 15,
  "serre-chevalier": 15,
  "serre chevalier": 15,

  // ── ALPES DU SUD ───────────────────────────────────────────────────────
  // Pelvoux (16) — Écrins sud
  "l'argentière-la-bessée": 16,
  "l'argentière": 16,
  ailefroide: 16,
  vallouise: 16,
  pelvoux: 16,

  // Queyras (17)
  vars: 17,
  risoul: 17,
  ceillac: 17,
  "saint-véran": 17,
  "saint veran": 17,
  "molines-en-queyras": 17,
  "molines en queyras": 17,
  abriès: 17,
  abrièss: 17,
  "château-queyras": 17,
  "guillestre": 17,

  // Dévoluy (18)
  superdévoluy: 18,
  superdeволuy: 18,
  "superdevoluy": 18,
  "la joue du loup": 18,
  "le dévoluy": 18,

  // Champsaur (19) — Orcières
  "orcières-merlette": 19,
  "orcières": 19,
  orcieres: 19,
  "saint-jean-saint-nicolas": 19,
  "la chapelle-en-valgaudemar": 19,

  // Embrunais-Parpaillon (20)
  réallon: 20,
  reallon: 20,
  "saint-apollinaire": 20,
  embrun: 20,

  // Ubaye (21) — Barcelonnette
  "pra-loup": 21,
  "praloup": 21,
  "la foux d'allos": 21,
  "foux d'allos": 21,
  barcelonnette: 21,
  "le sauze": 21,
  "jausiers": 21,

  // Haut-Var Haut-Verdon (22)
  allos: 22,
  colmars: 22,
  "colmars-les-alpes": 22,
  "thorame": 22,

  // Mercantour (23)
  "isola 2000": 23,
  "isola": 23,
  valberg: 23,
  auron: 23,
  péone: 23,
  "péone-valberg": 23,
  "saint-dalmas-le-selvage": 23,
  "saint-martin-vésubie": 23,

  // ── CORSE ──────────────────────────────────────────────────────────────
  // Cinto-Rotondo (40) — Corse nord
  "haut-asco": 40,
  "asco": 40,
  "calacuccia": 40,
  "corte": 40,

  // Renoso-Incudine (41) — Corse sud
  "ghisoni": 41,
  "quenza": 41,
  "zicavo": 41,
  "bavella": 41,

  // ── PYRÉNÉES ───────────────────────────────────────────────────────────
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

  // Andorre (71)
  andorre: 71,
  andorra: 71,
  "grandvalira": 71,
  "ordino-arcalís": 71,
  "ordino arcalis": 71,

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
      const massif = MASSIFS_ALL.find((m) => m.id === massifId);
      if (massif) {
        return { id: massif.id, name: massif.name, zone: massif.zone };
      }
    }
    // Match partiel : le nom contient une clé connue ou inversement
    for (const [key, massifId] of Object.entries(STATIONS_MASSIF_MAP)) {
      if (normalizedName.includes(key) || key.includes(normalizedName)) {
        const massif = MASSIFS_ALL.find((m) => m.id === massifId);
        if (massif) {
          return { id: massif.id, name: massif.name, zone: massif.zone };
        }
      }
    }
  }

  // 2) Chercher par bounding box (tous massifs France)
  for (const massif of MASSIFS_ALL) {
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

  // 3) Si hors zone, chercher le massif le plus proche (max ~50 km / 0.45°)
  let closestMassif = null;
  let minDistance = Infinity;

  for (const massif of MASSIFS_ALL) {
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

  // Si le plus proche est à moins de 0.45° (~50 km), on l'utilise
  if (minDistance < 0.45 && closestMassif) {
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
 * Retourne la liste complète des massifs (tous — pour tests ou debug)
 * @returns {Array} Tous les massifs couverts par Météo France BRA
 */
function getAllMassifs() {
  return MASSIFS_ALL;
}

/**
 * Tests de réception BRA pour tous les massifs de France
 * Usage en console navigateur : testAllMassifsBRA()
 * Affiche pour chaque massif si la réception est possible ou en erreur.
 *
 * @param {string} proxyUrl - URL de base du proxy Worker (ex: "https://ou-skier-proxy.workers.dev")
 */
async function testAllMassifsBRA(proxyUrl) {
  if (!proxyUrl) {
    console.error("[testAllMassifsBRA] Fournir l'URL du proxy : testAllMassifsBRA('https://...')");
    return;
  }
  console.group("[testAllMassifsBRA] Test de réception BERA pour tous les massifs de France");
  const results = { ok: [], error: [] };

  for (const massif of MASSIFS_ALL) {
    try {
      const resp = await fetch(
        `${proxyUrl}/bra?massif-id=${encodeURIComponent(massif.id)}&format=xml`,
      );
      if (resp.ok) {
        const xml = await resp.text();
        const hasRisque = xml.includes("RISQUE");
        if (hasRisque) {
          console.log(`✅ [${massif.id}] ${massif.name} (${massif.zone})`);
          results.ok.push(massif.id);
        } else {
          console.warn(`⚠️  [${massif.id}] ${massif.name} — XML reçu mais sans balise RISQUE`);
          results.error.push(massif.id);
        }
      } else {
        console.error(`❌ [${massif.id}] ${massif.name} — HTTP ${resp.status}`);
        results.error.push(massif.id);
      }
    } catch (err) {
      console.error(`❌ [${massif.id}] ${massif.name} — ${err.message}`);
      results.error.push(massif.id);
    }
  }

  console.groupEnd();
  console.log(
    `[testAllMassifsBRA] Résultat : ${results.ok.length} OK, ${results.error.length} erreurs`,
    results,
  );
  return results;
}

/**
 * Exemples de mapping pour des secteurs représentatifs de toute la France
 */
const EXEMPLES_SECTEURS = {
  // Alpes du Nord
  "Val d'Isère": {
    coords: { lat: 45.4483, lon: 6.9763 },
    expectedMassif: "Haute-Tarentaise (6)",
  },
  Tignes: {
    coords: { lat: 45.4697, lon: 6.9079 },
    expectedMassif: "Haute-Tarentaise (6)",
  },
  Courchevel: {
    coords: { lat: 45.4141, lon: 6.6337 },
    expectedMassif: "Vanoise (10)",
  },
  Chamonix: {
    coords: { lat: 45.9237, lon: 6.8694 },
    expectedMassif: "Mont-Blanc (3)",
  },
  "L'Alpe d'Huez": {
    coords: { lat: 45.0847, lon: 6.0674 },
    expectedMassif: "Grandes-Rousses (12)",
  },
  // Alpes du Sud
  "Isola 2000": {
    coords: { lat: 44.1897, lon: 7.166 },
    expectedMassif: "Mercantour (23)",
  },
  // Pyrénées
  "Pic de Lurtet": {
    coords: { lat: 42.8691, lon: 0.10149 },
    expectedMassif: "Haute-Bigorre (66)",
  },
  "Pic du Pourtalet": {
    coords: { lat: 42.7833, lon: -0.4167 },
    expectedMassif: "Aspe-Ossau (65)",
  },
};

// Export pour navigateur
if (typeof window !== "undefined") {
  window.MASSIFS_ALPES_NORD = MASSIFS_ALPES_NORD;
  window.MASSIFS_ALPES_SUD = MASSIFS_ALPES_SUD;
  window.MASSIFS_CORSE = MASSIFS_CORSE;
  window.MASSIFS_PYRENEES = MASSIFS_PYRENEES;
  window.MASSIFS_ALL = MASSIFS_ALL;
  window.getMassifFromCoords = getMassifFromCoords;
  window.getAllMassifs = getAllMassifs;
  window.testAllMassifsBRA = testAllMassifsBRA;
  window.EXEMPLES_SECTEURS = EXEMPLES_SECTEURS;
}

// Export pour Node.js
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    MASSIFS_ALPES_NORD,
    MASSIFS_ALPES_SUD,
    MASSIFS_CORSE,
    MASSIFS_PYRENEES,
    MASSIFS_ALL,
    getMassifFromCoords,
    getAllMassifs,
    testAllMassifsBRA,
    EXEMPLES_SECTEURS,
  };
}
