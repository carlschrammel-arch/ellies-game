import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { resolveTeam, detectSportsTeamQuery } from './teamResolver.js';
import { getRoster, getTeamThemedItems, positionNames } from './rosterService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());

// CORS for development
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Placeholder images - kid-safe stock images
const placeholderImages = [
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
const contentDenylist = [
  'adult', 'sexy', 'nude', 'naked', 'erotic', 'sensual', 'lingerie',
  'bikini', 'underwear', 'beer', 'wine', 'alcohol', 'drunk', 'smoking',
  'cigarette', 'violence', 'blood', 'gore', 'weapon', 'gun', 'knife',
  'scary', 'horror', 'death', 'kill', 'drug', 'marijuana', 'cannabis',
];

// Check if content is safe
function isContentSafe(text: string): boolean {
  const lower = text.toLowerCase();
  return !contentDenylist.some((word) => lower.includes(word));
}

// Seeded random for consistent results per query
function seededRandom(seed: string): () => number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return function() {
    hash = (hash * 1103515245 + 12345) & 0x7fffffff;
    return hash / 0x7fffffff;
  };
}

// Get images from Unsplash API
async function getUnsplashImages(query: string): Promise<Array<{ url: string; alt: string; credit: string }>> {
  const accessKey = process.env.UNSPLASH_ACCESS_KEY;
  
  if (!accessKey) {
    return [];
  }
  
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=10&content_filter=high&orientation=squarish`,
      {
        headers: {
          Authorization: `Client-ID ${accessKey}`,
        },
      }
    );
    
    if (!response.ok) {
      console.error('Unsplash API error:', response.status);
      return [];
    }
    
    const data = await response.json();
    
    // Filter and map results
    const images = data.results
      .filter((photo: { description?: string; alt_description?: string }) => {
        const desc = `${photo.description || ''} ${photo.alt_description || ''}`;
        return isContentSafe(desc);
      })
      .map((photo: { urls: { regular: string }; alt_description?: string; user: { name: string } }) => ({
        url: photo.urls.regular,
        alt: photo.alt_description || query,
        credit: `Photo by ${photo.user.name} on Unsplash`,
      }));
    
    return images;
  } catch (error) {
    console.error('Unsplash fetch error:', error);
    return [];
  }
}

// Get placeholder images based on query
function getPlaceholderImages(query: string, count: number = 5): Array<{ url: string; alt: string; credit: string }> {
  const random = seededRandom(query);
  const shuffled = [...placeholderImages].sort(() => random() - 0.5);
  
  return shuffled.slice(0, count).map((img) => ({
    ...img,
    alt: `${query} - ${img.alt}`,
  }));
}

// API endpoint: GET /api/images?q=<term>
app.get('/api/images', async (req: Request, res: Response) => {
  const query = req.query.q as string;
  
  if (!query || typeof query !== 'string') {
    res.status(400).json({ error: 'Query parameter "q" is required' });
    return;
  }
  
  // Try Unsplash first
  let images = await getUnsplashImages(query);
  
  // Fall back to placeholders if no Unsplash results
  if (images.length === 0) {
    images = getPlaceholderImages(query);
  }
  
  res.json({ images });
});

// API endpoint: GET /api/sports/roster?team=<teamName>
// Returns current roster for a sports team
app.get('/api/sports/roster', async (req: Request, res: Response) => {
  const teamQuery = req.query.team as string;
  
  if (!teamQuery || typeof teamQuery !== 'string') {
    res.status(400).json({ error: 'Query parameter "team" is required' });
    return;
  }
  
  // Resolve team from user input
  const team = resolveTeam(teamQuery);
  
  if (!team) {
    res.status(404).json({ 
      error: 'Team not found',
      message: `Could not find team matching "${teamQuery}". Try team name like "Dodgers" or "Yankees".`,
    });
    return;
  }
  
  try {
    const rosterData = await getRoster(team);
    
    // Add enrichment data for explanations
    const enrichedPlayers = rosterData.players.map(player => ({
      ...player,
      positionName: positionNames[player.position] || player.position,
      teamName: team.name,
      teamFullName: team.fullName,
      sport: team.sport,
    }));
    
    res.json({
      team: {
        id: team.id,
        name: team.name,
        fullName: team.fullName,
        city: team.city,
        stadium: team.stadium,
        colors: team.colors,
        sport: team.sport,
      },
      players: enrichedPlayers,
      themedItems: getTeamThemedItems(team),
      source: rosterData.source,
      cached: rosterData.cached,
      warning: rosterData.source === 'fallback' 
        ? 'Using cached roster data - may not reflect most recent roster changes'
        : undefined,
    });
  } catch (error) {
    console.error('[Roster API Error]', error);
    res.status(500).json({ 
      error: 'Failed to fetch roster',
      message: 'Could not retrieve roster data. Please try again later.',
    });
  }
});

// API endpoint: GET /api/sports/detect?q=<userInput>
// Detects if user input is asking about a sports team
app.get('/api/sports/detect', (req: Request, res: Response) => {
  const query = req.query.q as string;
  
  if (!query || typeof query !== 'string') {
    res.status(400).json({ error: 'Query parameter "q" is required' });
    return;
  }
  
  const detection = detectSportsTeamQuery(query);
  
  res.json({
    isTeamQuery: detection.isTeamQuery,
    team: detection.team ? {
      name: detection.team.name,
      fullName: detection.team.fullName,
      slug: detection.team.slug,
    } : null,
  });
});

// Health check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', unsplash: !!process.env.UNSPLASH_ACCESS_KEY });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📷 Unsplash API: ${process.env.UNSPLASH_ACCESS_KEY ? 'Enabled' : 'Using placeholders'}`);
});

export default app;
