'use client';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import React, { useEffect, useState } from 'react';

const Cursor = () => {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const trailX = useSpring(cursorX, { stiffness: 500, damping: 30, mass: 0.5 });
  const trailY = useSpring(cursorY, { stiffness: 500, damping: 30, mass: 0.5 });

  const [hoveringTarget, setHoveringTarget] = useState(false);
  const [hoveringBig, setHoveringBig] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 8);
      cursorY.set(e.clientY - 8);
    };

    const normalTargets = document.querySelectorAll('.cursor-target');
    const bigTargets = document.querySelectorAll('.cursor-target-big');

    const handleEnterNormal = (e: Event) => {
      (e.currentTarget as HTMLElement).classList.add('cursor-highlight');
      setHoveringTarget(true);
    };
    const handleLeaveNormal = (e: Event) => {
      (e.currentTarget as HTMLElement).classList.remove('cursor-highlight');
      setHoveringTarget(false);
    };

    const handleEnterBig = () => setHoveringBig(true);
    const handleLeaveBig = () => setHoveringBig(false);

    normalTargets.forEach((el) => {
      el.addEventListener('mouseenter', handleEnterNormal);
      el.addEventListener('mouseleave', handleLeaveNormal);
    });

    bigTargets.forEach((el) => {
      el.addEventListener('mouseenter', handleEnterBig);
      el.addEventListener('mouseleave', handleLeaveBig);
    });

    window.addEventListener('mousemove', moveCursor);

    return () => {
      window.removeEventListener('mousemove', moveCursor);

      normalTargets.forEach((el) => {
        el.removeEventListener('mouseenter', handleEnterNormal);
        el.removeEventListener('mouseleave', handleLeaveNormal);
      });
      bigTargets.forEach((el) => {
        el.removeEventListener('mouseenter', handleEnterBig);
        el.removeEventListener('mouseleave', handleLeaveBig);
      });
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Inner Dot (can grow on big target) */}
      <motion.div
        className="hidden lg:block fixed top-0 left-0 w-4 h-4 rounded-full bg-amber-700 pointer-events-none z-[100]"
        style={{ x: cursorX, y: cursorY }}
        animate={{
          scale: hoveringBig ? 2 : 1, // Inner dot grows on big target
          transition: { type: 'spring', stiffness: 300, damping: 20 },
        }}
      />

      {/* Outer Circle (slow shrink on normal target hover) */}
      <motion.div
        className="hidden lg:block fixed -top-2 -left-2 w-8 h-8 rounded-full border border-amber-700 pointer-events-none z-[100]"
        style={{ x: trailX, y: trailY }}
        animate={{
          scale: hoveringTarget ? 0 : 1,
          opacity: hoveringTarget ? 0 : 1,
          transition: {
            duration: 0.5, // Slower shrinking animation
            ease: [0.25, 0.1, 0.25, 1],
          },
        }}
      />
    </>
  );
};

export default Cursor;
