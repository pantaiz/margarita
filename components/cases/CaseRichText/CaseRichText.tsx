'use client';

import CaseImage from '@/components/cases/CaseImage/CaseImage';
import CaseOutlineButton from '@/components/cases/CaseOutlineButton/CaseOutlineButton';
import CaseTable from '@/components/cases/CaseTable/CaseTable';
import type { CaseBulletItem, CaseRichBlock, CaseRichTextPart } from '@/lib/types';
import { assets } from '@/lib/assets';
import { fixHangingPrepositions } from '@/lib/typography';
import styles from './CaseRichText.module.css';

type CaseRichTextProps = {
  blocks: CaseRichBlock[];
};

function formatText(text: string) {
  return fixHangingPrepositions(text);
}

function RichParts({ parts }: { parts: CaseRichTextPart[] }) {
  return (
    <>
      {parts.map((part, i) => {
        const content = formatText(part.text);

        if (part.href) {
          return (
            <a
              key={i}
              href={part.href}
              className={styles.inlineLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {content}
            </a>
          );
        }

        if (part.bold) {
          return (
            <strong key={i} className={styles.emphasis}>
              {content}
            </strong>
          );
        }

        return <span key={i}>{content}</span>;
      })}
    </>
  );
}

function bulletItemKey(item: CaseBulletItem, index: number) {
  if (typeof item === 'string') return `${index}-${item}`;
  return `${index}-${item.parts.map((part) => part.text).join('')}`;
}

function BulletItemContent({ item }: { item: CaseBulletItem }) {
  if (typeof item === 'string') {
    return <span className={styles.bulletText}>{formatText(item)}</span>;
  }

  return (
    <span className={styles.bulletText}>
      <RichParts parts={item.parts} />
    </span>
  );
}

export default function CaseRichText({ blocks }: CaseRichTextProps) {
  return (
    <div className={styles.richText}>
      {blocks.map((block, index) => {
        switch (block.type) {
          case 'paragraph':
            return (
              <p key={index} className={styles.paragraph}>
                {formatText(block.text)}
              </p>
            );
          case 'rich-paragraph':
            return (
              <p key={index} className={styles.paragraph}>
                <RichParts parts={block.parts} />
              </p>
            );
          case 'heading':
            return (
              <h3 key={index} className={styles.heading}>
                {formatText(block.text)}
              </h3>
            );
          case 'list':
            return (
              <ul key={index} className={styles.list}>
                {block.items.map((item) => (
                  <li key={item}>{formatText(item)}</li>
                ))}
              </ul>
            );
          case 'ordered-list':
            return (
              <ol key={index} className={styles.orderedList}>
                {block.items.map((item) => (
                  <li key={item}>{formatText(item)}</li>
                ))}
              </ol>
            );
          case 'link':
            return (
              <a
                key={index}
                href={block.href}
                className={styles.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {formatText(block.label)}
              </a>
            );
          case 'outline-link':
            return (
              <div key={index} className={styles.outlineLinkWrap}>
                <CaseOutlineButton
                  href={block.href}
                  className={styles.outlineLink}
                >
                  {formatText(block.label)}
                </CaseOutlineButton>
              </div>
            );
          case 'links':
            return (
              <div key={index} className={styles.links}>
                {block.items.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className={styles.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {formatText(item.label)}
                  </a>
                ))}
              </div>
            );
          case 'image':
            return (
              <div key={index} className={styles.imageWrap}>
                <CaseImage
                  src={block.src}
                  alt={block.alt}
                  width={block.width ?? 832}
                  height={block.height ?? 510}
                  className={styles.image}
                />
              </div>
            );
          case 'callout':
            return (
              <blockquote key={index} className={styles.callout}>
                {formatText(block.text)}
              </blockquote>
            );
          case 'highlight':
            return (
              <div key={index} className={styles.highlight}>
                {formatText(block.text)}
              </div>
            );
          case 'table':
            return (
              <div key={index} className={styles.fullBleed}>
                <CaseTable
                  caption={
                    block.caption ? formatText(block.caption) : undefined
                  }
                  markerLegend={block.markerLegend}
                  columns={block.columns}
                  rows={block.rows}
                />
              </div>
            );
          case 'bullet-list':
            return (
              <ul key={index} className={styles.bulletList}>
                {block.items.map((item, itemIndex) => (
                  <li
                    key={bulletItemKey(item, itemIndex)}
                    className={styles.bulletItem}
                  >
                    <img
                      src={block.iconSrc ?? assets.star1}
                      alt=""
                      className={styles.bulletIcon}
                      aria-hidden="true"
                    />
                    <BulletItemContent item={item} />
                  </li>
                ))}
              </ul>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
