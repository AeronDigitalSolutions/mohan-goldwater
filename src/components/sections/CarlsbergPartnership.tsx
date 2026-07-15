'use client';

import SectionHeading from '../ui/SectionHeading';
import GlassCard from '../ui/GlassCard';
import { SectionProps } from '@/types';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const brands = [
  { name: 'Carlsberg', desc: 'Premium lager, brewed to perfection' },
  { name: 'Tuborg', desc: 'Born in Copenhagen, crafted in India' },
  { name: 'Tuborg Classic', desc: 'Rich heritage, modern taste' },
];

const regions = ['Uttar Pradesh', 'Delhi', 'Punjab'];

export default function CarlsbergPartnership({ id, className = '' }: SectionProps) {
  const cardsRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: cardsRef.current,
        start: 'top 85%',
      },
    });

    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll('.brand-card');
      tl.fromTo(
        cards,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out' }
      );
    }

    if (badgesRef.current) {
      const badges = badgesRef.current.querySelectorAll('.region-badge');
      tl.fromTo(
        badges,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(1.5)' },
        '-=0.4'
      );
    }

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section id={id} className={`section-fullscreen justify-center ${className}`}>
      <div className="max-w-7xl mx-auto w-full">
        <SectionHeading
          label="GLOBAL PARTNERSHIP"
          title="Proud Partners of Carlsberg"
        />

        <p className="body-large max-w-3xl mt-8 text-steel-200">
          Since 2015, we have been the trusted manufacturing partner for Carlsberg India, producing some of the world's most beloved beer brands with unmatched precision and scale.
        </p>

        <div ref={cardsRef} className="grid md:grid-cols-3 gap-8 mt-16">
          {brands.map((brand, i) => (
            <GlassCard key={i} className="brand-card flex flex-col justify-center min-h-[200px]">
              <h3 className="heading-2 text-gradient-gold">{brand.name}</h3>
              <p className="body-base mt-4 text-steel-300">{brand.desc}</p>
            </GlassCard>
          ))}
        </div>

        <div className="mt-16">
          <span className="label block mb-6">Market Coverage</span>
          <div ref={badgesRef} className="flex flex-wrap gap-4">
            {regions.map((region, i) => (
              <div
                key={i}
                className="region-badge px-6 py-3 glass rounded-full flex items-center gap-2"
              >
                <svg
                  className="w-4 h-4 text-gold-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.242-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="body-base text-text-primary">{region}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
