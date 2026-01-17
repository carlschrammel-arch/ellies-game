import { SwipeResult, PersonalityType, ThemeScore } from '../types';
import {
  personalityTypes,
  themeToPersonalityWeights,
  themeEmojis,
  relatedTerms,
  categories,
} from '../data/gameData';

// Parse user input into keywords
export function parseKeywords(input: string): string[] {
  const words = input
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((word) => word.length > 2);

  // Remove duplicates and common words
  const stopWords = new Set([
    'the', 'and', 'but', 'for', 'are', 'was', 'were', 'been', 'being',
    'have', 'has', 'had', 'does', 'did', 'will', 'would', 'could', 'should',
    'may', 'might', 'must', 'can', 'this', 'that', 'these', 'those',
    'with', 'from', 'about', 'into', 'through', 'during', 'before', 'after',
    'above', 'below', 'between', 'under', 'again', 'further', 'then', 'once',
    'here', 'there', 'when', 'where', 'why', 'how', 'all', 'each', 'few',
    'more', 'most', 'other', 'some', 'such', 'only', 'own', 'same', 'than',
    'too', 'very', 'just', 'also', 'now', 'like', 'really', 'love', 'favorite',
    'best', 'thing', 'things', 'stuff', 'lot', 'lots',
  ]);

  return [...new Set(words)].filter((word) => !stopWords.has(word));
}

// Get related terms for a keyword
export function getRelatedTerms(keyword: string): string[] {
  const normalized = keyword.toLowerCase().replace(/s$/, '');
  
  // Check direct match
  if (relatedTerms[normalized]) {
    return relatedTerms[normalized];
  }
  
  // Check if keyword is in any related terms list
  for (const [key, terms] of Object.entries(relatedTerms)) {
    if (terms.some((t) => t.includes(normalized) || normalized.includes(t))) {
      return [key, ...terms.filter((t) => t !== normalized)];
    }
  }
  
  return [];
}

// Map keyword to category/theme
export function getThemeForKeyword(keyword: string): string {
  const normalized = keyword.toLowerCase();
  
  // Check if it matches a category
  for (const cat of categories) {
    if (normalized.includes(cat.id) || cat.id.includes(normalized)) {
      return cat.id;
    }
  }
  
  // Check related terms to find theme
  for (const [key, terms] of Object.entries(relatedTerms)) {
    if (key.includes(normalized) || normalized.includes(key)) {
      return getCategoryForTerm(key);
    }
    if (terms.some((t) => t.includes(normalized) || normalized.includes(t))) {
      return getCategoryForTerm(key);
    }
  }
  
  // Additional direct keyword mappings for better matching
  const directMappings: Record<string, string> = {
    // Food keywords
    pizza: 'foodtreats', icecream: 'foodtreats', cookies: 'foodtreats',
    tacos: 'foodtreats', sushi: 'foodtreats', pasta: 'foodtreats',
    fruit: 'foodtreats', chocolate: 'foodtreats', pancakes: 'foodtreats',
    food: 'foodtreats', treats: 'foodtreats', snacks: 'foodtreats',
    // Video games
    games: 'videogames', gaming: 'videogames', minecraft: 'videogames',
    roblox: 'videogames', fortnite: 'videogames', pokemon: 'videogames',
  };
  
  if (directMappings[normalized]) {
    return directMappings[normalized];
  }
  
  return 'other';
}

// Helper to get category for a term
function getCategoryForTerm(term: string): string {
  const termToCategory: Record<string, string> = {
    // Animals
    cats: 'animals', dogs: 'animals', horses: 'animals', birds: 'animals',
    fish: 'animals', dinosaurs: 'animals', rabbits: 'animals', pandas: 'animals',
    elephants: 'animals', butterflies: 'animals',
    // Sports
    soccer: 'sports', basketball: 'sports', swimming: 'sports', gymnastics: 'sports',
    baseball: 'sports', tennis: 'sports', skateboarding: 'sports', dancing: 'sports',
    running: 'sports',
    // Video Games
    minecraft: 'videogames', roblox: 'videogames', pokemon: 'videogames', mario: 'videogames',
    fortnite: 'videogames', zelda: 'videogames',
    // Building & LEGO
    lego: 'buildinglego', puzzles: 'puzzlesgames', boardgames: 'puzzlesgames',
    // Food & Treats
    pizza: 'foodtreats', icecream: 'foodtreats', cookies: 'foodtreats', tacos: 'foodtreats',
    sushi: 'foodtreats', pasta: 'foodtreats', fruit: 'foodtreats', chocolate: 'foodtreats', 
    pancakes: 'foodtreats',
    // Colors
    blue: 'artcrafts', red: 'artcrafts', green: 'artcrafts', purple: 'artcrafts',
    pink: 'artcrafts', yellow: 'artcrafts', rainbow: 'artcrafts',
    // Outdoors & Adventure
    beach: 'outdoors', mountains: 'outdoors', forest: 'outdoors', camping: 'outdoors',
    // Space
    space: 'space', moon: 'space', planets: 'space',
    // Music
    piano: 'music', guitar: 'music', drums: 'music', singing: 'music',
    pop: 'music', rock: 'music',
    // Art & Crafts
    painting: 'artcrafts', drawing: 'artcrafts', crafts: 'artcrafts', photography: 'artcrafts',
    origami: 'artcrafts',
    // Tech & Gadgets
    robots: 'techgadgets', coding: 'techgadgets', gadgets: 'techgadgets',
    // Fantasy & Magic
    unicorns: 'fantasymagic', dragons: 'fantasymagic', magic: 'fantasymagic', fairies: 'fantasymagic',
    // Movies & TV
    animation: 'moviestv', superheroes: 'moviestv',
    // Books & Comics
    comics: 'bookscomics', fantasy_books: 'bookscomics',
    // Fashion & Style
    fashion: 'fashionstyle', sneakers: 'fashionstyle',
    // Collecting
    cards: 'collecting', stickers: 'collecting', figurines: 'collecting',
    // Cars & Vehicles
    cars: 'carsvehicles', trucks: 'carsvehicles', trains: 'carsvehicles',
    // Cute Stuff
    kawaii: 'cutestuff', plushies: 'cutestuff',
  };
  
  return termToCategory[term] || 'other';
}

// Calculate theme scores from swipe results
export function calculateThemeScores(results: SwipeResult[]): ThemeScore[] {
  // Filter out skipped cards
  const validResults = results.filter(r => !r.skipped);
  
  const scores: Record<string, number> = {};
  
  for (const result of validResults) {
    const points = result.liked ? 1 : -0.5;
    
    for (const tag of result.card.tags) {
      const theme = getThemeForKeyword(tag);
      if (theme !== 'other') {
        scores[theme] = (scores[theme] || 0) + points;
      }
    }
    
    // Also score the category directly
    if (result.card.category) {
      scores[result.card.category] = (scores[result.card.category] || 0) + points;
    }
  }
  
  // Convert to array and sort
  const themeScores: ThemeScore[] = Object.entries(scores)
    .filter(([_, score]) => score > 0)
    .map(([theme, score]) => ({
      theme,
      score,
      emoji: themeEmojis[theme] || '✨',
    }))
    .sort((a, b) => b.score - a.score);
  
  return themeScores.slice(0, 5);
}

// Calculate personality type from swipe results
export function calculatePersonalityType(results: SwipeResult[]): PersonalityType {
  // Filter out skipped cards - they don't count toward personality
  const validResults = results.filter(r => !r.skipped);
  
  const personalityScores: Record<string, number> = {};
  
  // Initialize scores
  for (const type of personalityTypes) {
    personalityScores[type.id] = 0;
  }
  
  // Calculate scores based on likes/dislikes
  for (const result of validResults) {
    if (!result.liked) continue;
    
    for (const tag of result.card.tags) {
      const theme = getThemeForKeyword(tag);
      const weights = themeToPersonalityWeights[theme];
      
      if (weights) {
        for (const [typeId, weight] of Object.entries(weights)) {
          personalityScores[typeId] += weight;
        }
      }
    }
    
    // Also use category
    const categoryWeights = themeToPersonalityWeights[result.card.category];
    if (categoryWeights) {
      for (const [typeId, weight] of Object.entries(categoryWeights)) {
        personalityScores[typeId] += weight;
      }
    }
  }
  
  // Find the highest scoring personality
  let maxScore = 0;
  let selectedType = personalityTypes[0];
  
  for (const [typeId, score] of Object.entries(personalityScores)) {
    if (score > maxScore) {
      maxScore = score;
      selectedType = personalityTypes.find((t) => t.id === typeId) || personalityTypes[0];
    }
  }
  
  // If no clear winner, pick based on most common liked category
  if (maxScore === 0) {
    const categoryCounts: Record<string, number> = {};
    for (const result of validResults) {
      if (result.liked && result.card.category) {
        categoryCounts[result.card.category] = (categoryCounts[result.card.category] || 0) + 1;
      }
    }
    
    const topCategory = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1])[0]?.[0];
    if (topCategory && themeToPersonalityWeights[topCategory]) {
      const weights = themeToPersonalityWeights[topCategory];
      const topTypeId = Object.entries(weights).sort((a, b) => b[1] - a[1])[0]?.[0];
      if (topTypeId) {
        selectedType = personalityTypes.find((t) => t.id === topTypeId) || selectedType;
      }
    }
  }
  
  return selectedType;
}

// Build card deck from user input
export function buildCardDeck(
  keywords: string[],
  selectedCategories: string[],
  targetCount: number = 24
): { labels: string[]; tags: string[][] } {
  const labels: string[] = [];
  const tags: string[][] = [];
  const usedLabels = new Set<string>();
  
  // Add primary keywords
  for (const keyword of keywords) {
    if (labels.length >= targetCount) break;
    if (usedLabels.has(keyword.toLowerCase())) continue;
    
    labels.push(keyword);
    tags.push([keyword, getThemeForKeyword(keyword)]);
    usedLabels.add(keyword.toLowerCase());
  }
  
  // Add related terms
  for (const keyword of keywords) {
    if (labels.length >= targetCount) break;
    
    const related = getRelatedTerms(keyword);
    for (const term of related.slice(0, 3)) {
      if (labels.length >= targetCount) break;
      if (usedLabels.has(term.toLowerCase())) continue;
      
      labels.push(term);
      tags.push([term, keyword, getThemeForKeyword(term)]);
      usedLabels.add(term.toLowerCase());
    }
  }
  
  // Add category-based terms if we need more
  for (const category of selectedCategories) {
    if (labels.length >= targetCount) break;
    
    // Find terms that belong to this category
    for (const [term, relatedList] of Object.entries(relatedTerms)) {
      if (labels.length >= targetCount) break;
      if (getCategoryForTerm(term) !== category) continue;
      
      if (!usedLabels.has(term.toLowerCase())) {
        labels.push(term);
        tags.push([term, category]);
        usedLabels.add(term.toLowerCase());
      }
      
      // Add some related terms too
      for (const related of relatedList.slice(0, 2)) {
        if (labels.length >= targetCount) break;
        if (usedLabels.has(related.toLowerCase())) continue;
        
        labels.push(related);
        tags.push([related, term, category]);
        usedLabels.add(related.toLowerCase());
      }
    }
  }
  
  // Shuffle the deck
  const shuffled = labels.map((label, i) => ({ label, tags: tags[i] }));
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  return {
    labels: shuffled.map((s) => s.label),
    tags: shuffled.map((s) => s.tags),
  };
}

// Export for testing
export { getCategoryForTerm };
