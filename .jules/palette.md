## 2024-05-16 - React Three Fiber Canvas Accessibility
**Learning:** React Three Fiber `<Canvas>` elements render without accessible semantics by default, and keyboard focus is applied to the wrapping `div` rather than the internal `<canvas>` element.
**Action:** When making full-viewport canvases keyboard accessible, apply `aria-label`, `tabIndex={0}`, and utility classes (e.g., Tailwind `focus-visible:ring-inset`) to the `<Canvas>` component to ensure the focus indicator is visible and not pushed off-screen.
