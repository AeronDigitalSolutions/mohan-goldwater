'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  duration?: number;
  className?: string;
}

export default function AnimatedCounter({
  value,
  suffix = '',
  prefix = '',
  label,
  duration = 2,
  className = '',
}: AnimatedCounterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!containerRef.current || !numberRef.current || hasAnimated.current) return;

    const counter = { val: 0 };

    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top 85%',
      onEnter: () => {
        if (hasAnimated.current) return;
        hasAnimated.current = true;
        
        gsap.to(counter, {
          val: value,
          duration: duration,
          ease: 'power2.out',
          onUpdate: () => {
            setDisplayValue(Math.floor(counter.val));
          },
        });
      },
    });

    return () => {
      st.kill();
    };
  }, [value, duration]);

  const formattedValue = new Intl.NumberFormat('en-IN').format(displayValue);
  const isDecimal = value % 1 !== 0;
  const finalFormattedValue = hasAnimated.current && isDecimal && displayValue === Math.floor(value) ? value.toFixed(2) : (isDecimal && displayValue === Math.floor(value) ? displayValue : formattedValue); // Simple handling for 11.80

  // Handle specific case for 11.80
  const renderValue = isDecimal && displayValue === Math.floor(value) ? value.toFixed(2) : formattedValue;


  return (
    <div ref={containerRef} className={className}>
      <div className="heading-1 text-gradient-gold">
        {prefix}{displayValue === Math.floor(value) && isDecimal ? value.toFixed(2) : formattedValue}{suffix}
      </div>
      <div className="label mt-2">{label}</div>
    </div>
  );
}
