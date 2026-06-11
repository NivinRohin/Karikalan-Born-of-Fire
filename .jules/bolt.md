## 2026-06-11 - Prevent GC Stutters in R3F useFrame Loop
**Learning:** Using array iteration methods like `.forEach` inside high-frequency render loops (e.g., `useFrame` in React Three Fiber) allocates new inline callback functions on every frame (60+ times per second). This causes Garbage Collection (GC) pressure and micro-stutters.
**Action:** Always use standard `for` loops instead of `.forEach` or `.map` inside `useFrame` or other high-frequency rendering loops to prevent unnecessary object allocation.
