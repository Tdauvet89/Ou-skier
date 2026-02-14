/**
 * SVG ICON LIBRARY - Ou-skier Design System
 *
 * Icônes SVG inline légères pour remplacer tous les emojis.
 * Trois catégories : Weather, Wind, UI.
 *
 * Usage :
 *   weatherSvg.sun          → SVG string (24×24)
 *   windArrowSvg(degrees)   → SVG string flèche orientée
 *   uiSvg.search            → SVG string (20×20)
 *
 * @module icons
 */

// ---------------------------------------------------------------------------
//  Helpers
// ---------------------------------------------------------------------------

function _w(inner) {
    return '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round">' + inner + '</svg>';
}

function _ui(inner, size) {
    size = size || 20;
    return '<svg xmlns="http://www.w3.org/2000/svg" width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + inner + '</svg>';
}

// Couleurs partagées
var IC = {
    sun: '#f59e0b',
    sunFill: 'rgba(245,158,11,0.2)',
    cloud: '#94a3b8',
    cloudFill: 'rgba(148,163,184,0.15)',
    rain: '#3b82f6',
    snow: '#60a5fa',
    bolt: '#eab308',
    moon: '#64748b',
    moonFill: 'rgba(100,116,139,0.15)',
    fog: '#94a3b8'
};

// Réutilisables
var _sunBody = '<circle cx="12" cy="12" r="4" fill="' + IC.sunFill + '" stroke="' + IC.sun + '" stroke-width="1.5"/>' +
    '<g stroke="' + IC.sun + '" stroke-width="1.5" stroke-linecap="round">' +
    '<line x1="12" y1="3" x2="12" y2="1.5"/>' +
    '<line x1="12" y1="22.5" x2="12" y2="21"/>' +
    '<line x1="3" y1="12" x2="1.5" y2="12"/>' +
    '<line x1="22.5" y1="12" x2="21" y2="12"/>' +
    '<line x1="5.6" y1="5.6" x2="4.5" y2="4.5"/>' +
    '<line x1="19.5" y1="19.5" x2="18.4" y2="18.4"/>' +
    '<line x1="5.6" y1="18.4" x2="4.5" y2="19.5"/>' +
    '<line x1="19.5" y1="4.5" x2="18.4" y2="5.6"/>' +
    '</g>';

var _smallSun = '<circle cx="7" cy="7" r="2.5" fill="' + IC.sunFill + '" stroke="' + IC.sun + '" stroke-width="1.2"/>' +
    '<g stroke="' + IC.sun + '" stroke-width="1" stroke-linecap="round">' +
    '<line x1="7" y1="3" x2="7" y2="2"/><line x1="7" y1="12" x2="7" y2="11"/>' +
    '<line x1="3" y1="7" x2="2" y2="7"/><line x1="12" y1="7" x2="11" y2="7"/>' +
    '<line x1="4.2" y1="4.2" x2="3.5" y2="3.5"/><line x1="10.5" y1="10.5" x2="9.8" y2="9.8"/>' +
    '<line x1="4.2" y1="9.8" x2="3.5" y2="10.5"/><line x1="10.5" y1="3.5" x2="9.8" y2="4.2"/>' +
    '</g>';

var _cloudBody = '<path d="M6 19h12a5 5 0 0 0 .5-9.97 7.5 7.5 0 0 0-14.15 2.47A4.5 4.5 0 0 0 6 19z" fill="' + IC.cloudFill + '" stroke="' + IC.cloud + '" stroke-width="1.5"/>';

var _cloudSmall = '<path d="M10 18h8a4 4 0 0 0 .4-7.97 6 6 0 0 0-11.32 1.97A3.5 3.5 0 0 0 10 18z" fill="' + IC.cloudFill + '" stroke="' + IC.cloud + '" stroke-width="1.3"/>';

var _moonBody = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="' + IC.moonFill + '" stroke="' + IC.moon + '" stroke-width="1.5"/>';

// Gouttes de pluie
function _rainDrops(n) {
    var drops = '';
    var positions = [[8,21],[12,22],[16,21],[10,23.5],[14,23.5]];
    for (var i = 0; i < Math.min(n, positions.length); i++) {
        drops += '<line x1="' + positions[i][0] + '" y1="' + (positions[i][1] - 2) + '" x2="' + (positions[i][0] - 0.5) + '" y2="' + positions[i][1] + '" stroke="' + IC.rain + '" stroke-width="1.5" stroke-linecap="round"/>';
    }
    return drops;
}

// Flocons de neige
function _snowDots(n) {
    var dots = '';
    var positions = [[8,20.5],[12,21.5],[16,20.5],[10,23],[14,23]];
    for (var i = 0; i < Math.min(n, positions.length); i++) {
        dots += '<circle cx="' + positions[i][0] + '" cy="' + positions[i][1] + '" r="1" fill="' + IC.snow + '"/>';
    }
    return dots;
}

// Éclair
var _bolt = '<path d="M13 10h4l-6 8 1-5H8l6-8-1 5z" fill="' + IC.bolt + '" stroke="' + IC.bolt + '" stroke-width="0.5"/>';

// Lignes de brouillard
var _fogLines = '<g stroke="' + IC.fog + '" stroke-width="2" stroke-linecap="round">' +
    '<line x1="3" y1="8" x2="21" y2="8"/>' +
    '<line x1="5" y1="12" x2="19" y2="12"/>' +
    '<line x1="3" y1="16" x2="21" y2="16"/>' +
    '<line x1="7" y1="20" x2="17" y2="20"/>' +
    '</g>';

// Lignes de brume (haze) avec soleil
var _hazeLines = '<g stroke="' + IC.fog + '" stroke-width="1.5" stroke-linecap="round" opacity="0.6">' +
    '<line x1="4" y1="16" x2="20" y2="16"/>' +
    '<line x1="6" y1="19" x2="18" y2="19"/>' +
    '<line x1="3" y1="22" x2="21" y2="22"/>' +
    '</g>';


// ---------------------------------------------------------------------------
//  WEATHER ICONS
// ---------------------------------------------------------------------------

var weatherSvg = {
    // Ciel dégagé
    sun: _w(_sunBody),

    // Nuit claire
    moon: _w(_moonBody),

    // Peu nuageux (soleil + petit nuage)
    partlyCloudy: _w(_smallSun + _cloudSmall),

    // Nuageux (soleil caché + gros nuage)
    mostlyCloudy: _w(
        '<circle cx="6" cy="8" r="2" fill="' + IC.sunFill + '" stroke="' + IC.sun + '" stroke-width="1" opacity="0.5"/>' +
        _cloudBody
    ),

    // Couvert
    overcast: _w(_cloudBody),

    // Nuit peu nuageuse
    moonCloud: _w(
        '<path d="M18 6.79A5 5 0 1 1 11.21 2 4 4 0 0 0 18 6.79z" fill="' + IC.moonFill + '" stroke="' + IC.moon + '" stroke-width="1.2"/>' +
        _cloudSmall
    ),

    // Nuit nuageuse
    moonOvercast: _w(
        '<path d="M19 5.79A4 4 0 1 1 13.21 2 3 3 0 0 0 19 5.79z" fill="' + IC.moonFill + '" stroke="' + IC.moon + '" stroke-width="1" opacity="0.4"/>' +
        _cloudBody
    ),

    // Brouillard
    fog: _w(_fogLines),

    // Brume / haze
    haze: _w(
        '<circle cx="12" cy="8" r="3.5" fill="' + IC.sunFill + '" stroke="' + IC.sun + '" stroke-width="1.5" opacity="0.6"/>' +
        '<g stroke="' + IC.sun + '" stroke-width="1.2" stroke-linecap="round" opacity="0.4">' +
        '<line x1="12" y1="3" x2="12" y2="2"/><line x1="12" y1="14" x2="12" y2="13"/>' +
        '<line x1="6.5" y1="8" x2="5.5" y2="8"/><line x1="18.5" y1="8" x2="17.5" y2="8"/>' +
        '</g>' +
        _hazeLines
    ),

    // Pluie légère
    lightRain: _w(_cloudBody + _rainDrops(2)),

    // Pluie
    rain: _w(_cloudBody + _rainDrops(3)),

    // Pluie forte
    heavyRain: _w(_cloudBody + _rainDrops(5)),

    // Neige légère
    lightSnow: _w(_cloudBody + _snowDots(2)),

    // Neige
    snow: _w(_cloudBody + _snowDots(3)),

    // Neige forte
    heavySnow: _w(_cloudBody + _snowDots(5)),

    // Orage
    thunder: _w(_cloudBody + _bolt),

    // Orage avec pluie
    thunderRain: _w(_cloudBody + _bolt + _rainDrops(2)),

    // Pluie et neige
    sleet: _w(_cloudBody + _rainDrops(2) + _snowDots(2)),

    // Averses (soleil + nuage + pluie)
    showers: _w(_smallSun + _cloudSmall +
        '<line x1="11" y1="19" x2="10.5" y2="21" stroke="' + IC.rain + '" stroke-width="1.3" stroke-linecap="round"/>' +
        '<line x1="15" y1="19" x2="14.5" y2="21" stroke="' + IC.rain + '" stroke-width="1.3" stroke-linecap="round"/>'
    ),

    // Averses de neige (soleil + nuage + flocons)
    snowShowers: _w(_smallSun + _cloudSmall +
        '<circle cx="11" cy="20" r="0.8" fill="' + IC.snow + '"/>' +
        '<circle cx="15" cy="20" r="0.8" fill="' + IC.snow + '"/>'
    ),

    // Grêle
    hail: _w(_cloudBody +
        '<circle cx="9" cy="21" r="1.2" fill="none" stroke="' + IC.snow + '" stroke-width="1.2"/>' +
        '<circle cx="13" cy="22" r="1.2" fill="none" stroke="' + IC.snow + '" stroke-width="1.2"/>' +
        '<circle cx="16" cy="20.5" r="1.2" fill="none" stroke="' + IC.snow + '" stroke-width="1.2"/>'
    ),

    // Pluie verglaçante
    freezingRain: _w(_cloudBody +
        '<line x1="9" y1="19" x2="8.5" y2="21" stroke="' + IC.rain + '" stroke-width="1.3" stroke-linecap="round"/>' +
        '<line x1="15" y1="19" x2="14.5" y2="21" stroke="' + IC.rain + '" stroke-width="1.3" stroke-linecap="round"/>' +
        '<circle cx="12" cy="22.5" r="0.8" fill="' + IC.snow + '"/>'
    )
};


// ---------------------------------------------------------------------------
//  WIND ARROW
// ---------------------------------------------------------------------------

/**
 * Flèche de direction du vent — style Surfline.
 * @param {number} degrees — direction en degrés (0 = Nord, d'où vient le vent)
 * @param {number} [size=14] — taille en px
 * @returns {string} SVG string
 */
function windArrowSvg(degrees, size) {
    size = size || 14;
    var rot = (degrees !== null && degrees !== undefined) ? degrees : 0;
    return '<svg xmlns="http://www.w3.org/2000/svg" width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" style="transform:rotate(' + rot + 'deg);display:inline-block;vertical-align:middle">' +
        '<path d="M12 2 L12 22 M12 2 L7 8 M12 2 L17 8" stroke="#3b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>' +
        '</svg>';
}


// ---------------------------------------------------------------------------
//  UI ICONS
// ---------------------------------------------------------------------------

var uiSvg = {
    // Recherche
    search: _ui('<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>'),

    // Plus / Ajouter
    plus: _ui('<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>'),

    // Fermer / X
    close: _ui('<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>'),

    // Rafraîchir
    refresh: _ui('<polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>'),

    // Calendrier
    calendar: _ui('<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>'),

    // Horloge
    clock: _ui('<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>'),

    // Montagne
    mountain: _ui('<path d="M8 21l4.5-11 3 5.5L18 11l4 10H2l6-10z"/>'),

    // Flocon (pour titres neige)
    snowflake: _ui('<line x1="12" y1="2" x2="12" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/><line x1="19.07" y1="4.93" x2="4.93" y2="19.07"/><line x1="9" y1="2" x2="12" y2="5"/><line x1="15" y1="2" x2="12" y2="5"/><line x1="9" y1="22" x2="12" y2="19"/><line x1="15" y1="22" x2="12" y2="19"/>'),

    // Thermomètre
    thermometer: _ui('<path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"/>'),

    // Goutte
    droplet: _ui('<path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>'),

    // Pin / position
    mapPin: _ui('<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>'),

    // Graphique / stats
    barChart: _ui('<line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/>'),

    // Télécharger
    download: _ui('<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>'),

    // Poubelle
    trash: _ui('<polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>'),

    // Alerte / Warning
    alert: _ui('<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>'),

    // Soleil (pour les titres météo)
    sunUi: _ui('<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>'),

    // Lien externe
    externalLink: _ui('<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>'),

    // Vent
    wind: _ui('<path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"/>')
};


// ---------------------------------------------------------------------------
//  LOGO
// ---------------------------------------------------------------------------

var logoSvg = (function() {
    var rc = '#3b82f6'; // radar color
    var tc = '#1e293b'; // text/stroke color
    return '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 60 60" fill="none">' +
        '<circle cx="30" cy="30" r="26" stroke="' + rc + '" stroke-width="1" opacity="0.15"/>' +
        '<circle cx="30" cy="30" r="20" stroke="' + rc + '" stroke-width="1" opacity="0.25"/>' +
        '<circle cx="30" cy="30" r="14" stroke="' + rc + '" stroke-width="1.5" opacity="0.35"/>' +
        '<g transform="translate(30, 30)">' +
        '<circle cx="0" cy="0" r="10" fill="' + rc + '" opacity="0.1"/>' +
        '<line x1="0" y1="-8" x2="0" y2="8" stroke="' + tc + '" stroke-width="2" stroke-linecap="round"/>' +
        '<line x1="-8" y1="0" x2="8" y2="0" stroke="' + tc + '" stroke-width="2" stroke-linecap="round"/>' +
        '<line x1="-5.6" y1="-5.6" x2="5.6" y2="5.6" stroke="' + tc + '" stroke-width="2" stroke-linecap="round"/>' +
        '<line x1="-5.6" y1="5.6" x2="5.6" y2="-5.6" stroke="' + tc + '" stroke-width="2" stroke-linecap="round"/>' +
        '</g>' +
        '<line x1="30" y1="30" x2="30" y2="6" stroke="' + rc + '" stroke-width="2" stroke-linecap="round" opacity="0.7">' +
        '<animateTransform attributeName="transform" attributeType="XML" type="rotate" from="0 30 30" to="360 30 30" dur="3s" repeatCount="indefinite"/>' +
        '</line>' +
        '<circle cx="42" cy="18" r="3.5" fill="' + rc + '">' +
        '<animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite"/>' +
        '</circle>' +
        '</svg>';
})();


// ---------------------------------------------------------------------------
//  Export
// ---------------------------------------------------------------------------

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { weatherSvg: weatherSvg, windArrowSvg: windArrowSvg, uiSvg: uiSvg, logoSvg: logoSvg };
} else {
    window.weatherSvg = weatherSvg;
    window.windArrowSvg = windArrowSvg;
    window.uiSvg = uiSvg;
    window.logoSvg = logoSvg;
}
