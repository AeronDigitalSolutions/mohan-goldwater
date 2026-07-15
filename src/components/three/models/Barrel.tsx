'use client';

import { useMemo } from 'react';
import * as THREE from 'three';

interface BarrelProps {
  position?: [number, number, number];
  scale?: number;
}

export default function Barrel({ position = [0, 0, 0], scale = 1 }: BarrelProps) {
  const { geometry, material, bandGeo, bandMat } = useMemo(() => {
    const points = [
      new THREE.Vector2(0.5, 0),
      new THREE.Vector2(0.6, 0.3),
      new THREE.Vector2(0.65, 0.5),
      new THREE.Vector2(0.6, 0.7),
      new THREE.Vector2(0.5, 1.0),
    ];
    
    const geo = new THREE.LatheGeometry(points, 32);
    
    const mat = new THREE.MeshStandardMaterial({
      color: '#5C3317',
      roughness: 0.8,
      metalness: 0.05,
    });

    const bGeo = new THREE.TorusGeometry(0.62, 0.02, 8, 32);
    
    const bMat = new THREE.MeshStandardMaterial({
      color: '#888888',
      roughness: 0.3,
      metalness: 0.9,
    });

    return { geometry: geo, material: mat, bandGeo: bGeo, bandMat: bMat };
  }, []);

  return (
    <group position={position} scale={scale}>
      <mesh geometry={geometry} material={material} castShadow receiveShadow />
      
      {/* Metal Bands */}
      <mesh geometry={bandGeo} material={bandMat} position={[0, 0.15, 0]} rotation={[Math.PI / 2, 0, 0]} scale={[0.85, 0.85, 1]} />
      <mesh geometry={bandGeo} material={bandMat} position={[0, 0.5, 0]} rotation={[Math.PI / 2, 0, 0]} scale={[1.05, 1.05, 1]} />
      <mesh geometry={bandGeo} material={bandMat} position={[0, 0.85, 0]} rotation={[Math.PI / 2, 0, 0]} scale={[0.85, 0.85, 1]} />
    </group>
  );
}
