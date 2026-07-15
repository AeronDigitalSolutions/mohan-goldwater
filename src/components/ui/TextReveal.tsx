'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  as?: any;
}

export default function TextReveal({
  children,
  className = '',
  delay = 0,
  as: Component = 'p',
}: TextRevealProps) {
  const containerRef = useRef<HTMLElement>(null);
  const words = children.split(' ');

  useEffect(() => {
    if (!containerRef.current) return;

    const innerSpans = containerRef.current.querySelectorAll('.reveal-inner');

    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top 85%',
      animation: gsap.fromTo(
        innerSpans,
        { y: '110%' },
        { y: '0%', duration: 0.8, stagger: 0.03, delay, ease: 'power3.out' }
      ),
      toggleActions: 'play none none none',
    });

    return () => {
      st.kill();
    };
  }, [delay]);

  return (
    <Component ref={containerRef as any} className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em] align-top">
          <span className="reveal-inner inline-block translate-y-[110%] pb-1">
            {word}
          </span>
        </span>
      ))}
    </Component>
  );
}
