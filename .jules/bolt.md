## 2024-11-20 - GC Pressure in useFrame
**Learning:** In high-frequency animation hooks like `useFrame` (@react-three/fiber), traditional `for` loops should be preferred over `.forEach()` to eliminate per-frame closure allocations and reduce garbage collection pressure.
**Action:** Always refactor `.forEach()` and `.map()` calls within `useFrame` to standard `for` or `while` loops, and avoid creating functions inside `useFrame`.
