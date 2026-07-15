'use client';

import { useRef, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CameraRig() {
  const scrollProgressRef = useRef(0);

  const { cameraPath, lookAtPath } = useMemo(() => {
    const camPoints = [
      new THREE.Vector3(0, 5, 30),
      new THREE.Vector3(0, 4, 20),
      new THREE.Vector3(5, 3, 12),
      new THREE.Vector3(0, 6, 5),
      new THREE.Vector3(-5, 4, -2),
      new THREE.Vector3(-2, 3, -8),
      new THREE.Vector3(3, 3, -15),
      new THREE.Vector3(0, 5, -22),
      new THREE.Vector3(-4, 4, -28),
      new THREE.Vector3(0, 6, -35),
      new THREE.Vector3(5, 5, -42),
      new THREE.Vector3(0, 4, -48),
    ];

    const lookPoints = camPoints.map(p => new THREE.Vector3(p.x, p.y, p.z - 10));

    return {
      cameraPath: new THREE.CatmullRomCurve3(camPoints),
      lookAtPath: new THREE.CatmullRomCurve3(lookPoints),
    };
  }, []);

  useEffect(() => {
    const st = ScrollTrigger.create({
      trigger: '#scroll-container',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1.5,
      onUpdate: (self) => {
        scrollProgressRef.current = self.progress;
      },
    });

    return () => {
      st.kill();
    };
  }, []);

  const dummyTarget = useMemo(() => new THREE.Vector3(), []);

  useFrame(({ camera }) => {
    const progress = scrollProgressRef.current;
    
    // Lerp position
    const targetPos = cameraPath.getPointAt(progress);
    camera.position.lerp(targetPos, 0.08);

    // Lerp lookAt
    const lookAtProgress = Math.min(progress + 0.02, 1);
    const targetLookAt = lookAtPath.getPointAt(lookAtProgress);
    
    dummyTarget.lerp(targetLookAt, 0.08);
    camera.lookAt(dummyTarget);
  });

  return null;
}
