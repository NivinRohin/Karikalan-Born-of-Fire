## 2026-04-20 - [Preventing Per-Frame Closure Allocations in useFrame]
**Learning:** In high-frequency React Three Fiber game loops (`useFrame`), using array methods like `.forEach` inside the loop allocates closures on every frame. Over time (60-120 frames per second), this generates substantial garbage collection (GC) pressure, which can cause frame stuttering in low-end devices.
**Action:** Always prefer traditional `for` loops when iterating over arrays or children inside the `useFrame` hook to avoid per-frame closure allocations.
