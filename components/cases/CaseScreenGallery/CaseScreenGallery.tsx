'use client';

import { useCallback, useState } from 'react';
import CaseImage from '@/components/cases/CaseImage/CaseImage';
import CaseLightbox from '@/components/cases/CaseLightbox/CaseLightbox';
import type { CaseGalleryItem } from '@/lib/types';
import styles from './CaseScreenGallery.module.css';

export type { CaseGalleryItem };

type CaseScreenGalleryProps = {
  items?: CaseGalleryItem[];
  groups?: { items: CaseGalleryItem[] }[];
  layout?: 'phones' | 'boards';
};

export default function CaseScreenGallery({
  items,
  groups,
  layout = 'phones',
}: CaseScreenGalleryProps) {
  const [active, setActive] = useState<CaseGalleryItem | null>(null);
  const closeLightbox = useCallback(() => setActive(null), []);
  const isBoards = layout === 'boards';
  const rows =
    groups && groups.length > 0
      ? groups
      : items && items.length > 0
        ? [{ items }]
        : [];

  return (
    <>
      <div
        className={`${styles.list} ${isBoards ? styles.boards : styles.phones}`}
      >
        {rows.map((row, rowIndex) => (
          <ul key={rowIndex} className={styles.group}>
            {row.items.map((item) => (
              <li key={item.src} className={styles.row}>
                {item.caption ? (
                  <p className={styles.caption}>{item.caption}</p>
                ) : null}
                <button
                  type="button"
                  className={styles.item}
                  onClick={() => setActive(item)}
                  aria-label={`Увеличить: ${item.alt}`}
                >
                  <CaseImage
                    className={styles.image}
                    src={item.src}
                    alt={item.alt}
                  />
                </button>
              </li>
            ))}
          </ul>
        ))}
      </div>
      {active ? (
        <CaseLightbox
          src={active.src}
          alt={active.alt}
          captions={active.lightboxCaptions}
          onClose={closeLightbox}
        />
      ) : null}
    </>
  );
}
