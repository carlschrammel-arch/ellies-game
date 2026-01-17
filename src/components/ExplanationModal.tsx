import React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getKidExplanation } from '../data/kidReferenceMap';
import { getExplanationForCard, CardExplanation } from '../utils/cardExplanation';
import { Card } from '../types';
import { GeneratedCard } from '../utils/deckBuilder';

interface ExplanationModalProps {
  isOpen: boolean;
  onClose: () => void;
  concept: string;
  card?: Card; // Full card data for better explanations
}

/**
 * Get explanation using the new card-based system if card data is available,
 * falling back to the legacy kidReferenceMap system
 */
function getExplanation(concept: string, card?: Card): CardExplanation & { relatedTo?: string[] } {
  // If we have full card data, use the new explanation system
  if (card) {
    const generatedCard: GeneratedCard = {
      id: card.id,
      title: card.label,
      query: card.query || card.label,
      alt: card.label,
      themeTags: card.tags,
      category: card.category,
      enrichment: card.enrichment,
    };
    
    const enrichment = card.enrichment;
    const explanation = getExplanationForCard(generatedCard, enrichment);
    
    return {
      ...explanation,
      relatedTo: card.tags.slice(0, 3), // Use tags as related topics
    };
  }
  
  // Fallback to legacy system
  const legacyExplanation = getKidExplanation(concept);
  return {
    explanation: legacyExplanation.explanation,
    funFact: legacyExplanation.funFact,
    relatedTo: legacyExplanation.relatedTo,
  };
}

export function ExplanationModal({ isOpen, onClose, concept, card }: ExplanationModalProps) {
  const explanation = getExplanation(concept, card);
  const cardEmoji = card?.icon?.icon || '❓';
  const bgColor = card?.icon?.bgColor || '#F3E8FF';

  // Close on escape key and prevent body scroll when open
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = '';
      };
    }
  }, [isOpen, onClose]);

  // Use React Portal to render modal at document.body level
  // This ensures it appears ABOVE all other content including cards
  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - very high z-index */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            style={{ zIndex: 9998 }}
            aria-hidden="true"
          />
          
          {/* Modal container - highest z-index */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="explanation-title"
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 max-h-[85vh] overflow-auto"
            style={{ zIndex: 9999 }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-t-3xl shadow-2xl p-6 mx-auto max-w-lg">
              {/* Handle bar for touch drag */}
              <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto mb-4" />
              
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">🤔</span>
                <h2 id="explanation-title" className="text-2xl font-bold text-gray-800 dark:text-white">
                  What is this?
                </h2>
              </div>

              {/* Card emoji display */}
              <div 
                className="rounded-xl overflow-hidden mb-4 flex items-center justify-center py-6"
                style={{ backgroundColor: bgColor }}
              >
                <span className="text-8xl">{cardEmoji}</span>
              </div>

              {/* Concept name - big and colorful */}
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-5 py-3 rounded-2xl inline-block mb-5 shadow-lg">
                <span className="font-bold text-xl">{concept}</span>
              </div>

              {/* Explanation - big readable text */}
              <p className="text-gray-700 dark:text-gray-200 text-xl leading-relaxed mb-5">
                {explanation.explanation}
              </p>

              {/* Fun fact */}
              {explanation.funFact && (
                <div className="bg-yellow-50 dark:bg-yellow-900/30 border-l-4 border-yellow-400 p-5 rounded-r-xl mb-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">💡</span>
                    <span className="font-bold text-lg text-yellow-800 dark:text-yellow-200">
                      Fun Fact!
                    </span>
                  </div>
                  <p className="text-lg text-yellow-900 dark:text-yellow-100">
                    {explanation.funFact}
                  </p>
                </div>
              )}

              {/* Related topics */}
              {explanation.relatedTo && explanation.relatedTo.length > 0 && (
                <div className="mb-5">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    Related to:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {explanation.relatedTo.map((topic) => (
                      <span
                        key={topic}
                        className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-sm font-medium"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Close button - large touch target */}
              <button
                onClick={onClose}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4 px-6 rounded-2xl transition-all active:scale-95 text-xl shadow-lg min-h-[56px]"
                autoFocus
              >
                Got it! 👍
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  // Render via portal to document.body
  return createPortal(modalContent, document.body);
}
