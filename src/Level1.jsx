import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { getFirePitFlames, getLevelData } from './levelUtils';

// Reusable block component for the level grid
const Block = ({
  position,
  color = "#4a4a4a",
  isObstacle = true,
  isFloor = true,
  args = [1, 1, 1]
}) => {
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
      const children = fireGroupRef.current.children;
      for (let i = 0; i < children.length; i++) {
        const flame = children[i];
        // Rapid scaling and slight chaotic math for retro fire effect
        const scaleY = 1 + Math.sin(t * 20 + i * 10) * 0.5 + Math.random() * 0.2;
        flame.scale.y = scaleY;
      }
    }
  });

  const flames = getFirePitFlames(startX, endX);

  return (
    <group ref={fireGroupRef}>
      {flames.map((flame) => (
        <mesh key={flame.id} position={flame.position} userData={{ isHazard: true }}>
          {/* Low-poly cone */}
          <coneGeometry args={[0.4, 1, 4]} />
          {/* Basic material makes it look bright and emissive regardless of scene lighting */}
          <meshBasicMaterial color={flame.color} />
        </mesh>
      ))}
    </group>
  );
};

export default function Level1() {
  const levelData = getLevelData();

  return (
    <group name="Level1">
      {levelData.map((item) => {
        if (item.type === 'block') {
          return (
            <Block
              key={item.id}
              position={item.position}
              color={item.color}
              isObstacle={item.isObstacle}
              isFloor={item.isFloor}
              args={item.args}
            />
          );
        }
        if (item.type === 'firepit') {
          return (
            <FirePit
              key={item.id}
              startX={item.startX}
              endX={item.endX}
              y={item.y}
              z={item.z}
            />
          );
        }
        return null;
      })}
    </group>
  );
}
