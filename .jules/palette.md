## 2024-03-08 - Canvas Accessibility in React Three Fiber
**Learning:** React Three Fiber `<Canvas>` elements are inherently inaccessible because they render as empty images without semantics. They do not automatically provide any accessible context for screen readers or keyboard focus navigation.
**Action:** Always add explicit `aria-label` to describe the 3D scene's purpose, and assign `tabIndex={0}` to allow keyboard users to focus the interactive game area. Pair this with a `canvas:focus-visible` CSS rule so users can see when the canvas has focus.

**Refined Action:** The `<Canvas>` itself does not receive focus, the `<div>` wrapping it gets the focus. Make sure the css selector targets the `div[tabindex="0"]:focus-visible` or similar.
