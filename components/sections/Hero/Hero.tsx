import AppImage from '@/components/ui/AppImage/AppImage';
import { assets } from '@/lib/assets';
import { CONTACTS } from '@/lib/constants';
import SocialLink from '@/components/ui/SocialLink/SocialLink';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.stage}>
        <div className={`${styles.decor} ${styles.sun}`}>
          <AppImage src={assets.sun} alt="" width={139} height={140} />
        </div>
        <div className={`${styles.decor} ${styles.cloud1}`}>
          <AppImage src={assets.cloud1} alt="" width={144} height={49} />
        </div>
        <div className={`${styles.decor} ${styles.cloud2}`}>
          <AppImage src={assets.cloud2} alt="" width={125} height={54} />
        </div>
        <div className={`${styles.decor} ${styles.cloud3}`}>
          <AppImage src={assets.cloud3} alt="" width={83} height={31} />
        </div>
        <div className={`${styles.decor} ${styles.star1}`}>
          <AppImage src={assets.star1} alt="" width={39} height={57} />
        </div>
        <div className={`${styles.decor} ${styles.star2}`}>
          <AppImage src={assets.star2} alt="" width={44} height={65} />
        </div>
        <div className={`${styles.decor} ${styles.star3}`}>
          <AppImage src={assets.star3} alt="" width={39} height={57} />
        </div>
        <div className={`${styles.decor} ${styles.flowerRed}`}>
          <AppImage src={assets.flowerRed} alt="" width={84} height={90} />
        </div>
        <div className={`${styles.decor} ${styles.flowerPink}`}>
          <AppImage src={assets.flowerPink} alt="" width={133} height={122} />
        </div>

        <div className={styles.photoWrap}>
          <div className={styles.arrow}>
            <AppImage src={assets.arrow} alt="" width={58} height={29} />
          </div>
          <p className={styles.caption}>Это я</p>
          <div className={styles.photo}>
            <AppImage
              src={assets.photo}
              alt="Свитич Маргарита"
              width={161}
              height={180}
              priority
            />
          </div>
        </div>

        <div className={styles.textBlock}>
          <div className={styles.intro}>
            <div className={styles.introHead}>
              <p className={styles.greeting}>Привет! Я</p>
              <h1 className={styles.name}>Свитич Маргарита</h1>
            </div>
            <p className={styles.role}>
              <span className={styles.roleWord}>
                Продуктовый дизайнер
                <AppImage
                  src={assets.underline}
                  alt=""
                  width={474}
                  height={5}
                  className={styles.underline}
                />
              </span>
            </p>
          </div>

          <div className={styles.socials}>
            <SocialLink
              href={CONTACTS.linkedin}
              icon={assets.iconLinkedin}
              label="LinkedIn"
            />
            <SocialLink
              href={CONTACTS.telegram}
              icon={assets.iconTelegram}
              label="Telegram"
            />
            <SocialLink
              href={`mailto:${CONTACTS.email}`}
              icon={assets.iconMail}
              label="Email"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
