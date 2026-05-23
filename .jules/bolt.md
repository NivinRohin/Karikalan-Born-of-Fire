## 2026-05-23 - Avoid .forEach in useFrame

**Learning:** In high-frequency React Three Fiber render loops (like `useFrame` running 60+ times per second), using array iteration methods like `.forEach` or `.map` causes a new inline callback function to be allocated and garbage collected on every frame. This creates significant Garbage Collection (GC) pressure and can lead to micro-stutters in the animation.
**Action:** Always use standard `for` loops instead of array iteration methods inside `useFrame` to avoid allocating new functions on every frame and improve overall rendering performance.
