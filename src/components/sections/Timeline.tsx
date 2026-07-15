'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const events = [
  {
    year: '1969',
    title: 'Founded',
    desc: 'Mohan Goldwater Breweries Limited incorporated on March 18, 1969',
  },
  {
    year: '1970s–2000s',
    title: 'Building Expertise',
    desc: 'Decades of developing brewing capabilities and building industry reputation',
  },
  {
    year: '2010',
    title: 'New Ownership',
    desc: 'Acquired by the Chadha-Rajasthan-Jaiswal consortium, ushering in a new era of growth',
  },
  {
    year: '~2015',
    title: 'Carlsberg Partnership',
    desc: 'Began exclusive franchise and contract manufacturing partnership with Carlsberg India',
  },
  {
    year: '2020s',
    title: 'Capacity Expansion',
    desc: 'Expanded to 11.80 Lakh HLPA with a modern high-speed canning line',
  },
  {
    year: 'Today',
    title: 'Manufacturing Excellence',
    desc: 'Producing Carlsberg, Tuborg, and Tuborg Classic for UP, Delhi, and Punjab',
  },
];

import { SectionProps } from '@/types';

export default function Timeline({ id, className = '' }: SectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Draw the timeline line progressively
      if (lineRef.current) {
        gsap.from(lineRef.current, {
          scaleY: 0,
          transformOrigin: 'top center',
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'bottom 40%',
            scrub: 1,
          },
        });
      }

      // Stagger cards from alternating sides
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        const isLeft = i % 2 === 0;
        gsap.from(card, {
          opacity: 0,
          x: isLeft ? -60 : 60,
          duration: 0.8,
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
    <section id={id} ref={sectionRef} className={`section py-32 relative overflow-hidden ${className}`}>
      {/* Section Heading */}
      <div className="text-center mb-20">
        <span className="label">OUR JOURNEY</span>
        <h2 className="heading-2 mt-4">Milestones That Define Us</h2>
        <div className="golden-line mt-6 mx-auto" style={{ width: '80px' }} />
      </div>

      {/* Timeline */}
      <div className="relative max-w-5xl mx-auto">
        {/* Vertical Line */}
        <div
          ref={lineRef}
          className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px"
          style={{
            background:
              'linear-gradient(180deg, transparent, var(--gold-500) 10%, var(--gold-400) 50%, var(--gold-500) 90%, transparent)',
          }}
        />

        {/* Events */}
        <div className="flex flex-col gap-12">
          {events.map((event, i) => {
            const isLeft = i % 2 === 0;
            return (
              <div
                key={event.year}
                className={`relative flex items-start ${
                  isLeft
                    ? 'md:flex-row md:text-right'
                    : 'md:flex-row-reverse md:text-left'
                } flex-row`}
              >
                {/* Card Side */}
                <div className="flex-1 hidden md:block" />

                {/* Dot */}
                <div className="relative z-10 flex-shrink-0 mx-0 md:mx-6">
                  <motion.div
                    className="w-4 h-4 rounded-full bg-gold-500 border-4 border-primary-900"
                    whileHover={{ scale: 1.5 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  />
                </div>

                {/* Card */}
                <div className="flex-1">
                  <motion.div
                    ref={(el) => {
                      if (el) cardsRef.current[i] = el;
                    }}
                    className="glass-card ml-4 md:ml-0"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <div className="heading-2 text-gradient-gold">
                      {event.year}
                    </div>
                    <h3 className="heading-3 mt-2">{event.title}</h3>
                    <p className="body-base mt-2">{event.desc}</p>
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
