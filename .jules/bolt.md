## 2024-05-24 - R3F useFrame Loop Optimization
**Learning:** In high-frequency animation hooks like `useFrame` (@react-three/fiber), array iteration methods like `.forEach()` create new closure scopes every frame. This causes continuous memory allocations, leading to increased garbage collection pressure and noticeable micro-stutters.
**Action:** Always prefer traditional `for` loops or `for...of` without closures in high-frequency rendering contexts to keep memory allocation flat per frame.
