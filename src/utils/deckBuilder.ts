/**
 * Deck Builder Module
 * 
 * Builds card decks using concept expansion to ensure:
 * - Card titles are never exactly the raw user input
 * - Cards are properly tagged for personality scoring
 * - Category bias is applied when categories are selected
 * - 80-90% related cards, 10-20% surprise cards for variety
 */

import { Card, CardImage, CardEnrichment } from '../types';
import {
  expandConcept,
  getCategoryExpansions,
  validateTitle,
  normalizeTerm,
} from './conceptExpansion';
import { parseKeywords, getThemeForKeyword } from './scoring';
import { getCardIcon } from './iconSelector';

export interface DeckConfig {
  favoritesText: string;
  selectedCategories: string[];
  targetCount?: number; // For standard mode
  unlimited?: boolean;  // For unlimited mode
}

export interface GeneratedCard {
  id: string;
  title: string;
  query: string; // Used for image search
  alt: string;
  themeTags: string[];
  category: string;
  enrichment?: CardEnrichment;
  isRelated?: boolean; // True if related to user input, false for surprise cards
}

/**
 * Curated pool of kid-safe surprise topics
 * These are universally recognizable and fun for all kids
 */
const SURPRISE_CARD_POOL = [
  // Animals
  { title: 'Fluffy kittens', category: 'animals', tags: ['cats', 'animals'] },
  { title: 'Playful puppies', category: 'animals', tags: ['dogs', 'animals'] },
  { title: 'Baby pandas rolling', category: 'animals', tags: ['pandas', 'animals'] },
  { title: 'Dolphin jumping', category: 'animals', tags: ['fish', 'animals'] },
  { title: 'Penguin waddle', category: 'animals', tags: ['birds', 'animals'] },
  { title: 'Bunny hop', category: 'animals', tags: ['rabbits', 'animals'] },
  { title: 'Koala nap time', category: 'animals', tags: ['animals'] },
  { title: 'Red panda cute', category: 'animals', tags: ['animals'] },
  
  // Snacks & Treats
  { title: 'Rainbow ice cream', category: 'foodtreats', tags: ['icecream', 'food'] },
  { title: 'Gummy bears', category: 'foodtreats', tags: ['candy', 'food'] },
  { title: 'Cookie decorating', category: 'foodtreats', tags: ['cookies', 'food'] },
  { title: 'Popcorn movie night', category: 'foodtreats', tags: ['snacks', 'food'] },
  { title: 'Cotton candy swirl', category: 'foodtreats', tags: ['candy', 'food'] },
  { title: 'Hot cocoa marshmallows', category: 'foodtreats', tags: ['chocolate', 'food'] },
  { title: 'Fruit smoothie blend', category: 'foodtreats', tags: ['fruit', 'food'] },
  
  // Fun Activities
  { title: 'Bubble blowing', category: 'outdoors', tags: ['fun', 'outdoors'] },
  { title: 'Trampoline jumping', category: 'sports', tags: ['fun', 'sports'] },
  { title: 'Water balloon fight', category: 'outdoors', tags: ['summer', 'outdoors'] },
  { title: 'Pillow fort building', category: 'buildinglego', tags: ['building', 'fun'] },
  { title: 'Hide and seek', category: 'puzzlesgames', tags: ['games', 'fun'] },
  { title: 'Dance party', category: 'music', tags: ['dancing', 'music'] },
  { title: 'Balloon animals', category: 'artcrafts', tags: ['crafts', 'fun'] },
  
  // Popular Sports
  { title: 'Soccer goal celebration', category: 'sports', tags: ['soccer', 'sports'] },
  { title: 'Basketball slam dunk', category: 'sports', tags: ['basketball', 'sports'] },
  { title: 'Swimming pool splash', category: 'sports', tags: ['swimming', 'sports'] },
  { title: 'Bowling strike', category: 'sports', tags: ['bowling', 'sports'] },
  { title: 'Mini golf hole-in-one', category: 'sports', tags: ['golf', 'sports'] },
  
  // Games & Play
  { title: 'Board game night', category: 'puzzlesgames', tags: ['boardgames', 'games'] },
  { title: 'Card game tricks', category: 'puzzlesgames', tags: ['cards', 'games'] },
  { title: 'Video game victory', category: 'videogames', tags: ['games', 'videogames'] },
  { title: 'Puzzle solving', category: 'puzzlesgames', tags: ['puzzles', 'games'] },
  { title: 'LEGO creations', category: 'buildinglego', tags: ['lego', 'building'] },
  
  // Crafts & Creativity
  { title: 'Slime making', category: 'artcrafts', tags: ['crafts', 'art'] },
  { title: 'Rainbow painting', category: 'artcrafts', tags: ['painting', 'art'] },
  { title: 'Friendship bracelets', category: 'artcrafts', tags: ['crafts', 'art'] },
  { title: 'Origami animals', category: 'artcrafts', tags: ['origami', 'crafts'] },
  { title: 'Sticker collection', category: 'collecting', tags: ['stickers', 'collecting'] },
  
  // Cool Stuff
  { title: 'Fireworks show', category: 'outdoors', tags: ['celebration', 'outdoors'] },
  { title: 'Rainbow after rain', category: 'outdoors', tags: ['rainbow', 'nature'] },
  { title: 'Stargazing night', category: 'space', tags: ['space', 'nature'] },
  { title: 'Sunset colors', category: 'outdoors', tags: ['nature', 'outdoors'] },
  { title: 'Snowflake catching', category: 'outdoors', tags: ['winter', 'outdoors'] },
];

/**
 * Development telemetry (only logs in dev mode)
 */
interface DeckTelemetry {
  relatedCount: number;
  surpriseCount: number;
  totalCount: number;
  relatedPercentage: number;
  surprisePercentage: number;
}

function logDeckTelemetry(telemetry: DeckTelemetry): void {
  if (import.meta.env?.DEV) {
    console.log('[DeckBuilder Telemetry]', {
      ...telemetry,
      relatedPct: `${telemetry.relatedPercentage.toFixed(1)}%`,
      surprisePct: `${telemetry.surprisePercentage.toFixed(1)}%`,
    });
  }
}

/**
 * Build a deck of cards from user input
 * Implements mix strategy: 80-90% related, 10-20% surprise cards
 */
export function buildDeck(config: DeckConfig): GeneratedCard[] {
  const { favoritesText, selectedCategories, targetCount = 24 } = config;
  
  // Parse user input into keywords
  const rawInputs = parseKeywords(favoritesText);
  const allRawInputs = [...rawInputs];
  
  // Calculate card distribution
  // Target: 85% related, 15% surprise (middle of the 80-90% / 10-20% range)
  const surpriseRatio = 0.15;
  const surpriseCount = Math.max(1, Math.round(targetCount * surpriseRatio));
  const relatedCount = targetCount - surpriseCount;
  
  const relatedCards: GeneratedCard[] = [];
  const usedTitles = new Set<string>();
  
  // 1. Generate RELATED cards from user's favorite terms
  for (const keyword of rawInputs) {
    if (relatedCards.length >= relatedCount) break;
    
    const expansions = expandConcept(keyword, 6);
    for (const expansion of expansions) {
      if (relatedCards.length >= relatedCount) break;
      
      const normalizedExpansion = normalizeTerm(expansion);
      if (usedTitles.has(normalizedExpansion)) continue;
      
      if (!validateTitle(expansion, allRawInputs)) {
        continue;
      }
      
      const theme = getThemeForKeyword(keyword);
      relatedCards.push({
        id: `card-${relatedCards.length}-${Date.now()}-r`,
        title: expansion,
        query: expansion,
        alt: expansion,
        themeTags: [keyword, theme].filter(Boolean),
        category: theme || 'other',
        isRelated: true,
      });
      usedTitles.add(normalizedExpansion);
    }
  }
  
  // 2. Add RELATED cards from selected categories
  for (const category of selectedCategories) {
    if (relatedCards.length >= relatedCount) break;
    
    const categoryExpansions = getCategoryExpansions(category, 8);
    for (const expansion of categoryExpansions) {
      if (relatedCards.length >= relatedCount) break;
      
      const normalizedExpansion = normalizeTerm(expansion);
      if (usedTitles.has(normalizedExpansion)) continue;
      
      if (!validateTitle(expansion, allRawInputs)) {
        continue;
      }
      
      relatedCards.push({
        id: `card-${relatedCards.length}-${Date.now()}-r`,
        title: expansion,
        query: expansion,
        alt: expansion,
        themeTags: [category],
        category: category.toLowerCase().replace(/[^a-z0-9]/g, ''),
        isRelated: true,
      });
      usedTitles.add(normalizedExpansion);
    }
  }
  
  // 3. Fill remaining RELATED slots with diverse but still categorized content
  if (relatedCards.length < relatedCount) {
    const diverseCategories = selectedCategories.length > 0 
      ? selectedCategories 
      : ['animals', 'videogames', 'foodtreats', 'sports', 'music'];
    
    for (const cat of diverseCategories) {
      if (relatedCards.length >= relatedCount) break;
      
      const expansions = getCategoryExpansions(cat, 6);
      for (const expansion of expansions) {
        if (relatedCards.length >= relatedCount) break;
        
        const normalizedExpansion = normalizeTerm(expansion);
        if (usedTitles.has(normalizedExpansion)) continue;
        
        if (!validateTitle(expansion, allRawInputs)) {
          continue;
        }
        
        relatedCards.push({
          id: `card-${relatedCards.length}-${Date.now()}-r`,
          title: expansion,
          query: expansion,
          alt: expansion,
          themeTags: [cat],
          category: cat,
          isRelated: true,
        });
        usedTitles.add(normalizedExpansion);
      }
    }
  }
  
  // 4. Generate SURPRISE cards from curated kid-safe pool
  const surpriseCards: GeneratedCard[] = [];
  const shuffledSurprises = shuffleArray([...SURPRISE_CARD_POOL]);
  
  for (const surprise of shuffledSurprises) {
    if (surpriseCards.length >= surpriseCount) break;
    
    const normalizedTitle = normalizeTerm(surprise.title);
    if (usedTitles.has(normalizedTitle)) continue;
    
    // Avoid surprise cards too similar to user input
    if (!validateTitle(surprise.title, allRawInputs)) continue;
    
    surpriseCards.push({
      id: `card-${relatedCards.length + surpriseCards.length}-${Date.now()}-s`,
      title: surprise.title,
      query: surprise.title,
      alt: surprise.title,
      themeTags: surprise.tags,
      category: surprise.category,
      isRelated: false,
    });
    usedTitles.add(normalizedTitle);
  }
  
  // 5. Combine and validate the deck
  const allCards = [...relatedCards, ...surpriseCards];
  const validatedCards = validateDeck(allCards, allRawInputs);
  
  // 6. Log telemetry in dev mode
  const actualRelated = validatedCards.filter(c => c.isRelated !== false).length;
  const actualSurprise = validatedCards.filter(c => c.isRelated === false).length;
  logDeckTelemetry({
    relatedCount: actualRelated,
    surpriseCount: actualSurprise,
    totalCount: validatedCards.length,
    relatedPercentage: (actualRelated / validatedCards.length) * 100,
    surprisePercentage: (actualSurprise / validatedCards.length) * 100,
  });
  
  // 7. Shuffle the deck
  return shuffleArray(validatedCards);
}

/**
 * Validate that no card title exactly matches a raw input
 * Replaces violating cards with valid alternatives
 */
export function validateDeck(cards: GeneratedCard[], rawInputs: string[]): GeneratedCard[] {
  const validCards: GeneratedCard[] = [];
  const usedTitles = new Set<string>();
  
  for (const card of cards) {
    if (validateTitle(card.title, rawInputs)) {
      validCards.push(card);
      usedTitles.add(normalizeTerm(card.title));
    } else {
      // This card violates the rule - try to replace it
      const replacements = expandConcept(card.themeTags[0] || 'adventure', 10);
      for (const replacement of replacements) {
        const normalizedReplacement = normalizeTerm(replacement);
        if (usedTitles.has(normalizedReplacement)) continue;
        if (!validateTitle(replacement, rawInputs)) continue;
        
        validCards.push({
          ...card,
          title: replacement,
          query: replacement,
          alt: replacement,
        });
        usedTitles.add(normalizedReplacement);
        break;
      }
    }
  }
  
  return validCards;
}

/**
 * Fisher-Yates shuffle
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Convert GeneratedCard to full Card with image
 */
export function convertToCard(generatedCard: GeneratedCard, image: CardImage): Card {
  const icon = getCardIcon(generatedCard.title, generatedCard.category, generatedCard.themeTags);
  
  return {
    id: generatedCard.id,
    label: generatedCard.title,
    image,
    tags: generatedCard.themeTags,
    category: generatedCard.category,
    icon,
    enrichment: generatedCard.enrichment,
    query: generatedCard.query,
  };
}

/**
 * Check if a title violates the "no exact match" rule
 * Useful for testing
 */
export function titleViolatesRule(title: string, rawInputs: string[]): boolean {
  return !validateTitle(title, rawInputs);
}
