## 2026-06-05 - Accessible R3F Canvas
**Learning:** By default, the React Three Fiber `<Canvas>` lacks semantic meaning and keyboard focus, making 3D scenes completely invisible to screen readers and keyboard users.
**Action:** Always add `aria-label`, `tabIndex={0}`, and visible focus states (e.g., `focus-visible:ring-inset`) to full-viewport `<Canvas>` components to ensure they are discoverable and focusable without rendering focus rings off-screen.
