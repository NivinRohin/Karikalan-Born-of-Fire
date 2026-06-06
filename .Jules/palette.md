## 2026-06-06 - Accessible Canvas Components
**Learning:** React Three Fiber `<Canvas>` elements by default lack accessible semantics and keyboard focus capabilities, creating an immediate barrier for screen reader and keyboard users in full-viewport WebGL apps.
**Action:** Always wrap R3F Canvas components with explicit `aria-label`, `tabIndex={0}`, and visible focus states (e.g. `focus-visible:ring-inset` for full-viewport canvases to prevent off-screen rendering) to ensure they are discoverable and usable.
