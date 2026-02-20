/**
 * Tests unitaires — Vue horaire (3h) et fonctions utilitaires météo
 *
 * Exécution : node tests/hourly-view.test.js
 *
 * Teste :
 *   1. getWeatherInfo()        — mapping pictocode → icône + description
 *   2. getWindDirectionDisplay() — degrés → point cardinal
 *   3. getWindColor()           — vitesse vent → couleur d'alerte
 *   4. processHourlyDataForResort() — extraction data_3h → tableau horaire
 *   5. Cas limites (pas de data_3h, valeurs nulles, etc.)
 */

const assert = require('assert');

// ============================================================
// 1. Charger les modules depuis le codebase
// ============================================================

// weatherCodes.js exporte via module.exports quand disponible
const { weatherCodeToFile, getWeatherInfo } = require('../weatherCodes');

// Fonctions utilitaires extraites de index.html (copiées pour pouvoir les tester)
// Règle : ces fonctions doivent rester synchronisées avec index.html

/**
 * Convertit une direction en degrés en point cardinal
 * (copie de index.html — getWindDirectionDisplay)
 */
function getWindDirectionDisplay(degrees) {
    if (degrees === null || degrees === undefined) {
        return { cardinal: "" };
    }
    const normalized = ((degrees % 360) + 360) % 360;
    const cardinals = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const index = Math.round(normalized / 45) % 8;
    return { cardinal: cardinals[index] };
}

/**
 * Couleur du vent selon la vitesse (km/h)
 * (copie de index.html — getWindColor)
 */
function getWindColor(speed) {
    if (speed >= 80) return "#c0392b";
    if (speed >= 50) return "#e67e22";
    if (speed >= 30) return "#f39c12";
    return "inherit";
}

/**
 * Retourne la date d'aujourd'hui au format YYYY-MM-DD
 * (copie simplifiée de index.html — getTodayStr)
 */
function getTodayStr() {
    return new Date().toLocaleDateString("en-CA", { timeZone: "Europe/Paris" });
}

/**
 * Traite les données horaires (3h) pour un secteur
 * (copie de index.html — processHourlyDataForResort)
 */
function processHourlyDataForResort(resort) {
    if (!resort.data || !resort.data.data_3h) return null;

    const d3h = resort.data.data_3h;
    const todayStr = getTodayStr();
    const hours = [];

    for (let i = 0; i < d3h.time.length; i++) {
        const timeStr = d3h.time[i];
        const dateStr = timeStr.substring(0, 10);

        if (dateStr !== todayStr) continue;

        const hour = parseInt(timeStr.substring(11, 13), 10);
        const weatherInfo = getWeatherInfo(d3h.pictocode?.[i] || 1, hour);
        const windDisplay = getWindDirectionDisplay(d3h.winddirection?.[i]);

        const totalPrecip = d3h.precipitation?.[i] || 0;
        const snowFraction = d3h.snowfraction?.[i] || 0;
        const snowMm = Math.round(totalPrecip * snowFraction * 10) / 10;
        const rainMm = Math.round(totalPrecip * (1 - snowFraction) * 10) / 10;

        hours.push({
            label: `${hour.toString().padStart(2, '0')}h`,
            hour,
            icon: weatherInfo.icon,
            desc: weatherInfo.desc,
            temp: Math.round(d3h.temperature?.[i] || 0),
            windSpeed: Math.round(d3h.windspeed?.[i] || 0),
            windDir: d3h.winddirection?.[i] ?? null,
            windCardinal: windDisplay.cardinal,
            precip: Math.round(totalPrecip * 10) / 10,
            snowMm,
            rainMm,
        });
    }

    return hours.length > 0 ? { name: resort.name, hours } : null;
}


// ============================================================
// 2. Données de test (mock data_3h Meteoblue)
// ============================================================

const todayStr = getTodayStr(); // ex: "2026-02-20"

/** Mock d'un resort avec data_3h complètes pour aujourd'hui */
function createMockResort(name, overrides = {}) {
    return {
        name,
        data: {
            data_3h: {
                time: [
                    `${todayStr} 00:00`, `${todayStr} 03:00`, `${todayStr} 06:00`,
                    `${todayStr} 09:00`, `${todayStr} 12:00`, `${todayStr} 15:00`,
                    `${todayStr} 18:00`, `${todayStr} 21:00`,
                ],
                pictocode:     overrides.pictocode     || [31, 31, 1, 2, 3, 2, 4, 31],
                temperature:   overrides.temperature   || [-10, -11, -8, -5, -3, -4, -6, -9],
                windspeed:     overrides.windspeed     || [15, 20, 25, 18, 12, 10, 8, 5],
                winddirection: overrides.winddirection || [0, 45, 90, 135, 180, 225, 270, 315],
                precipitation: overrides.precipitation || [0, 0, 0.5, 1.2, 0, 0, 0.3, 0],
                snowfraction:  overrides.snowfraction  || [0, 0, 1, 0.8, 0, 0, 0.5, 0],
            },
        },
    };
}


// ============================================================
// 3. Tests
// ============================================================

let passed = 0;
let failed = 0;

function test(name, fn) {
    try {
        fn();
        passed++;
        console.log(`  OK  ${name}`);
    } catch (err) {
        failed++;
        console.error(`  FAIL  ${name}`);
        console.error(`        ${err.message}`);
    }
}

console.log('\n=== Tests — getWeatherInfo ===');

test('retourne une icône et description pour un code valide (jour)', () => {
    const info = getWeatherInfo(1, 12);
    assert.ok(info.icon.includes('img'), 'devrait contenir une balise <img>');
    assert.strictEqual(info.desc, 'Ensoleillé');
});

test('retourne une icône nuit pour un code nocturne (hour=22)', () => {
    const info = getWeatherInfo(1, 22);
    assert.ok(info.icon.includes('inight'), 'devrait utiliser le pictogramme nuit');
});

test('gère les codes horaires (18-35) avec fallback', () => {
    const info = getWeatherInfo(27, 12);
    assert.strictEqual(info.desc, 'Neige');
});

test('fallback vers code 1 si code invalide', () => {
    const info = getWeatherInfo(999, 12);
    assert.strictEqual(info.desc, 'Ensoleillé');
});


console.log('\n=== Tests — getWindDirectionDisplay ===');

test('0° → N', () => {
    assert.strictEqual(getWindDirectionDisplay(0).cardinal, 'N');
});

test('90° → E', () => {
    assert.strictEqual(getWindDirectionDisplay(90).cardinal, 'E');
});

test('180° → S', () => {
    assert.strictEqual(getWindDirectionDisplay(180).cardinal, 'S');
});

test('270° → W', () => {
    assert.strictEqual(getWindDirectionDisplay(270).cardinal, 'W');
});

test('45° → NE', () => {
    assert.strictEqual(getWindDirectionDisplay(45).cardinal, 'NE');
});

test('225° → SW', () => {
    assert.strictEqual(getWindDirectionDisplay(225).cardinal, 'SW');
});

test('360° → N (normalisation)', () => {
    assert.strictEqual(getWindDirectionDisplay(360).cardinal, 'N');
});

test('-90° → W (négatif)', () => {
    assert.strictEqual(getWindDirectionDisplay(-90).cardinal, 'W');
});

test('null → vide', () => {
    assert.strictEqual(getWindDirectionDisplay(null).cardinal, '');
});

test('undefined → vide', () => {
    assert.strictEqual(getWindDirectionDisplay(undefined).cardinal, '');
});


console.log('\n=== Tests — getWindColor ===');

test('< 30 km/h → inherit (normal)', () => {
    assert.strictEqual(getWindColor(20), 'inherit');
});

test('30 km/h → jaune-orange (fort)', () => {
    assert.strictEqual(getWindColor(30), '#f39c12');
});

test('50 km/h → orange (très fort)', () => {
    assert.strictEqual(getWindColor(50), '#e67e22');
});

test('80 km/h → rouge (dangereux)', () => {
    assert.strictEqual(getWindColor(80), '#c0392b');
});


console.log('\n=== Tests — processHourlyDataForResort ===');

test('retourne null si pas de données', () => {
    assert.strictEqual(processHourlyDataForResort({ name: 'Test', data: null }), null);
});

test('retourne null si pas de data_3h', () => {
    assert.strictEqual(processHourlyDataForResort({ name: 'Test', data: { data_day: {} } }), null);
});

test('extrait les 8 créneaux 3h pour aujourd\'hui', () => {
    const resort = createMockResort('Guzet');
    const result = processHourlyDataForResort(resort);
    assert.ok(result, 'ne devrait pas être null');
    assert.strictEqual(result.name, 'Guzet');
    assert.strictEqual(result.hours.length, 8, 'devrait avoir 8 créneaux');
});

test('labels horaires corrects (00h, 03h, ..., 21h)', () => {
    const resort = createMockResort('Test');
    const result = processHourlyDataForResort(resort);
    const labels = result.hours.map(h => h.label);
    assert.deepStrictEqual(labels, ['00h', '03h', '06h', '09h', '12h', '15h', '18h', '21h']);
});

test('températures correctement arrondies', () => {
    const resort = createMockResort('Test');
    const result = processHourlyDataForResort(resort);
    assert.strictEqual(result.hours[0].temp, -10);
    assert.strictEqual(result.hours[3].temp, -5);
    assert.strictEqual(result.hours[4].temp, -3);
});

test('direction du vent correcte pour chaque créneau', () => {
    const resort = createMockResort('Test');
    const result = processHourlyDataForResort(resort);
    assert.strictEqual(result.hours[0].windCardinal, 'N');   // 0°
    assert.strictEqual(result.hours[1].windCardinal, 'NE');  // 45°
    assert.strictEqual(result.hours[2].windCardinal, 'E');   // 90°
    assert.strictEqual(result.hours[4].windCardinal, 'S');   // 180°
});

test('vitesse du vent correcte', () => {
    const resort = createMockResort('Test');
    const result = processHourlyDataForResort(resort);
    assert.strictEqual(result.hours[0].windSpeed, 15);
    assert.strictEqual(result.hours[2].windSpeed, 25);
});

test('précipitations neige vs pluie correctes', () => {
    const resort = createMockResort('Test');
    const result = processHourlyDataForResort(resort);

    // Créneau 06h : precip=0.5, snowfraction=1 → tout en neige
    assert.strictEqual(result.hours[2].precip, 0.5);
    assert.strictEqual(result.hours[2].snowMm, 0.5);
    assert.strictEqual(result.hours[2].rainMm, 0);

    // Créneau 09h : precip=1.2, snowfraction=0.8 → 80% neige
    assert.strictEqual(result.hours[3].precip, 1.2);
    assert.ok(result.hours[3].snowMm > 0, 'snowMm devrait être > 0');
    assert.ok(result.hours[3].rainMm > 0, 'rainMm devrait être > 0');

    // Créneau 00h : precip=0 → pas de précipitations
    assert.strictEqual(result.hours[0].precip, 0);
});

test('filtre les créneaux qui ne sont pas aujourd\'hui', () => {
    const resort = createMockResort('Test');
    // Ajouter des créneaux d'hier
    resort.data.data_3h.time.unshift('2020-01-01 21:00');
    resort.data.data_3h.pictocode.unshift(1);
    resort.data.data_3h.temperature.unshift(-15);
    resort.data.data_3h.windspeed.unshift(30);
    resort.data.data_3h.winddirection.unshift(0);
    resort.data.data_3h.precipitation.unshift(0);
    resort.data.data_3h.snowfraction.unshift(0);

    const result = processHourlyDataForResort(resort);
    // Ne doit avoir que les 8 créneaux d'aujourd'hui (pas celui d'hier)
    assert.strictEqual(result.hours.length, 8);
});

test('icône jour/nuit selon l\'heure du créneau', () => {
    const resort = createMockResort('Test');
    const result = processHourlyDataForResort(resort);

    // 00h = nuit → devrait utiliser picto nuit
    assert.ok(result.hours[0].icon.includes('inight') || result.hours[0].desc.includes('Nuit') || result.hours[0].desc.includes('claire'),
        'créneau 00h devrait avoir un picto nuit');
    // 12h = jour → devrait utiliser picto jour
    assert.ok(result.hours[4].icon.includes('iday'),
        'créneau 12h devrait avoir un picto jour');
});

test('gère les valeurs manquantes gracieusement', () => {
    const resort = {
        name: 'Incomplet',
        data: {
            data_3h: {
                time: [`${todayStr} 12:00`],
                pictocode: [null],
                temperature: [undefined],
                windspeed: [null],
                winddirection: [null],
                precipitation: [undefined],
                snowfraction: [undefined],
            },
        },
    };
    const result = processHourlyDataForResort(resort);
    assert.ok(result, 'ne devrait pas crasher');
    assert.strictEqual(result.hours.length, 1);
    assert.strictEqual(result.hours[0].temp, 0);
    assert.strictEqual(result.hours[0].windSpeed, 0);
    assert.strictEqual(result.hours[0].windDir, null);
    assert.strictEqual(result.hours[0].precip, 0);
});


// ============================================================
// 4. Résumé
// ============================================================

console.log(`\n${'='.repeat(50)}`);
console.log(`Total: ${passed + failed} tests — ${passed} OK, ${failed} FAIL`);
console.log('='.repeat(50));

if (failed > 0) {
    process.exit(1);
}
