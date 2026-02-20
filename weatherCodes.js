/**
 * WEATHER CODE MAPPING - Meteoblue API
 *
 * Correspondance des pictocodes Meteoblue (1-35) vers les pictogrammes SVG officiels
 * Source pictogrammes : https://docs.meteoblue.com/en/meteo/variables/pictograms
 * Style : simple (coloré épuré), dossier /pictograms/
 *
 * Codes 1-17 : pictocodes journaliers (data_day.pictocode)
 * Codes 18-35 : pictocodes horaires (data_1h.pictocode) → fallback vers codes 1-17
 *
 * @module weatherCodes
 */

// Mapping pictocode → { fichier jour, fichier nuit, description }
// Les codes 18-35 n'ont pas de version simple_daily, ils sont redirigés vers un code de base
var weatherCodeToFile = {
    // ========== CODES JOURNALIERS (1-17) ==========
    1:  { day: '01_iday_simple.svg',  night: '01_inight_simple.svg', desc: 'Ensoleillé' },
    2:  { day: '02_iday_simple.svg',  night: '02_inight_simple.svg', desc: 'Peu nuageux' },
    3:  { day: '03_iday_simple.svg',  night: '03_inight_simple.svg', desc: 'Partiellement nuageux' },
    4:  { day: '04_iday_simple.svg',  night: '04_inight_simple.svg', desc: 'Nuageux' },
    5:  { day: '05_iday_simple.svg',  night: '05_inight_simple.svg', desc: 'Pluie légère' },
    6:  { day: '06_iday_simple.svg',  night: '06_inight_simple.svg', desc: 'Pluie modérée' },
    7:  { day: '07_iday_simple.svg',  night: '07_inight_simple.svg', desc: 'Pluie forte' },
    8:  { day: '08_iday_simple.svg',  night: '08_inight_simple.svg', desc: 'Neige légère' },
    9:  { day: '09_iday_simple.svg',  night: '09_inight_simple.svg', desc: 'Neige modérée' },
    10: { day: '10_iday_simple.svg',  night: '10_inight_simple.svg', desc: 'Neige forte' },
    11: { day: '11_iday_simple.svg',  night: '11_inight_simple.svg', desc: 'Brouillard' },
    12: { day: '12_iday_simple.svg',  night: '12_inight_simple.svg', desc: 'Averses légères' },
    13: { day: '13_iday_simple.svg',  night: '13_inight_simple.svg', desc: 'Averses' },
    14: { day: '14_iday_simple.svg',  night: '14_inight_simple.svg', desc: 'Orages' },
    15: { day: '15_iday_simple.svg',  night: '15_inight_simple.svg', desc: 'Averses de neige légères' },
    16: { day: '16_iday_simple.svg',  night: '16_inight_simple.svg', desc: 'Averses de neige' },
    17: { day: '17_iday_simple.svg',  night: '17_inight_simple.svg', desc: 'Pluie et neige mêlées' },

    // ========== CODES HORAIRES (18-35) — fallback vers codes de base ==========
    18: { day: '05_iday_simple.svg',  night: '05_inight_simple.svg', desc: 'Pluie verglaçante' },
    19: { day: '07_iday_simple.svg',  night: '07_inight_simple.svg', desc: 'Grêle' },
    20: { day: '14_iday_simple.svg',  night: '14_inight_simple.svg', desc: 'Orages avec pluie' },
    21: { day: '01_iday_simple.svg',  night: '01_inight_simple.svg', desc: 'Ensoleillé clair' },
    22: { day: '01_iday_simple.svg',  night: '02_inight_simple.svg', desc: 'Partiellement ensoleillé' },
    23: { day: '02_iday_simple.svg',  night: '02_inight_simple.svg', desc: 'Peu nuageux' },
    24: { day: '04_iday_simple.svg',  night: '04_inight_simple.svg', desc: 'Nuageux' },
    25: { day: '06_iday_simple.svg',  night: '06_inight_simple.svg', desc: 'Pluie' },
    26: { day: '12_iday_simple.svg',  night: '12_inight_simple.svg', desc: 'Averses' },
    27: { day: '09_iday_simple.svg',  night: '09_inight_simple.svg', desc: 'Neige' },
    28: { day: '15_iday_simple.svg',  night: '15_inight_simple.svg', desc: 'Averses de neige' },
    29: { day: '14_iday_simple.svg',  night: '14_inight_simple.svg', desc: 'Orage' },
    30: { day: '11_iday_simple.svg',  night: '11_inight_simple.svg', desc: 'Brouillard' },
    31: { day: '01_iday_simple.svg',  night: '01_inight_simple.svg', desc: 'Nuit claire' },
    32: { day: '02_iday_simple.svg',  night: '02_inight_simple.svg', desc: 'Nuit peu nuageuse' },
    33: { day: '04_iday_simple.svg',  night: '04_inight_simple.svg', desc: 'Nuit nuageuse' },
    34: { day: '02_iday_simple.svg',  night: '02_inight_simple.svg', desc: 'Ensoleillé avec nuages épars' },
    35: { day: '17_iday_simple.svg',  night: '17_inight_simple.svg', desc: 'Pluie et neige' }
};

// Alias pour compatibilité avec le code existant (svgKey non utilisé mais préservé)
var weatherCodeToIcon = (function() {
    var out = {};
    for (var code in weatherCodeToFile) {
        var entry = weatherCodeToFile[code];
        out[code] = { icon: entry.day, desc: entry.desc };
    }
    return out;
}());

/**
 * Retourne true si l'heure est de nuit (avant 7h ou après 20h)
 */
function _isNight(hour) {
    return hour < 7 || hour > 20;
}

/**
 * Convertit un code météo nuit en code jour
 * Utilisé automatiquement pour les heures de 7h à 20h
 *
 * @param {number} code - Code météo Meteoblue (pictocode)
 * @param {number} hour - Heure locale (0-23)
 * @returns {number} Code ajusté
 */
function adjustWeatherCodeForDaylight(code, hour) {
    if (hour < 7 || hour > 20) return code;
    var nightToDayMapping = { 31: 1, 32: 2, 33: 4 };
    return nightToDayMapping[code] || code;
}

/**
 * Récupère le HTML <img> et la description pour un code météo donné
 *
 * @param {number} code  - Code météo Meteoblue (pictocode 1-35)
 * @param {number} hour  - Heure locale (0-23), optionnel (défaut : 12)
 * @returns {Object} { icon: string (HTML <img>), desc: string, svgKey: string }
 */
function getWeatherInfo(code, hour) {
    if (hour === undefined) hour = 12;
    var adjustedCode = adjustWeatherCodeForDaylight(code, hour);
    var entry = weatherCodeToFile[adjustedCode] || weatherCodeToFile[1];
    var filename = _isNight(hour) ? entry.night : entry.day;
    var imgHtml = '<img src="pictograms/' + filename + '" width="40" height="40" alt="' + entry.desc + '" loading="lazy">';
    return { icon: imgHtml, desc: entry.desc, svgKey: filename };
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { weatherCodeToIcon, weatherCodeToFile, adjustWeatherCodeForDaylight, getWeatherInfo };
} else {
    window.weatherCodeToIcon = weatherCodeToIcon;
    window.weatherCodeToFile = weatherCodeToFile;
    window.adjustWeatherCodeForDaylight = adjustWeatherCodeForDaylight;
    window.getWeatherInfo = getWeatherInfo;
}
