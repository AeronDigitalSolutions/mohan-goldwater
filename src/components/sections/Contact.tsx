'use client';

import SectionHeading from '../ui/SectionHeading';
import MagneticButton from '../ui/MagneticButton';
import { SectionProps } from '@/types';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

export default function Contact({ id, className = '' }: SectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
      },
    });

    const header = containerRef.current.querySelector('.animate-header');
    
    tl.fromTo(
      header,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    );

    if (formRef.current) {
      const fields = formRef.current.querySelectorAll('.form-field');
      tl.fromTo(
        fields,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' },
        '-=0.4'
      );
    }

    if (infoRef.current) {
      const items = infoRef.current.querySelectorAll('.info-item');
      tl.fromTo(
        items,
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' },
        '-=0.6'
      );
    }

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section id={id} className={`section py-40 relative overflow-hidden ${className}`}>
      {/* Background elements */}
      <div className="absolute inset-0 bg-primary-900"></div>
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(circle_at_top_right,_rgba(200,130,14,0.05)_0%,_transparent_60%)] pointer-events-none"></div>
      
      <div ref={containerRef} className="max-w-7xl mx-auto relative z-10">
        <div className="animate-header">
          <SectionHeading
            label="GET IN TOUCH"
            title="Start a Conversation"
          />
        </div>

        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-20 mt-20">
          {/* Form */}
          <div className="relative">
            <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-3xl rounded-[2.5rem] border border-white/10 -m-8 p-8 pointer-events-none"></div>
            <form ref={formRef} className="space-y-8 relative z-10" onSubmit={(e) => e.preventDefault()}>
              <div className="form-field grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-xs font-semibold text-gold-500 mb-3 uppercase tracking-widest">Name</label>
                  <input type="text" className="w-full bg-primary-800/40 border border-white/10 rounded-2xl px-6 py-4 text-text-primary focus:border-gold-500/60 focus:bg-primary-800/60 focus:ring-1 focus:ring-gold-500/60 outline-none transition-all placeholder:text-steel-600" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gold-500 mb-3 uppercase tracking-widest">Email</label>
                  <input type="email" className="w-full bg-primary-800/40 border border-white/10 rounded-2xl px-6 py-4 text-text-primary focus:border-gold-500/60 focus:bg-primary-800/60 focus:ring-1 focus:ring-gold-500/60 outline-none transition-all placeholder:text-steel-600" placeholder="john@example.com" />
                </div>
              </div>
              <div className="form-field">
                <label className="block text-xs font-semibold text-gold-500 mb-3 uppercase tracking-widest">Company</label>
                <input type="text" className="w-full bg-primary-800/40 border border-white/10 rounded-2xl px-6 py-4 text-text-primary focus:border-gold-500/60 focus:bg-primary-800/60 focus:ring-1 focus:ring-gold-500/60 outline-none transition-all placeholder:text-steel-600" placeholder="Your Organization" />
              </div>
              <div className="form-field">
                <label className="block text-xs font-semibold text-gold-500 mb-3 uppercase tracking-widest">Inquiry Type</label>
                <div className="relative">
                  <select className="w-full bg-primary-800/40 border border-white/10 rounded-2xl px-6 py-4 text-text-primary focus:border-gold-500/60 focus:bg-primary-800/60 focus:ring-1 focus:ring-gold-500/60 outline-none transition-all appearance-none cursor-pointer">
                    <option className="bg-primary-800">General Inquiry</option>
                    <option className="bg-primary-800">Partnership</option>
                    <option className="bg-primary-800">Careers</option>
                    <option className="bg-primary-800">Media</option>
                  </select>
                  <svg className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-steel-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              <div className="form-field">
                <label className="block text-xs font-semibold text-gold-500 mb-3 uppercase tracking-widest">Message</label>
                <textarea rows={5} className="w-full bg-primary-800/40 border border-white/10 rounded-2xl px-6 py-4 text-text-primary focus:border-gold-500/60 focus:bg-primary-800/60 focus:ring-1 focus:ring-gold-500/60 outline-none transition-all resize-none placeholder:text-steel-600" placeholder="How can we help you?"></textarea>
              </div>
              <div className="form-field pt-6">
                <button className="w-full py-4 text-lg bg-gradient-to-r from-gold-600 to-copper-600 text-white rounded-2xl shadow-[0_0_20px_rgba(200,130,14,0.2)] hover:shadow-[0_0_30px_rgba(200,130,14,0.4)] transition-all font-medium">
                  Send Message
                </button>
              </div>
            </form>
          </div>

          {/* Contact Info */}
          <div ref={infoRef} className="flex flex-col justify-center space-y-12 lg:pl-10">
            <div className="info-item group flex items-start gap-6">
              <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center group-hover:bg-gold-500/10 group-hover:border-gold-500/30 transition-all duration-300 shrink-0">
                <svg className="w-6 h-6 text-gold-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-text-primary mb-2">Manufacturing Plant</h3>
                <p className="body-base text-steel-400 leading-relaxed">Unnao, Uttar Pradesh, India</p>
              </div>
            </div>

            <div className="info-item group flex items-start gap-6">
              <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center group-hover:bg-gold-500/10 group-hover:border-gold-500/30 transition-all duration-300 shrink-0">
                <svg className="w-6 h-6 text-gold-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.242-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-text-primary mb-2">Registered Office</h3>
                <p className="body-base text-steel-400 leading-relaxed">2nd Floor, 7/22D Tilak Nagar<br/>Kanpur, UP 208002</p>
              </div>
            </div>

            <div className="info-item group flex items-start gap-6">
              <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center group-hover:bg-gold-500/10 group-hover:border-gold-500/30 transition-all duration-300 shrink-0">
                <svg className="w-6 h-6 text-gold-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-text-primary mb-2">Email</h3>
                <p className="body-base text-steel-400 leading-relaxed hover:text-gold-400 transition-colors cursor-pointer">info@mgwbl.com</p>
              </div>
            </div>

            <div className="info-item group flex items-start gap-6">
              <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center group-hover:bg-gold-500/10 group-hover:border-gold-500/30 transition-all duration-300 shrink-0">
                <svg className="w-6 h-6 text-gold-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-text-primary mb-2">Phone</h3>
                <p className="body-base text-steel-400 leading-relaxed">+91 (XXX) XXX-XXXX</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
