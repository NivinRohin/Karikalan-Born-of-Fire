## 2026-06-24 - @react-three/fiber Canvas component applies standard HTML attributes to an outer wrapper
**Learning:** In `@react-three/fiber`, the `<Canvas>` component correctly accepts standard HTML attributes like `tabIndex` and `aria-label`, but it applies them to an outer wrapper `<div>` element instead of the underlying `<canvas>` DOM element. This ensures that the canvas acts as an accessible block wrapper for the WebGL context.
**Action:** Always apply accessibility attributes directly to the `<Canvas>` component when adding keyboard focus and ARIA labels.
