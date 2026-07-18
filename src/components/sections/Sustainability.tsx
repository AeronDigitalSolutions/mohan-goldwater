'use client';

import SectionHeading from '../ui/SectionHeading';
import { SectionProps } from '@/types';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

import Image from 'next/image';

const metrics = [
  {
    title: 'Zero Effluent Discharge',
    desc: 'Advanced water treatment ensures every drop is recycled, setting industry benchmarks for environmental responsibility.',
    icon: (
      <svg className="w-8 h-8 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
  {
    title: 'Energy Efficient',
    desc: 'Modern energy management systems reduce our carbon footprint while maintaining peak production output seamlessly.',
    icon: (
      <svg className="w-8 h-8 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: 'Fully Automated',
    desc: 'Precision automation minimizes waste and ensures consistent quality in every single batch produced.',
    icon: (
      <svg className="w-8 h-8 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

export default function Sustainability({ id, className = '' }: SectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const textEls = containerRef.current.querySelectorAll('.animate-text');
    const cards = containerRef.current.querySelectorAll('.sustain-card');
    const statement = containerRef.current.querySelector('.statement');

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        },
      });

      tl.fromTo(
        textEls,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power3.out' }
      )
      .fromTo(
        cards,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out' },
        '-=0.6'
      )
      .fromTo(
        statement,
        { opacity: 0, scale: 0.9, filter: 'blur(10px)' },
        { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.2, ease: 'power2.out' },
        '-=0.2'
      );

      // Parallax for Background Image
      if (bgRef.current) {
        gsap.fromTo(
          bgRef.current,
          { y: '-10%' },
          {
            y: '10%',
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id={id} className={`section py-40 relative overflow-hidden ${className}`}>
      {/* Background Image with Deep Parallax and Overlays */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div ref={bgRef} className="absolute inset-0 w-full h-[120%] -top-[10%]">
          <Image
            src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=3000&auto=format&fit=crop"
            alt="Sustainability and Nature"
            fill
            className="object-cover opacity-15 mix-blend-luminosity grayscale"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-primary-900 via-primary-900/80 to-primary-900"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--primary-900)_100%)]"></div>
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold-500/20 to-transparent"></div>
      </div>
      
      <div ref={containerRef} className="max-w-7xl mx-auto relative z-10 w-full">
        <div className="animate-text flex flex-col items-center text-center">
          <SectionHeading
            label="SUSTAINABILITY"
            title="Brewing a Better Future"
            align="center"
          />
        </div>

        <div className="mt-24 lg:mt-32">
          <div className="grid xl:grid-cols-3 gap-8 md:gap-12">
            {metrics.map((metric, i) => (
              <div key={i} className="sustain-card relative p-10 lg:p-12 rounded-3xl bg-gradient-to-br from-white/[0.04] to-transparent border border-white/[0.08] backdrop-blur-xl overflow-hidden group flex flex-col justify-start min-h-[380px]">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold-600 to-copper-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out"></div>
                
                {/* Top: Icon */}
                <div className="w-16 h-16 rounded-2xl border border-gold-500/20 flex items-center justify-center bg-gradient-to-br from-gold-500/5 to-transparent group-hover:border-gold-500/40 group-hover:bg-gold-500/10 transition-all duration-500 shrink-0 mb-8">
                  {metric.icon}
                </div>

                {/* Text */}
                <div className="w-full">
                  <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4 tracking-tight">{metric.title}</h3>
                  <p className="text-base lg:text-lg text-steel-400 leading-relaxed group-hover:text-steel-300 transition-colors duration-300">{metric.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-32 lg:mt-40 relative py-16 px-8 md:py-20 md:px-16 max-w-5xl mx-auto rounded-[3rem] overflow-hidden border border-white/5 bg-gradient-to-br from-[#0a0a0a] to-[#111111]">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-900 via-[#0a0a0a] to-primary-900 z-0"></div>
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay z-0"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-500/10 rounded-full blur-[100px] z-0 pointer-events-none"></div>
            
            <h2 className="statement relative z-10 text-4xl md:text-6xl lg:text-7xl font-bold text-center text-gradient-gold leading-tight tracking-tight">
              Every drop counts.<br />
              Every process matters.
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}
