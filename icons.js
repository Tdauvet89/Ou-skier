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
    wind: _ui('<path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"/>'),

    // Toggle horloge (15×15, fill)
    toggleClock: '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.5 1.25C4.04822 1.25 1.25 4.04822 1.25 7.5C1.25 10.9518 4.04822 13.75 7.5 13.75C10.9518 13.75 13.75 10.9518 13.75 7.5C13.75 4.04822 10.9518 1.25 7.5 1.25ZM0 7.5C0 3.35786 3.35786 0 7.5 0C11.6421 0 15 3.35786 15 7.5C15 11.6421 11.6421 15 7.5 15C3.35786 15 0 11.6421 0 7.5Z" fill="#1F2023"/><path fill-rule="evenodd" clip-rule="evenodd" d="M7.5 3.125C7.84518 3.125 8.125 3.40482 8.125 3.75V7.24112L10.1294 9.24556C10.3735 9.48964 10.3735 9.88536 10.1294 10.1294C9.88536 10.3735 9.48964 10.3735 9.24556 10.1294L7.05806 7.94194C6.94085 7.82473 6.875 7.66576 6.875 7.5V3.75C6.875 3.40482 7.15482 3.125 7.5 3.125Z" fill="#1F2023"/></svg>',

    // Toggle calendrier (15×15, fill)
    toggleCalendar: '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M2.60091 1.25H12.3991C12.7286 1.24999 13.0128 1.24998 13.2469 1.26911C13.494 1.28929 13.7397 1.33387 13.9762 1.45436C14.329 1.63413 14.6159 1.92096 14.7956 2.27377C14.9161 2.51026 14.9607 2.75602 14.9809 3.00311C15 3.23721 15 3.52143 15 3.8509V12.3991C15 12.7286 15 13.0128 14.9809 13.2469C14.9607 13.494 14.9161 13.7397 14.7956 13.9762C14.6159 14.329 14.329 14.6159 13.9762 14.7956C13.7397 14.9161 13.494 14.9607 13.2469 14.9809C13.0128 15 12.7286 15 12.3991 15H2.6009C2.27144 15 1.98721 15 1.75311 14.9809C1.50602 14.9607 1.26026 14.9161 1.02377 14.7956C0.670965 14.6159 0.384126 14.329 0.204364 13.9762C0.0838676 13.7397 0.0392952 13.494 0.019107 13.2469C-2.03238e-05 13.0128 -1.06383e-05 12.7286 5.37568e-07 12.3991V3.85091C-1.06383e-05 3.52144 -2.03238e-05 3.23722 0.019107 3.00311C0.0392952 2.75602 0.0838676 2.51026 0.204364 2.27377C0.384126 1.92096 0.670965 1.63413 1.02377 1.45436C1.26026 1.33387 1.50602 1.28929 1.75311 1.26911C1.98722 1.24998 2.27144 1.24999 2.60091 1.25ZM1.8549 2.51495C1.68511 2.52883 1.62216 2.55238 1.59126 2.56812C1.47366 2.62804 1.37804 2.72365 1.31812 2.84126C1.30238 2.87216 1.27883 2.93511 1.26496 3.1049C1.25049 3.28198 1.25 3.51465 1.25 3.875V12.375C1.25 12.7353 1.25049 12.968 1.26496 13.1451C1.27883 13.3149 1.30238 13.3778 1.31812 13.4087C1.37804 13.5263 1.47366 13.622 1.59126 13.6819C1.62216 13.6976 1.68511 13.7212 1.8549 13.735C2.03198 13.7495 2.26466 13.75 2.625 13.75H12.375C12.7353 13.75 12.968 13.7495 13.1451 13.735C13.3149 13.7212 13.3778 13.6976 13.4087 13.6819C13.5263 13.622 13.622 13.5263 13.6819 13.4087C13.6976 13.3778 13.7212 13.3149 13.735 13.1451C13.7495 12.968 13.75 12.7353 13.75 12.375V3.875C13.75 3.51465 13.7495 3.28198 13.735 3.1049C13.7212 2.93511 13.6976 2.87216 13.6819 2.84126C13.622 2.72365 13.5263 2.62804 13.4087 2.56812C13.3778 2.55238 13.3149 2.52883 13.1451 2.51495C12.968 2.50049 12.7353 2.5 12.375 2.5H2.625C2.26466 2.5 2.03198 2.50049 1.8549 2.51495Z" fill="#1F2023"/><path d="M2.5 0.625C2.5 0.279822 2.77982 0 3.125 0C3.47018 0 3.75 0.279822 3.75 0.625V3.125C3.75 3.47018 3.47018 3.75 3.125 3.75C2.77982 3.75 2.5 3.47018 2.5 3.125V0.625Z" fill="#1F2023"/><path d="M11.25 0.625C11.25 0.279822 11.5298 0 11.875 0C12.2202 0 12.5 0.279822 12.5 0.625V3.125C12.5 3.47018 12.2202 3.75 11.875 3.75C11.5298 3.75 11.25 3.47018 11.25 3.125V0.625Z" fill="#1F2023"/><path d="M8.75 7.5C8.75 8.19036 8.19036 8.75 7.5 8.75C6.80964 8.75 6.25 8.19036 6.25 7.5C6.25 6.80964 6.80964 6.25 7.5 6.25C8.19036 6.25 8.75 6.80964 8.75 7.5Z" fill="#1F2023"/><path d="M12.5 7.5C12.5 8.19036 11.9404 8.75 11.25 8.75C10.5596 8.75 10 8.19036 10 7.5C10 6.80964 10.5596 6.25 11.25 6.25C11.9404 6.25 12.5 6.80964 12.5 7.5Z" fill="#1F2023"/><path d="M5 11.25C5 11.9404 4.44036 12.5 3.75 12.5C3.05964 12.5 2.5 11.9404 2.5 11.25C2.5 10.5596 3.05964 10 3.75 10C4.44036 10 5 10.5596 5 11.25Z" fill="#1F2023"/><path d="M8.75 11.25C8.75 11.9404 8.19036 12.5 7.5 12.5C6.80964 12.5 6.25 11.9404 6.25 11.25C6.25 10.5596 6.80964 10 7.5 10C8.19036 10 8.75 10.5596 8.75 11.25Z" fill="#1F2023"/></svg>'
};


// ---------------------------------------------------------------------------
//  LOGO
// ---------------------------------------------------------------------------

var logoSvg = (function() {
    var rc = '#3b82f6'; // radar color
    var tc = '#1e293b'; // text/stroke color
    return '<svg xmlns="http://www.w3.org/2000/svg" width="55" height="55" viewBox="0 0 60 60" fill="none">' +
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
