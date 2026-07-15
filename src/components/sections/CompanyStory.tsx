'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { SectionProps } from '@/types';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: '55+', label: 'Years of Excellence' },
  { value: '11.80L', label: 'HLPA Capacity' },
  { value: 'Zero', label: 'Effluent Discharge' },
];

export default function CompanyStory({ id, className = '' }: SectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text reveal
      if (textRef.current) {
        gsap.from(textRef.current.children, {
          opacity: 0,
          y: 40,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        });
      }

      // Stagger card fade-ins
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.from(card, {
          opacity: 0,
          y: 60,
          duration: 0.8,
          delay: i * 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`section-fullscreen flex items-center ${className}`}
    >
      {/* Section Heading */}
      <div className="mb-16">
        <span className="label">OUR STORY</span>
        <h2 className="heading-2 mt-4">Half a Century of Brewing Excellence</h2>
        <div className="golden-line mt-6" style={{ width: '80px' }} />
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-5 gap-12 items-start">
        {/* Left — Narrative */}
        <div ref={textRef} className="md:col-span-3">
          <p className="body-large text-steel-200">
            For over five decades, Mohan Goldwater Breweries Limited has been at
            the forefront of India&apos;s beverage manufacturing revolution. From
            our state-of-the-art facility in Unnao, Uttar Pradesh, we partner
            with the world&apos;s leading brewers to craft beers that meet the
            highest international standards.
          </p>
          <p className="body-large text-steel-200 mt-6">
            Our fully automated manufacturing processes and zero effluent
            discharge technology represent our commitment to excellence in every
            drop we produce.
          </p>
        </div>

        {/* Right — Stat Cards */}
        <div className="md:col-span-2 flex flex-col gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              ref={(el) => {
                if (el) cardsRef.current[i] = el;
              }}
              className="glass-card"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="heading-1 text-gradient-gold">{stat.value}</div>
              <div className="body-base mt-2">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
