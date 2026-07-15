'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface SteamProps {
  position?: [number, number, number];
  count?: number;
  speed?: number;
}

export default function Steam({
  position = [0, 0, 0],
  count = 200,
  speed = 0.3,
}: SteamProps) {
  const pointsRef = useRef<THREE.Points>(null);

  // Pre-compute per-particle random factors (stable across frames)
  const { positions, randomFactors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const factors = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Random within a 2×3×2 volume centred on origin
      pos[i * 3] = (Math.random() - 0.5) * 2;      // x: -1..1
      pos[i * 3 + 1] = Math.random() * 3;            // y: 0..3
      pos[i * 3 + 2] = (Math.random() - 0.5) * 2;   // z: -1..1
      factors[i] = 0.5 + Math.random() * 1.5;        // speed multiplier 0.5-2.0
    }

    return { positions: pos, randomFactors: factors };
  }, [count]);

  const material = useMemo(
    () =>
      new THREE.PointsMaterial({
        color: '#ffffff',
        size: 0.15,
        transparent: true,
        opacity: 0.3,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
      }),
    [],
  );

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  useFrame((_state, delta) => {
    const pts = pointsRef.current;
    if (!pts) return;

    const posAttr = pts.geometry.attributes.position as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;
    const time = _state.clock.elapsedTime;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const factor = randomFactors[i];

      // Upward drift
      arr[i3 + 1] += delta * speed * factor;

      // Horizontal sine drift
      arr[i3] += Math.sin(time * 0.5 + i * 0.1) * delta * 0.05;
      arr[i3 + 2] += Math.cos(time * 0.3 + i * 0.15) * delta * 0.03;

      // Reset particles that exceed y=3
      if (arr[i3 + 1] > 3) {
        arr[i3] = (Math.random() - 0.5) * 2;
        arr[i3 + 1] = 0;
        arr[i3 + 2] = (Math.random() - 0.5) * 2;
      }
    }

    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} position={position} geometry={geometry} material={material} />
  );
}
