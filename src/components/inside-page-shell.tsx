'use client';

import { useState } from 'react';
import { ArrowRight, FileText, Mail, User } from 'lucide-react';
import { PrimaryButton } from '@/components/ui/sp-button';

export function InsidePageOrbital({ className = '' }: { className?: string }) {
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

export function InsideSectionEyebrow({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2.5 mb-3">
      <span className="h-0.5 w-4 rounded-full bg-[var(--primary)]" aria-hidden="true" />
      <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--text-secondary)]">
        {label}
      </span>
    </div>
  );
}

export function InsideContactPanel({
  heading = 'Tell us about your project.',
  description = 'Share your platform goals, timeline, and technical requirements with our team.',
  submitLabel = 'Request For Quote',
}: {
  heading?: string;
  description?: string;
  submitLabel?: string;
}) {
  const [formSent, setFormSent] = useState(false);

  return (
    <section id="contact" className="py-14 sm:py-20 bg-[var(--bg-base)]">
      <div className="mx-auto max-w-[1152px] px-5 md:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[var(--radius-card-lg)] border border-[var(--border-subtle)] bg-[var(--surface-1)] p-6 sm:p-10 lg:p-12">
          <InsidePageOrbital className="absolute -bottom-14 -right-14 w-[280px] opacity-50" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            <div className="lg:col-span-5 min-w-0 space-y-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--text-muted)]">
                Contact Us
              </p>
              <h2
                className="text-[30px] sm:text-[36px] font-normal leading-[1.1] text-[var(--text-primary)]"
                style={{ fontFamily: 'var(--font-display-family)' }}
              >
                {heading}
              </h2>
              <div className="h-0.5 w-10 rounded-full bg-[var(--primary)]" aria-hidden="true" />
              <p className="pt-1 text-[14px] leading-[1.6] text-[var(--text-secondary)] max-w-[36ch]">
                {description}
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setFormSent(true);
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
                <span>{formSent ? 'Request Received' : submitLabel}</span>
                <ArrowRight size={15} />
              </PrimaryButton>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
