'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionProps } from '@/types';

gsap.registerPlugin(ScrollTrigger);

import Image from 'next/image';

export default function HeroSection({ id, className = '' }: SectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!contentRef.current || !sectionRef.current || !bgRef.current) return;

      // Subtle Ken Burns scale effect on load
      gsap.fromTo(
        bgRef.current,
        { scale: 1.05 },
        {
          scale: 1,
          duration: 10,
          ease: 'power1.out',
        }
      );

      // Dramatic Entrance Animation for Text
      const elements = contentRef.current.children;
      gsap.from(elements, {
        y: 80,
        opacity: 0,
        rotationX: -15,
        scale: 0.95,
        duration: 1.5,
        stagger: 0.2,
        ease: 'power4.out',
        delay: 0.2,
      });

      // Scroll Parallax for Content
      gsap.to(contentRef.current, {
        y: -150,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Scroll Parallax for Background (moves slower than content)
      gsap.to(bgRef.current, {
        y: '20%',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`section-fullscreen min-h-screen flex items-center justify-center relative overflow-hidden ${className}`}
      style={{ perspective: '1000px' }}
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-primary-900">
        <div ref={bgRef} className="absolute inset-0 w-full h-full will-change-transform bg-primary-900">
          <div className="hero-img-dark absolute inset-0 w-full h-full">
            <Image
              src="/assets/hero-bg.png"
              alt="MGWBL Brewery Facility"
              fill
              priority
              className="object-cover opacity-80"
              sizes="100vw"
            />
          </div>
          <div className="hero-img-light absolute inset-0 w-full h-full">
            <Image
              src="/assets/hero-bg-light.png"
              alt="MGWBL Brewery Facility Light"
              fill
              priority
              className="object-cover opacity-80"
              sizes="100vw"
            />
          </div>
        </div>
        {/* Gradient Overlay for Text Readability */}
        <div 
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, var(--hero-gradient) 0%, transparent 40%)' }}
        />
        <div 
          className="absolute inset-0 opacity-40"
          style={{ background: 'radial-gradient(circle at center, transparent 0%, var(--hero-overlay) 100%)' }}
        />
      </div>

      <div ref={contentRef} className="relative z-10 text-center flex flex-col items-center justify-center pt-20" style={{ marginTop: 'var(--hero-content-offset)', transition: 'margin-top 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }}>
        <span 
          className="label tracking-[0.3em] px-6 py-2 rounded-full backdrop-blur-md border border-white/20 shadow-xl"
          style={{ backgroundColor: 'var(--hero-pill-bg, rgba(255,255,255,0.1))', color: 'var(--hero-pill-text, var(--text-primary))', transition: 'all 0.5s ease' }}
        >
          ESTABLISHED 1969
        </span>

        <h1 className="heading-display text-hero-heading mt-8 leading-tight">
          Brewing
          <br />
          <span className="text-gradient-hero-excellence">Excellence.</span>
        </h1>

        <div 
          className="px-6 py-2 rounded-full backdrop-blur-md border border-white/20 mt-8 shadow-xl"
          style={{ backgroundColor: 'var(--hero-pill-bg, rgba(255,255,255,0.1))', transition: 'background-color 0.5s ease' }}
        >
          <p className="body-large max-w-xl mx-auto font-medium" style={{ color: 'var(--hero-pill-text, var(--text-primary))', margin: 0, transition: 'color 0.5s ease' }}>
            Engineering Trust Since 1969
          </p>
        </div>

        <div
          className="golden-line mt-12 mx-auto"
          style={{ width: '120px' }}
        />
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center z-10">
        <div 
          className="px-6 py-2 rounded-full backdrop-blur-md border border-white/20 mb-2 shadow-xl"
          style={{ backgroundColor: 'var(--hero-pill-bg, rgba(255,255,255,0.1))', transition: 'background-color 0.5s ease' }}
        >
          <span className="text-xs uppercase tracking-widest animate-bounce block font-bold" style={{ color: 'var(--hero-pill-text, var(--text-primary))', transition: 'color 0.5s ease' }}>
            Scroll to Explore
          </span>
        </div>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className="animate-bounce"
          aria-hidden="true"
        >
          <path
            d="M6 9L12 15L18 9"
            stroke="var(--gold-500)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </section>
  );
}
