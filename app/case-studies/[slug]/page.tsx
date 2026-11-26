import { notFound } from 'next/navigation';
import { CASE_STUDIES, getCaseStudyBySlug } from '@/data/case-studies';
import { CaseStudyDetail } from '@/components/case-study-detail';

export function generateStaticParams() {
  return CASE_STUDIES.map((study) => ({ slug: study.slug }));
}

export default async function CaseStudySlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) {
    notFound();
  }
  return <CaseStudyDetail study={study} />;
}
