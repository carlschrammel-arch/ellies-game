/**
 * Sports Roster Module
 *
 * Fetches current rosters from MLB Stats API with fallback to cached data.
 * Uses in-memory cache to prevent rate limiting.
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// In-memory cache for roster data
var rosterCache = new Map();
var CACHE_TTL_MS = 30 * 60 * 1000; // 30 minutes
// Fallback rosters for popular teams (updated periodically)
// These are used when API is unavailable - labeled as "not guaranteed current"
var fallbackRosters = {
    'dodgers': [
        { id: 1, name: 'Mookie Betts', firstName: 'Mookie', lastName: 'Betts', position: 'RF' },
        { id: 2, name: 'Freddie Freeman', firstName: 'Freddie', lastName: 'Freeman', position: '1B' },
        { id: 3, name: 'Shohei Ohtani', firstName: 'Shohei', lastName: 'Ohtani', position: 'DH' },
        { id: 4, name: 'Will Smith', firstName: 'Will', lastName: 'Smith', position: 'C' },
        { id: 5, name: 'Teoscar Hernandez', firstName: 'Teoscar', lastName: 'Hernandez', position: 'LF' },
        { id: 6, name: 'Max Muncy', firstName: 'Max', lastName: 'Muncy', position: '3B' },
        { id: 7, name: 'Gavin Lux', firstName: 'Gavin', lastName: 'Lux', position: '2B' },
        { id: 8, name: 'James Outman', firstName: 'James', lastName: 'Outman', position: 'CF' },
        { id: 9, name: 'Miguel Rojas', firstName: 'Miguel', lastName: 'Rojas', position: 'SS' },
        { id: 10, name: 'Tyler Glasnow', firstName: 'Tyler', lastName: 'Glasnow', position: 'SP' },
        { id: 11, name: 'Yoshinobu Yamamoto', firstName: 'Yoshinobu', lastName: 'Yamamoto', position: 'SP' },
        { id: 12, name: 'Clayton Kershaw', firstName: 'Clayton', lastName: 'Kershaw', position: 'SP' },
    ],
    'yankees': [
        { id: 1, name: 'Aaron Judge', firstName: 'Aaron', lastName: 'Judge', position: 'CF' },
        { id: 2, name: 'Juan Soto', firstName: 'Juan', lastName: 'Soto', position: 'RF' },
        { id: 3, name: 'Anthony Rizzo', firstName: 'Anthony', lastName: 'Rizzo', position: '1B' },
        { id: 4, name: 'Gleyber Torres', firstName: 'Gleyber', lastName: 'Torres', position: '2B' },
        { id: 5, name: 'Anthony Volpe', firstName: 'Anthony', lastName: 'Volpe', position: 'SS' },
        { id: 6, name: 'Jazz Chisholm Jr.', firstName: 'Jazz', lastName: 'Chisholm Jr.', position: '3B' },
        { id: 7, name: 'Austin Wells', firstName: 'Austin', lastName: 'Wells', position: 'C' },
        { id: 8, name: 'Giancarlo Stanton', firstName: 'Giancarlo', lastName: 'Stanton', position: 'DH' },
        { id: 9, name: 'Gerrit Cole', firstName: 'Gerrit', lastName: 'Cole', position: 'SP' },
        { id: 10, name: 'Carlos Rodon', firstName: 'Carlos', lastName: 'Rodon', position: 'SP' },
    ],
    'red-sox': [
        { id: 1, name: 'Rafael Devers', firstName: 'Rafael', lastName: 'Devers', position: '3B' },
        { id: 2, name: 'Trevor Story', firstName: 'Trevor', lastName: 'Story', position: 'SS' },
        { id: 3, name: 'Masataka Yoshida', firstName: 'Masataka', lastName: 'Yoshida', position: 'LF' },
        { id: 4, name: 'Jarren Duran', firstName: 'Jarren', lastName: 'Duran', position: 'CF' },
        { id: 5, name: 'Connor Wong', firstName: 'Connor', lastName: 'Wong', position: 'C' },
        { id: 6, name: 'Tyler ONeill', firstName: 'Tyler', lastName: 'ONeill', position: 'RF' },
        { id: 7, name: 'Triston Casas', firstName: 'Triston', lastName: 'Casas', position: '1B' },
        { id: 8, name: 'Brayan Bello', firstName: 'Brayan', lastName: 'Bello', position: 'SP' },
        { id: 9, name: 'Tanner Houck', firstName: 'Tanner', lastName: 'Houck', position: 'SP' },
    ],
    'cubs': [
        { id: 1, name: 'Dansby Swanson', firstName: 'Dansby', lastName: 'Swanson', position: 'SS' },
        { id: 2, name: 'Nico Hoerner', firstName: 'Nico', lastName: 'Hoerner', position: '2B' },
        { id: 3, name: 'Ian Happ', firstName: 'Ian', lastName: 'Happ', position: 'LF' },
        { id: 4, name: 'Cody Bellinger', firstName: 'Cody', lastName: 'Bellinger', position: 'CF' },
        { id: 5, name: 'Seiya Suzuki', firstName: 'Seiya', lastName: 'Suzuki', position: 'RF' },
        { id: 6, name: 'Christopher Morel', firstName: 'Christopher', lastName: 'Morel', position: '3B' },
        { id: 7, name: 'Yan Gomes', firstName: 'Yan', lastName: 'Gomes', position: 'C' },
        { id: 8, name: 'Justin Steele', firstName: 'Justin', lastName: 'Steele', position: 'SP' },
    ],
    'braves': [
        { id: 1, name: 'Ronald Acuna Jr.', firstName: 'Ronald', lastName: 'Acuna Jr.', position: 'RF' },
        { id: 2, name: 'Ozzie Albies', firstName: 'Ozzie', lastName: 'Albies', position: '2B' },
        { id: 3, name: 'Austin Riley', firstName: 'Austin', lastName: 'Riley', position: '3B' },
        { id: 4, name: 'Matt Olson', firstName: 'Matt', lastName: 'Olson', position: '1B' },
        { id: 5, name: 'Michael Harris II', firstName: 'Michael', lastName: 'Harris II', position: 'CF' },
        { id: 6, name: 'Marcell Ozuna', firstName: 'Marcell', lastName: 'Ozuna', position: 'DH' },
        { id: 7, name: 'Travis dArnaud', firstName: 'Travis', lastName: 'dArnaud', position: 'C' },
        { id: 8, name: 'Spencer Strider', firstName: 'Spencer', lastName: 'Strider', position: 'SP' },
        { id: 9, name: 'Max Fried', firstName: 'Max', lastName: 'Fried', position: 'SP' },
    ],
    'phillies': [
        { id: 1, name: 'Bryce Harper', firstName: 'Bryce', lastName: 'Harper', position: '1B' },
        { id: 2, name: 'Trea Turner', firstName: 'Trea', lastName: 'Turner', position: 'SS' },
        { id: 3, name: 'Kyle Schwarber', firstName: 'Kyle', lastName: 'Schwarber', position: 'LF' },
        { id: 4, name: 'JT Realmuto', firstName: 'JT', lastName: 'Realmuto', position: 'C' },
        { id: 5, name: 'Nick Castellanos', firstName: 'Nick', lastName: 'Castellanos', position: 'RF' },
        { id: 6, name: 'Alec Bohm', firstName: 'Alec', lastName: 'Bohm', position: '3B' },
        { id: 7, name: 'Bryson Stott', firstName: 'Bryson', lastName: 'Stott', position: '2B' },
        { id: 8, name: 'Zack Wheeler', firstName: 'Zack', lastName: 'Wheeler', position: 'SP' },
        { id: 9, name: 'Aaron Nola', firstName: 'Aaron', lastName: 'Nola', position: 'SP' },
    ],
    'astros': [
        { id: 1, name: 'Jose Altuve', firstName: 'Jose', lastName: 'Altuve', position: '2B' },
        { id: 2, name: 'Yordan Alvarez', firstName: 'Yordan', lastName: 'Alvarez', position: 'DH' },
        { id: 3, name: 'Alex Bregman', firstName: 'Alex', lastName: 'Bregman', position: '3B' },
        { id: 4, name: 'Kyle Tucker', firstName: 'Kyle', lastName: 'Tucker', position: 'RF' },
        { id: 5, name: 'Jeremy Pena', firstName: 'Jeremy', lastName: 'Pena', position: 'SS' },
        { id: 6, name: 'Yainer Diaz', firstName: 'Yainer', lastName: 'Diaz', position: 'C' },
        { id: 7, name: 'Framber Valdez', firstName: 'Framber', lastName: 'Valdez', position: 'SP' },
        { id: 8, name: 'Justin Verlander', firstName: 'Justin', lastName: 'Verlander', position: 'SP' },
    ],
    'padres': [
        { id: 1, name: 'Fernando Tatis Jr.', firstName: 'Fernando', lastName: 'Tatis Jr.', position: 'RF' },
        { id: 2, name: 'Manny Machado', firstName: 'Manny', lastName: 'Machado', position: '3B' },
        { id: 3, name: 'Xander Bogaerts', firstName: 'Xander', lastName: 'Bogaerts', position: 'SS' },
        { id: 4, name: 'Jake Cronenworth', firstName: 'Jake', lastName: 'Cronenworth', position: '1B' },
        { id: 5, name: 'Ha-Seong Kim', firstName: 'Ha-Seong', lastName: 'Kim', position: '2B' },
        { id: 6, name: 'Jurickson Profar', firstName: 'Jurickson', lastName: 'Profar', position: 'LF' },
        { id: 7, name: 'Kyle Higashioka', firstName: 'Kyle', lastName: 'Higashioka', position: 'C' },
        { id: 8, name: 'Yu Darvish', firstName: 'Yu', lastName: 'Darvish', position: 'SP' },
        { id: 9, name: 'Joe Musgrove', firstName: 'Joe', lastName: 'Musgrove', position: 'SP' },
    ],
    'mets': [
        { id: 1, name: 'Francisco Lindor', firstName: 'Francisco', lastName: 'Lindor', position: 'SS' },
        { id: 2, name: 'Pete Alonso', firstName: 'Pete', lastName: 'Alonso', position: '1B' },
        { id: 3, name: 'Brandon Nimmo', firstName: 'Brandon', lastName: 'Nimmo', position: 'CF' },
        { id: 4, name: 'Jeff McNeil', firstName: 'Jeff', lastName: 'McNeil', position: '2B' },
        { id: 5, name: 'Starling Marte', firstName: 'Starling', lastName: 'Marte', position: 'RF' },
        { id: 6, name: 'Mark Vientos', firstName: 'Mark', lastName: 'Vientos', position: '3B' },
        { id: 7, name: 'Francisco Alvarez', firstName: 'Francisco', lastName: 'Alvarez', position: 'C' },
        { id: 8, name: 'Kodai Senga', firstName: 'Kodai', lastName: 'Senga', position: 'SP' },
    ],
    'giants': [
        { id: 1, name: 'Matt Chapman', firstName: 'Matt', lastName: 'Chapman', position: '3B' },
        { id: 2, name: 'Jung Hoo Lee', firstName: 'Jung Hoo', lastName: 'Lee', position: 'CF' },
        { id: 3, name: 'Michael Conforto', firstName: 'Michael', lastName: 'Conforto', position: 'RF' },
        { id: 4, name: 'Wilmer Flores', firstName: 'Wilmer', lastName: 'Flores', position: '1B' },
        { id: 5, name: 'Jorge Soler', firstName: 'Jorge', lastName: 'Soler', position: 'DH' },
        { id: 6, name: 'Thairo Estrada', firstName: 'Thairo', lastName: 'Estrada', position: '2B' },
        { id: 7, name: 'Tyler Fitzgerald', firstName: 'Tyler', lastName: 'Fitzgerald', position: 'SS' },
        { id: 8, name: 'Logan Webb', firstName: 'Logan', lastName: 'Webb', position: 'SP' },
        { id: 9, name: 'Blake Snell', firstName: 'Blake', lastName: 'Snell', position: 'SP' },
    ],
};
// Position full names for explanations
export var positionNames = {
    'P': 'Pitcher',
    'SP': 'Starting Pitcher',
    'RP': 'Relief Pitcher',
    'C': 'Catcher',
    '1B': 'First Baseman',
    '2B': 'Second Baseman',
    '3B': 'Third Baseman',
    'SS': 'Shortstop',
    'LF': 'Left Fielder',
    'CF': 'Center Fielder',
    'RF': 'Right Fielder',
    'OF': 'Outfielder',
    'DH': 'Designated Hitter',
    'IF': 'Infielder',
    'UT': 'Utility Player',
};
/**
 * Fetch roster from MLB Stats API
 */
function fetchMLBRoster(teamId) {
    return __awaiter(this, void 0, void 0, function () {
        var url, response, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = "https://statsapi.mlb.com/api/v1/teams/".concat(teamId, "/roster/active");
                    return [4 /*yield*/, fetch(url)];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("MLB API error: ".concat(response.status));
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    if (!data.roster || !Array.isArray(data.roster)) {
                        throw new Error('Invalid roster data');
                    }
                    return [2 /*return*/, data.roster.map(function (p) { return ({
                            id: p.person.id,
                            name: p.person.fullName,
                            firstName: p.person.firstName || p.person.fullName.split(' ')[0],
                            lastName: p.person.lastName || p.person.fullName.split(' ').slice(1).join(' '),
                            position: p.position.abbreviation,
                            jerseyNumber: p.jerseyNumber,
                        }); })];
            }
        });
    });
}
/**
 * Get roster for a team (with caching and fallback)
 */
export function getRoster(team) {
    return __awaiter(this, void 0, void 0, function () {
        var cacheKey, cached, players, response, error_1, fallbackPlayers, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    cacheKey = team.slug;
                    cached = rosterCache.get(cacheKey);
                    if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
                        return [2 /*return*/, __assign(__assign({}, cached.data), { cached: true })];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, fetchMLBRoster(team.id)];
                case 2:
                    players = _a.sent();
                    response = {
                        team: team,
                        players: players,
                        source: 'api',
                        cached: false,
                    };
                    // Cache the result
                    rosterCache.set(cacheKey, { data: response, timestamp: Date.now() });
                    return [2 /*return*/, response];
                case 3:
                    error_1 = _a.sent();
                    console.warn("[Roster] API fetch failed for ".concat(team.name, ", using fallback:"), error_1);
                    fallbackPlayers = fallbackRosters[team.slug] || [];
                    response = {
                        team: team,
                        players: fallbackPlayers,
                        source: 'fallback',
                        cached: false,
                    };
                    // Still cache the fallback (shorter TTL)
                    rosterCache.set(cacheKey, { data: response, timestamp: Date.now() - CACHE_TTL_MS / 2 });
                    return [2 /*return*/, response];
                case 4: return [2 /*return*/];
            }
        });
    });
}
/**
 * Clear the roster cache
 */
export function clearRosterCache() {
    rosterCache.clear();
}
/**
 * Generate team-themed items for cards (stadium, mascot, gear, etc.)
 */
export function getTeamThemedItems(team) {
    return [
        "".concat(team.name, " jersey"),
        "".concat(team.name, " cap"),
        "".concat(team.stadium, " stadium"),
        "".concat(team.name, " logo"),
        "".concat(team.name, " banner"),
        "".concat(team.city, " baseball"),
        "".concat(team.name, " foam finger"),
        "".concat(team.name, " pennant"),
        team.mascot ? "".concat(team.mascot, " mascot") : "".concat(team.name, " mascot"),
    ];
}
