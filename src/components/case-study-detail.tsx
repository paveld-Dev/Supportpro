'use client';

import { useState, type ComponentType } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  BarChart3,
  Cloud,
  Code2,
  Cpu,
  Database,
  FileText,
  Globe,
  Layers,
  Mail,
  Server,
  Smartphone,
  Terminal,
  User,
  Users,
} from 'lucide-react';
import { Nav } from '@/components/nav';
import { SiteFooter } from '@/components/footer';
import { PrimaryButton } from '@/components/ui/sp-button';
import { CASE_STUDIES, type CaseStudy } from '@/data/case-studies';

interface CaseStudyDetailProps {
  study: CaseStudy;
  onBack?: () => void;
  onSelectStudy?: (slug: string) => void;
}

const EDITORIAL_HEADLINES: Record<string, string> = {
  'personalized-meditation-platform': 'From idea to a mindful mobile experience',
  'property-management-platform': 'Unifying leases, rent, and maintenance in one portal',
  'logistics-marketplace': 'Connecting regional shippers and carriers in real time',
  'digital-engagement-platform': 'Bringing multi-channel campaigns into one workspace',
  'restaurant-credit-management': 'Streamlining corporate dining allowances at the POS',
  'automotive-social-network': 'Building a dedicated home for vehicle builds and events',
  'personalized-digital-physiotherapy-platform': 'Extending clinical rehab guidance into daily home routines',
  'schedule-platform-for-kids': 'Simplifying after-school discovery and family scheduling',
  'social-video-platform': 'Delivering fast creator uploads and adaptive playback',
  'insurance-portal-for-companies': 'Replacing spreadsheet benefits workflows with self-service',
  'indigent-defense-management-platform': 'Automating conflict checks and attorney docket balance',
  'head-injury-monitoring-apps': 'Equipping sidelines with offline-ready injury screening',
  'multi-channel-multi-vendor-ecommerce-marketplace': 'Synchronizing multi-seller catalogs and split payouts',
  'online-food-ordering-and-delivery-app': 'Powering direct restaurant ordering and live dispatch',
  'cash-back-and-deal-portal': 'Making affiliate cashback tracking transparent and fast',
  'online-printing-website': 'Validating print artwork and proofs before press time',
};

function getTechIcon(tech: string): ComponentType<{ size?: number; className?: string }> {
  const lower = tech.toLowerCase();
  if (lower.includes('react') || lower.includes('angular') || lower.includes('code')) return Code2;
  if (lower.includes('node') || lower.includes('php') || lower.includes('.net') || lower.includes('api')) {
    return Server;
  }
  if (lower.includes('sql') || lower.includes('mongo') || lower.includes('redis') || lower.includes('elastic')) {
    return Database;
  }
  if (lower.includes('aws') || lower.includes('azure') || lower.includes('cloud')) return Cloud;
  if (lower.includes('ios') || lower.includes('android') || lower.includes('mobile')) return Smartphone;
  if (lower.includes('maps') || lower.includes('web')) return Globe;
  if (lower.includes('ffmpeg') || lower.includes('imagemagick')) return Cpu;
  return Terminal;
}

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

  export function CaseStudyDetail({ study, onBack, onSelectStudy }: CaseStudyDetailProps) {
    const [submitted, setSubmitted] = useState(false);
    const moreStudies = CASE_STUDIES.filter((item) => item.slug !== study.slug).slice(0, 11);
    const editorialHeading =
      EDITORIAL_HEADLINES[study.slug] ?? `Delivering ${study.cardTitle.toLowerCase()} at scale`;

    const facts = [
      { label: 'Client', value: study.client, icon: Users },
      { label: 'Industry', value: study.industry, icon: Layers },
      { label: 'Offering', value: study.offering, icon: Smartphone },
      { label: 'Approach', value: study.approachSummary, icon: Code2 },
      {
        label: 'Result',
        value: study.verifiedResult
          ? `${study.verifiedResult.figure} — ${study.verifiedResult.label}`
          : 'Verification pending with client',
        icon: BarChart3,
      },
    ];

    return (
      <div className="min-h-screen flex flex-col bg-[var(--bg-base)] text-[var(--text-primary)] overflow-x-hidden">
        <Nav />

        {/* ─── 1. Hero Section ───────────────────────────────────────────────────── */}
        <header className="relative pt-28 sm:pt-36 pb-12 sm:pb-16 border-b border-[var(--border-subtle)] overflow-hidden">
          <OrbitalAccent className="absolute -top-8 -right-12 w-[340px] sm:w-[440px] opacity-70" />

          <div className="relative z-10 mx-auto max-w-[1152px] px-5 md:px-6 lg:px-8">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="h-3.5 w-0.5 rounded-full bg-[var(--primary)]" aria-hidden="true" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--text-secondary)]">
                Case Study
              </span>
            </div>

            <h1
              className="text-[32px] sm:text-[42px] lg:text-[52px] font-normal leading-[1.08] tracking-tight text-[var(--text-primary)] max-w-[820px]"
              style={{ fontFamily: 'var(--font-display-family)' }}
            >
              {study.title}
            </h1>

            <p className="mt-4 text-[15px] sm:text-[16px] leading-[1.6] text-[var(--text-secondary)] max-w-[66ch]">
              {study.offering} — {study.approachSummary.toLowerCase()}.
            </p>

            {/* Balanced Two-Column Hero Image & Case Study Info */}
            <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
              {/* Left: Featured 4:3 Image */}
              <div className="lg:col-span-6 min-w-0">
                <div className="h-full min-h-[260px] aspect-[4/3] lg:aspect-auto w-full rounded-[var(--radius-card)] overflow-hidden border border-[var(--border-subtle)] bg-[var(--surface-1)]">
                  <img
                    src={study.imageSrc}
                    alt={study.imageAlt}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Right: Equal-Height Case Study Information Card */}
              <div className="lg:col-span-6 min-w-0 rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-[var(--surface-1)] p-6 sm:p-7 flex flex-col justify-between">
                <dl className="divide-y divide-[var(--border-subtle)]">
                  {facts.map((fact) => {
                    const Icon = fact.icon;
                    return (
                      <div
                        key={fact.label}
                        className="flex items-start gap-3.5 py-3.5 first:pt-0 last:pb-0"
                      >
                        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-2)] text-[var(--primary)]">
                          <Icon size={15} strokeWidth={1.75} />
                        </div>
                        <div className="min-w-0">
                          <dt className="text-[11px] font-semibold uppercase tracking-[0.09em] text-[var(--text-muted)]">
                            {fact.label}
                          </dt>
                          <dd className="mt-0.5 text-[14px] sm:text-[15px] leading-[1.45] text-[var(--text-primary)]">
                            {fact.value}
                          </dd>
                        </div>
                      </div>
                    );
                  })}
                </dl>
              </div>
            </div>
          </div>
        </header>

        {/* ─── 2. Editorial Two-Column Case Study Content ────────────────────────── */}
        <section className="relative py-14 sm:py-20 border-b border-[var(--border-subtle)] overflow-hidden">
          <OrbitalAccent className="absolute -bottom-12 -left-24 w-[320px] opacity-45 rotate-180" />

          <div className="relative z-10 mx-auto max-w-[1152px] px-5 md:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left: Editorial Heading */}
            <div className="lg:col-span-5 min-w-0">
              <h2
                className="text-[30px] sm:text-[36px] lg:text-[40px] font-normal leading-[1.12] text-[var(--text-primary)] max-w-[16ch]"
                style={{ fontFamily: 'var(--font-display-family)' }}
              >
                {editorialHeading}
              </h2>
              <div className="mt-5 h-0.5 w-10 rounded-full bg-[var(--primary)]" aria-hidden="true" />
            </div>

            {/* Right: Challenge, Approach, Result (if verified), Stack & CTA */}
            <div className="lg:col-span-7 min-w-0 space-y-8">
              <div className="space-y-2.5">
                <h3
                  className="text-[22px] sm:text-[24px] font-normal text-[var(--text-primary)]"
                  style={{ fontFamily: 'var(--font-display-family)' }}
                >
                  Challenge
                </h3>
                <p className="text-[15px] sm:text-[16px] leading-[1.65] text-[var(--text-secondary)] max-w-[68ch]">
                  {study.challenge}
                </p>
              </div>

              <div className="space-y-2.5">
                <h3
                  className="text-[22px] sm:text-[24px] font-normal text-[var(--text-primary)]"
                  style={{ fontFamily: 'var(--font-display-family)' }}
                >
                  Approach
                </h3>
                <p className="text-[15px] sm:text-[16px] leading-[1.65] text-[var(--text-secondary)] max-w-[68ch]">
                  {study.approach}
                </p>
              </div>

              {study.verifiedResult && (
                <div className="rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-[var(--surface-1)] p-5 space-y-1.5">
                  <p className="text-[28px] font-bold leading-none text-[var(--primary)]">
                    {study.verifiedResult.figure}
                  </p>
                  <p className="text-[15px] text-[var(--text-primary)]">
                    {study.verifiedResult.label}
                  </p>
                  <p className="text-[12px] text-[var(--text-muted)]">
                    Source: {study.verifiedResult.source}
                  </p>
                </div>
              )}

              <div className="space-y-3">
                <h3
                  className="text-[22px] sm:text-[24px] font-normal text-[var(--text-primary)]"
                  style={{ fontFamily: 'var(--font-display-family)' }}
                >
                  Stack
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {study.stack.map((tech) => {
                    const TechIcon = getTechIcon(tech);
                    return (
                      <li
                        key={tech}
                        className="inline-flex items-center gap-1.5 rounded-[var(--radius-pill)] border border-[var(--border-subtle)] bg-[var(--surface-1)] px-3.5 py-1.5 text-[13px] font-medium text-[var(--text-primary)]"
                      >
                        <TechIcon size={13} className="text-[var(--primary)] shrink-0" />
                        <span>{tech}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="pt-2">
                <PrimaryButton href="#inquiry">
                  <span>Start a conversation</span>
                  <ArrowRight size={15} />
                </PrimaryButton>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 3. More Case Studies (Asymmetric Editorial Grid) ──────────────────── */}
        <section className="py-14 sm:py-20 bg-[var(--bg-base)]">
          <div className="mx-auto max-w-[1152px] px-5 md:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <div className="flex items-center gap-2.5 mb-2.5">
                  <span className="h-3.5 w-0.5 rounded-full bg-[var(--primary)]" aria-hidden="true" />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--text-secondary)]">
                    More Case Studies
                  </span>
                </div>
                <h2
                  className="text-[28px] sm:text-[36px] font-normal leading-[1.12] text-[var(--text-primary)]"
                  style={{ fontFamily: 'var(--font-display-family)' }}
                >
                  Explore more success stories
                </h2>
              </div>

              {onBack ? (
                <button
                  type="button"
                  onClick={onBack}
                  className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors border-b border-[var(--border-subtle)] pb-1 self-start sm:self-auto cursor-pointer"
                >
                  <span>View all case studies</span>
                  <ArrowRight size={14} />
                </button>
              ) : (
                <Link
                  href="/case-studies"
                  className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors border-b border-[var(--border-subtle)] pb-1 self-start sm:self-auto"
                >
                  <span>View all case studies</span>
                  <ArrowRight size={14} />
                </Link>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {moreStudies.map((item, idx) => {
                const isFeatured = idx === 0;
                    const cardClass = `group relative overflow-hidden rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-[var(--surface-1)] hover:border-[var(--primary)] transition-colors text-left cursor-pointer focus-visible:outline-[var(--focus-ring-width)] focus-visible:outline-solid focus-visible:outline-[var(--focus-ring-color)] focus-visible:outline-offset-[var(--focus-ring-offset)] ${
                      isFeatured
                        ? 'md:col-span-2 lg:col-span-2 aspect-[16/9] md:aspect-auto md:h-[260px]'
                        : 'aspect-[4/3] md:h-[260px] md:aspect-auto'
                    }`;
                    const cardInner = (
                    <>
                      <img
                        src={item.imageSrc}
                        alt={item.imageAlt}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div
                        className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent"
                        aria-hidden="true"
                      />
                      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 flex items-end justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-white/75 mb-1 truncate">
                            {item.industry}
                          </p>
                          <h3
                            className="text-[17px] sm:text-[18px] font-normal leading-[1.2] text-white line-clamp-2"
                            style={{ fontFamily: 'var(--font-display-family)' }}
                          >
                            {item.cardTitle}
                          </h3>
                        </div>
                        <span
                          aria-hidden="true"
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--primary)] text-white transition-transform duration-200 group-hover:translate-x-0.5"
                        >
                          <ArrowRight size={14} />
                        </span>
                      </div>
                    </>
                    );

                    if (onSelectStudy) {
                return (
                    <button
                      key={item.slug}
                      type="button"
                      onClick={() => onSelectStudy(item.slug)}
                      className={cardClass}
                    >
                      {cardInner}
                    </button>
                    );
              }

                    return (
                    <Link key={item.slug} href={`/case-studies/${item.slug}`} className={cardClass}>
                      {cardInner}
                    </Link>
                    );
            })}
                  </div>
        </div>
        </section>

        {/* ─── 4. Full-Width Two-Column Contact Panel ────────────────────────────── */}
        <section id="inquiry" className="pb-16 sm:pb-24 bg-[var(--bg-base)]">
          <div className="mx-auto max-w-[1152px] px-5 md:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-[var(--radius-card-lg)] border border-[var(--border-subtle)] bg-[var(--surface-1)] p-6 sm:p-10 lg:p-12">
              <OrbitalAccent className="absolute -bottom-14 -right-14 w-[280px] opacity-50" />

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                {/* Left: Heading & Description */}
                <div className="lg:col-span-5 min-w-0 space-y-3">
                  <h2
                    className="text-[30px] sm:text-[36px] font-normal leading-[1.1] text-[var(--text-primary)]"
                    style={{ fontFamily: 'var(--font-display-family)' }}
                  >
                    Start a conversation
                  </h2>
                  <p className="text-[14px] sm:text-[15px] leading-[1.6] text-[var(--text-secondary)] max-w-[36ch]">
                    Tell our engineering team about your infrastructure, timeline, and goals.
                  </p>
                </div>

                {/* Right: Form Fields & Submit Button */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                  }}
                  className="lg:col-span-7 min-w-0 space-y-4"
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
                    <span>{submitted ? 'Inquiry received' : 'Send inquiry'}</span>
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
