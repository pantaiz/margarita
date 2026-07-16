import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { CASES, getCaseBySlug } from '@/lib/constants';
import { getCaseStudyFull } from '@/lib/cases/t-bank-robot-delivery';
import SiteShell from '@/components/layout/SiteShell/SiteShell';
import CaseStub from '@/components/cases/CaseStub/CaseStub';
import CasePage from '@/components/cases/CasePage/CasePage';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return CASES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const fullCase = getCaseStudyFull(slug);
  const caseStudy = fullCase ?? getCaseBySlug(slug);
  if (!caseStudy) return {};

  const title = caseStudy.title.replace('\n', ' ');

  return {
    title: `${title} — Свитич Маргарита`,
    description: caseStudy.description,
    alternates: {
      canonical: `/cases/${slug}`,
    },
  };
}

export default async function CaseRoutePage({ params }: PageProps) {
  const { slug } = await params;
  const caseStudy = getCaseBySlug(slug);
  const fullCase = getCaseStudyFull(slug);

  if (!caseStudy) {
    notFound();
  }

  return (
    <SiteShell contentWidth={1080} mainPaddingTop={82}>
      {fullCase ? <CasePage caseStudy={fullCase} /> : <CaseStub caseStudy={caseStudy} />}
    </SiteShell>
  );
}
