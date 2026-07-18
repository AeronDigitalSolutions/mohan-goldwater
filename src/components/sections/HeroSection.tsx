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
        <div ref={bgRef} className="absolute inset-0 w-full h-full will-change-transform">
          <Image
            src="/assets/hero-bg.png"
            alt="MGWBL Brewery Facility"
            fill
            priority
            className="object-cover opacity-80"
            sizes="100vw"
          />
        </div>
        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary-900 via-primary-900/30 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--primary-900)_100%)] opacity-40" />
      </div>

      <div ref={contentRef} className="relative z-10 text-center flex flex-col items-center justify-center pt-20">
        <span className="label text-gold-500 tracking-[0.3em]">
          ESTABLISHED 1969
        </span>

        <h1 className="heading-display mt-8 leading-tight">
          Brewing
          <br />
          <span className="text-gradient-gold">Excellence.</span>
        </h1>

        <p className="body-large mt-8 max-w-xl mx-auto text-steel-200">
          Engineering Trust Since 1969
        </p>

        <div
          className="golden-line mt-12 mx-auto"
          style={{ width: '120px' }}
        />
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center z-10">
        <span className="text-xs uppercase tracking-widest text-steel-500 mb-2 animate-bounce">
          Scroll to Explore
        </span>
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
