import type { ReactNode } from 'react';
import styles from './CaseSection.module.css';

type CaseSectionProps = {
  label: string;
  index: number;
  id?: string;
  children: ReactNode;
};

export default function CaseSection({ label, index, id, children }: CaseSectionProps) {
  const indexLabel = String(index).padStart(2, '0');

  return (
    <section
      id={id}
      className={styles.section}
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      <div className={styles.header}>
        <span className={styles.index} aria-hidden="true">
          {indexLabel}
        </span>
        <h2 className={styles.label}>{label}</h2>
      </div>
      <div className={styles.body}>{children}</div>
    </section>
  );
}
