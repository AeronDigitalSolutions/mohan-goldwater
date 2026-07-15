'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isTouch, setIsTouch] = useState(true); // Default true to prevent flash
  const [isHovering, setIsHovering] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  /* Outer ring springs — softer follow */
  const ringX = useSpring(mouseX, { damping: 25, stiffness: 200 });
  const ringY = useSpring(mouseY, { damping: 25, stiffness: 200 });

  /* Inner dot springs — snappier */
  const dotX = useSpring(mouseX, { damping: 30, stiffness: 350 });
  const dotY = useSpring(mouseY, { damping: 30, stiffness: 350 });

  useEffect(() => {
    /* Detect touch device */
    const mq = window.matchMedia('(pointer: coarse)');
    setIsTouch(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsTouch(e.matches);
    mq.addEventListener('change', onChange);

    if (mq.matches) return () => mq.removeEventListener('change', onChange);

    /* Hide native cursor */
    document.body.style.cursor = 'none';

    /* Track mouse */
    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMove);

    /* Track interactive element hover */
    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [data-cursor]')) {
        setIsHovering(true);
      }
    };
    const handleOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [data-cursor]')) {
        setIsHovering(false);
      }
    };
    document.addEventListener('mouseover', handleOver);
    document.addEventListener('mouseout', handleOut);

    return () => {
      document.body.style.cursor = '';
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseover', handleOver);
      document.removeEventListener('mouseout', handleOut);
      mq.removeEventListener('change', onChange);
    };
  }, [mouseX, mouseY]);

  if (isTouch) return null;

  const ringSize = isHovering ? 60 : 40;

  return (
    <>
      {/* Outer Ring */}
      <motion.div
        className="pointer-events-none fixed z-[9999] rounded-full border-2"
        style={{
          x: ringX,
          y: ringY,
          width: ringSize,
          height: ringSize,
          borderColor: 'rgba(200, 130, 14, 0.5)',
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{ width: ringSize, height: ringSize }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      />

      {/* Inner Dot */}
      <motion.div
        className="pointer-events-none fixed z-[9999] rounded-full"
        style={{
          x: dotX,
          y: dotY,
          width: 8,
          height: 8,
          backgroundColor: 'var(--gold-500)',
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
    </>
  );
}
