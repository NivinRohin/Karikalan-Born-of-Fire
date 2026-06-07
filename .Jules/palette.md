## 2026-06-07 - Add Keyboard Accessibility to R3F Canvas
**Learning:** By default, React Three Fiber's `<Canvas>` component lacks accessible semantics and keyboard focus. Interactive canvases require `aria-label`, `tabIndex={0}`, and visible focus states. For full-viewport canvases, `focus-visible:ring-inset` is necessary to prevent the focus ring from rendering off-screen.
**Action:** Always add ARIA labels, tabIndex, and inset focus rings to top-level interactive WebGL canvases.
