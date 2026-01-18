/**
 * Card Explanation Module
 * 
 * Generates unique, contextual, kid-friendly explanations for cards
 * based on their title, tags, category, and enrichment data.
 * 
 * Tone: Friendly older sibling. 1-2 sentences + optional fun fact.
 */

import { GeneratedCard } from './deckBuilder';

export interface CardExplanation {
  explanation: string;
  funFact?: string;
  category?: string;
}

export interface EnrichmentData {
  playerPosition?: string;
  teamName?: string;
  sport?: string;
  styleType?: string;
  ingredientType?: string;
  animalType?: string;
  gameGenre?: string;
}

/**
 * Generic fallback string - we want to avoid this being used
 */
const GENERIC_FALLBACK = 'This is something cool you might want to check out!';

/**
 * Validates that a card has required metadata for explanation generation
 */
export interface CardValidation {
  isValid: boolean;
  missingFields: string[];
  hasNonGenericExplanation: boolean;
}

export function validateCard(card: GeneratedCard): CardValidation {
  const missingFields: string[] = [];
  
  if (!card.title || card.title.trim() === '') {
    missingFields.push('title');
  }
  if (!card.query || card.query.trim() === '') {
    missingFields.push('query');
  }
  if (!card.category || card.category.trim() === '') {
    missingFields.push('category');
  }
  if (!card.themeTags || card.themeTags.length === 0) {
    missingFields.push('themeTags');
  }
  
  // Test if explanation would be non-generic
  let hasNonGenericExplanation = true;
  if (missingFields.length === 0) {
    const explanation = generateCardExplanation(card);
    hasNonGenericExplanation = explanation.explanation !== GENERIC_FALLBACK;
  }
  
  return {
    isValid: missingFields.length === 0,
    missingFields,
    hasNonGenericExplanation,
  };
}

/**
 * Fill missing card metadata to ensure valid explanations
 */
export function ensureCardMetadata(card: GeneratedCard): GeneratedCard {
  const filledCard = { ...card };
  
  if (!filledCard.title || filledCard.title.trim() === '') {
    filledCard.title = 'Mystery Item';
  }
  if (!filledCard.query || filledCard.query.trim() === '') {
    filledCard.query = filledCard.title;
  }
  if (!filledCard.category || filledCard.category.trim() === '') {
    filledCard.category = 'other';
  }
  if (!filledCard.themeTags || filledCard.themeTags.length === 0) {
    // Infer tags from category
    filledCard.themeTags = [filledCard.category];
  }
  
  return filledCard;
}

// Category-specific explanation templates
// {title} = card title, {context} = contextual info
const categoryTemplates: Record<string, {
  templates: string[];
  funFacts: string[];
}> = {
  // Sports
  sports: {
    templates: [
      "{title} is a super exciting part of the sports world!",
      "This is all about {title} - get ready to cheer!",
      "{title} is something athletes love to do or use!",
    ],
    funFacts: [
      "Sports help you stay healthy and make friends!",
      "Professional athletes practice for hours every day!",
      "Many kids dream of becoming sports stars one day!",
    ],
  },

  // Sports players
  sportsplayer: {
    templates: [
      "{title} is a {position} who plays {sport} for {team}!",
      "Meet {title} - a {sport} player who plays for {team}!",
      "{title} plays {position} for the {team}!",
    ],
    funFacts: [
      "Pro athletes train for hours every day to stay at the top of their game!",
      "Many athletes started playing their sport when they were your age!",
      "Being a team player is just as important as being talented!",
    ],
  },

  // Baseball
  baseball: {
    templates: [
      "{title} is part of the awesome world of baseball!",
      "This is {title} - a key part of America's favorite pastime!",
      "{title} makes baseball games super exciting!",
    ],
    funFacts: [
      "A baseball has exactly 108 stitches!",
      "The fastest pitch ever recorded was over 105 mph!",
      "Baseball games can last 3+ hours - that's a lot of hot dogs!",
    ],
  },

  // Beauty - Nails
  nails: {
    templates: [
      "{title} is a fun way to make your nails look amazing!",
      "This is {title} - a super cute nail style!",
      "{title} is all about expressing yourself through nail art!",
    ],
    funFacts: [
      "Your fingernails grow about 3.5 millimeters per month!",
      "Nail art has been around for over 5,000 years!",
      "Some nail artists create tiny paintings on a single nail!",
    ],
  },

  // Beauty - Makeup
  makeup: {
    templates: [
      "{title} is a fun beauty product to play with!",
      "This is {title} - a popular makeup item for creating cool looks!",
      "{title} helps people express their creativity through makeup!",
    ],
    funFacts: [
      "Ancient Egyptians wore makeup over 6,000 years ago!",
      "Glitter in makeup is often made from tiny pieces of mica rock!",
      "Some makeup artists create amazing fantasy looks for movies!",
    ],
  },

  // Animals
  animals: {
    templates: [
      "{title} is an amazing creature you might see at a zoo or in nature!",
      "This is {title} - one of nature's coolest animals!",
      "{title} is a fascinating animal with some pretty cool abilities!",
    ],
    funFacts: [
      "There are over 8 million animal species on Earth!",
      "Some animals can see colors that humans can't!",
      "Baby animals are often called different names than adults!",
    ],
  },

  // Pets
  pets: {
    templates: [
      "{title} makes for an awesome pet and friend!",
      "This is {title} - a popular pet that people love!",
      "{title} is a cuddly companion that many families have at home!",
    ],
    funFacts: [
      "Dogs have been human companions for over 15,000 years!",
      "Cats spend about 70% of their lives sleeping!",
      "Having a pet can make you happier and healthier!",
    ],
  },

  // Food
  food: {
    templates: [
      "{title} is a yummy treat that lots of people love!",
      "This is {title} - a delicious food you might want to try!",
      "{title} is something tasty that makes meal time fun!",
    ],
    funFacts: [
      "Your taste buds can detect five different flavors!",
      "The world's largest pizza was over 13,000 square feet!",
      "Humans eat about 35 tons of food in their lifetime!",
    ],
  },

  // Video Games
  videogames: {
    templates: [
      "{title} is something awesome from the gaming world!",
      "This is {title} - a cool thing gamers love!",
      "{title} makes gaming even more fun and exciting!",
    ],
    funFacts: [
      "The first video game was created in 1958!",
      "More than 3 billion people play video games worldwide!",
      "Some people play video games professionally and win prizes!",
    ],
  },

  // Music
  music: {
    templates: [
      "{title} is a cool part of the music world!",
      "This is {title} - something musicians use or love!",
      "{title} helps make music that you can sing or dance to!",
    ],
    funFacts: [
      "Music can make you feel happier and more energized!",
      "The world's longest concert lasted over 453 hours!",
      "Every culture in the world has its own music!",
    ],
  },

  // Art & Crafts
  crafts: {
    templates: [
      "{title} is a fun way to get creative!",
      "This is {title} - an awesome art or craft activity!",
      "{title} lets you make cool stuff with your own hands!",
    ],
    funFacts: [
      "Making art can help reduce stress and boost your mood!",
      "The world's most expensive painting sold for $450 million!",
      "Kids are often more creative than adults!",
    ],
  },

  // Movies & TV
  movies: {
    templates: [
      "{title} is from the exciting world of movies and TV!",
      "This is {title} - something you might see on the big screen!",
      "{title} is part of what makes movies and shows so much fun!",
    ],
    funFacts: [
      "The first movie ever made was only 2 seconds long!",
      "Some movies take years to make from start to finish!",
      "Voice actors bring animated characters to life!",
    ],
  },

  // Outdoors
  outdoors: {
    templates: [
      "{title} is a great reason to get outside and explore!",
      "This is {title} - an awesome outdoor activity or place!",
      "{title} makes spending time in nature super fun!",
    ],
    funFacts: [
      "Spending time outside is great for your health!",
      "There are over 400 national parks in the United States!",
      "Nature is home to millions of plants and animals!",
    ],
  },

  // Technology
  tech: {
    templates: [
      "{title} is a cool piece of technology!",
      "This is {title} - something from the world of tech!",
      "{title} shows how technology can be amazing!",
    ],
    funFacts: [
      "The first computer was as big as a room!",
      "Your smartphone is more powerful than the computers that sent people to the moon!",
      "New technology is invented every single day!",
    ],
  },

  // Default fallback
  other: {
    templates: [
      "{title} is something cool you might want to learn about!",
      "This is {title} - it could be fun to check out!",
      "{title} is one of many interesting things in the world!",
    ],
    funFacts: [
      "Learning new things helps your brain grow!",
      "Every day is a chance to discover something awesome!",
      "Curiosity is one of the best traits to have!",
    ],
  },
};

// Special patterns for generating more specific explanations
const specificPatterns: Array<{
  pattern: RegExp;
  category: string;
  template: (title: string, match: RegExpMatchArray) => CardExplanation;
}> = [
  // Specific dog breeds - check BEFORE generic "First Last" pattern
  {
    pattern: /(retriever|shepherd|husky|corgi|poodle|bulldog|beagle|labrador|terrier|spaniel|dachshund|chihuahua|rottweiler|boxer|doberman|maltese|schnauzer|pitbull|pit bull)/i,
    category: 'pets',
    template: (title, match) => ({
      explanation: `${title} is a type of dog breed that people love as pets!`,
      funFact: `${match[1]} dogs each have their own special personality and traits!`,
    }),
  },

  // Cat breeds - check BEFORE generic "First Last" pattern
  {
    pattern: /(maine coon|siamese|persian|ragdoll|tabby|sphynx|bengal|scottish fold|british shorthair|abyssinian)/i,
    category: 'pets',
    template: (title, _match) => ({
      explanation: `${title} is a type of cat that makes a wonderful furry friend!`,
      funFact: "Cats spend about 70% of their day sleeping - that's almost 16 hours!",
    }),
  },

  // Common animal names that could look like player names
  {
    pattern: /(golden retriever|german shepherd|border collie|great dane|saint bernard|jack russell|shih tzu|bichon frise|cocker spaniel|king charles)/i,
    category: 'pets',
    template: (title, _match) => ({
      explanation: `${title} is a popular dog breed known for being a loyal companion!`,
      funFact: "Dogs have been human companions for over 15,000 years!",
    }),
  },

  // Player names for sports teams - AFTER breed checks
  // Only match if it looks like a human name (not breed-like words)
  {
    pattern: /^[A-Z][a-z]+ [A-Z][a-z]+$/,
    category: 'sportsplayer',
    template: (title, _match) => {
      // Additional check: skip if it contains common pet/animal words
      const lowerTitle = title.toLowerCase();
      const animalWords = ['retriever', 'shepherd', 'husky', 'corgi', 'poodle', 'bulldog', 'beagle', 'labrador', 'terrier', 'spaniel', 'collie', 'dane', 'bernard', 'russell', 'coon', 'siamese', 'persian', 'tabby'];
      if (animalWords.some(word => lowerTitle.includes(word))) {
        return {
          explanation: `${title} is a beloved pet breed that many families love!`,
          funFact: "Pets can become your best friends and loyal companions!",
        };
      }
      return {
        explanation: `${title} is a professional athlete! It's okay if you don't know them yet - they might become one of your favorites!`,
        funFact: "Pro athletes often started playing their sport when they were kids just like you!",
      };
    },
  },
  
  // Glitter/sparkle nails
  {
    pattern: /glitter|sparkl|shimmer/i,
    category: 'nails',
    template: (title, _match) => ({
      explanation: `${title} is a sparkly nail style that catches the light and looks super fun!`,
      funFact: "Nail glitter is specially made to be safe for use on nails!",
    }),
  },

  // French tips
  {
    pattern: /french tip/i,
    category: 'nails',
    template: (title, _match) => ({
      explanation: `${title} is a classic nail look with white tips - it looks clean and pretty!`,
      funFact: "French tips actually started in Paris, France in the 1970s!",
    }),
  },

  // Press-on nails
  {
    pattern: /press.?on/i,
    category: 'nails',
    template: (title, _match) => ({
      explanation: `${title} are fake nails you can stick on without any glue mess - they're super easy to use!`,
      funFact: "Press-on nails have been around since the 1970s!",
    }),
  },

  // Lip products
  {
    pattern: /lip\s?(gloss|stick|balm)/i,
    category: 'makeup',
    template: (title, _match) => ({
      explanation: `${title} is something you put on your lips to make them shiny or colorful!`,
      funFact: "Ancient Egyptians made lip color from crushed bugs and berries!",
    }),
  },

  // Eyeshadow
  {
    pattern: /eyeshadow|eye\s?shadow/i,
    category: 'makeup',
    template: (title, _match) => ({
      explanation: `${title} is colorful powder or cream you put on your eyelids to make your eyes pop!`,
      funFact: "Eyeshadow has been used for over 12,000 years!",
    }),
  },

];

/**
 * Determine the best category for explanation based on tags and card category
 */
function determineExplanationCategory(card: GeneratedCard): string {
  const title = card.title.toLowerCase();
  const tags = card.themeTags.map(t => t.toLowerCase());
  const category = card.category.toLowerCase();

  // Check for specific patterns first
  if (title.includes('nail') || tags.includes('nails') || tags.includes('beauty')) {
    if (title.includes('nail')) return 'nails';
  }
  if (title.includes('makeup') || title.includes('lipgloss') || title.includes('eyeshadow') || 
      title.includes('mascara') || title.includes('blush')) {
    return 'makeup';
  }

  // Map common categories
  const categoryMap: Record<string, string> = {
    'animals': 'animals',
    'dogs': 'pets',
    'cats': 'pets',
    'pets': 'pets',
    'sports': 'sports',
    'baseball': 'baseball',
    'basketball': 'sports',
    'soccer': 'sports',
    'football': 'sports',
    'food': 'food',
    'foodtreats': 'food',
    'videogames': 'videogames',
    'games': 'videogames',
    'music': 'music',
    'art': 'crafts',
    'crafts': 'crafts',
    'artcrafts': 'crafts',
    'movies': 'movies',
    'tv': 'movies',
    'moviestv': 'movies',
    'outdoors': 'outdoors',
    'nature': 'outdoors',
    'tech': 'tech',
    'technology': 'tech',
    'beauty': 'makeup',
    'nails': 'nails',
  };

  // Check tags first
  for (const tag of tags) {
    if (categoryMap[tag]) {
      return categoryMap[tag];
    }
  }

  // Then check category
  if (categoryMap[category]) {
    return categoryMap[category];
  }

  return 'other';
}

/**
 * Hash function for consistent random selection
 */
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

/**
 * Generate a contextual explanation for a card
 */
export function generateCardExplanation(
  card: GeneratedCard,
  enrichment?: EnrichmentData
): CardExplanation {
  const title = card.title;
  
  // Check for specific pattern matches first
  for (const { pattern, template } of specificPatterns) {
    const match = title.match(pattern);
    if (match) {
      return template(title, match);
    }
  }

  // If we have enrichment data for a sports player
  if (enrichment?.playerPosition && enrichment?.teamName) {
    const templates = categoryTemplates.sportsplayer.templates;
    const funFacts = categoryTemplates.sportsplayer.funFacts;
    const templateIdx = hashString(title) % templates.length;
    const funFactIdx = hashString(title + 'funfact') % funFacts.length;

    let explanation = templates[templateIdx]
      .replace('{title}', title)
      .replace('{position}', enrichment.playerPosition)
      .replace('{team}', enrichment.teamName)
      .replace('{sport}', enrichment.sport || 'sports');

    return {
      explanation,
      funFact: funFacts[funFactIdx],
      category: 'sportsplayer',
    };
  }

  // Determine category and get appropriate templates
  const explanationCategory = determineExplanationCategory(card);
  const templates = categoryTemplates[explanationCategory] || categoryTemplates.other;
  
  // Use consistent pseudo-random selection based on title
  const templateIdx = hashString(title) % templates.templates.length;
  const funFactIdx = hashString(title + 'fact') % templates.funFacts.length;

  const explanation = templates.templates[templateIdx].replace('{title}', title);
  const funFact = templates.funFacts[funFactIdx];

  return {
    explanation,
    funFact,
    category: explanationCategory,
  };
}

/**
 * Generate explanation for unknown/unfamiliar topics
 */
export function generateUnknownTopicExplanation(title: string): CardExplanation {
  return {
    explanation: `${title} might be something new to you - and that's totally okay! It's always cool to learn about new things.`,
    funFact: "Being curious about new things is one of the best ways to learn!",
    category: 'unknown',
  };
}

/**
 * Get explanation with fallback to unknown topic handler
 */
export function getExplanationForCard(
  card: GeneratedCard,
  enrichment?: EnrichmentData
): CardExplanation {
  try {
    return generateCardExplanation(card, enrichment);
  } catch {
    return generateUnknownTopicExplanation(card.title);
  }
}
