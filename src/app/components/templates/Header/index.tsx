'use client';

import { menu } from '@/data/menu';
import {
  bottomSectionVariants,
  menuContainerVariants,
  menuItemVariants,
  sidebarVariants,
} from '@/lib/animation-variants';
import { Icon } from '@iconify/react';
import { motion, useAnimation } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

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
        className={`z-50 ${
          isFixed ? 'fixed top-0 left-0 w-full px-40' : 'relative w-full'
        } bg-white/70 backdrop-blur-md py-3`}
      >
        <div className="mx-auto max-w-[1350px] px-5 sm:px-10 md:px-20  flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center gap-4 sm:gap-8 lg:gap-10">
            {/* Sidebar Toggle (Mobile) */}
            <button
              aria-label="Open menu"
              className="h-10 w-10  cursor-target flex items-center justify-center bg-neutral-200 rounded-full sm:h-12 sm:w-12"
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
                  src="/cx-logo.png"
                  width={80}
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
          className="fixed inset-0 bg-black/50  z-[9998]"
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          onClick={() => setIsSidebarOpen(false)}
          transition={{ duration: 0.25 }}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        animate={isSidebarOpen ? 'open' : 'closed'}
        className="fixed top-0 left-0 z-[60] h-full w-full  p-6  backdrop-blur-sm text-white flex flex-col justify-between"
        initial="closed"
        variants={sidebarVariants}
      >
        {/* Top section */}
        <div>
          {/* Close button */}
          <div className="group flex w-fit justify-between rounded-full p-3 cursor-pointer items-start mb-20">
            <button
              aria-label="Close menu"
              onClick={() => setIsSidebarOpen(false)}
              type="button"
              className="group-hover:bg-black rounded-full p-3"
            >
              <Icon className="h-6 w-6 text-orange-500" icon="lucide:x" />
            </button>
          </div>
          {/* Menu Links with numbers */}
          <motion.div
            animate={isSidebarOpen ? 'open' : 'closed'}
            initial="closed"
            variants={menuContainerVariants}
            className="flex flex-col space-y-6"
          >
            {menu.map((m, i) => {
              const isActive = pathname === m.href;
              return (
                <motion.div key={m.href} variants={menuItemVariants}>
                  <Link
                    href={m.href}
                    onClick={() => setIsSidebarOpen(false)}
                    className={`flex items-baseline space-x-4 group`}
                  >
                    <span className="text-sm text-gray-400">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span
                      className={`text-3xl font-bold transition-colors ${
                        isActive
                          ? 'text-orange-500'
                          : 'text-white group-hover:text-orange-500'
                      }`}
                    >
                      {m.title}
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Bottom contact section */}
        <motion.div
          variants={bottomSectionVariants}
          animate={isSidebarOpen ? 'open' : 'closed'}
          initial="closed"
          className="grid grid-cols-2 gap-10 text-sm"
        >
          <div>
            <h3 className="font-semibold mb-2">Get In Touch</h3>
            <p className="text-gray-400">
              Djagad Land Singosari Kav 34, Kab Malang
            </p>
            <p className="text-gray-400">+62-821-3909-7937 Dirga Isman</p>
            <p className="text-gray-400">dirga@uraga.id</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Work Inquiries</h3>
            <p className="text-gray-400">dirga@uraga.id</p>
            <p className="text-gray-400">+62-821-3909-7937</p>
          </div>
        </motion.div>
      </motion.aside>
    </>
  );
};

export default Header;
