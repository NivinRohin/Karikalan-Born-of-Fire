## 2026-06-06 - Prevent GC pressure in render loop
**Learning:** Using array iteration methods like `.forEach` inside high-frequency render loops (e.g., `useFrame`) allocates new inline callback functions on every frame, causing Garbage Collection (GC) pressure and micro-stutters.
**Action:** Use standard `for` loops instead to prevent unnecessary object allocation in `useFrame` or similar high-frequency hooks.
