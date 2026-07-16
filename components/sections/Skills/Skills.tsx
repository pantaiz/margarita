import AppImage from '@/components/ui/AppImage/AppImage';
import { SKILL_GROUPS } from '@/lib/constants';
import { assets } from '@/lib/assets';
import Chip from '@/components/ui/Chip/Chip';
import styles from './Skills.module.css';

export default function Skills() {
  return (
    <section id="skills" className={styles.skills}>
      <h2 className={styles.heading}>Навыки</h2>

      <div className={styles.body}>
        <div className={styles.groups}>
          {SKILL_GROUPS.map((group) => (
            <div key={group.id} className={styles.group}>
              <div className={styles.chips}>
                {group.skills.map((skill) => (
                  <Chip key={skill} label={skill} variant={group.variant} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.captions} aria-hidden="true">
          <div className={styles.captionUx}>
            <div className={styles.captionUxArrow}>
              <AppImage
                src={assets.arrowUx}
                alt=""
                width={44}
                height={29}
                className={styles.captionArrowImg}
              />
            </div>
            <span className={styles.captionUxText}>UX</span>
          </div>

          <div className={styles.captionUi}>
            <div className={styles.captionUiArrow}>
              <AppImage
                src={assets.arrowUi}
                alt=""
                width={44}
                height={29}
                className={styles.captionArrowImg}
              />
            </div>
            <span className={styles.captionUiText}>UI</span>
          </div>

          <div className={styles.captionPm}>
            <div className={styles.captionPmArrow}>
              <AppImage
                src={assets.arrowPm}
                alt=""
                width={45}
                height={29}
                className={styles.captionArrowImg}
              />
            </div>
            <p className={styles.captionPmText}>Продуктовое мышление</p>
          </div>
        </div>
      </div>
    </section>
  );
}
