'use client';

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionProps } from '@/types';

gsap.registerPlugin(ScrollTrigger);

const stages = [
  { num: '01', name: 'Water Sourcing', desc: 'Pure water — the foundation of every great beer. Treated with reverse osmosis.' },
  { num: '02', name: 'Malting', desc: 'Premium malted barley, carefully selected for optimal sugar content and color.' },
  { num: '03', name: 'Mashing', desc: 'Precision temperature control unlocks natural sugars, creating the sweet wort.' },
  { num: '04', name: 'Boiling & Hops', desc: 'Hops added at precise intervals for perfectly balanced bitterness and aroma.' },
  { num: '05', name: 'Fermentation', desc: 'Patient fermentation at strictly controlled temperatures with proprietary yeast.' },
  { num: '06', name: 'Maturation', desc: 'Time perfects the flavor profile, allowing the beer to condition and mellow.' },
  { num: '07', name: 'Filtration', desc: 'Crystal clarity achieved through advanced multi-stage filtration systems.' },
  { num: '08', name: 'Packaging', desc: 'State-of-the-art lines processing 15,000 bottles and 22,000 cans per hour.' },
];

export default function BrewingProcess({ id, className = '' }: SectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    if (!innerRef.current || !containerRef.current || !sectionRef.current) return;

    const cards = gsap.utils.toArray<HTMLElement>('.brew-card');
    
    // Initial state for cards
    gsap.set(cards, { opacity: 0, y: 50, scale: 0.95 });

    const ctx = gsap.context(() => {
      const totalWidth = innerRef.current!.scrollWidth - window.innerWidth;

      // The pin and horizontal scroll
      const tl = gsap.to(innerRef.current, {
        x: -totalWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${totalWidth}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            const newStage = Math.min(
              Math.floor(progress * stages.length),
              stages.length - 1
            );
            setActiveStage(newStage);
          },
        },
      });

      // Individual card animations as they scroll into view
      cards.forEach((card, i) => {
        gsap.to(card, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            containerAnimation: tl,
            start: 'left 80%',
            end: 'left 50%',
            scrub: true,
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id={id} ref={sectionRef} className={`section py-0 min-h-screen flex flex-col justify-center overflow-hidden relative bg-primary-900 ${className}`}>
      
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] bg-gold-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Section Heading - Fixed during pin */}
      <div className="absolute top-32 left-0 w-full text-center z-20 px-4">
        <span className="label tracking-[0.3em]">THE PROCESS</span>
        <h2 className="heading-2 mt-6">From Grain to Glass</h2>
      </div>

      {/* Horizontal Scroll Container */}
      <div ref={containerRef} className="overflow-hidden mt-32 relative z-10">
        <div ref={innerRef} className="flex pl-[10vw] gap-12 md:gap-24 w-max">
          {stages.map((stage) => (
            <div
              key={stage.num}
              className="w-[85vw] md:w-[60vw] lg:w-[45vw] flex-shrink-0 flex items-center justify-center relative"
            >
              <div className="brew-card w-full aspect-[4/3] md:aspect-[16/10] rounded-3xl py-12 px-12 md:px-24 relative overflow-hidden group border border-white/5 bg-gradient-to-br from-primary-800/90 via-primary-900/90 to-black backdrop-blur-3xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05),0_20px_40px_rgba(0,0,0,0.5)] flex flex-col justify-center gap-8 md:gap-12">
                
                {/* Subtle internal gradient sweep */}
                <div className="absolute inset-0 bg-gradient-to-tr from-gold-500/0 via-gold-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 ease-out" />
                
                {/* Massive Hollow Number Watermark */}
                <div 
                  className="absolute -right-4 -bottom-8 md:-bottom-12 text-[14rem] md:text-[22rem] font-bold leading-none select-none pointer-events-none tracking-tighter transition-transform duration-1000 group-hover:scale-105 group-hover:-translate-x-4 group-hover:-translate-y-4"
                  style={{ WebkitTextStroke: '2px rgba(200, 130, 14, 0.15)', color: 'transparent' }}
                >
                  {stage.num}
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <div className="label text-gold-500 mb-4 md:mb-6 tracking-[0.2em]">PHASE {stage.num}</div>
                  <h3 className="heading-1 text-white leading-tight">{stage.name}</h3>
                </div>
                
                <div className="relative z-10 max-w-lg">
                  <p className="body-large text-steel-300 group-hover:text-steel-200 transition-colors duration-500 leading-relaxed">
                    {stage.desc}
                  </p>
                </div>
                
                {/* Accent Line */}
                <div className="absolute left-0 bottom-0 w-full h-[2px] bg-gradient-to-r from-transparent via-gold-500/30 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 origin-left" />
              </div>
            </div>
          ))}
          
          {/* Spacer to allow the last card to reach the center of the screen */}
          <div className="w-[10vw] md:w-[20vw] lg:w-[27.5vw] flex-shrink-0" />
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="absolute bottom-24 left-0 w-full flex justify-center items-center gap-4 z-20">
        <div className="w-48 md:w-96 h-[2px] bg-white/10 rounded-full overflow-hidden relative">
          <div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-gold-600 to-gold-400 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${((activeStage + 1) / stages.length) * 100}%` }}
          />
        </div>
        <div className="label w-12 text-right">
          {String(activeStage + 1).padStart(2, '0')} / {String(stages.length).padStart(2, '0')}
        </div>
      </div>
    </section>
  );
}
