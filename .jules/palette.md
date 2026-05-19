## 2024-05-19 - Accessible React Three Fiber Canvases
**Learning:** R3F `<Canvas>` elements render without accessible semantics by default, breaking keyboard navigation and screen readers. Because keyboard focus is applied to the wrapping `div`, standard focus styles (`ring`, `outline`) can be cut off on full-viewport canvases.
**Action:** Always add `aria-label` and `tabIndex={0}` to `<Canvas>`. Use `className` with `focus-visible:ring-inset` (or equivalent) to ensure the focus ring renders inside the viewport boundaries.
