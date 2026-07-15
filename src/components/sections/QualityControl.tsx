'use client';

import SectionHeading from '../ui/SectionHeading';
import GlassCard from '../ui/GlassCard';
import { SectionProps } from '@/types';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const qualityPoints = [
  'ISO Certified Processes',
  'Zero Effluent Discharge',
  'Fully Automated Production',
  'International Quality Audits',
  'Real-time Quality Monitoring',
  'Stringent Raw Material Testing',
];

export default function QualityControl({ id, className = '' }: SectionProps) {
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!listRef.current) return;

    const items = listRef.current.querySelectorAll('li');

    const st = ScrollTrigger.create({
      trigger: listRef.current,
      start: 'top 85%',
      animation: gsap.fromTo(
        items,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' }
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
          label="QUALITY"
          title="Uncompromising Standards"
        />

        <div className="grid md:grid-cols-2 gap-16 mt-16">
          <div className="flex flex-col justify-center">
            <p className="body-large text-steel-200">
              At Mohan Goldwater Breweries Limited, quality is not just a department—it is our foundational principle. Our fully automated facility ensures consistency across millions of hectoliters, while our zero effluent discharge technology demonstrates that scale never has to come at the expense of environmental responsibility or hygiene.
            </p>
          </div>

          <div>
            <GlassCard>
              <ul ref={listRef} className="space-y-6">
                {qualityPoints.map((point, i) => (
                  <li key={i} className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gold-500/20 flex items-center justify-center border border-gold-500/50">
                      <svg
                        className="w-5 h-5 text-gold-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="body-base text-text-primary">{point}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}
