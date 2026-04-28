import { Canvas } from '@react-three/fiber';
import { OrthographicCamera } from '@react-three/drei';
import { EffectComposer, Pixelation, Vignette } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import Level1 from './Level1';

function App() {
  return (
    <Canvas
      style={{ width: '100vw', height: '100vh', background: '#050505' }}
      aria-label="Karikalan: Born of Fire 3D game scene"
      tabIndex={0}
      className="focus-visible:ring-4 focus-visible:ring-white focus-visible:ring-inset focus-visible:outline-none"
    >
      {/*
        OrthographicCamera configuration for 2.5D side-scrolling perspective.
        It faces down the Z-axis, showing only X and Y axes.
        Zoom level adjusted for clear visibility of elements.
      */}
      <OrthographicCamera
        makeDefault
        position={[2, 0, 10]}
        zoom={100}
        near={0.1}
        far={1000}
      />

      {/* Lighting */}
      <ambientLight intensity={0.2} color="#1a1a1a" />
      {/* Fiery orange PointLight near the left edge to illuminate the starting cell */}
      <pointLight
        position={[-1, 0, 5]}
        intensity={2.5}
        color="#ff6600"
        distance={20}
        decay={2}
      />

      <Level1 />

      {/* Postprocessing effects simulating an early 2000s low-resolution LCD */}
      <EffectComposer>
        <Pixelation granularity={5} />
        <Vignette
          offset={0.4}
          darkness={0.7}
          blendFunction={BlendFunction.NORMAL}
        />
      </EffectComposer>
    </Canvas>
  );
}

export default App;
