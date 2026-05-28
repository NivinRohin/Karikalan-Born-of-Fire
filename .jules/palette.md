## 2026-05-28 - React Three Fiber Canvas Accessibility
**Learning:** By default, the React Three Fiber `<Canvas>` lacks accessible semantics and keyboard focus, making the 3D scene invisible to screen readers and unreachable via keyboard navigation.
**Action:** Always add `aria-label`, `tabIndex={0}`, and visible focus styles (e.g. `focus-visible:ring-inset`) to `<Canvas>` components to ensure they are accessible.
