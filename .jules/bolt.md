## 2026-06-10 - Render Loop Allocation

**Learning:** In React Three Fiber, using array iteration methods like `.forEach` inside high-frequency render loops (e.g., `useFrame`) allocates new inline callback functions on every frame, causing Garbage Collection (GC) pressure and micro-stutters.
**Action:** Use standard `for` loops instead to prevent unnecessary object allocation.
