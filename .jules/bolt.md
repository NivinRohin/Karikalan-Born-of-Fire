## 2024-05-18 - Avoid array methods in useFrame loops
**Learning:** In React Three Fiber, using array iteration methods like `.forEach` or `.map` inside `useFrame` creates new inline callback functions every frame (60-120 times per second), causing severe Garbage Collection (GC) pressure and potential frame drops.
**Action:** Use standard `for` loops inside high-frequency render loops like `useFrame` to avoid continuous function allocation overhead.
