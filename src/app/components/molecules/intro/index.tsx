'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function IntroAnimation({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showIntro, setShowIntro] = useState(true);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [showDot, setShowDot] = useState(false);

  useEffect(() => {
    if (showIntro) {
      // lock scroll + reset scroll position
      document.body.style.overflow = 'hidden';
      window.scrollTo(0, 0);

      const dotTimer = setTimeout(() => setShowDot(true), 2500);
      const introTimer = setTimeout(() => {
        setShowIntro(false);
        setHasPlayed(true);
        document.body.style.overflow = 'auto'; // restore scroll
      }, 6000);

      return () => {
        clearTimeout(dotTimer);
        clearTimeout(introTimer);
      };
    }
  }, [showIntro]);

  const letterVariant = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.4 },
    }),
  };

  const text = 'clixure'.split('');

  return (
    <div className="relative w-full min-h-screen">
      <AnimatePresence>
        {!hasPlayed && showIntro && (
          <motion.div
            key="intro"
            className="fixed inset-0 flex items-center justify-center bg-black z-[9999]" // FIXED not absolute
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: { duration: 0.8, ease: 'easeInOut' },
            }}
          >
            {/* Typing Text */}
            <h1 className="text-white text-6xl font-bold flex gap-[1px] relative">
              {text.map((char, i) => (
                <motion.span
                  key={i}
                  variants={letterVariant}
                  initial="hidden"
                  animate="visible"
                  custom={i}
                >
                  {char === 'i' ? (
                    <span className="relative inline-block">
                      i
                      {showDot && (
                        <motion.span
                          className="absolute bottom-[60%] left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white"
                          initial={{ scale: 0 }}
                          animate={{ scale: 200 }}
                          transition={{
                            duration: 2.5,
                            delay: 0.5,
                            ease: [0.83, 0, 0.17, 1],
                          }}
                          style={{ originX: '50%', originY: '50%' }}
                        />
                      )}
                    </span>
                  ) : (
                    char
                  )}
                </motion.span>
              ))}
            </h1>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main App Content */}
      <div className="w-full min-h-screen">{children}</div>
    </div>
  );
}
