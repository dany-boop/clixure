'use client';

import { menu } from '@/data/menu';
import { Icon } from '@iconify/react';
import { motion, useAnimation } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const sidebarVariants = {
  closed: { x: '-100%' },
  open: { x: 0 },
};

const menuContainerVariants = {
  open: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
  closed: {},
};

const menuItemVariants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: -20 },
};

const Header = () => {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [scrollingDown, setScrollingDown] = useState(false);
  const [scrollThreshold, setScrollThreshold] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const controls = useAnimation();

  // Scroll animation logic
  useEffect(() => {
    let lastScrollY = window.scrollY;
    const threshold = 400;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY;
      setScrollingDown(isScrollingDown);

      const pastThreshold = currentScrollY > threshold;
      setScrollThreshold(pastThreshold);
      setIsFixed(pastThreshold);

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (scrollThreshold) {
      controls.start({ y: 0 });
    } else {
      controls.start({
        y: scrollingDown ? -400 : 0,
        transition: { duration: 0.3, ease: 'easeInOut' },
      });
    }
  }, [scrollingDown, scrollThreshold, controls]);

  return (
    <>
      {/* Animated Navbar */}
      <motion.nav
        initial={{ y: 0 }}
        animate={controls}
        className={`z-[9999] ${
          isFixed ? 'fixed top-0 left-0 w-full px-40' : 'relative w-full'
        } bg-white/70 backdrop-blur-md py-3`}
      >
        <div className="mx-auto max-w-[1350px] px-5 sm:px-10 md:px-20  flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center gap-4 sm:gap-8 lg:gap-20">
            {/* Sidebar Toggle (Mobile) */}
            <button
              aria-label="Open menu"
              className="h-10 w-10 flex items-center justify-center bg-neutral-200 rounded-full sm:h-12 sm:w-12"
              onClick={() => setIsSidebarOpen(true)}
              type="button"
            >
              <Icon className="h-5 w-5 sm:h-6 sm:w-6" icon="ci:menu-alt-05" />
            </button>

            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" aria-label="Home">
                <Image
                  alt="Logo"
                  className="object-contain"
                  height={40}
                  src="/assets/cx-logo-notext.png"
                  width={100}
                />
              </Link>
            </div>
          </div>

          {/* CTA Button */}
          <button className="hidden sm:block bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition">
            Consult
          </button>
        </div>
      </motion.nav>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <motion.div
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/40 z-[9998]"
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          onClick={() => setIsSidebarOpen(false)}
          transition={{ duration: 0.25 }}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        animate={isSidebarOpen ? 'open' : 'closed'}
        className="fixed top-0 left-0 z-[9999] h-full w-full backdrop-blur-sm p-6 shadow-xl"
        initial="closed"
        variants={sidebarVariants}
      >
        {/* Sidebar Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button
            aria-label="Close menu"
            onClick={() => setIsSidebarOpen(false)}
            type="button"
          >
            <Icon className="h-6 w-6" icon="lucide:x" />
          </button>
        </div>

        {/* Sidebar Links */}
        <motion.div
          animate={isSidebarOpen ? 'open' : 'closed'}
          className="flex flex-col gap-4"
          initial="closed"
          variants={menuContainerVariants}
        >
          {menu.map((m) => {
            const isActive = pathname === m.href;
            return (
              <motion.div key={m.href} variants={menuItemVariants}>
                <Link
                  className={`block text-sm font-medium transition hover:text-[#3A69F5] ${
                    isActive ? 'text-blue-500' : 'text-gray-800'
                  }`}
                  href={m.href}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  {m.title}
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.aside>
    </>
  );
};

export default Header;
