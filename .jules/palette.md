## 2024-05-24 - React Three Fiber Canvas Accessibility
**Learning:** R3F `<Canvas>` elements render without accessible semantics by default, making the entire 3D scene invisible to screen readers and keyboard users.
**Action:** Always add `aria-label` and `tabIndex={0}` to `<Canvas>`. Apply focus styling (e.g., `focus-visible:ring-inset`) via the `className` prop since focus is applied to the wrapping `div` injected by R3F.
