'use client';

import { useMemo } from 'react';
import * as THREE from 'three';
import { InstancedMesh } from 'three';

interface BottleProps {
  position?: [number, number, number];
  scale?: number;
}

export default function Bottle({ position = [0, 0, 0], scale = 1 }: BottleProps) {
  // Bottle Profile
  const { geometry, glassMaterial, labelMaterial } = useMemo(() => {
    const points = [
      new THREE.Vector2(0.001, 0), // center bottom
      new THREE.Vector2(0.25, 0),  // outer bottom
      new THREE.Vector2(0.25, 1.2), // body
      new THREE.Vector2(0.15, 1.6), // shoulder
      new THREE.Vector2(0.08, 2.0), // neck
      new THREE.Vector2(0.1, 2.2),  // lip
      new THREE.Vector2(0.07, 2.2), // inner lip
    ];
    
    const geo = new THREE.LatheGeometry(points, 24);
    
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: '#1a3a0a',
      transmission: 0.8,
      thickness: 0.5,
      roughness: 0.1,
      ior: 1.5,
      envMapIntensity: 1,
    });

    const labelMat = new THREE.MeshStandardMaterial({
      color: '#c8820e',
      roughness: 0.3,
      metalness: 0.8,
    });

    return { geometry: geo, glassMaterial: glassMat, labelMaterial: labelMat };
  }, []);

  return (
    <group position={position} scale={scale}>
      <mesh geometry={geometry} material={glassMaterial} castShadow />
      {/* Label Band */}
      <mesh position={[0, 0.6, 0]}>
        <cylinderGeometry args={[0.26, 0.26, 0.3, 16]} />
        <meshStandardMaterial color="#c8820e" roughness={0.3} metalness={0.8} />
      </mesh>
    </group>
  );
}

interface BottleLineProps {
  position?: [number, number, number];
}

export function BottleLine({ position = [0, 0, 0] }: BottleLineProps) {
  return (
    <group position={position}>
      {Array.from({ length: 8 }).map((_, i) => (
        <Bottle key={i} position={[i * 0.8 - 2.8, 0, 0]} />
      ))}
    </group>
  );
}
