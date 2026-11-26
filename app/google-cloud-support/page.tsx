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
  Lock,
  Globe,
  Cloud,
  Cpu,
  RefreshCw,
  Award,
  Activity,
  GitBranch,
  TrendingDown,
  Sliders,
  ShoppingBag,
  Code,
  Terminal,
  Wifi,
  Layers,
  HardDrive,
  Boxes,
} from 'lucide-react';
import { Nav } from '@/components/nav';
import { SiteFooter } from '@/components/footer';
import { InsidePageOrbital, InsideSectionEyebrow, InsideContactPanel } from '@/components/inside-page-shell';
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

export default function GoogleCloudSupportPage() {
  const [formSent, setFormSent] = useState(false);
  const [message, setMessage] = useState('');
  const gcpGridRef = useRef<HTMLDivElement>(null);
  const coreProductsRef = useRef<HTMLDivElement>(null);
  const industryGridRef = useRef<HTMLDivElement>(null);

  const coreProducts = [
    {
      num: '01',
      title: 'Google Compute Engine',
      desc: 'Scalable virtual machines running on Google’s global fiber network.',
      icon: Server,
    },
    {
      num: '02',
      title: 'Google App Engine',
      desc: 'Fully managed serverless application platform for rapid deployment.',
      icon: Layers,
    },
    {
      num: '03',
      title: 'Google Cloud Storage',
      desc: 'Unified object storage with multi-regional durability and low latency.',
      icon: HardDrive,
    },
    {
      num: '04',
      title: 'Google Container Engine',
      desc: 'Managed Kubernetes orchestration (GKE) for containerized workloads.',
      icon: Boxes,
    },
  ];

  const gcpSupportItems = [
    { num: '01', title: 'Safe migrations to Google Compute Engine from any platform', icon: RefreshCw },
    { num: '02', title: '24/7 technical support from a certified team', icon: Award },
    { num: '03', title: '24/7 vigilant monitoring on all services and proactive response', icon: Activity },
    { num: '04', title: 'Setup private or hybrid cloud', icon: Cloud },
    { num: '05', title: 'Performance optimization of server instances', icon: Sliders },
    { num: '06', title: 'Utilization reviews to reduce monthly billing', icon: TrendingDown },
    { num: '07', title: 'Secured and robust infrastructure management', icon: Lock },
    { num: '08', title: 'As needed services from your development/production staff', icon: GitBranch },
    { num: '09', title: 'Experts in creating a scalable infrastructure based on your budget and requirements', icon: Cpu },
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

      {/* ─── SECTION 1: Google Cloud Support (Hero / Intro) ────────────────────── */}
      <section className="relative pt-32 sm:pt-40 lg:pt-48 pb-16 sm:pb-24 lg:pb-28 overflow-hidden border-b border-[var(--border-subtle)]">
        <InsidePageOrbital className="absolute -bottom-10 -left-20 w-[340px] opacity-55 rotate-180" />
        <InsidePageOrbital className="absolute -top-6 -right-16 w-[380px] opacity-65" />
        <div className="relative mx-auto max-w-[1152px] px-5 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <Reveal>
                <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[72px] leading-[1.04] text-[var(--text-primary)] tracking-tight">
                  Google Cloud Support
                  <span className="text-[#FF8101]">.</span>
                </h1>
              </Reveal>

              <Reveal delay={0.1}>
                <p className="text-[15px] sm:text-[16px] md:text-[17px] leading-relaxed text-[var(--text-secondary)] max-w-[640px] font-normal">
                  Google Cloud Platform is a suite of public cloud computing services offered by Google. The cloud
                  platform includes a range of hosted services for compute, storage, and application development that
                  run on Google’s hardware. The platform services can be accessed by software developers, cloud
                  administrators, and other enterprise IT professionals over the internet.
                </p>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <a
                    href="#services"
                    className="cursor-morph inline-flex items-center gap-2 rounded-full bg-[#FF8101] text-white px-6 sm:px-7 py-3 text-sm font-semibold hover:bg-[#FF8101]/90 transition-colors"
                  >
                    <span>Our Services</span>
                    <ArrowRight size={15} />
                  </a>
                  <a
                    href="#contact"
                    className="cursor-morph inline-flex items-center gap-2 rounded-full border border-ink/15 dark:border-white/15 bg-white/50 dark:bg-white/5 px-6 sm:px-7 py-3 text-sm font-medium text-[var(--text-primary)] hover:border-[#FF8101] hover:text-[#FF8101] dark:hover:border-[#FF8101] dark:hover:text-[#FF8101] transition-colors"
                  >
                    <span>Contact Us</span>
                  </a>
                </div>
              </Reveal>
            </div>

            {/* Right Visual Image */}
            <div className="lg:col-span-5 flex items-center justify-center">
              <Reveal delay={0.2} className="w-full flex justify-center">
                <img
                  src={getImageSrc(cloudMgmtIllustration)}
                  alt="Google Cloud Platform Support"
                  className="w-full max-w-[460px] h-auto object-contain transition-transform duration-300 hover:scale-[1.02]"
                />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 2: Google Cloud Support Services & Core Products ──────────── */}
      <section id="services" className="py-16 sm:py-20 lg:py-28 bg-[var(--surface-1)] border-b border-[var(--border-subtle)] relative">
        <GlobalBadgeSpotlight gridRef={coreProductsRef} spotlightRadius={400} />
        <div className="mx-auto max-w-[1152px] px-5 md:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 items-center">
            {/* Visual Image Column */}
            <div className="lg:col-span-5 order-2 lg:order-1 flex items-center justify-center">
              <Reveal delay={0.1} className="w-full flex justify-center">
                <img
                  src={getImageSrc(imgCloudServices)}
                  alt="Google Cloud Support Services"
                  className="w-full max-w-[340px] sm:max-w-[380px] h-auto object-contain transition-transform duration-300 hover:scale-[1.02]"
                />
              </Reveal>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
              <Reveal>
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl leading-[1.08] text-[var(--text-primary)] tracking-tight">
                  Google Cloud Support Services
                  <span className="text-[#FF8101]">.</span>
                </h2>
              </Reveal>

              <Reveal delay={0.1}>
                <p className="text-[14px] sm:text-[15px] md:text-[16px] leading-relaxed text-[var(--text-secondary)]">
                  Google Cloud Platform is the fastest growing public Cloud Platform Service in the world and is a
                  suite of cloud computing services that run on the same infrastructure that Google uses internally for
                  its end-user products. We provide unbiased support on best-fit cloud solutions to organizations
                  around the globe by consistently delivering high-quality expertise and end-to-end support. We can
                  ensure that our cloud experts can help you get the most out of the service by providing the support
                  on a range of choices and building and scaling the Compute, Storage and Databases, Networking, Data
                  Transfer, API Platform, Management Tools, and Developer Tools.
                </p>
              </Reveal>
            </div>
          </div>

          {/* Core Google Computing Products */}
          <div className="mt-14 sm:mt-16 pt-12 border-t border-[var(--border-subtle)]">
            <Reveal>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10">
                <h3 className="font-display text-2xl sm:text-3xl text-[var(--text-primary)] tracking-tight">
                  Cloud Experts at SupportPRO specialize in all Google core computing products
                  <span className="text-[#FF8101]">:</span>
                </h3>
                <span className="text-xs font-mono text-muted-foreground dark:text-white/40 shrink-0">
                  4 Core GCP Pillars
                </span>
              </div>
            </Reveal>

            <div ref={coreProductsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {coreProducts.map((prod, idx) => {
                const ProdIcon = prod.icon;
                return (
                  <Reveal key={prod.num} delay={0.04 * idx} className="h-full">
                    <ParticleBadge
                      enableStars={true}
                      clickEffect={true}
                      particleCount={4}
                      enableTilt={false}
                      className="relative w-full h-full min-h-[190px] rounded-2xl border border-[var(--border-subtle)] bg-cream/40 dark:bg-[#151515] p-6 flex flex-col justify-between hover:border-[#FF8101]/40 transition-all duration-300 shadow-sm hover:shadow-lg group cursor-pointer !items-stretch !justify-between"
                    >
                      <div className="w-full h-full flex flex-col justify-between">
                        <div className="w-full flex items-center justify-between">
                          <div className="w-11 h-11 rounded-2xl bg-[#FF8101]/10 text-[#FF8101] flex items-center justify-center shrink-0 border border-[#FF8101]/15 group-hover:bg-[#FF8101] group-hover:text-white transition-all duration-300 shadow-sm">
                            <ProdIcon size={22} strokeWidth={1.2} />
                          </div>
                          <span className="text-sm font-mono font-bold text-ink/40 dark:text-white/40 group-hover:text-[#FF8101] transition-colors select-none">
                            {prod.num}
                          </span>
                        </div>
                        <div className="w-full mt-auto pt-5">
                          <h4 className="text-[15px] sm:text-[16px] font-semibold text-[var(--text-primary)] leading-snug tracking-tight group-hover:text-[#FF8101] transition-colors">
                            {prod.title}
                          </h4>
                          <p className="mt-1.5 text-[12px] text-muted-foreground dark:text-white/55 leading-relaxed">
                            {prod.desc}
                          </p>
                        </div>
                      </div>
                    </ParticleBadge>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 3: Explore your Google Cloud Support with SupportPRO ──────── */}
      <section className="py-16 sm:py-20 lg:py-28 bg-[var(--bg-base)] border-b border-[var(--border-subtle)] relative">
        <GlobalBadgeSpotlight gridRef={gcpGridRef} spotlightRadius={400} />
        <div className="mx-auto max-w-[1152px] px-5 md:px-6 lg:px-8 relative z-10">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 sm:mb-14">
              <div>
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl leading-[1.08] text-[var(--text-primary)] max-w-[820px] tracking-tight">
                  Explore your Google Cloud Support with SupportPRO
                  <span className="text-[#FF8101]">:</span>
                </h2>
              </div>
              <span className="text-xs font-mono text-muted-foreground dark:text-white/40 shrink-0">
                9 Comprehensive Service Pillars
              </span>
            </div>
          </Reveal>

          {/* 9 Items — 3-col grid */}
          <div ref={gcpGridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {gcpSupportItems.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <Reveal key={item.num} delay={0.02 * idx} className="h-full">
                  <ParticleBadge
                    enableStars={true}
                    clickEffect={true}
                    particleCount={4}
                    enableTilt={false}
                    className="relative w-full h-full min-h-[210px] sm:min-h-[225px] rounded-2xl border border-[var(--border-subtle)] bg-white dark:bg-[#151515] p-6 flex flex-col justify-between hover:border-[#FF8101]/40 transition-all duration-300 shadow-sm hover:shadow-lg group cursor-pointer !items-stretch !justify-between"
                  >
                    <div className="w-full h-full flex flex-col justify-between">
                      {/* Top Row: Icon at Left End & Number at Right End */}
                      <div className="w-full flex items-center justify-between">
                        <div className="w-12 h-12 rounded-2xl bg-[#FF8101]/10 text-[#FF8101] flex items-center justify-center shrink-0 border border-[#FF8101]/15 group-hover:bg-[#FF8101] group-hover:text-white transition-all duration-300 shadow-sm">
                          <IconComp size={24} strokeWidth={1} />
                        </div>
                        <span className="text-sm font-mono font-bold text-ink/40 dark:text-white/40 group-hover:text-[#FF8101] transition-colors select-none">
                          {item.num}
                        </span>
                      </div>

                      {/* Bottom: Text */}
                      <div className="w-full mt-auto pt-6">
                        <h3 className="text-[15px] sm:text-[16px] font-semibold text-[var(--text-primary)] leading-snug tracking-tight group-hover:text-[#FF8101] transition-colors">
                          {item.title}
                        </h3>
                      </div>
                    </div>
                  </ParticleBadge>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── SECTION 4: Custom Plan CTA ────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[var(--surface-1)] border-b border-[var(--border-subtle)]">
        <div className="mx-auto max-w-[1152px] px-5 md:px-6 lg:px-8">
          <Reveal>
            <div className="rounded-3xl border-2 border-[#FF8101]/40 bg-gradient-to-br from-[#FF8101]/10 via-[#FF8101]/[0.03] to-transparent dark:from-[#FF8101]/15 dark:via-[#141414] dark:to-[#101010] p-6 sm:p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden shadow-lg shadow-[#FF8101]/5">
              <div className="space-y-1.5 z-10 max-w-xl">
                <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-[var(--text-primary)] tracking-tight">
                  Are You Looking For A Custom Plan?
                </h2>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  Tailored SLAs, dedicated GCP engineers, GKE cluster management, and custom cloud architecture support suited to your budget.
                </p>
              </div>
              <a
                href="#contact"
                className="cursor-morph z-10 shrink-0 inline-flex items-center gap-2 rounded-full bg-[#FF8101] text-white px-7 py-3.5 text-sm font-semibold hover:bg-[#FF8101]/90 shadow-md shadow-[#FF8101]/20 transition-all hover:gap-3"
              >
                <span>Request For Quote</span>
                <ArrowRight size={15} />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── SECTION 5: Contact Us ────────────────────────────────────────────── */}
      <section id="contact" className="py-16 sm:py-20 lg:py-28 bg-[var(--bg-base)] border-b border-[var(--border-subtle)]">
        <div className="mx-auto max-w-[1152px] px-5 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16">
            {/* Left Column: Contact Information */}
            <div className="lg:col-span-5">
              <Reveal>
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl leading-[1.08] text-[var(--text-primary)] tracking-tight mb-8">
                  Contact Us
                  <span className="text-[#FF8101]">.</span>
                </h2>

                <div className="space-y-6 sm:space-y-8">
                  {/* Sales and Support Block */}
                  <div className="rounded-2xl border border-[var(--border-subtle)] bg-white dark:bg-[#151515] p-6">
                    <h3 className="text-[16px] font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                      <Phone size={17} className="text-[#FF8101]" />
                      Sales and Support
                    </h3>
                    <div className="space-y-3 text-[14px]">
                      <div>
                        <span className="text-muted-foreground dark:text-white/50 block text-[12px]">Phone:</span>
                        <a href="tel:18476076123" className="font-medium text-[var(--text-primary)] hover:text-[#FF8101] transition-colors">
                          1-(847)-607-6123
                        </a>
                      </div>
                      <div>
                        <span className="text-muted-foreground dark:text-white/50 block text-[12px]">Sales:</span>
                        <a href="mailto:sales@supportpro.com" className="font-medium text-[var(--text-primary)] hover:text-[#FF8101] transition-colors">
                          sales@supportpro.com
                        </a>
                      </div>
                      <div>
                        <span className="text-muted-foreground dark:text-white/50 block text-[12px]">Support:</span>
                        <a href="mailto:support@supportpro.com" className="font-medium text-[var(--text-primary)] hover:text-[#FF8101] transition-colors">
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
                  <div className="rounded-2xl border border-[var(--border-subtle)] bg-white dark:bg-[#151515] p-6">
                    <h3 className="text-[16px] font-bold text-[var(--text-primary)] mb-3 flex items-center gap-2">
                      <MapPin size={17} className="text-[#FF8101]" />
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
                <div className="rounded-3xl border border-[var(--border-subtle)] bg-white dark:bg-[#151515] p-6 sm:p-8 md:p-10">
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
                          className="w-full rounded-2xl border border-[var(--border-subtle)] bg-[#FAFAFA] dark:bg-black/20 pl-11 pr-4 py-3 text-[13px] text-[var(--text-primary)] outline-none transition-all placeholder:text-ink/35 dark:placeholder:text-white/30 focus:border-[#FF8101]/50 focus:bg-white dark:focus:bg-black/40"
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
                          className="w-full rounded-2xl border border-[var(--border-subtle)] bg-[#FAFAFA] dark:bg-black/20 pl-11 pr-4 py-3 text-[13px] text-[var(--text-primary)] outline-none transition-all placeholder:text-ink/35 dark:placeholder:text-white/30 focus:border-[#FF8101]/50 focus:bg-white dark:focus:bg-black/40"
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
                        className="w-full rounded-2xl border border-[var(--border-subtle)] bg-[#FAFAFA] dark:bg-black/20 pl-11 pr-4 py-3 text-[13px] text-[var(--text-primary)] outline-none transition-all placeholder:text-ink/35 dark:placeholder:text-white/30 focus:border-[#FF8101]/50 focus:bg-white dark:focus:bg-black/40"
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
                        className="w-full resize-none rounded-2xl border border-[var(--border-subtle)] bg-[#FAFAFA] dark:bg-black/20 pl-11 pr-4 pt-3 pb-8 text-[13px] text-[var(--text-primary)] outline-none transition-all placeholder:text-ink/35 dark:placeholder:text-white/30 focus:border-[#FF8101]/50 focus:bg-white dark:focus:bg-black/40"
                      />
                      <span className="absolute right-4 bottom-3 text-[11px] text-ink/30 dark:text-white/30 font-mono select-none">
                        {message.length} / 500
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-[12px] text-muted-foreground dark:text-white/60">
                      <ShieldCheck size={16} className="text-[#FF8101] shrink-0" />
                      <span>Your information is secure and will never be shared.</span>
                    </div>

                    <button
                      type="submit"
                      suppressHydrationWarning
                      className="cursor-morph w-full rounded-full bg-[#FF8101] text-white py-3.5 px-6 text-[14px] font-semibold transition-all hover:bg-[#FF8101]/90 flex items-center justify-center gap-2"
                    >
                      {formSent ? 'Request Received' : 'Request For Quote'}
                      <ArrowRight size={18} />
                    </button>
                  </form>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 6: Industry Solutions ────────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-28 bg-[var(--surface-1)] relative">
        <GlobalBadgeSpotlight gridRef={industryGridRef} spotlightRadius={400} />
        <div className="mx-auto max-w-[1152px] px-5 md:px-6 lg:px-8 relative z-10">
          <Reveal>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl leading-[1.08] text-[var(--text-primary)] tracking-tight">
              Industry Solutions
              <span className="text-[#FF8101]">.</span>
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
                    className="h-full rounded-2xl border border-[var(--border-subtle)] bg-cream/40 dark:bg-[#151515] p-5 sm:p-6 flex items-center justify-between gap-4 hover:border-[#FF8101]/40 transition-all cursor-pointer group shadow-sm hover:shadow-md"
                  >
                    <div className="flex items-center gap-4 min-w-0 flex-1">
                      <div className="w-11 h-11 rounded-xl bg-[#FF8101]/10 text-[#FF8101] flex items-center justify-center shrink-0 group-hover:bg-[#FF8101] group-hover:text-white transition-colors duration-200">
                        <IndIcon size={20} strokeWidth={1} />
                      </div>
                      <span className="text-[15px] sm:text-[16px] font-semibold text-[var(--text-primary)] group-hover:text-[#FF8101] transition-colors leading-snug">
                        {ind.name}
                      </span>
                    </div>
                    <div className="shrink-0 pl-3">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-mono font-bold text-[#FF8101] bg-[#FF8101]/10 border border-[#FF8101]/25">
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
