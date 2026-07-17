'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionProps } from '@/types';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection({ id, className = '' }: SectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!contentRef.current || !sectionRef.current) return;

      // Orb Pulse Animation
      if (orbRef.current) {
        gsap.to(orbRef.current, {
          scale: 1.15,
          opacity: 0.8,
          duration: 4,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut',
        });
      }

      // Dramatic Entrance Animation for Text
      const elements = contentRef.current.children;
      gsap.from(elements, {
        y: 80,
        opacity: 0,
        rotationX: -15,
        scale: 0.95,
        duration: 1.5,
        stagger: 0.2,
        ease: 'power4.out',
        delay: 0.2,
      });

      // Scroll Parallax
      gsap.to(contentRef.current, {
        y: -150,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`section-fullscreen min-h-screen flex items-center justify-center relative overflow-hidden ${className}`}
      style={{ perspective: '1000px' }}
    >
      {/* Massive Glowing Orb */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <div
          ref={orbRef}
          className="w-[600px] h-[600px] md:w-[1000px] md:h-[1000px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(212,175,55,0.15) 0%, rgba(0,0,0,0) 65%)',
            filter: 'blur(50px)',
          }}
        />
      </div>

      <div ref={contentRef} className="relative z-10 text-center flex flex-col items-center justify-center">
        <span className="label text-steel-300">
          ESTABLISHED 1969
        </span>

        <h1 className="heading-display mt-8 leading-tight">
          Brewing
          <br />
          <span className="text-gradient-gold">Excellence.</span>
        </h1>

        <p className="body-large mt-8 max-w-xl mx-auto text-steel-300">
          Engineering Trust Since 1969
        </p>

        <div
          className="golden-line mt-12 mx-auto"
          style={{ width: '120px' }}
        />
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center z-10">
        <span className="text-xs uppercase tracking-widest text-steel-500 mb-2 animate-bounce">
          Scroll to Explore
        </span>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className="animate-bounce"
          aria-hidden="true"
        >
          <path
            d="M6 9L12 15L18 9"
            stroke="var(--gold-500)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </section>
  );
}
