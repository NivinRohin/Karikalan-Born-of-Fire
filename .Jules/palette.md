## 2026-06-11 - Accessible React Three Fiber Canvas
**Learning:** By default, the React Three Fiber `<Canvas>` lacks accessible semantics and keyboard focus.
**Action:** Always add `aria-label`, `tabIndex={0}`, and visible focus states (e.g., using Tailwind's `focus-visible:ring-inset`) for full-viewport canvases to prevent off-screen rendering and ensure keyboard accessibility.
