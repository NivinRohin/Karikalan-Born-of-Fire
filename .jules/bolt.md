## 2024-05-06 - [R3F Geometry & Material Pre-allocation]
**Learning:** React Three Fiber (R3F) recreates instances (like geometries and materials) if passed directly inline inside loop renders, increasing memory overhead and GC. Using a standard `for` loop in `useFrame` reduces inline callback GC pressure compared to `.forEach()`.
**Action:** Always pre-allocate shared geometries and materials outside of R3F components and set `dispose={null}` to prevent premature resource cleanup. In `useFrame`, prefer standard `for` loops.
