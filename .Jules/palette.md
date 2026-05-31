## 2026-05-31 - Canvas Keyboard Accessibility
**Learning:** By default, the React Three Fiber `<Canvas>` lacks accessible semantics and keyboard focus, effectively making the 3D scene invisible to screen readers and unreachable by keyboard navigation.
**Action:** Always add `aria-label`, `tabIndex={0}`, and visible focus states (e.g., using Tailwind's `focus-visible:ring-inset` for full-viewport canvases to prevent off-screen rendering) to interactive `<Canvas>` components.
