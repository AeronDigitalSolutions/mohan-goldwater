'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ConveyorBeltProps {
  position?: [number, number, number];
  length?: number;
  width?: number;
}

export default function ConveyorBelt({
  position = [0, 0, 0],
  length = 8,
  width = 0.6,
}: ConveyorBeltProps) {
  const rollerRefs = useRef<THREE.Mesh[]>([]);

  const { frameMaterial, beltMaterial } = useMemo(() => {
    return {
      frameMaterial: new THREE.MeshStandardMaterial({
        color: '#666666',
        metalness: 0.8,
        roughness: 0.3,
      }),
      beltMaterial: new THREE.MeshStandardMaterial({
        color: '#222222',
        roughness: 0.9,
      }),
    };
  }, []);

  useFrame((state, delta) => {
    // Rotate rollers
    rollerRefs.current.forEach((roller) => {
      if (roller) roller.rotation.x += delta * 2;
    });
  });

  return (
    <group position={position}>
      {/* Side Rails */}
      <mesh position={[0, -0.1, width / 2 + 0.05]} material={frameMaterial}>
        <boxGeometry args={[length, 0.2, 0.05]} />
      </mesh>
      <mesh position={[0, -0.1, -(width / 2 + 0.05)]} material={frameMaterial}>
        <boxGeometry args={[length, 0.2, 0.05]} />
      </mesh>

      {/* Belt */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} material={beltMaterial}>
        <planeGeometry args={[length, width]} />
      </mesh>

      {/* Rollers */}
      <mesh
        ref={(el) => { if(el) rollerRefs.current[0] = el; }}
        position={[length / 2 - 0.2, -0.1, 0]}
        rotation={[0, 0, Math.PI / 2]}
        material={frameMaterial}
      >
        <cylinderGeometry args={[0.1, 0.1, width, 16]} />
      </mesh>
      <mesh
        ref={(el) => { if(el) rollerRefs.current[1] = el; }}
        position={[-length / 2 + 0.2, -0.1, 0]}
        rotation={[0, 0, Math.PI / 2]}
        material={frameMaterial}
      >
        <cylinderGeometry args={[0.1, 0.1, width, 16]} />
      </mesh>
    </group>
  );
}
