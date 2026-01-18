/**
 * Card Explanation Tests
 * 
 * BUG 3: Ensures "What is this?" generates meaningful explanations for ALL cards
 */

import { describe, it, expect } from 'vitest';
import {
  generateCardExplanation,
  getExplanationForCard,
  validateCard,
  ensureCardMetadata,
} from '../utils/cardExplanation';
import { buildDeck, GeneratedCard } from '../utils/deckBuilder';

// Generate a batch of cards for testing
function generateTestDeck(count: number): GeneratedCard[] {
  return buildDeck({
    favoritesText: 'dogs cats pizza minecraft soccer basketball painting',
    selectedCategories: ['animals', 'videogames', 'sports', 'artcrafts', 'foodtreats'],
    targetCount: count,
  });
}

describe('Card Explanation - BUG 3: Meaningful Explanations', () => {
  it('should generate non-empty explanations for a batch of 30 cards', () => {
    const deck = generateTestDeck(30);
    
    deck.forEach((card) => {
      const explanation = getExplanationForCard(card);
      
      expect(explanation.explanation).toBeTruthy();
      expect(explanation.explanation.length).toBeGreaterThan(0);
    });
  });

  it('should not produce generic fallback explanations', () => {
    const deck = generateTestDeck(30);
    const genericFallback = 'This is something cool you might want to check out!';
    
    deck.forEach((card) => {
      const explanation = getExplanationForCard(card);
      
      // Explanation should not be the generic fallback
      expect(explanation.explanation).not.toBe(genericFallback);
    });
  });

  it('should produce explanations within reasonable length bounds (1-3 short lines)', () => {
    const deck = generateTestDeck(30);
    
    deck.forEach((card) => {
      const explanation = getExplanationForCard(card);
      
      // Should be at least 10 characters (meaningful content)
      expect(explanation.explanation.length).toBeGreaterThan(10);
      
      // Should not be excessively long (roughly 3 lines max, ~300 chars)
      expect(explanation.explanation.length).toBeLessThan(400);
    });
  });

  it('should include fun facts for most cards', () => {
    const deck = generateTestDeck(30);
    
    const cardsWithFunFacts = deck.filter((card) => {
      const explanation = getExplanationForCard(card);
      return explanation.funFact && explanation.funFact.length > 0;
    });
    
    // At least 80% should have fun facts
    const funFactPercentage = (cardsWithFunFacts.length / deck.length) * 100;
    expect(funFactPercentage).toBeGreaterThanOrEqual(80);
  });

  it('should reference the card title in the explanation', () => {
    const deck = generateTestDeck(15);
    
    deck.forEach((card) => {
      const explanation = getExplanationForCard(card);
      
      // The card title (or part of it) should appear in the explanation
      const titleWords = card.title.toLowerCase().split(/\s+/);
      const explanationLower = explanation.explanation.toLowerCase();
      
      const hasTitleReference = titleWords.some(word => 
        word.length > 3 && explanationLower.includes(word)
      ) || explanationLower.includes(card.title.toLowerCase());
      
      expect(hasTitleReference).toBe(true);
    });
  });
});

describe('Card Validation', () => {
  it('should validate cards with all required metadata', () => {
    const validCard: GeneratedCard = {
      id: 'test-1',
      title: 'Golden Retriever',
      query: 'Golden Retriever',
      alt: 'Golden Retriever',
      themeTags: ['dogs', 'animals'],
      category: 'animals',
    };
    
    const validation = validateCard(validCard);
    expect(validation.isValid).toBe(true);
    expect(validation.missingFields).toHaveLength(0);
  });

  it('should detect missing title', () => {
    const invalidCard: GeneratedCard = {
      id: 'test-1',
      title: '',
      query: 'something',
      alt: 'something',
      themeTags: ['tag'],
      category: 'other',
    };
    
    const validation = validateCard(invalidCard);
    expect(validation.isValid).toBe(false);
    expect(validation.missingFields).toContain('title');
  });

  it('should detect missing themeTags', () => {
    const invalidCard: GeneratedCard = {
      id: 'test-1',
      title: 'Test Card',
      query: 'Test Card',
      alt: 'Test Card',
      themeTags: [],
      category: 'other',
    };
    
    const validation = validateCard(invalidCard);
    expect(validation.isValid).toBe(false);
    expect(validation.missingFields).toContain('themeTags');
  });

  it('should detect missing category', () => {
    const invalidCard: GeneratedCard = {
      id: 'test-1',
      title: 'Test Card',
      query: 'Test Card',
      alt: 'Test Card',
      themeTags: ['tag'],
      category: '',
    };
    
    const validation = validateCard(invalidCard);
    expect(validation.isValid).toBe(false);
    expect(validation.missingFields).toContain('category');
  });
});

describe('Card Metadata Filling', () => {
  it('should fill missing title with default', () => {
    const card: GeneratedCard = {
      id: 'test-1',
      title: '',
      query: '',
      alt: '',
      themeTags: [],
      category: '',
    };
    
    const filled = ensureCardMetadata(card);
    expect(filled.title).toBe('Mystery Item');
  });

  it('should fill missing query from title', () => {
    const card: GeneratedCard = {
      id: 'test-1',
      title: 'Cool Thing',
      query: '',
      alt: '',
      themeTags: [],
      category: '',
    };
    
    const filled = ensureCardMetadata(card);
    expect(filled.query).toBe('Cool Thing');
  });

  it('should fill missing category with "other"', () => {
    const card: GeneratedCard = {
      id: 'test-1',
      title: 'Test',
      query: 'Test',
      alt: '',
      themeTags: [],
      category: '',
    };
    
    const filled = ensureCardMetadata(card);
    expect(filled.category).toBe('other');
  });

  it('should fill missing themeTags from category', () => {
    const card: GeneratedCard = {
      id: 'test-1',
      title: 'Test',
      query: 'Test',
      alt: '',
      themeTags: [],
      category: 'animals',
    };
    
    const filled = ensureCardMetadata(card);
    expect(filled.themeTags).toContain('animals');
  });
});

describe('Category-specific Explanations', () => {
  it('should generate animal-themed explanations for animal cards', () => {
    const animalCard: GeneratedCard = {
      id: 'test-1',
      title: 'Fluffy kitten',
      query: 'Fluffy kitten',
      alt: 'Fluffy kitten',
      themeTags: ['cats', 'animals'],
      category: 'animals',
    };
    
    const explanation = generateCardExplanation(animalCard);
    
    // Should mention something animal-related
    const isAnimalThemed = 
      explanation.explanation.toLowerCase().includes('animal') ||
      explanation.explanation.toLowerCase().includes('creature') ||
      explanation.explanation.toLowerCase().includes('pet') ||
      explanation.explanation.toLowerCase().includes('kitten') ||
      explanation.explanation.toLowerCase().includes('fluffy');
    
    expect(isAnimalThemed).toBe(true);
  });

  it('should generate food-themed explanations for food cards', () => {
    const foodCard: GeneratedCard = {
      id: 'test-1',
      title: 'Pepperoni pizza',
      query: 'Pepperoni pizza',
      alt: 'Pepperoni pizza',
      themeTags: ['pizza', 'food'],
      category: 'foodtreats',
    };
    
    const explanation = generateCardExplanation(foodCard);
    
    const isFoodThemed = 
      explanation.explanation.toLowerCase().includes('food') ||
      explanation.explanation.toLowerCase().includes('yummy') ||
      explanation.explanation.toLowerCase().includes('treat') ||
      explanation.explanation.toLowerCase().includes('delicious') ||
      explanation.explanation.toLowerCase().includes('pizza');
    
    expect(isFoodThemed).toBe(true);
  });

  it('should generate sports-themed explanations for sports cards', () => {
    const sportsCard: GeneratedCard = {
      id: 'test-1',
      title: 'Slam dunk',
      query: 'Slam dunk',
      alt: 'Slam dunk',
      themeTags: ['basketball', 'sports'],
      category: 'sports',
    };
    
    const explanation = generateCardExplanation(sportsCard);
    
    const isSportsThemed = 
      explanation.explanation.toLowerCase().includes('sport') ||
      explanation.explanation.toLowerCase().includes('athlete') ||
      explanation.explanation.toLowerCase().includes('game') ||
      explanation.explanation.toLowerCase().includes('dunk');
    
    expect(isSportsThemed).toBe(true);
  });
});

describe('Edge Cases', () => {
  it('should handle unknown topics gracefully', () => {
    const unknownCard: GeneratedCard = {
      id: 'test-1',
      title: 'Xyzabc mysterious thing',
      query: 'Xyzabc mysterious thing',
      alt: 'Xyzabc mysterious thing',
      themeTags: ['unknown'],
      category: 'other',
    };
    
    const explanation = getExplanationForCard(unknownCard);
    
    // Should still produce a non-empty, meaningful explanation
    expect(explanation.explanation).toBeTruthy();
    expect(explanation.explanation.length).toBeGreaterThan(10);
  });

  it('should handle cards with enrichment data', () => {
    const enrichedCard: GeneratedCard = {
      id: 'test-1',
      title: 'John Smith',
      query: 'John Smith',
      alt: 'John Smith',
      themeTags: ['baseball', 'sports'],
      category: 'sportsplayer',
      enrichment: {
        playerPosition: 'Pitcher',
        teamName: 'Yankees',
        sport: 'baseball',
      },
    };
    
    const explanation = getExplanationForCard(enrichedCard, enrichedCard.enrichment);
    
    // Should include enrichment details
    expect(explanation.explanation).toBeTruthy();
    // Should be personalized for the player
    const hasPlayerInfo = 
      explanation.explanation.toLowerCase().includes('pitcher') ||
      explanation.explanation.toLowerCase().includes('yankees') ||
      explanation.explanation.toLowerCase().includes('athlete') ||
      explanation.explanation.toLowerCase().includes('player');
    
    expect(hasPlayerInfo).toBe(true);
  });
});
