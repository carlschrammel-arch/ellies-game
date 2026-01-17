/**
 * Team Resolver Module
 * 
 * Maps user input like "Dodgers", "LA Dodgers", etc. to canonical team data
 * Supports MLB teams with expansion to other leagues possible
 */

export interface TeamInfo {
  id: number;
  slug: string;
  name: string;
  fullName: string;
  abbreviation: string;
  city: string;
  league: 'MLB' | 'NBA' | 'NFL' | 'NHL';
  sport: string;
  colors: { primary: string; secondary: string };
  mascot?: string;
  stadium: string;
}

// MLB Teams Database
export const mlbTeams: TeamInfo[] = [
  {
    id: 119,
    slug: 'dodgers',
    name: 'Dodgers',
    fullName: 'Los Angeles Dodgers',
    abbreviation: 'LAD',
    city: 'Los Angeles',
    league: 'MLB',
    sport: 'baseball',
    colors: { primary: '#005A9C', secondary: '#EF3E42' },
    stadium: 'Dodger Stadium',
  },
  {
    id: 147,
    slug: 'yankees',
    name: 'Yankees',
    fullName: 'New York Yankees',
    abbreviation: 'NYY',
    city: 'New York',
    league: 'MLB',
    sport: 'baseball',
    colors: { primary: '#003087', secondary: '#E4002C' },
    stadium: 'Yankee Stadium',
  },
  {
    id: 111,
    slug: 'red-sox',
    name: 'Red Sox',
    fullName: 'Boston Red Sox',
    abbreviation: 'BOS',
    city: 'Boston',
    league: 'MLB',
    sport: 'baseball',
    colors: { primary: '#BD3039', secondary: '#0C2340' },
    stadium: 'Fenway Park',
  },
  {
    id: 112,
    slug: 'cubs',
    name: 'Cubs',
    fullName: 'Chicago Cubs',
    abbreviation: 'CHC',
    city: 'Chicago',
    league: 'MLB',
    sport: 'baseball',
    colors: { primary: '#0E3386', secondary: '#CC3433' },
    stadium: 'Wrigley Field',
  },
  {
    id: 145,
    slug: 'white-sox',
    name: 'White Sox',
    fullName: 'Chicago White Sox',
    abbreviation: 'CHW',
    city: 'Chicago',
    league: 'MLB',
    sport: 'baseball',
    colors: { primary: '#27251F', secondary: '#C4CED4' },
    stadium: 'Guaranteed Rate Field',
  },
  {
    id: 137,
    slug: 'giants',
    name: 'Giants',
    fullName: 'San Francisco Giants',
    abbreviation: 'SF',
    city: 'San Francisco',
    league: 'MLB',
    sport: 'baseball',
    colors: { primary: '#FD5A1E', secondary: '#27251F' },
    stadium: 'Oracle Park',
  },
  {
    id: 108,
    slug: 'angels',
    name: 'Angels',
    fullName: 'Los Angeles Angels',
    abbreviation: 'LAA',
    city: 'Anaheim',
    league: 'MLB',
    sport: 'baseball',
    colors: { primary: '#BA0021', secondary: '#003263' },
    stadium: 'Angel Stadium',
  },
  {
    id: 143,
    slug: 'phillies',
    name: 'Phillies',
    fullName: 'Philadelphia Phillies',
    abbreviation: 'PHI',
    city: 'Philadelphia',
    league: 'MLB',
    sport: 'baseball',
    colors: { primary: '#E81828', secondary: '#002D72' },
    stadium: 'Citizens Bank Park',
  },
  {
    id: 144,
    slug: 'braves',
    name: 'Braves',
    fullName: 'Atlanta Braves',
    abbreviation: 'ATL',
    city: 'Atlanta',
    league: 'MLB',
    sport: 'baseball',
    colors: { primary: '#CE1141', secondary: '#13274F' },
    stadium: 'Truist Park',
  },
  {
    id: 140,
    slug: 'rangers',
    name: 'Rangers',
    fullName: 'Texas Rangers',
    abbreviation: 'TEX',
    city: 'Texas',
    league: 'MLB',
    sport: 'baseball',
    colors: { primary: '#003278', secondary: '#C0111F' },
    stadium: 'Globe Life Field',
  },
  {
    id: 141,
    slug: 'blue-jays',
    name: 'Blue Jays',
    fullName: 'Toronto Blue Jays',
    abbreviation: 'TOR',
    city: 'Toronto',
    league: 'MLB',
    sport: 'baseball',
    colors: { primary: '#134A8E', secondary: '#1D2D5C' },
    stadium: 'Rogers Centre',
  },
  {
    id: 142,
    slug: 'twins',
    name: 'Twins',
    fullName: 'Minnesota Twins',
    abbreviation: 'MIN',
    city: 'Minnesota',
    league: 'MLB',
    sport: 'baseball',
    colors: { primary: '#002B5C', secondary: '#D31145' },
    stadium: 'Target Field',
  },
  {
    id: 136,
    slug: 'mariners',
    name: 'Mariners',
    fullName: 'Seattle Mariners',
    abbreviation: 'SEA',
    city: 'Seattle',
    league: 'MLB',
    sport: 'baseball',
    colors: { primary: '#0C2C56', secondary: '#005C5C' },
    stadium: 'T-Mobile Park',
  },
  {
    id: 146,
    slug: 'marlins',
    name: 'Marlins',
    fullName: 'Miami Marlins',
    abbreviation: 'MIA',
    city: 'Miami',
    league: 'MLB',
    sport: 'baseball',
    colors: { primary: '#00A3E0', secondary: '#EF3340' },
    stadium: 'LoanDepot Park',
  },
  {
    id: 121,
    slug: 'mets',
    name: 'Mets',
    fullName: 'New York Mets',
    abbreviation: 'NYM',
    city: 'New York',
    league: 'MLB',
    sport: 'baseball',
    colors: { primary: '#002D72', secondary: '#FF5910' },
    stadium: 'Citi Field',
  },
  {
    id: 135,
    slug: 'padres',
    name: 'Padres',
    fullName: 'San Diego Padres',
    abbreviation: 'SD',
    city: 'San Diego',
    league: 'MLB',
    sport: 'baseball',
    colors: { primary: '#2F241D', secondary: '#FFC425' },
    stadium: 'Petco Park',
  },
  {
    id: 109,
    slug: 'diamondbacks',
    name: 'Diamondbacks',
    fullName: 'Arizona Diamondbacks',
    abbreviation: 'ARI',
    city: 'Arizona',
    league: 'MLB',
    sport: 'baseball',
    colors: { primary: '#A71930', secondary: '#E3D4AD' },
    mascot: 'Baxter the Bobcat',
    stadium: 'Chase Field',
  },
  {
    id: 115,
    slug: 'rockies',
    name: 'Rockies',
    fullName: 'Colorado Rockies',
    abbreviation: 'COL',
    city: 'Colorado',
    league: 'MLB',
    sport: 'baseball',
    colors: { primary: '#33006F', secondary: '#C4CED4' },
    mascot: 'Dinger',
    stadium: 'Coors Field',
  },
  {
    id: 113,
    slug: 'reds',
    name: 'Reds',
    fullName: 'Cincinnati Reds',
    abbreviation: 'CIN',
    city: 'Cincinnati',
    league: 'MLB',
    sport: 'baseball',
    colors: { primary: '#C6011F', secondary: '#000000' },
    stadium: 'Great American Ball Park',
  },
  {
    id: 114,
    slug: 'guardians',
    name: 'Guardians',
    fullName: 'Cleveland Guardians',
    abbreviation: 'CLE',
    city: 'Cleveland',
    league: 'MLB',
    sport: 'baseball',
    colors: { primary: '#00385D', secondary: '#E50022' },
    stadium: 'Progressive Field',
  },
  {
    id: 116,
    slug: 'tigers',
    name: 'Tigers',
    fullName: 'Detroit Tigers',
    abbreviation: 'DET',
    city: 'Detroit',
    league: 'MLB',
    sport: 'baseball',
    colors: { primary: '#0C2340', secondary: '#FA4616' },
    stadium: 'Comerica Park',
  },
  {
    id: 117,
    slug: 'astros',
    name: 'Astros',
    fullName: 'Houston Astros',
    abbreviation: 'HOU',
    city: 'Houston',
    league: 'MLB',
    sport: 'baseball',
    colors: { primary: '#002D62', secondary: '#EB6E1F' },
    stadium: 'Minute Maid Park',
  },
  {
    id: 118,
    slug: 'royals',
    name: 'Royals',
    fullName: 'Kansas City Royals',
    abbreviation: 'KC',
    city: 'Kansas City',
    league: 'MLB',
    sport: 'baseball',
    colors: { primary: '#004687', secondary: '#BD9B60' },
    stadium: 'Kauffman Stadium',
  },
  {
    id: 158,
    slug: 'brewers',
    name: 'Brewers',
    fullName: 'Milwaukee Brewers',
    abbreviation: 'MIL',
    city: 'Milwaukee',
    league: 'MLB',
    sport: 'baseball',
    colors: { primary: '#12284B', secondary: '#FFC52F' },
    stadium: 'American Family Field',
  },
  {
    id: 133,
    slug: 'athletics',
    name: 'Athletics',
    fullName: 'Oakland Athletics',
    abbreviation: 'OAK',
    city: 'Oakland',
    league: 'MLB',
    sport: 'baseball',
    colors: { primary: '#003831', secondary: '#EFB21E' },
    stadium: 'Oakland Coliseum',
  },
  {
    id: 134,
    slug: 'pirates',
    name: 'Pirates',
    fullName: 'Pittsburgh Pirates',
    abbreviation: 'PIT',
    city: 'Pittsburgh',
    league: 'MLB',
    sport: 'baseball',
    colors: { primary: '#27251F', secondary: '#FDB827' },
    stadium: 'PNC Park',
  },
  {
    id: 138,
    slug: 'cardinals',
    name: 'Cardinals',
    fullName: 'St. Louis Cardinals',
    abbreviation: 'STL',
    city: 'St. Louis',
    league: 'MLB',
    sport: 'baseball',
    colors: { primary: '#C41E3A', secondary: '#0C2340' },
    stadium: 'Busch Stadium',
  },
  {
    id: 139,
    slug: 'rays',
    name: 'Rays',
    fullName: 'Tampa Bay Rays',
    abbreviation: 'TB',
    city: 'Tampa Bay',
    league: 'MLB',
    sport: 'baseball',
    colors: { primary: '#092C5C', secondary: '#8FBCE6' },
    stadium: 'Tropicana Field',
  },
  {
    id: 110,
    slug: 'orioles',
    name: 'Orioles',
    fullName: 'Baltimore Orioles',
    abbreviation: 'BAL',
    city: 'Baltimore',
    league: 'MLB',
    sport: 'baseball',
    colors: { primary: '#DF4601', secondary: '#27251F' },
    stadium: 'Camden Yards',
  },
  {
    id: 120,
    slug: 'nationals',
    name: 'Nationals',
    fullName: 'Washington Nationals',
    abbreviation: 'WSH',
    city: 'Washington',
    league: 'MLB',
    sport: 'baseball',
    colors: { primary: '#AB0003', secondary: '#14225A' },
    stadium: 'Nationals Park',
  },
];

// Aliases for team names
const teamAliases: Record<string, string> = {
  // Dodgers
  'la dodgers': 'dodgers',
  'los angeles dodgers': 'dodgers',
  'dodger': 'dodgers',
  
  // Yankees  
  'ny yankees': 'yankees',
  'new york yankees': 'yankees',
  'yanks': 'yankees',
  
  // Red Sox
  'boston red sox': 'red-sox',
  'redsox': 'red-sox',
  'boston': 'red-sox',
  
  // Cubs
  'chicago cubs': 'cubs',
  'cubbies': 'cubs',
  
  // White Sox
  'chicago white sox': 'white-sox',
  'whitesox': 'white-sox',
  'chi sox': 'white-sox',
  
  // Giants
  'sf giants': 'giants',
  'san francisco giants': 'giants',
  
  // Angels
  'la angels': 'angels',
  'los angeles angels': 'angels',
  'anaheim angels': 'angels',
  
  // Mets
  'ny mets': 'mets',
  'new york mets': 'mets',
  
  // Phillies
  'philadelphia phillies': 'phillies',
  'philly': 'phillies',
  
  // Braves
  'atlanta braves': 'braves',
  
  // Blue Jays
  'toronto blue jays': 'blue-jays',
  'jays': 'blue-jays',
  'bluejays': 'blue-jays',
  
  // Astros
  'houston astros': 'astros',
  
  // Padres  
  'san diego padres': 'padres',
  
  // Cardinals
  'st louis cardinals': 'cardinals',
  'stl cardinals': 'cardinals',
  'cards': 'cardinals',
  
  // Guardians (formerly Indians)
  'cleveland guardians': 'guardians',
  'cleveland indians': 'guardians',
  
  // Mariners
  'seattle mariners': 'mariners',
  
  // Rangers
  'texas rangers': 'rangers',
  
  // Twins
  'minnesota twins': 'twins',
  
  // Tigers
  'detroit tigers': 'tigers',
  
  // Royals
  'kansas city royals': 'royals',
  'kc royals': 'royals',
  
  // Brewers
  'milwaukee brewers': 'brewers',
  
  // Reds
  'cincinnati reds': 'reds',
  
  // Pirates
  'pittsburgh pirates': 'pirates',
  
  // Rockies
  'colorado rockies': 'rockies',
  
  // Diamondbacks
  'arizona diamondbacks': 'diamondbacks',
  'dbacks': 'diamondbacks',
  'd-backs': 'diamondbacks',
  
  // Rays
  'tampa bay rays': 'rays',
  'devil rays': 'rays',
  
  // Orioles
  'baltimore orioles': 'orioles',
  'os': 'orioles',
  
  // Nationals
  'washington nationals': 'nationals',
  'nats': 'nationals',
  
  // Athletics
  'oakland athletics': 'athletics',
  'oakland as': 'athletics',
  "a's": 'athletics',
  
  // Marlins
  'miami marlins': 'marlins',
  'florida marlins': 'marlins',
};

/**
 * Resolve user text to a team
 */
export function resolveTeam(userText: string): TeamInfo | null {
  const normalized = userText.toLowerCase().trim()
    .replace(/players?/gi, '')
    .replace(/baseball/gi, '')
    .replace(/team/gi, '')
    .trim();
  
  // Check aliases first
  const aliasMatch = teamAliases[normalized];
  if (aliasMatch) {
    return mlbTeams.find(t => t.slug === aliasMatch) || null;
  }
  
  // Direct slug match
  const slugMatch = mlbTeams.find(t => t.slug === normalized);
  if (slugMatch) return slugMatch;
  
  // Name contains match
  const containsMatch = mlbTeams.find(t => 
    normalized.includes(t.name.toLowerCase()) ||
    normalized.includes(t.slug) ||
    t.fullName.toLowerCase().includes(normalized) ||
    t.city.toLowerCase() === normalized
  );
  if (containsMatch) return containsMatch;
  
  // Fuzzy match - check if any word matches
  const words = normalized.split(/\s+/);
  for (const word of words) {
    if (word.length < 3) continue;
    const wordMatch = mlbTeams.find(t => 
      t.name.toLowerCase() === word ||
      t.slug === word ||
      t.city.toLowerCase() === word
    );
    if (wordMatch) return wordMatch;
  }
  
  return null;
}

/**
 * Detect if user input is asking about a sports team
 */
export function detectSportsTeamQuery(input: string): { isTeamQuery: boolean; team: TeamInfo | null } {
  const lower = input.toLowerCase();
  
  // Check for team-related keywords
  const teamKeywords = ['players', 'team', 'roster', 'baseball', 'mlb'];
  const hasTeamKeyword = teamKeywords.some(kw => lower.includes(kw));
  
  // Try to resolve team
  const team = resolveTeam(input);
  
  return {
    isTeamQuery: hasTeamKeyword || team !== null,
    team,
  };
}
