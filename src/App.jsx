import { Canvas } from '@react-three/fiber';
import { OrthographicCamera } from '@react-three/drei';
import { EffectComposer, Pixelation, Vignette } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import Level1 from './Level1';
import { CAMERA_CONFIG, LIGHTS_CONFIG, POST_PROCESSING_CONFIG } from './appConfig';

function App() {
  return (
    <Canvas style={{ width: '100vw', height: '100vh', background: '#050505' }}>
      {/*
        OrthographicCamera configuration for 2.5D side-scrolling perspective.
        It faces down the Z-axis, showing only X and Y axes.
        Zoom level adjusted for clear visibility of elements.
      */}
      <OrthographicCamera
        makeDefault
        position={CAMERA_CONFIG.position}
        zoom={CAMERA_CONFIG.zoom}
        near={CAMERA_CONFIG.near}
        far={CAMERA_CONFIG.far}
      />

      {/* Lighting */}
      <ambientLight
        intensity={LIGHTS_CONFIG.ambient.intensity}
        color={LIGHTS_CONFIG.ambient.color}
      />
      {/* Fiery orange PointLight near the left edge to illuminate the starting cell */}
      <pointLight
        position={LIGHTS_CONFIG.point.position}
        intensity={LIGHTS_CONFIG.point.intensity}
        color={LIGHTS_CONFIG.point.color}
        distance={LIGHTS_CONFIG.point.distance}
        decay={LIGHTS_CONFIG.point.decay}
      />

      <Level1 />

      {/* Postprocessing effects simulating an early 2000s low-resolution LCD */}
      <EffectComposer>
        <Pixelation granularity={POST_PROCESSING_CONFIG.pixelation.granularity} />
        <Vignette
          offset={POST_PROCESSING_CONFIG.vignette.offset}
          darkness={POST_PROCESSING_CONFIG.vignette.darkness}
          blendFunction={BlendFunction.NORMAL}
        />
      </EffectComposer>
    </Canvas>
  );
}

export default App;
