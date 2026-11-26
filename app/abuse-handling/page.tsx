'use client';

import { useState } from 'react';
import {
  ArrowRight,
  Building2,
  Check,
  Lock,
  Mail,
  MapPin,
  MessageSquare,
  Minus,
  Phone,
  Plus,
  Server,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  User,
} from 'lucide-react';
import { Nav } from '@/components/nav';
import { SiteFooter } from '@/components/footer';
import { PrimaryButton, SecondaryButton } from '@/components/ui/sp-button';
import supportIllustration from '@/assets/247 expert support, always on..png';

const getImageSrc = (img: unknown): string => {
  if (!img) return '';
  if (typeof img === 'string') return img;
  if (typeof img === 'object' && img !== null && 'src' in img) {
    return String((img as { src: string }).src);
  }
  return String(img);
};

interface PlanItem {
  id: string;
  name: string;
  description: string;
  price: number;
}

const ABUSE_PLANS: PlanItem[] = [
  {
    id: 'hourly-admin',
    name: 'Hourly Administration Work',
    description: 'Minimum of 2 hours with additional administration work',
    price: 60,
  },
  {
    id: 'emergency-admin',
    name: 'Emergency Administration Work',
    description: 'Minimum of 2 hours with additional emergency administration work',
    price: 100,
  },
];

const MITIGATION_CARDS = [
  {
    icon: ShieldAlert,
    title: 'Data center abuse resolution',
    body: 'Our Level 3 engineers coordinate directly with your data center to resolve abuse tickets, spam attacks, DDoS attacks, website hacking, and server compromises.',
  },
  {
    icon: Server,
    title: 'Spam mitigation',
    body: 'Unmitigated inbound spam hurts business productivity, while outbound spam causes ISP blacklisting, lost IP reputation, and frequent downtimes from high load.',
  },
  {
    icon: Mail,
    title: 'Inbound spamming',
    body: 'Connection-level spam blocking across Exim, Postfix, qmail, and MailEnable, paired with security audits to locate exploits and pre-empt future attacks.',
  },
  {
    icon: Lock,
    title: 'Outbound spamming',
    body: 'Immediate stop by quarantining exploited accounts or killing spamming scripts, followed by a detailed vulnerability audit and full-spectrum security hardening.',
  },
];

export default function AbuseHandlingPage() {
  const [selectedPlans, setSelectedPlans] = useState<Record<string, boolean>>({});
  const [hourCounts, setHourCounts] = useState<Record<string, number>>({
    'hourly-admin': 1,
    'emergency-admin': 1,
  });
  const [cartNotice, setCartNotice] = useState<string | null>(null);
  const [formSent, setFormSent] = useState(false);
  const [message, setMessage] = useState('');

  const togglePlan = (id: string) => {
    setSelectedPlans((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const updateHourCount = (id: string, delta: number) => {
    setHourCounts((prev) => {
      const current = prev[id] ?? 1;
      const next = Math.min(99, Math.max(1, current + delta));
      return { ...prev, [id]: next };
    });
  };

  const handleAddToCart = (plan: PlanItem) => {
    const count = hourCounts[plan.id] ?? 1;
    setSelectedPlans((prev) => ({ ...prev, [plan.id]: true }));
    setCartNotice(`${plan.name} (${count} pack) added to cart.`);
  };

  return (
    <main className="bg-[var(--bg-base)] text-[var(--text-primary)] min-h-screen overflow-x-clip">
      <Nav />

      {/* ─── Hero Section ──────────────────────────────────────────────────────── */}
      <section className="pt-24 sm:pt-28 lg:pt-32 pb-10 sm:pb-12 border-b border-[var(--border-subtle)]">
        <div className="mx-auto max-w-[1152px] px-5 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 min-w-0 space-y-5">

              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[64px] leading-[1.04] text-[var(--text-primary)] tracking-tight">
                Server abuse handling
                <span className="text-[var(--primary)]">.</span>
              </h1>

              <p className="text-[15px] sm:text-[17px] leading-relaxed text-[var(--text-secondary)] max-w-[580px]">
                SupportPRO helps you handle abuse issues that need quick action. Our Level 3 engineers resolve data center abuse tickets, spam attacks, DDoS attacks, website hacking, and server hacking.
              </p>

              <div className="pt-1 flex flex-wrap items-center gap-3 sm:gap-4">
                <PrimaryButton href="#plans">
                  <span>Compare plans</span>
                  <ArrowRight size={15} />
                </PrimaryButton>
                <SecondaryButton href="#contact">
                  <span>Talk to an engineer</span>
                </SecondaryButton>
              </div>
            </div>

            <div className="lg:col-span-5 min-w-0 flex items-center justify-center">
              <img
                src={getImageSrc(supportIllustration)}
                alt="Server abuse handling and spam mitigation"
                className="w-full max-w-[300px] sm:max-w-[340px] lg:max-w-[360px] h-auto object-contain rounded-[var(--radius-card)]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Plans Section (Visible on Desktop Without Scrolling) ──────────────── */}
      <section id="plans" className="py-10 sm:py-16 lg:py-24 bg-[var(--bg-surface)] border-b border-[var(--border-subtle)]">
        <div className="mx-auto max-w-[1152px] px-5 md:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
            <div>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl leading-[1.08] text-[var(--text-primary)] tracking-tight">
                Available plans
                <span className="text-[var(--primary)]">.</span>
              </h2>
              <p className="text-sm sm:text-[15px] text-[var(--text-secondary)] mt-2">
                Minimum of 2 hours per engagement. Choose standard or emergency abuse response.
              </p>
            </div>
            <span className="text-xs font-mono text-[var(--text-muted)] shrink-0">
              {ABUSE_PLANS.length} plans available
            </span>
          </div>

          {cartNotice && (
            <div
              role="status"
              aria-live="polite"
              className="mb-5 rounded-[var(--radius-card)] border border-[var(--success)] bg-[var(--bg-surface)] px-4 py-3 text-sm text-[var(--success)] flex items-center justify-between gap-4"
            >
              <span>{cartNotice}</span>
              <a
                href="#contact"
                className="text-xs font-semibold text-[var(--primary)] hover:underline shrink-0"
              >
                Proceed to quote
              </a>
            </div>
          )}

          <div className="space-y-4">
            {ABUSE_PLANS.map((plan) => {
              const isSelected = Boolean(selectedPlans[plan.id]);
              const count = hourCounts[plan.id] ?? 1;
              const total = (plan.price * count).toFixed(2);

              return (
                <div
                  key={plan.id}
                  className="rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-[var(--surface-2)] p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4 lg:gap-6"
                >
                  <div className="flex items-start gap-3.5 min-w-0 flex-1">
                    <button
                      type="button"
                      role="checkbox"
                      aria-checked={isSelected}
                      aria-label={`Select ${plan.name}`}
                      suppressHydrationWarning
                      onClick={() => togglePlan(plan.id)}
                      className={`mt-0.5 w-5 h-5 rounded flex items-center justify-center border shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-[var(--primary)] border-[var(--primary)] text-[var(--primary-foreground)]'
                          : 'border-[var(--border-strong)] bg-[var(--surface-2)] text-transparent'
                      }`}
                    >
                      {isSelected && <Check size={14} strokeWidth={3} />}
                    </button>

                    <div className="min-w-0">
                      <h3 className="text-base sm:text-lg font-semibold text-[var(--text-primary)] leading-snug">
                        {plan.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1 leading-relaxed">
                        {plan.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between lg:justify-end gap-4 sm:gap-6 pl-8 lg:pl-0">
                    <div className="flex items-center gap-2.5">
                      <span
                        id={`hours-label-${plan.id}`}
                        className="text-xs sm:text-sm text-[var(--text-secondary)] font-medium"
                      >
                        Hours
                      </span>
                      <div
                        role="group"
                        aria-labelledby={`hours-label-${plan.id}`}
                        className="inline-flex items-center rounded-[var(--radius-pill)] border border-[var(--border-strong)] bg-[var(--surface-2)] p-1"
                      >
                        <button
                          type="button"
                          suppressHydrationWarning
                          onClick={() => updateHourCount(plan.id, -1)}
                          disabled={count <= 1}
                          aria-label={`Decrease hours pack for ${plan.name}`}
                          className="w-7 h-7 rounded-[var(--radius-pill)] flex items-center justify-center text-[var(--text-primary)] hover:bg-[var(--border-subtle)] disabled:opacity-30 transition-colors"
                        >
                          <Minus size={13} strokeWidth={2.5} />
                        </button>
                        <span
                          aria-live="polite"
                          className="w-8 text-center text-sm font-semibold text-[var(--text-primary)] select-none"
                        >
                          {count}
                        </span>
                        <button
                          type="button"
                          suppressHydrationWarning
                          onClick={() => updateHourCount(plan.id, 1)}
                          aria-label={`Increase hours pack for ${plan.name}`}
                          className="w-7 h-7 rounded-[var(--radius-pill)] flex items-center justify-center text-[var(--text-primary)] hover:bg-[var(--border-subtle)] transition-colors"
                        >
                          <Plus size={13} strokeWidth={2.5} />
                        </button>
                      </div>
                    </div>

                    <div className="text-left sm:text-right min-w-[110px]">
                      <span className="text-lg sm:text-xl font-bold text-[var(--text-primary)]">
                        ${total}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2.5">
                      <SecondaryButton
                        href="#mitigation"
                        className="px-5 py-2.5 text-xs sm:text-sm"
                      >
                        Compare plans
                      </SecondaryButton>
                      <PrimaryButton
                        type="button"
                        suppressHydrationWarning
                        onClick={() => handleAddToCart(plan)}
                        className="px-6 py-2.5 text-xs sm:text-sm"
                      >
                        Add to cart
                      </PrimaryButton>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Spam Mitigation & Security Section (2-Column Grid of 16px Cards) ──── */}
      <section id="mitigation" className="py-16 sm:py-20 lg:py-24 border-b border-[var(--border-subtle)]">
        <div className="mx-auto max-w-[1152px] px-5 md:px-6 lg:px-8">
          <div className="mb-8 sm:mb-12 max-w-[740px]">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl leading-[1.08] text-[var(--text-primary)] tracking-tight">
              Spam mitigation &amp; abuse response
              <span className="text-[var(--primary)]">.</span>
            </h2>
            <p className="text-sm sm:text-[15px] text-[var(--text-secondary)] mt-3 leading-relaxed">
              Consult our experts to stop active abuse and harden your mail, web, FTP, and control panel services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {MITIGATION_CARDS.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className="rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 space-y-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-[var(--radius-card)] bg-[var(--surface-2)] border border-[var(--border-subtle)] text-[var(--primary)] flex items-center justify-center shrink-0">
                      <Icon size={18} strokeWidth={1.75} />
                    </span>
                    <h3 className="text-base sm:text-lg font-semibold text-[var(--text-primary)]">
                      {card.title}
                    </h3>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {card.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Custom Plan Section ───────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[var(--bg-surface)] border-b border-[var(--border-subtle)]">
        <div className="mx-auto max-w-[1152px] px-5 md:px-6 lg:px-8">
          <div className="rounded-[var(--radius-card)] border border-[var(--border-subtle)] border-t-2 border-t-[var(--primary)] bg-[var(--surface-2)] p-6 sm:p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-[var(--primary)]">
                <Sparkles size={14} />
                <span>Custom SLA</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-[var(--text-primary)] tracking-tight">
                Need a custom plan?
              </h2>
              <p className="text-sm sm:text-[15px] text-[var(--text-secondary)] leading-relaxed">
                Custom SLAs and dedicated engineers for multi-cloud setups. Reply within [X] business hours, verify.
              </p>
            </div>
            <PrimaryButton href="#contact" className="shrink-0">
              <span>Request a quote</span>
              <ArrowRight size={15} />
            </PrimaryButton>
          </div>
        </div>
      </section>

      {/* ─── Contact Section ───────────────────────────────────────────────────── */}
      <section id="contact" className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[1152px] px-5 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-5 space-y-6">
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl leading-[1.08] text-[var(--text-primary)] tracking-tight">
                Talk to an engineer
                <span className="text-[var(--primary)]">.</span>
              </h2>

              <div className="rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 space-y-4">
                <h3 className="text-base font-semibold text-[var(--text-primary)] flex items-center gap-2">
                  <Phone size={17} className="text-[var(--primary)]" />
                  <span>Sales and support</span>
                </h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-[var(--text-muted)] block text-xs">Phone</span>
                    <a
                      href="tel:18476076123"
                      className="font-medium text-[var(--text-primary)] hover:text-[var(--primary)] transition-colors"
                    >
                      1-(847)-607-6123
                    </a>
                  </div>
                  <div>
                    <span className="text-[var(--text-muted)] block text-xs">Sales</span>
                    <a
                      href="mailto:sales@supportpro.com"
                      className="font-medium text-[var(--text-primary)] hover:text-[var(--primary)] transition-colors"
                    >
                      sales@supportpro.com
                    </a>
                  </div>
                  <div>
                    <span className="text-[var(--text-muted)] block text-xs">Support</span>
                    <a
                      href="mailto:support@supportpro.com"
                      className="font-medium text-[var(--text-primary)] hover:text-[var(--primary)] transition-colors"
                    >
                      support@supportpro.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 space-y-3">
                <h3 className="text-base font-semibold text-[var(--text-primary)] flex items-center gap-2">
                  <MapPin size={17} className="text-[var(--primary)]" />
                  <span>Postal address</span>
                </h3>
                <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                  1020 Milwaukee Ave, #245,
                  <br />
                  Deerfield, IL-60015
                  <br />
                  USA
                </p>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 sm:p-8 md:p-10">
                <h3 className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)] mb-6">
                  Request a quote
                </h3>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setFormSent(true);
                  }}
                  className="space-y-4 sm:space-y-5"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div className="relative">
                      <User
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
                        size={16}
                      />
                      <input
                        required
                        suppressHydrationWarning
                        placeholder="Full name"
                        className="w-full rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-[var(--surface-2)] pl-11 pr-4 py-3 text-sm text-[var(--text-primary)] outline-none transition-colors placeholder:text-[var(--text-muted)] focus:border-[var(--primary)]"
                      />
                    </div>
                    <div className="relative">
                      <Mail
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
                        size={16}
                      />
                      <input
                        required
                        type="email"
                        suppressHydrationWarning
                        placeholder="Work email"
                        className="w-full rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-[var(--surface-2)] pl-11 pr-4 py-3 text-sm text-[var(--text-primary)] outline-none transition-colors placeholder:text-[var(--text-muted)] focus:border-[var(--primary)]"
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <Building2
                      size={16}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
                    />
                    <input
                      placeholder="Company"
                      suppressHydrationWarning
                      className="w-full rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-[var(--surface-2)] pl-11 pr-4 py-3 text-sm text-[var(--text-primary)] outline-none transition-colors placeholder:text-[var(--text-muted)] focus:border-[var(--primary)]"
                    />
                  </div>

                  <div className="relative">
                    <MessageSquare
                      className="absolute left-4 top-4 text-[var(--text-muted)]"
                      size={16}
                    />
                    <textarea
                      required
                      rows={4}
                      maxLength={500}
                      suppressHydrationWarning
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Describe the abuse ticket, spam issue, or server compromise"
                      className="w-full resize-none rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-[var(--surface-2)] pl-11 pr-4 pt-3 pb-8 text-sm text-[var(--text-primary)] outline-none transition-colors placeholder:text-[var(--text-muted)] focus:border-[var(--primary)]"
                    />
                    <span className="absolute right-4 bottom-3 text-xs text-[var(--text-muted)] font-mono select-none">
                      {message.length} / 500
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                    <ShieldCheck size={16} className="text-[var(--primary)] shrink-0" />
                    <span>Your information is secure and will never be shared.</span>
                  </div>

                  <PrimaryButton
                    type="submit"
                    suppressHydrationWarning
                    className="w-full py-3.5 px-6"
                  >
                    <span>{formSent ? 'Request received' : 'Request a quote'}</span>
                    <ArrowRight size={16} />
                  </PrimaryButton>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
