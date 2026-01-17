import { AnimatePresence, motion } from 'framer-motion';
import { GameProvider, useGame } from './context/GameContext';
import { SettingsProvider } from './context/SettingsContext';
import { Header, SetupForm, SwipeDeck, Results } from './components';

function GameContent() {
  const { state } = useGame();

  const pageVariants = {
    initial: { opacity: 0, x: 100 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: -100 },
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.4,
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        showProgress={state.screen === 'swipe'}
        current={state.currentCardIndex + 1}
        total={state.cards.length}
      />

      <main className="flex-1">
        <AnimatePresence mode="wait">
          {state.screen === 'setup' && (
            <motion.div
              key="setup"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <SetupForm />
            </motion.div>
          )}

          {state.screen === 'swipe' && (
            <motion.div
              key="swipe"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <SwipeDeck />
            </motion.div>
          )}

          {state.screen === 'results' && (
            <motion.div
              key="results"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <Results />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

function App() {
  return (
    <SettingsProvider>
      <GameProvider>
        <GameContent />
      </GameProvider>
    </SettingsProvider>
  );
}

export default App;
