## 2026-05-22 - Reduce GC overhead in useFrame
**Learning:** In high-frequency render loops like useFrame in React Three Fiber, array iteration methods like .forEach or .map allocate new inline callback functions on every frame, which creates unnecessary Garbage Collection (GC) pressure.
**Action:** Use standard for loops instead of array iteration methods to avoid continuous memory allocation in render loops.
