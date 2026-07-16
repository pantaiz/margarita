import AppImage from '@/components/ui/AppImage/AppImage';
import styles from './SocialLink.module.css';

type SocialLinkProps = {
  href: string;
  icon: string;
  label: string;
};

export default function SocialLink({ href, icon, label }: SocialLinkProps) {
  return (
    <a
      href={href}
      className={`${styles.socialLink} interactive`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
    >
      <AppImage src={icon} alt="" width={48} height={48} unoptimized />
    </a>
  );
}
