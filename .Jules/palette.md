## 2026-06-12 - Canvas Keyboard Accessibility
**Learning:** React Three Fiber `<Canvas>` components lack accessible semantics and keyboard focus by default, hiding interactive 3D content from screen readers and keyboard users.
**Action:** Always add `aria-label`, `tabIndex={0}`, and visible focus states (e.g., Tailwind `focus-visible:ring-inset`) to interactive `<Canvas>` components.
