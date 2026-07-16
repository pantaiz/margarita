import { ABOUT_TEXT, EDUCATION } from '@/lib/constants';
import styles from './About.module.css';

export default function About() {
  return (
    <section id="about" className={styles.about}>
      <div className={styles.grid}>
        <div className={styles.column}>
          <h2 className={styles.heading}>Обо мне</h2>
          <div className={styles.textGroup}>
            {ABOUT_TEXT.map((paragraph) => (
              <p key={paragraph.slice(0, 20)} className={styles.text}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className={styles.column}>
          <h2 className={styles.heading}>Образование</h2>
          <div className={styles.educationList}>
            {EDUCATION.map((item) => (
              <div key={item.title} className={styles.educationItem}>
                <p className={styles.period}>{item.period}</p>
                <p className={styles.eduTitle}>{item.title}</p>
                <p className={styles.text}>{item.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
