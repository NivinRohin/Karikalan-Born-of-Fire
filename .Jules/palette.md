## 2026-06-04 - Accessible React Three Fiber Canvas
**Learning:** By default, the React Three Fiber `<Canvas>` lacks accessible semantics and keyboard focus, which prevents screen reader users from understanding the context and keyboard users from interacting.
**Action:** Always add `aria-label`, `tabIndex={0}`, and visible focus states (e.g., Tailwind's `focus-visible:ring-inset` to prevent off-screen rendering on full-viewport canvases) to make interactive `<Canvas>` components accessible.
