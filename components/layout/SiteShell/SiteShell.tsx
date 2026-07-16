import AppImage from '@/components/ui/AppImage/AppImage';
import { assets } from '@/lib/assets';
import Header from '@/components/layout/Header/Header';
import styles from './SiteShell.module.css';

type SiteShellProps = {
  children: React.ReactNode;
  contentWidth?: number;
  mainPaddingTop?: number;
};

export default function SiteShell({
  children,
  contentWidth,
  mainPaddingTop,
}: SiteShellProps) {
  const containerStyle = contentWidth
    ? { maxWidth: `${contentWidth}px`, padding: 0 }
    : undefined;
  const mainStyle = mainPaddingTop
    ? { paddingTop: `${mainPaddingTop}px` }
    : undefined;

  return (
    <div className={styles.shell}>
      <AppImage
        src={assets.background}
        alt=""
        fill
        sizes="100vw"
        className={styles.background}
        priority
      />
      <div className={styles.content}>
        <Header />
        <main className={styles.main} style={mainStyle}>
          <div className={styles.container} style={containerStyle}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
