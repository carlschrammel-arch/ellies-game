// Card types
export interface CardImage {
  url: string;
  alt: string;
  credit?: string;
}

export interface CardIcon {
  icon: string;
  color: string;
  bgColor: string;
}

export interface CardEnrichment {
  playerPosition?: string;
  teamName?: string;
  teamFullName?: string;
  sport?: string;
  styleType?: string;
}

export interface Card {
  id: string;
  label: string;
  image: CardImage;
  tags: string[];
  category: string;
  icon?: CardIcon;
  enrichment?: CardEnrichment;
  query?: string; // Used for generating explanation
}

export interface SwipeResult {
  card: Card;
  liked: boolean;
  skipped?: boolean;
}

// Personality types
export interface PersonalityType {
  id: string;
  name: string;
  emoji: string;
  description: string;
  traits: string[];
  suggestions: string[];
  color: string;
}

// Game mode
export type GameMode = 'standard' | 'unlimited';
export type QuestionCount = 15 | 30 | 50;

// Game state
export type GameScreen = 'setup' | 'swipe' | 'results';

export interface GameState {
  screen: GameScreen;
  playerName: string;
  favorites: string;
  selectedCategories: string[];
  mode: GameMode;
  targetCount: QuestionCount;
  cards: Card[];
  swipeResults: SwipeResult[];
  currentCardIndex: number;
  personalityResult: PersonalityType | null;
  topThemes: ThemeScore[];
  skipCount: number;
}

export interface ThemeScore {
  theme: string;
  score: number;
  emoji: string;
}

// Settings
export interface Settings {
  reducedMotion: boolean;
  musicEnabled: boolean;
  soundEnabled: boolean;
  volume: number;
}

// Categories
export interface Category {
  id: string;
  label: string;
  emoji: string;
}
