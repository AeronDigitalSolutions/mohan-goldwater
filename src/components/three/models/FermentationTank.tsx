'use client';

import { useMemo, memo } from 'react';
import * as THREE from 'three';

interface FermentationTankProps {
  position?: [number, number, number];
  scale?: number | [number, number, number];
}

function FermentationTank({ position, scale }: FermentationTankProps) {
  const bodyGeo = useMemo(() => new THREE.CylinderGeometry(1.2, 1.2, 4, 32), []);
  const domeGeo = useMemo(
    () => new THREE.SphereGeometry(1.2, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2),
    [],
  );
  const coneGeo = useMemo(() => new THREE.ConeGeometry(1.2, 1.5, 32), []);
  const pipeGeo = useMemo(() => new THREE.CylinderGeometry(0.06, 0.06, 0.5, 8), []);

  const steelMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#888888',
        metalness: 0.95,
        roughness: 0.08,
        envMapIntensity: 1.5,
      }),
    [],
  );

  return (
    <group position={position} scale={scale}>
      {/* Main cylindrical body */}
      <mesh geometry={bodyGeo} material={steelMat} castShadow receiveShadow />

      {/* Top dome */}
      <mesh
        geometry={domeGeo}
        material={steelMat}
        position={[0, 2, 0]}
        castShadow
      />

      {/* Bottom cone (inverted) */}
      <mesh
        geometry={coneGeo}
        material={steelMat}
        position={[0, -2.75, 0]}
        rotation={[Math.PI, 0, 0]}
        castShadow
      />

      {/* Pipe stub — right side */}
      <mesh
        geometry={pipeGeo}
        material={steelMat}
        position={[1.3, 0.5, 0]}
        rotation={[0, 0, Math.PI / 2]}
      />

      {/* Pipe stub — left side, lower */}
      <mesh
        geometry={pipeGeo}
        material={steelMat}
        position={[-1.3, -0.8, 0]}
        rotation={[0, 0, Math.PI / 2]}
      />
    </group>
  );
}

export default memo(FermentationTank);
