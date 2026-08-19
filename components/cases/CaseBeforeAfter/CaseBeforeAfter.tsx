import CaseImage from '@/components/cases/CaseImage/CaseImage';
import styles from './CaseBeforeAfter.module.css';

type CaseBeforeAfterProps = {
  before: { src: string; alt: string };
  after: { src: string; alt: string };
};

export default function CaseBeforeAfter({ before, after }: CaseBeforeAfterProps) {
  return (
    <div className={styles.frame}>
      <figure className={styles.column}>
        <figcaption className={styles.label}>Было</figcaption>
        <CaseImage
          className={styles.image}
          src={before.src}
          alt={before.alt}
        />
      </figure>
      <figure className={styles.column}>
        <figcaption className={styles.label}>Стало</figcaption>
        <CaseImage
          className={styles.image}
          src={after.src}
          alt={after.alt}
        />
      </figure>
    </div>
  );
}
