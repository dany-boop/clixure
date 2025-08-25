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

  const arcText = [
    { text: 'Light', key: 'light' },
    { text: 'Dark', key: 'dark' },
  ];

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
    <div
      className="
      fixed z-30 flex flex-col items-center gap-10 lg:gap-20
      left-0 bottom-5             /* 📱 Mobile: bottom-left */
      md:top-1/2 md:-translate-y-1/2 md:left-0 md:bottom-auto /* 💻 Desktop: vertical center left */
    "
    >
      {/* Theme Switch */}
      <motion.button
        onClick={toggleTheme}
        className=" relative flex items-center justify-center w-16 h-16 rounded-full "
        whileHover={{ scale: 1.05, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle theme"
      >
        {/* Center Icon */}
        <motion.div
          className="cursor-target flex items-center justify-center w-8 h-8 rounded-full "
          animate={{ rotate: isDark ? 360 : 0 }}
          transition={{ duration: 0.5 }}
        >
          {isDark ? (
            <Icon icon="radix-icons:moon" className="text-amber-500 text-lg" />
          ) : (
            <Icon
              icon="solar:sun-line-duotone"
              className="text-amber-500 text-lg"
            />
          )}
        </motion.div>

        {/* Left Arc Text - Both Light and Dark */}
        <svg
          viewBox="0 0 200 200"
          className="absolute w-[140%] h-[140%] -rotate-180 -translate-x-1"
        >
          <path
            id="arcLeft"
            d="M 100, 100
               m -50, 0
               a 50,50 0 1,1 100,0
               a 50,50 0 1,1 -100,0"
            fill="transparent"
          />

          {/* Light Text with Animation */}
          <motion.text
            className="text-[1.5rem] uppercase tracking-widest"
            style={{ fill: 'currentColor' }}
            initial={false}
            animate={{
              opacity: !isDark ? 1 : 0.5,
              fontWeight: !isDark ? 'bold' : 'normal',
              x: !isDark ? 0 : -5,
            }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <textPath href="#arcLeft" startOffset="35%" textAnchor="middle">
              Light
            </textPath>
          </motion.text>

          {/* Dark Text with Animation */}
          <motion.text
            className="text-[1.5rem] uppercase tracking-widest"
            style={{ fill: 'currentColor' }}
            initial={false}
            animate={{
              opacity: isDark ? 1 : 0.5,
              fontWeight: isDark ? 'bold' : 'normal',
              x: isDark ? 0 : 5,
            }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <textPath href="#arcLeft" startOffset="65%" textAnchor="middle">
              Dark
            </textPath>
          </motion.text>
        </svg>
      </motion.button>

      {/* Scroll To Top with Progress */}
      <motion.div
        className="cursor-target-big flex flex-row-reverse items-center md:gap-5 lg:mt-10 -rotate-90"
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

        {/* Text */}
        <motion.p
          onClick={scrollToTop}
          className="ml-2 font-medium text-sm cursor-pointer select-none bg-clip-text text-transparent hidden sm:block"
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
