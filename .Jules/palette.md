## 2026-06-03 - Focus Rings on Full-Viewport Canvases
**Learning:** By default, React Three Fiber `<Canvas>` elements lack accessible semantics and focus. Adding standard focus rings can cause them to render off-screen if the canvas is full viewport.
**Action:** Always add `tabIndex={0}`, an appropriate `aria-label`, and use inset focus rings (like Tailwind's `focus-visible:ring-inset`) on full-viewport R3F canvases to ensure keyboard users can see the focus state.
