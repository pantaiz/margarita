'use client';

import { useEffect, useRef, useState } from 'react';
import AppImage from '@/components/ui/AppImage/AppImage';
import { assets, paletteColors } from '@/lib/assets';
import styles from './DrawingPalette.module.css';

type DrawingPaletteProps = {
  activeColor: string;
  eraser: boolean;
  onSelectColor: (hex: string) => void;
  onToggleEraser: () => void;
  onClear: () => void;
};

const SCROLL_HIDE_DELAY = 180;

export default function DrawingPalette({
  activeColor,
  eraser,
  onSelectColor,
  onToggleEraser,
  onClear,
}: DrawingPaletteProps) {
  const [hintVisible, setHintVisible] = useState(true);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setHintVisible(false);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        setHintVisible(true);
      }, SCROLL_HIDE_DELAY);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  return (
    <div className={`${styles.dock} interactive`}>
      <p
        className={`${styles.hint}${hintVisible ? ` ${styles.hintVisible}` : ''}`}
        aria-hidden={!hintVisible}
      >
        Нарисуйте что-нибудь!
      </p>

      <div className={styles.bar}>
        <AppImage
          src={assets.palitra}
          alt=""
          fill
          sizes="420px"
          className={styles.barBg}
          unoptimized
        />
        <AppImage
          src={assets.palitraOverlay}
          alt=""
          fill
          sizes="420px"
          className={styles.barOverlay}
          unoptimized
        />

        <div className={styles.colors}>
          {paletteColors.map((c) => {
            const isActive = activeColor === c.hex && !eraser;
            return (
              <button
                key={c.id}
                type="button"
                className={styles.colorBtn}
                onClick={() => onSelectColor(c.hex)}
                aria-label={`Цвет ${c.id}`}
                aria-pressed={isActive}
              >
                <AppImage src={c.asset} alt="" width={48} height={48} />
                {isActive && (
                  <AppImage
                    src={assets.paletteCheck}
                    alt=""
                    width={24}
                    height={24}
                    className={styles.checkOverlay}
                  />
                )}
              </button>
            );
          })}
        </div>

        <div className={styles.tools}>
          <button
            type="button"
            className={styles.toolBtn}
            onClick={onToggleEraser}
            aria-label="Ластик"
            aria-pressed={eraser}
          >
            <AppImage src={assets.eraser} alt="" width={36} height={36} />
            {eraser && (
              <AppImage
                src={assets.paletteCheck}
                alt=""
                width={24}
                height={24}
                className={styles.checkEraser}
              />
            )}
          </button>
          <button
            type="button"
            className={styles.toolBtn}
            onClick={onClear}
            aria-label="Очистить рисунок"
          >
            <span className={styles.trash}>
              <AppImage
                src={assets.trashLid}
                alt=""
                width={24}
                height={6}
                className={styles.trashLid}
              />
              <AppImage
                src={assets.trashBody}
                alt=""
                width={17}
                height={22}
                className={styles.trashBody}
              />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
