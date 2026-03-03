// peaks.js - Base de données des pics et secteurs des Pyrénées
// Utilisé pour les suggestions locales dans la recherche (fallback Météoblue)
// Couvre les 10 massifs Météo France des Pyrénées (IDs 64-74)

const PEAKS_PYRENEES = [
    // --- Pays-Basque (massif 64) ---
    { name: "La Rhune", lat: 43.3093, lon: -1.634, altitude: 905, massif: "Pays-Basque" },
    { name: "Pic d'Orhy", lat: 42.9879, lon: -0.9025, altitude: 2017, massif: "Pays-Basque" },
    { name: "Pic d'Anie", lat: 42.8993, lon: -0.6837, altitude: 2504, massif: "Pays-Basque" },
    { name: "Pic de la Canaou", lat: 42.8597, lon: -0.6536, altitude: 2330, massif: "Pays-Basque" },
    { name: "Pic de Béhorléguy", lat: 43.0567, lon: -0.9967, altitude: 1513, massif: "Pays-Basque" },
    { name: "Pic de Gaztambide", lat: 42.9767, lon: -0.8633, altitude: 1669, massif: "Pays-Basque" },
    { name: "Pic de Larrau", lat: 42.9922, lon: -0.8983, altitude: 1570, massif: "Pays-Basque" },
    { name: "Col de la Pierre Saint-Martin", lat: 42.9672, lon: -0.8019, altitude: 1760, massif: "Pays-Basque" },

    // --- Aspe-Ossau (massif 65) ---
    { name: "Pic du Midi d'Ossau", lat: 42.8396, lon: -0.4379, altitude: 2884, massif: "Aspe-Ossau" },
    { name: "Pic du Palas", lat: 42.8556, lon: -0.3614, altitude: 2974, massif: "Aspe-Ossau" },
    { name: "Pic de Ger", lat: 42.8699, lon: -0.3341, altitude: 2613, massif: "Aspe-Ossau" },
    { name: "Pic d'Ayous", lat: 42.9032, lon: -0.4647, altitude: 2288, massif: "Aspe-Ossau" },
    { name: "Pic de la Sagette", lat: 42.8809, lon: -0.4286, altitude: 2031, massif: "Aspe-Ossau" },
    { name: "Pic du Pourtalet", lat: 42.7833, lon: -0.4167, altitude: 1794, massif: "Aspe-Ossau" },
    { name: "Pic Peyreget", lat: 42.8478, lon: -0.4234, altitude: 2487, massif: "Aspe-Ossau" },
    { name: "Pic de Gabedaille", lat: 42.8322, lon: -0.4445, altitude: 2692, massif: "Aspe-Ossau" },
    { name: "Pic de Peyrelue", lat: 42.8234, lon: -0.2832, altitude: 2481, massif: "Aspe-Ossau" },
    { name: "Pic de Bious-Artigues", lat: 42.8750, lon: -0.4375, altitude: 1417, massif: "Aspe-Ossau" },
    { name: "Col du Pourtalet", lat: 42.7833, lon: -0.4167, altitude: 1794, massif: "Aspe-Ossau" },
    { name: "Col d'Aubisque", lat: 42.9808, lon: -0.3381, altitude: 1709, massif: "Aspe-Ossau" },
    { name: "Lac d'Artouste", lat: 42.8841, lon: -0.4428, altitude: 1989, massif: "Aspe-Ossau" },
    { name: "Pic de la Hourquette d'Arre", lat: 42.9467, lon: -0.3117, altitude: 2465, massif: "Aspe-Ossau" },
    { name: "Pic d'Aule", lat: 42.8689, lon: -0.5261, altitude: 2414, massif: "Aspe-Ossau" },
    { name: "Pic de Lurien", lat: 42.8789, lon: -0.4664, altitude: 2826, massif: "Aspe-Ossau" },
    { name: "Pic de Sesques", lat: 42.8822, lon: -0.3708, altitude: 2606, massif: "Aspe-Ossau" },
    { name: "Pic de Lariste", lat: 42.9011, lon: -0.5572, altitude: 2162, massif: "Aspe-Ossau" },
    { name: "Col de Somport", lat: 42.7883, lon: -0.5308, altitude: 1632, massif: "Aspe-Ossau" },

    // --- Haute-Bigorre (massif 66) ---
    { name: "Pic du Midi de Bigorre", lat: 42.9367, lon: 0.1419, altitude: 2877, massif: "Haute-Bigorre" },
    { name: "Vignemale", lat: 42.7722, lon: -0.1472, altitude: 3298, massif: "Haute-Bigorre" },
    { name: "Pic du Marboré", lat: 42.6744, lon: 0.0033, altitude: 3248, massif: "Haute-Bigorre" },
    { name: "Cylindre du Marboré", lat: 42.6911, lon: 0.0294, altitude: 3328, massif: "Haute-Bigorre" },
    { name: "Pic Long", lat: 42.7522, lon: 0.1522, altitude: 3192, massif: "Haute-Bigorre" },
    { name: "Pic de Néouvielle", lat: 42.8461, lon: 0.1278, altitude: 3091, massif: "Haute-Bigorre" },
    { name: "Pic d'Ardiden", lat: 42.8956, lon: -0.0733, altitude: 2988, massif: "Haute-Bigorre" },
    { name: "Pic de la Munia", lat: 42.6964, lon: 0.1111, altitude: 3133, massif: "Haute-Bigorre" },
    { name: "Pic du Taillon", lat: 42.6833, lon: -0.0167, altitude: 3144, massif: "Haute-Bigorre" },
    { name: "Pic de la Brèche de Roland", lat: 42.6861, lon: -0.0197, altitude: 2807, massif: "Haute-Bigorre" },
    { name: "Col du Tourmalet", lat: 42.9047, lon: -0.145, altitude: 2115, massif: "Haute-Bigorre" },
    { name: "Cirque de Gavarnie", lat: 42.7344, lon: -0.01, altitude: 1365, massif: "Haute-Bigorre" },
    { name: "Pic de Labas", lat: 42.7544, lon: 0.0756, altitude: 2946, massif: "Haute-Bigorre" },
    { name: "Pic de Pène Blanque", lat: 42.9056, lon: -0.0642, altitude: 2391, massif: "Haute-Bigorre" },
    { name: "Hautacam", lat: 42.9294, lon: -0.0267, altitude: 1560, massif: "Haute-Bigorre" },
    { name: "Pic de Tentes", lat: 42.7097, lon: -0.0236, altitude: 2322, massif: "Haute-Bigorre" },
    { name: "Pic de Gabiédou", lat: 42.7350, lon: -0.0528, altitude: 2685, massif: "Haute-Bigorre" },
    { name: "Pic de la Cascade", lat: 42.7256, lon: 0.0122, altitude: 3095, massif: "Haute-Bigorre" },
    { name: "Col de Boucharo", lat: 42.6997, lon: -0.0178, altitude: 2270, massif: "Haute-Bigorre" },

    // --- Aure-Louron (massif 67) ---
    { name: "Pic d'Estaragne", lat: 42.7889, lon: 0.3167, altitude: 3006, massif: "Aure-Louron" },
    { name: "Pic Badet", lat: 42.7833, lon: 0.2833, altitude: 3160, massif: "Aure-Louron" },
    { name: "Pic de Campbieil", lat: 42.7806, lon: 0.2806, altitude: 3173, massif: "Aure-Louron" },
    { name: "Pic d'Arbizon", lat: 42.81, lon: 0.315, altitude: 2831, massif: "Aure-Louron" },
    { name: "Pic de Lustou", lat: 42.7833, lon: 0.3333, altitude: 2969, massif: "Aure-Louron" },
    { name: "Pic du Port Vieux de Bielsa", lat: 42.75, lon: 0.3333, altitude: 2806, massif: "Aure-Louron" },
    { name: "Pic d'Oo", lat: 42.7528, lon: 0.4639, altitude: 2906, massif: "Aure-Louron" },

    // --- Luchonnais (massif 68) ---
    { name: "Aneto", lat: 42.6314, lon: 0.6566, altitude: 3404, massif: "Luchonnais" },
    { name: "Pic de la Maladeta", lat: 42.6422, lon: 0.6528, altitude: 3308, massif: "Luchonnais" },
    { name: "Pic de Sauvegarde", lat: 42.6622, lon: 0.5228, altitude: 2738, massif: "Luchonnais" },
    { name: "Pic du Portillon", lat: 42.6322, lon: 0.5311, altitude: 2764, massif: "Luchonnais" },
    { name: "Pic des Crabioules", lat: 42.6711, lon: 0.5289, altitude: 3116, massif: "Luchonnais" },
    { name: "Superbagnères", lat: 42.72, lon: 0.56, altitude: 1800, massif: "Luchonnais" },
    { name: "Pic du Céciré", lat: 42.7044, lon: 0.6044, altitude: 2403, massif: "Luchonnais" },
    { name: "Pic de Boum", lat: 42.6900, lon: 0.5872, altitude: 2894, massif: "Luchonnais" },
    { name: "Pic de la Mine", lat: 42.7011, lon: 0.5533, altitude: 2782, massif: "Luchonnais" },

    // --- Couserans (massif 69) ---
    { name: "Mont Valier", lat: 42.7567, lon: 1.0772, altitude: 2838, massif: "Couserans" },
    { name: "Pic de Maubermé", lat: 42.6922, lon: 1.0256, altitude: 2880, massif: "Couserans" },
    { name: "Pic de Barlonguère", lat: 42.7478, lon: 1.1133, altitude: 2809, massif: "Couserans" },
    { name: "Pic des Trois Seigneurs", lat: 42.7606, lon: 1.2189, altitude: 2199, massif: "Couserans" },
    { name: "Col de la Core", lat: 42.85, lon: 1.075, altitude: 1395, massif: "Couserans" },
    { name: "Pic de la Calabasse", lat: 42.7928, lon: 1.1444, altitude: 2206, massif: "Couserans" },

    // --- Haute-Ariège (massif 70) ---
    { name: "Pic de Montcalm", lat: 42.6767, lon: 1.4033, altitude: 3077, massif: "Haute-Ariège" },
    { name: "Pic d'Estats", lat: 42.6644, lon: 1.3994, altitude: 3143, massif: "Haute-Ariège" },
    { name: "Puig Pédrous", lat: 42.5906, lon: 1.4917, altitude: 2914, massif: "Haute-Ariège" },
    { name: "Pic de Port", lat: 42.6833, lon: 1.5333, altitude: 2630, massif: "Haute-Ariège" },
    { name: "Pic du Ruhle", lat: 42.7189, lon: 1.4811, altitude: 2783, massif: "Haute-Ariège" },
    { name: "Pic de Bassibié", lat: 42.7056, lon: 1.4561, altitude: 2704, massif: "Haute-Ariège" },

    // --- Orlu — St-Barthélémy (massif 72) ---
    { name: "Pic de Saint-Barthélémy", lat: 42.7806, lon: 1.9317, altitude: 2348, massif: "Orlu — St-Barthélémy" },
    { name: "Pic du Soularac", lat: 42.7667, lon: 1.9333, altitude: 2368, massif: "Orlu — St-Barthélémy" },
    { name: "Pic de l'Étang Faury", lat: 42.7417, lon: 1.9083, altitude: 2217, massif: "Orlu — St-Barthélémy" },
    { name: "Pic des Paloumères", lat: 42.7183, lon: 1.9439, altitude: 2059, massif: "Orlu — St-Barthélémy" },

    // --- Capcir-Puymorens (massif 73) ---
    { name: "Pic Carlit", lat: 42.5656, lon: 1.9278, altitude: 2921, massif: "Capcir-Puymorens" },
    { name: "Col de Puymorens", lat: 42.5642, lon: 1.8308, altitude: 1915, massif: "Capcir-Puymorens" },
    { name: "Puigmal", lat: 42.3978, lon: 2.0906, altitude: 2913, massif: "Capcir-Puymorens" },
    { name: "Pic del Ginebre", lat: 42.5222, lon: 1.9483, altitude: 2815, massif: "Capcir-Puymorens" },
    { name: "Pic de la Cabaneta", lat: 42.5350, lon: 1.8808, altitude: 2853, massif: "Capcir-Puymorens" },
    { name: "Pic de Campcardos", lat: 42.4689, lon: 1.9928, altitude: 2839, massif: "Capcir-Puymorens" },

    // --- Cerdagne-Canigou (massif 74) ---
    { name: "Canigou", lat: 42.5194, lon: 2.4567, altitude: 2784, massif: "Cerdagne-Canigou" },
    { name: "Pic del Géant", lat: 42.5111, lon: 2.4433, altitude: 2886, massif: "Cerdagne-Canigou" },
    { name: "Pic de la Comète", lat: 42.4667, lon: 2.2833, altitude: 2572, massif: "Cerdagne-Canigou" },
    { name: "Pic de Costabonne", lat: 42.4675, lon: 2.5242, altitude: 2464, massif: "Cerdagne-Canigou" },
    { name: "Pic de Madrès", lat: 42.5697, lon: 2.3478, altitude: 2469, massif: "Cerdagne-Canigou" },
    { name: "Pic de Font-Romeu", lat: 42.5044, lon: 2.0397, altitude: 1850, massif: "Cerdagne-Canigou" },
];

/**
 * Recherche locale dans la base de pics pyrénéens.
 * Insensible à la casse et aux accents.
 * @param {string} query - Texte saisi par l'utilisateur (min 2 caractères)
 * @returns {Array} - Jusqu'à 5 pics correspondants
 */
function searchPeaks(query) {
    if (!query || query.length < 2) return [];
    const normalize = function(str) {
        return str.toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .trim();
    };
    // Retire les articles français pour matcher "Pic du X" contre "Pic de X"
    const stripArticles = function(str) {
        return normalize(str)
            .replace(/\b(du|de|des|le|la|les|au|aux)\b/g, " ")
            .replace(/\b[dl]'/g, " ")
            .replace(/\s+/g, " ")
            .trim();
    };
    const q = normalize(query);
    const qWords = stripArticles(query).split(" ").filter(function(w) { return w.length > 2; });
    return PEAKS_PYRENEES.filter(function(peak) {
        const n = normalize(peak.name);
        const m = normalize(peak.massif);
        // Correspondance directe (substring)
        if (n.includes(q) || m.includes(q)) return true;
        // Correspondance sans articles : tous les mots significatifs de la requête
        // doivent être présents dans le nom du pic (ex: "pic barasse" ↔ "pic de barasse")
        if (qWords.length > 0) {
            const nStripped = stripArticles(peak.name);
            return qWords.every(function(w) { return nStripped.includes(w); });
        }
        return false;
    }).slice(0, 5);
}
