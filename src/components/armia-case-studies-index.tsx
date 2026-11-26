'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Nav } from '@/components/nav';
import { SiteFooter } from '@/components/footer';
import { CaseStudyDetail } from '@/components/case-study-detail';
import {
  CASE_STUDIES,
  CASE_STUDY_CATEGORIES,
  getCaseStudyBySlug,
  type CaseStudyCategory,
} from '@/data/case-studies';

const INITIAL_VISIBLE = 9;

export function ArmiaCaseStudiesIndex() {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<'All' | CaseStudyCategory>('All');
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const [submitted, setSubmitted] = useState(false);

  const selectedStudy = selectedSlug ? getCaseStudyBySlug(selectedSlug) : undefined;

  const openStudy = (slug: string) => {
    setSelectedSlug(slug);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (selectedStudy) {
    return (
      <CaseStudyDetail
        study={selectedStudy}
        onBack={() => {
          setSelectedSlug(null);
          if (typeof window !== 'undefined') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
        onSelectStudy={openStudy}
      />
    );
  }

  const filtered =
    activeCategory === 'All'
      ? CASE_STUDIES
      : CASE_STUDIES.filter((item) => item.filterCategory === activeCategory);

  const visibleStudies = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const handleCategoryChange = (cat: 'All' | CaseStudyCategory) => {
    setActiveCategory(cat);
    setVisibleCount(INITIAL_VISIBLE);
  };

  return (
    <div className="armia-theme min-h-screen flex flex-col">
      <Nav />

      {/* ─── 1. Hero Image Band & H1 ───────────────────────────────────────────── */}
      <header className="relative pt-28 sm:pt-32 pb-12 sm:pb-16 bg-[var(--armia-surface)] border-b border-[var(--armia-border)] overflow-hidden">
        <div className="mx-auto max-w-[1152px] px-5 md:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 min-w-0 space-y-5">
            <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--armia-text-secondary)]">
              Case Studies
            </p>
            <h1 className="text-[32px] lg:text-[48px] leading-[1.12] text-[var(--armia-text-primary)]">
              Case <span className="text-[var(--armia-accent)]">studies</span>
            </h1>
            <p className="text-[16px] leading-[1.6] text-[var(--armia-text-secondary)] max-w-[60ch]">
              Platforms we have built for clients in health, logistics, hospitality, and media.
            </p>
            <div className="pt-1">
              <a href="#quick-inquiry" className="armia-btn-primary">
                <span>Quick Inquiry</span>
                <ArrowRight size={16} />
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 min-w-0">
            <div className="aspect-[4/3] w-full rounded-[4px] overflow-hidden border border-[var(--armia-border)] bg-[var(--armia-bg)]">
              <img
                src="/images/case-studies/logistics-marketplace.jpg"
                alt="Armia Systems Inc. custom software engineering showcase"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </header>

      {/* ─── 2 & 3. Filter Chips & 3-Column Case Studies Grid ──────────────────── */}
      <main className="py-12 sm:py-16 bg-[var(--armia-bg)] border-b border-[var(--armia-border)]">
        <div className="mx-auto max-w-[1152px] px-5 md:px-6 lg:px-8">
          {/* Filter Chips */}
          <div
            role="group"
            aria-label="Filter case studies by industry"
            className="flex flex-wrap gap-2 mb-8"
          >
            {CASE_STUDY_CATEGORIES.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => handleCategoryChange(category)}
                  className={`rounded-[var(--radius-pill)] px-4 py-2 text-[13px] font-semibold transition-colors border ${isActive
                      ? 'bg-[var(--primary)] text-[var(--primary-foreground)] border-[var(--primary)]'
                      : 'bg-[var(--armia-surface)] text-[var(--armia-text-primary)] border-[var(--armia-border)] hover:border-[var(--primary)]'
                    }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* Grid: 3 cols desktop, 2 tablet, 1 mobile, 24px gap */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleStudies.map((item) => (
                <button
                key={item.slug}
                type="button"
                onClick={() => openStudy(item.slug)}
                className="group text-left flex flex-col rounded-[var(--radius-card)] border border-[var(--armia-border)] bg-[var(--armia-card)] overflow-hidden transition-all hover:border-[var(--primary)] cursor-pointer"
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-[var(--armia-surface)] shrink-0">
                  <img
                    src={item.imageSrc}
                    alt={item.imageAlt}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Title strip at bottom of image */}
                    <div className="w-full bg-[var(--armia-card)] px-5 pt-4 pb-3 border-t border-[var(--armia-border)]">
                      <h2 className="text-[18px] leading-[1.3] text-[var(--armia-text-primary)] group-hover:text-[var(--primary)] transition-colors">
                        {item.cardTitle}
                      </h2>
                    </div>

                      <div className="w-full px-5 pb-5 flex-1 flex flex-col justify-between gap-3">
                        <div className="space-y-2">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--armia-text-secondary)]">
                            {item.industry}
                          </p>
                          <p className="text-[14px] leading-[1.5] text-[var(--armia-text-secondary)]">
                            {item.verifiedResult
                              ? `${item.verifiedResult.figure} — ${item.verifiedResult.label}`
                              : item.resultLine}
                          </p>
                        </div>

                          <span className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-[var(--armia-text-primary)] group-hover:text-[var(--armia-accent)] transition-colors pt-1">
                            <span>Read the case study</span>
                            <ArrowRight size={15} />
                      </span>
                    </div>
                </button>
            ))}
              </div>

          {/* 5. Load more after 9 cards */ }
          { hasMore && (
                <div className="mt-10 flex justify-center">
                  <button
                    type="button"
                    onClick={() => setVisibleCount((prev) => prev + 9)}
                    className="armia-btn-primary"
                  >
                    Load more case studies
                  </button>
                </div>
              )}
          </div>
      </main>

      {/* ─── 6. Consultation Band & Quick Inquiry Form ─────────────────────────── */}
      <section
        id="quick-inquiry"
        className="py-12 sm:py-16 bg-[var(--armia-surface)] border-b border-[var(--armia-border)]"
      >
        <div className="mx-auto max-w-[1152px] px-5 md:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 space-y-4">
            <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--armia-text-secondary)]">
              Free consultation
            </p>
            <h2 className="text-[28px] sm:text-[32px] font-bold leading-[1.2] text-[var(--armia-text-primary)]">
              Tell us about your project.
            </h2>
            <p className="text-[15px] leading-[1.6] text-[var(--armia-text-secondary)]">
              Share your platform goals, timeline, and technical requirements with Armia Systems Inc.
            </p>
            <div className="pt-2">
              <a href="#inquiry-form" className="armia-btn-primary">
                <span>Free Consultation</span>
                <ArrowRight size={16} />
              </a>
            </div>
          </div>

          <div
            id="inquiry-form"
            className="lg:col-span-7 rounded-[4px] border border-[var(--armia-border)] bg-[var(--armia-bg)] p-6 sm:p-8"
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  required
                  suppressHydrationWarning
                  placeholder="Full name"
                  className="w-full rounded-[4px] border border-[var(--armia-border)] bg-[var(--armia-bg)] px-4 py-3 text-[15px] text-[var(--armia-text-primary)] placeholder:text-[var(--armia-text-secondary)]"
                />
                <input
                  required
                  type="email"
                  suppressHydrationWarning
                  placeholder="Work email"
                  className="w-full rounded-[4px] border border-[var(--armia-border)] bg-[var(--armia-bg)] px-4 py-3 text-[15px] text-[var(--armia-text-primary)] placeholder:text-[var(--armia-text-secondary)]"
                />
              </div>
              <textarea
                required
                rows={4}
                suppressHydrationWarning
                placeholder="Project scope and requirements"
                className="w-full rounded-[4px] border border-[var(--armia-border)] bg-[var(--armia-bg)] px-4 py-3 text-[15px] text-[var(--armia-text-primary)] placeholder:text-[var(--armia-text-secondary)]"
              />
              <button type="submit" suppressHydrationWarning className="armia-btn-primary">
                <span>{submitted ? 'Inquiry received' : 'Quick Inquiry'}</span>
                <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
