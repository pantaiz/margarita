'use client';

import styles from './MorphLoader.module.css';

type MorphLoaderProps = {
  className?: string;
};

export default function MorphLoader({ className }: MorphLoaderProps) {
  return (
    <div
      className={`${styles.root}${className ? ` ${className}` : ''}`}
      aria-hidden
    >
      <div className={styles.loader} />
    </div>
  );
}
