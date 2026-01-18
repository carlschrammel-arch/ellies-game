/**
 * Icon Selector Module
 * 
 * Provides deterministic icon selection based on card themes and categories.
 * Uses emoji icons that render consistently across devices.
 */

export interface CardIconConfig {
  icon: string;
  color: string;
  bgColor: string;
}

// Category to icon mappings
const categoryIcons: Record<string, CardIconConfig> = {
  // Animals
  animals: { icon: '🐾', color: '#8B4513', bgColor: '#FED7AA' },
  dogs: { icon: '🐕', color: '#A0522D', bgColor: '#FED7AA' },
  cats: { icon: '🐱', color: '#DDA0DD', bgColor: '#F3E8FF' },
  pets: { icon: '🐾', color: '#8B4513', bgColor: '#FED7AA' },
  horses: { icon: '🐴', color: '#8B4513', bgColor: '#FED7AA' },
  birds: { icon: '🐦', color: '#4169E1', bgColor: '#DBEAFE' },
  fish: { icon: '🐠', color: '#00CED1', bgColor: '#CFFAFE' },
  dinosaurs: { icon: '🦖', color: '#228B22', bgColor: '#D1FAE5' },
  pandas: { icon: '🐼', color: '#2D3748', bgColor: '#E2E8F0' },
  butterflies: { icon: '🦋', color: '#9333EA', bgColor: '#F3E8FF' },

  // Sports
  sports: { icon: '🏆', color: '#FFD700', bgColor: '#FEF9C3' },
  baseball: { icon: '⚾', color: '#DC2626', bgColor: '#FEE2E2' },
  basketball: { icon: '🏀', color: '#F97316', bgColor: '#FFEDD5' },
  soccer: { icon: '⚽', color: '#16A34A', bgColor: '#D1FAE5' },
  football: { icon: '🏈', color: '#92400E', bgColor: '#FED7AA' },
  tennis: { icon: '🎾', color: '#84CC16', bgColor: '#ECFCCB' },
  swimming: { icon: '🏊', color: '#0EA5E9', bgColor: '#E0F2FE' },
  gymnastics: { icon: '🤸', color: '#EC4899', bgColor: '#FCE7F3' },
  skateboarding: { icon: '🛹', color: '#7C3AED', bgColor: '#EDE9FE' },
  running: { icon: '🏃', color: '#3B82F6', bgColor: '#DBEAFE' },
  dancing: { icon: '💃', color: '#EC4899', bgColor: '#FCE7F3' },
  sportsplayer: { icon: '⭐', color: '#F59E0B', bgColor: '#FEF3C7' },

  // Beauty
  beauty: { icon: '✨', color: '#EC4899', bgColor: '#FCE7F3' },
  nails: { icon: '💅', color: '#EC4899', bgColor: '#FCE7F3' },
  makeup: { icon: '💄', color: '#E11D48', bgColor: '#FFE4E6' },

  // Food
  food: { icon: '🍕', color: '#F97316', bgColor: '#FFEDD5' },
  foodtreats: { icon: '🍰', color: '#EC4899', bgColor: '#FCE7F3' },
  pizza: { icon: '🍕', color: '#F97316', bgColor: '#FFEDD5' },
  icecream: { icon: '🍦', color: '#F472B6', bgColor: '#FCE7F3' },
  chocolate: { icon: '🍫', color: '#78350F', bgColor: '#FED7AA' },
  cookies: { icon: '🍪', color: '#D97706', bgColor: '#FEF3C7' },
  sushi: { icon: '🍣', color: '#EF4444', bgColor: '#FEE2E2' },
  tacos: { icon: '🌮', color: '#F59E0B', bgColor: '#FEF3C7' },

  // Games
  videogames: { icon: '🎮', color: '#7C3AED', bgColor: '#EDE9FE' },
  games: { icon: '🎮', color: '#7C3AED', bgColor: '#EDE9FE' },
  minecraft: { icon: '⛏️', color: '#16A34A', bgColor: '#D1FAE5' },
  roblox: { icon: '🎲', color: '#EF4444', bgColor: '#FEE2E2' },
  pokemon: { icon: '⚡', color: '#EAB308', bgColor: '#FEF9C3' },
  mario: { icon: '🍄', color: '#EF4444', bgColor: '#FEE2E2' },
  fortnite: { icon: '🔫', color: '#8B5CF6', bgColor: '#EDE9FE' },

  // Music
  music: { icon: '🎵', color: '#EC4899', bgColor: '#FCE7F3' },
  piano: { icon: '🎹', color: '#1F2937', bgColor: '#F3F4F6' },
  guitar: { icon: '🎸', color: '#B45309', bgColor: '#FED7AA' },
  drums: { icon: '🥁', color: '#DC2626', bgColor: '#FEE2E2' },
  singing: { icon: '🎤', color: '#8B5CF6', bgColor: '#EDE9FE' },

  // Art & Crafts
  crafts: { icon: '🎨', color: '#EC4899', bgColor: '#FCE7F3' },
  artcrafts: { icon: '🎨', color: '#EC4899', bgColor: '#FCE7F3' },
  painting: { icon: '🖼️', color: '#3B82F6', bgColor: '#DBEAFE' },
  drawing: { icon: '✏️', color: '#F59E0B', bgColor: '#FEF3C7' },

  // Movies & TV
  movies: { icon: '🎬', color: '#EF4444', bgColor: '#FEE2E2' },
  moviestv: { icon: '📺', color: '#3B82F6', bgColor: '#DBEAFE' },

  // Outdoors
  outdoors: { icon: '🌲', color: '#16A34A', bgColor: '#D1FAE5' },
  nature: { icon: '🌿', color: '#22C55E', bgColor: '#DCFCE7' },
  beach: { icon: '🏖️', color: '#F59E0B', bgColor: '#FEF3C7' },
  mountains: { icon: '⛰️', color: '#6B7280', bgColor: '#F3F4F6' },
  forest: { icon: '🌳', color: '#16A34A', bgColor: '#D1FAE5' },
  space: { icon: '🚀', color: '#1D4ED8', bgColor: '#DBEAFE' },

  // Technology
  tech: { icon: '💻', color: '#6366F1', bgColor: '#E0E7FF' },
  technology: { icon: '🤖', color: '#6366F1', bgColor: '#E0E7FF' },
  robots: { icon: '🤖', color: '#64748B', bgColor: '#F1F5F9' },

  // Fantasy
  fantasy: { icon: '🐉', color: '#7C3AED', bgColor: '#EDE9FE' },
  magic: { icon: '✨', color: '#A855F7', bgColor: '#F3E8FF' },

  // Vehicles
  cars: { icon: '🚗', color: '#EF4444', bgColor: '#FEE2E2' },
  vehicles: { icon: '🚀', color: '#3B82F6', bgColor: '#DBEAFE' },

  // Colors
  colors: { icon: '🌈', color: '#EC4899', bgColor: '#FCE7F3' },
  rainbow: { icon: '🌈', color: '#EC4899', bgColor: '#FCE7F3' },
  blue: { icon: '💙', color: '#3B82F6', bgColor: '#DBEAFE' },
  red: { icon: '❤️', color: '#EF4444', bgColor: '#FEE2E2' },
  green: { icon: '💚', color: '#22C55E', bgColor: '#DCFCE7' },
  purple: { icon: '💜', color: '#A855F7', bgColor: '#F3E8FF' },
  pink: { icon: '💗', color: '#EC4899', bgColor: '#FCE7F3' },
  yellow: { icon: '💛', color: '#EAB308', bgColor: '#FEF9C3' },

  // Misc
  cute: { icon: '🥰', color: '#EC4899', bgColor: '#FCE7F3' },
  fashion: { icon: '👗', color: '#EC4899', bgColor: '#FCE7F3' },
  books: { icon: '📚', color: '#8B5CF6', bgColor: '#EDE9FE' },
  collecting: { icon: '🏅', color: '#F59E0B', bgColor: '#FEF3C7' },
  puzzles: { icon: '🧩', color: '#6366F1', bgColor: '#E0E7FF' },
  youtubers: { icon: '▶️', color: '#EF4444', bgColor: '#FEE2E2' },
  lego: { icon: '🧱', color: '#EF4444', bgColor: '#FEE2E2' },

  // Default
  other: { icon: '⭐', color: '#F59E0B', bgColor: '#FEF3C7' },
};

// Keyword to icon overrides for more specific matching
const keywordIconOverrides: Array<{
  keywords: string[];
  config: CardIconConfig;
}> = [
  // Specific sports
  { keywords: ['baseball', 'pitcher', 'batter', 'outfielder', 'mlb'], config: { icon: '⚾', color: '#DC2626', bgColor: '#FEE2E2' } },
  { keywords: ['basketball', 'dunk', 'nba', 'wnba'], config: { icon: '🏀', color: '#F97316', bgColor: '#FFEDD5' } },
  { keywords: ['soccer', 'goal kick', 'fifa'], config: { icon: '⚽', color: '#16A34A', bgColor: '#D1FAE5' } },
  { keywords: ['football', 'touchdown', 'nfl', 'quarterback'], config: { icon: '🏈', color: '#92400E', bgColor: '#FED7AA' } },
  { keywords: ['hockey', 'puck', 'nhl'], config: { icon: '🏒', color: '#1F2937', bgColor: '#F3F4F6' } },
  { keywords: ['tennis', 'racket', 'serve'], config: { icon: '🎾', color: '#84CC16', bgColor: '#ECFCCB' } },
  { keywords: ['volleyball'], config: { icon: '🏐', color: '#FBBF24', bgColor: '#FEF3C7' } },
  { keywords: ['golf'], config: { icon: '⛳', color: '#16A34A', bgColor: '#D1FAE5' } },
  { keywords: ['swimming', 'swim', 'pool'], config: { icon: '🏊', color: '#0EA5E9', bgColor: '#E0F2FE' } },
  { keywords: ['skateboard', 'skate'], config: { icon: '🛹', color: '#7C3AED', bgColor: '#EDE9FE' } },
  { keywords: ['snowboard', 'skiing', 'ski'], config: { icon: '🎿', color: '#0EA5E9', bgColor: '#E0F2FE' } },
  { keywords: ['surfing', 'surf'], config: { icon: '🏄', color: '#0EA5E9', bgColor: '#E0F2FE' } },
  { keywords: ['gymnastics', 'gymnast', 'tumbling'], config: { icon: '🤸', color: '#EC4899', bgColor: '#FCE7F3' } },
  { keywords: ['dance', 'dancing', 'ballet'], config: { icon: '💃', color: '#EC4899', bgColor: '#FCE7F3' } },
  { keywords: ['cheerleading', 'cheer'], config: { icon: '📣', color: '#EC4899', bgColor: '#FCE7F3' } },
  { keywords: ['running', 'track', 'marathon'], config: { icon: '🏃', color: '#3B82F6', bgColor: '#DBEAFE' } },
  { keywords: ['wrestling'], config: { icon: '🤼', color: '#B45309', bgColor: '#FED7AA' } },
  { keywords: ['boxing', 'mma'], config: { icon: '🥊', color: '#EF4444', bgColor: '#FEE2E2' } },

  // Nail-specific
  { keywords: ['nail', 'manicure', 'polish'], config: { icon: '💅', color: '#EC4899', bgColor: '#FCE7F3' } },
  { keywords: ['glitter nail', 'sparkle nail'], config: { icon: '✨', color: '#EC4899', bgColor: '#FCE7F3' } },
  { keywords: ['french tip'], config: { icon: '💅', color: '#F9A8D4', bgColor: '#FCE7F3' } },
  { keywords: ['press-on', 'press on'], config: { icon: '💅', color: '#A855F7', bgColor: '#F3E8FF' } },
  { keywords: ['nail art', 'nail design'], config: { icon: '🎨', color: '#EC4899', bgColor: '#FCE7F3' } },

  // Makeup-specific
  { keywords: ['lip gloss', 'lipgloss', 'lipstick', 'lip'], config: { icon: '💋', color: '#E11D48', bgColor: '#FFE4E6' } },
  { keywords: ['eyeshadow', 'eye shadow'], config: { icon: '👁️', color: '#8B5CF6', bgColor: '#EDE9FE' } },
  { keywords: ['mascara', 'lashes', 'eyelash'], config: { icon: '👁️', color: '#1F2937', bgColor: '#F3F4F6' } },
  { keywords: ['blush', 'cheeks', 'rouge'], config: { icon: '😊', color: '#EC4899', bgColor: '#FCE7F3' } },
  { keywords: ['makeup', 'cosmetic'], config: { icon: '💄', color: '#E11D48', bgColor: '#FFE4E6' } },

  // Dogs - specific breeds
  { keywords: ['golden retriever', 'retriever'], config: { icon: '🐕', color: '#D97706', bgColor: '#FEF3C7' } },
  { keywords: ['german shepherd', 'shepherd'], config: { icon: '🐕‍🦺', color: '#78350F', bgColor: '#FED7AA' } },
  { keywords: ['husky', 'siberian'], config: { icon: '🐺', color: '#6B7280', bgColor: '#F3F4F6' } },
  { keywords: ['corgi'], config: { icon: '🐕', color: '#F97316', bgColor: '#FFEDD5' } },
  { keywords: ['poodle'], config: { icon: '🐩', color: '#EC4899', bgColor: '#FCE7F3' } },
  { keywords: ['bulldog', 'frenchie'], config: { icon: '🐕', color: '#78350F', bgColor: '#FED7AA' } },
  { keywords: ['beagle'], config: { icon: '🐕', color: '#92400E', bgColor: '#FED7AA' } },
  { keywords: ['labrador', 'lab '], config: { icon: '🐕', color: '#78350F', bgColor: '#FED7AA' } },
  { keywords: ['puppy', 'puppies'], config: { icon: '🐶', color: '#A0522D', bgColor: '#FED7AA' } },
  { keywords: ['dog', 'doggy', 'pup'], config: { icon: '🐕', color: '#A0522D', bgColor: '#FED7AA' } },

  // Cats - specific breeds
  { keywords: ['maine coon'], config: { icon: '🐱', color: '#92400E', bgColor: '#FED7AA' } },
  { keywords: ['siamese'], config: { icon: '🐱', color: '#D4A574', bgColor: '#FEF3C7' } },
  { keywords: ['persian'], config: { icon: '🐱', color: '#F3F4F6', bgColor: '#E2E8F0' } },
  { keywords: ['tabby'], config: { icon: '🐱', color: '#F97316', bgColor: '#FFEDD5' } },
  { keywords: ['kitten', 'kitty'], config: { icon: '🐱', color: '#DDA0DD', bgColor: '#F3E8FF' } },
  { keywords: ['cat', 'kitty'], config: { icon: '🐱', color: '#DDA0DD', bgColor: '#F3E8FF' } },

  // Other animals
  { keywords: ['bunny', 'rabbit'], config: { icon: '🐰', color: '#F9A8D4', bgColor: '#FCE7F3' } },
  { keywords: ['hamster', 'guinea pig'], config: { icon: '🐹', color: '#F97316', bgColor: '#FFEDD5' } },
  { keywords: ['horse', 'pony'], config: { icon: '🐴', color: '#8B4513', bgColor: '#FED7AA' } },
  { keywords: ['unicorn'], config: { icon: '🦄', color: '#EC4899', bgColor: '#FCE7F3' } },
  { keywords: ['dragon'], config: { icon: '🐉', color: '#DC2626', bgColor: '#FEE2E2' } },
  { keywords: ['dinosaur', 't-rex', 'trex', 'dino'], config: { icon: '🦖', color: '#16A34A', bgColor: '#D1FAE5' } },
  { keywords: ['shark'], config: { icon: '🦈', color: '#6B7280', bgColor: '#F3F4F6' } },
  { keywords: ['whale', 'orca'], config: { icon: '🐋', color: '#3B82F6', bgColor: '#DBEAFE' } },
  { keywords: ['dolphin'], config: { icon: '🐬', color: '#0EA5E9', bgColor: '#E0F2FE' } },
  { keywords: ['fish', 'goldfish', 'tropical'], config: { icon: '🐠', color: '#F97316', bgColor: '#FFEDD5' } },
  { keywords: ['turtle', 'tortoise'], config: { icon: '🐢', color: '#16A34A', bgColor: '#D1FAE5' } },
  { keywords: ['frog', 'toad'], config: { icon: '🐸', color: '#22C55E', bgColor: '#DCFCE7' } },
  { keywords: ['snake'], config: { icon: '🐍', color: '#16A34A', bgColor: '#D1FAE5' } },
  { keywords: ['bird', 'parrot', 'parakeet'], config: { icon: '🐦', color: '#3B82F6', bgColor: '#DBEAFE' } },
  { keywords: ['owl'], config: { icon: '🦉', color: '#78350F', bgColor: '#FED7AA' } },
  { keywords: ['penguin'], config: { icon: '🐧', color: '#1F2937', bgColor: '#F3F4F6' } },
  { keywords: ['flamingo'], config: { icon: '🦩', color: '#EC4899', bgColor: '#FCE7F3' } },
  { keywords: ['butterfly', 'butterflies'], config: { icon: '🦋', color: '#A855F7', bgColor: '#F3E8FF' } },
  { keywords: ['bee', 'bumblebee'], config: { icon: '🐝', color: '#EAB308', bgColor: '#FEF9C3' } },
  { keywords: ['ladybug'], config: { icon: '🐞', color: '#EF4444', bgColor: '#FEE2E2' } },
  { keywords: ['panda'], config: { icon: '🐼', color: '#1F2937', bgColor: '#F3F4F6' } },
  { keywords: ['koala'], config: { icon: '🐨', color: '#6B7280', bgColor: '#F3F4F6' } },
  { keywords: ['bear', 'teddy'], config: { icon: '🐻', color: '#92400E', bgColor: '#FED7AA' } },
  { keywords: ['lion'], config: { icon: '🦁', color: '#F59E0B', bgColor: '#FEF3C7' } },
  { keywords: ['tiger'], config: { icon: '🐯', color: '#F97316', bgColor: '#FFEDD5' } },
  { keywords: ['elephant'], config: { icon: '🐘', color: '#6B7280', bgColor: '#F3F4F6' } },
  { keywords: ['monkey', 'chimp'], config: { icon: '🐵', color: '#92400E', bgColor: '#FED7AA' } },
  { keywords: ['fox'], config: { icon: '🦊', color: '#F97316', bgColor: '#FFEDD5' } },
  { keywords: ['wolf'], config: { icon: '🐺', color: '#6B7280', bgColor: '#F3F4F6' } },
  { keywords: ['deer', 'reindeer'], config: { icon: '🦌', color: '#92400E', bgColor: '#FED7AA' } },
  { keywords: ['cow'], config: { icon: '🐄', color: '#1F2937', bgColor: '#F3F4F6' } },
  { keywords: ['pig'], config: { icon: '🐷', color: '#F9A8D4', bgColor: '#FCE7F3' } },
  { keywords: ['sheep', 'lamb'], config: { icon: '🐑', color: '#F3F4F6', bgColor: '#E2E8F0' } },
  { keywords: ['chicken'], config: { icon: '🐔', color: '#EF4444', bgColor: '#FEE2E2' } },
  { keywords: ['duck'], config: { icon: '🦆', color: '#22C55E', bgColor: '#DCFCE7' } },
  { keywords: ['octopus'], config: { icon: '🐙', color: '#EC4899', bgColor: '#FCE7F3' } },
  { keywords: ['crab'], config: { icon: '🦀', color: '#EF4444', bgColor: '#FEE2E2' } },
  { keywords: ['jellyfish'], config: { icon: '🪼', color: '#A855F7', bgColor: '#F3E8FF' } },
  { keywords: ['starfish'], config: { icon: '⭐', color: '#F59E0B', bgColor: '#FEF3C7' } },
  { keywords: ['snail'], config: { icon: '🐌', color: '#92400E', bgColor: '#FED7AA' } },

  // Food-specific
  { keywords: ['ice cream', 'icecream', 'sundae', 'gelato'], config: { icon: '🍦', color: '#F472B6', bgColor: '#FCE7F3' } },
  { keywords: ['pizza'], config: { icon: '🍕', color: '#F97316', bgColor: '#FFEDD5' } },
  { keywords: ['hamburger', 'burger', 'cheeseburger'], config: { icon: '🍔', color: '#F59E0B', bgColor: '#FEF3C7' } },
  { keywords: ['hot dog', 'hotdog'], config: { icon: '🌭', color: '#F97316', bgColor: '#FFEDD5' } },
  { keywords: ['taco', 'burrito', 'nacho', 'mexican'], config: { icon: '🌮', color: '#F59E0B', bgColor: '#FEF3C7' } },
  { keywords: ['cookie', 'cookies'], config: { icon: '🍪', color: '#D97706', bgColor: '#FEF3C7' } },
  { keywords: ['cake', 'birthday cake'], config: { icon: '🎂', color: '#EC4899', bgColor: '#FCE7F3' } },
  { keywords: ['cupcake'], config: { icon: '🧁', color: '#EC4899', bgColor: '#FCE7F3' } },
  { keywords: ['donut', 'doughnut'], config: { icon: '🍩', color: '#F472B6', bgColor: '#FCE7F3' } },
  { keywords: ['candy', 'gummy', 'sweets'], config: { icon: '🍬', color: '#EC4899', bgColor: '#FCE7F3' } },
  { keywords: ['chocolate'], config: { icon: '🍫', color: '#78350F', bgColor: '#FED7AA' } },
  { keywords: ['lollipop'], config: { icon: '🍭', color: '#EC4899', bgColor: '#FCE7F3' } },
  { keywords: ['popcorn'], config: { icon: '🍿', color: '#F59E0B', bgColor: '#FEF3C7' } },
  { keywords: ['french fries', 'fries'], config: { icon: '🍟', color: '#F59E0B', bgColor: '#FEF3C7' } },
  { keywords: ['chicken nugget', 'nugget'], config: { icon: '🍗', color: '#D97706', bgColor: '#FEF3C7' } },
  { keywords: ['sushi', 'sashimi'], config: { icon: '🍣', color: '#EF4444', bgColor: '#FEE2E2' } },
  { keywords: ['noodle', 'ramen', 'pasta', 'spaghetti'], config: { icon: '🍝', color: '#F97316', bgColor: '#FFEDD5' } },
  { keywords: ['sandwich', 'sub'], config: { icon: '🥪', color: '#D97706', bgColor: '#FEF3C7' } },
  { keywords: ['salad'], config: { icon: '🥗', color: '#22C55E', bgColor: '#DCFCE7' } },
  { keywords: ['soup'], config: { icon: '🍲', color: '#F97316', bgColor: '#FFEDD5' } },
  { keywords: ['mac and cheese', 'mac & cheese'], config: { icon: '🧀', color: '#F59E0B', bgColor: '#FEF3C7' } },
  { keywords: ['pancake', 'waffle'], config: { icon: '🥞', color: '#D97706', bgColor: '#FEF3C7' } },
  { keywords: ['fruit', 'apple'], config: { icon: '🍎', color: '#EF4444', bgColor: '#FEE2E2' } },
  { keywords: ['banana'], config: { icon: '🍌', color: '#EAB308', bgColor: '#FEF9C3' } },
  { keywords: ['strawberry', 'berry'], config: { icon: '🍓', color: '#EF4444', bgColor: '#FEE2E2' } },
  { keywords: ['watermelon', 'melon'], config: { icon: '🍉', color: '#16A34A', bgColor: '#D1FAE5' } },
  { keywords: ['orange'], config: { icon: '🍊', color: '#F97316', bgColor: '#FFEDD5' } },
  { keywords: ['grape'], config: { icon: '🍇', color: '#7C3AED', bgColor: '#EDE9FE' } },
  { keywords: ['pineapple'], config: { icon: '🍍', color: '#EAB308', bgColor: '#FEF9C3' } },
  { keywords: ['cherry', 'cherries'], config: { icon: '🍒', color: '#EF4444', bgColor: '#FEE2E2' } },
  { keywords: ['peach'], config: { icon: '🍑', color: '#F97316', bgColor: '#FFEDD5' } },
  { keywords: ['lemon'], config: { icon: '🍋', color: '#EAB308', bgColor: '#FEF9C3' } },
  { keywords: ['avocado'], config: { icon: '🥑', color: '#22C55E', bgColor: '#DCFCE7' } },
  { keywords: ['corn'], config: { icon: '🌽', color: '#EAB308', bgColor: '#FEF9C3' } },
  { keywords: ['carrot'], config: { icon: '🥕', color: '#F97316', bgColor: '#FFEDD5' } },
  { keywords: ['broccoli'], config: { icon: '🥦', color: '#22C55E', bgColor: '#DCFCE7' } },
  { keywords: ['bread'], config: { icon: '🍞', color: '#D97706', bgColor: '#FEF3C7' } },
  { keywords: ['pretzel'], config: { icon: '🥨', color: '#92400E', bgColor: '#FED7AA' } },
  { keywords: ['cheese'], config: { icon: '🧀', color: '#F59E0B', bgColor: '#FEF3C7' } },
  { keywords: ['egg'], config: { icon: '🥚', color: '#FEF3C7', bgColor: '#FFFBEB' } },
  { keywords: ['bacon'], config: { icon: '🥓', color: '#EF4444', bgColor: '#FEE2E2' } },
  { keywords: ['shrimp', 'prawn'], config: { icon: '🦐', color: '#F97316', bgColor: '#FFEDD5' } },
  { keywords: ['pie'], config: { icon: '🥧', color: '#D97706', bgColor: '#FEF3C7' } },
  { keywords: ['brownie'], config: { icon: '🟫', color: '#78350F', bgColor: '#FED7AA' } },

  // Drinks
  { keywords: ['smoothie', 'milkshake'], config: { icon: '🥤', color: '#EC4899', bgColor: '#FCE7F3' } },
  { keywords: ['juice'], config: { icon: '🧃', color: '#F97316', bgColor: '#FFEDD5' } },
  { keywords: ['hot chocolate', 'cocoa'], config: { icon: '☕', color: '#78350F', bgColor: '#FED7AA' } },
  { keywords: ['lemonade'], config: { icon: '🍋', color: '#EAB308', bgColor: '#FEF9C3' } },
  { keywords: ['boba', 'bubble tea'], config: { icon: '🧋', color: '#78350F', bgColor: '#FED7AA' } },

  // Games-specific
  { keywords: ['minecraft', 'creeper', 'pickaxe', 'steve'], config: { icon: '⛏️', color: '#16A34A', bgColor: '#D1FAE5' } },
  { keywords: ['pokemon', 'pikachu', 'pokeball', 'eevee'], config: { icon: '⚡', color: '#EAB308', bgColor: '#FEF9C3' } },
  { keywords: ['roblox', 'robux'], config: { icon: '🎲', color: '#EF4444', bgColor: '#FEE2E2' } },
  { keywords: ['mario', 'luigi', 'mushroom', 'nintendo'], config: { icon: '🍄', color: '#EF4444', bgColor: '#FEE2E2' } },
  { keywords: ['fortnite', 'battle royale'], config: { icon: '🎯', color: '#8B5CF6', bgColor: '#EDE9FE' } },
  { keywords: ['zelda', 'link', 'hyrule'], config: { icon: '🗡️', color: '#16A34A', bgColor: '#D1FAE5' } },
  { keywords: ['sonic', 'hedgehog'], config: { icon: '💨', color: '#3B82F6', bgColor: '#DBEAFE' } },
  { keywords: ['among us', 'impostor'], config: { icon: '🛸', color: '#EF4444', bgColor: '#FEE2E2' } },
  { keywords: ['animal crossing'], config: { icon: '🏝️', color: '#22C55E', bgColor: '#DCFCE7' } },
  { keywords: ['splatoon'], config: { icon: '🦑', color: '#F97316', bgColor: '#FFEDD5' } },
  { keywords: ['lego'], config: { icon: '🧱', color: '#EF4444', bgColor: '#FEE2E2' } },
  { keywords: ['board game'], config: { icon: '🎲', color: '#8B5CF6', bgColor: '#EDE9FE' } },
  { keywords: ['puzzle'], config: { icon: '🧩', color: '#3B82F6', bgColor: '#DBEAFE' } },
  { keywords: ['card game'], config: { icon: '🃏', color: '#EF4444', bgColor: '#FEE2E2' } },
  { keywords: ['video game', 'gaming'], config: { icon: '🎮', color: '#8B5CF6', bgColor: '#EDE9FE' } },
  { keywords: ['controller', 'xbox', 'playstation', 'ps5'], config: { icon: '🎮', color: '#1F2937', bgColor: '#F3F4F6' } },
  { keywords: ['vr', 'virtual reality'], config: { icon: '🥽', color: '#1F2937', bgColor: '#F3F4F6' } },

  // Music-specific
  { keywords: ['piano'], config: { icon: '🎹', color: '#1F2937', bgColor: '#F3F4F6' } },
  { keywords: ['guitar', 'acoustic'], config: { icon: '🎸', color: '#B45309', bgColor: '#FED7AA' } },
  { keywords: ['drum', 'drums'], config: { icon: '🥁', color: '#DC2626', bgColor: '#FEE2E2' } },
  { keywords: ['violin', 'cello'], config: { icon: '🎻', color: '#92400E', bgColor: '#FED7AA' } },
  { keywords: ['trumpet', 'horn'], config: { icon: '🎺', color: '#F59E0B', bgColor: '#FEF3C7' } },
  { keywords: ['flute'], config: { icon: '🪈', color: '#A0A0A0', bgColor: '#F3F4F6' } },
  { keywords: ['singing', 'singer', 'karaoke'], config: { icon: '🎤', color: '#EC4899', bgColor: '#FCE7F3' } },
  { keywords: ['concert', 'live music'], config: { icon: '🎵', color: '#A855F7', bgColor: '#F3E8FF' } },
  { keywords: ['headphones', 'music'], config: { icon: '🎧', color: '#8B5CF6', bgColor: '#EDE9FE' } },
  { keywords: ['pop music', 'pop star'], config: { icon: '⭐', color: '#EC4899', bgColor: '#FCE7F3' } },
  { keywords: ['rock music', 'rock band'], config: { icon: '🤘', color: '#1F2937', bgColor: '#F3F4F6' } },
  { keywords: ['hip hop', 'rap'], config: { icon: '🎤', color: '#8B5CF6', bgColor: '#EDE9FE' } },
  { keywords: ['taylor swift'], config: { icon: '💖', color: '#EC4899', bgColor: '#FCE7F3' } },

  // Space
  { keywords: ['rocket', 'spaceship'], config: { icon: '🚀', color: '#1D4ED8', bgColor: '#DBEAFE' } },
  { keywords: ['astronaut', 'space'], config: { icon: '👨‍🚀', color: '#F3F4F6', bgColor: '#E2E8F0' } },
  { keywords: ['moon', 'lunar'], config: { icon: '🌙', color: '#6B7280', bgColor: '#F3F4F6' } },
  { keywords: ['star', 'stars'], config: { icon: '⭐', color: '#F59E0B', bgColor: '#FEF3C7' } },
  { keywords: ['planet', 'saturn', 'mars', 'jupiter'], config: { icon: '🪐', color: '#D97706', bgColor: '#FED7AA' } },
  { keywords: ['sun', 'solar'], config: { icon: '☀️', color: '#F59E0B', bgColor: '#FEF3C7' } },
  { keywords: ['galaxy', 'milky way'], config: { icon: '🌌', color: '#7C3AED', bgColor: '#EDE9FE' } },
  { keywords: ['alien', 'ufo'], config: { icon: '👽', color: '#22C55E', bgColor: '#DCFCE7' } },
  { keywords: ['comet', 'meteor'], config: { icon: '☄️', color: '#F97316', bgColor: '#FFEDD5' } },

  // Nature/Outdoors
  { keywords: ['flower', 'rose', 'tulip', 'daisy'], config: { icon: '🌸', color: '#EC4899', bgColor: '#FCE7F3' } },
  { keywords: ['sunflower'], config: { icon: '🌻', color: '#EAB308', bgColor: '#FEF9C3' } },
  { keywords: ['tree', 'forest'], config: { icon: '🌲', color: '#16A34A', bgColor: '#D1FAE5' } },
  { keywords: ['plant', 'cactus'], config: { icon: '🌵', color: '#22C55E', bgColor: '#DCFCE7' } },
  { keywords: ['rainbow'], config: { icon: '🌈', color: '#EC4899', bgColor: '#FCE7F3' } },
  { keywords: ['beach', 'ocean', 'sea'], config: { icon: '🏖️', color: '#F59E0B', bgColor: '#FEF3C7' } },
  { keywords: ['mountain', 'hiking'], config: { icon: '⛰️', color: '#6B7280', bgColor: '#F3F4F6' } },
  { keywords: ['camping', 'tent'], config: { icon: '⛺', color: '#22C55E', bgColor: '#DCFCE7' } },
  { keywords: ['waterfall'], config: { icon: '💧', color: '#0EA5E9', bgColor: '#E0F2FE' } },
  { keywords: ['volcano'], config: { icon: '🌋', color: '#EF4444', bgColor: '#FEE2E2' } },
  { keywords: ['island'], config: { icon: '🏝️', color: '#22C55E', bgColor: '#DCFCE7' } },
  { keywords: ['snow', 'snowflake', 'winter'], config: { icon: '❄️', color: '#0EA5E9', bgColor: '#E0F2FE' } },
  { keywords: ['rain', 'rainy'], config: { icon: '🌧️', color: '#6B7280', bgColor: '#F3F4F6' } },
  { keywords: ['cloud'], config: { icon: '☁️', color: '#E2E8F0', bgColor: '#F8FAFC' } },
  { keywords: ['lightning', 'thunder', 'storm'], config: { icon: '⚡', color: '#EAB308', bgColor: '#FEF9C3' } },
  { keywords: ['leaf', 'leaves', 'autumn', 'fall'], config: { icon: '🍂', color: '#F97316', bgColor: '#FFEDD5' } },

  // Art & Crafts
  { keywords: ['paint', 'painting', 'art'], config: { icon: '🎨', color: '#EC4899', bgColor: '#FCE7F3' } },
  { keywords: ['draw', 'drawing', 'sketch'], config: { icon: '✏️', color: '#F59E0B', bgColor: '#FEF3C7' } },
  { keywords: ['craft', 'crafts', 'diy'], config: { icon: '✂️', color: '#EF4444', bgColor: '#FEE2E2' } },
  { keywords: ['slime', 'squishy'], config: { icon: '🟢', color: '#22C55E', bgColor: '#DCFCE7' } },
  { keywords: ['clay', 'pottery'], config: { icon: '🏺', color: '#92400E', bgColor: '#FED7AA' } },
  { keywords: ['origami', 'paper'], config: { icon: '📄', color: '#F3F4F6', bgColor: '#E2E8F0' } },
  { keywords: ['knitting', 'crochet', 'yarn'], config: { icon: '🧶', color: '#EC4899', bgColor: '#FCE7F3' } },
  { keywords: ['jewelry', 'bracelet', 'necklace', 'beads'], config: { icon: '💎', color: '#0EA5E9', bgColor: '#E0F2FE' } },
  { keywords: ['sticker', 'stickers'], config: { icon: '⭐', color: '#EC4899', bgColor: '#FCE7F3' } },
  { keywords: ['glitter', 'sparkle', 'sparkly'], config: { icon: '✨', color: '#F59E0B', bgColor: '#FEF3C7' } },

  // Movies/TV
  { keywords: ['movie', 'film', 'cinema'], config: { icon: '🎬', color: '#EF4444', bgColor: '#FEE2E2' } },
  { keywords: ['cartoon', 'animation'], config: { icon: '📺', color: '#3B82F6', bgColor: '#DBEAFE' } },
  { keywords: ['disney', 'princess'], config: { icon: '👑', color: '#F59E0B', bgColor: '#FEF3C7' } },
  { keywords: ['pixar'], config: { icon: '🎬', color: '#16A34A', bgColor: '#D1FAE5' } },
  { keywords: ['marvel', 'superhero', 'avenger'], config: { icon: '🦸', color: '#EF4444', bgColor: '#FEE2E2' } },
  { keywords: ['star wars'], config: { icon: '⚔️', color: '#1F2937', bgColor: '#F3F4F6' } },
  { keywords: ['harry potter', 'wizard', 'magic'], config: { icon: '🪄', color: '#7C3AED', bgColor: '#EDE9FE' } },
  { keywords: ['frozen', 'elsa'], config: { icon: '❄️', color: '#0EA5E9', bgColor: '#E0F2FE' } },
  { keywords: ['moana'], config: { icon: '🌊', color: '#0EA5E9', bgColor: '#E0F2FE' } },
  { keywords: ['encanto', 'mirabel'], config: { icon: '🦋', color: '#16A34A', bgColor: '#D1FAE5' } },
  { keywords: ['minion'], config: { icon: '🟡', color: '#EAB308', bgColor: '#FEF9C3' } },
  { keywords: ['spongebob'], config: { icon: '🧽', color: '#EAB308', bgColor: '#FEF9C3' } },
  { keywords: ['paw patrol'], config: { icon: '🐕', color: '#3B82F6', bgColor: '#DBEAFE' } },
  { keywords: ['bluey'], config: { icon: '🐕', color: '#3B82F6', bgColor: '#DBEAFE' } },
  { keywords: ['peppa pig'], config: { icon: '🐷', color: '#F9A8D4', bgColor: '#FCE7F3' } },

  // Vehicles
  { keywords: ['car', 'race car', 'racing'], config: { icon: '🚗', color: '#EF4444', bgColor: '#FEE2E2' } },
  { keywords: ['truck', 'monster truck'], config: { icon: '🚚', color: '#3B82F6', bgColor: '#DBEAFE' } },
  { keywords: ['train', 'railroad'], config: { icon: '🚂', color: '#1F2937', bgColor: '#F3F4F6' } },
  { keywords: ['airplane', 'plane', 'flying'], config: { icon: '✈️', color: '#3B82F6', bgColor: '#DBEAFE' } },
  { keywords: ['helicopter'], config: { icon: '🚁', color: '#6B7280', bgColor: '#F3F4F6' } },
  { keywords: ['boat', 'ship', 'sailing'], config: { icon: '⛵', color: '#0EA5E9', bgColor: '#E0F2FE' } },
  { keywords: ['motorcycle', 'motorbike'], config: { icon: '🏍️', color: '#EF4444', bgColor: '#FEE2E2' } },
  { keywords: ['bicycle', 'bike', 'cycling'], config: { icon: '🚲', color: '#22C55E', bgColor: '#DCFCE7' } },
  { keywords: ['scooter'], config: { icon: '🛴', color: '#8B5CF6', bgColor: '#EDE9FE' } },
  { keywords: ['roller skate', 'roller blade', 'skating'], config: { icon: '⛸️', color: '#EC4899', bgColor: '#FCE7F3' } },
  { keywords: ['fire truck', 'firetruck'], config: { icon: '🚒', color: '#EF4444', bgColor: '#FEE2E2' } },
  { keywords: ['ambulance'], config: { icon: '🚑', color: '#F3F4F6', bgColor: '#E2E8F0' } },
  { keywords: ['police', 'cop car'], config: { icon: '🚓', color: '#3B82F6', bgColor: '#DBEAFE' } },
  { keywords: ['bus'], config: { icon: '🚌', color: '#EAB308', bgColor: '#FEF9C3' } },
  { keywords: ['tractor', 'farm'], config: { icon: '🚜', color: '#22C55E', bgColor: '#DCFCE7' } },

  // Tech
  { keywords: ['robot', 'robots'], config: { icon: '🤖', color: '#6B7280', bgColor: '#F3F4F6' } },
  { keywords: ['computer', 'laptop', 'pc'], config: { icon: '💻', color: '#6B7280', bgColor: '#F3F4F6' } },
  { keywords: ['phone', 'tablet', 'ipad'], config: { icon: '📱', color: '#1F2937', bgColor: '#F3F4F6' } },
  { keywords: ['camera', 'photo'], config: { icon: '📷', color: '#1F2937', bgColor: '#F3F4F6' } },
  { keywords: ['tv', 'television'], config: { icon: '📺', color: '#1F2937', bgColor: '#F3F4F6' } },
  { keywords: ['ai', 'artificial intelligence'], config: { icon: '🧠', color: '#EC4899', bgColor: '#FCE7F3' } },
  { keywords: ['coding', 'programming', 'code'], config: { icon: '👨‍💻', color: '#16A34A', bgColor: '#D1FAE5' } },

  // Fantasy & Magic
  { keywords: ['fairy', 'fairies'], config: { icon: '🧚', color: '#EC4899', bgColor: '#FCE7F3' } },
  { keywords: ['mermaid'], config: { icon: '🧜‍♀️', color: '#0EA5E9', bgColor: '#E0F2FE' } },
  { keywords: ['vampire'], config: { icon: '🧛', color: '#7C3AED', bgColor: '#EDE9FE' } },
  { keywords: ['ghost', 'spooky'], config: { icon: '👻', color: '#F3F4F6', bgColor: '#E2E8F0' } },
  { keywords: ['witch'], config: { icon: '🧙‍♀️', color: '#7C3AED', bgColor: '#EDE9FE' } },
  { keywords: ['castle', 'palace'], config: { icon: '🏰', color: '#6B7280', bgColor: '#F3F4F6' } },
  { keywords: ['treasure', 'gold', 'pirate'], config: { icon: '💰', color: '#F59E0B', bgColor: '#FEF3C7' } },
  { keywords: ['crown', 'royal', 'king', 'queen'], config: { icon: '👑', color: '#F59E0B', bgColor: '#FEF3C7' } },
  { keywords: ['knight', 'armor'], config: { icon: '⚔️', color: '#6B7280', bgColor: '#F3F4F6' } },
  { keywords: ['wand', 'spell'], config: { icon: '🪄', color: '#A855F7', bgColor: '#F3E8FF' } },
  { keywords: ['crystal', 'gem'], config: { icon: '💎', color: '#0EA5E9', bgColor: '#E0F2FE' } },
  { keywords: ['potion'], config: { icon: '🧪', color: '#A855F7', bgColor: '#F3E8FF' } },

  // Holidays
  { keywords: ['christmas', 'santa', 'xmas'], config: { icon: '🎄', color: '#16A34A', bgColor: '#D1FAE5' } },
  { keywords: ['halloween', 'pumpkin'], config: { icon: '🎃', color: '#F97316', bgColor: '#FFEDD5' } },
  { keywords: ['easter', 'easter egg'], config: { icon: '🐰', color: '#EC4899', bgColor: '#FCE7F3' } },
  { keywords: ['birthday', 'party'], config: { icon: '🎉', color: '#EC4899', bgColor: '#FCE7F3' } },
  { keywords: ['valentine', 'love', 'heart'], config: { icon: '❤️', color: '#EF4444', bgColor: '#FEE2E2' } },

  // School
  { keywords: ['school', 'classroom'], config: { icon: '🏫', color: '#EF4444', bgColor: '#FEE2E2' } },
  { keywords: ['book', 'reading', 'story'], config: { icon: '📚', color: '#8B5CF6', bgColor: '#EDE9FE' } },
  { keywords: ['math', 'numbers'], config: { icon: '🔢', color: '#3B82F6', bgColor: '#DBEAFE' } },
  { keywords: ['science', 'experiment'], config: { icon: '🔬', color: '#16A34A', bgColor: '#D1FAE5' } },
  { keywords: ['homework', 'study'], config: { icon: '📝', color: '#F59E0B', bgColor: '#FEF3C7' } },

  // Fashion
  { keywords: ['dress', 'gown'], config: { icon: '👗', color: '#EC4899', bgColor: '#FCE7F3' } },
  { keywords: ['shoe', 'sneaker', 'boots'], config: { icon: '👟', color: '#3B82F6', bgColor: '#DBEAFE' } },
  { keywords: ['hat', 'cap'], config: { icon: '🧢', color: '#EF4444', bgColor: '#FEE2E2' } },
  { keywords: ['sunglasses', 'glasses'], config: { icon: '🕶️', color: '#1F2937', bgColor: '#F3F4F6' } },
  { keywords: ['jewelry', 'ring'], config: { icon: '💍', color: '#F59E0B', bgColor: '#FEF3C7' } },
  { keywords: ['purse', 'bag', 'handbag'], config: { icon: '👜', color: '#EC4899', bgColor: '#FCE7F3' } },

  // Misc fun stuff
  { keywords: ['balloon'], config: { icon: '🎈', color: '#EF4444', bgColor: '#FEE2E2' } },
  { keywords: ['present', 'gift'], config: { icon: '🎁', color: '#EF4444', bgColor: '#FEE2E2' } },
  { keywords: ['trophy', 'award', 'winner'], config: { icon: '🏆', color: '#F59E0B', bgColor: '#FEF3C7' } },
  { keywords: ['medal'], config: { icon: '🥇', color: '#F59E0B', bgColor: '#FEF3C7' } },
  { keywords: ['emoji', 'smiley'], config: { icon: '😊', color: '#F59E0B', bgColor: '#FEF3C7' } },
  { keywords: ['silly', 'funny', 'joke'], config: { icon: '😜', color: '#F59E0B', bgColor: '#FEF3C7' } },
  { keywords: ['sleep', 'nap', 'bed'], config: { icon: '😴', color: '#8B5CF6', bgColor: '#EDE9FE' } },
  { keywords: ['friend', 'friendship', 'bff'], config: { icon: '👯', color: '#EC4899', bgColor: '#FCE7F3' } },
  { keywords: ['hug'], config: { icon: '🤗', color: '#F59E0B', bgColor: '#FEF3C7' } },
  { keywords: ['thumbs up', 'like', 'awesome'], config: { icon: '👍', color: '#3B82F6', bgColor: '#DBEAFE' } },
  { keywords: ['fire', 'hot', 'cool'], config: { icon: '🔥', color: '#F97316', bgColor: '#FFEDD5' } },
  { keywords: ['100', 'perfect'], config: { icon: '💯', color: '#EF4444', bgColor: '#FEE2E2' } },
];

/**
 * Get icon configuration for a card based on its properties
 */
export function getCardIcon(
  title: string,
  category: string,
  themeTags: string[] = []
): CardIconConfig {
  const lowerTitle = title.toLowerCase();
  const lowerCategory = category.toLowerCase();
  const lowerTags = themeTags.map(t => t.toLowerCase());

  // First, check keyword overrides (most specific)
  for (const override of keywordIconOverrides) {
    if (override.keywords.some(kw => lowerTitle.includes(kw))) {
      return override.config;
    }
  }

  // Then check category icons (from tags first, then category)
  for (const tag of lowerTags) {
    if (categoryIcons[tag]) {
      return categoryIcons[tag];
    }
  }

  if (categoryIcons[lowerCategory]) {
    return categoryIcons[lowerCategory];
  }

  // Fallback to default
  return categoryIcons.other;
}

/**
 * Get a list of all available category icons for debugging/display
 */
export function getAllCategoryIcons(): Record<string, CardIconConfig> {
  return { ...categoryIcons };
}
