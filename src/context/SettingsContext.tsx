import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import { Settings } from '../types';

interface SettingsContextType {
  settings: Settings;
  toggleReducedMotion: () => void;
  toggleMusic: () => void;
  toggleSound: () => void;
  setVolume: (volume: number) => void;
}

const defaultSettings: Settings = {
  reducedMotion: false,
  musicEnabled: true,
  soundEnabled: true,
  volume: 0.15,
};

const SettingsContext = createContext<SettingsContextType | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(() => {
    // Load from localStorage if available
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('swipe-quiz-settings');
      if (saved) {
        try {
          return { ...defaultSettings, ...JSON.parse(saved) };
        } catch {
          return defaultSettings;
        }
      }
    }
    return defaultSettings;
  });

  // Check for prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setSettings((s) => ({ ...s, reducedMotion: true }));
    }

    const handler = (e: MediaQueryListEvent) => {
      setSettings((s) => ({ ...s, reducedMotion: e.matches }));
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('swipe-quiz-settings', JSON.stringify(settings));
  }, [settings]);

  // Apply reduced motion class to body
  useEffect(() => {
    if (settings.reducedMotion) {
      document.body.classList.add('reduced-motion');
    } else {
      document.body.classList.remove('reduced-motion');
    }
  }, [settings.reducedMotion]);

  const toggleReducedMotion = useCallback(() => {
    setSettings((s) => ({ ...s, reducedMotion: !s.reducedMotion }));
  }, []);

  const toggleMusic = useCallback(() => {
    setSettings((s) => ({ ...s, musicEnabled: !s.musicEnabled }));
  }, []);

  const toggleSound = useCallback(() => {
    setSettings((s) => ({ ...s, soundEnabled: !s.soundEnabled }));
  }, []);

  const setVolume = useCallback((volume: number) => {
    setSettings((s) => ({ ...s, volume: Math.max(0, Math.min(1, volume)) }));
  }, []);

  return (
    <SettingsContext.Provider
      value={{ settings, toggleReducedMotion, toggleMusic, toggleSound, setVolume }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
