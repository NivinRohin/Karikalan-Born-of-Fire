## 2024-05-18 - React Three Fiber Loop Optimization
**Learning:** In React Three Fiber (R3F), using array methods like `.forEach()` or `.map()` inside `useFrame` creates inline callback functions 60 times a second, causing massive Garbage Collection (GC) pressure and potential frame drops.
**Action:** Always replace array iterators inside `useFrame` with standard `for` loops.

## 2024-05-18 - R3F Shared Object State Mutation
**Learning:** Passing the exact same object instance (like a pre-allocated `ConeGeometry`) to multiple `<primitive>` components is an anti-pattern. R3F attaches internal Fiber state (`__r3f`) directly to the objects, so reusing them across multiple wrappers causes state conflicts and critical regressions.
**Action:** Pass shared instances directly to the `geometry` or `material` props of `<mesh>` instead, and ensure you set `dispose={null}` so R3F does not automatically destroy the shared resource if one instance unmounts.
