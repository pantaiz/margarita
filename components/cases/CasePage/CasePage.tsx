import Link from 'next/link';
import CaseHero from '@/components/cases/CaseHero/CaseHero';
import CaseSection from '@/components/cases/CaseSection/CaseSection';
import CaseRichText from '@/components/cases/CaseRichText/CaseRichText';
import CaseDisclosure from '@/components/cases/CaseDisclosure/CaseDisclosure';
import CaseDesignShowcase from '@/components/cases/CaseDesignShowcase/CaseDesignShowcase';
import CasePlate from '@/components/cases/CasePlate/CasePlate';
import ScrollToTop from '@/components/cases/ScrollToTop/ScrollToTop';
import type { CaseStudyFull } from '@/lib/types';
import styles from './CasePage.module.css';

type CasePageProps = {
  caseStudy: CaseStudyFull;
};

export default function CasePage({ caseStudy }: CasePageProps) {
  return (
    <article className={styles.page}>
      <CaseHero title={caseStudy.title} meta={caseStudy.meta} />

      {caseStudy.sections.map((section, index) => {
        const disclosures = section.disclosures ?? section.accordions;

        return (
          <CaseSection
            key={section.id}
            index={index + 1}
            label={section.label}
            id={section.id === 'design' ? 'design' : undefined}
          >
            {section.intro && <CaseRichText blocks={section.intro} />}
            {section.plates?.map((plate) => (
              <CasePlate key={plate.label} label={plate.label}>
                <CaseRichText blocks={plate.blocks} />
              </CasePlate>
            ))}
            {disclosures && <CaseDisclosure items={disclosures} />}
            {section.body && <CaseRichText blocks={section.body} />}
            {section.summary && <CaseRichText blocks={section.summary} />}
            {section.designBlocks && (
              <CaseDesignShowcase blocks={section.designBlocks} />
            )}
          </CaseSection>
        );
      })}

      <Link href="/" className={`${styles.backLink} interactive`}>
        ← На главную
      </Link>

      <ScrollToTop />
    </article>
  );
}
