## 2024-05-24 - Avoid Array Iterators in useFrame

**Learning:** Using array iteration methods like `.forEach` or `.map` inside high-frequency loops like React Three Fiber's `useFrame` is a performance anti-pattern. It allocates a new inline callback function on every frame (up to 60+ times per second), increasing Garbage Collection (GC) pressure and potentially causing frame drops.

**Action:** Always use standard `for` loops instead of array iteration methods when iterating over elements within `useFrame` or other high-frequency render loops to avoid allocating new inline functions.
