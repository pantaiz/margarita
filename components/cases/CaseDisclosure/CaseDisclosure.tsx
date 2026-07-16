'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import type { CaseDisclosureItem } from '@/lib/types';
import CaseOutlineButton from '@/components/cases/CaseOutlineButton/CaseOutlineButton';
import CaseRichText from '@/components/cases/CaseRichText/CaseRichText';
import { fixHangingPrepositions } from '@/lib/typography';
import styles from './CaseDisclosure.module.css';

type CaseDisclosureProps = {
  items: CaseDisclosureItem[];
};

export default function CaseDisclosure({ items }: CaseDisclosureProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const scrollY = useRef(0);

  const toggle = (id: string) => {
    scrollY.current = window.scrollY;
    setOpenId((prev) => (prev === id ? null : id));
  };

  useLayoutEffect(() => {
    window.scrollTo(0, scrollY.current);
  }, [openId]);

  return (
    <div className={styles.list}>
      {items.map((item) => {
        const isOpen = openId === item.id;
        const buttonLabel = isOpen ? 'скрыть' : 'подробнее';
        const ariaLabel = item.title
          ? `${buttonLabel}: ${item.title}`
          : buttonLabel;

        return (
          <article key={item.id} className={styles.item}>
            {item.title && (
              <h3 className={styles.title}>
                {fixHangingPrepositions(item.title)}
              </h3>
            )}
            {item.teaser && (
              <p className={styles.teaser}>
                {fixHangingPrepositions(item.teaser)}
              </p>
            )}

            <CaseOutlineButton
              className={styles.toggle}
              onClick={() => toggle(item.id)}
              aria-expanded={isOpen}
              aria-controls={`disclosure-${item.id}`}
              aria-label={ariaLabel}
            >
              {buttonLabel}
            </CaseOutlineButton>

            {isOpen && (
              <div
                id={`disclosure-${item.id}`}
                className={styles.content}
                role="region"
                aria-label={item.title ?? 'Подробнее'}
              >
                <CaseRichText blocks={item.content} />
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
}
