'use client';

import { useEffect, useRef, createContext, useContext } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SmoothScrollContext = createContext<{ scrollTo: (target: string | number) => void }>({
  scrollTo: () => {},
});

export const useSmoothScroll = () => useContext(SmoothScrollContext);

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    let lenis: any;

    const initLenis = async () => {
      const Lenis = (await import('lenis')).default;

      lenis = new Lenis({
        duration: 1.5,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
      });

      lenisRef.current = lenis;

      // Bridge: Lenis scroll → GSAP ScrollTrigger
      lenis.on('scroll', ScrollTrigger.update);

      // Bridge: GSAP ticker → Lenis RAF
      const rafCallback = (time: number) => {
        lenis.raf(time * 1000);
      };
      gsap.ticker.add(rafCallback);
      gsap.ticker.lagSmoothing(0);

      return () => {
        gsap.ticker.remove(rafCallback);
        lenis.destroy();
        lenisRef.current = null;
      };
    };

    let cleanup: (() => void) | undefined;
    initLenis().then((cleanupFn) => {
      cleanup = cleanupFn;
    });

    return () => {
      cleanup?.();
    };
  }, []);

  const scrollTo = (target: string | number) => {
    lenisRef.current?.scrollTo(target, { duration: 1.5 });
  };

  return (
    <SmoothScrollContext.Provider value={{ scrollTo }}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
