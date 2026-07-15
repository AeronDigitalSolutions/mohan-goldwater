'use client';

import SectionHeading from '../ui/SectionHeading';
import MagneticButton from '../ui/MagneticButton';
import { SectionProps } from '@/types';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

export default function Careers({ id, className = '' }: SectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const elements = containerRef.current.querySelectorAll('.animate-up');

    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top 80%',
      animation: gsap.fromTo(
        elements,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'power2.out' }
      ),
    });

    return () => {
      st.kill();
    };
  }, []);

  return (
    <section
      id={id}
      className={`section-fullscreen flex items-center justify-center text-center bg-gradient-to-b from-primary-900 via-primary-800 to-primary-900 ${className}`}
    >
      <div ref={containerRef} className="max-w-4xl mx-auto px-6">
        <div className="animate-up">
          <SectionHeading
            label="JOIN US"
            title="Build the Future of Brewing"
            align="center"
          />
        </div>

        <p className="animate-up body-large max-w-2xl mx-auto mt-8 text-steel-200">
          We're always looking for passionate individuals who want to be part of India's brewing revolution. Join a team dedicated to precision, quality, and sustainable manufacturing.
        </p>

        <div className="animate-up mt-12">
          <MagneticButton size="lg">
            View Open Positions
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
