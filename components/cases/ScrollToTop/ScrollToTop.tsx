'use client';

import { useEffect, useState } from 'react';
import CaseImage from '@/components/cases/CaseImage/CaseImage';
import { assets } from '@/lib/assets';
import styles from './ScrollToTop.module.css';

const SCROLL_THRESHOLD = 300;

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > SCROLL_THRESHOLD);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      type="button"
      className={`${styles.button} interactive${visible ? ` ${styles.visible}` : ''}`}
      onClick={scrollToTop}
      aria-label="Наверх"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
    >
      <CaseImage
        src={assets.caseTBank.arrowUp}
        alt=""
        width={24}
        height={24}
      />
    </button>
  );
}
