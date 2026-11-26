'use client';

import { useEffect, useState } from 'react';
import { ArrowRight, FileText, Mail, Plus, User } from 'lucide-react';
import { Nav } from '@/components/nav';
import { SiteFooter } from '@/components/footer';
import { PrimaryButton } from '@/components/ui/sp-button';
import { CaseStudyDetail } from '@/components/case-study-detail';
import {
  CASE_STUDIES,
  CASE_STUDY_CATEGORIES,
  getCaseStudyBySlug,
  type CaseStudyCategory,
} from '@/data/case-studies';

const INITIAL_VISIBLE = 11;

function OrbitalAccent({ className = '' }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 360 280"
      fill="none"
      className={`pointer-events-none select-none ${className}`}
    >
      <ellipse
        cx="220"
        cy="140"
        rx="170"
        ry="95"
        transform="rotate(-18 220 140)"
        stroke="var(--primary)"
        strokeOpacity="0.22"
        strokeWidth="1"
        strokeDasharray="3 5"
      />
      <ellipse
        cx="230"
        cy="145"
        rx="125"
        ry="68"
        transform="rotate(14 230 145)"
        stroke="var(--primary)"
        strokeOpacity="0.16"
        strokeWidth="1"
      />
      <circle cx="118" cy="112" r="2.5" fill="var(--primary)" fillOpacity="0.65" />
      <circle cx="295" cy="88" r="2" fill="var(--primary)" fillOpacity="0.5" />
      <circle cx="245" cy="212" r="2" fill="var(--primary)" fillOpacity="0.45" />
    </svg>
  );
}

export function ArmiaCaseStudiesIndex() {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<'All' | CaseStudyCategory>('All');
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const [submitted, setSubmitted] = useState(false);

  const selectedStudy = selectedSlug ? getCaseStudyBySlug(selectedSlug) : undefined;

  useEffect(() => {
    const syncFromUrl = () => {
      const slug = new URLSearchParams(window.location.search).get('study');
      setSelectedSlug(slug && getCaseStudyBySlug(slug) ? slug : null);
    };
    const handleReset = () => {
      setSelectedSlug(null);
      if (window.location.search) {
        window.history.pushState({}, '', '/case-studies');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    syncFromUrl();
    window.addEventListener('popstate', syncFromUrl);
    window.addEventListener('case-studies:reset', handleReset);
    return () => {
      window.removeEventListener('popstate', syncFromUrl);
      window.removeEventListener('case-studies:reset', handleReset);
    };
  }, []);

  const openStudy = (slug: string) => {
    setSelectedSlug(slug);
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', `/case-studies?study=${encodeURIComponent(slug)}`);
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
            window.history.pushState({}, '', '/case-studies');
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
    <div className="min-h-screen flex flex-col bg-[var(--bg-base)] text-[var(--text-primary)] overflow-x-hidden">
      <Nav />

      {/* ─── 1. Hero Section ───────────────────────────────────────────────────── */}
      <header className="relative pt-28 sm:pt-36 pb-12 sm:pb-16 border-b border-[var(--border-subtle)] overflow-hidden">
        <OrbitalAccent className="absolute -bottom-10 -left-20 w-[340px] opacity-55 rotate-180" />
        <OrbitalAccent className="absolute -top-6 -right-16 w-[380px] opacity-65" />

        <div className="relative z-10 mx-auto max-w-[1152px] px-5 md:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          <div className="lg:col-span-6 min-w-0 space-y-5">
            <div className="flex items-center gap-2.5">
              <span className="h-3.5 w-0.5 rounded-full bg-[var(--primary)]" aria-hidden="true" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--text-secondary)]">
                Case Studies
              </span>
            </div>

            <h1
              className="text-[36px] sm:text-[46px] lg:text-[54px] font-normal leading-[1.06] tracking-tight text-[var(--text-primary)]"
              style={{ fontFamily: 'var(--font-display-family)' }}
            >
              Case <span className="text-[var(--primary)]">studies</span>
            </h1>

            <p className="text-[15px] sm:text-[16px] leading-[1.6] text-[var(--text-secondary)] max-w-[48ch]">
              Platforms we have built for clients in health, logistics, hospitality, and media.
            </p>

            <div className="pt-1">
              <PrimaryButton href="#quick-inquiry">
                <span>Quick inquiry</span>
                <ArrowRight size={15} />
              </PrimaryButton>
            </div>
          </div>

          <div className="lg:col-span-6 min-w-0">
            <div className="aspect-[16/10] w-full rounded-[var(--radius-card)] overflow-hidden border border-[var(--border-subtle)] bg-[var(--surface-1)]">
              <img
                src="/images/case-studies/logistics-marketplace.jpg"
                alt="Featured software engineering case study showcase"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </header>

      {/* ─── 2. Filter Chips & Asymmetric Editorial Case Studies Grid ───────────── */}
      <main className="py-10 sm:py-14 bg-[var(--bg-base)]">
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
                  className={`rounded-[var(--radius-pill)] px-4 py-2 text-[12px] sm:text-[13px] font-medium transition-colors border cursor-pointer focus-visible:outline-[var(--focus-ring-width)] focus-visible:outline-solid focus-visible:outline-[var(--focus-ring-color)] focus-visible:outline-offset-[var(--focus-ring-offset)] ${isActive
                      ? 'bg-[var(--primary)] text-white border-[var(--primary)]'
                      : 'bg-[var(--surface-1)] text-[var(--text-secondary)] border-[var(--border-subtle)] hover:border-[var(--primary)] hover:text-[var(--text-primary)]'
                    }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* Asymmetric Grid: Row 1 = 1 featured 2-col split card + 1 regular card; subsequent rows = 3 cols */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {visibleStudies.map((item, idx) => {
              const isFeatured = idx === 0 && visibleStudies.length > 1;
              const resultText = item.verifiedResult
                ? `${item.verifiedResult.figure} — ${item.verifiedResult.label}`
                : item.resultLine;

              if (isFeatured) {
                return (
                  <button
                    key={item.slug}
                    type="button"
                    onClick={() => openStudy(item.slug)}
                    className="group md:col-span-2 lg:col-span-2 text-left grid grid-cols-1 sm:grid-cols-12 rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-[var(--surface-1)] overflow-hidden transition-colors hover:border-[var(--primary)] cursor-pointer focus-visible:outline-[var(--focus-ring-width)] focus-visible:outline-solid focus-visible:outline-[var(--focus-ring-color)] focus-visible:outline-offset-[var(--focus-ring-offset)]"
                  >
                    <div className="sm:col-span-5 p-6 sm:p-7 flex flex-col justify-between gap-4">
                      <div className="space-y-2.5">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[var(--text-muted)]">
                          {item.industry}
                        </p>
                        <h2
                          className="text-[24px] sm:text-[28px] font-normal leading-[1.15] text-[var(--text-primary)] group-hover:text-[var(--primary)] transition-colors"
                          style={{ fontFamily: 'var(--font-display-family)' }}
                        >
                          {item.cardTitle}
                        </h2>
                        <p className="text-[12px] text-[var(--text-secondary)]">{resultText}</p>
                      </div>

                      <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[var(--text-primary)] group-hover:text-[var(--primary)] transition-colors">
                        <span>Read the case study</span>
                        <ArrowRight size={14} />
                      </span>
                    </div>

                    <div className="sm:col-span-7 relative min-h-[220px] sm:min-h-[270px] overflow-hidden bg-[var(--surface-2)]">
                      <img
                        src={item.imageSrc}
                        alt={item.imageAlt}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div
                        className="hidden sm:block absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[var(--surface-1)] to-transparent"
                        aria-hidden="true"
                      />
                    </div>
                  </button>
                );
              }

              return (
                <button
                  key={item.slug}
                  type="button"
                  onClick={() => openStudy(item.slug)}
                  className="group text-left flex flex-col rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-[var(--surface-1)] overflow-hidden transition-colors hover:border-[var(--primary)] cursor-pointer focus-visible:outline-[var(--focus-ring-width)] focus-visible:outline-solid focus-visible:outline-[var(--focus-ring-color)] focus-visible:outline-offset-[var(--focus-ring-offset)]"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[var(--surface-2)] shrink-0">
                    <img
                      src={item.imageSrc}
                      alt={item.imageAlt}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div
                      className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[var(--surface-1)] to-transparent"
                      aria-hidden="true"
                    />
                  </div>

                  <div className="w-full px-5 pb-5 pt-2 flex-1 flex flex-col justify-between gap-3">
                    <div className="flex items-end justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[var(--text-muted)] mb-1 truncate">
                          {item.industry}
                        </p>
                        <h2
                          className="text-[19px] font-normal leading-[1.2] text-[var(--text-primary)] group-hover:text-[var(--primary)] transition-colors line-clamp-2"
                          style={{ fontFamily: 'var(--font-display-family)' }}
                        >
                          {item.cardTitle}
                        </h2>
                      </div>
                      <span
                        aria-hidden="true"
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--primary)] text-white transition-transform duration-200 group-hover:translate-x-0.5"
                      >
                        <ArrowRight size={14} />
                      </span>
                    </div>

                    <p className="text-[12px] text-[var(--text-secondary)] border-t border-[var(--border-subtle)] pt-2.5 truncate">
                      {resultText}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Load more */}
          {hasMore && (
            <div className="mt-10 flex justify-center">
              <button
                type="button"
                onClick={() => setVisibleCount((prev) => prev + 6)}
                className="inline-flex items-center gap-2 rounded-[var(--radius-pill)] border border-[var(--border-strong)] bg-[var(--surface-1)] px-6 py-2.5 text-[13px] font-medium text-[var(--text-primary)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors cursor-pointer focus-visible:outline-[var(--focus-ring-width)] focus-visible:outline-solid focus-visible:outline-[var(--focus-ring-color)] focus-visible:outline-offset-[var(--focus-ring-offset)]"
              >
                <span>Load more case studies</span>
                <Plus size={14} />
              </button>
            </div>
          )}
        </div>
      </main>

      {/* ─── 3. Consultation Band & Quick Inquiry Form ─────────────────────────── */}
      <section id="quick-inquiry" className="pb-16 sm:pb-24 pt-4 bg-[var(--bg-base)]">
        <div className="mx-auto max-w-[1152px] px-5 md:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[var(--radius-card-lg)] border border-[var(--border-subtle)] bg-[var(--surface-1)] p-6 sm:p-10 lg:p-12">
            <OrbitalAccent className="absolute -bottom-14 -right-14 w-[280px] opacity-50" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              <div className="lg:col-span-5 min-w-0 space-y-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--text-muted)]">
                  Free Consultation
                </p>
                <h2
                  className="text-[30px] sm:text-[36px] font-normal leading-[1.1] text-[var(--text-primary)]"
                  style={{ fontFamily: 'var(--font-display-family)' }}
                >
                  Tell us about your project.
                </h2>
                <div className="h-0.5 w-10 rounded-full bg-[var(--primary)]" aria-hidden="true" />
                <p className="pt-1 text-[14px] leading-[1.6] text-[var(--text-secondary)] max-w-[36ch]">
                  Share your platform goals, timeline, and technical requirements with our engineering team.
                </p>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="lg:col-span-7 min-w-0 space-y-4 lg:border-l lg:border-[var(--border-subtle)] lg:pl-10"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <User
                      size={15}
                      className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
                    />
                    <input
                      required
                      suppressHydrationWarning
                      placeholder="Full name"
                      className="h-11 w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-2)] pl-10 pr-4 text-[14px] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus-visible:outline-[var(--focus-ring-width)] focus-visible:outline-solid focus-visible:outline-[var(--focus-ring-color)] focus-visible:outline-offset-[var(--focus-ring-offset)]"
                    />
                  </div>
                  <div className="relative">
                    <Mail
                      size={15}
                      className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
                    />
                    <input
                      required
                      type="email"
                      suppressHydrationWarning
                      placeholder="Work email"
                      className="h-11 w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-2)] pl-10 pr-4 text-[14px] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus-visible:outline-[var(--focus-ring-width)] focus-visible:outline-solid focus-visible:outline-[var(--focus-ring-color)] focus-visible:outline-offset-[var(--focus-ring-offset)]"
                    />
                  </div>
                </div>

                <div className="relative">
                  <FileText
                    size={15}
                    className="pointer-events-none absolute left-3.5 top-3.5 text-[var(--text-muted)]"
                  />
                  <textarea
                    required
                    rows={4}
                    suppressHydrationWarning
                    placeholder="Project scope and requirements"
                    className="w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-2)] pl-10 pr-4 py-3 text-[14px] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus-visible:outline-[var(--focus-ring-width)] focus-visible:outline-solid focus-visible:outline-[var(--focus-ring-color)] focus-visible:outline-offset-[var(--focus-ring-offset)]"
                  />
                </div>

                <PrimaryButton type="submit" suppressHydrationWarning>
                  <span>{submitted ? 'Inquiry received' : 'Quick inquiry'}</span>
                  <ArrowRight size={15} />
                </PrimaryButton>
              </form>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
