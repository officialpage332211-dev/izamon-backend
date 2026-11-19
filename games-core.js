// games-core.js — те же головоломки дня, что на сайте (izamon-games.js «Сканворди рӯз», izamon-sudoku.js «Судоку»).
// Сервер строит их сам по дате и проверяет присланное решение — так монеты нельзя получить без решения.
// ВАЖНО: код ниже скопирован с сайта без изменений (тест test_games_core сверяет головоломки сайта и сервера).
'use strict';
const SCAN = (function () {
    var WORDS = [
        ['ДУШАНБЕ', 'Пойтахти Тоҷикистон'], ['ХУҶАНД', 'Маркази вилояти Суғд'], ['БОХТАР', 'Маркази вилояти Хатлон'],
        ['ХОРУҒ', 'Маркази Вилояти Мухтори Кӯҳистони Бадахшон'], ['ВАХШ', 'Дарёе, ки НБО‑и Норак дар он сохта шудааст'],
        ['ЗАРАФШОН', 'Дарёе, ки аз назди Панҷакент мегузарад'], ['ПОМИР', '«Боми ҷаҳон»'], ['ВАРЗОБ', 'Дарё ва водии шимоли Душанбе'],
        ['КӮЛОБ', 'Шаҳри қадимаи вилояти Хатлон'], ['ҲИСОР', 'Шаҳре, ки қалъаи қадимааш машҳур аст'], ['ИСТАРАВШАН', 'Шаҳри қадимаи вилояти Суғд'],
        ['ПАНҶАКЕНТ', 'Шаҳре, ки Саразми қадима дар наздикии он аст'], ['НОРАК', 'Шаҳре, ки бо НБО‑и худ машҳур аст'],
        ['РӮДАКӢ', 'Одамушшуарои адабиёти форсу тоҷик'], ['ФИРДАВСӢ', 'Муаллифи «Шоҳнома»'], ['САЪДӢ', 'Муаллифи «Гулистон» ва «Бӯстон»'],
        ['ҶОМӢ', 'Муаллифи «Баҳористон»'], ['АЙНӢ', 'Садриддин ..., асосгузори адабиёти навини тоҷик'], ['СОМОНӢ', 'Пули миллии Тоҷикистон'],
        ['ДИРАМ', 'Яксадяки сомонӣ'], ['РАМАЗОН', 'Моҳи рӯза'], ['НАМОЗ', 'Ибодате, ки дар як шабонарӯз панҷ бор адо мешавад'],
        ['ЗАКОТ', 'Садақаи фарз аз молу дороӣ'], ['МАККА', 'Шаҳре, ки Каъба дар он ҷойгир аст'], ['ҚУРЪОН', 'Китоби муқаддаси мусулмонон'],
        ['МАСҶИД', 'Ҷойи намозгузории мусулмонон'], ['АЗОН', 'Даъват ба намоз'], ['ТАҲОРАТ', 'Шустушӯи пеш аз намоз'],
        ['ИФТОР', 'Хӯроки шом, ки бо он рӯзаро мекушоянд'], ['САҲАРӢ', 'Хӯроки пеш аз субҳ дар моҳи рамазон'],
        ['НОН', 'Онро дар танӯр мепазанд ва ба дастархон аввал мегузоранд'], ['ПАЛАВ', 'Таоми миллӣ аз биринҷ, гӯшт ва сабзӣ'],
        ['ТАНӮР', 'Дегдони гилин барои пухтани нон'], ['САМБӮСА', 'Хамири секунҷаи пур аз гӯшт, ки дар танӯр мепазанд'],
        ['ҚУРУТ', 'Тӯбчаҳои шӯр, ки аз чакка тайёр мекунанд'], ['ЧОЙ', 'Нӯшокии гарм, ки дар чойник дам мекунанд'],
        ['ЧОЙХОНА', 'Ҷое, ки мардум чой менӯшанд ва дам мегиранд'], ['ДАСТАРХОН', 'Суфрае, ки ба он нону хӯрок мегузоранд'],
        ['ТОҚӢ', 'Кулоҳи миллии тоҷикон'], ['АНОР', 'Меваи сурх бо донаҳои бисёр'], ['ЗАРДОЛУ', 'Мевае, ки қоқи онро ҳам мехӯранд; ӯрик'],
        ['ТАРБУЗ', 'Полизии калони сабз, ки дарунаш сурх аст'], ['ХАРБУЗА', 'Полизии ширини хушбӯй'], ['ГИЛОС', 'Меваи хурди сурхи данакдор'],
        ['ТУТ', 'Дарахте, ки баргашро кирми абрешим мехӯрад'], ['АНГУР', 'Мевае, ки аз он мавиз тайёр мекунанд'], ['МАВИЗ', 'Ангури хушк'],
        ['СЕБ', 'Меваи маъмули сурх, зард ё сабз'], ['ПАХТА', '«Тиллои сафед»'], ['ГАНДУМ', 'Ғаллае, ки аз орди он нон мепазанд'],
        ['БИРИНҶ', 'Ғаллае, ки асоси палав аст'], ['САБЗӢ', 'Решамеваи норанҷӣ, ки ба палав меандозанд'], ['ПИЁЗ', 'Сабзавоти тунд, ки чашмро об мекунад'],
        ['КАРТОШКА', 'Сабзавоте, ки онро «нони дуюм» меноманд'], ['АСП', 'Ҳайвони савории тезрав'], ['ШЕР', 'Подшоҳи ҳайвонот'],
        ['ГОВ', 'Ҳайвони хонагӣ, ки шир медиҳад'], ['ГӮСФАНД', 'Ҳайвони хонагӣ, ки аз пашмаш ришта мересанд'], ['ШУТУР', '«Киштии биёбон»'],
        ['УҚОБ', 'Паррандаи даррандаи калон'], ['БУЛБУЛ', 'Паррандаи хушовоз'], ['КАБК', 'Паррандаи кӯҳӣ'], ['ЗАНБӮР', 'Ҳашарае, ки асал медиҳад'],
        ['АСАЛ', 'Маҳсули ширини занбӯр'], ['МОҲӢ', 'Ҳайвоне, ки дар об зиндагӣ мекунад ва бо болча шино мекунад'], ['ХАРГӮШ', 'Ҳайвони гӯшдароз'],
        ['ГУРГ', 'Ҳайвони ваҳшӣ, ки ба рама ҳуҷум мекунад'], ['КӮҲ', 'Баландии калони замин'], ['ДАРЁ', 'Оби равони калон'],
        ['КӮЛ', 'Оби истодаи калон дар хушкӣ'], ['БАРФ', 'Боридании сафеди зимистон'], ['БОРОН', 'Қатраҳои об, ки аз абр меборанд'],
        ['ОФТОБ', 'Ситорае, ки ба Замин наздиктарин аст'], ['МОҲ', 'Ҳамсафари табиии Замин'], ['ШАМОЛ', 'Ҳаракати ҳаво'],
        ['ЧИНОР', 'Дарахти бузурги сояафкан, ки садсолаҳо умр мебинад'], ['БАҲОР', 'Фасле, ки пас аз зимистон меояд'],
        ['ТИРАМОҲ', 'Фасли баргрез'], ['ЗИМИСТОН', 'Фасли сармо ва барф'], ['ТОБИСТОН', 'Фасли гармтарини сол'],
        ['ТИРЕЗА', 'Аз он рӯшноӣ ба хона медарояд'], ['КАЛИД', 'Бо он қулфро мекушоянд'], ['КИТОБ', 'Онро мехонанд; дар китобхона нигоҳ медоранд'],
        ['ҚАЛАМ', 'Олати навиштан'], ['ДАФТАР', 'Варақҳои дӯхташуда барои навиштан'], ['МАКТАБ', 'Ҷое, ки кӯдакон дарс мехонанд'],
        ['МУАЛЛИМ', 'Касе, ки дарс медиҳад'], ['ДУХТУР', 'Касе, ки беморонро табобат мекунад'], ['СОАТ', 'Асбоби вақтнамо'],
        ['ОИЛА', 'Падару модар ва фарзандон'], ['МОДАР', 'Ҷаннат зери пои ӯст'], ['БОБО', 'Падари падар ё модар'],
        ['ТОҒО', 'Бародари модар'], ['ХОЛА', 'Хоҳари модар'], ['АММА', 'Хоҳари падар'], ['АМАК', 'Бародари падар'],
        ['НАБЕРА', 'Фарзанди фарзанд'], ['ДОМОД', 'Шавҳари духтар'], ['МЕҲМОН', 'Касе, ки ба хонаи дигарон ба дидан меояд'],
        ['ДЕҲҚОН', 'Касе, ки замин кишт мекунад'], ['НОНВОЙ', 'Касе, ки нон мепазад'], ['ОҲАНГАР', 'Устое, ки оҳанро кор мекунад'],
        ['ДУРЕДГАР', 'Устои чӯбкор'], ['РОНАНДА', 'Касе, ки мошин меронад'], ['ЧӮПОН', 'Касе, ки рамаро мечаронад'],
        ['ҚАТОРА', 'Нақлиёте, ки дар роҳи оҳан ҳаракат мекунад'], ['ҲАВОПАЙМО', 'Мошини парвозкунанда'], ['БОЗОР', 'Ҷое, ки молу маҳсулот мефурӯшанд'],
        ['САБР', 'Тоқат дар душворӣ'], ['ДУО', 'Илтиҷо ва хоҳиш аз Худованд'], ['САЛОМ', 'Аввалин калимаи вохӯрӣ']
    ];
    var KEYS = 'А Б В Г Ғ Д Е Ё Ж З И Ӣ Й К Қ Л М Н О П Р С Т У Ӯ Ф Х Ҳ Ч Ҷ Ш Ъ Э Ю Я'.split(' ');
    function rng(seed) { return function () { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 4294967296; }; }
    function hash(s) { var h = 2166136261; for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619) >>> 0; } return h; }
    function build(date) {
        // редкий неудачный набор (мало пересечений) — пробуем другой порядок слов того же дня
        var best = null;
        for (var salt = 0; salt < 6; salt++) {
            var P = buildOnce(date, salt);
            if (!best || P.words.length > best.words.length) best = P;
            if (P.words.length >= 7) break;
        }
        return best;
    }
    function buildOnce(date, salt) {
        var rnd = rng(hash('izScan:' + date + (salt ? ':' + salt : '')));
        var list = WORDS.slice();
        for (var i = list.length - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)); var x = list[i]; list[i] = list[j]; list[j] = x; }
        var cells = {}, dirs = {}, placed = [], MAXW = 11, TARGET = 8;
        function at(r, c) { return cells[r + ',' + c]; }
        function bbox(extra) {
            var r0 = 1e9, r1 = -1e9, c0 = 1e9, c1 = -1e9;
            Object.keys(cells).concat(extra || []).forEach(function (k) { var p = k.split(','), r = +p[0], c = +p[1]; r0 = Math.min(r0, r); r1 = Math.max(r1, r); c0 = Math.min(c0, c); c1 = Math.max(c1, c); });
            return { r0: r0, r1: r1, c0: c0, c1: c1 };
        }
        function fit(w, r, c, d) {
            var L = w.length, cross = 0, keys = [];
            var br = r - (d ? 1 : 0), bc = c - (d ? 0 : 1), ar = r + (d ? L : 0), ac = c + (d ? 0 : L);
            if (at(br, bc) || at(ar, ac)) return -1;
            for (var i = 0; i < L; i++) {
                var rr = r + (d ? i : 0), cc = c + (d ? 0 : i), k = rr + ',' + cc, ch = cells[k];
                if (ch) { if (ch !== w[i] || (dirs[k] & (d ? 2 : 1))) return -1; cross++; }
                else if (d ? (at(rr, cc - 1) || at(rr, cc + 1)) : (at(rr - 1, cc) || at(rr + 1, cc))) return -1;
                keys.push(k);
            }
            if (placed.length && !cross) return -1;
            var b = bbox(keys);
            if (b.r1 - b.r0 + 1 > MAXW || b.c1 - b.c0 + 1 > MAXW) return -1;
            return cross;
        }
        function put(w, clue, r, c, d) {
            for (var i = 0; i < w.length; i++) { var k = (r + (d ? i : 0)) + ',' + (c + (d ? 0 : i)); cells[k] = w[i]; dirs[k] = (dirs[k] || 0) | (d ? 2 : 1); }
            placed.push({ w: w, clue: clue, r: r, c: c, d: d });
        }
        var first = -1;
        for (i = 0; i < list.length; i++) if (Array.from(list[i][0]).length >= 5 && Array.from(list[i][0]).length <= 8) { first = i; break; }
        if (first < 0) first = 0;
        put(Array.from(list[first][0]), list[first][1], 0, 0, 0);
        var used = {}; used[first] = 1;
        for (var pass = 0; pass < 3 && placed.length < TARGET; pass++) for (i = 0; i < list.length && placed.length < TARGET; i++) {
            if (used[i]) continue;
            var w = Array.from(list[i][0]), best = null;
            if (w.length < 3 || w.length > MAXW) continue;
            Object.keys(cells).forEach(function (k) {
                var p = k.split(','), r = +p[0], c = +p[1], d = (dirs[k] & 1) ? 1 : 0;
                if (dirs[k] === 3) return;
                for (var j = 0; j < w.length; j++) {
                    if (w[j] !== cells[k]) continue;
                    var sr = d ? r - j : r, sc = d ? c : c - j, s = fit(w, sr, sc, d);
                    if (s > 0 && (!best || s > best.s || (s === best.s && rnd() < 0.5))) best = { s: s, r: sr, c: sc, d: d };
                }
            });
            if (best) { put(w, list[i][1], best.r, best.c, best.d); used[i] = 1; }
        }
        var b = bbox();
        placed.forEach(function (p) { p.r -= b.r0; p.c -= b.c0; });
        placed.sort(function (a, z) { return a.r - z.r || a.c - z.c; });
        var num = {}, n = 0;
        placed.forEach(function (p) { var k = p.r + ',' + p.c; if (!num[k]) num[k] = ++n; p.n = num[k]; });
        var grid = {};
        placed.forEach(function (p, wi) {
            for (var i = 0; i < p.w.length; i++) {
                var k = (p.r + (p.d ? i : 0)) + ',' + (p.c + (p.d ? 0 : i));
                grid[k] = grid[k] || { ch: p.w[i], words: [] };
                grid[k].words.push(wi);
            }
        });
        return { rows: b.r1 - b.r0 + 1, cols: b.c1 - b.c0 + 1, words: placed, grid: grid, num: num };
    }

    return { build: build, WORDS: WORDS, KEYS: KEYS };
})();
const SUDOKU = (function () {
    var CLUES = [40, 32, 27], PRIZE = [5, 10, 15];
    function rng(seed) { return function () { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 4294967296; }; }
    function hash(s) { var h = 2166136261; for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619) >>> 0; } return h; }
    function ok(g, i, v) {
        var r = Math.floor(i / 9), c = i % 9, br = r - r % 3, bc = c - c % 3;
        for (var k = 0; k < 9; k++) {
            if (g[r * 9 + k] === v || g[k * 9 + c] === v) return false;
            if (g[(br + Math.floor(k / 3)) * 9 + bc + k % 3] === v) return false;
        }
        return true;
    }
    function fill(g, rnd) {
        var i = g.indexOf(0);
        if (i < 0) return true;
        var ds = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        for (var a = 8; a > 0; a--) { var b = Math.floor(rnd() * (a + 1)); var x = ds[a]; ds[a] = ds[b]; ds[b] = x; }
        for (var k = 0; k < 9; k++) { if (ok(g, i, ds[k])) { g[i] = ds[k]; if (fill(g, rnd)) return true; g[i] = 0; } }
        return false;
    }
    function count(g, limit) { // число решений, не больше limit
        var best = -1, bestN = 10;
        for (var i = 0; i < 81; i++) if (!g[i]) {
            var n = 0; for (var v = 1; v <= 9; v++) if (ok(g, i, v)) n++;
            if (n < bestN) { bestN = n; best = i; if (n <= 1) break; }
        }
        if (best < 0) return 1;
        var total = 0;
        for (v = 1; v <= 9 && total < limit; v++) if (ok(g, best, v)) { g[best] = v; total += count(g, limit - total); g[best] = 0; }
        return total;
    }
    function build(date, level) {
        var rnd = rng(hash('izSudoku:' + date + ':' + level));
        var sol = []; for (var i = 0; i < 81; i++) sol.push(0);
        fill(sol, rnd);
        var puz = sol.slice(), order = [];
        for (i = 0; i < 81; i++) order.push(i);
        for (var a = 80; a > 0; a--) { var b = Math.floor(rnd() * (a + 1)); var x = order[a]; order[a] = order[b]; order[b] = x; }
        var left = 81;
        for (i = 0; i < 81 && left > CLUES[level]; i++) {
            var p = order[i], keep = puz[p];
            puz[p] = 0;
            if (count(puz.slice(), 2) !== 1) puz[p] = keep; else left--;
        }
        return { sol: sol, puz: puz };
    }

    return { build: build, CLUES: CLUES, PRIZE: PRIZE };
})();
module.exports = { SCAN, SUDOKU };
