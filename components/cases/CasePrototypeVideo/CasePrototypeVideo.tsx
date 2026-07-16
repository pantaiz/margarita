'use client';

import { useEffect, useRef } from 'react';
import { assets } from '@/lib/assets';
import styles from './CasePrototypeVideo.module.css';

type CasePrototypeVideoProps = {
  src: string;
  alt: string;
  poster?: string;
};

export default function CasePrototypeVideo({
  src,
  alt,
  poster,
}: CasePrototypeVideoProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  /** User paused while in view — skip autoplay until they leave and come back */
  const userPausedRef = useRef(false);

  useEffect(() => {
    const root = rootRef.current;
    const video = videoRef.current;
    if (!root || !video) return;

    const playNow = () => {
      if (userPausedRef.current) return;
      void video.play().catch(() => {
        /* browser may block autoplay — click still works */
      });
    };

    const pauseNow = () => {
      video.pause();
    };

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting) {
          if (reducedMotion) return;
          playNow();
        } else {
          userPausedRef.current = false;
          pauseNow();
        }
      },
      { threshold: 0.45, rootMargin: '0px' },
    );

    observer.observe(root);
    return () => {
      observer.disconnect();
    };
  }, [src]);

  async function togglePlayback() {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      userPausedRef.current = false;
      try {
        await video.play();
      } catch {
        /* ignore */
      }
    } else {
      userPausedRef.current = true;
      video.pause();
    }
  }

  return (
    <div ref={rootRef} className={styles.wrap}>
      <div
        className={styles.device}
        role="button"
        tabIndex={0}
        aria-label={`${alt}. Нажмите, чтобы воспроизвести или поставить на паузу`}
        onClick={togglePlayback}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            void togglePlayback();
          }
        }}
      >
        <video
          ref={videoRef}
          className={styles.screen}
          src={src}
          poster={poster}
          width={393}
          height={852}
          playsInline
          muted
          loop
          preload="metadata"
          aria-hidden
          controls={false}
        />
        <img
          className={styles.bezel}
          src={assets.caseTBank.phoneBezelOverlay}
          alt=""
          aria-hidden
          draggable={false}
        />
      </div>
    </div>
  );
}
