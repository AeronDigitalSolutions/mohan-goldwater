'use client';

import SectionHeading from '../ui/SectionHeading';
import GlassCard from '../ui/GlassCard';
import AnimatedCounter from '../ui/AnimatedCounter';
import { SectionProps } from '@/types';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

export default function Infrastructure({ id, className = '' }: SectionProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;

    const cards = gridRef.current.querySelectorAll('.stat-card');

    const st = ScrollTrigger.create({
      trigger: gridRef.current,
      start: 'top 80%',
      animation: gsap.fromTo(
        cards,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' }
      ),
    });

    return () => {
      st.kill();
    };
  }, []);

  return (
    <section id={id} className={`section-fullscreen ${className}`}>
      <SectionHeading
        label="INFRASTRUCTURE"
        title="Manufacturing at Scale"
      />

      <div ref={gridRef} className="grid md:grid-cols-2 gap-8 mt-16 max-w-5xl">
        <GlassCard className="stat-card border-l-2 border-l-gold-500 flex flex-col justify-center min-h-[200px]">
          <AnimatedCounter
            value={11.80}
            suffix=" Lakh HLPA"
            label="Installed Production Capacity"
          />
        </GlassCard>

        <GlassCard className="stat-card border-l-2 border-l-gold-500 flex flex-col justify-center min-h-[200px]">
          <AnimatedCounter
            value={15000}
            suffix="/hr"
            label="Bottles Per Hour"
          />
        </GlassCard>

        <GlassCard className="stat-card border-l-2 border-l-gold-500 flex flex-col justify-center min-h-[200px]">
          <AnimatedCounter
            value={22000}
            suffix="/hr"
            label="Cans Per Hour"
          />
        </GlassCard>

        <GlassCard className="stat-card border-l-2 border-l-gold-500 flex flex-col justify-center min-h-[200px]">
          <AnimatedCounter
            value={100}
            suffix="%"
            label="Automated Manufacturing"
          />
        </GlassCard>
      </div>
      
      <div className="mt-16 max-w-2xl">
         <p className="body-large text-steel-200">
           Located in Unnao, Uttar Pradesh, our state-of-the-art facility integrates advanced brewing technology with uncompromising safety and hygiene standards to deliver unparalleled quality at scale.
         </p>
      </div>
    </section>
  );
}
