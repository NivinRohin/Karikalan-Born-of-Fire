## 2026-06-10 - React Three Fiber Canvas Accessibility
**Learning:** By default, the React Three Fiber `<Canvas>` component lacks accessible semantics and keyboard focus, making interactive 3D content invisible to screen readers and unreachable via keyboard navigation.
**Action:** Always add `aria-label`, `tabIndex={0}`, and visible focus states (e.g., using Tailwind's `focus-visible:ring-inset` for full-viewport canvases to prevent off-screen rendering) to `<Canvas>` components.
