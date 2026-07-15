'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TextReveal from './TextReveal';

gsap.registerPlugin(ScrollTrigger);

interface SectionHeadingProps {
  label: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export default function SectionHeading({
  label,
  title,
  description,
  align = 'left',
  className = '',
}: SectionHeadingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });

    if (labelRef.current) {
      tl.fromTo(
        labelRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      );
    }

    if (lineRef.current) {
      tl.fromTo(
        lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.6, ease: 'power2.out' },
        '-=0.4'
      );
    }

    if (descRef.current) {
      tl.fromTo(
        descRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.2'
      );
    }

    return () => {
      tl.kill();
    };
  }, []);

  const alignmentClass = align === 'center' ? 'text-center' : 'text-left';
  const lineMargin = align === 'center' ? '1rem auto' : '1rem 0';

  return (
    <div ref={containerRef} className={`${alignmentClass} ${className}`}>
      <span ref={labelRef} className="label inline-block">
        {label}
      </span>
      <div
        ref={lineRef}
        className="golden-line origin-left"
        style={{ width: '60px', margin: lineMargin }}
      />
      
      {/* Title uses TextReveal which handles its own ScrollTrigger, but we wrap it to maintain spacing */}
      <div className="mt-4">
         <TextReveal as="h2" className={align === 'center' ? 'heading-2' : 'heading-1'}>{title}</TextReveal>
      </div>

      {description && (
        <p
          ref={descRef}
          className={`body-large mt-6 ${align === 'center' ? 'max-w-2xl mx-auto' : ''}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
