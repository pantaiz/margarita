'use client';

import { NAV_ITEMS } from '@/lib/constants';
import { useScrollDirection } from '@/hooks/useScrollDirection';
import NavButton from '@/components/ui/NavButton/NavButton';
import styles from './Header.module.css';

export default function Header() {
  const { isHidden } = useScrollDirection(80);

  return (
    <header
      className={`${styles.header} ${isHidden ? styles.headerHidden : ''}`}
    >
      <nav className={styles.nav} aria-label="Основная навигация">
        {NAV_ITEMS.map((item) => (
          <NavButton
            key={item.href}
            label={item.label}
            href={item.href}
            external={item.external}
          />
        ))}
      </nav>
    </header>
  );
}
