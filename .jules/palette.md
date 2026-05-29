## 2026-05-29 - Accessible React Three Fiber Canvas
**Learning:** Default React Three Fiber `<Canvas>` elements lack semantic meaning and keyboard focus, making 3D experiences completely inaccessible to keyboard and screen reader users.
**Action:** Always add `aria-label`, `tabIndex={0}`, and visible focus states (e.g. `focus-visible:ring-inset`) to full-viewport `<Canvas>` components to ensure they can be focused and announced by assistive technologies.
