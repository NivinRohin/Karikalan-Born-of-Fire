## 2024-03-24 - Avoiding per-frame closure allocations in `useFrame`
**Learning:** In high-frequency animation loops like React Three Fiber's `useFrame`, array iterator methods such as `.forEach()` create new closures on every single frame, significantly increasing garbage collection pressure and leading to stutter on low-end devices.
**Action:** Always prefer traditional `for` loops within `useFrame`.

## 2024-03-24 - Do not use `crypto.getRandomValues` in render loops
**Learning:** Replacing `Math.random()` with `window.crypto.getRandomValues()` inside `useFrame` causes severe performance degradation. Cryptographically Secure Pseudo-Random Number Generators (CSPRNG) are computationally expensive, and executing them 60+ times per second for multiple elements actively lowers the application framerate. Security flags like "Insecure Randomness" are false positives when applied to non-security critical visual effects in WebGL animation loops.
**Action:** Always use `Math.random()` for visual effects and animation noise inside render loops, even if flagged by generalized security linters, as speed is paramount.