'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
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
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal
      if (headerRef.current) {
        gsap.from(headerRef.current.children, {
          opacity: 0,
          y: 40,
          duration: 1.2,
          stagger: 0.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        });
      }

      // Text reveal
      if (textRef.current) {
        gsap.from(textRef.current.children, {
          opacity: 0,
          y: 50,
          duration: 1.5,
          stagger: 0.3,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        });
      }

      // Stagger card fade-ins with scale
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.from(card, {
          opacity: 0,
          y: 80,
          scale: 0.9,
          duration: 1.2,
          delay: i * 0.2,
          ease: 'power4.out',
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
      className={`section py-32 flex items-center relative ${className}`}
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Heading */}
        <div ref={headerRef} className="mb-32">
          <span className="label block mb-4 text-steel-400">OUR STORY</span>
          <h2 className="heading-2 max-w-3xl">Half a Century of Brewing Excellence</h2>
          <div className="golden-line mt-8" style={{ width: '80px' }} />
        </div>

        {/* Grid */}
        <div className="grid lg:grid-cols-12 gap-20 lg:gap-32 items-start">
          {/* Left — Narrative */}
          <div ref={textRef} className="lg:col-span-7 flex flex-col gap-8">
            <p className="heading-3 text-steel-100 font-light leading-relaxed">
              For over five decades, Mohan Goldwater Breweries Limited has been at
              the forefront of India&apos;s beverage manufacturing revolution. From
              our state-of-the-art facility in Unnao, Uttar Pradesh, we partner
              with the world&apos;s leading brewers to craft beers that meet the
              highest international standards.
            </p>
            <p className="body-large text-steel-400 leading-loose">
              Our fully automated manufacturing processes and zero effluent
              discharge technology represent our commitment to excellence in every
              drop we produce.
            </p>
          </div>

          {/* Right — Stat Cards */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                ref={(el) => {
                  if (el) cardsRef.current[i] = el;
                }}
                className="glass-card p-10 hover:border-gold-500/30 transition-colors duration-500 group"
              >
                <div className="heading-1 text-gradient-gold group-hover:scale-105 transition-transform duration-500 origin-left">
                  {stat.value}
                </div>
                <div className="body-base mt-3 text-steel-300 uppercase tracking-wider text-sm font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
