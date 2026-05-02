## 2023-10-27 - Focus Visible Ring on Full-Viewport Canvases
**Learning:** When making a full-viewport React Three Fiber `<Canvas>` keyboard accessible, the focus ring applied to the wrapper `div` can render off-screen if standard focus classes (like `ring-2`) are used, leading to an invisible focus state.
**Action:** Always use `ring-inset` (or equivalent CSS) in combination with focus classes (e.g., `focus-visible:ring-inset`) on full-viewport canvases to ensure the focus indicator is drawn inside the boundary and remains visible.
