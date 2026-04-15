## 2024-05-14 - React Three Fiber useFrame GC Pressure
**Learning:** Found a component (`FirePit`) using `.forEach()` inside `useFrame`. `useFrame` runs 60+ times per second, and array methods like `.forEach` or `.map` inside it create inline functions (closures) on every frame. Over time, this leads to significant Garbage Collection (GC) pressure, which is a major cause of micro-stutters in frame rendering.
**Action:** Replace array methods that use callbacks (like `.forEach`) with traditional `for` loops inside `useFrame` hooks to eliminate per-frame closure allocations.
