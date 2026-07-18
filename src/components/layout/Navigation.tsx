'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

import Image from 'next/image';

const NAV_LINKS = [
  { label: 'Company', href: '#company' },
  { label: 'Brewery', href: '#brewery' },
  { label: 'Infrastructure', href: '#infrastructure' },
  { label: 'Partnership', href: '#partnership' },
  { label: 'Sustainability', href: '#sustainability' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const lastScrollY = useRef(0);
  const progressBarRef = useRef<HTMLDivElement>(null);

  // Handle scroll to hide/show navigation
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Don't hide if menu is open
      if (mobileOpen) return;

      // Hide nav if scrolling down and past 100px
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      // Update background blur intensity based on scroll position
      if (navRef.current) {
        if (currentScrollY > 50) {
          navRef.current.classList.add('bg-black/60', 'backdrop-blur-xl', 'border-b', 'border-white/10');
          navRef.current.classList.remove('bg-transparent');
        } else {
          navRef.current.classList.add('bg-transparent');
          navRef.current.classList.remove('bg-black/60', 'backdrop-blur-xl', 'border-b', 'border-white/10');
        }
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileOpen]);

  /* ── Scroll progress bar via GSAP ── */
  useEffect(() => {
    gsap.to(progressBarRef.current, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
      },
    });
  }, []);

  /* ── Lock body scroll when mobile menu open ── */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  // Handle magnetic effect for links
  const handleMagnetic = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget;
    const boundingRect = el.getBoundingClientRect();
    const x = e.clientX - boundingRect.left - boundingRect.width / 2;
    const y = e.clientY - boundingRect.top - boundingRect.height / 2;

    gsap.to(el, {
      x: x * 0.4,
      y: y * 0.4,
      duration: 0.6,
      ease: 'power3.out',
    });
  }, []);

  const handleMagneticReset = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget;
    gsap.to(el, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.3)',
    });
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    
    const target = document.querySelector(href);
    if (target) {
      // Use GSAP for smooth scrolling
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: target, offsetY: 80 },
        ease: 'power3.inOut',
      });
    }
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-[2px] z-[60] pointer-events-none">
        <div
          ref={progressBarRef}
          className="h-full origin-left"
          style={{
            background: 'linear-gradient(90deg, var(--gold-500), var(--amber-400))',
            transform: 'scaleX(0)',
          }}
        />
      </div>

      <motion.nav
        ref={navRef}
        className="glass-nav fixed top-0 left-0 w-full z-50 px-[var(--section-padding-x)] transition-all duration-300"
        initial={{ y: 0 }}
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex items-center justify-between h-16 md:h-20 max-w-[1600px] mx-auto">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 group">
            <Image 
              src="/assets/logo.jpeg" 
              alt="MGWBL Logo" 
              width={40} 
              height={40} 
              className="rounded-full overflow-hidden object-cover transition-transform duration-500 group-hover:scale-110" 
            />
            <span className="text-gradient-gold font-bold text-xl tracking-tight hidden sm:block">MGWBL</span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="relative text-sm uppercase tracking-widest text-steel-400 hover:text-gold-500 transition-colors duration-300 py-1"
              >
                {link.label}
                <span
                  className="absolute bottom-0 left-0 w-full h-[1px] bg-gold-500 origin-left transition-transform duration-300 ease-[var(--ease-out-expo)]"
                  style={{ transform: 'scaleX(0)' }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = 'scaleX(1)';
                  }}
                />
                {/* Underline handled via group hover below */}
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gold-500 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </a>
            ))}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden flex flex-col justify-center items-center gap-[5px] w-10 h-10 z-[110]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            <motion.span
              className="block w-6 h-[2px] bg-foreground rounded-full"
              animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="block w-6 h-[2px] bg-foreground rounded-full"
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block w-6 h-[2px] bg-foreground rounded-full"
              animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-8"
            style={{ backgroundColor: 'rgba(5, 5, 5, 0.95)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                className="heading-2 text-foreground hover:text-gold-500 transition-colors"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: 0.1 + i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
