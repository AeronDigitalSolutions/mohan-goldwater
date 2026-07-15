'use client';

import { useMemo, memo } from 'react';
import * as THREE from 'three';

/* ------------------------------------------------------------------ */
/*  Single pipe segment                                                */
/* ------------------------------------------------------------------ */

interface PipelineProps {
  points: [number, number, number][];
  radius?: number;
  color?: string;
}

export const Pipeline = memo(function Pipeline({
  points,
  radius = 0.08,
  color = '#888',
}: PipelineProps) {
  const curve = useMemo(
    () => new THREE.CatmullRomCurve3(points.map((p) => new THREE.Vector3(...p))),
    [points],
  );

  const geometry = useMemo(
    () => new THREE.TubeGeometry(curve, 64, radius, 8, false),
    [curve, radius],
  );

  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color,
        metalness: 0.9,
        roughness: 0.1,
      }),
    [color],
  );

  return <mesh geometry={geometry} material={material} castShadow receiveShadow />;
});

/* ------------------------------------------------------------------ */
/*  Full interconnected pipe network                                   */
/* ------------------------------------------------------------------ */

const PIPE_ROUTES: [number, number, number][][] = [
  // Route 1: horizontal run along top
  [[-8, 5, -5], [-4, 5, -5], [0, 5.5, -4], [4, 5, -3], [8, 5, -2]],
  // Route 2: vertical drop from tanks
  [[3, 6, 2], [3, 4, 2], [3, 2, 0], [3, 1, -3]],
  // Route 3: cross-brewery diagonal
  [[-6, 3, 5], [-3, 3.5, 0], [0, 4, -5], [3, 3.5, -10], [5, 3, -15]],
  // Route 4: low ground pipe
  [[-5, 0.5, -10], [-2, 0.5, -12], [1, 0.5, -15], [4, 0.5, -18]],
  // Route 5: overhead connector
  [[-7, 6, 10], [-4, 6.5, 5], [0, 6, 0], [4, 6.5, -5], [7, 6, -10]],
  // Route 6: short vertical riser
  [[-3, 0.5, -8], [-3, 2, -8], [-3, 4, -7], [-3, 5, -5]],
  // Route 7: winding floor pipe
  [[6, 0.4, 15], [4, 0.4, 10], [2, 0.5, 5], [0, 0.4, 0], [-2, 0.4, -5]],
  // Route 8: upper zig-zag
  [[-8, 5.5, -30], [-4, 5, -25], [0, 5.5, -20], [4, 5, -15], [8, 5.5, -10]],
];

export const PipelineSystem = memo(function PipelineSystem() {
  return (
    <group>
      {PIPE_ROUTES.map((route, idx) => (
        <Pipeline key={idx} points={route} />
      ))}
    </group>
  );
});
