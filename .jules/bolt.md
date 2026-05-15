## 2026-05-15 - Array methods in useFrame cause GC pressure
**Learning:** Using array iteration methods like `.forEach` or `.map` inside `@react-three/fiber`'s high-frequency `useFrame` loop allocates new inline callback functions on every frame (60-120 times per second), increasing Garbage Collection (GC) pressure and causing potential stuttering.
**Action:** Always use standard `for` loops instead of array iteration methods in `useFrame` or other high-frequency render loops to minimize GC pressure and memory allocations.
