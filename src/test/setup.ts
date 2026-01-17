import '@testing-library/jest-dom';

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});

// Mock localStorage
const localStorageMock = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
  clear: () => {},
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Mock AudioContext
class AudioContextMock {
  createOscillator() {
    return {
      connect: () => {},
      start: () => {},
      stop: () => {},
      frequency: { value: 0, setValueAtTime: () => {}, linearRampToValueAtTime: () => {} },
      type: 'sine',
    };
  }
  createGain() {
    return {
      connect: () => {},
      gain: { value: 1, setValueAtTime: () => {}, linearRampToValueAtTime: () => {}, exponentialRampToValueAtTime: () => {} },
    };
  }
  get currentTime() {
    return 0;
  }
  get state() {
    return 'running';
  }
  resume() {
    return Promise.resolve();
  }
  close() {
    return Promise.resolve();
  }
  get destination() {
    return {};
  }
}

Object.defineProperty(window, 'AudioContext', {
  writable: true,
  value: AudioContextMock,
});

Object.defineProperty(window, 'webkitAudioContext', {
  writable: true,
  value: AudioContextMock,
});
