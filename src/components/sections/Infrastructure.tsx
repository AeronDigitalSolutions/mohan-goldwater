'use client';

import SectionHeading from '../ui/SectionHeading';
import { SectionProps } from '@/types';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 11.80, suffix: ' Lakh HLPA', label: 'Installed Production Capacity' },
  { value: 15000, suffix: '/hr', label: 'Bottles Per Hour' },
  { value: 22000, suffix: '/hr', label: 'Cans Per Hour' },
  { value: 100, suffix: '%', label: 'Automated Manufacturing' }
];

export default function Infrastructure({ id, className = '' }: SectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const items = containerRef.current.querySelectorAll('.stat-item');

    const ctx = gsap.context(() => {
      // Massive staggered reveal
      gsap.fromTo(
        items,
        { 
          opacity: 0, 
          y: 100,
          rotateX: -15,
          scale: 0.9
        },
        { 
          opacity: 1, 
          y: 0, 
          rotateX: 0,
          scale: 1,
          duration: 1.2, 
          stagger: 0.2, 
          ease: 'expo.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
          }
        }
      );

      // Animate numbers independently if needed, but the layout reveal is the primary wow factor
      const numbers = containerRef.current!.querySelectorAll('.stat-number');
      numbers.forEach((num, i) => {
        const targetVal = stats[i].value;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: targetVal,
          duration: 2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: num,
            start: 'top 85%',
          },
          onUpdate: () => {
            const formatted = stats[i].value % 1 !== 0 
              ? obj.val.toFixed(2) 
              : Math.floor(obj.val).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            num.textContent = formatted;
          }
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id={id} className={`section py-32 relative overflow-hidden ${className}`}>
      
      {/* Fixed Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-fixed bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/ManufacturingatScale.png')" }}
      />
      
      {/* Dark Overlay for Text Readability */}
      <div className="absolute inset-0 z-0 bg-primary-900/80 mix-blend-multiply" />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-primary-900 via-transparent to-primary-900 opacity-90" />

      <div className="max-w-7xl mx-auto relative z-10 px-4 md:px-8">
        <div className="max-w-2xl mb-24">
          <SectionHeading
            label="INFRASTRUCTURE"
            title="Manufacturing at Scale"
            titleClassName="!text-white"
          />
          <p className="body-large text-steel-300 mt-8">
            Located in Unnao, Uttar Pradesh, our state-of-the-art facility integrates advanced brewing technology with uncompromising safety and hygiene standards to deliver unparalleled quality at scale.
          </p>
        </div>

        <div ref={containerRef} className="flex flex-col gap-24 md:gap-32">
          {stats.map((stat, i) => (
            <div 
              key={i} 
              className="stat-item flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-12 relative group"
            >
              {/* Subtle hover glow line */}
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-gold-500 via-amber-300 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 origin-left" />

              <div className="flex-1">
                <h3 className="label text-steel-400 mb-6 uppercase tracking-widest">{stat.label}</h3>
                <div className="flex items-baseline gap-2 md:gap-4 flex-wrap">
                  <span className="stat-number font-bold text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/40">
                    0
                  </span>
                  <span className="text-2xl md:text-4xl lg:text-6xl text-gold-500 font-light tracking-tight">
                    {stat.suffix}
                  </span>
                </div>
              </div>
              
              <div className="hidden md:block flex-shrink-0 text-right opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center bg-white/5 backdrop-blur-sm">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold-500">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
