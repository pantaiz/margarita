import type { ReactNode } from 'react';
import { fixHangingPrepositions } from '@/lib/typography';
import styles from './CasePlate.module.css';

type CasePlateProps = {
  label: string;
  children: ReactNode;
};

export default function CasePlate({ label, children }: CasePlateProps) {
  return (
    <div className={styles.plate}>
      <h3 className={styles.label}>{fixHangingPrepositions(label)}</h3>
      <div className={styles.body}>{children}</div>
    </div>
  );
}
