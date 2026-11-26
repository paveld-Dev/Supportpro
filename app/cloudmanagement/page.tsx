'use client';

import { useState, useRef, type ReactNode } from 'react';
import {
  motion,
  useInView,
} from 'motion/react';
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
  Cloud,
  Globe,
  Lock,
  Cpu,
  RefreshCw,
  Award,
  Check,
  Plus,
  Minus,
  ShoppingBag,
  Terminal,
  Wifi,
} from 'lucide-react';
import { Nav } from '@/components/nav';
import { SiteFooter } from '@/components/footer';
import { InsidePageOrbital, InsideSectionEyebrow, InsideContactPanel } from '@/components/inside-page-shell';
import { PrimaryButton, SecondaryButton } from '@/components/ui/sp-button';
import ParticleBadge, { GlobalBadgeSpotlight } from '@/components/MagicBadge';
import cloudMgmtIllustration from '@/assets/illustration/cloudmanagementicon.png';
import imgCloudServices from '@/assets/illustration/cloudmanagementicon1.png';

const getImageSrc = (img: any): string => {
  if (!img) return '';
  if (typeof img === 'string') return img;
  if (typeof img === 'object' && 'src' in img) return img.src;
  return String(img);
};

function Reveal({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return <div className={className}>{children}</div>;
}

export default function CloudManagementPage() {
  const [formSent, setFormSent] = useState(false);
  const [message, setMessage] = useState('');
  const [packCount, setPackCount] = useState(1);
  const [planSelected, setPlanSelected] = useState(true);
  const solutionGridRef = useRef<HTMLDivElement>(null);
  const industryGridRef = useRef<HTMLDivElement>(null);

  const solutionItems = [
    { num: '01', title: 'Secured infrastructure setup', icon: Lock },
    { num: '02', title: 'Weekly server audit on all instances', icon: ShieldCheck },
    { num: '03', title: '24/7/365 monitoring and worldwide technical support', icon: Globe },
    { num: '04', title: 'Explore and adopt new services from all new cloud provider', icon: Cloud },
    { num: '05', title: 'Server and infrastructure scalability based on your pricing', icon: Cpu },
    { num: '06', title: 'Free migration to new cloud infrastructure', icon: RefreshCw },
    { num: '07', title: 'Certified cloud experts', icon: Award },
  ];

  const industryItems = [
    { title: 'Web Hosting Services', icon: Globe, count: '01' },
    { title: 'Service Providers', icon: Cloud, count: '02' },
    { title: 'E-Commerce Companies', icon: ShoppingBag, count: '03' },
    { title: 'Software Vendors', icon: Cpu, count: '04' },
    { title: 'Web Developers', icon: Terminal, count: '05' },
    { title: 'ISPs', icon: Wifi, count: '06' },
  ];

  return (
    <main className="bg-[var(--bg-base)] text-[var(--text-primary)] min-h-screen overflow-x-clip transition-colors duration-300">
      <Nav />

      {/* ─── Hero Section ──────────────────────────────────────────────────────── */}
      <section className="relative pt-32 sm:pt-40 lg:pt-48 pb-16 sm:pb-24 lg:pb-28 overflow-hidden border-b border-[var(--border-subtle)]">
        <InsidePageOrbital className="absolute -bottom-10 -left-20 w-[340px] opacity-55 rotate-180" />
        <InsidePageOrbital className="absolute -top-6 -right-16 w-[380px] opacity-65" />
        <div className="relative mx-auto max-w-[1152px] px-5 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <Reveal>
                <InsideSectionEyebrow label="Cloud Management" />
                <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[68px] leading-[1.04] text-[var(--text-primary)] tracking-tight">
                  Cloud Management
                  <span className="block text-[var(--primary)]">Services</span>
                </h1>
              </Reveal>

              <Reveal delay={0.1}>
                <p className="text-[15px] sm:text-[16px] md:text-[17px] leading-relaxed text-[var(--text-secondary)] max-w-[640px] font-normal">
                  SupportPRO Cloud Management Services help define, deploy, and leverage simplified, automated cloud
                  management systems across multiple platforms and providers. We help our customers build cloud operations
                  frameworks that provide for the management of public, private, and hybrid cloud environments.
                </p>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <PrimaryButton href="#plans" className="font-medium">
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
                  src={getImageSrc(cloudMgmtIllustration)}
                  alt="Cloud Management Services Illustration"
                  className="w-full max-w-[480px] h-auto object-contain transition-transform duration-300 hover:scale-[1.02]"
                />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Cloud Management Services Section ─────────────────────────────────── */}
      <section id="services" className="py-16 sm:py-20 lg:py-28 bg-[var(--surface-1)] border-b border-[var(--border-subtle)]">
        <div className="mx-auto max-w-[1152px] px-5 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 items-center">
            {/* Visual Image Column (Left) */}
            <div className="lg:col-span-5 order-2 lg:order-1 flex items-center justify-center">
              <Reveal delay={0.1} className="w-full flex justify-center">
                <div className="w-full max-w-[380px] rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-[var(--surface-2)] p-6 flex items-center justify-center">
                  <img
                    src={getImageSrc(imgCloudServices)}
                    alt="Cloud Management Services"
                    className="w-full max-w-[300px] h-auto object-contain transition-transform duration-300 hover:scale-[1.02]"
                  />
                </div>
              </Reveal>
            </div>

            {/* Content Column (Right) */}
            <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
              <Reveal>
                <h2 className="flex items-center gap-3 font-display text-3xl sm:text-4xl md:text-5xl leading-[1.08] text-[var(--text-primary)] tracking-tight">
                  <span className="h-8 w-0.5 rounded-full bg-[var(--primary)] shrink-0" aria-hidden="true" />
                  <span>Cloud Management Services</span>
                </h2>
              </Reveal>

              <Reveal delay={0.1}>
                <p className="text-[14px] sm:text-[15px] md:text-[16px] leading-relaxed text-[var(--text-secondary)]">
                  Cloud Management Services is essential to protect cloud services from its vulnerabilities. We monitor
                  and maintain the cloud services to ensure high uptime, security and speed. In case of any unscheduled
                  downtime, the services are restored within no time as we provide 24X7 support by employing the best-
                  certified system administrators.
                </p>
              </Reveal>

              <Reveal delay={0.2}>
                <p className="text-[14px] sm:text-[15px] md:text-[16px] leading-relaxed text-[var(--text-secondary)]">
                  We also make sure that the cloud servers are updated with important security patches and take care of
                  optimizing your servers for the best possible performance. You will get the optimized, secure and
                  proactively monitored services for server management, which deliver differentiated and incremental
                  value to your business.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Complete Cloud Management Solution ─────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-28 bg-[var(--bg-base)] border-b border-[var(--border-subtle)] relative">
        <GlobalBadgeSpotlight gridRef={solutionGridRef} spotlightRadius={400} />
        <div className="mx-auto max-w-[1152px] px-5 md:px-6 lg:px-8 relative z-10">
          <Reveal>
            <InsideSectionEyebrow label="Our Services" />
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl leading-[1.08] text-[var(--text-primary)] max-w-[820px] tracking-tight">
              A complete cloud management solution
            </h2>
          </Reveal>

          {/* Services Editorial Grid */}
          <div ref={solutionGridRef} className="mt-10 sm:mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {solutionItems.slice(0, 6).map((item, idx) => (
              <Reveal key={item.num} delay={0.05 * idx} className="h-full">
                <ParticleBadge
                  enableStars={true}
                  clickEffect={true}
                  particleCount={5}
                  enableTilt={false}
                  className="h-full rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-[var(--surface-2)] p-5 sm:p-6 flex items-center gap-4 hover:border-[var(--primary)]/40 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-1)] text-[var(--primary)] flex items-center justify-center shrink-0">
                    <item.icon size={18} strokeWidth={1.75} />
                  </div>
                  <h3 className="text-[14px] sm:text-[15px] font-medium text-[var(--text-primary)] leading-snug">
                    {item.title}
                  </h3>
                </ParticleBadge>
              </Reveal>
            ))}

            {/* Supporting Statement Banner */}
            <Reveal delay={0.35} className="md:col-span-2 lg:col-span-3">
              <div className="rounded-[var(--radius-card)] border border-[var(--primary)]/30 bg-[var(--primary)]/5 p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl border border-[var(--primary)]/30 bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center shrink-0">
                    <Cloud size={18} strokeWidth={1.75} />
                  </div>
                  <p className="text-[14px] sm:text-[16px] font-medium text-[var(--text-primary)] leading-relaxed">
                    We only charge you based on the number of instances you have with your cloud provider.
                  </p>
                </div>
                <PrimaryButton href="#plans" className="shrink-0 px-5 py-2.5 text-[13px]">
                  <span>View Plans</span>
                  <ArrowRight size={14} />
                </PrimaryButton>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── Available Plans Section ───────────────────────────────────────────── */}
      <section id="plans" className="py-16 sm:py-20 lg:py-24 bg-[var(--surface-1)] border-b border-[var(--border-subtle)]">
        <div className="mx-auto max-w-[1152px] px-5 md:px-6 lg:px-8">
          <Reveal>
            <InsideSectionEyebrow label="Available Plans" />
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl leading-tight text-[var(--text-primary)] tracking-tight mb-8">
              Flexible plans for your cloud needs
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-[var(--surface-2)] p-6 sm:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
                {/* Left: Icon + Plan Name + Subtitle */}
                <div className="lg:col-span-6 flex items-center gap-4">
                  <button
                    type="button"
                    suppressHydrationWarning
                    onClick={() => setPlanSelected(!planSelected)}
                    aria-label="Select Cloud Management plan"
                    className={`w-11 h-11 rounded-xl flex items-center justify-center border transition-colors shrink-0 ${
                      planSelected
                        ? 'bg-[var(--primary)]/10 border-[var(--primary)]/40 text-[var(--primary)]'
                        : 'border-[var(--border-subtle)] bg-[var(--surface-1)] text-[var(--text-muted)]'
                    }`}
                  >
                    <Cloud size={20} strokeWidth={1.75} />
                  </button>

                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-[var(--text-primary)]">
                      Cloud Management
                    </h3>
                    <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-0.5">
                      Cloud management with $90/month
                    </p>
                  </div>
                </div>

                {/* Right: Vertical divider + Stepper + Price + Actions */}
                <div className="lg:col-span-6 lg:border-l lg:border-[var(--border-subtle)] lg:pl-8 flex flex-col gap-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2.5">
                      <div className="inline-flex items-center rounded-full border border-[var(--border-subtle)] bg-[var(--surface-1)] p-1">
                        <button
                          type="button"
                          suppressHydrationWarning
                          onClick={() => setPackCount((prev) => Math.max(1, prev - 1))}
                          disabled={packCount <= 1}
                          aria-label="Decrease quantity"
                          className="w-7 h-7 rounded-full flex items-center justify-center text-[var(--text-secondary)] hover:bg-[var(--surface-2)] disabled:opacity-30 transition-colors"
                        >
                          <Minus size={13} strokeWidth={2.5} />
                        </button>
                        <span className="w-8 text-center text-sm font-semibold text-[var(--text-primary)] select-none">
                          {packCount}
                        </span>
                        <button
                          type="button"
                          suppressHydrationWarning
                          onClick={() => setPackCount((prev) => Math.min(99, prev + 1))}
                          aria-label="Increase quantity"
                          className="w-7 h-7 rounded-full flex items-center justify-center text-[var(--text-secondary)] hover:bg-[var(--surface-2)] transition-colors"
                        >
                          <Plus size={13} strokeWidth={2.5} />
                        </button>
                      </div>

                      <span className="text-xs sm:text-sm text-[var(--text-secondary)] font-medium">
                        Pack<span className="text-[var(--primary)] font-bold ml-0.5">*</span>
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
                        ${(90 * packCount).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-end gap-3">
                    <SecondaryButton href="#services" className="px-5 py-2 text-xs sm:text-sm">
                      Continue Shopping
                    </SecondaryButton>
                    <PrimaryButton href="#contact" className="px-6 py-2 text-xs sm:text-sm">
                      Add To Cart
                    </PrimaryButton>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Custom Plan Inquiry - Highlighted RFQ */}
          <Reveal delay={0.2}>
            <div className="mt-6 rounded-[var(--radius-card)] border border-[var(--primary)]/35 bg-[var(--primary)]/[0.06] p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-start gap-4 max-w-xl">
                <div className="w-11 h-11 rounded-xl border border-[var(--primary)]/30 bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center shrink-0">
                  <Cpu size={19} strokeWidth={1.75} />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base sm:text-lg font-semibold text-[var(--text-primary)]">
                    Looking For A Custom Plan?
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                    Tailored SLAs, dedicated systems engineering, and custom instance pricing suited to your multi-cloud architecture.
                  </p>
                </div>
              </div>
              <SecondaryButton href="#contact" className="shrink-0 border-[var(--primary)]/45 px-5 py-2.5 text-xs sm:text-sm">
                <span>Request For Quote</span>
                <ArrowRight size={14} />
              </SecondaryButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── Industry Solutions Section ────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-28 bg-[var(--bg-base)] border-b border-[var(--border-subtle)] relative">
        <GlobalBadgeSpotlight gridRef={industryGridRef} spotlightRadius={400} />
        <div className="mx-auto max-w-[1152px] px-5 md:px-6 lg:px-8 relative z-10">
          <Reveal>
            <InsideSectionEyebrow label="Industry Solutions" />
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl leading-[1.08] text-[var(--text-primary)] tracking-tight">
              Built for diverse industries
            </h2>
          </Reveal>

          <div ref={industryGridRef} className="mt-10 sm:mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {industryItems.map((ind, i) => (
              <Reveal key={ind.title} delay={0.04 * i} className="h-full">
                <ParticleBadge
                  enableStars={true}
                  clickEffect={true}
                  particleCount={4}
                  enableTilt={false}
                  className="h-full rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-[var(--surface-1)] p-5 flex flex-col items-center justify-center text-center gap-3 hover:border-[var(--primary)]/40 transition-all cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-2)] text-[var(--primary)] flex items-center justify-center shrink-0 group-hover:bg-[var(--primary)] group-hover:text-white transition-colors duration-200">
                    <ind.icon size={18} />
                  </div>
                  <span className="text-[13px] font-medium text-[var(--text-primary)] group-hover:text-[var(--primary)] transition-colors leading-snug">
                    {ind.title}
                  </span>
                </ParticleBadge>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <InsideContactPanel />

      {/* ─── Shared Footer ────────────────────────────────────────────────────── */}
      <SiteFooter />
    </main>
  );
}
