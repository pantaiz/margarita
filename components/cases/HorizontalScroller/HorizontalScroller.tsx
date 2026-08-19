'use client';

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import CaseImage from '@/components/cases/CaseImage/CaseImage';
import { useDragScroll } from '@/hooks/useDragScroll';
import { assets } from '@/lib/assets';
import styles from './HorizontalScroller.module.css';

type HorizontalScrollerProps = {
  children: ReactNode;
  className?: string;
  scrollerClassName?: string;
  controls?: boolean;
  plaque?: boolean;
};

export default function HorizontalScroller({
  children,
  className,
  scrollerClassName,
  controls = true,
  plaque = true,
}: HorizontalScrollerProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  useDragScroll(scrollerRef);
  const [overflowing, setOverflowing] = useState(false);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const update = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const hasOverflow = max > 4;
    setOverflowing(hasOverflow);
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft < max - 4);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    Array.from(el.children).forEach((child) => observer.observe(child));
    el.addEventListener('scroll', update, { passive: true });

    const images = el.querySelectorAll('img');
    images.forEach((image) => {
      if (!image.complete) image.addEventListener('load', update);
    });

    return () => {
      observer.disconnect();
      el.removeEventListener('scroll', update);
      images.forEach((image) => image.removeEventListener('load', update));
    };
  }, [update, children]);

  const scrollByDir = (dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = Math.max(240, Math.round(el.clientWidth * 0.62));
    el.scrollBy({ left: dir * amount, behavior: 'smooth' });
  };

  const showControls = controls && overflowing;

  return (
    <div className={`${styles.frame}${className ? ` ${className}` : ''}`}>
      <div className={styles.wrap}>
        <div
          className={`${plaque ? styles.wrapPlaque : styles.wrapPlain}`}
        >
        {showControls ? (
          <div className={styles.controls}>
            <button
              type="button"
              className={styles.nav}
              aria-label="Прокрутить назад"
              data-no-drag
              disabled={!canPrev}
              onClick={() => scrollByDir(-1)}
            >
              <CaseImage
                className={styles.icon}
                src={assets.caseTBank.arrowLeft}
                alt=""
                width={24}
                height={24}
              />
            </button>
            <button
              type="button"
              className={styles.nav}
              aria-label="Прокрутить вперёд"
              data-no-drag
              disabled={!canNext}
              onClick={() => scrollByDir(1)}
            >
              <CaseImage
                className={`${styles.icon} ${styles.iconRight}`}
                src={assets.caseTBank.arrowLeft}
                alt=""
                width={24}
                height={24}
              />
            </button>
          </div>
        ) : null}
        <div
          ref={scrollerRef}
          className={`${styles.scroller}${
            scrollerClassName ? ` ${scrollerClassName}` : ''
          }`}
          data-overflowing={overflowing ? 'true' : undefined}
        >
          {children}
        </div>
        </div>
      </div>
    </div>
  );
}
