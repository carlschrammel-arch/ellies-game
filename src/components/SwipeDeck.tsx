import { useCallback, useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { useSettings } from '../context/SettingsContext';
import { useSoundEffects } from '../hooks/useAudio';
import { SwipeCard } from './SwipeCard';
import { ExplanationModal } from './ExplanationModal';
import { buildDeck, GeneratedCard } from '../utils/deckBuilder';
import { generateFallbackImage } from '../data/fallbackImages';
import { Card, CardImage } from '../types';

// Batch size for unlimited mode generation
const UNLIMITED_BATCH_SIZE = 25;
// Threshold to trigger new batch generation
const CARD_THRESHOLD = 5;

export function SwipeDeck() {
  const { state, swipeCard, skipCard, appendCards, undoSwipe, calculateResults } = useGame();
  const { settings } = useSettings();
  const { playSwipeSound } = useSoundEffects();
  
  // Explanation modal state
  const [showExplanation, setShowExplanation] = useState(false);
  
  // Track if we're generating more cards to prevent duplicate fetches
  const isGeneratingRef = useRef(false);
  
  // Track used card titles to avoid repetition in unlimited mode
  const usedTitlesRef = useRef<Set<string>>(new Set());

  const currentCard = state.cards[state.currentCardIndex];
  const nextCard = state.cards[state.currentCardIndex + 1];
  const thirdCard = state.cards[state.currentCardIndex + 2];

  const isUnlimitedMode = state.mode === 'unlimited';
  const swipeCount = state.swipeResults.filter(r => !r.skipped).length;
  const favoritesCount = state.swipeResults.filter(r => r.liked && !r.skipped).length;
  const targetCount = state.targetCount;
  const progress = isUnlimitedMode ? swipeCount : Math.min(swipeCount, targetCount);
  const remainingCards = state.cards.length - state.currentCardIndex;

  const handleSwipe = useCallback(
    (liked: boolean) => {
      playSwipeSound(liked);
      swipeCard(liked);

      // In standard mode, check if game is complete
      if (!isUnlimitedMode && state.currentCardIndex >= targetCount - 1) {
        setTimeout(() => {
          calculateResults();
        }, 500);
      }
    },
    [playSwipeSound, swipeCard, state.currentCardIndex, targetCount, calculateResults, isUnlimitedMode]
  );

  const handleSkip = useCallback(() => {
    skipCard();
  }, [skipCard]);

  const handleInfoRequest = useCallback(() => {
    setShowExplanation(true);
  }, []);

  const handleReadyForResults = useCallback(() => {
    if (swipeCount > 0) {
      calculateResults();
    }
  }, [swipeCount, calculateResults]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!currentCard || showExplanation) return;

      switch (e.key) {
        case 'ArrowRight':
          e.preventDefault();
          handleSwipe(true);
          break;
        case 'ArrowLeft':
          e.preventDefault();
          handleSwipe(false);
          break;
        case 'ArrowDown':
        case 's':
          e.preventDefault();
          handleSkip();
          break;
        case 'i':
        case '?':
          e.preventDefault();
          handleInfoRequest();
          break;
        case 'z':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            undoSwipe();
          }
          break;
        case 'Enter':
          if (isUnlimitedMode && swipeCount > 0) {
            e.preventDefault();
            handleReadyForResults();
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentCard, handleSwipe, handleSkip, handleInfoRequest, undoSwipe, isUnlimitedMode, swipeCount, handleReadyForResults, showExplanation]);

  // Track used titles for variety in unlimited mode
  useEffect(() => {
    if (isUnlimitedMode && currentCard) {
      usedTitlesRef.current.add(currentCard.label.toLowerCase());
    }
  }, [currentCard, isUnlimitedMode]);

  // Continuous deck generation for unlimited mode
  useEffect(() => {
    if (!isUnlimitedMode || isGeneratingRef.current) return;
    
    // When running low on cards, generate more
    if (remainingCards < CARD_THRESHOLD && remainingCards >= 0) {
      isGeneratingRef.current = true;
      
      const generateMoreCards = async () => {
        try {
          // Build more cards using the deck builder config
          let generatedCards = buildDeck({
            favoritesText: state.favorites,
            selectedCategories: state.selectedCategories,
            targetCount: UNLIMITED_BATCH_SIZE,
            unlimited: true,
          });
          
          // Filter out any cards we've already shown (for variety)
          generatedCards = generatedCards.filter(
            gc => !usedTitlesRef.current.has(gc.title.toLowerCase())
          );
          
          // If we filtered too many, generate fresh ones
          if (generatedCards.length < 10) {
            // Clear some old titles to allow recycling
            const titlesArray = Array.from(usedTitlesRef.current);
            if (titlesArray.length > 50) {
              const toRemove = titlesArray.slice(0, 25);
              toRemove.forEach(t => usedTitlesRef.current.delete(t));
            }
            
            generatedCards = buildDeck({
              favoritesText: state.favorites,
              selectedCategories: state.selectedCategories,
              targetCount: UNLIMITED_BATCH_SIZE,
              unlimited: true,
            });
          }
          
          // Helper to convert GeneratedCard to Card
          const toCard = (gc: GeneratedCard, image: CardImage): Card => ({
            id: gc.id,
            label: gc.title,
            image,
            tags: gc.themeTags,
            category: gc.category,
          });
          
          // Fetch images for new cards
          const response = await fetch('/api/images', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ labels: generatedCards.map(c => c.title) }),
          });
          
          if (response.ok) {
            const images = await response.json();
            const cardsWithImages: Card[] = generatedCards.map((gc, idx) => 
              toCard(gc, images[idx] || {
                url: generateFallbackImage(gc.title),
                alt: gc.alt,
                credit: 'Placeholder',
              })
            );
            appendCards(cardsWithImages);
          } else {
            // Use cards with placeholder images
            const cardsWithPlaceholders: Card[] = generatedCards.map(gc => 
              toCard(gc, {
                url: generateFallbackImage(gc.title),
                alt: gc.alt,
                credit: 'Placeholder',
              })
            );
            appendCards(cardsWithPlaceholders);
          }
        } catch (error) {
          console.error('Error generating more cards:', error);
          // Still add cards even if image fetch fails
          const fallbackCards = buildDeck({
            favoritesText: state.favorites,
            selectedCategories: state.selectedCategories,
            targetCount: UNLIMITED_BATCH_SIZE,
            unlimited: true,
          });
          const cardsWithPlaceholders: Card[] = fallbackCards.map(gc => ({
            id: gc.id,
            label: gc.title,
            image: {
              url: generateFallbackImage(gc.title),
              alt: gc.alt,
              credit: 'Placeholder',
            },
            tags: gc.themeTags,
            category: gc.category,
          }));
          appendCards(cardsWithPlaceholders);
        } finally {
          isGeneratingRef.current = false;
        }
      };
      
      generateMoreCards();
    }
  }, [remainingCards, isUnlimitedMode, state.selectedCategories, state.favorites, appendCards]);

  // In standard mode, auto-complete when all cards are swiped
  useEffect(() => {
    if (!isUnlimitedMode && state.currentCardIndex >= targetCount && swipeCount > 0) {
      calculateResults();
    }
  }, [state.currentCardIndex, targetCount, calculateResults, isUnlimitedMode, swipeCount]);

  if (state.cards.length === 0) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <p className="text-gray-500">No cards to show!</p>
      </div>
    );
  }

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] px-4 py-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Progress indicator */}
      <motion.div 
        className="mb-4 text-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {isUnlimitedMode ? (
          <div className="flex flex-col items-center gap-2">
            {/* Encouraging message */}
            <p className="text-sm text-gray-500 font-medium">
              🎉 Swipe as long as you want! You decide when you're done.
            </p>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 bg-green-50 px-3 py-1.5 rounded-full">
                <span className="text-xl">💚</span>
                <span className="text-lg font-bold text-green-600">{favoritesCount} likes</span>
              </div>
              <div className="flex items-center gap-2 bg-purple-50 px-3 py-1.5 rounded-full">
                <span className="text-lg font-bold text-purple-600">{swipeCount} swipes</span>
                <span className="text-xl">♾️</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-gray-600">
              {progress}/{targetCount}
            </span>
            <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-primary-500 to-accent-500"
                initial={{ width: 0 }}
                animate={{ width: `${(progress / targetCount) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        )}
      </motion.div>

      {/* Card stack */}
      <div className="relative w-full max-w-sm aspect-[3/4] mb-6">
        <AnimatePresence mode="popLayout">
          {/* Third card (back) */}
          {thirdCard && (
            <SwipeCard
              key={thirdCard.id}
              card={thirdCard}
              onSwipe={() => {}}
              onSkip={() => {}}
              onInfoRequest={() => {}}
              isTop={false}
              index={2}
            />
          )}

          {/* Second card (middle) */}
          {nextCard && (
            <SwipeCard
              key={nextCard.id}
              card={nextCard}
              onSwipe={() => {}}
              onSkip={() => {}}
              onInfoRequest={() => {}}
              isTop={false}
              index={1}
            />
          )}

          {/* Current card (top) */}
          {currentCard && (
            <SwipeCard
              key={currentCard.id}
              card={currentCard}
              onSwipe={handleSwipe}
              onSkip={handleSkip}
              onInfoRequest={handleInfoRequest}
              isTop={true}
              index={0}
            />
          )}
        </AnimatePresence>

        {/* Empty state */}
        {!currentCard && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-white/50 rounded-4xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-xl font-display text-gray-500">
              Calculating your results... ✨
            </p>
          </motion.div>
        )}
      </div>

      {/* Action buttons */}
      {currentCard && (
        <motion.div
          className="flex items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {/* Undo button */}
          <motion.button
            onClick={undoSwipe}
            disabled={state.swipeResults.length === 0}
            className="w-12 h-12 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-xl disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
            whileHover={{ scale: settings.reducedMotion ? 1 : 1.1 }}
            whileTap={{ scale: settings.reducedMotion ? 1 : 0.9 }}
            aria-label="Undo last swipe"
            title="Undo (Ctrl+Z)"
          >
            ↩️
          </motion.button>

          {/* Nope button */}
          <motion.button
            onClick={() => handleSwipe(false)}
            className="w-16 h-16 rounded-full bg-danger text-white flex items-center justify-center text-3xl shadow-lg hover:shadow-xl transition-shadow"
            whileHover={{ scale: settings.reducedMotion ? 1 : 1.1 }}
            whileTap={{ scale: settings.reducedMotion ? 1 : 0.9 }}
            aria-label="Not for me"
            title="Nope! (← arrow)"
          >
            👋
          </motion.button>

          {/* Love button */}
          <motion.button
            onClick={() => handleSwipe(true)}
            className="w-16 h-16 rounded-full bg-success text-white flex items-center justify-center text-3xl shadow-lg hover:shadow-xl transition-shadow"
            whileHover={{ scale: settings.reducedMotion ? 1 : 1.1 }}
            whileTap={{ scale: settings.reducedMotion ? 1 : 0.9 }}
            aria-label="Love it!"
            title="Love it! (→ arrow)"
          >
            💚
          </motion.button>
        </motion.div>
      )}

      {/* Instructions */}
      <motion.p
        className="text-center text-gray-500 text-sm mt-4 max-w-xs"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Swipe right for things you love, left for things that aren't for you!
        <br />
        <span className="text-xs">← → to swipe • ↓ or S to skip • ? for info</span>
      </motion.p>

      {/* Unlimited mode: Ready for Results button */}
      {isUnlimitedMode && swipeCount > 0 && (
        <motion.div
          className="mt-6 flex flex-col items-center gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-xs text-gray-400">Had enough? Click below when you're ready!</p>
          <motion.button
            onClick={handleReadyForResults}
            className="px-8 py-4 bg-gradient-to-r from-accent-500 to-secondary-500 text-white rounded-2xl font-display font-bold text-lg shadow-lg hover:shadow-xl transition-shadow min-h-[56px]"
            whileHover={{ scale: settings.reducedMotion ? 1 : 1.05 }}
            whileTap={{ scale: settings.reducedMotion ? 1 : 0.95 }}
          >
            ✨ I'm Ready for Results!
          </motion.button>
        </motion.div>
      )}

      {/* Explanation Modal */}
      {currentCard && (
        <ExplanationModal
          isOpen={showExplanation}
          onClose={() => setShowExplanation(false)}
          concept={currentCard.label}
          card={currentCard}
        />
      )}
    </motion.div>
  );
}
