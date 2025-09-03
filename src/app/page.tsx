'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import MainLayout from './components/templates/main-layout';
import CircularText from './components/atoms/cutom/rounded-text';
import SectionIntro from './components/organisms/section-1';

export default function Home() {
  const thirdRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Add a small delay to make the state transition smoother
        requestAnimationFrame(() => {
          setInView(entry.isIntersecting);
        });
      },
      {
        threshold: 0.3,
        rootMargin: '50px 0px', // Add some margin to trigger earlier
      }
    );

    if (thirdRef.current) observer.observe(thirdRef.current);

    return () => {
      if (thirdRef.current) observer.unobserve(thirdRef.current);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: thirdRef,
    offset: ['start end', 'end start'],
  });

  // Smoother animation curves with more intermediate steps
  // Animation for the first circular text (top-left)
  const rotate1 = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [-180, -90, 0, 0, 90, 180]
  );

  const scale1 = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [0.3, 0.7, 1, 1, 0.7, 0.3]
  );

  const opacity1 = useTransform(
    scrollYProgress,
    [0, 0.15, 0.3, 0.7, 0.85, 1],
    [0, 0.5, 1, 1, 0.5, 0]
  );

  const x1 = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    ['-100%', '0%', '0%', '-100%']
  );

  const y1 = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    ['-100%', '0%', '0%', '-100%']
  );

  // Animation for the second circular text (bottom-right)
  const rotate2 = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [180, 90, 0, 0, -90, -180]
  );

  const scale2 = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [0.3, 0.7, 1, 1, 0.7, 0.3]
  );

  const opacity2 = useTransform(
    scrollYProgress,
    [0, 0.15, 0.3, 0.7, 0.85, 1],
    [0, 0.5, 1, 1, 0.5, 0]
  );

  const x2 = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    ['100%', '0%', '0%', '100%']
  );

  const y2 = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    ['100%', '0%', '0%', '100%']
  );

  return (
    <MainLayout>
      <div className="min-h-fit ">
        <SectionIntro />
      </div>

      {/* Wrap the target section in a container with ref */}
      <div ref={thirdRef}>
        <div className="min-h-screen bg-green-100 flex items-center justify-center">
          <h1 className="text-4xl">2</h1>
        </div>

        {/* Section that controls animation */}
        <div className="min-h-screen bg-blue-100 flex items-center justify-center">
          <h1 className="text-3xl font-bold">3 (controls CircularText)</h1>
        </div>
      </div>

      <div className="min-h-screen bg-yellow-100 flex items-center justify-center">
        <h1 className="text-4xl">4</h1>
      </div>

      {/* First CircularText with roll-in / roll-out from top-left */}
      <motion.div
        style={{
          opacity: opacity1,
          rotate: rotate1,
          scale: scale1,
          x: x1,
          y: y1,
        }}
        className="fixed inset-0 pointer-events-none z-[54] flex items-center justify-center"
      >
        <CircularText
          text="Digital • Clixure"
          show={inView}
          className="absolute -top-10 -left-5 text-orange-500 hidden lg:block"
        />
      </motion.div>

      {/* Second CircularText with roll-in / roll-out from bottom-right */}
      <motion.div
        style={{
          opacity: opacity2,
          rotate: rotate2,
          scale: scale2,
          x: x2,
          y: y2,
        }}
        className="fixed inset-0 pointer-events-none z-[54] flex items-center justify-center"
      >
        <CircularText
          text="Digital • Clixure"
          show={inView}
          className="absolute -bottom-10 -right-5 text-orange-500"
        />
      </motion.div>
    </MainLayout>
  );
}
