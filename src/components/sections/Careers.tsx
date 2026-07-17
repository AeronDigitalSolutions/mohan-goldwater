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
      start: 'top 75%',
      animation: gsap.fromTo(
        elements,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power3.out' }
      ),
    });

    return () => {
      st.kill();
    };
  }, []);

  return (
    <section
      id={id}
      className={`section min-h-screen flex items-center justify-center text-center relative overflow-hidden py-40 ${className}`}
    >
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-900 via-primary-800 to-primary-900"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] max-w-[1200px] max-h-[1200px] bg-[radial-gradient(circle,_rgba(200,130,14,0.08)_0%,_transparent_70%)] rounded-full blur-[80px]"></div>
      </div>

      <div ref={containerRef} className="max-w-5xl mx-auto relative z-10 w-full">
        <div className="animate-up flex flex-col items-center">
          <SectionHeading
            label="JOIN OUR TEAM"
            title="Build the Future of Brewing"
            align="center"
          />
        </div>

        <p className="animate-up body-large max-w-3xl mx-auto mt-10 text-steel-200 leading-relaxed text-xl md:text-2xl font-light">
          We're always looking for passionate individuals who want to be part of India's brewing revolution. Join a team dedicated to precision, quality, and sustainable manufacturing excellence.
        </p>

        <div className="animate-up mt-16 flex justify-center">
          <div className="inline-block shadow-[0_0_30px_rgba(200,130,14,0.2)] hover:shadow-[0_0_50px_rgba(200,130,14,0.4)] transition-shadow duration-500 rounded-full">
            <MagneticButton size="lg" className="px-10 py-5 text-lg">
              Explore Open Positions
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
