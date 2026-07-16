import { CASES } from '@/lib/constants';
import CaseCard from '@/components/cases/CaseCard/CaseCard';
import styles from './Projects.module.css';

export default function Projects() {
  return (
    <section id="projects" className={styles.projects}>
      <div className={styles.list}>
        {CASES.map((caseStudy) => (
          <CaseCard key={caseStudy.slug} caseStudy={caseStudy} />
        ))}
      </div>
    </section>
  );
}
