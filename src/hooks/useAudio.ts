import { useRef, useEffect, useCallback, useState } from 'react';
import { useSettings } from '../context/SettingsContext';

// Web Audio API based music generator for elevator-style background music
export function useBackgroundMusic() {
  const { settings } = useSettings();
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const isPlayingRef = useRef(false);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  // Initialize audio context
  const initAudio = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      gainNodeRef.current = audioContextRef.current.createGain();
      gainNodeRef.current.connect(audioContextRef.current.destination);
      gainNodeRef.current.gain.value = settings.volume;
    }
  }, [settings.volume]);

  // Elevator music notes (C major pentatonic scale, mellow jazz style)
  const playNote = useCallback((frequency: number, startTime: number, duration: number, type: OscillatorType = 'sine') => {
    if (!audioContextRef.current || !gainNodeRef.current) return;

    const osc = audioContextRef.current.createOscillator();
    const noteGain = audioContextRef.current.createGain();
    
    osc.type = type;
    osc.frequency.value = frequency;
    
    noteGain.gain.setValueAtTime(0, startTime);
    noteGain.gain.linearRampToValueAtTime(0.3, startTime + 0.1);
    noteGain.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
    
    osc.connect(noteGain);
    noteGain.connect(gainNodeRef.current);
    
    osc.start(startTime);
    osc.stop(startTime + duration);
    
    oscillatorsRef.current.push(osc);
    
    // Clean up after note ends
    setTimeout(() => {
      const idx = oscillatorsRef.current.indexOf(osc);
      if (idx > -1) oscillatorsRef.current.splice(idx, 1);
    }, (duration + 1) * 1000);
  }, []);

  // Play a melodic loop
  const playLoop = useCallback(() => {
    if (!audioContextRef.current || !isPlayingRef.current) return;

    const ctx = audioContextRef.current;
    const now = ctx.currentTime;
    
    // Pentatonic scale frequencies (C4 = 261.63 Hz based)
    const notes = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25];
    
    // Simple melody pattern (8 beats)
    const melody = [
      { note: 0, time: 0, dur: 0.5 },
      { note: 2, time: 0.5, dur: 0.5 },
      { note: 4, time: 1.0, dur: 0.75 },
      { note: 3, time: 2.0, dur: 0.5 },
      { note: 2, time: 2.5, dur: 0.5 },
      { note: 1, time: 3.0, dur: 0.75 },
      { note: 0, time: 4.0, dur: 0.5 },
      { note: 2, time: 4.5, dur: 0.5 },
      { note: 3, time: 5.0, dur: 0.75 },
      { note: 5, time: 6.0, dur: 0.5 },
      { note: 4, time: 6.5, dur: 0.5 },
      { note: 2, time: 7.0, dur: 0.75 },
    ];

    // Play melody
    melody.forEach(({ note, time, dur }) => {
      playNote(notes[note], now + time, dur, 'sine');
    });

    // Bass notes (lower octave)
    const bassNotes = [
      { note: 0, time: 0, dur: 1.5 },
      { note: 3, time: 2, dur: 1.5 },
      { note: 0, time: 4, dur: 1.5 },
      { note: 2, time: 6, dur: 1.5 },
    ];

    bassNotes.forEach(({ note, time, dur }) => {
      playNote(notes[note] / 2, now + time, dur, 'triangle');
    });

    // Schedule next loop
    if (isPlayingRef.current) {
      setTimeout(() => {
        if (isPlayingRef.current) playLoop();
      }, 8000);
    }
  }, [playNote]);

  // Start music
  const startMusic = useCallback(() => {
    if (isPlayingRef.current) return;
    
    initAudio();
    
    if (audioContextRef.current?.state === 'suspended') {
      audioContextRef.current.resume();
    }
    
    isPlayingRef.current = true;
    setIsPlaying(true);
    playLoop();
  }, [initAudio, playLoop]);

  // Stop music
  const stopMusic = useCallback(() => {
    isPlayingRef.current = false;
    setIsPlaying(false);
    
    // Stop all oscillators
    oscillatorsRef.current.forEach((osc) => {
      try {
        osc.stop();
      } catch {
        // Already stopped
      }
    });
    oscillatorsRef.current = [];
  }, []);

  // Toggle music
  const toggleMusic = useCallback(() => {
    if (isPlayingRef.current) {
      stopMusic();
    } else {
      startMusic();
    }
  }, [startMusic, stopMusic]);

  // Handle user interaction
  const handleUserInteraction = useCallback(() => {
    if (!hasUserInteracted) {
      setHasUserInteracted(true);
      if (settings.musicEnabled) {
        startMusic();
      }
    }
  }, [hasUserInteracted, settings.musicEnabled, startMusic]);

  // Update volume
  useEffect(() => {
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = settings.volume;
    }
  }, [settings.volume]);

  // Handle music enabled setting
  useEffect(() => {
    if (!hasUserInteracted) return;
    
    if (settings.musicEnabled && !isPlayingRef.current) {
      startMusic();
    } else if (!settings.musicEnabled && isPlayingRef.current) {
      stopMusic();
    }
  }, [settings.musicEnabled, hasUserInteracted, startMusic, stopMusic]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopMusic();
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [stopMusic]);

  return {
    isPlaying,
    hasUserInteracted,
    startMusic,
    stopMusic,
    toggleMusic,
    handleUserInteraction,
  };
}

// Simple sound effects
export function useSoundEffects() {
  const { settings } = useSettings();
  const audioContextRef = useRef<AudioContext | null>(null);

  const initAudio = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
  }, []);

  const playSwipeSound = useCallback((liked: boolean) => {
    if (!settings.soundEnabled) return;
    
    initAudio();
    if (!audioContextRef.current) return;

    const ctx = audioContextRef.current;
    const now = ctx.currentTime;
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    if (liked) {
      // Positive sound - ascending tone
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.linearRampToValueAtTime(600, now + 0.1);
      osc.type = 'sine';
    } else {
      // Negative sound - descending tone
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.linearRampToValueAtTime(250, now + 0.15);
      osc.type = 'triangle';
    }
    
    gain.gain.setValueAtTime(settings.volume * 0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
    
    osc.start(now);
    osc.stop(now + 0.2);
  }, [settings.soundEnabled, settings.volume, initAudio]);

  const playConfettiSound = useCallback(() => {
    if (!settings.soundEnabled) return;
    
    initAudio();
    if (!audioContextRef.current) return;

    const ctx = audioContextRef.current;
    const now = ctx.currentTime;
    
    // Celebratory ascending arpeggio
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.frequency.value = freq;
      osc.type = 'sine';
      
      const startTime = now + i * 0.1;
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(settings.volume * 0.4, startTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.3);
      
      osc.start(startTime);
      osc.stop(startTime + 0.3);
    });
  }, [settings.soundEnabled, settings.volume, initAudio]);

  return {
    playSwipeSound,
    playConfettiSound,
  };
}
