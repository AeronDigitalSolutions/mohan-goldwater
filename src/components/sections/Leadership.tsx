'use client';

import SectionHeading from '../ui/SectionHeading';
import GlassCard from '../ui/GlassCard';
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
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll('.leader-card');

    const st = ScrollTrigger.create({
      trigger: gridRef.current,
      start: 'top 80%',
      animation: gsap.fromTo(
        cards,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' }
      ),
    });

    return () => {
      st.kill();
    };
  }, []);

  return (
    <section id={id} className={`section py-32 ${className}`}>
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          label="LEADERSHIP"
          title="Guided by Experience"
        />

        <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-16">
          {members.map((member, i) => (
            <GlassCard key={i} className="leader-card text-center py-8">
              <div className="w-20 h-20 rounded-full mx-auto bg-gradient-to-br from-gold-500 to-copper-500 flex items-center justify-center text-primary-900 font-bold text-xl shadow-[0_0_15px_rgba(200,130,14,0.3)]">
                {member.initials}
              </div>
              <h3 className="heading-3 mt-6 text-text-primary">{member.name}</h3>
              <p className="body-base mt-2 text-steel-400">{member.title}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
