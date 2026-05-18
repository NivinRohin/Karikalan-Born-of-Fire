## 2026-05-18 - React Three Fiber Canvas Accessibility
**Learning:** React Three Fiber `<Canvas>` elements lack accessible semantics by default. Keyboard focus events, `aria-label`, and `className` (e.g. for focus styling) apply to its wrapper `div` rather than the internal HTML `<canvas>` tag itself.
**Action:** When adding accessibility (aria-label, tabIndex, focus styles) to R3F applications, apply them directly to the `<Canvas>` component in React, and ensure focus rings have `ring-inset` if they take up the full viewport to prevent the outline from rendering off-screen.
