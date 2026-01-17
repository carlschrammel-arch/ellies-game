import { useState } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { useSettings } from '../context/SettingsContext';
import { useBackgroundMusic } from '../hooks/useAudio';
import { categories } from '../data/gameData';
import { buildDeck, convertToCard } from '../utils/deckBuilder';
import { Card, CardImage, QuestionCount, GameMode } from '../types';

export function SetupForm() {
  const { 
    state, 
    setFavorites, 
    toggleCategory, 
    setCards, 
    setScreen, 
    setPlayerName,
    setMode,
    setTargetCount,
  } = useGame();
  const { settings } = useSettings();
  const { handleUserInteraction } = useBackgroundMusic();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const questionCountOptions: QuestionCount[] = [15, 30, 50];

  // Create a simple placeholder image object (emojis are used for display now)
  const getPlaceholderImage = (query: string): CardImage => {
    return {
      url: '', // Not used - emojis are displayed instead
      alt: query,
      credit: '',
    };
  };

  const handleStart = async () => {
    if (!state.favorites.trim() && state.selectedCategories.length === 0) {
      setError('Please tell us about your favorite things or pick some categories!');
      return;
    }

    setError(null);
    setIsLoading(true);
    handleUserInteraction();

    try {
      // Determine how many cards to generate
      // For standard mode, use targetCount
      // For unlimited mode, generate a larger initial deck
      const cardCount = state.mode === 'unlimited' ? 100 : state.targetCount;
      
      // Build deck using the new concept expansion system
      const generatedCards = buildDeck({
        favoritesText: state.favorites,
        selectedCategories: state.selectedCategories,
        targetCount: cardCount,
        unlimited: state.mode === 'unlimited',
      });

      // Convert to full Card objects (emojis are used for display, not images)
      const cards: Card[] = generatedCards.map((genCard) => 
        convertToCard(genCard, getPlaceholderImage(genCard.query))
      );

      setCards(cards);
      setScreen('swipe');
    } catch (err) {
      console.error('Error starting game:', err);
      setError('Something went wrong! Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleModeChange = (mode: GameMode) => {
    setMode(mode);
  };

  const handleCountChange = (count: QuestionCount) => {
    setTargetCount(count);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: settings.reducedMotion ? 0 : 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="w-full max-w-md">
        <motion.div
          className="bg-white/90 backdrop-blur-sm rounded-4xl shadow-card p-6 md:p-8"
          variants={itemVariants}
        >
          {/* Title */}
          <motion.div className="text-center mb-6" variants={itemVariants}>
            <h2 className="text-3xl font-display font-bold gradient-text mb-2">
              Let's Find Your Vibe! ✨
            </h2>
            <p className="text-gray-600 font-body">
              Tell us about your favorite things and we'll create a fun quiz just for you!
            </p>
          </motion.div>

          {/* Name input (optional) */}
          <motion.div className="mb-4" variants={itemVariants}>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Your Name (optional)
            </label>
            <input
              type="text"
              value={state.playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="What should we call you?"
              className="w-full px-4 py-3 rounded-2xl border-2 border-primary-200 focus:border-primary-400 focus:ring-4 focus:ring-primary-100 outline-none transition-all text-lg font-body"
              maxLength={30}
            />
          </motion.div>

          {/* Favorites textarea */}
          <motion.div className="mb-4" variants={itemVariants}>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              What are your favorite things? 🌟
            </label>
            <textarea
              value={state.favorites}
              onChange={(e) => setFavorites(e.target.value)}
              placeholder="I love cats, pizza, minecraft, swimming, the color blue..."
              className="w-full px-4 py-3 rounded-2xl border-2 border-primary-200 focus:border-primary-400 focus:ring-4 focus:ring-primary-100 outline-none transition-all text-lg font-body resize-none"
              rows={3}
              maxLength={500}
            />
            <p className="text-xs text-gray-500 mt-1">
              Write anything you like! We'll show you related cool stuff ✨
            </p>
          </motion.div>

          {/* Category chips */}
          <motion.div className="mb-4" variants={itemVariants}>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Or pick some categories 👇
            </label>
            <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-1">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  onClick={() => toggleCategory(category.id)}
                  className={`chip ${
                    state.selectedCategories.includes(category.id)
                      ? 'chip-selected'
                      : 'chip-unselected'
                  }`}
                  whileHover={{ scale: settings.reducedMotion ? 1 : 1.05 }}
                  whileTap={{ scale: settings.reducedMotion ? 1 : 0.95 }}
                >
                  {category.emoji} {category.label}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Mode selection */}
          <motion.div className="mb-4" variants={itemVariants}>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              How do you want to play? 🎮
            </label>
            <div className="flex gap-2">
              <motion.button
                onClick={() => handleModeChange('standard')}
                className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
                  state.mode === 'standard'
                    ? 'bg-primary-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                whileTap={{ scale: settings.reducedMotion ? 1 : 0.98 }}
              >
                🎯 Standard
              </motion.button>
              <motion.button
                onClick={() => handleModeChange('unlimited')}
                className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
                  state.mode === 'unlimited'
                    ? 'bg-gradient-to-r from-accent-500 to-secondary-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                whileTap={{ scale: settings.reducedMotion ? 1 : 0.98 }}
              >
                ♾️ Swipe All Day
              </motion.button>
            </div>
            <p className="text-xs text-gray-500 mt-1 text-center">
              {state.mode === 'standard' 
                ? 'Answer a set number of questions, then see results!' 
                : 'Keep swiping as long as you want! Get results whenever you\'re ready.'}
            </p>
          </motion.div>

          {/* Question count (only for standard mode) */}
          {state.mode === 'standard' && (
            <motion.div 
              className="mb-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                How many cards? 🃏
              </label>
              <div className="flex gap-2">
                {questionCountOptions.map((count) => (
                  <motion.button
                    key={count}
                    onClick={() => handleCountChange(count)}
                    className={`flex-1 py-3 px-4 rounded-xl font-bold text-lg transition-all ${
                      state.targetCount === count
                        ? 'bg-secondary-500 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                    whileTap={{ scale: settings.reducedMotion ? 1 : 0.98 }}
                  >
                    {count}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Error message */}
          {error && (
            <motion.div
              className="mb-4 p-3 bg-red-100 text-red-700 rounded-xl text-center text-sm"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              {error}
            </motion.div>
          )}

          {/* Start button */}
          <motion.button
            onClick={handleStart}
            disabled={isLoading}
            className="w-full touch-btn bg-gradient-to-r from-primary-500 to-accent-500 text-white py-4 rounded-2xl font-display font-bold text-xl shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
            variants={itemVariants}
            whileHover={{ scale: settings.reducedMotion ? 1 : 1.02 }}
            whileTap={{ scale: settings.reducedMotion ? 1 : 0.98 }}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                >
                  ⏳
                </motion.span>
                Getting ready...
              </span>
            ) : (
              "Let's Go! 🚀"
            )}
          </motion.button>
        </motion.div>

        {/* Footer hint */}
        <motion.p
          className="text-center text-gray-500 text-sm mt-4"
          variants={itemVariants}
        >
          Tip: The more you tell us, the more fun the quiz! 🎉
        </motion.p>
      </div>
    </motion.div>
  );
}
