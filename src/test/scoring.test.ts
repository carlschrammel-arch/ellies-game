import { describe, it, expect } from 'vitest';
import {
  parseKeywords,
  getRelatedTerms,
  getThemeForKeyword,
  calculateThemeScores,
  calculatePersonalityType,
  buildCardDeck,
} from '../utils/scoring';
import { buildDeck, validateDeck, titleViolatesRule } from '../utils/deckBuilder';
import { expandConcept, validateTitle, normalizeTerm } from '../utils/conceptExpansion';
import { categories } from '../data/gameData';
import { SwipeResult, Card } from '../types';

describe('parseKeywords', () => {
  it('should parse simple words', () => {
    const result = parseKeywords('cats dogs pizza');
    expect(result).toContain('cats');
    expect(result).toContain('dogs');
    expect(result).toContain('pizza');
  });

  it('should filter out short words', () => {
    const result = parseKeywords('I like cats and dogs');
    expect(result).not.toContain('I');
    expect(result).not.toContain('and');
  });

  it('should filter out stop words', () => {
    const result = parseKeywords('the cats are really cute');
    expect(result).not.toContain('the');
    expect(result).not.toContain('are');
    expect(result).not.toContain('really');
    expect(result).toContain('cats');
    expect(result).toContain('cute');
  });

  it('should handle empty input', () => {
    const result = parseKeywords('');
    expect(result).toHaveLength(0);
  });

  it('should remove duplicates', () => {
    const result = parseKeywords('cats cats cats');
    expect(result).toHaveLength(1);
    expect(result[0]).toBe('cats');
  });

  it('should handle punctuation', () => {
    const result = parseKeywords('cats, dogs! pizza?');
    expect(result).toContain('cats');
    expect(result).toContain('dogs');
    expect(result).toContain('pizza');
  });
});

describe('getRelatedTerms', () => {
  it('should return related terms for known keywords', () => {
    const result = getRelatedTerms('cats');
    expect(result.length).toBeGreaterThan(0);
    expect(result).toContain('kittens');
  });

  it('should return empty array for unknown keywords', () => {
    const result = getRelatedTerms('xyznonexistent');
    expect(result).toHaveLength(0);
  });

  it('should handle plural forms', () => {
    const resultPlural = getRelatedTerms('cats');
    // Both should find related terms
    expect(resultPlural.length).toBeGreaterThan(0);
  });
});

describe('getThemeForKeyword', () => {
  it('should map animal keywords to animals theme', () => {
    expect(getThemeForKeyword('cats')).toBe('animals');
    expect(getThemeForKeyword('dogs')).toBe('animals');
    expect(getThemeForKeyword('puppies')).toBe('animals');
  });

  it('should map food keywords to foodtreats theme', () => {
    expect(getThemeForKeyword('pizza')).toBe('foodtreats');
    expect(getThemeForKeyword('icecream')).toBe('foodtreats');
  });

  it('should map sports keywords to sports theme', () => {
    expect(getThemeForKeyword('soccer')).toBe('sports');
    expect(getThemeForKeyword('basketball')).toBe('sports');
  });

  it('should return "other" for unknown keywords', () => {
    expect(getThemeForKeyword('xyznonexistent')).toBe('other');
  });
});

describe('calculateThemeScores', () => {
  const createMockCard = (tags: string[], category: string): Card => ({
    id: '1',
    label: 'Test',
    image: { url: '', alt: '' },
    tags,
    category,
  });

  it('should calculate positive scores for liked cards', () => {
    const results: SwipeResult[] = [
      { card: createMockCard(['cats', 'animals'], 'animals'), liked: true },
      { card: createMockCard(['dogs', 'animals'], 'animals'), liked: true },
    ];

    const scores = calculateThemeScores(results);
    expect(scores.length).toBeGreaterThan(0);
    
    const animalsScore = scores.find((s) => s.theme === 'animals');
    expect(animalsScore).toBeDefined();
    expect(animalsScore!.score).toBeGreaterThan(0);
  });

  it('should reduce scores for disliked cards', () => {
    const results: SwipeResult[] = [
      { card: createMockCard(['cats', 'animals'], 'animals'), liked: true },
      { card: createMockCard(['dogs', 'animals'], 'animals'), liked: false },
    ];

    const scores = calculateThemeScores(results);
    const animalsScore = scores.find((s) => s.theme === 'animals');
    
    // Score should be positive but reduced
    if (animalsScore) {
      expect(animalsScore.score).toBeLessThan(2);
    }
  });

  it('should return top 5 themes', () => {
    const results: SwipeResult[] = [
      { card: createMockCard(['cats'], 'animals'), liked: true },
      { card: createMockCard(['pizza'], 'foodtreats'), liked: true },
      { card: createMockCard(['soccer'], 'sports'), liked: true },
      { card: createMockCard(['painting'], 'art'), liked: true },
      { card: createMockCard(['guitar'], 'music'), liked: true },
      { card: createMockCard(['robots'], 'science'), liked: true },
      { card: createMockCard(['beach'], 'places'), liked: true },
    ];

    const scores = calculateThemeScores(results);
    expect(scores.length).toBeLessThanOrEqual(5);
  });
});

describe('calculatePersonalityType', () => {
  const createMockCard = (tags: string[], category: string): Card => ({
    id: '1',
    label: 'Test',
    image: { url: '', alt: '' },
    tags,
    category,
  });

  it('should return a personality type', () => {
    const results: SwipeResult[] = [
      { card: createMockCard(['cats', 'animals'], 'animals'), liked: true },
      { card: createMockCard(['dogs', 'animals'], 'animals'), liked: true },
      { card: createMockCard(['flowers', 'nature'], 'nature'), liked: true },
    ];

    const personality = calculatePersonalityType(results);
    expect(personality).toBeDefined();
    expect(personality.id).toBeDefined();
    expect(personality.name).toBeDefined();
    expect(personality.description).toBeDefined();
  });

  it('should favor nature-pal for nature/animal lovers', () => {
    const results: SwipeResult[] = Array(10).fill(null).map(() => ({
      card: createMockCard(['animals', 'nature'], 'nature'),
      liked: true,
    }));

    const personality = calculatePersonalityType(results);
    expect(['nature-pal', 'adventurer']).toContain(personality.id);
  });

  it('should handle empty results', () => {
    const personality = calculatePersonalityType([]);
    expect(personality).toBeDefined();
  });
});

describe('buildCardDeck', () => {
  it('should build a deck from keywords', () => {
    const { labels, tags } = buildCardDeck(['cats', 'pizza'], [], 10);
    
    expect(labels.length).toBeGreaterThan(0);
    expect(labels.length).toBeLessThanOrEqual(10);
    expect(tags.length).toBe(labels.length);
  });

  it('should include related terms', () => {
    const { labels } = buildCardDeck(['cats'], [], 10);
    
    // Should have more than just 'cats'
    expect(labels.length).toBeGreaterThan(1);
  });

  it('should respect target count', () => {
    const { labels } = buildCardDeck(['cats', 'dogs', 'pizza'], ['animals', 'foodtreats'], 5);
    
    expect(labels.length).toBeLessThanOrEqual(5);
  });

  it('should use categories when no keywords provided', () => {
    const { labels } = buildCardDeck([], ['animals'], 10);
    
    expect(labels.length).toBeGreaterThan(0);
  });

  it('should not have duplicates', () => {
    const { labels } = buildCardDeck(['cats', 'kittens'], [], 20);
    const uniqueLabels = new Set(labels.map((l) => l.toLowerCase()));
    
    expect(uniqueLabels.size).toBe(labels.length);
  });
});

// ============================================
// NEW TESTS FOR FEEDBACK REQUIREMENTS
// ============================================

describe('Concept Expansion - No Exact Match Rule', () => {
  it('should NOT produce a card titled exactly "dogs" when input is "dogs"', () => {
    const expansions = expandConcept('dogs', 10);
    
    // None of the expansions should be exactly "dogs"
    const exactMatch = expansions.find((e) => normalizeTerm(e) === 'dogs');
    expect(exactMatch).toBeUndefined();
  });

  it('should NOT produce a card titled exactly "cats" when input is "cats"', () => {
    const expansions = expandConcept('cats', 10);
    
    const exactMatch = expansions.find((e) => normalizeTerm(e) === 'cats');
    expect(exactMatch).toBeUndefined();
  });

  it('should NOT produce a card titled exactly "pizza" when input is "pizza"', () => {
    const expansions = expandConcept('pizza', 10);
    
    const exactMatch = expansions.find((e) => normalizeTerm(e) === 'pizza');
    expect(exactMatch).toBeUndefined();
  });

  it('should produce more specific subtypes for "dogs"', () => {
    const expansions = expandConcept('dogs', 5);
    
    expect(expansions.length).toBeGreaterThan(0);
    // Should have specific things like breeds or dog-related activities
    const hasSpecific = expansions.some((e) => 
      e.toLowerCase().includes('retriever') ||
      e.toLowerCase().includes('husky') ||
      e.toLowerCase().includes('puppy') ||
      e.toLowerCase().includes('agility') ||
      e.toLowerCase().includes('dog park')
    );
    expect(hasSpecific).toBe(true);
  });

  it('should produce more specific subtypes for "basketball"', () => {
    const expansions = expandConcept('basketball', 5);
    
    expect(expansions.length).toBeGreaterThan(0);
    // Should have specific basketball things
    const hasSpecific = expansions.some((e) => 
      e.toLowerCase().includes('dunk') ||
      e.toLowerCase().includes('dribble') ||
      e.toLowerCase().includes('3-point') ||
      e.toLowerCase().includes('wnba')
    );
    expect(hasSpecific).toBe(true);
  });

  it('validateTitle should return false for exact match', () => {
    expect(validateTitle('dogs', ['dogs', 'cats'])).toBe(false);
    expect(validateTitle('Dogs', ['dogs', 'cats'])).toBe(false);
    expect(validateTitle('DOGS', ['dogs', 'cats'])).toBe(false);
  });

  it('validateTitle should return true for non-exact match', () => {
    expect(validateTitle('Golden Retriever', ['dogs', 'cats'])).toBe(true);
    expect(validateTitle('Dog agility course', ['dogs', 'cats'])).toBe(true);
    expect(validateTitle('Puppy training class', ['dogs', 'cats'])).toBe(true);
  });
});

describe('Deck Builder - No Exact Match Rule', () => {
  it('should not generate any card with title exactly matching raw input "dogs"', () => {
    const deck = buildDeck({
      favoritesText: 'dogs',
      selectedCategories: [],
      targetCount: 15,
    });

    const violatingCard = deck.find((card) => 
      normalizeTerm(card.title) === 'dogs'
    );
    expect(violatingCard).toBeUndefined();
  });

  it('should not generate any card with title exactly matching raw input "cats"', () => {
    const deck = buildDeck({
      favoritesText: 'cats',
      selectedCategories: [],
      targetCount: 15,
    });

    const violatingCard = deck.find((card) => 
      normalizeTerm(card.title) === 'cats'
    );
    expect(violatingCard).toBeUndefined();
  });

  it('should not generate any card with title exactly matching multiple inputs', () => {
    const deck = buildDeck({
      favoritesText: 'dogs cats pizza minecraft',
      selectedCategories: [],
      targetCount: 30,
    });

    const rawInputs = ['dogs', 'cats', 'pizza', 'minecraft'];
    const violatingCard = deck.find((card) => 
      rawInputs.includes(normalizeTerm(card.title))
    );
    expect(violatingCard).toBeUndefined();
  });

  it('titleViolatesRule helper should work correctly', () => {
    expect(titleViolatesRule('dogs', ['dogs'])).toBe(true);
    expect(titleViolatesRule('Golden Retriever', ['dogs'])).toBe(false);
  });

  it('validateDeck should remove violating cards', () => {
    const mockCards = [
      { id: '1', title: 'dogs', query: 'dogs', alt: 'dogs', themeTags: ['dogs'], category: 'animals' },
      { id: '2', title: 'Golden Retriever', query: 'Golden Retriever', alt: 'Golden Retriever', themeTags: ['dogs'], category: 'animals' },
    ];

    const validated = validateDeck(mockCards, ['dogs']);
    
    // The exact match should be replaced or removed
    const stillHasDogs = validated.find((c) => normalizeTerm(c.title) === 'dogs');
    expect(stillHasDogs).toBeUndefined();
    
    // The valid one should remain
    const hasRetriever = validated.find((c) => c.title === 'Golden Retriever');
    expect(hasRetriever).toBeDefined();
  });
});

describe('Category Updates - No Science', () => {
  it('should NOT include "Science" in categories list', () => {
    const hasScience = categories.some((cat) => 
      cat.id === 'science' || cat.label.toLowerCase() === 'science'
    );
    expect(hasScience).toBe(false);
  });

  it('should have at least 14 categories', () => {
    expect(categories.length).toBeGreaterThanOrEqual(14);
  });

  it('should include new kid-friendly categories', () => {
    const categoryIds = categories.map((c) => c.id);
    
    // Check for some of the new categories
    expect(categoryIds).toContain('videogames');
    expect(categoryIds).toContain('fantasymagic');
    expect(categoryIds).toContain('techgadgets');
    expect(categoryIds).toContain('buildinglego');
    expect(categoryIds).toContain('cutestuff');
  });
});

describe('Mode and Count Selection', () => {
  it('should generate correct number of cards for standard mode with 15', () => {
    const deck = buildDeck({
      favoritesText: 'dogs cats pizza',
      selectedCategories: ['animals'],
      targetCount: 15,
    });

    expect(deck.length).toBeLessThanOrEqual(15);
    expect(deck.length).toBeGreaterThan(0);
  });

  it('should generate correct number of cards for standard mode with 30', () => {
    const deck = buildDeck({
      favoritesText: 'dogs cats pizza minecraft',
      selectedCategories: ['animals', 'videogames'],
      targetCount: 30,
    });

    expect(deck.length).toBeLessThanOrEqual(30);
    expect(deck.length).toBeGreaterThan(10);
  });

  it('should generate many cards for unlimited mode', () => {
    const deck = buildDeck({
      favoritesText: 'dogs cats pizza',
      selectedCategories: ['animals', 'foodtreats'],
      targetCount: 100,
      unlimited: true,
    });

    // Should generate a decent number of cards (at least 20)
    expect(deck.length).toBeGreaterThan(20);
  });
});
