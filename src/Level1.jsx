import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

// Reusable block component for the level grid
const Block = ({ position, color = "#4a4a4a", isObstacle = true, isFloor = true, args = [1, 1, 1] }) => {
  return (
    <mesh position={position} userData={{ isObstacle, isFloor }}>
      <boxGeometry args={args} />
      {/*
        Using MeshStandardMaterial so it interacts with the ambient and point lights,
        while maintaining a rough stone look.
      */}
      <meshStandardMaterial color={color} roughness={1} />
    </mesh>
  );
};

// Retro fire pit using rapidly scaling cones
const FirePit = ({ startX, endX, y, z }) => {
  const fireGroupRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (fireGroupRef.current) {
      fireGroupRef.current.children.forEach((flame, index) => {
        // Rapid scaling and slight chaotic math for retro fire effect
        const scaleY = 1 + Math.sin(t * 20 + index * 10) * 0.5 + Math.random() * 0.2;
        flame.scale.y = scaleY;
      });
    }
  });

  const flames = [];
  // Place multiple cones across the gap
  for (let i = startX; i <= endX; i += 0.5) {
    const isRed = i % 1 === 0;
    flames.push(
      <mesh key={i} position={[i, y, z]} userData={{ isHazard: true }}>
        {/* Low-poly cone */}
        <coneGeometry args={[0.4, 1, 4]} />
        {/* Basic material makes it look bright and emissive regardless of scene lighting */}
        <meshBasicMaterial color={isRed ? "#ff0000" : "#ff8800"} />
      </mesh>
    );
  }

  return (
    <group ref={fireGroupRef}>
      {flames}
    </group>
  );
};

export default function Level1() {
  const baseY = -2;
  const raisedY = baseY + 1;

  const levelData = [
    // 1. Starting cell (x: 0 to 4)
    { type: 'segment', startX: 0, endX: 4, y: baseY, id: 'start' },
    // 2. Wooden barricade at x: 5 (placed on top of the floor block)
    { type: 'block', position: [5, baseY, 0], id: 'barricade-floor' },
    { type: 'block', position: [5, baseY + 1, 0], color: "#8b5a2b", args: [1, 1, 1], isFloor: false, isObstacle: true, id: 'barricade' },
    { type: 'block', position: [5, baseY + 2, 0], color: "#8b5a2b", args: [1, 1, 1], isFloor: false, isObstacle: true, id: 'barricade-top' },
    // 3. Long stone floor segment (x: 6 to 12)
    { type: 'segment', startX: 6, endX: 12, y: baseY, id: 'segment1' },
    // 4 & 5. Fire pit gap (x: 13 to 17)
    { type: 'firepit', startX: 13, endX: 17, y: baseY - 0.5, z: 0, id: 'firepit' },
    // 6. Raised stone platform (x: 18 to 20)
    { type: 'segment', startX: 18, endX: 20, y: raisedY, id: 'raised' },
    // 7. Final wide corridor (x: 21 to 28)
    { type: 'segment', startX: 21, endX: 28, y: raisedY, id: 'corridor' },
    // 8. Exit door (dark grey box) at x: 29
    { type: 'block', position: [29, raisedY, 0], id: 'exit-floor' },
    { type: 'block', position: [29, raisedY + 1.5, 0], color: "#222222", args: [1, 2, 1], isFloor: false, isObstacle: true, id: 'exit' },
  ];

  return (
    <group name="Level1">
      {levelData.map((data) => {
        if (data.type === 'segment') {
          const blocks = [];
          for (let i = data.startX; i <= data.endX; i++) {
            blocks.push(<Block key={`${data.id}-${i}`} position={[i, data.y, 0]} />);
          }
          return blocks;
        }
        if (data.type === 'firepit') {
          return <FirePit key={data.id} startX={data.startX} endX={data.endX} y={data.y} z={data.z} />;
        }
        if (data.type === 'block') {
          const { type: _type, id, ...props } = data;
          return <Block key={id} {...props} />;
        }
        return null;
      })}
    </group>
  );
}
