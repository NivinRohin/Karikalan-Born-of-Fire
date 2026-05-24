## 2026-05-24 - Avoid array iteration methods in `useFrame`
**Learning:** Using array iteration methods like `.forEach` or `.map` inside high-frequency render loops (like `@react-three/fiber`'s `useFrame`) creates a new inline callback function on every frame. This continuous allocation causes significant Garbage Collection (GC) pressure, which can lead to micro-stutters and frame drops.
**Action:** Always use standard `for` loops instead of array iteration methods when iterating over arrays or collections inside `useFrame` or other high-frequency loops.
