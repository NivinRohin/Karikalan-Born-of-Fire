## 2026-06-15 - Improve React Three Fiber Canvas Accessibility
**Learning:** The default React Three Fiber `<Canvas>` component lacks intrinsic semantic meaning and cannot receive keyboard focus, completely preventing keyboard and screen reader users from discovering or interacting with the 3D scene.
**Action:** Always manually provide `aria-label`, `tabIndex={0}`, and explicit visible focus states (e.g., via Tailwind's `focus-visible:ring-inset` for full-viewport canvases) to any interactive `<Canvas>`.
