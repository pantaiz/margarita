import CaseOutlineButton from '@/components/cases/CaseOutlineButton/CaseOutlineButton';
import styles from './CasePdfEmbed.module.css';

type CasePdfEmbedProps = {
  src: string;
  pages: string[];
  title: string;
};

export default function CasePdfEmbed({ src, pages, title }: CasePdfEmbedProps) {
  return (
    <figure className={styles.wrap}>
      <iframe
        className={styles.viewer}
        src={`${src}#view=FitH&toolbar=0`}
        title={title}
        loading="lazy"
      />

      <div className={styles.pages}>
        {pages.map((pageSrc, index) => (
          <img
            key={pageSrc}
            className={styles.page}
            src={pageSrc}
            alt={
              pages.length > 1
                ? `${title}, страница ${index + 1}`
                : title
            }
            loading="lazy"
            decoding="async"
          />
        ))}
      </div>

      <div className={styles.actions}>
        <CaseOutlineButton href={src}>Открыть PDF</CaseOutlineButton>
      </div>
    </figure>
  );
}
