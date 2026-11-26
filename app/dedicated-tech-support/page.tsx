'use client';

import { useState } from 'react';
import {
  Activity,
  ArrowRight,
  Award,
  Building2,
  Check,
  Clock,
  Cpu,
  Headphones,
  Layers,
  Lock,
  Mail,
  MapPin,
  MessageSquare,
  Minus,
  Phone,
  Plus,
  ShieldCheck,
  Sparkles,
  User,
  Users,
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
  featured?: boolean;
}

const SHARED_PLAN: PlanItem = {
  id: 'shared-dedicated-team',
  name: 'Shared Dedicated Team',
  description: 'Shared Dedicated: 24/7 Team',
  price: 2250,
  featured: true,
};

const STAFF_LEVEL_PLANS: PlanItem[] = [
  {
    id: 'l1',
    name: 'Dedicated Staff Support - L1',
    description: '8 hours x 5 days per week dedicated level 1 staff support/month',
    price: 1050,
  },
  {
    id: 'l2',
    name: 'Dedicated Staff Support - L2',
    description: '8 hours x 5 days per week dedicated level 2 staff support/month',
    price: 1350,
  },
  {
    id: 'l3',
    name: 'Dedicated Staff Support - L3',
    description: '8 hours x 5 days per week dedicated level 3 staff support/month',
    price: 1650,
  },
  {
    id: 'l4',
    name: 'Dedicated Staff Support - L4 - Team Manager',
    description: '8 hours x 5 days per week dedicated Level 4 - Team Manager support/month',
    price: 2000,
  },
];

const ALL_PLANS = [SHARED_PLAN, ...STAFF_LEVEL_PLANS];

const BENEFITS = [
  { text: 'Well trained RHCE and MCSE certified engineers dedicated to working only for your company', icon: Award },
  { text: 'Friendly atmosphere for easy interaction between both parties', icon: Users },
  { text: 'Cheaper than maintaining an in-house tech support team', icon: Activity },
  { text: 'All advanced administration works handled efficiently', icon: Cpu },
  { text: 'The support team is trained on your line of business, systems, and processes', icon: Layers },
  { text: 'Intellectual property protection assured', icon: Lock },
  { text: 'Flexible timing likes 4 hours, 8 hours, 12 hours, and 24 hours', icon: Clock },
  { text: 'Available 24/7', icon: Headphones },
];

export default function DedicatedTechSupportPage() {
  const [selectedPlans, setSelectedPlans] = useState<Record<string, boolean>>({});
  const [staffCounts, setStaffCounts] = useState<Record<string, number>>({
    'shared-dedicated-team': 1,
    l1: 1,
    l2: 1,
    l3: 1,
    l4: 1,
  });
  const [cartNotice, setCartNotice] = useState<string | null>(null);
  const [formSent, setFormSent] = useState(false);
  const [message, setMessage] = useState('');

  const togglePlan = (id: string) => {
    setSelectedPlans((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const updateStaffCount = (id: string, delta: number) => {
    setStaffCounts((prev) => {
      const current = prev[id] ?? 1;
      const next = Math.min(99, Math.max(1, current + delta));
      return { ...prev, [id]: next };
    });
  };

  const handleAddToCart = (plan: PlanItem) => {
    const count = staffCounts[plan.id] ?? 1;
    setSelectedPlans((prev) => ({ ...prev, [plan.id]: true }));
    setCartNotice(`${plan.name} (${count} staff) added to cart.`);
  };

  const renderPlanRow = (plan: PlanItem) => {
    const isSelected = Boolean(selectedPlans[plan.id]);
    const count = staffCounts[plan.id] ?? 1;
    const total = (plan.price * count).toFixed(2);

    return (
      <div
        key={plan.id}
        className="rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-[var(--surface-2)] p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4 lg:gap-6"
      >
        {/* Plan Checkbox, Title & Description */}
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

        {/* Staff Count, Price, and Actions */}
        <div className="flex flex-wrap items-center justify-between lg:justify-end gap-4 sm:gap-6 pl-8 lg:pl-0">
          <div className="flex items-center gap-2.5">
            <span
              id={`staff-label-${plan.id}`}
              className="text-xs sm:text-sm text-[var(--text-secondary)] font-medium"
            >
              Staff count
            </span>
            <div
              role="group"
              aria-labelledby={`staff-label-${plan.id}`}
              className="inline-flex items-center rounded-[var(--radius-pill)] border border-[var(--border-strong)] bg-[var(--surface-2)] p-1"
            >
              <button
                type="button"
                suppressHydrationWarning
                onClick={() => updateStaffCount(plan.id, -1)}
                disabled={count <= 1}
                aria-label={`Decrease staff count for ${plan.name}`}
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
                onClick={() => updateStaffCount(plan.id, 1)}
                aria-label={`Increase staff count for ${plan.name}`}
                className="w-7 h-7 rounded-[var(--radius-pill)] flex items-center justify-center text-[var(--text-primary)] hover:bg-[var(--border-subtle)] transition-colors"
              >
                <Plus size={13} strokeWidth={2.5} />
              </button>
            </div>
          </div>

          <div className="text-left sm:text-right min-w-[130px]">
            <span className="text-lg sm:text-xl font-bold text-[var(--text-primary)]">
              ${total}
            </span>
            <span className="text-xs text-[var(--text-secondary)] ml-1">/ month</span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <SecondaryButton
              href="#benefits"
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
  };

  return (
    <main className="bg-[var(--bg-base)] text-[var(--text-primary)] min-h-screen overflow-x-clip">
      <Nav />

      {/* ─── Hero Section ──────────────────────────────────────────────────────── */}
      <section className="pt-24 sm:pt-28 lg:pt-32 pb-10 sm:pb-12 border-b border-[var(--border-subtle)]">
        <div className="mx-auto max-w-[1152px] px-5 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Text Block */}
            <div className="lg:col-span-7 min-w-0 space-y-5">

              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[64px] leading-[1.04] text-[var(--text-primary)] tracking-tight">
                Dedicated tech support
                <span className="text-[var(--primary)]">.</span>
              </h1>

              <p className="text-[15px] sm:text-[17px] leading-relaxed text-[var(--text-secondary)] max-w-[560px]">
                Engineers who work only for your company, on the hours you choose.
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

            {/* Right Support Illustration — vertically centered */}
            <div className="lg:col-span-5 min-w-0 flex items-center justify-center">
              <img
                src={getImageSrc(supportIllustration)}
                alt="Dedicated tech support engineers"
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
                Billed per month. Choose a team level and the hours you need.
              </p>
            </div>
            <span className="text-xs font-mono text-[var(--text-muted)] shrink-0">
              {ALL_PLANS.length} plans available
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

          {/* Shared Dedicated Team — standalone card above the four staff levels */}
          <div className="space-y-4">
            {renderPlanRow(SHARED_PLAN)}
          </div>

          {/* Four Staff Levels */}
          <div className="mt-6 space-y-4">
            {STAFF_LEVEL_PLANS.map((plan) => renderPlanRow(plan))}
          </div>
        </div>
      </section>

      {/* ─── Benefits Section (2-Column Grid of 16px Cards) ────────────────────── */}
      <section id="benefits" className="py-16 sm:py-20 lg:py-24 border-b border-[var(--border-subtle)]">
        <div className="mx-auto max-w-[1152px] px-5 md:px-6 lg:px-8">
          <div className="mb-8 sm:mb-12 max-w-[720px]">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl leading-[1.08] text-[var(--text-primary)] tracking-tight">
              Why dedicated staff support
              <span className="text-[var(--primary)]">.</span>
            </h2>
            <p className="text-sm sm:text-[15px] text-[var(--text-secondary)] mt-3 leading-relaxed">
              We offer a wide variation of custom plans with dedicated staff based on your operations, server type, and support schedule.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {BENEFITS.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={benefit.text}
                  className="rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 flex items-start gap-4"
                >
                  <span className="w-10 h-10 rounded-[var(--radius-card)] bg-[var(--surface-2)] border border-[var(--border-subtle)] text-[var(--primary)] flex items-center justify-center shrink-0">
                    <Icon size={18} strokeWidth={1.75} />
                  </span>
                  <p className="text-sm sm:text-[15px] text-[var(--text-primary)] leading-relaxed pt-1">
                    {benefit.text}
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
            {/* Left Column: Contact Details */}
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

            {/* Right Column: Quote Form */}
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
                      placeholder="Tell us about your team level, hours, and server setup"
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
