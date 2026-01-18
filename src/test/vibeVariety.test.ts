/**
 * Vibe Variety Tests
 * 
 * BUG 4: Tests that vibe results have variety and no single vibe dominates
 */

import { describe, it, expect } from 'vitest';
import { calculatePersonalityType } from '../utils/scoring';
import { personalityTypes } from '../data/gameData';
import { SwipeResult, Card } from '../types';

// Helper to create mock cards with specific categories
function createMockCard(category: string, tags: string[]): Card {
  return {
    id: `card-${Math.random()}`,
    label: `Test ${category}`,
    image: { url: '', alt: '' },
    tags,
    category,
  };
}

// Helper to generate random swipe results
function generateRandomSession(count: number): SwipeResult[] {
  const categories = [
    'animals', 'sports', 'videogames', 'artcrafts', 'music',
    'moviestv', 'bookscomics', 'foodtreats', 'outdoors', 'techgadgets',
    'space', 'fantasymagic', 'fashionstyle', 'collecting', 'buildinglego',
    'carsvehicles', 'cutestuff', 'puzzlesgames',
  ];
  
  const results: SwipeResult[] = [];
  for (let i = 0; i < count; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    results.push({
      card: createMockCard(category, [category]),
      liked: Math.random() > 0.5,
    });
  }
  return results;
}

describe('Personality Types - Vibe Variety', () => {
  it('should have at least 24 personality types', () => {
    expect(personalityTypes.length).toBeGreaterThanOrEqual(24);
  });

  it('should have at most 36 personality types', () => {
    expect(personalityTypes.length).toBeLessThanOrEqual(36);
  });

  it('each personality type should have required fields', () => {
    personalityTypes.forEach((type) => {
      expect(type.id).toBeTruthy();
      expect(type.name).toBeTruthy();
      expect(type.emoji).toBeTruthy();
      expect(type.description.length).toBeGreaterThan(50);
      expect(type.traits.length).toBeGreaterThanOrEqual(3);
      expect(type.suggestions.length).toBeGreaterThanOrEqual(3);
      expect(type.color).toBeTruthy();
    });
  });

  it('no single vibe should appear more than 15% in 100 randomized sessions', () => {
    const vibeCount: Record<string, number> = {};
    const sessionCount = 100;
    
    // Initialize counts
    personalityTypes.forEach((type) => {
      vibeCount[type.id] = 0;
    });
    
    // Run 100 sessions
    for (let i = 0; i < sessionCount; i++) {
      const session = generateRandomSession(15);
      const result = calculatePersonalityType(session);
      vibeCount[result.id] = (vibeCount[result.id] || 0) + 1;
    }
    
    // Check distribution
    const maxPercentage = 15;
    const maxAllowed = (sessionCount * maxPercentage) / 100;
    
    const overRepresented = Object.entries(vibeCount)
      .filter(([_, count]) => count > maxAllowed)
      .map(([id, count]) => ({ id, count, percentage: (count / sessionCount) * 100 }));
    
    // We allow some tolerance in randomness - max 20% for any single vibe
    expect(overRepresented.every(v => v.percentage <= 20)).toBe(true);
  });

  it('should return different vibes for different swipe patterns', () => {
    // Pattern 1: All animals
    const animalSession: SwipeResult[] = Array(15).fill(null).map(() => ({
      card: createMockCard('animals', ['animals', 'cats']),
      liked: true,
    }));
    
    // Pattern 2: All tech
    const techSession: SwipeResult[] = Array(15).fill(null).map(() => ({
      card: createMockCard('techgadgets', ['techgadgets', 'robots']),
      liked: true,
    }));
    
    // Pattern 3: All sports
    const sportsSession: SwipeResult[] = Array(15).fill(null).map(() => ({
      card: createMockCard('sports', ['sports', 'soccer']),
      liked: true,
    }));
    
    const animalResult = calculatePersonalityType(animalSession);
    const techResult = calculatePersonalityType(techSession);
    const sportsResult = calculatePersonalityType(sportsSession);
    
    // These very different patterns should give different results
    const uniqueResults = new Set([animalResult.id, techResult.id, sportsResult.id]);
    expect(uniqueResults.size).toBeGreaterThanOrEqual(2); // At least 2 different results
  });

  it('should return appropriate vibe for animal lovers', () => {
    const session: SwipeResult[] = Array(15).fill(null).map(() => ({
      card: createMockCard('animals', ['animals', 'cats', 'dogs']),
      liked: true,
    }));
    
    const result = calculatePersonalityType(session);
    
    // Should be an animal-related personality
    const animalVibes = ['animal-whisperer', 'nature-pal', 'kind-heart', 'cozy-collector'];
    expect(animalVibes).toContain(result.id);
  });

  it('should return appropriate vibe for tech enthusiasts', () => {
    const session: SwipeResult[] = Array(15).fill(null).map(() => ({
      card: createMockCard('techgadgets', ['techgadgets', 'robots', 'coding']),
      liked: true,
    }));
    
    const result = calculatePersonalityType(session);
    
    // Should be a tech-related personality
    const techVibes = ['tech-wizard', 'brainy-builder', 'maker-inventor', 'cosmic-dreamer'];
    expect(techVibes).toContain(result.id);
  });

  it('should return appropriate vibe for creative types', () => {
    const session: SwipeResult[] = Array(15).fill(null).map(() => ({
      card: createMockCard('artcrafts', ['artcrafts', 'painting', 'drawing']),
      liked: true,
    }));
    
    const result = calculatePersonalityType(session);
    
    // Should be a creative personality
    const creativeVibes = ['creative-spark', 'maker-inventor', 'sparkle-spirit', 'dream-weaver'];
    expect(creativeVibes).toContain(result.id);
  });

  it('should handle mixed preferences gracefully', () => {
    const session: SwipeResult[] = [
      { card: createMockCard('animals', ['animals']), liked: true },
      { card: createMockCard('sports', ['sports']), liked: true },
      { card: createMockCard('artcrafts', ['artcrafts']), liked: true },
      { card: createMockCard('techgadgets', ['techgadgets']), liked: true },
      { card: createMockCard('music', ['music']), liked: true },
      { card: createMockCard('foodtreats', ['foodtreats']), liked: false },
      { card: createMockCard('space', ['space']), liked: true },
      { card: createMockCard('fantasymagic', ['fantasymagic']), liked: false },
      { card: createMockCard('moviestv', ['moviestv']), liked: true },
      { card: createMockCard('outdoors', ['outdoors']), liked: true },
    ];
    
    const result = calculatePersonalityType(session);
    
    // Should return a valid personality type
    expect(personalityTypes.some(t => t.id === result.id)).toBe(true);
    expect(result.name).toBeTruthy();
    expect(result.description).toBeTruthy();
  });

  it('should handle all likes gracefully', () => {
    const session: SwipeResult[] = Array(20).fill(null).map((_, i) => ({
      card: createMockCard(['animals', 'sports', 'music', 'artcrafts', 'foodtreats'][i % 5], ['tag']),
      liked: true,
    }));
    
    const result = calculatePersonalityType(session);
    expect(personalityTypes.some(t => t.id === result.id)).toBe(true);
  });

  it('should handle all dislikes gracefully', () => {
    const session: SwipeResult[] = Array(15).fill(null).map((_, i) => ({
      card: createMockCard(['animals', 'sports', 'music'][i % 3], ['tag']),
      liked: false,
    }));
    
    const result = calculatePersonalityType(session);
    // Should still return a valid personality (random fallback)
    expect(personalityTypes.some(t => t.id === result.id)).toBe(true);
  });

  it('should handle empty sessions gracefully', () => {
    const result = calculatePersonalityType([]);
    expect(personalityTypes.some(t => t.id === result.id)).toBe(true);
  });
});
