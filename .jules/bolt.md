## 2026-05-28 - Reusing Geometries and Materials
**Learning:** Reusing pre-allocated Three.js geometries/materials requires `dispose={null}` to prevent R3F's automatic disposal system from destroying shared resources.
**Action:** Apply `dispose={null}` to the `<mesh>` element to prevent R3F's automatic disposal system from destroying the shared resource upon component unmount.
