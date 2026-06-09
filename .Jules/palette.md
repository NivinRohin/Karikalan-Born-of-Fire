## 2026-06-09 - Accessible React Three Fiber Canvas
**Learning:** By default, the React Three Fiber `<Canvas>` component lacks accessible semantics and keyboard focus, acting as an opaque, non-interactive block to screen readers and keyboard users.
**Action:** Always add `aria-label`, `tabIndex={0}`, and visible focus states (e.g., using Tailwind's `focus-visible:ring-inset` for full-viewport canvases to prevent off-screen rendering) to make interactive 3D content accessible.
