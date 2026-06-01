## 2026-06-01 - Accessible React Three Fiber Canvas
**Learning:** React Three Fiber `<Canvas>` elements lack accessible semantics and keyboard focus by default, rendering them invisible to screen readers and keyboard-only users.
**Action:** Always add `aria-label`, `tabIndex={0}`, and visible focus states (e.g., `className="focus-visible:ring-inset"`) to `<Canvas>` components to ensure accessibility.
