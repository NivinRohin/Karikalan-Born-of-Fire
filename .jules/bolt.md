## 2026-06-08 - React Three Fiber useFrame GC Pressure
**Learning:** Using array iteration methods like `.forEach` inside high-frequency render loops (e.g., `useFrame` in React Three Fiber) allocates new inline callback functions on every frame. This causes excessive Garbage Collection (GC) pressure and micro-stutters.
**Action:** Always use standard `for` loops inside `useFrame` or other high-frequency rendering loops to prevent unnecessary object allocation.
