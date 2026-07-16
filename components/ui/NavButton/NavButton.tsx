'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './NavButton.module.css';

type NavButtonProps = {
  label: string;
  href: string;
  external?: boolean;
  onNavigate?: (href: string) => void;
};

function parseHashHref(href: string): { path: string; id: string } | null {
  if (href.startsWith('#')) {
    return { path: '/', id: href.slice(1) };
  }

  const hashIndex = href.indexOf('#');
  if (hashIndex === -1) return null;

  const path = href.slice(0, hashIndex) || '/';
  const id = href.slice(hashIndex + 1);
  if (!id) return null;

  return { path, id };
}

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

export default function NavButton({
  label,
  href,
  external,
  onNavigate,
}: NavButtonProps) {
  const pathname = usePathname();
  const hashTarget = parseHashHref(href);

  if (external) {
    return (
      <a
        href={href}
        className={`${styles.navButton} interactive`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => onNavigate?.(href)}
      >
        {label}
      </a>
    );
  }

  if (hashTarget) {
    const fullHref = `${hashTarget.path}#${hashTarget.id}`;

    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
      const onTargetPage =
        pathname === hashTarget.path ||
        (hashTarget.path === '/' && pathname === '/');

      if (onTargetPage) {
        event.preventDefault();
        scrollToId(hashTarget.id);
        window.history.replaceState(null, '', `#${hashTarget.id}`);
      }

      onNavigate?.(href);
    };

    return (
      <Link
        href={fullHref}
        className={`${styles.navButton} interactive`}
        onClick={handleClick}
      >
        {label}
      </Link>
    );
  }

  return (
    <Link href={href} className={`${styles.navButton} interactive`}>
      {label}
    </Link>
  );
}
