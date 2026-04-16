import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { screen } from '@testing-library/react';

// Mock everything that uses R3F hooks
vi.mock('./App.jsx', () => ({
  default: () => <div data-testid="mock-app">Mocked App</div>
}));

describe('Application Entry Point (main.jsx)', () => {
  let consoleErrorSpy;

  beforeEach(() => {
    // Setup document body with the root element expected by main.jsx
    document.body.innerHTML = '<div id="root"></div>';

    // Suppress React warnings
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    // Reset module registry so main.jsx runs completely fresh each time
    vi.resetModules();
  });

  afterEach(() => {
    // Clean up
    document.body.innerHTML = '';
    consoleErrorSpy.mockRestore();
    vi.clearAllMocks();
  });

  it('renders the App component without crashing', async () => {
    // Dynamically import main.jsx to execute its side effects (rendering to #root)
    await import('./main.jsx');

    // Verify the App mock was rendered
    const appMock = await screen.findByTestId('mock-app');
    expect(appMock).toBeInTheDocument();

    // Check that there is content inside the root div
    const rootElement = document.getElementById('root');
    expect(rootElement).not.toBeEmptyDOMElement();
  });
});
