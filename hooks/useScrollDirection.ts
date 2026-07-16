'use client';

import { useEffect, useState } from 'react';

type ScrollDirection = 'up' | 'down';

export function useScrollDirection(threshold = 80): {
  direction: ScrollDirection;
  isHidden: boolean;
} {
  const [direction, setDirection] = useState<ScrollDirection>('up');
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastY;

      if (Math.abs(delta) < 5) return;

      const nextDirection: ScrollDirection = delta > 0 ? 'down' : 'up';
      setDirection(nextDirection);
      setIsHidden(nextDirection === 'down' && currentY > threshold);
      lastY = currentY;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return { direction, isHidden };
}
