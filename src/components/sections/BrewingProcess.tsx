'use client';

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const stages = [
  { num: '01', name: 'Water Sourcing', desc: 'Pure water — the foundation of every great beer' },
  { num: '02', name: 'Malting', desc: 'Premium malted barley, carefully selected' },
  { num: '03', name: 'Mashing', desc: 'Precision temperature control unlocks natural sugars' },
  { num: '04', name: 'Boiling & Hops', desc: 'Hops added for bitterness, flavor, and aroma' },
  { num: '05', name: 'Fermentation', desc: 'Patient fermentation at controlled temperatures' },
  { num: '06', name: 'Maturation', desc: 'Time perfects the flavor profile' },
  { num: '07', name: 'Filtration', desc: 'Crystal clarity through advanced filtration' },
  { num: '08', name: 'Packaging', desc: '15,000 bottles and 22,000 cans per hour' },
];

import { SectionProps } from '@/types';

export default function BrewingProcess({ id, className = '' }: SectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!innerRef.current || !containerRef.current || !sectionRef.current) return;

      const totalWidth = innerRef.current.scrollWidth - window.innerWidth;

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

      return () => {
        tl.scrollTrigger?.kill();
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id={id} ref={sectionRef} className={`section py-32 overflow-hidden ${className}`}>
      {/* Section Heading */}
      <div className="text-center mb-16 px-4">
        <span className="label">THE PROCESS</span>
        <h2 className="heading-2 mt-4">From Grain to Glass</h2>
        <div className="golden-line mt-6 mx-auto" style={{ width: '80px' }} />
      </div>

      {/* Horizontal Scroll Container */}
      <div ref={containerRef} className="overflow-hidden">
        <div ref={innerRef} className="flex">
          {stages.map((stage) => (
            <div
              key={stage.num}
              className="w-screen md:w-[80vw] flex-shrink-0 flex items-center justify-center relative px-8"
            >
              {/* Decorative golden ring */}
              <div
                className="absolute w-64 h-64 rounded-full border-2 border-gold-500/20 pointer-events-none"
                aria-hidden="true"
              />

              <div className="text-center relative z-10">
                <motion.div
                  className="heading-display opacity-10 text-gradient-gold"
                  initial={false}
                >
                  {stage.num}
                </motion.div>
                <h3 className="heading-1 -mt-8 md:-mt-12">{stage.name}</h3>
                <p className="body-large mt-4 max-w-md mx-auto">{stage.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress Dots */}
      <div className="flex justify-center gap-3 mt-12">
        {stages.map((stage, i) => (
          <motion.div
            key={stage.num}
            className="rounded-full transition-all duration-300"
            animate={{
              width: activeStage === i ? 32 : 8,
              height: 8,
              backgroundColor:
                activeStage === i ? 'var(--gold-500)' : 'var(--steel-500)',
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          />
        ))}
      </div>
    </section>
  );
}
