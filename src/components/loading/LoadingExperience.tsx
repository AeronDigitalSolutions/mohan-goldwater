'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface LoadingExperienceProps {
  onComplete: () => void;
}

export default function LoadingExperience({ onComplete }: LoadingExperienceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    // Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      onComplete();
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        if (containerRef.current) {
          containerRef.current.style.display = 'none';
        }
        onComplete();
      },
    });

    // 0s: initial state set in CSS
    // 0.5s: golden line expands
    tl.to(lineRef.current, {
      scaleX: 1,
      duration: 1,
      ease: 'power3.inOut',
    }, 0.5);

    // 1.5s: MGWBL text fades in and moves up
    tl.to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power2.out',
    }, 1.5);

    // 2.5s: subtitle fades in
    tl.to(subtitleRef.current, {
      opacity: 1,
      duration: 1,
      ease: 'power2.out',
    }, 2.5);

    // 3.5s: entire overlay fades out
    tl.to(containerRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: 'power2.inOut',
    }, 3.5);

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-primary-900 flex flex-col items-center justify-center"
    >
      <div className="relative w-full flex flex-col items-center">
        {/* Title */}
        <h1
          ref={titleRef}
          className="heading-display text-gradient-gold opacity-0 translate-y-5 mb-4"
        >
          MGWBL
        </h1>

        {/* Golden Line */}
        <div
          ref={lineRef}
          className="h-[1px] w-[200px] bg-gold-500 scale-x-0 origin-center"
        />

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="body-large text-steel-300 opacity-0 mt-4 text-center max-w-sm"
        >
          Brewing Excellence.<br/>Engineering Trust Since 1969.
        </p>
      </div>
    </div>
  );
}
