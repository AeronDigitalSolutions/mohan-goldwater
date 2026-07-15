'use client';

import { memo } from 'react';

function Lighting() {
  return (
    <>
      {/* Subtle ambient fill so shadows aren't pitch-black */}
      <ambientLight intensity={0.15} />

      {/* Main key light — warm overhead spot with shadows */}
      <spotLight
        position={[10, 20, 10]}
        intensity={1}
        angle={Math.PI / 6}
        penumbra={0.5}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0001}
      />

      {/* Fill light — softer, warm-tinted to simulate ambient bounce */}
      <spotLight
        position={[-8, 15, -5]}
        intensity={0.5}
        color="#ffe4c4"
        angle={Math.PI / 4}
        penumbra={0.8}
      />

      {/* Directional rim / accent light */}
      <directionalLight
        position={[-5, 10, 5]}
        intensity={0.3}
      />
    </>
  );
}

export default memo(Lighting);
