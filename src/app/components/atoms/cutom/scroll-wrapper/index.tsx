'use client';

import { useEffect } from 'react';
import { useScroll } from 'framer-motion';

export default function SmoothScrollWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { scrollY } = useScroll();

  useEffect(() => {
    const handler = () => {
      const sections = document.querySelectorAll<HTMLElement>('section');
      let closest: HTMLElement | null = null;
      let minDistance = Infinity;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const distance = Math.abs(rect.top);
        if (distance < minDistance) {
          minDistance = distance;
          closest = section;
        }
      });

      if (closest && minDistance < 150) {
        (closest as HTMLElement).scrollIntoView({ behavior: 'smooth' });
      }
    };

    window.addEventListener('scrollend', handler);
    return () => window.removeEventListener('scrollend', handler);
  }, [scrollY]);

  return <>{children}</>;
}
