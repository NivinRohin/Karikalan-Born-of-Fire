## 2026-06-19 - Accessible R3F Canvas
**Learning:** In `@react-three/fiber`, the `<Canvas>` component applies standard HTML attributes like `aria-label` and `tabIndex` to an outer wrapper `<div>` rather than the underlying `<canvas>` DOM element itself.
**Action:** Always apply `focus-visible` utility classes directly to the `<Canvas>` component to style this wrapper, ensuring the 3D scene provides visible focus indicators for keyboard users without causing invisible focus traps.
