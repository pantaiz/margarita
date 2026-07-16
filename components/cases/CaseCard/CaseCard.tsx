import Link from 'next/link';
import AppImage from '@/components/ui/AppImage/AppImage';
import type { CaseStudy } from '@/lib/types';
import { assets } from '@/lib/assets';
import Chip from '@/components/ui/Chip/Chip';
import Sticker from '@/components/cases/Sticker/Sticker';
import styles from './CaseCard.module.css';

type CaseCardProps = {
  caseStudy: CaseStudy;
};

export default function CaseCard({ caseStudy }: CaseCardProps) {
  const titleLines = caseStudy.title.split('\n');

  const content = (
    <>
      <div className={styles.cardFon} aria-hidden="true">
        <AppImage
          src={assets.cardBg}
          alt=""
          fill
          sizes="1080px"
          className={styles.cardFonImg}
          unoptimized
        />
      </div>

      <div className={styles.clip}>
        <AppImage src={assets.paperclip} alt="" width={68} height={124} unoptimized />
      </div>

      <div className={styles.inner}>
        <div className={styles.info}>
          <div className={styles.text}>
            <h2 className={styles.title}>
              {titleLines.map((line, i) => (
                <span key={`${line}-${i}`}>
                  {line}
                  {i < titleLines.length - 1 && <br />}
                </span>
              ))}
            </h2>
            <p className={styles.description}>{caseStudy.description}</p>
          </div>
          <div className={styles.tags}>
            {caseStudy.tags.map((tag) => (
              <Chip key={tag.label} label={tag.label} variant={tag.variant} />
            ))}
          </div>
        </div>

        <div className={styles.cover}>
          {caseStudy.coverSrc && (
            <AppImage
              src={caseStudy.coverSrc}
              alt=""
              fill
              sizes="492px"
              className={styles.coverImage}
              unoptimized
            />
          )}
          {caseStudy.inProgress && (
            <div className={styles.stickerWrap}>
              <Sticker />
            </div>
          )}
        </div>
      </div>
    </>
  );

  if (caseStudy.inProgress) {
    return (
      <div className={`${styles.card} ${styles.cardStatic} interactive`}>
        {content}
      </div>
    );
  }

  return (
    <Link
      href={`/cases/${caseStudy.slug}`}
      className={`${styles.card} interactive`}
    >
      {content}
    </Link>
  );
}
