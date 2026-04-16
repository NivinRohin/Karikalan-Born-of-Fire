import React from 'react';
import { render } from '@testing-library/react';
import { vi, describe, it, expect, beforeAll, afterAll } from 'vitest';
import App from './App';

// Mock Canvas from @react-three/fiber
vi.mock('@react-three/fiber', () => ({
  Canvas: ({ children, style, ...props }) => (
    <div data-testid="mock-canvas" style={style} {...props}>
      {children}
    </div>
  ),
}));

// Mock @react-three/drei components
vi.mock('@react-three/drei', () => ({
  OrthographicCamera: () => <div data-testid="mock-orthographic-camera" />,
}));

// Mock @react-three/postprocessing components
vi.mock('@react-three/postprocessing', () => ({
  EffectComposer: ({ children }) => <div data-testid="mock-effect-composer">{children}</div>,
  Pixelation: () => <div data-testid="mock-pixelation" />,
  Vignette: () => <div data-testid="mock-vignette" />,
}));

// Mock Level1 since we don't need to test its implementation details here
vi.mock('./Level1', () => ({
  default: () => <div data-testid="mock-level1" />,
}));

describe('App Component', () => {
  let consoleErrorSpy;

  beforeAll(() => {
    // Suppress console.error for unrecognized 3D primitives (ambientLight, pointLight)
    // that react thinks should be uppercase standard DOM elements
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation((msg, ...args) => {
      if (
        typeof msg === 'string' &&
        (msg.includes('The tag <%s> is unrecognized in this browser') ||
         msg.includes('React does not recognize the `%s` prop on a DOM element') ||
         msg.includes('<%s /> is using incorrect casing'))
      ) {
        return;
      }
      // Pass through other errors
      console.warn(msg, ...args);
    });
  });

  afterAll(() => {
    consoleErrorSpy.mockRestore();
  });

  it('renders the mocked Canvas without crashing', () => {
    const { getByTestId } = render(<App />);

    const canvas = getByTestId('mock-canvas');
    expect(canvas).toBeInTheDocument();
  });

  it('contains the orthographic camera', () => {
    const { getByTestId } = render(<App />);

    const camera = getByTestId('mock-orthographic-camera');
    expect(camera).toBeInTheDocument();
  });

  it('renders Level1 component', () => {
    const { getByTestId } = render(<App />);

    const level1 = getByTestId('mock-level1');
    expect(level1).toBeInTheDocument();
  });

  it('includes postprocessing effects', () => {
    const { getByTestId } = render(<App />);

    const composer = getByTestId('mock-effect-composer');
    const pixelation = getByTestId('mock-pixelation');
    const vignette = getByTestId('mock-vignette');

    expect(composer).toBeInTheDocument();
    expect(pixelation).toBeInTheDocument();
    expect(vignette).toBeInTheDocument();
  });
});
