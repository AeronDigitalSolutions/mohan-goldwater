'use client';

import SectionHeading from '../ui/SectionHeading';
import { SectionProps } from '@/types';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';
import { ShieldCheck, Leaf, Settings, Globe2, Activity, FlaskConical, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const qualityPoints = [
  { 
    title: 'ISO Certified', 
    desc: 'Internationally recognized processes ensuring consistent excellence.',
    icon: ShieldCheck
  },
  { 
    title: 'Zero Effluent', 
    desc: 'Advanced discharge technology protecting our environment.',
    icon: Leaf
  },
  { 
    title: 'Fully Automated', 
    desc: 'Precision engineering minimizing human error in production.',
    icon: Settings
  },
  { 
    title: 'Global Audits', 
    desc: 'Regular international quality assessments and compliance.',
    icon: Globe2
  },
  { 
    title: 'Real-time Monitoring', 
    desc: '24/7 sensor-driven quality tracking at every stage.',
    icon: Activity
  },
  { 
    title: 'Stringent Testing', 
    desc: 'Rigorous raw material selection and batch validation.',
    icon: FlaskConical
  },
];

export default function QualityControl({ id, className = '' }: SectionProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;

    const cards = gridRef.current.querySelectorAll('.quality-card');

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { 
          opacity: 0, 
          y: 40,
          scale: 0.95
        },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          duration: 1, 
          stagger: 0.15, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
          }
        }
      );
    }, gridRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id={id} className={`section py-32 bg-background relative overflow-hidden ${className}`}>
      
      {/* Subtle background element */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-gold-500/5 rounded-full blur-[150px] pointer-events-none translate-x-1/3 -translate-y-1/3" />

      <div className="max-w-7xl w-full mx-auto relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-20 pt-4">
          <span className="label block mb-6 text-gold-500 tracking-[0.2em] font-bold text-xs uppercase">QUALITY CONTROL</span>
          <h2 className="heading-2 mb-8 leading-tight">Uncompromising Standards</h2>
          <p className="body-large text-steel-400 [.light_&]:text-gray-700 leading-relaxed transition-colors duration-500">
            At Mohan Goldwater Breweries Limited, quality is our foundational principle. Our fully automated facility ensures consistency across millions of hectoliters, while our zero effluent discharge technology demonstrates that scale never has to come at the expense of environmental responsibility.
          </p>
        </div>

        {/* Cards Grid */}
        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {qualityPoints.map((point, i) => {
                const Icon = point.icon;
                const isGreen = i % 2 !== 0;
                
                // Dynamic Color Classes
                const hoverBorderClass = isGreen 
                  ? 'hover:border-green-600/30 [.light_&]:hover:border-green-600/40' 
                  : 'hover:border-gold-500/30 [.light_&]:hover:border-gold-500/40';
                  
                const iconBorderClass = isGreen ? 'border-green-600/20' : 'border-gold-500/20';
                const iconBgClass = isGreen ? 'bg-green-600/5 group-hover:bg-green-600/10' : 'bg-gold-500/5 group-hover:bg-gold-500/10';
                const textColorClass = isGreen ? 'text-green-600' : 'text-gold-500';

                return (
                  <div 
                    key={i} 
                    className={`quality-card group p-8 lg:p-10 rounded-[2rem] bg-[#111111] [.light_&]:bg-white border border-white/5 [.light_&]:border-black/5 ${hoverBorderClass} hover:bg-[#151515] [.light_&]:hover:bg-white transition-all duration-500 flex flex-col min-h-[300px] [.light_&]:shadow-[0_20px_50px_rgba(0,0,0,0.08)]`}
                  >
                    {/* Top Row: Icon & Number */}
                    <div className="flex justify-between items-start w-full">
                      <div className={`w-16 h-16 lg:w-20 lg:h-20 rounded-full border ${iconBorderClass} flex items-center justify-center ${iconBgClass} ${textColorClass} group-hover:scale-110 transition-all duration-500 shrink-0`}>
                        <Icon className="w-8 h-8 lg:w-10 lg:h-10 stroke-[1.5]" />
                      </div>
                      <span className="text-white/20 [.light_&]:text-black/10 font-mono text-base lg:text-lg tracking-wider font-bold mt-2 transition-colors duration-500">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                    
                    {/* Middle: Text */}
                    <div className="w-full mt-8 mb-6">
                      <h4 className="text-xl lg:text-2xl font-bold text-white [.light_&]:text-[#050505] mb-3 tracking-tight leading-snug transition-colors duration-500">{point.title}</h4>
                      <p className="text-steel-400 [.light_&]:text-gray-600 text-sm lg:text-base leading-relaxed group-hover:text-steel-300 [.light_&]:group-hover:text-gray-900 transition-colors duration-300">
                        {point.desc}
                      </p>
                    </div>

                    {/* Flexible Spacer to push footer to the bottom */}
                    <div className="flex-grow" />

                    {/* Bottom: Link */}
                    <div className={`w-full pt-6 border-t border-white/10 [.light_&]:border-black/10 flex items-center ${textColorClass} text-sm lg:text-base font-bold tracking-widest uppercase opacity-80 group-hover:opacity-100 transition-all duration-500`}>
                      <span>Explore</span>
                      <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                );
              })}
            </div>
      </div>
    </section>
  );
}
