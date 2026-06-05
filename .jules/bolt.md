## 2026-06-05 - Avoid GC pressure in useFrame
**Learning:** Using array iteration methods like `.forEach` inside high-frequency render loops (e.g., `useFrame` in React Three Fiber) allocates new inline callback functions on every frame, causing Garbage Collection (GC) pressure and micro-stutters.
**Action:** Use standard `for` loops inside `useFrame` and other render loops to prevent unnecessary object allocation.
