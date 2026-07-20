'use client';

import SectionHeading from '../ui/SectionHeading';
import { SectionProps } from '@/types';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

import Image from 'next/image';

const brands = [
  { name: 'Carlsberg', desc: 'Premium lager, brewed to perfection. A legacy of Danish brewing excellence brought to life in every drop.' },
  { name: 'Tuborg', desc: 'Born in Copenhagen, crafted in India. The pulse of the youth, delivering consistent refreshment.' },
  { name: 'Tuborg Classic', desc: 'Rich heritage, modern taste. A bolder, smoother experience crafted for the discerning palate.' },
];

const regions = ['Uttar Pradesh', 'Delhi', 'Punjab'];

export default function CarlsbergPartnership({ id, className = '' }: SectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const cards = containerRef.current.querySelectorAll('.brand-card');
    const badges = containerRef.current.querySelectorAll('.region-pill');
    const textElements = containerRef.current.querySelectorAll('.animate-text');

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        },
      });

      tl.fromTo(
        textElements,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power3.out' }
      );

      if (imageRef.current) {
        tl.fromTo(
          imageRef.current,
          { opacity: 0, scale: 0.9, y: 50 },
          { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: 'power3.out' },
          '-=0.6'
        );

        // Floating animation
        gsap.to(imageRef.current, {
          y: -15,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      tl.fromTo(
        cards,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' },
        '-=0.6'
      )
      .fromTo(
        badges,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.5)' },
        '-=0.4'
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id={id} className={`section py-40 relative overflow-hidden ${className}`}>
      {/* Section Separator */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold-500/20 to-transparent"></div>
      
      {/* Background Gradient */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gold-900/20 via-primary-900/0 to-primary-900/0"></div>

      <div ref={containerRef} className="max-w-7xl mx-auto relative z-10 w-full">

        {/* Center-Aligned Header Section */}
        <div className="animate-text text-center max-w-5xl mx-auto mb-8 md:mb-12">
          <SectionHeading
            label="GLOBAL PARTNERSHIP"
            title="Proud Partners of Carlsberg"
            align="center"
          />
          <p className="body-large mt-8 text-steel-300 leading-relaxed text-lg lg:text-xl mx-auto max-w-4xl">
            Since 2015, we have been the trusted manufacturing partner for Carlsberg India, producing some of the world&apos;s most beloved beer brands with unmatched precision and scale.
          </p>
        </div>

        {/* Floating Partnership Image */}
        <div ref={imageRef} className="relative w-full max-w-5xl mx-auto h-[400px] md:h-[600px] group">
          <Image
            src="/assets/carlsberg-bottles.png"
            alt="Carlsberg Bottles"
            fill
            className="object-contain transition-transform duration-1000 group-hover:scale-105 drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
            sizes="(max-width: 1200px) 100vw, 1200px"
          />
        </div>

        {/* Brand Cards Grid — Center Aligned */}
        <div className="grid lg:grid-cols-3 gap-8 mt-12 md:mt-16 max-w-6xl mx-auto">
          {brands.map((brand, i) => (
            <div
              key={i}
              className="brand-card group relative px-10 py-12 lg:px-12 lg:py-14 rounded-3xl bg-gradient-to-br from-white/[0.04] [.light_&]:from-black/[0.02] to-transparent border border-white/[0.08] [.light_&]:border-black/10 backdrop-blur-2xl transition-all duration-500 hover:border-gold-500/30 [.light_&]:hover:border-gold-500/40 hover:bg-white/[0.08] [.light_&]:hover:bg-white flex flex-col items-center justify-center text-center min-h-[400px] [.light_&]:shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
            >
              {/* Hover glow overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-gold-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"></div>

              {/* Large Number */}
              <span className="text-gold-500/20 font-mono text-7xl lg:text-8xl font-black absolute top-6 right-8 select-none group-hover:text-gold-500/30 transition-colors duration-500">
                {String(i + 1).padStart(2, '0')}
              </span>

              {/* Vertically Centered Content */}
              <div className="relative z-10">
                <h3 className="text-3xl lg:text-4xl font-bold text-white [.light_&]:text-[#050505] mb-6 tracking-tight transition-colors duration-500">{brand.name}</h3>
                <p className="text-base lg:text-lg text-steel-400 [.light_&]:text-gray-600 leading-relaxed group-hover:text-steel-300 [.light_&]:group-hover:text-[#050505] transition-colors duration-300 max-w-xs mx-auto">
                  {brand.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Market Coverage — Premium Pill Buttons */}
        <div className="mt-24 pt-16 border-t border-white/10 [.light_&]:border-black/10 text-center transition-colors duration-500">
          <span className="animate-text label block mb-10 text-gold-500 tracking-[0.2em] uppercase text-sm font-bold">Market Coverage</span>

          <div className="flex flex-wrap justify-center gap-6">
            {regions.map((region, i) => (
              <div
                key={i}
                className="region-pill px-10 py-5 rounded-full border border-white/10 [.light_&]:border-black/10 bg-white/[0.03] [.light_&]:bg-black/[0.03] backdrop-blur-xl flex items-center gap-4 transition-all duration-500 hover:border-gold-500/40 [.light_&]:hover:border-gold-500/40 hover:bg-gold-500/10 [.light_&]:hover:bg-gold-500/10 cursor-default group"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-gold-500/60 group-hover:bg-gold-500 group-hover:shadow-[0_0_12px_rgba(200,130,14,0.6)] transition-all duration-500"></div>
                <span className="text-lg lg:text-xl font-medium text-steel-200 [.light_&]:text-[#050505] group-hover:text-white transition-colors tracking-wide">{region}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
