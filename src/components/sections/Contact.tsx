'use client';

import SectionHeading from '../ui/SectionHeading';
import GlassCard from '../ui/GlassCard';
import MagneticButton from '../ui/MagneticButton';
import { SectionProps } from '@/types';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

export default function Contact({ id, className = '' }: SectionProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#contact-container',
        start: 'top 80%',
      },
    });

    if (formRef.current) {
      const fields = formRef.current.querySelectorAll('.form-field');
      tl.fromTo(
        fields,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' }
      );
    }

    if (infoRef.current) {
      const items = infoRef.current.querySelectorAll('.info-item');
      tl.fromTo(
        items,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' },
        '-=0.4'
      );
    }

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section id={id} className={`section py-32 ${className}`}>
      <div className="max-w-7xl mx-auto" id="contact-container">
        <SectionHeading
          label="GET IN TOUCH"
          title="Contact Us"
        />

        <div className="grid md:grid-cols-2 gap-16 mt-16">
          {/* Form */}
          <GlassCard>
            <form ref={formRef} className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="form-field grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-steel-400 mb-2 uppercase tracking-wider">Name</label>
                  <input type="text" className="w-full bg-primary-700/50 border border-glass-border rounded-lg px-4 py-3 text-text-primary focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm text-steel-400 mb-2 uppercase tracking-wider">Email</label>
                  <input type="email" className="w-full bg-primary-700/50 border border-glass-border rounded-lg px-4 py-3 text-text-primary focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-all" />
                </div>
              </div>
              <div className="form-field">
                <label className="block text-sm text-steel-400 mb-2 uppercase tracking-wider">Company</label>
                <input type="text" className="w-full bg-primary-700/50 border border-glass-border rounded-lg px-4 py-3 text-text-primary focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-all" />
              </div>
              <div className="form-field">
                <label className="block text-sm text-steel-400 mb-2 uppercase tracking-wider">Inquiry Type</label>
                <select className="w-full bg-primary-700/50 border border-glass-border rounded-lg px-4 py-3 text-text-primary focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-all appearance-none">
                  <option className="bg-primary-800">General Inquiry</option>
                  <option className="bg-primary-800">Partnership</option>
                  <option className="bg-primary-800">Careers</option>
                  <option className="bg-primary-800">Media</option>
                </select>
              </div>
              <div className="form-field">
                <label className="block text-sm text-steel-400 mb-2 uppercase tracking-wider">Message</label>
                <textarea rows={4} className="w-full bg-primary-700/50 border border-glass-border rounded-lg px-4 py-3 text-text-primary focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-all resize-none"></textarea>
              </div>
              <div className="form-field pt-2">
                <MagneticButton className="w-full">
                  Send Message
                </MagneticButton>
              </div>
            </form>
          </GlassCard>

          {/* Contact Info */}
          <div ref={infoRef} className="flex flex-col justify-center space-y-10">
            <div className="info-item flex items-start gap-4">
              <div className="mt-1">
                <svg className="w-6 h-6 text-gold-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <h3 className="heading-3 text-text-primary">Manufacturing Plant</h3>
                <p className="body-base mt-2 text-steel-400">Unnao, Uttar Pradesh, India</p>
              </div>
            </div>

            <div className="info-item flex items-start gap-4">
              <div className="mt-1">
                <svg className="w-6 h-6 text-gold-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.242-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h3 className="heading-3 text-text-primary">Registered Office</h3>
                <p className="body-base mt-2 text-steel-400">2nd Floor, 7/22D Tilak Nagar<br/>Kanpur, UP 208002</p>
              </div>
            </div>

            <div className="info-item flex items-start gap-4">
              <div className="mt-1">
                <svg className="w-6 h-6 text-gold-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="heading-3 text-text-primary">Email</h3>
                <p className="body-base mt-2 text-steel-400">info@mgwbl.com</p>
              </div>
            </div>

            <div className="info-item flex items-start gap-4">
              <div className="mt-1">
                <svg className="w-6 h-6 text-gold-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <h3 className="heading-3 text-text-primary">Phone</h3>
                <p className="body-base mt-2 text-steel-400">+91 (XXX) XXX-XXXX</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
