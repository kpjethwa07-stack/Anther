import React, { useEffect, useState, useCallback } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';

export const MagneticCursor: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(true); // default hidden
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 30, stiffness: 400, mass: 0.3, restDelta: 0.001 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only enable on non-touch, wide screens
    const mq = window.matchMedia('(pointer: fine) and (min-width: 768px)');
    setIsMobile(!mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(!e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const moveCursor = useCallback((e: MouseEvent) => {
    cursorX.set(e.clientX);
    cursorY.set(e.clientY);
  }, [cursorX, cursorY]);

  const handleHover = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    setIsHovering(!!target.closest('button, a, .interactive, .group'));
  }, []);

  useEffect(() => {
    if (isMobile) return;
    window.addEventListener('mousemove', moveCursor, { passive: true });
    window.addEventListener('mouseover', handleHover, { passive: true });
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleHover);
    };
  }, [isMobile, moveCursor, handleHover]);

  if (isMobile) return null;

  return (
    <motion.div
      style={{ translateX: cursorXSpring, translateY: cursorYSpring, left: -16, top: -16 }}
      animate={{
        scale: isHovering ? 2.5 : 1,
        backgroundColor: isHovering ? 'rgba(255, 255, 255, 0.12)' : 'rgba(245, 158, 11, 0.4)',
        borderColor: isHovering ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.2)',
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className="fixed pointer-events-none z-[9999] w-8 h-8 rounded-full border mix-blend-difference transform-gpu will-change-transform"
    />
  );
};
