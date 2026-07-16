import type { ChipVariant } from '@/lib/types';
import styles from './Chip.module.css';

type ChipProps = {
  label: string;
  variant: ChipVariant;
};

export default function Chip({ label, variant }: ChipProps) {
  return <span className={`${styles.chip} ${styles[variant]}`}>{label}</span>;
}
