## 2024-06-25 - Accessible R3F Canvas
**Learning:** React Three Fiber `<Canvas>` elements render without accessible semantics by default, meaning screen readers and keyboard users cannot interact with or understand them.
**Action:** Always make `<Canvas>` accessible by passing `aria-label` and `tabIndex={0}`. Because keyboard focus is applied to the wrapping `div`, apply focus styling using utility classes (e.g., Tailwind `focus-visible:outline-*`) directly on the `<Canvas>` `className` prop rather than using global CSS selectors.
