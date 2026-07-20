'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function ThemeToggle() {
  const [isLight, setIsLight] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check initial state from html class
    setIsLight(document.documentElement.classList.contains('light'));
  }, []);

  const toggleTheme = () => {
    const newThemeLight = !isLight;
    setIsLight(newThemeLight);

    if (newThemeLight) {
      document.documentElement.classList.add('light');
      localStorage.setItem('mgwbl-theme', 'light');
      const meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute('content', '#ffffff');
    } else {
      document.documentElement.classList.remove('light');
      localStorage.setItem('mgwbl-theme', 'dark');
      const meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute('content', '#050505');
    }
  };

  if (!mounted) {
    return <div className="w-10 h-10" />; // Placeholder to avoid layout shift
  }

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/10 transition-colors duration-300 group z-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
      aria-label={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      <div 
        className="relative w-5 h-5 overflow-hidden group-hover:text-gold-500 transition-colors"
        style={{ color: 'var(--nav-text)' }}
      >
        <motion.div
          initial={false}
          animate={{ y: isLight ? -24 : 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 flex flex-col items-center"
        >
          {/* Moon Icon (visible in dark mode) */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5 min-h-[20px] mb-1"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
          
          {/* Sun Icon (visible in light mode) */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5 min-h-[20px]"
          >
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
        </motion.div>
      </div>
    </button>
  );
}
