## 2026-06-08 - Add keyboard accessibility to 3D Canvas
**Learning:** React Three Fiber `<Canvas>` components lack keyboard accessibility and accessible semantics by default, rendering interactive 3D content invisible to screen readers and keyboard navigation.
**Action:** Always add `aria-label`, `tabIndex={0}`, and visible focus states (e.g., using `focus-visible:ring-inset` for full-viewport canvases to prevent off-screen rendering) to interactive `<Canvas>` components to ensure accessibility.
