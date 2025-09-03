'use client';
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const SectionIntro = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const animationRef = useRef<number | null>(null);

  // Custom scroll handling with progressive acceleration
  useEffect(() => {
    let accumulatedScroll = 0;
    const maxScroll = 2000;
    let lastScrollTime = Date.now();
    let velocity = 0;

    const animate = () => {
      const now = Date.now();
      const deltaTime = Math.min(50, now - lastScrollTime) / 1000;
      lastScrollTime = now;

      // Apply easing and velocity for smooth acceleration
      if (velocity !== 0) {
        accumulatedScroll += velocity * deltaTime * 500;
        accumulatedScroll = Math.max(0, Math.min(maxScroll, accumulatedScroll));
        velocity *= 0.9; // Friction

        if (Math.abs(velocity) < 0.1) velocity = 0;

        setScrollY(accumulatedScroll);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      // Progressive acceleration - slower at start, faster as you scroll more
      const accelerationFactor = 0.3 + (accumulatedScroll / maxScroll) * 0.7;
      const scrollAmount = e.deltaY * accelerationFactor * 0.4;

      velocity += scrollAmount * 0.01;
      velocity = Math.max(-2, Math.min(2, velocity)); // Limit max velocity
    };

    const container = containerRef.current;
    if (container) {
      document.body.style.overflow = 'hidden';
      container.addEventListener('wheel', handleWheel, { passive: false });

      // Start animation loop
      animationRef.current = requestAnimationFrame(animate);

      return () => {
        document.body.style.overflow = 'unset';
        container.removeEventListener('wheel', handleWheel);
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    }
  }, []);

  const progress = scrollY / 2000;

  // Section 1 zoom and fade effects
  const section1Scale = 1 + progress * 2;
  const section1Opacity = Math.max(0, 1 - progress * 1.5);

  // Section 2 reveal effects
  const section2Scale =
    progress < 0.3 ? 0.5 : 0.5 + ((progress - 0.3) / 0.7) * 0.6;
  const section2Opacity = progress < 0.3 ? 0 : (progress - 0.3) / 0.7;
  const section2Y = progress < 0.3 ? 50 : 50 - ((progress - 0.3) / 0.7) * 50;

  // Floating images with parallax effect
  const floatingImages = [
    {
      src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=160&h=240&fit=crop',
      className: 'top-40 left-0 w-40 h-60',
      depth: 0.8, // Slower (higher depth)
      moveX: -100,
      moveY: -150,
    },
    {
      src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=80&h=112&fit=crop',
      className: 'top-72 left-40 w-20 h-28',
      depth: 0.6, // Medium speed
      moveX: 80,
      moveY: -180,
    },
    {
      src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=192&h=128&fit=crop',
      className: 'bottom-36 left-40 w-48 h-20',
      depth: 0.3, // Faster (lower depth)
      moveX: -60,
      moveY: 100,
    },
    {
      src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=192&h=128&fit=crop',
      className: 'bottom-60 left-80 w-48 h-20',
      depth: 0.9, // Very slow (high depth)
      moveX: -60,
      moveY: 100,
    },
    {
      src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=112&h=80&fit=crop',
      className: 'bottom-32 left-1/3 w-28 h-10',
      depth: 0.5, // Medium speed
      moveX: 120,
      moveY: 80,
    },
    {
      src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=144&h=144&fit=crop',
      className: 'top-8 left-1/3 w-36 h-36',
      depth: 0.4, // Faster
      moveX: -140,
      moveY: -100,
    },
    {
      src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=96&h=96&fit=crop',
      className: 'top-20 left-1/2 w-24 h-24',
      depth: 0.7, // Slower
      moveX: 30,
      moveY: -250,
    },
    {
      src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=112&h=112&fit=crop',
      className: 'top-10 right-40 w-28 h-28',
      depth: 0.5, // Medium
      moveX: 180,
      moveY: -120,
    },
    {
      src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=80&h=80&fit=crop',
      className: 'top-0 right-10 w-20 h-20',
      depth: 0.8, // Slower
      moveX: 220,
      moveY: -200,
    },
    {
      src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=208&h=208&fit=crop',
      className: 'bottom-40 right-20 w-52 h-52',
      depth: 0.2, // Very fast
      moveX: 100,
      moveY: 140,
    },
    {
      src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=80&h=80&fit=crop',
      className: 'bottom-20 right-0 w-20 h-20',
      depth: 0.9, // Very slow
      moveX: 280,
      moveY: 120,
    },
    {
      src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=160&h=112&fit=crop',
      className: 'bottom-16 left-1/2 w-40 h-28',
      depth: 0.4, // Faster
      moveX: -80,
      moveY: 180,
    },
  ];

  // Text animation
  const textSpreadX = progress > 0.3 ? ((progress - 0.3) / 0.4) * 150 : 0;
  const textOpacity =
    progress > 0.6 ? Math.max(0, 1 - (progress - 0.6) / 0.2) : 1;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 cursor-grab active:cursor-grabbing"
    >
      <div className="relative w-full h-full overflow-hidden">
        {/* Section 1 - Intro with floating images */}
        <motion.div
          style={{
            scale: section1Scale,
            opacity: section1Opacity,
            transformOrigin: 'center center',
          }}
          className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-50"
        >
          {/* Floating images with parallax effect */}
          {floatingImages.map((img, i) => {
            // Simplified animation based on depth for parallax effect
            // Lower depth = faster movement, higher depth = slower movement
            const moveFactor = 1 - img.depth; // Invert depth for movement

            const imageScale = 1 + progress * 0.1 * moveFactor;
            const imageX = progress * img.moveX * moveFactor;
            const imageY = progress * img.moveY * moveFactor;
            const imageOpacity =
              progress < 0.7 ? 1 : Math.max(0, 1 - (progress - 0.7) / 0.3);

            return (
              <motion.div
                key={i}
                style={{
                  scale: imageScale,
                  x: imageX,
                  y: imageY,
                  opacity: imageOpacity,
                  zIndex: Math.round(img.depth * 10), // Higher depth = higher z-index (stays behind)
                }}
                className={`absolute ${img.className} transition-transform duration-75`}
              >
                <div className="w-full h-full relative">
                  <img
                    src={img.src}
                    className="w-full h-full object-cover rounded-md shadow-lg"
                    alt=""
                    loading="lazy"
                  />
                  <div
                    className="absolute inset-0 rounded-md border-2"
                    style={{
                      borderColor: `rgba(255, 255, 255, ${
                        0.3 - img.depth * 0.2
                      })`,
                    }}
                  />
                </div>
              </motion.div>
            );
          })}

          <motion.div
            style={{
              opacity: textOpacity,
              scale: 1 + progress * 0.3,
              y: -(progress * 30),
            }}
            className="relative text-4xl md:text-6xl font-semibold text-center max-w-3xl px-4 z-20"
          >
            <motion.div
              style={{
                x: -textSpreadX,
                opacity: 1 - progress * 1.2,
              }}
              className="inline-block drop-shadow-lg"
            >
              Real recommendations
            </motion.div>
            <br />
            <motion.div
              style={{
                x: textSpreadX,
                opacity: 1 - progress * 1.2,
              }}
              className="inline-block drop-shadow-lg"
            >
              by real people
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Section 2 - Emerges from within Section 1 */}
        <motion.div
          style={{
            scale: section2Scale,
            opacity: section2Opacity,
            y: section2Y,
            transformOrigin: 'center center',
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="relative w-full h-full">
            <img
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop"
              alt="Featured content"
              className="w-full h-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-6">
              <motion.h2
                style={{
                  y:
                    progress < 0.4
                      ? 30
                      : progress < 0.7
                      ? (1 - (progress - 0.4) / 0.3) * 30
                      : -20,
                  opacity:
                    progress < 0.4
                      ? 0
                      : progress < 0.6
                      ? (progress - 0.4) / 0.2
                      : 1,
                }}
                className="text-5xl md:text-7xl font-bold mb-6 text-center"
              >
                Discover
              </motion.h2>
              <motion.p
                style={{
                  y:
                    progress < 0.5
                      ? 30
                      : progress < 0.7
                      ? (1 - (progress - 0.5) / 0.2) * 30
                      : -10,
                  opacity:
                    progress < 0.5
                      ? 0
                      : progress < 0.7
                      ? (progress - 0.5) / 0.2
                      : 1,
                }}
                className="text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed text-center"
              >
                Authentic recommendations from real people who share your
                interests
              </motion.p>
              <motion.button
                style={{
                  y:
                    progress < 0.6
                      ? 30
                      : progress < 0.8
                      ? (1 - (progress - 0.6) / 0.2) * 30
                      : -10,
                  opacity:
                    progress < 0.6
                      ? 0
                      : progress < 0.8
                      ? (progress - 0.6) / 0.2
                      : 1,
                }}
                className="mt-8 px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-100 transition-colors"
                onClick={() => setScrollY(0)}
              >
                Get Started
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Progress indicator */}
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
          <div className="flex flex-col items-center gap-2">
            <div className="w-1 h-20 bg-white/30 rounded-full overflow-hidden">
              <div
                className="w-full bg-white rounded-full transition-all duration-300"
                style={{ height: `${progress * 100}%` }}
              />
            </div>
            <p className="text-white text-xs bg-black/50 px-2 py-1 rounded">
              Scroll to explore
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SectionIntro;
