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
  const [hovered, setHovered] = useState(false);
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
          isFixed ? 'fixed top-0 left-0 w-full' : 'relative w-full'
        }  py-3`}
      >
        <div
          className={`mx-auto lg:max-w-[1350px]  sm:px-10  ${
            isFixed ? ' md:pr-0' : ' md:pr-0'
          } flex items-center justify-between`}
        >
          {/* Left Section */}
          <div className="flex items-center gap-3 sm:gap-6 lg:gap-10">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link
                href="/"
                aria-label="Home"
                className="flex items-center gap-2"
              >
                <div className="relative w-10 h-10 md:w-14 md:h-14">
                  <Image
                    alt="Logo"
                    src="/cx-logo.png"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-col leading-none">
                  <h1 className="text-orange-500 text-2xl font-semibold">
                    clixure
                  </h1>
                  <p className="text-sm -mt-1 font-semibold">Digital</p>
                </div>
              </Link>
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex cursor-target items-center  p-3 rounded-full bg-white/50 dark:bg-neutral-950/70 backdrop-blur-md">
            {/* Animated container so text moves smoothly */}
            <motion.h1
              animate={{ marginRight: hovered ? 12 : 5 }} // mr-6 = 24px, mr-3 = 12px
              className="font-semibold"
            >
              Menu
            </motion.h1>

            <motion.button
              onHoverStart={() => setHovered(true)}
              onHoverEnd={() => setHovered(false)}
              initial={{ scale: 0.5 }}
              whileHover={{ scale: 1 }}
              onClick={() => setIsSidebarOpen(true)}
              className="flex items-center justify-center rounded-full bg-orange-500 h-10 w-10"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={
                  hovered ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }
                }
                transition={{ duration: 0.3 }}
              >
                <Icon icon="ci:menu-alt-05" className="w-6 h-6 text-white" />
              </motion.div>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <motion.div
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 z-[51]"
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          onClick={() => setIsSidebarOpen(false)}
          transition={{ duration: 0.25 }}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        animate={isSidebarOpen ? 'open' : 'closed'}
        className="fixed top-0 left-0 z-[60] h-full w-full  p-6 backdrop-blur-sm text-white flex flex-col justify-between"
        initial="closed"
        variants={sidebarVariants}
      >
        {/* Top section */}
        <div>
          {/* Close button */}
          <div className=" flex w-fit justify-between rounded-full p-3 cursor-pointer items-start mb-20">
            <button
              onClick={() => setIsSidebarOpen(false)}
              type="button"
              className="cursor-target rounded-full p-3 hover:bg-neutral-100/30 dark:hover:bg-neutral-900"
            >
              <Icon className="h-6 w-6 text-orange-500" icon="lucide:x" />
            </button>
          </div>
          {/* Menu Links with numbers */}
          <motion.div
            animate={isSidebarOpen ? 'open' : 'closed'}
            initial="closed"
            variants={menuContainerVariants}
            className="flex flex-col space-y-6 ms-20"
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
