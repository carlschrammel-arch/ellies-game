import React, { createContext, useContext, useReducer, ReactNode, useCallback } from 'react';
import { GameState, GameScreen, Card, SwipeResult, GameMode, QuestionCount } from '../types';
import { calculatePersonalityType, calculateThemeScores } from '../utils/scoring';

type GameAction =
  | { type: 'SET_SCREEN'; screen: GameScreen }
  | { type: 'SET_PLAYER_NAME'; name: string }
  | { type: 'SET_FAVORITES'; favorites: string }
  | { type: 'TOGGLE_CATEGORY'; category: string }
  | { type: 'SET_MODE'; mode: GameMode }
  | { type: 'SET_TARGET_COUNT'; count: QuestionCount }
  | { type: 'SET_CARDS'; cards: Card[] }
  | { type: 'APPEND_CARDS'; cards: Card[] }
  | { type: 'SWIPE_CARD'; liked: boolean }
  | { type: 'SKIP_CARD' }
  | { type: 'UNDO_SWIPE' }
  | { type: 'CALCULATE_RESULTS' }
  | { type: 'RESTART' };

const initialState: GameState = {
  screen: 'setup',
  playerName: '',
  favorites: '',
  selectedCategories: [],
  mode: 'standard',
  targetCount: 15,
  cards: [],
  swipeResults: [],
  currentCardIndex: 0,
  personalityResult: null,
  topThemes: [],
  skipCount: 0,
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'SET_SCREEN':
      return { ...state, screen: action.screen };

    case 'SET_PLAYER_NAME':
      return { ...state, playerName: action.name };

    case 'SET_FAVORITES':
      return { ...state, favorites: action.favorites };

    case 'TOGGLE_CATEGORY': {
      const categories = state.selectedCategories.includes(action.category)
        ? state.selectedCategories.filter((c) => c !== action.category)
        : [...state.selectedCategories, action.category];
      return { ...state, selectedCategories: categories };
    }

    case 'SET_MODE':
      return { ...state, mode: action.mode };

    case 'SET_TARGET_COUNT':
      return { ...state, targetCount: action.count };

    case 'SET_CARDS':
      return { ...state, cards: action.cards, currentCardIndex: 0, swipeResults: [], skipCount: 0 };

    case 'APPEND_CARDS':
      return { ...state, cards: [...state.cards, ...action.cards] };

    case 'SWIPE_CARD': {
      const card = state.cards[state.currentCardIndex];
      if (!card) return state;

      const result: SwipeResult = { card, liked: action.liked };
      return {
        ...state,
        swipeResults: [...state.swipeResults, result],
        currentCardIndex: state.currentCardIndex + 1,
      };
    }

    case 'SKIP_CARD': {
      const card = state.cards[state.currentCardIndex];
      if (!card) return state;

      // Record skip but mark as skipped so it doesn't affect personality scoring
      const result: SwipeResult = { card, liked: false, skipped: true };
      return {
        ...state,
        swipeResults: [...state.swipeResults, result],
        currentCardIndex: state.currentCardIndex + 1,
        skipCount: state.skipCount + 1,
      };
    }

    case 'UNDO_SWIPE': {
      if (state.swipeResults.length === 0) return state;
      const lastResult = state.swipeResults[state.swipeResults.length - 1];
      const wasSkipped = lastResult?.skipped;
      return {
        ...state,
        swipeResults: state.swipeResults.slice(0, -1),
        currentCardIndex: state.currentCardIndex - 1,
        skipCount: wasSkipped ? state.skipCount - 1 : state.skipCount,
      };
    }

    case 'CALCULATE_RESULTS': {
      const personalityResult = calculatePersonalityType(state.swipeResults);
      const topThemes = calculateThemeScores(state.swipeResults);
      return {
        ...state,
        personalityResult,
        topThemes,
        screen: 'results',
      };
    }

    case 'RESTART':
      return { ...initialState };

    default:
      return state;
  }
}

interface GameContextType {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
  setScreen: (screen: GameScreen) => void;
  setPlayerName: (name: string) => void;
  setFavorites: (favorites: string) => void;
  toggleCategory: (category: string) => void;
  setMode: (mode: GameMode) => void;
  setTargetCount: (count: QuestionCount) => void;
  setCards: (cards: Card[]) => void;
  appendCards: (cards: Card[]) => void;
  swipeCard: (liked: boolean) => void;
  skipCard: () => void;
  undoSwipe: () => void;
  calculateResults: () => void;
  restart: () => void;
}

const GameContext = createContext<GameContextType | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const setScreen = useCallback((screen: GameScreen) => {
    dispatch({ type: 'SET_SCREEN', screen });
  }, []);

  const setPlayerName = useCallback((name: string) => {
    dispatch({ type: 'SET_PLAYER_NAME', name });
  }, []);

  const setFavorites = useCallback((favorites: string) => {
    dispatch({ type: 'SET_FAVORITES', favorites });
  }, []);

  const toggleCategory = useCallback((category: string) => {
    dispatch({ type: 'TOGGLE_CATEGORY', category });
  }, []);

  const setMode = useCallback((mode: GameMode) => {
    dispatch({ type: 'SET_MODE', mode });
  }, []);

  const setTargetCount = useCallback((count: QuestionCount) => {
    dispatch({ type: 'SET_TARGET_COUNT', count });
  }, []);

  const setCards = useCallback((cards: Card[]) => {
    dispatch({ type: 'SET_CARDS', cards });
  }, []);

  const appendCards = useCallback((cards: Card[]) => {
    dispatch({ type: 'APPEND_CARDS', cards });
  }, []);

  const swipeCard = useCallback((liked: boolean) => {
    dispatch({ type: 'SWIPE_CARD', liked });
  }, []);

  const skipCard = useCallback(() => {
    dispatch({ type: 'SKIP_CARD' });
  }, []);

  const undoSwipe = useCallback(() => {
    dispatch({ type: 'UNDO_SWIPE' });
  }, []);

  const calculateResults = useCallback(() => {
    dispatch({ type: 'CALCULATE_RESULTS' });
  }, []);

  const restart = useCallback(() => {
    dispatch({ type: 'RESTART' });
  }, []);

  const value: GameContextType = {
    state,
    dispatch,
    setScreen,
    setPlayerName,
    setFavorites,
    toggleCategory,
    setMode,
    setTargetCount,
    setCards,
    appendCards,
    swipeCard,
    skipCard,
    undoSwipe,
    calculateResults,
    restart,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}
