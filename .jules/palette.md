## 2024-04-29 - Canvas Accessibility Pattern
**Learning:** React Three Fiber `<Canvas>` components lack accessible semantics by default, rendering as invisible to screen readers and keyboard navigation.
**Action:** Always add `aria-label`, `tabIndex={0}`, and visible focus styling (e.g., Tailwind `focus-visible:ring-inset` for full-screen canvases) to the `<Canvas>` element so it is navigable and announced correctly.
