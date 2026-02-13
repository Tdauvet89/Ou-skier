/**
 * WEATHER CODE MAPPING - Meteoblue API
 *
 * Correspondance complète des pictocodes Meteoblue (1-35) vers icônes SVG et descriptions
 * Source: https://content.meteoblue.com/en/help/standards/symbols-and-pictograms
 *
 * Dépend de icons.js (doit être chargé avant ce fichier)
 *
 * @module weatherCodes
 */

var weatherCodeToIcon = {
    // ========== CODES DE BASE (1-10) ==========
    1: { icon: 'sun', desc: 'Ensoleillé' },
    2: { icon: 'partlyCloudy', desc: 'Peu nuageux' },
    3: { icon: 'partlyCloudy', desc: 'Partiellement nuageux' },
    4: { icon: 'overcast', desc: 'Nuageux' },
    5: { icon: 'lightRain', desc: 'Pluie légère' },
    6: { icon: 'rain', desc: 'Pluie modérée' },
    7: { icon: 'heavyRain', desc: 'Pluie forte' },
    8: { icon: 'lightSnow', desc: 'Neige légère' },
    9: { icon: 'snow', desc: 'Neige modérée' },
    10: { icon: 'heavySnow', desc: 'Neige forte' },

    // ========== CONDITIONS SPÉCIALES (11-20) ==========
    11: { icon: 'fog', desc: 'Brouillard' },
    12: { icon: 'showers', desc: 'Averses légères' },
    13: { icon: 'showers', desc: 'Averses' },
    14: { icon: 'thunder', desc: 'Orages' },
    15: { icon: 'snowShowers', desc: 'Averses de neige légères' },
    16: { icon: 'snowShowers', desc: 'Averses de neige' },
    17: { icon: 'sleet', desc: 'Pluie et neige mêlées' },
    18: { icon: 'freezingRain', desc: 'Pluie verglaçante' },
    19: { icon: 'hail', desc: 'Grêle' },
    20: { icon: 'thunderRain', desc: 'Orages avec pluie légère' },

    // ========== CODES JOUR SPÉCIFIQUES (21-30) ==========
    21: { icon: 'sun', desc: 'Ensoleillé clair' },
    22: { icon: 'sun', desc: 'Partiellement ensoleillé' },
    23: { icon: 'partlyCloudy', desc: 'Peu nuageux (jour)' },
    24: { icon: 'mostlyCloudy', desc: 'Nuageux (jour)' },
    25: { icon: 'rain', desc: 'Pluie (jour)' },
    26: { icon: 'showers', desc: 'Averses (jour)' },
    27: { icon: 'snow', desc: 'Neige (jour)' },
    28: { icon: 'snowShowers', desc: 'Averses de neige (jour)' },
    29: { icon: 'thunder', desc: 'Orage (jour)' },
    30: { icon: 'fog', desc: 'Brouillard (jour)' },

    // ========== CODES NUIT (31-33) ==========
    // Note: Ces codes sont convertis en codes jour si utilisés entre 6h-20h
    31: { icon: 'moon', desc: 'Nuit claire' },
    32: { icon: 'moonCloud', desc: 'Nuit peu nuageuse' },
    33: { icon: 'moonOvercast', desc: 'Nuit nuageuse' },

    // ========== CODES SPÉCIAUX (34-35) ==========
    34: { icon: 'partlyCloudy', desc: 'Ensoleillé avec nuages épars' },
    35: { icon: 'sleet', desc: 'Pluie et neige' }
};

/**
 * Convertit un code météo nuit en code jour
 * Utilisé automatiquement pour les heures de 6h à 20h
 *
 * @param {number} code - Code météo Meteoblue (pictocode)
 * @param {number} hour - Heure locale (0-23)
 * @returns {number} Code ajusté (codes nuit convertis en codes jour si nécessaire)
 */
function adjustWeatherCodeForDaylight(code, hour) {
    // Si c'est la nuit (avant 6h ou après 20h), garder le code tel quel
    if (hour < 6 || hour > 20) {
        return code;
    }

    // C'est le jour : convertir les codes nuit en codes jour équivalents
    var nightToDayMapping = {
        31: 1,   // Nuit claire → Ensoleillé
        32: 2,   // Nuit peu nuageuse → Peu nuageux
        33: 4    // Nuit nuageuse → Nuageux
    };

    return nightToDayMapping[code] || code;
}

/**
 * Récupère l'icône SVG et la description pour un code météo donné
 *
 * @param {number} code - Code météo Meteoblue (pictocode)
 * @param {number} hour - Heure locale (0-23), optionnel
 * @returns {Object} { icon: string (SVG HTML), desc: string }
 */
function getWeatherInfo(code, hour) {
    if (hour === undefined) hour = 12;
    var adjustedCode = adjustWeatherCodeForDaylight(code, hour);
    var entry = weatherCodeToIcon[adjustedCode] || weatherCodeToIcon[1];
    var svgKey = entry.icon;
    // Résoudre la clé SVG en markup HTML
    var svgHtml = (typeof weatherSvg !== 'undefined' && weatherSvg[svgKey]) ? weatherSvg[svgKey] : svgKey;
    return { icon: svgHtml, desc: entry.desc, svgKey: svgKey };
}

// Export pour utilisation dans l'application
if (typeof module !== 'undefined' && module.exports) {
    // Node.js
    module.exports = {
        weatherCodeToIcon: weatherCodeToIcon,
        adjustWeatherCodeForDaylight: adjustWeatherCodeForDaylight,
        getWeatherInfo: getWeatherInfo
    };
} else {
    // Navigateur - rendre disponible globalement
    window.weatherCodeToIcon = weatherCodeToIcon;
    window.adjustWeatherCodeForDaylight = adjustWeatherCodeForDaylight;
    window.getWeatherInfo = getWeatherInfo;
}
