'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionProps } from '@/types';

gsap.registerPlugin(ScrollTrigger);

const events = [
  {
    year: '1969',
    title: 'Founded',
    desc: 'Mohan Goldwater Breweries Limited incorporated on March 18, 1969',
  },
  {
    year: '1970s–2000s',
    title: 'Building Expertise',
    desc: 'Decades of developing brewing capabilities and building industry reputation',
  },
  {
    year: '2010',
    title: 'New Ownership',
    desc: 'Acquired by the Chadha-Rajasthan-Jaiswal consortium, ushering in a new era of growth',
  },
  {
    year: '~2015',
    title: 'Carlsberg Partnership',
    desc: 'Began exclusive franchise and contract manufacturing partnership with Carlsberg India',
  },
  {
    year: '2020s',
    title: 'Capacity Expansion',
    desc: 'Expanded to 11.80 Lakh HLPA with a modern high-speed canning line',
  },
  {
    year: 'Today',
    title: 'Manufacturing Excellence',
    desc: 'Producing Carlsberg, Tuborg, and Tuborg Classic for UP, Delhi, and Punjab',
  },
];

export default function Timeline({ id, className = '' }: SectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<HTMLDivElement[]>([]);
  const cardsLeftRef = useRef<HTMLDivElement[]>([]);
  const cardsRightRef = useRef<HTMLDivElement[]>([]);
  const cardsMobileRef = useRef<HTMLDivElement[]>([]);
  const dotsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Draw the timeline line progressively
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            transformOrigin: 'top center',
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 50%',
              end: 'bottom 80%',
              scrub: 1,
            },
          }
        );
      }

      // Cards and dots reveal based on scroll
      rowsRef.current.forEach((row, i) => {
        if (!row) return;
        const isLeft = i % 2 === 0;
        const desktopCard = isLeft ? cardsLeftRef.current[i] : cardsRightRef.current[i];
        const mobileCard = cardsMobileRef.current[i];
        const dot = dotsRef.current[i];
        
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: 'top 75%',
            end: 'top 50%',
            scrub: 1,
          },
        });

        if (dot) {
          tl.fromTo(dot, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.2 });
        }

        if (desktopCard) {
          tl.fromTo(
            desktopCard,
            { opacity: 0, x: isLeft ? -100 : 100, y: 50 },
            { opacity: 1, x: 0, y: 0, duration: 0.8, ease: 'power3.out' },
            '-=0.1'
          );
        }

        if (mobileCard) {
          tl.fromTo(
            mobileCard,
            { opacity: 0, x: 100, y: 50 },
            { opacity: 1, x: 0, y: 0, duration: 0.8, ease: 'power3.out' },
            '-=0.1'
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id={id} ref={sectionRef} className={`section py-32 relative overflow-hidden ${className}`}>

      {/* Section Heading */}
      <div className="text-center mb-32 relative z-20">
        <span className="label block mb-4 text-steel-400">OUR JOURNEY</span>
        <h2 className="heading-2">Milestones That Define Us</h2>
        <div className="golden-line mt-8 mx-auto" style={{ width: '80px' }} />
      </div>

      {/* Timeline */}
      <div className="timeline-container">
        
        {/* Vertical Line */}
        <div
          ref={lineRef}
          className="absolute timeline-line top-0 bottom-0 w-[2px] origin-top z-0"
          style={{
            background: 'linear-gradient(180deg, transparent, var(--gold-500) 10%, var(--gold-400) 50%, var(--gold-500) 90%, transparent)',
          }}
        />

        {/* Events */}
        <div className="flex flex-col w-full relative z-10" style={{ gap: '120px' }}>
          {events.map((event, i) => {
            const isLeft = i % 2 === 0;

            return (
              <div 
                key={event.year} 
                ref={(el) => { if (el) rowsRef.current[i] = el; }}
                className="relative w-full flex items-center justify-center min-h-[150px]"
              >
                 
                 {/* Desktop Left Side */}
                 <div className="hidden md:flex w-1/2 justify-end items-center" style={{ paddingRight: '4rem' }}>
                    <div 
                      ref={(el) => { if (el) cardsLeftRef.current[i] = el; }}
                      className="glass-card p-10 max-w-xl w-full text-right"
                      style={{ display: isLeft ? 'block' : 'none' }}
                    >
                       <div className="heading-2 text-gradient-gold mb-2">{event.year}</div>
                       <h3 className="heading-3 text-white mb-3">{event.title}</h3>
                       <p className="body-base text-steel-400">{event.desc}</p>
                    </div>
                 </div>

                 {/* The Dot */}
                 <div className="absolute timeline-dot z-20 flex items-center justify-center w-8 h-8">
                    <div 
                       ref={(el) => { if (el) dotsRef.current[i] = el; }}
                       className="w-5 h-5 rounded-full bg-primary-900 border-[3px] border-gold-500 shadow-[0_0_15px_rgba(212,175,55,0.8)]"
                    />
                 </div>

                 {/* Desktop Right Side */}
                 <div className="hidden md:flex w-1/2 justify-start items-center" style={{ paddingLeft: '4rem' }}>
                    <div 
                      ref={(el) => { if (el) cardsRightRef.current[i] = el; }}
                      className="glass-card p-10 max-w-xl w-full text-left"
                      style={{ display: !isLeft ? 'block' : 'none' }}
                    >
                       <div className="heading-2 text-gradient-gold mb-2">{event.year}</div>
                       <h3 className="heading-3 text-white mb-3">{event.title}</h3>
                       <p className="body-base text-steel-400">{event.desc}</p>
                    </div>
                 </div>

                 {/* Mobile View */}
                 <div className="flex md:hidden w-full justify-start pl-16">
                    <div 
                      ref={(el) => { if (el) cardsMobileRef.current[i] = el; }}
                      className="glass-card p-8 w-full text-left"
                    >
                       <div className="heading-2 text-gradient-gold mb-2">{event.year}</div>
                       <h3 className="heading-3 text-white mb-3">{event.title}</h3>
                       <p className="body-base text-steel-400">{event.desc}</p>
                    </div>
                 </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
