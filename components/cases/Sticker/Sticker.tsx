import AppImage from '@/components/ui/AppImage/AppImage';
import { assets } from '@/lib/assets';
import styles from './Sticker.module.css';

export default function Sticker() {
  return (
    <div className={styles.sticker}>
      <div className={styles.tape}>
        <AppImage
          src={assets.tape}
          alt=""
          width={41}
          height={60}
          className={styles.tapeImg}
          unoptimized
        />
      </div>
      <div className={styles.note}>
        <AppImage
          src={assets.stickerBg}
          alt=""
          fill
          sizes="200px"
          className={styles.noteBg}
        />
        <AppImage
          src={assets.stickerTexture}
          alt=""
          fill
          sizes="200px"
          className={styles.noteTexture}
        />
        <p className={styles.text}>В процессе</p>
      </div>
    </div>
  );
}
