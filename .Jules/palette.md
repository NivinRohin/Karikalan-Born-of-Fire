## 2026-06-18 - React Three Fiber Canvas Accessibility
**Learning:** In `@react-three/fiber`, the `<Canvas>` component accepts standard HTML attributes like `aria-label` and `tabIndex`, but applies them to its outer wrapper `<div>` rather than the underlying `<canvas>` DOM element.
**Action:** Always apply standard HTML accessibility attributes and focus utility classes directly to `<Canvas>` components to ensure the 3D scene container is discoverable by screen readers and properly styled for keyboard navigation.
