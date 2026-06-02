## 2026-06-02 - Avoid `.forEach` in high-frequency render loops
**Learning:** Using array iteration methods like `.forEach` inside high-frequency render loops (e.g., `useFrame` in React Three Fiber) allocates new inline callback functions on every frame. This causes Garbage Collection (GC) pressure and micro-stutters, which is a performance anti-pattern in this architecture.
**Action:** Use standard `for` loops inside `useFrame` and other high-frequency render loops to prevent unnecessary object allocation and maintain stable framerates.
