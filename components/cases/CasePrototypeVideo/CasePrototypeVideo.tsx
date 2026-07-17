'use client';

import { useEffect, useRef, useState } from 'react';
import { assets } from '@/lib/assets';
import styles from './CasePrototypeVideo.module.css';

type CasePrototypeVideoProps = {
  src: string;
  alt: string;
  poster?: string;
  kind?: 'video' | 'image';
};

export default function CasePrototypeVideo({
  src,
  alt,
  poster,
  kind = 'video',
}: CasePrototypeVideoProps) {
  const isImage = kind === 'image';
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const userPausedRef = useRef(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isImage) return;

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
  }, [src, isImage]);

  useEffect(() => {
    if (isImage) return;
    const video = videoRef.current;
    if (!video) return;

    let rafId = 0;

    const tick = () => {
      if (video.duration && !Number.isNaN(video.duration)) {
        setProgress(video.currentTime / video.duration);
      }
      rafId = requestAnimationFrame(tick);
    };

    const start = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(tick);
    };

    const stop = () => {
      cancelAnimationFrame(rafId);
      rafId = 0;
      if (video.duration && !Number.isNaN(video.duration)) {
        setProgress(video.currentTime / video.duration);
      }
    };

    const onPlay = () => start();
    const onPause = () => stop();
    const onEnded = () => stop();
    const onSeeked = () => {
      if (video.duration && !Number.isNaN(video.duration)) {
        setProgress(video.currentTime / video.duration);
      }
    };

    video.addEventListener('play', onPlay);
    video.addEventListener('pause', onPause);
    video.addEventListener('ended', onEnded);
    video.addEventListener('seeked', onSeeked);
    video.addEventListener('loadedmetadata', onSeeked);

    if (!video.paused) start();

    return () => {
      cancelAnimationFrame(rafId);
      video.removeEventListener('play', onPlay);
      video.removeEventListener('pause', onPause);
      video.removeEventListener('ended', onEnded);
      video.removeEventListener('seeked', onSeeked);
      video.removeEventListener('loadedmetadata', onSeeked);
    };
  }, [src, isImage]);

  async function togglePlayback() {
    if (isImage) return;
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

  function seekTo(event: React.MouseEvent<HTMLDivElement>) {
    if (isImage) return;
    const video = videoRef.current;
    if (!video || !video.duration) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const ratio = Math.min(
      1,
      Math.max(0, (event.clientX - rect.left) / rect.width),
    );
    video.currentTime = ratio * video.duration;
    setProgress(ratio);
  }

  return (
    <div ref={rootRef} className={styles.wrap}>
      <div
        className={`${styles.device}${isImage ? ` ${styles.deviceStatic}` : ''}`}
        role={isImage ? undefined : 'button'}
        tabIndex={isImage ? undefined : 0}
        aria-label={
          isImage
            ? undefined
            : `${alt}. Нажмите, чтобы воспроизвести или поставить на паузу`
        }
        onClick={isImage ? undefined : () => void togglePlayback()}
        onKeyDown={
          isImage
            ? undefined
            : (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  void togglePlayback();
                }
              }
        }
      >
        <div className={styles.screenClip}>
          {isImage ? (
            <img
              className={styles.screen}
              src={src}
              alt={alt}
              width={393}
              height={852}
              draggable={false}
            />
          ) : (
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
          )}
        </div>
        <img
          className={styles.bezel}
          src={assets.caseTBank.phoneBezelOverlay}
          alt=""
          aria-hidden
          draggable={false}
        />
      </div>

      {!isImage && (
        <div
          className={styles.progress}
          role="progressbar"
          aria-label="Прогресс воспроизведения"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress * 100)}
          onClick={(event) => {
            event.stopPropagation();
            seekTo(event);
          }}
        >
          <div
            className={styles.progressFill}
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      )}
    </div>
  );
}
