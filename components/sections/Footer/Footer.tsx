import AppImage from '@/components/ui/AppImage/AppImage';
import Link from 'next/link';
import { FOOTER_LINKS } from '@/lib/constants';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.links}>
        {FOOTER_LINKS.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className={`${styles.link} interactive ${link.colorClass ? styles[link.colorClass] : ''}`}
            {...(link.href.startsWith('http') || link.href.endsWith('.pdf')
              ? { target: '_blank', rel: 'noopener noreferrer' }
              : {})}
          >
            {link.icon && (
              <AppImage src={link.icon} alt="" width={24} height={24} />
            )}
            <span>{link.label}</span>
          </Link>
        ))}
      </div>
    </footer>
  );
}
