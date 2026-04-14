import { render } from '@testing-library/react';
import { describe, it, vi, expect, beforeAll } from 'vitest';
import App from './App';

// Suppress console.error specifically for react rendering lowercase HTML elements (R3F elements)
// that are invalid in standard DOM, to keep the test output clean.
beforeAll(() => {
  const originalError = console.error;
  vi.spyOn(console, 'error').mockImplementation((...args) => {
    if (typeof args[0] === 'string' && (args[0].includes('is using incorrect casing') || args[0].includes('is unrecognized in this browser'))) {
      return;
    }
    originalError(...args);
  });
});

// Mock the Canvas to avoid actual WebGL rendering issues in jsdom.
// We just render its children to allow testing the 3D scene structure superficially.
vi.mock('@react-three/fiber', () => ({
  Canvas: ({ children, style }) => <div data-testid="mock-canvas" style={style}>{children}</div>
}));

// Mock Level1
vi.mock('./Level1', () => ({
  default: () => <div data-testid="level1-mock" />
}));

// Mock Postprocessing effects
vi.mock('@react-three/postprocessing', () => ({
  EffectComposer: ({ children }) => <div data-testid="effect-composer">{children}</div>,
  Pixelation: () => <div data-testid="pixelation-effect" />,
  Vignette: () => <div data-testid="vignette-effect" />
}));

// Mock OrthographicCamera
vi.mock('@react-three/drei', () => ({
  OrthographicCamera: () => <div data-testid="orthographic-camera" />
}));

describe('App Component', () => {
  it('renders the mocked canvas with correct styles', () => {
    const { getByTestId } = render(<App />);
    const canvas = getByTestId('mock-canvas');
    expect(canvas).toBeInTheDocument();
    expect(canvas).toHaveStyle({ width: '100vw', height: '100vh', background: '#050505' });
  });

  it('renders the camera, lights, level, and effects', () => {
    const { getByTestId, container } = render(<App />);

    // Check for camera
    expect(getByTestId('orthographic-camera')).toBeInTheDocument();

    // Check for lights
    // R3F primitives map to lowercase strings in standard React DOM render
    expect(container.querySelector('ambientlight')).toBeInTheDocument();
    expect(container.querySelector('pointlight')).toBeInTheDocument();

    // Check for level
    expect(getByTestId('level1-mock')).toBeInTheDocument();

    // Check for effects
    expect(getByTestId('effect-composer')).toBeInTheDocument();
    expect(getByTestId('pixelation-effect')).toBeInTheDocument();
    expect(getByTestId('vignette-effect')).toBeInTheDocument();
  });
});
