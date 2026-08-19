'use client';

import { useEffect, useRef, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import type { CaseLightboxCaption } from '@/lib/types';
import { useDragScroll } from '@/hooks/useDragScroll';
import styles from './CaseLightbox.module.css';

type CaseLightboxProps = {
  src: string;
  alt: string;
  onClose: () => void;
  captions?: CaseLightboxCaption[];
};

const emptySubscribe = () => () => {};

export default function CaseLightbox({
  src,
  alt,
  onClose,
  captions,
}: CaseLightboxProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
  useDragScroll(overlayRef, isClient);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  if (!isClient) return null;

  return createPortal(
    <div
      ref={overlayRef}
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      onClick={onClose}
    >
      <button
        type="button"
        className={styles.close}
        aria-label="Закрыть"
        data-no-drag
        onClick={(event) => {
          event.stopPropagation();
          onClose();
        }}
      >
        <svg
          className={styles.closeIcon}
          viewBox="0 0 16 16"
          width="16"
          height="16"
          aria-hidden="true"
        >
          <path
            d="M3 3l10 10M13 3L3 13"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>
      <div
        className={styles.stage}
        onClick={(event) => event.stopPropagation()}
      >
        {captions && captions.length > 0 ? (
          <div className={styles.captions}>
            {captions.map((caption) => (
              <p
                key={caption.label}
                className={styles.plaque}
                style={{
                  flexGrow: caption.flex,
                  flexShrink: 1,
                  flexBasis: 0,
                }}
              >
                {caption.label}
              </p>
            ))}
          </div>
        ) : null}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className={styles.image} src={src} alt={alt} />
      </div>
    </div>,
    document.body,
  );
}
