## 2023-10-27 - Full-viewport Canvas Accessibility Focus Indicators
**Learning:** When making a full-viewport React Three Fiber `<Canvas>` keyboard-accessible, adding a standard focus ring (e.g., `ring-4`) can cause the focus indicator to render completely off-screen, providing no visual feedback to keyboard users.
**Action:** Use an inset focus ring utility (e.g., Tailwind's `ring-inset`) on the `<Canvas>` wrapper's `className` prop when it occupies the full viewport, ensuring the focus indicator remains visible inside the viewport bounds.
