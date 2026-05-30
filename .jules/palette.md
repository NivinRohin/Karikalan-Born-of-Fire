## 2026-05-30 - Keyboard Accessibility for React Three Fiber Canvas
**Learning:** React Three Fiber `<Canvas>` components do not inherently receive keyboard focus or provide accessible semantics to screen readers. This means interactive 3D content can be completely inaccessible to keyboard users unless explicitly configured.
**Action:** Always add `aria-label`, `tabIndex={0}`, and explicit focus styles (e.g., using Tailwind's `focus-visible:ring-inset`) to full-viewport `<Canvas>` components to ensure they are discoverable and usable by assistive technologies and keyboard navigation.
