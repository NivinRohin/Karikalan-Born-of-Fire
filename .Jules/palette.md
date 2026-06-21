## 2026-06-21 - Added Accessibility to React Three Fiber Canvas
**Learning:** The `@react-three/fiber` `<Canvas>` component accepts standard HTML attributes like `tabIndex` and `aria-label`, but they are applied to an outer wrapper `<div>` rather than the `<canvas>` DOM element itself.
**Action:** Ensure custom focus styling and ARIA attributes are applied to the `<Canvas>` wrapper element to improve keyboard accessibility and screen reader support.
