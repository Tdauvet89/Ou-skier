/**
 * WEATHER CODE MAPPING - Meteoblue API
 * 
 * Correspondance complète des pictocodes Meteoblue (1-35) vers icônes et descriptions
 * Source: https://content.meteoblue.com/en/help/standards/symbols-and-pictograms
 * 
 * @module weatherCodes
 */

const weatherCodeToIcon = {
    // ========== CODES DE BASE (1-10) ==========
    1: { icon: '☀️', desc: 'Ensoleillé' },
    2: { icon: '🌤️', desc: 'Peu nuageux' },
    3: { icon: '⛅', desc: 'Partiellement nuageux' },
    4: { icon: '☁️', desc: 'Nuageux' },
    5: { icon: '🌧️', desc: 'Pluie légère' },
    6: { icon: '🌧️', desc: 'Pluie modérée' },
    7: { icon: '🌧️', desc: 'Pluie forte' },
    8: { icon: '❄️', desc: 'Neige légère' },
    9: { icon: '❄️', desc: 'Neige modérée' },
    10: { icon: '❄️', desc: 'Neige forte' },
    
    // ========== CONDITIONS SPÉCIALES (11-20) ==========
    11: { icon: '🌫️', desc: 'Brouillard' },
    12: { icon: '🌧️', desc: 'Averses légères' },
    13: { icon: '🌧️', desc: 'Averses' },
    14: { icon: '⛈️', desc: 'Orages' },
    15: { icon: '🌨️', desc: 'Averses de neige légères' },
    16: { icon: '🌨️', desc: 'Averses de neige' },
    17: { icon: '🌧️', desc: 'Pluie et neige mêlées' },
    18: { icon: '🌧️', desc: 'Pluie verglaçante' },
    19: { icon: '❄️', desc: 'Grêle' },
    20: { icon: '⛈️', desc: 'Orages avec pluie légère' },
    
    // ========== CODES JOUR SPÉCIFIQUES (21-30) ==========
    21: { icon: '☀️', desc: 'Ensoleillé clair' },
    22: { icon: '☀️', desc: 'Partiellement ensoleillé' },
    23: { icon: '⛅', desc: 'Peu nuageux (jour)' },
    24: { icon: '☁️', desc: 'Nuageux (jour)' },
    25: { icon: '🌧️', desc: 'Pluie (jour)' },
    26: { icon: '🌧️', desc: 'Averses (jour)' },
    27: { icon: '❄️', desc: 'Neige (jour)' },
    28: { icon: '🌨️', desc: 'Averses de neige (jour)' },
    29: { icon: '⛈️', desc: 'Orage (jour)' },
    30: { icon: '🌫️', desc: 'Brouillard (jour)' },
    
    // ========== CODES NUIT (31-33) ==========
    // Note: Ces codes sont convertis en codes jour si utilisés entre 6h-20h
    31: { icon: '🌙', desc: 'Nuit claire' },
    32: { icon: '🌙', desc: 'Nuit peu nuageuse' },
    33: { icon: '☁️', desc: 'Nuit nuageuse' },
    
    // ========== CODES SPÉCIAUX (34-35) ==========
    34: { icon: '☀️', desc: 'Ensoleillé avec nuages épars' },
    35: { icon: '🌧️', desc: 'Pluie et neige' }
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
    const nightToDayMapping = {
        31: 1,   // Nuit claire → Ensoleillé
        32: 2,   // Nuit peu nuageuse → Peu nuageux
        33: 4    // Nuit nuageuse → Nuageux
    };
    
    return nightToDayMapping[code] || code;
}

/**
 * Récupère l'icône et la description pour un code météo donné
 * 
 * @param {number} code - Code météo Meteoblue (pictocode)
 * @param {number} hour - Heure locale (0-23), optionnel
 * @returns {Object} { icon: string, desc: string }
 */
function getWeatherInfo(code, hour = 12) {
    const adjustedCode = adjustWeatherCodeForDaylight(code, hour);
    return weatherCodeToIcon[adjustedCode] || weatherCodeToIcon[1]; // Fallback: ensoleillé
}

// Export pour utilisation dans l'application
if (typeof module !== 'undefined' && module.exports) {
    // Node.js
    module.exports = {
        weatherCodeToIcon,
        adjustWeatherCodeForDaylight,
        getWeatherInfo
    };
} else {
    // Navigateur - rendre disponible globalement
    window.weatherCodeToIcon = weatherCodeToIcon;
    window.adjustWeatherCodeForDaylight = adjustWeatherCodeForDaylight;
    window.getWeatherInfo = getWeatherInfo;
}
