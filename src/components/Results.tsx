import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import { useGame } from '../context/GameContext';
import { useSettings } from '../context/SettingsContext';
import { useSoundEffects } from '../hooks/useAudio';

export function Results() {
  const { state, restart } = useGame();
  const { settings } = useSettings();
  const { playConfettiSound } = useSoundEffects();
  const [showConfetti, setShowConfetti] = useState(true);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });

    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    playConfettiSound();

    // Stop confetti after 5 seconds
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [playConfettiSound]);

  const personalityType = state.personalityResult;
  const topThemes = state.topThemes;
  const likedCount = state.swipeResults.filter((r) => r.liked).length;
  const totalCount = state.swipeResults.length;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: settings.reducedMotion ? 0 : 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  if (!personalityType) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-gray-500">Something went wrong! Please try again.</p>
      </div>
    );
  }

  return (
    <>
      {/* Confetti */}
      {showConfetti && !settings.reducedMotion && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={200}
          colors={['#d946ef', '#06b6d4', '#22c55e', '#f59e0b', '#ec4899']}
        />
      )}

      <motion.div
        className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4 py-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="w-full max-w-md">
          {/* Results card */}
          <motion.div
            className="bg-white/90 backdrop-blur-sm rounded-4xl shadow-card overflow-hidden"
            variants={itemVariants}
          >
            {/* Header with personality type */}
            <div
              className={`bg-gradient-to-r ${personalityType.color} p-6 text-center text-white`}
            >
              <motion.div
                className="text-6xl mb-2"
                animate={settings.reducedMotion ? {} : { scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5 }}
              >
                {personalityType.emoji}
              </motion.div>
              <h2 className="text-2xl font-display font-bold mb-1">
                {state.playerName ? `${state.playerName}, you are...` : "You are..."}
              </h2>
              <h3 className="text-3xl font-display font-bold">
                {personalityType.name}!
              </h3>
            </div>

            {/* Description */}
            <div className="p-6">
              <motion.p
                className="text-gray-700 font-body text-lg leading-relaxed mb-6"
                variants={itemVariants}
              >
                {personalityType.description}
              </motion.p>

              {/* Stats */}
              <motion.div
                className="bg-gray-50 rounded-2xl p-4 mb-6"
                variants={itemVariants}
              >
                <h4 className="font-display font-semibold text-gray-800 mb-2">
                  Your Swipe Stats 📊
                </h4>
                <div className="flex justify-around text-center">
                  <div>
                    <div className="text-2xl font-bold text-success">{likedCount}</div>
                    <div className="text-xs text-gray-500">Loved it! 💚</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-danger">
                      {totalCount - likedCount}
                    </div>
                    <div className="text-xs text-gray-500">Not for me 👋</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary-500">{totalCount}</div>
                    <div className="text-xs text-gray-500">Total swipes</div>
                  </div>
                </div>
              </motion.div>

              {/* Top themes */}
              {topThemes.length > 0 && (
                <motion.div className="mb-6" variants={itemVariants}>
                  <h4 className="font-display font-semibold text-gray-800 mb-3">
                    Your Top Vibes ✨
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {topThemes.slice(0, 5).map((theme, index) => (
                      <motion.span
                        key={theme.theme}
                        className="px-4 py-2 bg-gradient-to-r from-primary-100 to-accent-100 rounded-full text-sm font-semibold text-gray-700"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        {theme.emoji} {theme.theme.charAt(0).toUpperCase() + theme.theme.slice(1)}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Suggestions */}
              <motion.div className="mb-6" variants={itemVariants}>
                <h4 className="font-display font-semibold text-gray-800 mb-3">
                  You Might Also Like 🎁
                </h4>
                <ul className="space-y-2">
                  {personalityType.suggestions.map((suggestion, index) => (
                    <motion.li
                      key={suggestion}
                      className="flex items-center gap-2 text-gray-600"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      <span className="w-2 h-2 rounded-full bg-primary-400" />
                      {suggestion}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Traits */}
              <motion.div variants={itemVariants}>
                <h4 className="font-display font-semibold text-gray-800 mb-3">
                  Your Superpowers 💪
                </h4>
                <div className="flex flex-wrap gap-2">
                  {personalityType.traits.map((trait) => (
                    <span
                      key={trait}
                      className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600 capitalize"
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Play again button */}
          <motion.button
            onClick={restart}
            className="w-full mt-6 touch-btn bg-gradient-to-r from-primary-500 to-accent-500 text-white py-4 rounded-2xl font-display font-bold text-xl shadow-lg hover:shadow-xl"
            variants={itemVariants}
            whileHover={{ scale: settings.reducedMotion ? 1 : 1.02 }}
            whileTap={{ scale: settings.reducedMotion ? 1 : 0.98 }}
          >
            Play Again! 🔄
          </motion.button>

          {/* Share hint */}
          <motion.p
            className="text-center text-gray-500 text-sm mt-4"
            variants={itemVariants}
          >
            Share your result with friends and see what vibe they get! 🎉
          </motion.p>
        </div>
      </motion.div>
    </>
  );
}
