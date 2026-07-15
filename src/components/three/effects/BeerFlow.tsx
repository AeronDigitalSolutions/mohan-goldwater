'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface BeerFlowProps {
  points: [number, number, number][];
  speed?: number;
}

export default function BeerFlow({ points, speed = 1 }: BeerFlowProps) {
  const innerMeshRef = useRef<THREE.Mesh>(null);

  const curve = useMemo(
    () => new THREE.CatmullRomCurve3(points.map((p) => new THREE.Vector3(...p))),
    [points],
  );

  const outerGeometry = useMemo(
    () => new THREE.TubeGeometry(curve, 64, 0.1, 12, false),
    [curve],
  );

  const innerGeometry = useMemo(
    () => new THREE.TubeGeometry(curve, 64, 0.07, 12, false),
    [curve],
  );

  const outerMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#888888',
        metalness: 0.95,
        roughness: 0.08,
      }),
    [],
  );

  const innerMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#c8820e',
        transparent: true,
        opacity: 0.8,
        emissive: new THREE.Color('#5a3800'),
        emissiveIntensity: 0.3,
      }),
    [],
  );

  useFrame((state) => {
    const mesh = innerMeshRef.current;
    if (!mesh) return;

    const mat = mesh.material as THREE.MeshStandardMaterial;
    // Pulsing opacity sine wave for flow effect
    mat.opacity = 0.6 + 0.25 * Math.sin(state.clock.elapsedTime * speed * 3);
  });

  return (
    <group>
      {/* Outer steel pipe */}
      <mesh geometry={outerGeometry} material={outerMaterial} />
      {/* Inner beer flow */}
      <mesh ref={innerMeshRef} geometry={innerGeometry} material={innerMaterial} />
    </group>
  );
}
