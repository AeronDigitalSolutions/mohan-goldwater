'use client';

import SectionHeading from '../ui/SectionHeading';
import GlassCard from '../ui/GlassCard';
import { SectionProps } from '@/types';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const metrics = [
  {
    title: 'Zero Effluent Discharge',
    desc: 'Advanced water treatment ensures every drop is recycled, setting industry benchmarks for environmental responsibility.',
    icon: (
      <svg className="w-6 h-6 text-gold-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
  {
    title: 'Energy Efficient',
    desc: 'Modern energy management systems reduce our carbon footprint while maintaining peak production output.',
    icon: (
      <svg className="w-6 h-6 text-gold-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: 'Fully Automated',
    desc: 'Precision automation minimizes waste and ensures consistent quality in every batch.',
    icon: (
      <svg className="w-6 h-6 text-gold-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

export default function Sustainability({ id, className = '' }: SectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const cards = containerRef.current.querySelectorAll('.sustain-card');
    const statement = containerRef.current.querySelector('.statement');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
      },
    });

    tl.fromTo(
      cards,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.2, ease: 'power2.out' }
    );

    tl.fromTo(
      statement,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out' },
      '-=0.2'
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section id={id} className={`section py-32 ${className}`}>
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          label="SUSTAINABILITY"
          title="Brewing a Better Future"
        />

        <div ref={containerRef} className="mt-16">
          <div className="grid md:grid-cols-3 gap-8">
            {metrics.map((metric, i) => (
              <GlassCard key={i} className="sustain-card border-t-2 border-t-gold-500 pt-8">
                <div className="w-12 h-12 rounded-full border border-gold-500/30 flex items-center justify-center bg-gold-500/10 mb-6">
                  {metric.icon}
                </div>
                <h3 className="heading-3 text-text-primary">{metric.title}</h3>
                <p className="body-base mt-4 text-steel-300">{metric.desc}</p>
              </GlassCard>
            ))}
          </div>

          <h2 className="statement heading-2 text-center mt-32 text-gradient-gold">
            Every drop counts. Every process matters.
          </h2>
        </div>
      </div>
    </section>
  );
}
