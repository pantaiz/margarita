'use client';

import Link from 'next/link';
import CaseImage from '@/components/cases/CaseImage/CaseImage';
import CaseOutlineButton from '@/components/cases/CaseOutlineButton/CaseOutlineButton';
import { assets } from '@/lib/assets';
import type { CaseStudyMeta } from '@/lib/types';
import { fixHangingPrepositions } from '@/lib/typography';
import styles from './CaseHero.module.css';

const A = assets.caseTBank;

type CaseHeroProps = {
  title: string;
  meta: CaseStudyMeta;
};

export default function CaseHero({ title, meta }: CaseHeroProps) {
  const titleLines = title.split('\n');

  const scrollToDesign = () => {
    document.getElementById('design')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className={styles.hero}>
      <div className={styles.top}>
        <div className={styles.introBlock}>
          <Link href="/" className={`${styles.backLink} interactive`}>
            <CaseImage src={A.arrowLeft} alt="" width={24} height={24} />
            <span>Назад</span>
          </Link>

          <div className={styles.titleBlock}>
            <h1 className={styles.title}>
              {titleLines.map((line, i) => (
                <span key={line}>
                  {fixHangingPrepositions(line)}
                  {i < titleLines.length - 1 && <br />}
                </span>
              ))}
            </h1>

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
          </div>
        </div>

        <CaseOutlineButton className={styles.cta} onClick={scrollToDesign}>
          <span>Сразу к дизайну</span>
          <CaseImage src={A.arrowDown} alt="" width={24} height={24} />
        </CaseOutlineButton>
      </div>

      <div className={styles.coverWrap}>
        <CaseImage
          src={A.heroCover}
          alt="Мокапы экранов доставки карты роботом в приложении Т-Банка"
          className={styles.coverImage}
          width={1080}
          height={640}
          priority
        />
      </div>
    </header>
  );
}
