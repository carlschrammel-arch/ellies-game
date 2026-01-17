import { motion } from 'framer-motion';
import { useSettings } from '../context/SettingsContext';
import { useBackgroundMusic } from '../hooks/useAudio';

interface HeaderProps {
  title?: string;
  showProgress?: boolean;
  current?: number;
  total?: number;
  showLogo?: boolean;
}

export function Header({ title = 'Swipe Quiz', showProgress, current, total, showLogo = true }: HeaderProps) {
  const { settings, toggleReducedMotion, toggleMusic } = useSettings();
  const { isPlaying } = useBackgroundMusic();

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-primary-200/50 px-4 py-3">
      <div className="max-w-lg mx-auto flex items-center justify-between">
        <motion.div
          className="flex items-center gap-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: settings.reducedMotion ? 0 : 0.3 }}
        >
          {showLogo && (
            <motion.img 
              src="/logo.svg" 
              alt="Swipe Quiz" 
              className="h-10 w-auto cursor-pointer"
              whileHover={settings.reducedMotion ? {} : { scale: 1.08 }}
              whileTap={settings.reducedMotion ? {} : { scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            />
          )}
          {showLogo && (
            <h1 className="text-xl font-display font-bold gradient-text hidden sm:block">
              {title}
            </h1>
          )}
          {!showLogo && (
            <h1 className="text-2xl font-display font-bold gradient-text">
              {title} 🎯
            </h1>
          )}
        </motion.div>

        <div className="flex items-center gap-2">
          {showProgress && current !== undefined && total !== undefined && (
            <motion.div
              className="flex items-center gap-2 bg-primary-100 px-3 py-1.5 rounded-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <span className="text-sm font-semibold text-primary-700">
                {current}/{total}
              </span>
              <div className="w-16 h-2 bg-primary-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(current / total) * 100}%` }}
                  transition={{ duration: settings.reducedMotion ? 0 : 0.3 }}
                />
              </div>
            </motion.div>
          )}

          {/* Settings buttons */}
          <button
            onClick={toggleMusic}
            className="p-2 rounded-full hover:bg-primary-100 transition-colors"
            aria-label={settings.musicEnabled ? 'Mute music' : 'Unmute music'}
            title={settings.musicEnabled ? 'Mute music' : 'Unmute music'}
          >
            {settings.musicEnabled && isPlaying ? '🔊' : '🔇'}
          </button>

          <button
            onClick={toggleReducedMotion}
            className="p-2 rounded-full hover:bg-primary-100 transition-colors"
            aria-label={settings.reducedMotion ? 'Enable animations' : 'Reduce motion'}
            title={settings.reducedMotion ? 'Enable animations' : 'Reduce motion'}
          >
            {settings.reducedMotion ? '⏸️' : '✨'}
          </button>
        </div>
      </div>
    </header>
  );
}
