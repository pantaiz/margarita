'use client';

import Link from 'next/link';
import CaseImage from '@/components/cases/CaseImage/CaseImage';
import CaseOutlineButton from '@/components/cases/CaseOutlineButton/CaseOutlineButton';
import { assets } from '@/lib/assets';
import type { CaseStudyMeta } from '@/lib/types';
import { fixHangingPrepositions } from '@/lib/typography';
import styles from './CaseHero.module.css';

const A = assets.caseTBank;

type CaseHeroCover = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

type CaseHeroProps = {
  title: string;
  meta?: CaseStudyMeta;
  cover?: CaseHeroCover;
  showDesignCta?: boolean;
  backLabel?: string;
};

export default function CaseHero({
  title,
  meta,
  cover,
  showDesignCta = false,
  backLabel = 'Назад',
}: CaseHeroProps) {
  const titleLines = title.split('\n');
  const alignStart = !meta;

  const HEADER_SCROLL_OFFSET = 100;

  const scrollToDesign = () => {
    const el = document.getElementById('design');
    if (!el) return;

    const top =
      window.scrollY + el.getBoundingClientRect().top - HEADER_SCROLL_OFFSET;

    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
  };

  return (
    <header className={styles.hero}>
      <div className={styles.top}>
        <div className={styles.introBlock}>
          <Link href="/" className={`${styles.backLink} interactive`}>
            <CaseImage src={A.arrowLeft} alt="" width={24} height={24} />
            <span>{backLabel}</span>
          </Link>

          <div
            className={`${styles.titleBlock}${alignStart ? ` ${styles.titleBlockStart}` : ''}`}
          >
            <h1 className={styles.title}>
              {titleLines.map((line, i) => (
                <span key={line}>
                  {fixHangingPrepositions(line)}
                  {i < titleLines.length - 1 && <br />}
                </span>
              ))}
            </h1>

            {meta ? (
              <div className={styles.meta}>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Роль</span>
                  <span className={styles.metaValue}>{meta.role}</span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Платформа</span>
                  <span className={styles.metaValue}>{meta.platform}</span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Год</span>
                  <span className={styles.metaValue}>{meta.year}</span>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        {showDesignCta ? (
          <CaseOutlineButton className={styles.cta} onClick={scrollToDesign}>
            <span>Сразу к дизайну</span>
            <CaseImage src={A.arrowDown} alt="" width={24} height={24} />
          </CaseOutlineButton>
        ) : null}
      </div>

      {cover ? (
        <div className={styles.coverWrap}>
          <CaseImage
            src={cover.src}
            alt={cover.alt}
            className={styles.coverImage}
            width={cover.width ?? 1200}
            height={cover.height ?? 711}
            priority
          />
        </div>
      ) : null}
    </header>
  );
}
