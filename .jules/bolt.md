## 2026-05-27 - Avoid inline callbacks in high-frequency R3F render loops
**Learning:** In React Three Fiber, using array iteration methods like `.forEach`, `.map`, or inline arrow functions inside `useFrame` creates new function instances on every single frame. This causes unnecessary Garbage Collection (GC) pressure and can lead to frame drops and jittery animations.
**Action:** Always use standard `for` loops or pre-allocate functions outside of the `useFrame` hook to iterate over elements and avoid reallocations on every frame.
