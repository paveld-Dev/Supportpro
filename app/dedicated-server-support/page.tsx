'use client';

import { useState, useRef, type ReactNode } from 'react';
import { motion, useInView } from 'motion/react';
import {
  ShieldCheck,
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  Building2,
  User,
  Server,
  Globe,
  Activity,
  Gauge,
  Check,
  Plus,
  Minus,
  ShoppingBag,
  Code,
  Terminal,
  Wifi,
} from 'lucide-react';
import { Nav } from '@/components/nav';
import { SiteFooter } from '@/components/footer';
import { InsidePageOrbital, InsideSectionEyebrow, InsideContactPanel } from '@/components/inside-page-shell';
import { PrimaryButton, SecondaryButton } from '@/components/ui/sp-button';
import ParticleBadge, { GlobalBadgeSpotlight } from '@/components/MagicBadge';
import imgNodeVirtualization from '@/assets/node-server-virtualization.png';
import imgNodeManagementIcon from '@/assets/illustration/nodemanagementicon.png';

const getImageSrc = (img: any): string => {
  if (!img) return '';
  if (typeof img === 'string') return img;
  if (typeof img === 'object' && 'src' in img) return img.src;
  return String(img);
};

function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 1, y: 0 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function DedicatedServerSupportPage() {
  const [formSent, setFormSent] = useState(false);
  const [message, setMessage] = useState('');
  const [adminSelected, setAdminSelected] = useState(true);
  const [adminCount, setAdminCount] = useState(1);
  const [securitySelected, setSecuritySelected] = useState(false);
  const [securityCount, setSecurityCount] = useState(1);

  const featureGridRef = useRef<HTMLDivElement>(null);
  const industryGridRef = useRef<HTMLDivElement>(null);

  const featureItems = [
    {
      num: '01',
      title: '24/7/365 access to Level 3 engineers by email or live chat',
      icon: Activity,
    },
    {
      num: '02',
      title: 'State of the art infrastructure for complete reliability',
      icon: Server,
    },
    {
      num: '03',
      title: 'Software hardening to protect the integrity of your server',
      icon: ShieldCheck,
    },
    {
      num: '04',
      title: 'Monitoring your servers health proactively',
      icon: Gauge,
    },
  ];

  const coverageTasks = [
    'Installing software',
    'Upgrading software and applying patches',
    'Configuration changes',
    'Control panel upgrades',
    'Log files interpretation',
    'Installing/updating firewalls',
    'Installing secure (SSL) certificates',
    'Restarting services',
    'Rebooting by contacting the data center',
    'Monthly server reports',
    'DNS issues',
    'Backup configuration',
    'Kernel upgrades',
    'PHP installation, configuration & upgrade',
    'Installation of other services',
    'Hardening and tuning of servers',
    'Security settings',
    'Server migration',
  ];

  const industryItems = [
    { name: 'Web Hosting Services', icon: Server },
    { name: 'Service Providers', icon: Globe },
    { name: 'E-Commerce Companies', icon: ShoppingBag },
    { name: 'Software Vendors', icon: Code },
    { name: 'Web Developers', icon: Terminal },
    { name: 'ISPs', icon: Wifi },
  ];

  return (
    <main className="bg-[var(--bg-base)] text-[var(--text-primary)] min-h-screen overflow-x-clip transition-colors duration-300">
      <Nav />

      {/* ─── SECTION 1: Dedicated Server Support (Hero / Intro) ───────────────── */}
      <section className="relative pt-32 sm:pt-40 lg:pt-48 pb-16 sm:pb-24 lg:pb-28 overflow-hidden border-b border-[var(--border-subtle)]">
        <InsidePageOrbital className="absolute -bottom-10 -left-20 w-[340px] opacity-55 rotate-180" />
        <InsidePageOrbital className="absolute -top-6 -right-16 w-[380px] opacity-65" />
        <div className="relative mx-auto max-w-[1152px] px-5 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <Reveal>
                <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[72px] leading-[1.04] text-[var(--text-primary)] tracking-tight">
                  Dedicated Server Support
                  <span className="text-[var(--primary)]">.</span>
                </h1>
              </Reveal>

              <Reveal delay={0.1}>
                <p className="text-[15px] sm:text-[16px] md:text-[17px] leading-relaxed text-[var(--text-secondary)] max-w-[640px] font-normal">
                  Nobody takes support and customer care more seriously than SupportPRO. We provide support 24 hours a
                  day, seven days a week, 365 days a year. What’s more, heroic support technicians are dedicated to
                  taking ownership of your issue, no matter what is causing it, and getting to the root of the problem
                  often in 30 minutes, or less.
                </p>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <PrimaryButton href="#plans">
                    <span>Available Plans</span>
                    <ArrowRight size={15} />
                  </PrimaryButton>
                  <SecondaryButton href="#contact" className="bg-white/50 dark:bg-white/5">
                    <span>Contact Us</span>
                  </SecondaryButton>
                </div>
              </Reveal>
            </div>

            {/* Right Visual Image */}
            <div className="lg:col-span-5 flex items-center justify-center">
              <Reveal delay={0.2} className="w-full flex justify-center">
                <img
                  src={getImageSrc(imgNodeVirtualization)}
                  alt="Dedicated Server Support & Administration"
                  className="w-full max-w-[460px] h-auto object-contain transition-transform duration-300 hover:scale-[1.02]"
                />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 2: Dedicated Server Management & Proactive Care ─────────── */}
      <section id="services" className="py-16 sm:py-20 lg:py-28 bg-[var(--surface-1)] border-b border-[var(--border-subtle)]">
        <div className="mx-auto max-w-[1152px] px-5 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 items-center">
            {/* Visual Image Column */}
            <div className="lg:col-span-5 order-2 lg:order-1 flex items-center justify-center">
              <Reveal delay={0.1} className="w-full flex justify-center">
                <img
                  src={getImageSrc(imgNodeManagementIcon)}
                  alt="Dedicated Server Administration"
                  className="w-full max-w-[340px] sm:max-w-[380px] h-auto object-contain transition-transform duration-300 hover:scale-[1.02]"
                />
              </Reveal>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
              <Reveal>
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl leading-[1.08] text-[var(--text-primary)] tracking-tight">
                  Dedicated Server Administration
                  <span className="text-[var(--primary)]">.</span>
                </h2>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="space-y-4 text-[14px] sm:text-[15px] md:text-[16px] leading-relaxed text-[var(--text-secondary)]">
                  <p>
                    Our Server Management Service helps you take care of your servers with weekly audits and server
                    monitoring with support assistance. We provide 24/7/365 support through Live Chat and Email with
                    a response time of less than 30 minutes, proactively checking server health and taking preventive
                    actions.
                  </p>
                  <p>
                    The Server Administration Plan is built for companies and individuals who want their Linux
                    (Debian, CentOS, Ubuntu) and Windows servers running around the clock. Whenever downtime is
                    detected, our engineers take immediate steps to bring your server online — including contacting the
                    data center directly for a reboot before you ever have to report an issue.
                  </p>
                  <p className="text-ink/80 dark:text-white/80 font-medium">
                    Includes monthly security/optimization audits, weekly status reports, a $10 discount for each
                    additional server, and an optional Server Monitoring Plan starting at $20/server (5-server minimum).
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 3: 4 Core Pillars + 18 Administration Tasks ──────────────── */}
      <section className="py-16 sm:py-20 lg:py-28 bg-[var(--bg-base)] border-b border-[var(--border-subtle)] relative">
        <GlobalBadgeSpotlight gridRef={featureGridRef} spotlightRadius={400} />
        <div className="mx-auto max-w-[1152px] px-5 md:px-6 lg:px-8 relative z-10">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 sm:mb-14">
              <div>
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl leading-[1.08] text-[var(--text-primary)] max-w-[820px] tracking-tight">
                  Complete Server Reliability &amp; Care
                  <span className="text-[var(--primary)]">:</span>
                </h2>
              </div>
              <span className="text-xs font-mono text-muted-foreground dark:text-white/40 shrink-0">
                4 Core Guarantees
              </span>
            </div>
          </Reveal>

          {/* 4 Core Pillars */}
          <div ref={featureGridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {featureItems.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <Reveal key={item.num} delay={0.04 * idx} className="h-full">
                  <ParticleBadge
                    enableStars={true}
                    clickEffect={true}
                    particleCount={4}
                    enableTilt={false}
                    className="relative w-full h-full min-h-[210px] sm:min-h-[230px] rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-[var(--surface-2)] p-6 flex flex-col justify-between hover:border-[var(--primary)]/40 transition-all duration-300 shadow-sm hover:shadow-lg group cursor-pointer !items-stretch !justify-between"
                  >
                    <div className="w-full h-full flex flex-col justify-between">
                      <div className="w-full flex items-center justify-between">
                        <div className="w-12 h-12 rounded-[var(--radius-card)] bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center shrink-0 border border-[var(--primary)]/15 group-hover:bg-[var(--primary)] group-hover:text-white transition-all duration-300 shadow-sm">
                          <IconComp size={24} strokeWidth={1} />
                        </div>
                        <span className="text-sm font-mono font-bold text-ink/40 dark:text-white/40 group-hover:text-[var(--primary)] transition-colors select-none">
                          {item.num}
                        </span>
                      </div>
                      <div className="w-full mt-auto pt-6">
                        <h3 className="text-[15px] sm:text-[16px] font-semibold text-[var(--text-primary)] leading-snug tracking-tight group-hover:text-[var(--primary)] transition-colors">
                          {item.title}
                        </h3>
                      </div>
                    </div>
                  </ParticleBadge>
                </Reveal>
              );
            })}
          </div>

          {/* 18-item Server Administration Coverage Checklist */}
          <Reveal delay={0.1}>
            <div className="mt-12 sm:mt-16 rounded-[var(--radius-card-lg)] border border-[var(--border-subtle)] bg-[var(--surface-2)] p-6 sm:p-8 md:p-10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-[var(--border-subtle)]">
                <h3 className="font-display text-2xl sm:text-3xl text-[var(--text-primary)] tracking-tight">
                  What We Take Care Of
                  <span className="text-[var(--primary)]">.</span>
                </h3>
                <span className="text-xs font-mono text-muted-foreground dark:text-white/40">
                  Linux (Debian, CentOS, Ubuntu) &amp; Windows Servers
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {coverageTasks.map((task) => (
                  <div
                    key={task}
                    className="flex items-center gap-3 rounded-xl border border-ink/8 dark:border-white/8 bg-cream/40 dark:bg-white/[0.03] px-4 py-3"
                  >
                    <span className="w-5 h-5 rounded-full bg-[var(--primary)]/15 text-[var(--primary)] flex items-center justify-center shrink-0">
                      <Check size={12} strokeWidth={3} />
                    </span>
                    <span className="text-[13px] sm:text-[14px] font-medium text-[var(--text-primary)]/90">
                      {task}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── SECTION 4: Available Plans ───────────────────────────────────────── */}
      <section id="plans" className="py-16 sm:py-20 lg:py-28 bg-[var(--surface-1)] border-b border-[var(--border-subtle)]">
        <div className="mx-auto max-w-[1152px] px-5 md:px-6 lg:px-8">
          <Reveal>
            <div className="flex items-center justify-between gap-4 mb-6">
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl leading-tight text-[var(--text-primary)] tracking-tight">
                Available Plans
                <span className="text-[var(--primary)]">.</span>
              </h2>
              <span className="text-xs font-mono text-muted-foreground dark:text-white/40">
                Transparent Pricing
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-[var(--surface-2)] p-6 sm:p-8 space-y-6">
              {/* Plan 1: Server Administration ($100.00) */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6 pb-6 border-b border-[var(--border-subtle)]">
                <div className="flex items-start gap-3.5">
                  <button
                    type="button"
                    suppressHydrationWarning
                    onClick={() => setAdminSelected(!adminSelected)}
                    className={`mt-0.5 w-5 h-5 rounded flex items-center justify-center border transition-colors ${
                      adminSelected
                        ? 'bg-[var(--primary)] border-[var(--primary)] text-white'
                        : 'border-ink/20 dark:border-white/20 bg-white dark:bg-black/20'
                    }`}
                  >
                    {adminSelected && <Check size={14} strokeWidth={3} />}
                  </button>

                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-[var(--text-primary)]">
                      Server Administration
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground dark:text-white/60 mt-0.5">
                      Shared server administration/month/server
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-6 sm:gap-10 pl-8 md:pl-0">
                  <div className="flex items-center gap-2.5">
                    <div className="inline-flex items-center rounded-full border border-ink/15 dark:border-white/20 bg-white dark:bg-black/30 p-1">
                      <button
                        type="button"
                        suppressHydrationWarning
                        onClick={() => setAdminCount((prev) => Math.max(1, prev - 1))}
                        disabled={adminCount <= 1}
                        aria-label="Decrease quantity"
                        className="w-7 h-7 rounded-full flex items-center justify-center text-ink/70 dark:text-white/70 hover:bg-ink/5 dark:hover:bg-white/10 disabled:opacity-30 transition-colors"
                      >
                        <Minus size={13} strokeWidth={2.5} />
                      </button>
                      <span className="w-8 text-center text-sm font-semibold text-[var(--text-primary)] select-none">
                        {adminCount}
                      </span>
                      <button
                        type="button"
                        suppressHydrationWarning
                        onClick={() => setAdminCount((prev) => Math.min(99, prev + 1))}
                        aria-label="Increase quantity"
                        className="w-7 h-7 rounded-full flex items-center justify-center text-ink/70 dark:text-white/70 hover:bg-ink/5 dark:hover:bg-white/10 transition-colors"
                      >
                        <Plus size={13} strokeWidth={2.5} />
                      </button>
                    </div>
                    <span className="text-xs sm:text-sm text-ink/80 dark:text-white/80 font-medium">
                      Servers<span className="text-red-500 font-bold ml-0.5">*</span>
                    </span>
                  </div>

                  <div className="text-right min-w-[80px]">
                    <span className="text-base sm:text-lg font-bold text-[var(--text-primary)]">
                      ${(100 * adminCount).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Plan 2: Server Security Administration ($90.00) */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6 pb-6 border-b border-[var(--border-subtle)]">
                <div className="flex items-start gap-3.5">
                  <button
                    type="button"
                    suppressHydrationWarning
                    onClick={() => setSecuritySelected(!securitySelected)}
                    className={`mt-0.5 w-5 h-5 rounded flex items-center justify-center border transition-colors ${
                      securitySelected
                        ? 'bg-[var(--primary)] border-[var(--primary)] text-white'
                        : 'border-ink/20 dark:border-white/20 bg-white dark:bg-black/20'
                    }`}
                  >
                    {securitySelected && <Check size={14} strokeWidth={3} />}
                  </button>

                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-[var(--text-primary)]">
                      Server Security Administration
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground dark:text-white/60 mt-0.5">
                      One time server security administration per server
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-6 sm:gap-10 pl-8 md:pl-0">
                  <div className="flex items-center gap-2.5">
                    <div className="inline-flex items-center rounded-full border border-ink/15 dark:border-white/20 bg-white dark:bg-black/30 p-1">
                      <button
                        type="button"
                        suppressHydrationWarning
                        onClick={() => setSecurityCount((prev) => Math.max(1, prev - 1))}
                        disabled={securityCount <= 1}
                        aria-label="Decrease quantity"
                        className="w-7 h-7 rounded-full flex items-center justify-center text-ink/70 dark:text-white/70 hover:bg-ink/5 dark:hover:bg-white/10 disabled:opacity-30 transition-colors"
                      >
                        <Minus size={13} strokeWidth={2.5} />
                      </button>
                      <span className="w-8 text-center text-sm font-semibold text-[var(--text-primary)] select-none">
                        {securityCount}
                      </span>
                      <button
                        type="button"
                        suppressHydrationWarning
                        onClick={() => setSecurityCount((prev) => Math.min(99, prev + 1))}
                        aria-label="Increase quantity"
                        className="w-7 h-7 rounded-full flex items-center justify-center text-ink/70 dark:text-white/70 hover:bg-ink/5 dark:hover:bg-white/10 transition-colors"
                      >
                        <Plus size={13} strokeWidth={2.5} />
                      </button>
                    </div>
                    <span className="text-xs sm:text-sm text-ink/80 dark:text-white/80 font-medium">
                      Servers<span className="text-red-500 font-bold ml-0.5">*</span>
                    </span>
                  </div>

                  <div className="text-right min-w-[80px]">
                    <span className="text-base sm:text-lg font-bold text-[var(--text-primary)]">
                      ${(90 * securityCount).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Action Buttons */}
              <div className="flex flex-wrap items-center justify-end gap-3 sm:gap-4">
                <SecondaryButton href="#services" className="bg-white dark:bg-transparent px-6 py-2.5 text-xs sm:text-sm">
                  Continue Shopping
                </SecondaryButton>
                <PrimaryButton href="#contact" className="px-7 py-2.5 text-xs sm:text-sm">
                  Add To Cart
                </PrimaryButton>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── SECTION 5: Custom Plan CTA ────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[var(--bg-base)] border-b border-[var(--border-subtle)]">
        <div className="mx-auto max-w-[1152px] px-5 md:px-6 lg:px-8">
          <Reveal>
            <div className="rounded-[var(--radius-card-lg)] border-2 border-[var(--primary)]/40 bg-gradient-to-br from-[var(--primary)]/10 via-[var(--primary)]/[0.03] to-transparent dark:from-[var(--primary)]/15 dark:via-[var(--surface-2)] dark:to-[var(--surface-1)] p-6 sm:p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden shadow-lg shadow-[var(--primary)]/5">
              <div className="space-y-1.5 z-10 max-w-xl">
                <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-[var(--text-primary)] tracking-tight">
                  Are You Looking For A Custom Plan?
                </h2>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  Multi-server fleets, custom monitoring thresholds (from $20/server for 5+ servers), and dedicated L3 engineers tailored to your infrastructure.
                </p>
              </div>
              <PrimaryButton
                href="#contact"
                className="z-10 shrink-0 px-7 py-3.5 shadow-md shadow-[var(--primary)]/20 transition-all hover:gap-3"
              >
                <span>Request For Quote</span>
                <ArrowRight size={15} />
              </PrimaryButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── SECTION 6: Contact Us ────────────────────────────────────────────── */}
      <section id="contact" className="py-16 sm:py-20 lg:py-28 bg-[var(--surface-1)] border-b border-[var(--border-subtle)]">
        <div className="mx-auto max-w-[1152px] px-5 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16">
            {/* Left Column: Contact Information */}
            <div className="lg:col-span-5">
              <Reveal>
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl leading-[1.08] text-[var(--text-primary)] tracking-tight mb-8">
                  Contact Us
                  <span className="text-[var(--primary)]">.</span>
                </h2>

                <div className="space-y-6 sm:space-y-8">
                  {/* Sales and Support Block */}
                  <div className="rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-[var(--surface-2)] p-6">
                    <h3 className="text-[16px] font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                      <Phone size={17} className="text-[var(--primary)]" />
                      Sales and Support
                    </h3>
                    <div className="space-y-3 text-[14px]">
                      <div>
                        <span className="text-muted-foreground dark:text-white/50 block text-[12px]">Phone:</span>
                        <a href="tel:18476076123" className="font-medium text-[var(--text-primary)] hover:text-[var(--primary)] transition-colors">
                          1-(847)-607-6123
                        </a>
                      </div>
                      <div>
                        <span className="text-muted-foreground dark:text-white/50 block text-[12px]">Sales:</span>
                        <a href="mailto:sales@supportpro.com" className="font-medium text-[var(--text-primary)] hover:text-[var(--primary)] transition-colors">
                          sales@supportpro.com
                        </a>
                      </div>
                      <div>
                        <span className="text-muted-foreground dark:text-white/50 block text-[12px]">Support:</span>
                        <a href="mailto:support@supportpro.com" className="font-medium text-[var(--text-primary)] hover:text-[var(--primary)] transition-colors">
                          support@supportpro.com
                        </a>
                      </div>
                      <div>
                        <span className="text-muted-foreground dark:text-white/50 block text-[12px]">MS Team:</span>
                        <span className="font-medium text-[var(--text-primary)]">
                          support@supportpro.com
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Postal Address Block */}
                  <div className="rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-[var(--surface-2)] p-6">
                    <h3 className="text-[16px] font-bold text-[var(--text-primary)] mb-3 flex items-center gap-2">
                      <MapPin size={17} className="text-[var(--primary)]" />
                      Postal Address
                    </h3>
                    <p className="text-[14px] leading-relaxed text-ink/80 dark:text-white/80">
                      1020 Milwaukee Ave, #245,<br />
                      Deerfield, IL-60015<br />
                      USA
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right Column: Contact Quote Form */}
            <div className="lg:col-span-7">
              <Reveal delay={0.1}>
                <div className="rounded-[var(--radius-card-lg)] border border-[var(--border-subtle)] bg-[var(--surface-2)] p-6 sm:p-8 md:p-10">
                  <div className="mb-6">
                    <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
                      Request For Quote
                    </h3>
                  </div>

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
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/30 dark:text-white/30"
                          size={16}
                        />
                        <input
                          required
                          suppressHydrationWarning
                          placeholder="Full name"
                          className="w-full rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-white dark:bg-black/20 pl-11 pr-4 py-3 text-[13px] text-[var(--text-primary)] outline-none transition-all placeholder:text-ink/35 dark:placeholder:text-white/30 focus:border-[var(--primary)]/50 dark:focus:bg-black/40"
                        />
                      </div>
                      <div className="relative">
                        <Mail
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/30 dark:text-white/30"
                          size={16}
                        />
                        <input
                          required
                          type="email"
                          suppressHydrationWarning
                          placeholder="Work email"
                          className="w-full rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-white dark:bg-black/20 pl-11 pr-4 py-3 text-[13px] text-[var(--text-primary)] outline-none transition-all placeholder:text-ink/35 dark:placeholder:text-white/30 focus:border-[var(--primary)]/50 dark:focus:bg-black/40"
                        />
                      </div>
                    </div>

                    <div className="relative">
                      <Building2
                        size={16}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/30 dark:text-white/30"
                      />
                      <input
                        placeholder="Company"
                        suppressHydrationWarning
                        className="w-full rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-white dark:bg-black/20 pl-11 pr-4 py-3 text-[13px] text-[var(--text-primary)] outline-none transition-all placeholder:text-ink/35 dark:placeholder:text-white/30 focus:border-[var(--primary)]/50 dark:focus:bg-black/40"
                      />
                    </div>

                    <div className="relative">
                      <MessageSquare
                        className="absolute left-4 top-4 text-ink/30 dark:text-white/30"
                        size={16}
                      />
                      <textarea
                        required
                        rows={4}
                        maxLength={500}
                        suppressHydrationWarning
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Message"
                        className="w-full resize-none rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-white dark:bg-black/20 pl-11 pr-4 pt-3 pb-8 text-[13px] text-[var(--text-primary)] outline-none transition-all placeholder:text-ink/35 dark:placeholder:text-white/30 focus:border-[var(--primary)]/50 dark:focus:bg-black/40"
                      />
                      <span className="absolute right-4 bottom-3 text-[11px] text-ink/30 dark:text-white/30 font-mono select-none">
                        {message.length} / 500
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-[12px] text-muted-foreground dark:text-white/60">
                      <ShieldCheck size={16} className="text-[var(--primary)] shrink-0" />
                      <span>Your information is secure and will never be shared.</span>
                    </div>

                    <PrimaryButton
                      type="submit"
                      suppressHydrationWarning
                      className="w-full py-3.5 px-6 text-[14px]"
                    >
                      {formSent ? 'Request Received' : 'Request For Quote'}
                      <ArrowRight size={18} />
                    </PrimaryButton>
                  </form>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 7: Industry Solutions ────────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-28 bg-[var(--bg-base)] relative">
        <GlobalBadgeSpotlight gridRef={industryGridRef} spotlightRadius={400} />
        <div className="mx-auto max-w-[1152px] px-5 md:px-6 lg:px-8 relative z-10">
          <Reveal>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl leading-[1.08] text-[var(--text-primary)] tracking-tight">
              Industry Solutions
              <span className="text-[var(--primary)]">.</span>
            </h2>
          </Reveal>

          <div ref={industryGridRef} className="mt-10 sm:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {industryItems.map((ind, i) => {
              const IndIcon = ind.icon;
              return (
                <Reveal key={ind.name} delay={0.04 * i} className="h-full">
                  <ParticleBadge
                    enableStars={true}
                    clickEffect={true}
                    particleCount={4}
                    enableTilt={false}
                    className="h-full rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-[var(--surface-2)] p-5 sm:p-6 flex items-center justify-between gap-4 hover:border-[var(--primary)]/40 transition-all cursor-pointer group shadow-sm hover:shadow-md"
                  >
                    <div className="flex items-center gap-4 min-w-0 flex-1">
                      <div className="w-11 h-11 rounded-xl bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center shrink-0 group-hover:bg-[var(--primary)] group-hover:text-white transition-colors duration-200">
                        <IndIcon size={20} strokeWidth={1} />
                      </div>
                      <span className="text-[15px] sm:text-[16px] font-semibold text-[var(--text-primary)] group-hover:text-[var(--primary)] transition-colors leading-snug">
                        {ind.name}
                      </span>
                    </div>
                    <div className="shrink-0 pl-3">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-mono font-bold text-[var(--primary)] bg-[var(--primary)]/10 border border-[var(--primary)]/25">
                        0{i + 1}
                      </span>
                    </div>
                  </ParticleBadge>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
