## 2026-06-03 - Avoid Array Iterators in Render Loops
**Learning:** In React Three Fiber, using array iteration methods like `.forEach` inside high-frequency render loops (e.g., `useFrame`) allocates new inline callback functions on every frame, causing Garbage Collection (GC) pressure and micro-stutters.
**Action:** Use standard `for` loops instead to prevent unnecessary object allocation inside `useFrame`.
