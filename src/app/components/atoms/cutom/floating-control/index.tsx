'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';

const radius = 22;
const circumference = 2 * Math.PI * radius;

const FloatingVerticalControls = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const bottomOffset = 100;

  // Scroll progress and visibility logic
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollY = window.scrollY;
      const scroll = (scrollY / totalScroll) * 100;
      setScrollProgress(scroll);
      setIsVisible(scrollY > bottomOffset);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Load theme from localStorage or system
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else {
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      setIsDark(prefersDark);
      document.documentElement.classList.toggle('dark', prefersDark);
    }
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    document.documentElement.classList.toggle('dark', newDark);
    localStorage.setItem('theme', newDark ? 'dark' : 'light');
  };

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed top-1/2 left-0 transform -translate-y-1/2 z-30 flex flex-col items-center gap-20">
      {/* Theme Switch */}
      <motion.button
        onClick={toggleTheme}
        className="cursor-target relative w-20 h-10 bg-gray-200 dark:bg-gray-800 border rounded-full flex items-center px-1 rotate-90 cursor-pointer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          className="absolute top-1 left-1 w-8 h-8 rounded-full bg-white dark:bg-gray-700 flex items-center justify-center shadow-md"
          animate={{ x: isDark ? 40 : 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          {isDark ? (
            <Icon icon="radix-icons:moon" className="text-yellow-400" />
          ) : (
            <Icon icon="solar:sun-line-duotone" className="text-yellow-500" />
          )}
        </motion.div>
      </motion.button>

      {/* Scroll To Top with Progress */}
      <motion.div
        className="cursor-target-big bg-white dark:bg-gray-800 flex flex-row-reverse items-center gap-5 mt-10 -rotate-90"
        initial={false}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isVisible ? 1 : 0.5,
          pointerEvents: isVisible ? 'auto' : 'none',
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {/* Button */}
        <motion.button
          onClick={scrollToTop}
          className="relative w-12 h-12 shadow-lg rounded-full flex items-center justify-center border"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg className="absolute w-12 h-12 -rotate-90" viewBox="0 0 50 50">
            <circle
              className="text-gray-300 dark:text-gray-600"
              stroke="currentColor"
              strokeWidth="4"
              fill="transparent"
              r={radius}
              cx="25"
              cy="25"
            />
            <circle
              className="text-orange-500"
              stroke="currentColor"
              strokeWidth="4"
              fill="transparent"
              r={radius}
              cx="25"
              cy="25"
              strokeDasharray={circumference}
              strokeDashoffset={
                circumference - (scrollProgress / 100) * circumference
              }
            />
          </svg>
          <Icon
            icon="mdi:arrow-up"
            className="text-gray-700 dark:text-gray-200 rotate-90"
            width={20}
            height={20}
          />
        </motion.button>

        {/* Text (Gradient Fill Based on Progress) */}
        <motion.p
          onClick={scrollToTop}
          className="ml-2 font-medium text-sm cursor-pointer select-none bg-clip-text text-transparent"
          style={{
            backgroundImage: `linear-gradient(to left, orange ${scrollProgress}%, black ${scrollProgress}%)`,
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Scroll To Top
        </motion.p>
      </motion.div>
    </div>
  );
};

export default FloatingVerticalControls;
