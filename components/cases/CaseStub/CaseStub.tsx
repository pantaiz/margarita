import Link from 'next/link';
import type { CaseStudy } from '@/lib/types';
import styles from './CaseStub.module.css';

type CaseStubProps = {
  caseStudy: CaseStudy;
};

export default function CaseStub({ caseStudy }: CaseStubProps) {
  const titleLines = caseStudy.title.split('\n');

  return (
    <div className={styles.stub}>
      <h1 className={styles.title}>
        {titleLines.map((line, i) => (
          <span key={line}>
            {line}
            {i < titleLines.length - 1 && <br />}
          </span>
        ))}
      </h1>
      <p className={styles.message}>Страница в разработке</p>
      <Link href="/" className={`${styles.backLink} interactive`}>
        ← На главную
      </Link>
    </div>
  );
}
