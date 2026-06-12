## 2026-06-12 - Render Loop GC Optimization
**Learning:** Using array iteration methods like `.forEach` inside high-frequency render loops (e.g., `useFrame`) allocates new inline callback functions on every frame, causing Garbage Collection (GC) pressure and micro-stutters in React Three Fiber.
**Action:** Use standard `for` loops inside `useFrame` or other render loops to prevent unnecessary object allocation.
