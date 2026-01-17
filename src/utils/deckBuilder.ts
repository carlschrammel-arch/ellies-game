/**
 * Deck Builder Module
 * 
 * Builds card decks using concept expansion to ensure:
 * - Card titles are never exactly the raw user input
 * - Cards are properly tagged for personality scoring
 * - Category bias is applied when categories are selected
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
}

/**
 * Build a deck of cards from user input
 * Ensures no card title exactly matches the raw input
 */
export function buildDeck(config: DeckConfig): GeneratedCard[] {
  const { favoritesText, selectedCategories, targetCount = 24 } = config;
  
  // Parse user input into keywords
  const rawInputs = parseKeywords(favoritesText);
  const allRawInputs = [...rawInputs]; // Keep track of all raw inputs for validation
  
  const cards: GeneratedCard[] = [];
  const usedTitles = new Set<string>();
  
  // 1. Expand user's favorite terms into more specific subtypes
  for (const keyword of rawInputs) {
    if (cards.length >= targetCount) break;
    
    const expansions = expandConcept(keyword, 4);
    for (const expansion of expansions) {
      if (cards.length >= targetCount) break;
      
      const normalizedExpansion = normalizeTerm(expansion);
      if (usedTitles.has(normalizedExpansion)) continue;
      
      // Validate this title doesn't match raw input
      if (!validateTitle(expansion, allRawInputs)) {
        continue;
      }
      
      const theme = getThemeForKeyword(keyword);
      cards.push({
        id: `card-${cards.length}-${Date.now()}`,
        title: expansion,
        query: expansion, // Use expanded term for image search
        alt: expansion,
        themeTags: [keyword, theme].filter(Boolean),
        category: theme || 'other',
      });
      usedTitles.add(normalizedExpansion);
    }
  }
  
  // 2. Add category-based cards to fill the deck
  for (const category of selectedCategories) {
    if (cards.length >= targetCount) break;
    
    const categoryExpansions = getCategoryExpansions(category, 8);
    for (const expansion of categoryExpansions) {
      if (cards.length >= targetCount) break;
      
      const normalizedExpansion = normalizeTerm(expansion);
      if (usedTitles.has(normalizedExpansion)) continue;
      
      // Validate this title doesn't match raw input
      if (!validateTitle(expansion, allRawInputs)) {
        continue;
      }
      
      cards.push({
        id: `card-${cards.length}-${Date.now()}`,
        title: expansion,
        query: expansion,
        alt: expansion,
        themeTags: [category],
        category: category.toLowerCase().replace(/[^a-z0-9]/g, ''),
      });
      usedTitles.add(normalizedExpansion);
    }
  }
  
  // 3. Add more variety if we still need cards
  if (cards.length < targetCount) {
    const diverseCategories = ['animals', 'videogames', 'food', 'sports', 'music', 'fantasy'];
    for (const cat of diverseCategories) {
      if (cards.length >= targetCount) break;
      
      const expansions = getCategoryExpansions(cat, 4);
      for (const expansion of expansions) {
        if (cards.length >= targetCount) break;
        
        const normalizedExpansion = normalizeTerm(expansion);
        if (usedTitles.has(normalizedExpansion)) continue;
        
        if (!validateTitle(expansion, allRawInputs)) {
          continue;
        }
        
        cards.push({
          id: `card-${cards.length}-${Date.now()}`,
          title: expansion,
          query: expansion,
          alt: expansion,
          themeTags: [cat],
          category: cat,
        });
        usedTitles.add(normalizedExpansion);
      }
    }
  }
  
  // 4. Validate deck - regenerate any cards that violate the rule
  const validatedCards = validateDeck(cards, allRawInputs);
  
  // 5. Shuffle the deck
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
