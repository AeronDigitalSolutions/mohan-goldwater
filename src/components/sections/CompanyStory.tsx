'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionProps } from '@/types';

gsap.registerPlugin(ScrollTrigger);

import Image from 'next/image';

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
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRevealRef = useRef<HTMLDivElement>(null);

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

      // Image Mask Reveal Animation
      if (imageRevealRef.current && imageContainerRef.current) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: imageContainerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        });

        tl.to(imageRevealRef.current, {
          height: '0%',
          duration: 1.5,
          ease: 'power4.inOut',
        });

        // Parallax the image slightly inside its container
        const img = imageContainerRef.current.querySelector('img');
        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.15, y: -20 },
            {
              scale: 1,
              y: 20,
              ease: 'none',
              scrollTrigger: {
                trigger: imageContainerRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            }
          );
        }
      }
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
        <div ref={headerRef} className="mb-20">
          <span className="label block mb-4 text-steel-400">OUR STORY</span>
          <h2 className="heading-2 max-w-3xl">Half a Century of Brewing Excellence</h2>
          <div className="golden-line mt-8" style={{ width: '80px' }} />
        </div>

        {/* 50/50 Grid */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left — Narrative & Stats */}
          <div className="flex flex-col gap-16">
            <div ref={textRef} className="flex flex-col gap-8">
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

            {/* Stat Cards inside the left column */}
            <div className="grid sm:grid-cols-2 gap-6">
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  ref={(el) => {
                    if (el) cardsRef.current[i] = el;
                  }}
                  className="glass-card p-8 hover:border-gold-500/30 transition-colors duration-500 group"
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

          {/* Right — Image with Mask Reveal */}
          <div className="relative h-[600px] lg:h-full min-h-[600px] rounded-3xl overflow-hidden border border-white/10" ref={imageContainerRef}>
            {/* The reveal block that slides away */}
            <div ref={imageRevealRef} className="absolute inset-0 bg-background z-20 origin-top transition-colors duration-500"></div>
            {/* The actual image */}
            <Image
              src="/assets/long-image.png"
              alt="State-of-the-art brewing infrastructure"
              fill
              className="object-cover opacity-80"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            
            {/* Overlay gradient for aesthetics */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40 z-10 pointer-events-none transition-opacity duration-500"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
