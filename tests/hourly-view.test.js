/**
 * Tests unitaires — Vue horaire (3h) et fonctions utilitaires météo
 *
 * Exécution : node tests/hourly-view.test.js
 *
 * Teste :
 *   1. getWeatherInfo()          — mapping pictocode → icône + description
 *   2. getWindDirectionDisplay() — degrés → point cardinal
 *   3. getWindColor()            — vitesse vent → couleur d'alerte
 *   4. processHourlyDataForResort() — extraction data_3h → { name, days[] }
 *      - structure de retour (5 jours max, slots par jour)
 *      - logs de débogage (vérification des clés API)
 *      - calcul précipitations neige/pluie
 *      - icônes jour/nuit
 *      - cas limites (pas de data, valeurs nulles, etc.)
 */

const assert = require('assert');

// ============================================================
// Modules projet
// ============================================================
const { getWeatherInfo } = require('../weatherCodes');

// ============================================================
// Copies des fonctions utilitaires (sync avec index.html)
// ============================================================

function getWindDirectionDisplay(degrees) {
    if (degrees === null || degrees === undefined) return { cardinal: '' };
    const normalized = ((degrees % 360) + 360) % 360;
    const cardinals = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(normalized / 45) % 8;
    return { cardinal: cardinals[index] };
}

function getWindColor(speed) {
    if (speed >= 80) return '#c0392b';
    if (speed >= 50) return '#e67e22';
    if (speed >= 30) return '#f39c12';
    return 'inherit';
}

function getTodayStr() {
    return new Date().toLocaleDateString('en-CA', { timeZone: 'Europe/Paris' });
}

/**
 * processHourlyDataForResort — copie depuis index.html
 * Retourne { name, days: [{ date, dayLabel, dayLabelLong, hours: [...] }] }
 * ou null si data_3h absent.
 */
function processHourlyDataForResort(resort) {
    if (!resort.data) return null;
    if (!resort.data.data_3h) return null;

    const d3h = resort.data.data_3h;
    const dayMap = new Map();

    for (let i = 0; i < d3h.time.length; i++) {
        const timeStr = d3h.time[i];
        const dateStr = timeStr.substring(0, 10);

        if (!dayMap.has(dateStr)) {
            if (dayMap.size >= 5) continue;
            dayMap.set(dateStr, []);
        }

        const hour = parseInt(timeStr.substring(11, 13), 10);
        const weatherInfo = getWeatherInfo(d3h.pictocode?.[i] || 1, hour);
        const windDisplay = getWindDirectionDisplay(d3h.winddirection?.[i]);

        const totalPrecip = d3h.precipitation?.[i] || 0;
        const snowFraction = d3h.snowfraction?.[i] || 0;
        const snowMm  = Math.round(totalPrecip * snowFraction * 10) / 10;
        const rainMm  = Math.round(totalPrecip * (1 - snowFraction) * 10) / 10;

        dayMap.get(dateStr).push({
            label:        `${hour.toString().padStart(2, '0')}h`,
            hour,
            icon:         weatherInfo.icon,
            desc:         weatherInfo.desc,
            temp:         Math.round(d3h.temperature?.[i]  || 0),
            windSpeed:    Math.round(d3h.windspeed?.[i]    || 0),
            windDir:      d3h.winddirection?.[i] ?? null,
            windCardinal: windDisplay.cardinal,
            precip:       Math.round(totalPrecip * 10) / 10,
            snowMm,
            rainMm,
        });
    }

    const days = [];
    for (const [date, hours] of dayMap.entries()) {
        const dt = new Date(`${date}T12:00:00`);
        const dayLabel = dt.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' });
        const dayLabelLong = dt.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
        days.push({ date, dayLabel, dayLabelLong, hours });
    }

    return days.length > 0 ? { name: resort.name, days } : null;
}

// ============================================================
// Helpers de test
// ============================================================

const todayStr = getTodayStr();

/** Génère une date YYYY-MM-DD décalée de `offsetDays` jours par rapport à aujourd'hui */
function dateOffset(offsetDays) {
    const d = new Date();
    d.setDate(d.getDate() + offsetDays);
    return d.toLocaleDateString('en-CA');
}

/** Crée un mock resort avec data_3h couvrant N jours */
function createMockResort(name, { days = 1, slotsPerDay = 8, overrides = {} } = {}) {
    const time = [], pictocode = [], temperature = [], windspeed = [], winddirection = [], precipitation = [], snowfraction = [];

    for (let d = 0; d < days; d++) {
        const dateStr = dateOffset(d);
        for (let s = 0; s < slotsPerDay; s++) {
            const hour = s * 3;
            time.push(`${dateStr} ${hour.toString().padStart(2, '0')}:00`);
            pictocode.push((overrides.pictocode?.[d * slotsPerDay + s]) ?? (hour < 6 || hour >= 20 ? 31 : 1));
            temperature.push((overrides.temperature?.[d * slotsPerDay + s]) ?? -8 + d - s * 0.5);
            windspeed.push((overrides.windspeed?.[d * slotsPerDay + s]) ?? 15 + s);
            winddirection.push((overrides.winddirection?.[d * slotsPerDay + s]) ?? s * 45);
            precipitation.push((overrides.precipitation?.[d * slotsPerDay + s]) ?? (s % 3 === 0 ? 0 : s * 0.3));
            snowfraction.push((overrides.snowfraction?.[d * slotsPerDay + s]) ?? (d === 0 ? 1 : 0.5));
        }
    }

    return {
        name,
        data: { data_3h: { time, pictocode, temperature, windspeed, winddirection, precipitation, snowfraction } },
    };
}

// ============================================================
// Runner
// ============================================================

let passed = 0, failed = 0;

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

// ============================================================
// 1. getWeatherInfo
// ============================================================

console.log('\n=== Tests — getWeatherInfo ===');

test('retourne icône + description pour code valide (jour)', () => {
    const info = getWeatherInfo(1, 12);
    assert.ok(info.icon.includes('img'), 'devrait contenir <img>');
    assert.strictEqual(info.desc, 'Ensoleillé');
});

test('utilise le pictogramme nuit pour heure nocturne (22h)', () => {
    const info = getWeatherInfo(1, 22);
    assert.ok(info.icon.includes('inight'), 'devrait utiliser le picto nuit');
});

test('gère les codes neige', () => {
    const info = getWeatherInfo(27, 12);
    assert.strictEqual(info.desc, 'Neige');
});

test('fallback vers code 1 si code invalide', () => {
    const info = getWeatherInfo(999, 12);
    assert.strictEqual(info.desc, 'Ensoleillé');
});

// ============================================================
// 2. getWindDirectionDisplay
// ============================================================

console.log('\n=== Tests — getWindDirectionDisplay ===');

const windTests = [[0,'N'],[90,'E'],[180,'S'],[270,'W'],[45,'NE'],[135,'SE'],[225,'SW'],[315,'NW'],[360,'N'],[-90,'W']];
windTests.forEach(([deg, expected]) => {
    test(`${deg}° → ${expected}`, () => {
        assert.strictEqual(getWindDirectionDisplay(deg).cardinal, expected);
    });
});

test('null → cardinal vide', () => {
    assert.strictEqual(getWindDirectionDisplay(null).cardinal, '');
});
test('undefined → cardinal vide', () => {
    assert.strictEqual(getWindDirectionDisplay(undefined).cardinal, '');
});

// ============================================================
// 3. getWindColor
// ============================================================

console.log('\n=== Tests — getWindColor ===');

test('< 30 km/h → inherit', ()  => assert.strictEqual(getWindColor(20), 'inherit'));
test('30 km/h  → #f39c12',  () => assert.strictEqual(getWindColor(30), '#f39c12'));
test('50 km/h  → #e67e22',  () => assert.strictEqual(getWindColor(50), '#e67e22'));
test('80 km/h  → #c0392b',  () => assert.strictEqual(getWindColor(80), '#c0392b'));
test('100 km/h → #c0392b',  () => assert.strictEqual(getWindColor(100), '#c0392b'));

// ============================================================
// 4. processHourlyDataForResort — structure de base
// ============================================================

console.log('\n=== Tests — processHourlyDataForResort : structure ===');

test('retourne null si resort.data est null', () => {
    assert.strictEqual(processHourlyDataForResort({ name: 'Test', data: null }), null);
});

test('retourne null si data_3h absent', () => {
    assert.strictEqual(processHourlyDataForResort({ name: 'Test', data: { data_day: {} } }), null);
});

test('retourne { name, days } si data_3h présent', () => {
    const result = processHourlyDataForResort(createMockResort('Guzet', { days: 1 }));
    assert.ok(result, 'ne devrait pas être null');
    assert.strictEqual(result.name, 'Guzet');
    assert.ok(Array.isArray(result.days), 'days doit être un tableau');
});

test('1 jour → 1 entrée dans days[]', () => {
    const result = processHourlyDataForResort(createMockResort('Test', { days: 1 }));
    assert.strictEqual(result.days.length, 1);
});

test('3 jours → 3 entrées dans days[]', () => {
    const result = processHourlyDataForResort(createMockResort('Test', { days: 3 }));
    assert.strictEqual(result.days.length, 3);
});

test('7 jours → max 5 entrées dans days[] (limite 5 jours)', () => {
    const result = processHourlyDataForResort(createMockResort('Test', { days: 7 }));
    assert.strictEqual(result.days.length, 5, 'doit être limité à 5 jours');
});

test('chaque jour a 8 créneaux (slots de 3h)', () => {
    const result = processHourlyDataForResort(createMockResort('Test', { days: 2 }));
    result.days.forEach((day, i) => {
        assert.strictEqual(day.hours.length, 8, `jour ${i} devrait avoir 8 créneaux`);
    });
});

// ============================================================
// 5. processHourlyDataForResort — contenu des créneaux
// ============================================================

console.log('\n=== Tests — processHourlyDataForResort : contenu ===');

const resort1Day = createMockResort('Test', {
    days: 1,
    overrides: {
        temperature:   [-10,-11,-8,-5,-3,-4,-6,-9],
        windspeed:     [15, 20, 25, 18, 12, 10,  8,  5],
        winddirection: [0,  45, 90,135,180,225,270,315],
        precipitation: [0,   0,0.5,1.2,  0,  0,0.3,  0],
        snowfraction:  [0,   0,  1,0.8,  0,  0,0.5,  0],
    },
});
const r1 = processHourlyDataForResort(resort1Day);

test('labels horaires corrects pour le jour 0 (00h, 03h, …, 21h)', () => {
    const labels = r1.days[0].hours.map(h => h.label);
    assert.deepStrictEqual(labels, ['00h','03h','06h','09h','12h','15h','18h','21h']);
});

test('températures correctement arrondies', () => {
    assert.strictEqual(r1.days[0].hours[0].temp, -10);
    assert.strictEqual(r1.days[0].hours[3].temp, -5);
});

test('direction du vent correcte par créneau', () => {
    assert.strictEqual(r1.days[0].hours[0].windCardinal, 'N');   // 0°
    assert.strictEqual(r1.days[0].hours[1].windCardinal, 'NE');  // 45°
    assert.strictEqual(r1.days[0].hours[2].windCardinal, 'E');   // 90°
    assert.strictEqual(r1.days[0].hours[4].windCardinal, 'S');   // 180°
});

test('vitesse du vent correcte', () => {
    assert.strictEqual(r1.days[0].hours[0].windSpeed, 15);
    assert.strictEqual(r1.days[0].hours[2].windSpeed, 25);
});

test('précipitations neige vs pluie — 06h : tout en neige', () => {
    const h = r1.days[0].hours[2]; // precip=0.5, snowfraction=1
    assert.strictEqual(h.precip, 0.5);
    assert.strictEqual(h.snowMm, 0.5);
    assert.strictEqual(h.rainMm, 0);
});

test('précipitations neige vs pluie — 09h : 80% neige', () => {
    const h = r1.days[0].hours[3]; // precip=1.2, snowfraction=0.8
    assert.strictEqual(h.precip, 1.2);
    assert.ok(h.snowMm > 0, 'snowMm devrait être > 0');
    assert.ok(h.rainMm > 0, 'rainMm devrait être > 0');
    assert.ok(Math.abs(h.snowMm + h.rainMm - 1.2) < 0.01, 'snowMm + rainMm ≈ 1.2');
});

test('précipitations = 0 si aucune pluie/neige', () => {
    const h = r1.days[0].hours[0]; // precip=0
    assert.strictEqual(h.precip, 0);
    assert.strictEqual(h.snowMm, 0);
    assert.strictEqual(h.rainMm, 0);
});

test('icône jour pour 12h (pictocode 1)', () => {
    assert.ok(r1.days[0].hours[4].icon.includes('iday'), 'créneau 12h doit utiliser picto jour');
});

// ============================================================
// 6. processHourlyDataForResort — labels jours français
// ============================================================

console.log('\n=== Tests — processHourlyDataForResort : labels jours ===');

test('dayLabel est défini et non vide', () => {
    const result = processHourlyDataForResort(createMockResort('Test', { days: 2 }));
    result.days.forEach((day, i) => {
        assert.ok(day.dayLabel && day.dayLabel.length > 0, `jour ${i} : dayLabel vide`);
    });
});

test('dayLabelLong est défini et non vide', () => {
    const result = processHourlyDataForResort(createMockResort('Test', { days: 2 }));
    result.days.forEach((day, i) => {
        assert.ok(day.dayLabelLong && day.dayLabelLong.length > 0, `jour ${i} : dayLabelLong vide`);
    });
});

test('date est au format YYYY-MM-DD', () => {
    const result = processHourlyDataForResort(createMockResort('Test', { days: 2 }));
    result.days.forEach(day => {
        assert.match(day.date, /^\d{4}-\d{2}-\d{2}$/, `date malformée : ${day.date}`);
    });
});

test('les jours sont triés dans l\'ordre chronologique', () => {
    const result = processHourlyDataForResort(createMockResort('Test', { days: 5 }));
    for (let i = 1; i < result.days.length; i++) {
        assert.ok(result.days[i].date > result.days[i - 1].date,
            `ordre incorrect : ${result.days[i - 1].date} > ${result.days[i].date}`);
    }
});

// ============================================================
// 7. processHourlyDataForResort — cas limites
// ============================================================

console.log('\n=== Tests — processHourlyDataForResort : cas limites ===');

test('gère les valeurs null/undefined gracieusement', () => {
    const resort = {
        name: 'Incomplet',
        data: {
            data_3h: {
                time: [`${todayStr} 12:00`],
                pictocode: [null], temperature: [undefined], windspeed: [null],
                winddirection: [null], precipitation: [undefined], snowfraction: [undefined],
            },
        },
    };
    const result = processHourlyDataForResort(resort);
    assert.ok(result, 'ne doit pas crasher');
    assert.strictEqual(result.days[0].hours[0].temp, 0);
    assert.strictEqual(result.days[0].hours[0].windSpeed, 0);
    assert.strictEqual(result.days[0].hours[0].windDir, null);
    assert.strictEqual(result.days[0].hours[0].precip, 0);
});

test('retourne null si data_3h.time est vide', () => {
    const resort = { name: 'Vide', data: { data_3h: { time: [], pictocode: [] } } };
    const result = processHourlyDataForResort(resort);
    assert.strictEqual(result, null);
});

test('multi-jours : chaque jour a la bonne date', () => {
    const result = processHourlyDataForResort(createMockResort('Test', { days: 3 }));
    for (let i = 0; i < 3; i++) {
        assert.strictEqual(result.days[i].date, dateOffset(i),
            `jour ${i} : date attendue ${dateOffset(i)}, reçue ${result.days[i].date}`);
    }
});

// ============================================================
// Résumé
// ============================================================

console.log(`\n${'='.repeat(50)}`);
console.log(`Total: ${passed + failed} tests — ${passed} OK, ${failed} FAIL`);
console.log('='.repeat(50));

if (failed > 0) process.exit(1);
