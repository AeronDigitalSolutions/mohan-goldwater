'use client';

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionProps } from '@/types';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const stages = [
  { num: '01', name: 'Water Sourcing', desc: 'Pure water — the foundation of every great beer. Treated with reverse osmosis.', img: 'https://images.unsplash.com/photo-1548842186-b489a6411dcb?q=80&w=3000&auto=format&fit=crop', graphic: '/assets/Steps/water-sourcing.png' },
  { num: '02', name: 'Malting', desc: 'Premium malted barley, carefully selected for optimal sugar content and color.', img: 'https://images.unsplash.com/photo-1542845634-118f681a0397?q=80&w=3000&auto=format&fit=crop', graphic: '/assets/Steps/malting.png' },
  { num: '03', name: 'Mashing', desc: 'Precision temperature control unlocks natural sugars, creating the sweet wort.', img: 'https://images.unsplash.com/photo-1582851410766-0683a45c361e?q=80&w=3000&auto=format&fit=crop', graphic: '/assets/Steps/mashing.png' },
  { num: '04', name: 'Boiling & Hops', desc: 'Hops added at precise intervals for perfectly balanced bitterness and aroma.', img: 'https://images.unsplash.com/photo-1565545284000-85f522de97e4?q=80&w=3000&auto=format&fit=crop', graphic: '/assets/Steps/boiling-hops.png' },
  { num: '05', name: 'Fermentation', desc: 'Patient fermentation at strictly controlled temperatures with proprietary yeast.', img: 'https://images.unsplash.com/photo-1596700868114-1e0f09fa926a?q=80&w=3000&auto=format&fit=crop', graphic: '/assets/Steps/fermentation.png' },
  { num: '06', name: 'Maturation', desc: 'Time perfects the flavor profile, allowing the beer to condition and mellow.', img: 'https://images.unsplash.com/photo-1581007871115-f14bc016e0a4?q=80&w=3000&auto=format&fit=crop', graphic: '/assets/Steps/maturation.png' },
  { num: '07', name: 'Filtration', desc: 'Crystal clarity achieved through advanced multi-stage filtration systems.', img: 'https://images.unsplash.com/photo-1601362635447-0e241775f0a0?q=80&w=3000&auto=format&fit=crop', graphic: '/assets/Steps/Filtration.png' },
  { num: '08', name: 'Packaging', desc: 'State-of-the-art lines processing 15,000 bottles and 22,000 cans per hour.', img: 'https://images.unsplash.com/photo-1627806509503-4f938b812fcc?q=80&w=3000&auto=format&fit=crop', graphic: '/assets/Steps/Packaging.png' },
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
          end: '+=4000', // 4000px of scrolling
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            // Calculate which stage is active based on progress
            const progress = self.progress;
            const currentStage = Math.min(
              Math.floor(progress * stages.length),
              stages.length - 1
            );
            setActiveStage(currentStage);
          }
        },
      });

      // Individual card entrance animations
      cards.forEach((card, i) => {
        gsap.to(card, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'left center+=40%', // when card enters view from right
            containerAnimation: tl,
            toggleActions: 'play none none reverse'
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id={id} ref={sectionRef} className={`section h-screen bg-primary-900 relative overflow-hidden ${className}`}>
      
      {/* Dynamic Backgrounds */}
      <div className="absolute inset-0 z-0">
        {stages.map((stage, i) => (
          <div 
            key={`bg-${i}`}
            className="absolute inset-0 transition-opacity duration-1000 ease-in-out will-change-transform"
            style={{ opacity: activeStage === i ? 1 : 0 }}
          >
            <Image
              src={stage.img}
              alt={stage.name}
              fill
              className="object-cover mix-blend-overlay opacity-30 transform scale-105"
            />
            {/* Gradient mask to keep the edges dark */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary-900 via-transparent to-primary-900 opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary-900 via-transparent to-primary-900 opacity-80" />
          </div>
        ))}
      </div>

      {/* Section Heading - Fixed during pin */}
      <div className="absolute top-32 left-0 w-full text-center z-20 px-4">
        <span className="label tracking-[0.3em]">THE PROCESS</span>
        <h2 className="heading-2 mt-6">From Grain to Glass</h2>
      </div>

      {/* Horizontal Scroll Container */}
      <div ref={containerRef} className="overflow-hidden mt-64 relative z-10">
        <div ref={innerRef} className="flex pl-[10vw] gap-12 md:gap-24 w-max">
          {stages.map((stage) => (
            <div
              key={stage.num}
              className="w-[85vw] md:w-[60vw] lg:w-[45vw] flex-shrink-0 flex items-center justify-center relative"
            >
              <div className="brew-card w-full aspect-[4/3] md:aspect-[16/10] rounded-3xl py-12 px-12 md:px-24 relative overflow-hidden group border border-white/10 [.light_&]:border-black/5 bg-gradient-to-br from-black/80 via-black/90 to-black [.light_&]:from-white [.light_&]:via-white [.light_&]:to-white [.light_&]:shadow-[0_20px_50px_rgba(0,0,0,0.08)] backdrop-blur-xl flex flex-col justify-center gap-8 md:gap-12 transition-all duration-500">
                
                {/* Subtle internal gradient sweep */}
                <div className="absolute inset-0 bg-gradient-to-tr from-gold-500/0 via-gold-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 ease-out pointer-events-none" />
                
                {/* Step Graphic */}
                {stage.graphic && (
                  <div className="absolute -top-12 -right-12 md:-top-4 md:-right-4 w-48 h-48 md:w-80 md:h-80 opacity-50 md:opacity-40 group-hover:opacity-100 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-700 ease-out z-0 pointer-events-none drop-shadow-2xl">
                    <Image
                      src={stage.graphic}
                      alt={`${stage.name} Graphic`}
                      fill
                      className="object-contain drop-shadow-[0_0_15px_rgba(200,130,14,0.3)]"
                    />
                  </div>
                )}

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
                  <h3 className="heading-1 text-white [.light_&]:text-[#050505] leading-tight transition-colors duration-500">{stage.name}</h3>
                </div>
                
                <div className="relative z-10 max-w-lg">
                  <p className="body-large text-steel-200 [.light_&]:text-gray-600 leading-relaxed transition-colors duration-500">
                    {stage.desc}
                  </p>
                </div>
                
                {/* Accent Line */}
                <div className="absolute left-0 bottom-0 w-full h-[2px] bg-gradient-to-r from-transparent via-gold-500/50 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 origin-left" />
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
