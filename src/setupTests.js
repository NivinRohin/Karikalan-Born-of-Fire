import { vi } from 'vitest';

global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

const originalConsoleError = console.error;
console.error = (...args) => {
  if (typeof args[0] === 'string') {
    if (args[0].includes('is unrecognized in this browser') ||
        args[0].includes('is using incorrect casing.') ||
        args[0].includes('does not recognize the `userData` prop') ||
        args[0].includes('React does not recognize the')) {
      return;
    }
  }
  originalConsoleError(...args);
};
