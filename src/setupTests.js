import '@testing-library/jest-dom';

// ResizeObserver is not available in jsdom, we need to mock it
// if our components or libraries use it.
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

window.ResizeObserver = ResizeObserver;
