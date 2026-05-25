## 2026-05-25 - Avoid Array Methods in useFrame
**Learning:** In React Three Fiber's high-frequency render loop (`useFrame`), using array iteration methods like `.forEach` or `.map` allocates new inline callback functions 60+ times per second, increasing Garbage Collection (GC) pressure.
**Action:** Always use standard `for` loops instead of array iteration methods inside `useFrame` or other high-frequency rendering callbacks to minimize object allocation and maintain a smooth framerate.
