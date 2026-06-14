## 2026-06-14 - React Three Fiber Canvas Accessibility
**Learning:** By default, the React Three Fiber `<Canvas>` lacks accessible semantics and keyboard focus, which makes full-screen 3D experiences inaccessible. Additionally, applying standard focus rings to a full-viewport element can result in the ring rendering off-screen due to default box-sizing or clipping.
**Action:** Always add `aria-label`, `tabIndex={0}`, and visible focus states (e.g., `focus-visible:ring-inset` via Tailwind) directly to the `<Canvas>` component to ensure keyboard navigability and visible focus without clipping.
