'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import CameraRig from './CameraRig';
import Lighting from './Lighting';
import FermentationTank from './models/FermentationTank';
import { PipelineSystem } from './models/Pipeline';
import { BottleLine } from './models/Bottle';
import ConveyorBelt from './models/ConveyorBelt';
import Barrel from './models/Barrel';
import Steam from './effects/Steam';
import Particles from './effects/Particles';
import BeerFlow from './effects/BeerFlow';

export default function BreweryScene() {
  return (
    <div className="canvas-container fixed inset-0 z-0">
      <Canvas
        camera={{ fov: 50, near: 0.1, far: 200, position: [0, 5, 30] }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          <CameraRig />
          <Lighting />
          <fog attach="fog" args={['#050505', 20, 80]} />
          <Environment preset="warehouse" background={false} />

          {/* Models */}
          <FermentationTank position={[-5, 2.75, -5]} />
          <FermentationTank position={[5, 2.75, 0]} />
          <FermentationTank position={[-3, 2.75, 5]} />
          <FermentationTank position={[3, 2.75, -10]} />
          
          <PipelineSystem />
          
          <BottleLine position={[0, 0.3, -15]} />
          <ConveyorBelt position={[0, 0, -15]} length={12} width={0.8} />
          
          <group position={[0, 0, -25]}>
            <Barrel position={[-2, 0, 0]} />
            <Barrel position={[0, 0, 0]} />
            <Barrel position={[2, 0, 0]} />
          </group>

          {/* Effects */}
          <Steam position={[0, 2, 0]} />
          <Steam position={[-3, 2, -5]} />
          <Particles />
          <BeerFlow points={[
            [5, 2, 5],
            [3, 2, 0],
            [0, 2, -5],
            [-2, 2, -10]
          ]} />
        </Suspense>

        <EffectComposer>
          <Bloom luminanceThreshold={0.8} intensity={0.4} />
          <Vignette darkness={0.5} offset={0.3} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
