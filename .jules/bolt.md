## 2026-05-30 - Prevent GC overhead in useFrame
**Learning:** Using array iteration methods like `.forEach` inside high-frequency render loops (like React Three Fiber's `useFrame`) allocates new inline callback functions on every single frame, causing significant Garbage Collection (GC) pressure and potential stuttering.
**Action:** Always use standard `for` loops instead of array iteration methods inside `useFrame` and other high-frequency loops to avoid unnecessary object allocations.
