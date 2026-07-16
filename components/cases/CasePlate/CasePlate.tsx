import type { ReactNode } from 'react';
import styles from './CasePlate.module.css';

type CasePlateProps = {
  label: string;
  children: ReactNode;
};

export default function CasePlate({ label, children }: CasePlateProps) {
  return (
    <div className={styles.plate}>
      <h3 className={styles.label}>{label}</h3>
      <div className={styles.body}>{children}</div>
    </div>
  );
}
