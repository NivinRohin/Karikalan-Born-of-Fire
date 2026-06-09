## 2026-06-09 - Avoid Inline Callbacks in High-Frequency Render Loops
**Learning:** Using array iteration methods like `.forEach` inside high-frequency render loops (e.g., `useFrame` in React Three Fiber) allocates new inline callback functions on every frame. This causes unnecessary Garbage Collection (GC) pressure, which can lead to micro-stutters and dropped frames in complex 3D scenes.
**Action:** Always use standard `for` loops instead of `.forEach` or `.map` inside `useFrame` or other requestAnimationFrame callbacks to prevent unnecessary object allocation.
