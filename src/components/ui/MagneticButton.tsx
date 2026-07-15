'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Link from 'next/link';

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  href?: string;
}

export default function MagneticButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  href,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(false);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  useEffect(() => {
    setIsTouch(window.matchMedia('(pointer: coarse)').matches);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isTouch || !ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const clientX = e.clientX;
    const clientY = e.clientY;
    
    const left = rect.left;
    const top = rect.top;
    
    const xPos = (clientX - (left + width / 2)) * 0.2; // Max pull
    const yPos = (clientY - (top + height / 2)) * 0.2;
    
    x.set(xPos);
    y.set(yPos);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const variantClasses = {
    primary: 'bg-gold-500 text-primary-900 font-semibold hover:bg-gold-400 focus-visible:ring-gold-500',
    secondary: 'border border-gold-500 text-gold-500 bg-transparent hover:bg-gold-500/10 focus-visible:ring-gold-500',
    ghost: 'text-steel-300 hover:text-gold-500 bg-transparent focus-visible:ring-gold-500',
  };

  const sizeClasses = {
    sm: 'py-2 px-4 text-sm',
    md: 'py-3 px-6 text-base',
    lg: 'py-4 px-8 text-lg',
  };

  const baseClasses = `inline-flex items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-900 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  const MotionComponent = motion.div;

  const content = (
    <MotionComponent
      ref={ref}
      style={{ x: mouseXSpring, y: mouseYSpring }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.97 }}
      className="inline-block"
    >
      {href ? (
        <Link href={href} className={baseClasses} onClick={onClick}>
          {children}
        </Link>
      ) : (
        <button className={baseClasses} onClick={onClick}>
          {children}
        </button>
      )}
    </MotionComponent>
  );

  return content;
}
