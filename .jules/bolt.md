## 2026-06-01 - Avoid allocating inline functions inside useFrame

**Learning:** Inside high-frequency render loops like `useFrame` (which runs at 60+ FPS), using array iteration methods like `.forEach` allocates a new inline callback function on every frame. This can cause high Garbage Collection (GC) pressure and lead to micro-stutters.
**Action:** Always use standard `for` loops inside `useFrame` or other hot paths in React Three Fiber to avoid unnecessary object allocation and minimize GC overhead.
