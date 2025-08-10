import { Variants } from 'framer-motion';

// Easing array equivalent to "easeInOut"
const easeInOutCubic: [number, number, number, number] = [0.42, 0, 0.58, 1];

export const sidebarVariants: Variants = {
  closed: {
    x: '-100%' as any, // cast to bypass TS strictness
    opacity: 0,
    transition: { duration: 0.3, ease: easeInOutCubic },
  },
  open: {
    x: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 80, damping: 18 },
  },
};

export const menuContainerVariants: Variants = {
  closed: { opacity: 0 },
  open: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

export const menuItemVariants: Variants = {
  closed: { opacity: 0, x: -30 },
  open: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', stiffness: 100, damping: 14 },
  },
};

export const bottomSectionVariants: Variants = {
  closed: { opacity: 0, y: 20 },
  open: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.5, duration: 0.4, ease: easeInOutCubic },
  },
};
