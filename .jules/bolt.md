## 2024-05-17 - High-frequency R3F loops optimization
**Learning:** In high-frequency render loops like `useFrame` (@react-three/fiber), standard `for` loops are significantly faster and reduce Garbage Collection (GC) pressure compared to array iteration methods (like `.forEach` or `.map`) because they avoid allocating new inline callback functions on every frame.
**Action:** Always refactor array iteration methods to standard `for` loops within `useFrame`.

## 2024-05-17 - Pre-allocating Geometries and Materials
**Learning:** Three.js geometries and materials are expensive to create. Creating them inline within React Three Fiber components inside a loop or mapping function causes them to be re-instantiated multiple times or per component instance.
**Action:** Pre-allocate standard geometries (like `ConeGeometry`, `BoxGeometry`) and materials outside of the component. When reusing pre-allocated resources, remember to pass `dispose={null}` to the `<mesh>` to prevent R3F's auto-dispose system from destroying the shared resource upon component unmount. For dynamic configurations (e.g. `args`, `color`), use a caching system like `new Map()` based on stringified arguments.
