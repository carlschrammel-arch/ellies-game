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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
var app = express();
var PORT = process.env.PORT || 3001;
// Middleware
app.use(express.json());
// CORS for development
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
// Placeholder images - kid-safe stock images
var placeholderImages = [
    { url: '/placeholders/nature-1.jpg', alt: 'Beautiful nature scene', credit: 'Placeholder' },
    { url: '/placeholders/nature-2.jpg', alt: 'Forest with sunlight', credit: 'Placeholder' },
    { url: '/placeholders/nature-3.jpg', alt: 'Mountain landscape', credit: 'Placeholder' },
    { url: '/placeholders/animal-1.jpg', alt: 'Cute animal', credit: 'Placeholder' },
    { url: '/placeholders/animal-2.jpg', alt: 'Friendly pet', credit: 'Placeholder' },
    { url: '/placeholders/animal-3.jpg', alt: 'Wildlife scene', credit: 'Placeholder' },
    { url: '/placeholders/food-1.jpg', alt: 'Delicious food', credit: 'Placeholder' },
    { url: '/placeholders/food-2.jpg', alt: 'Tasty treats', credit: 'Placeholder' },
    { url: '/placeholders/food-3.jpg', alt: 'Yummy snack', credit: 'Placeholder' },
    { url: '/placeholders/sports-1.jpg', alt: 'Sports activity', credit: 'Placeholder' },
    { url: '/placeholders/sports-2.jpg', alt: 'Fun game', credit: 'Placeholder' },
    { url: '/placeholders/art-1.jpg', alt: 'Colorful art', credit: 'Placeholder' },
    { url: '/placeholders/art-2.jpg', alt: 'Creative artwork', credit: 'Placeholder' },
    { url: '/placeholders/music-1.jpg', alt: 'Musical instruments', credit: 'Placeholder' },
    { url: '/placeholders/science-1.jpg', alt: 'Science experiment', credit: 'Placeholder' },
    { url: '/placeholders/space-1.jpg', alt: 'Space and stars', credit: 'Placeholder' },
    { url: '/placeholders/ocean-1.jpg', alt: 'Ocean waves', credit: 'Placeholder' },
    { url: '/placeholders/adventure-1.jpg', alt: 'Adventure scene', credit: 'Placeholder' },
    { url: '/placeholders/rainbow-1.jpg', alt: 'Rainbow colors', credit: 'Placeholder' },
    { url: '/placeholders/garden-1.jpg', alt: 'Beautiful garden', credit: 'Placeholder' },
];
// Adult content denylist for filtering Unsplash results
var contentDenylist = [
    'adult', 'sexy', 'nude', 'naked', 'erotic', 'sensual', 'lingerie',
    'bikini', 'underwear', 'beer', 'wine', 'alcohol', 'drunk', 'smoking',
    'cigarette', 'violence', 'blood', 'gore', 'weapon', 'gun', 'knife',
    'scary', 'horror', 'death', 'kill', 'drug', 'marijuana', 'cannabis',
];
// Check if content is safe
function isContentSafe(text) {
    var lower = text.toLowerCase();
    return !contentDenylist.some(function (word) { return lower.includes(word); });
}
// Seeded random for consistent results per query
function seededRandom(seed) {
    var hash = 0;
    for (var i = 0; i < seed.length; i++) {
        var char = seed.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return function () {
        hash = (hash * 1103515245 + 12345) & 0x7fffffff;
        return hash / 0x7fffffff;
    };
}
// Get images from Unsplash API
function getUnsplashImages(query) {
    return __awaiter(this, void 0, void 0, function () {
        var accessKey, response, data, images, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    accessKey = process.env.UNSPLASH_ACCESS_KEY;
                    if (!accessKey) {
                        return [2 /*return*/, []];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch("https://api.unsplash.com/search/photos?query=".concat(encodeURIComponent(query), "&per_page=10&content_filter=high&orientation=squarish"), {
                            headers: {
                                Authorization: "Client-ID ".concat(accessKey),
                            },
                        })];
                case 2:
                    response = _a.sent();
                    if (!response.ok) {
                        console.error('Unsplash API error:', response.status);
                        return [2 /*return*/, []];
                    }
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    images = data.results
                        .filter(function (photo) {
                        var desc = "".concat(photo.description || '', " ").concat(photo.alt_description || '');
                        return isContentSafe(desc);
                    })
                        .map(function (photo) { return ({
                        url: photo.urls.regular,
                        alt: photo.alt_description || query,
                        credit: "Photo by ".concat(photo.user.name, " on Unsplash"),
                    }); });
                    return [2 /*return*/, images];
                case 4:
                    error_1 = _a.sent();
                    console.error('Unsplash fetch error:', error_1);
                    return [2 /*return*/, []];
                case 5: return [2 /*return*/];
            }
        });
    });
}
// Get placeholder images based on query
function getPlaceholderImages(query, count) {
    if (count === void 0) { count = 5; }
    var random = seededRandom(query);
    var shuffled = __spreadArray([], placeholderImages, true).sort(function () { return random() - 0.5; });
    return shuffled.slice(0, count).map(function (img) { return (__assign(__assign({}, img), { alt: "".concat(query, " - ").concat(img.alt) })); });
}
// API endpoint: GET /api/images?q=<term>
app.get('/api/images', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var query, images;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = req.query.q;
                if (!query || typeof query !== 'string') {
                    res.status(400).json({ error: 'Query parameter "q" is required' });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, getUnsplashImages(query)];
            case 1:
                images = _a.sent();
                // Fall back to placeholders if no Unsplash results
                if (images.length === 0) {
                    images = getPlaceholderImages(query);
                }
                res.json({ images: images });
                return [2 /*return*/];
        }
    });
}); });
// Health check
app.get('/api/health', function (_req, res) {
    res.json({ status: 'ok', unsplash: !!process.env.UNSPLASH_ACCESS_KEY });
});
// Start server
app.listen(PORT, function () {
    console.log("\uD83D\uDE80 Server running on http://localhost:".concat(PORT));
    console.log("\uD83D\uDCF7 Unsplash API: ".concat(process.env.UNSPLASH_ACCESS_KEY ? 'Enabled' : 'Using placeholders'));
});
export default app;
