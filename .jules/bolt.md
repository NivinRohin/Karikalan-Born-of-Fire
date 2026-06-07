## 2026-06-07 - Optimize React Three Fiber Render Loops

**Learning:** Using array iteration methods like `.forEach` inside high-frequency render loops (e.g., `useFrame`) allocates new inline callback functions on every frame. This causes unnecessary Garbage Collection (GC) pressure and micro-stutters, particularly in rendering engines where 60+ FPS is expected.
**Action:** Always use standard `for` loops instead of `.forEach` or `.map` inside `useFrame` or `requestAnimationFrame` blocks to prevent unnecessary object allocation and ensure smooth performance.
