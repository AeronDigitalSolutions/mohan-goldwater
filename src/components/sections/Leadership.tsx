'use client';

import SectionHeading from '../ui/SectionHeading';
import { SectionProps } from '@/types';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const members = [
  { name: 'Vikas Jaiswal', title: 'Director', initials: 'VJ' },
  { name: 'Mudit Kumar Gupta', title: 'Director', initials: 'MG' },
  { name: 'Har Prasad Jaiswal', title: 'Director', initials: 'HJ' },
  { name: 'Sameer Agrawal', title: 'Director', initials: 'SA' },
  { name: 'Manmeet Singh Chadha', title: 'Director', initials: 'MC' },
  { name: 'Baljeet Singh', title: 'Director', initials: 'BS' },
  { name: 'Munish Saggar', title: 'Chief Financial Officer', initials: 'MS' },
];

export default function Leadership({ id, className = '' }: SectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const textEls = containerRef.current.querySelectorAll('.animate-text');
    const cards = containerRef.current.querySelectorAll('.leader-card');

    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top 75%',
      animation: gsap.timeline()
        .fromTo(
          textEls,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
        )
        .fromTo(
          cards,
          { opacity: 0, y: 40, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' },
          '-=0.5'
        ),
    });

    return () => {
      st.kill();
    };
  }, []);

  return (
    <section id={id} className={`section py-40 relative ${className}`}>
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-copper-900/10 via-primary-900/0 to-primary-900/0"></div>
      
      <div ref={containerRef} className="max-w-7xl mx-auto relative z-10">
        <div className="animate-text">
          <SectionHeading
            label="LEADERSHIP"
            title="Guided by Experience"
          />
          <p className="body-large mt-6 max-w-2xl text-steel-300">
            Our visionary leaders bring decades of industry expertise, driving innovation, and sustainable growth across all our operations.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">
          {members.map((member, i) => (
            <div key={i} className="leader-card group relative p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-gold-500/20 hover:bg-white/[0.04] transition-all duration-500 flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full mb-8 relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gold-500 to-copper-600 animate-spin-slow opacity-20 blur-md group-hover:opacity-40 transition-opacity duration-500"></div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gold-500 to-copper-500 flex items-center justify-center text-primary-900 font-bold text-2xl shadow-[0_0_20px_rgba(200,130,14,0.4)] relative z-10 group-hover:scale-105 transition-transform duration-500">
                  {member.initials}
                </div>
              </div>
              <h3 className="heading-3 text-text-primary tracking-wide">{member.name}</h3>
              <p className="body-base mt-3 text-gold-400 font-medium uppercase tracking-wider text-xs">{member.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
