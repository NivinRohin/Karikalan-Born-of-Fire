import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

import * as THREE from 'three';

// ⚡ Bolt: Cache geometries and materials to prevent per-instance allocations
const geometryCache = new Map();
const materialCache = new Map();

// Reusable block component for the level grid
const Block = ({ position, color = "#4a4a4a", isObstacle = true, isFloor = true, args = [1, 1, 1] }) => {
  const geoKey = args.join(',');
  if (!geometryCache.has(geoKey)) {
    geometryCache.set(geoKey, new THREE.BoxGeometry(...args));
  }
  const geometry = geometryCache.get(geoKey);

  if (!materialCache.has(color)) {
    materialCache.set(color, new THREE.MeshStandardMaterial({ color, roughness: 1 }));
  }
  const material = materialCache.get(color);

  return (
    <mesh position={position} userData={{ isObstacle, isFloor }} geometry={geometry} material={material} dispose={null}>
      {/*
        ⚡ Bolt: Removed inline <boxGeometry> and <meshStandardMaterial> to prevent
        React Three Fiber from creating and disposing them per instance.
      */}
    </mesh>
  );
};

// ⚡ Bolt: Pre-allocate static FirePit assets to avoid per-instance creation
const fireGeometry = new THREE.ConeGeometry(0.4, 1, 4);
const fireRedMaterial = new THREE.MeshBasicMaterial({ color: "#ff0000" });
const fireOrangeMaterial = new THREE.MeshBasicMaterial({ color: "#ff8800" });

// Retro fire pit using rapidly scaling cones
const FirePit = ({ startX, endX, y, z }) => {
  const fireGroupRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (fireGroupRef.current) {
      const children = fireGroupRef.current.children;
      // ⚡ Bolt: Using standard `for` loop to eliminate per-frame closure allocations
      for (let index = 0; index < children.length; index++) {
        const flame = children[index];
        // Rapid scaling and slight chaotic math for retro fire effect
        const scaleY = 1 + Math.sin(t * 20 + index * 10) * 0.5 + Math.random() * 0.2;
        flame.scale.y = scaleY;
      }
    }
  });

  const flames = [];
  // Place multiple cones across the gap
  // ⚡ Bolt: Added small epsilon to prevent floating-point precision issues with module
  for (let i = startX; i <= endX; i += 0.5) {
    // Exact power of 2 fractions (.5) don't strictly need epsilon, but good practice
    const isRed = Math.abs(i % 1) < 0.0001;
    flames.push(
      <mesh
        key={i}
        position={[i, y, z]}
        userData={{ isHazard: true }}
        geometry={fireGeometry}
        material={isRed ? fireRedMaterial : fireOrangeMaterial}
        dispose={null}
      />
    );
  }

  return (
    <group ref={fireGroupRef}>
      {flames}
    </group>
  );
};

export default function Level1() {
  const levelBlocks = [];
  const baseY = -2;

  // 1. Starting cell (x: 0 to 4)
  for (let i = 0; i <= 4; i++) {
    levelBlocks.push(<Block key={`start-${i}`} position={[i, baseY, 0]} />);
  }

  // 2. Wooden barricade at x: 5 (placed on top of the floor block)
  levelBlocks.push(<Block key="barricade-floor" position={[5, baseY, 0]} />);
  levelBlocks.push(
    <Block
      key="barricade"
      position={[5, baseY + 1, 0]}
      color="#8b5a2b"
      args={[1, 1, 1]}
      isFloor={false}
      isObstacle={true}
    />
  );
  levelBlocks.push(
    <Block
      key="barricade-top"
      position={[5, baseY + 2, 0]}
      color="#8b5a2b"
      args={[1, 1, 1]}
      isFloor={false}
      isObstacle={true}
    />
  );


  // 3. Long stone floor segment (x: 6 to 12)
  for (let i = 6; i <= 12; i++) {
    levelBlocks.push(<Block key={`segment1-${i}`} position={[i, baseY, 0]} />);
  }

  // 4 & 5. Fire pit gap (x: 13 to 17)
  // Inside the gap, we place the retro fire effect
  levelBlocks.push(<FirePit key="firepit" startX={13} endX={17} y={baseY - 0.5} z={0} />);

  // 6. Raised stone platform (x: 18 to 20, y: 1 relative to base, so baseY + 1)
  const raisedY = baseY + 1;
  for (let i = 18; i <= 20; i++) {
    levelBlocks.push(<Block key={`raised-${i}`} position={[i, raisedY, 0]} />);
  }

  // 7. Final wide corridor (x: 21 to 28)
  for (let i = 21; i <= 28; i++) {
    levelBlocks.push(<Block key={`corridor-${i}`} position={[i, raisedY, 0]} />);
  }

  // 8. Exit door (dark grey box) at x: 29
  levelBlocks.push(<Block key="exit-floor" position={[29, raisedY, 0]} />);
  levelBlocks.push(
    <Block
      key="exit"
      position={[29, raisedY + 1.5, 0]}
      color="#222222"
      args={[1, 2, 1]}
      isFloor={false}
      isObstacle={true}
    />
  );

  return (
    <group name="Level1">
      {levelBlocks}
    </group>
  );
}
