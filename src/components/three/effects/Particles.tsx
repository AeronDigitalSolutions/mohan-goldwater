'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticlesProps {
  count?: number;
}

export default function Particles({ count = 500 }: ParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);

  // Store initial positions so we can compute offsets from them
  const { initialPositions, positions } = useMemo(() => {
    const init = new Float32Array(count * 3);
    const pos = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 60;   // -30..30
      const y = Math.random() * 15;            // 0..15
      const z = (Math.random() - 0.5) * 60;   // -30..30

      init[i * 3] = x;
      init[i * 3 + 1] = y;
      init[i * 3 + 2] = z;

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
    }

    return { initialPositions: init, positions: pos };
  }, [count]);

  const material = useMemo(
    () =>
      new THREE.PointsMaterial({
        color: '#c8820e',
        size: 0.03,
        transparent: true,
        opacity: 0.4,
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

  useFrame((state) => {
    const pts = pointsRef.current;
    if (!pts) return;

    const posAttr = pts.geometry.attributes.position as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;
    const t = state.clock.elapsedTime * 0.15;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const offset = i * 0.37;

      arr[i3] = initialPositions[i3] + Math.sin(t + offset) * 0.5;
      arr[i3 + 1] = initialPositions[i3 + 1] + Math.cos(t * 0.7 + offset) * 0.3;
      arr[i3 + 2] = initialPositions[i3 + 2] + Math.sin(t * 0.5 + offset * 1.3) * 0.4;
    }

    posAttr.needsUpdate = true;
  });

  return <points ref={pointsRef} geometry={geometry} material={material} />;
}
