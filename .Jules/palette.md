## 2024-07-07 - React Three Fiber Canvas Attributes
**Learning:** R3F's `<Canvas>` component accepts standard HTML attributes (like `className`, `tabIndex`, and `aria-label`), but applies them to an outer wrapper `<div>` element rather than the underlying `<canvas>` DOM element itself.
**Action:** When adding accessibility (like `aria-label` or focus states) to a WebGL scene, apply them directly to the `<Canvas>` tag. To target these elements in tests or stylesheets, query the wrapper `<div>` (e.g., `div[tabindex="0"]`) instead of the `<canvas>` element.
