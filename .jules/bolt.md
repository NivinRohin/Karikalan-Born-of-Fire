## 2024-05-24 - Reducing GC Pressure in R3F useFrame
**Learning:** In `@react-three/fiber`, high-frequency render loops like `useFrame` cause excessive Garbage Collection (GC) pressure when using array methods like `.forEach` or `.map`, because they allocate new inline callback functions on every frame.
**Action:** Use standard `for` loops in `useFrame` callbacks and pre-allocate geometries/materials outside components (reusing them with `dispose={null}`) to prevent frequent allocations and automatic disposals.
