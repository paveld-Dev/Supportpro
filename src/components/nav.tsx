'use client';

import { useState, type ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useTransform,
} from 'motion/react';
import {
  CloudCog,
  Database,
  Cloud,
  LayoutGrid,
  GitMerge,
  Cpu,
  Server,
  UserCheck,
  UserPlus,
  Users,
  Headphones,
  MessageCircle,
  Clock,
  ArrowRightLeft,
  ShieldAlert,
  Blocks,
  ShieldCheck,
  Code,
  Briefcase,
  ChevronDown,
  ArrowRight,
  Menu,
  X,
  Sparkles,
  Terminal,
  Layers,
  Sliders,
  Award,
  Layout,
  Waypoints,
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import logoWhite from '@/assets/SupportPRO-logo (1) 1.svg';
import logoBlack from '@/assets/SupportPRO-logo black.svg';

const getImageSrc = (img: any): string => {
  if (!img) return '';
  if (typeof img === 'string') return img;
  if (typeof img === 'object' && 'src' in img) return img.src;
  return String(img);
};

export const navItems = [
  {
    label: 'Services',
    sections: [
      {
        heading: 'Cloud Support',
        items: [
          { label: 'Cloud Management', desc: 'Full-stack cloud operations', icon: CloudCog, href: '/cloudmanagement' },
          { label: 'AWS Support', desc: 'EC2, RDS, S3 & beyond', icon: Database, href: '/aws-management' },
          { label: 'Google Cloud', desc: 'GCP infrastructure managed', icon: Cloud, href: '/google-cloud-support' },
          { label: 'Azure Support', desc: 'Microsoft Azure managed', icon: LayoutGrid, href: '/azure-support' },
          { label: 'DevOps Support', desc: 'CI/CD & pipeline engineering', icon: GitMerge, href: '/devops-support' },
        ],
      },
      {
        heading: 'Server Administration',
        items: [
          { label: 'Node Management', desc: 'Dedicated node monitoring', icon: Cpu, href: '/nodemanagement' },
          { label: 'Dedicated Server', desc: 'Bare-metal server support', icon: Server, href: '/dedicated-server-support' },
          { label: 'Free Server Checkup', desc: 'Complimentary server audit', icon: ShieldCheck, href: '/free-server-checkup' },
        ],
      },
    ],
  },
  {
    label: 'Outsourced Support',
    sections: [
      {
        heading: 'Dedicated Support',
        items: [
          { label: 'Dedicated Tech Support', desc: 'Your brand, our engineers', icon: UserCheck, href: '/dedicated-tech-support' },
          { label: 'Semi-Dedicated Support', desc: 'Flexible shared staffing', icon: UserPlus, href: '/semi-dedicated-support' },
          { label: 'Dedicated Team', desc: 'Full team under your banner', icon: Users, href: '/dedicated-team-support' },
        ],
      },
      {
        heading: 'Client Support',
        items: [
          { label: 'Helpdesk Support', desc: 'Ticket-based 24/7 coverage', icon: Headphones, href: '/helpdesk-support' },
          { label: 'Live Chat Support', desc: 'Real-time chat agents', icon: MessageCircle, href: '/live-chat-support' },
        ],
      },
    ],
  },
  {
    label: 'Products',
    sections: [
      {
        heading: 'Services',
        items: [
          { label: 'Hourly Administration', desc: 'On-demand server tasks', icon: Clock, href: '/hourly-administration' },
          { label: 'Server Migration', desc: 'Zero-downtime migrations', icon: ArrowRightLeft, href: '/server-migration' },
          { label: 'Abuse Handling', desc: 'DMCA & spam mitigation', icon: ShieldAlert, href: '/abuse-handling' },
        ],
      },
      {
        heading: 'Products',
        items: [
          { label: 'Server Manager Addon', desc: 'WHMCS marketplace plugin', badge: 'Popular', icon: Blocks, href: '/server-manager-addon' },
          { label: 'Server Scanner', desc: 'Automated vulnerability scanner', icon: ShieldCheck, href: '/scanner' },
        ],
      },
    ],
  },
  {
    label: 'Development',
    sections: [
      {
        heading: 'Hire Talent',
        items: [
          { label: 'Hire a Developer', desc: 'Vetted full-stack engineers', icon: Code, href: '/hireadeveloper' },
          { label: 'Hire a Dev Team', desc: 'Complete project squads', icon: Briefcase, href: '/hireadevelopmentteam' },
        ],
      },
    ],
  },
];

export function Nav() {
  const { scrollY } = useScroll();
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);
  const { theme, setTheme, mounted } = useTheme();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const isPast = latest > 500;
    if (isPast !== isScrolledPastHero) {
      setIsScrolledPastHero(isPast);
    }
  });

  const bg = useTransform(scrollY, [0, 200], ['rgba(18,18,18,0.85)', 'rgba(18,18,18,0.95)']);

  // In light mode, show the black SupportPRO emblem logo; in dark mode, show white logo.
  const isLogoBlack = mounted && theme === 'light';
  const currentLogo = isLogoBlack ? logoBlack : logoWhite;

  return (
    <>
      {/* ── Main nav ── */}
      <nav
        className="fixed top-4 left-0 right-0 z-50 mx-auto flex max-w-[1152px] items-center justify-between px-5 md:px-6 lg:px-8"
        onMouseLeave={() => setOpenMenu(null)}
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center self-center"
        >
          <Link href="/" className="flex items-center gap-2 min-w-0">
            <img
              src={getImageSrc(currentLogo)}
              alt="SupportPRO Logo"
              suppressHydrationWarning
              className="h-12 sm:h-14 md:h-16 w-auto object-contain transition-opacity duration-200 -translate-y-1 sm:-translate-y-1.5"
            />
          </Link>
        </motion.div>

        {/* Nav pill */}
        <motion.div
          style={{ backgroundColor: bg }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative flex items-center gap-1 rounded-full backdrop-blur-md px-2 py-1.5 text-sm text-white border border-white/10 shrink-0"
        >
          {/* Mega-menu triggers — hidden below sm */}
          {navItems.map((item) => (
            <div
              key={item.label}
              className="hidden sm:block relative"
              onMouseEnter={() => setOpenMenu(item.label)}
            >
              <button className="cursor-morph flex items-center gap-1 px-3.5 py-1.5 rounded-full transition font-medium">
                {item.label}
                <ChevronDown
                  size={12}
                  className={`transition-transform duration-200 ${openMenu === item.label ? 'rotate-180' : ''}`}
                />
              </button>

              {/* Dropdown panel */}
              <AnimatePresence>
                {openMenu === item.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.96 }}
                    transition={{ type: 'spring', damping: 26, stiffness: 360 }}
                    className={`absolute left-1/2 -translate-x-1/2 top-[calc(100%+12px)] ${item.sections.length > 1 ? 'min-w-[500px]' : 'min-w-[290px]'
                      } rounded-[26px] bg-white/[0.98] dark:bg-[#14161e]/[0.97] backdrop-blur-2xl border border-black/[0.08] dark:border-white/[0.14] shadow-[0_24px_60px_rgba(0,0,0,0.14),inset_0_1px_1px_rgba(255,255,255,0.9)] dark:shadow-[0_28px_64px_rgba(0,0,0,0.65),inset_0_1px_1px_rgba(255,255,255,0.18)] overflow-hidden z-50`}
                    style={{ color: 'initial' }}
                  >
                    {/* Columns */}
                    <div className={`grid gap-0 p-2 ${item.sections.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                      {item.sections.map((section, si) => (
                        <div
                          key={section.heading}
                          className={`p-3 ${si < item.sections.length - 1 && item.sections.length > 1
                            ? 'border-r border-black/[0.06] dark:border-white/[0.08]'
                            : ''
                            }`}
                        >
                          <p className="px-3 mb-2 text-[10px] font-mono uppercase tracking-wider text-ink/45 dark:text-white/40">
                            {section.heading}
                          </p>
                          <div className="space-y-1">
                            {section.items.map((it) => {
                              const isInternal = it.href?.startsWith('/');
                              const LinkComponent = isInternal ? Link : 'a';
                              const linkProps = isInternal
                                ? { href: it.href }
                                : { href: it.href || '#', target: it.href?.startsWith('http') ? '_blank' : undefined, rel: it.href?.startsWith('http') ? 'noreferrer' : undefined };

                              return (
                                <LinkComponent
                                  key={it.label}
                                  {...(linkProps as any)}
                                  onClick={() => {
                                    setOpenMenu(null);
                                    if (it.href?.includes('hero=')) {
                                      const heroNum = it.href.split('hero=')[1];
                                      if (typeof window !== 'undefined') {
                                        window.dispatchEvent(new CustomEvent('supportpro:switch-hero', { detail: heroNum }));
                                      }
                                    }
                                  }}
                                  className="cursor-morph group flex items-start gap-3 px-3 py-2.5 rounded-[18px] border border-transparent hover:border-black/[0.08] dark:hover:border-white/[0.16] hover:bg-black/[0.05] dark:hover:bg-white/[0.10] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.7),0_4px_12px_rgba(0,0,0,0.05)] dark:hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.18),0_4px_14px_rgba(0,0,0,0.28)] transition-all duration-150"
                                >
                                  <div className="mt-0.5 w-8 h-8 rounded-xl bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.05] dark:border-white/[0.08] flex items-center justify-center shrink-0 text-[#FF8101] group-hover:bg-[#FF8101] group-hover:text-white group-hover:border-[#FF8101] group-hover:shadow-md group-hover:shadow-[#FF8101]/30 transition-all duration-150">
                                    {it.icon ? <it.icon size={15} strokeWidth={1.6} /> : <span className="w-1.5 h-1.5 rounded-full bg-[#FF8101] group-hover:bg-white" />}
                                  </div>
                                  <div className="min-w-0">
                                    <div className="flex items-center gap-2">
                                      <span className="text-[13px] font-semibold text-ink dark:text-white/95 group-hover:text-[#FF8101] dark:group-hover:text-white transition-colors leading-snug">
                                        {it.label}
                                      </span>
                                      {'badge' in it && it.badge && (
                                        <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-[#FF8101]/15 text-[#FF8101]">
                                          {it.badge}
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-[11px] text-ink/55 dark:text-white/45 leading-snug mt-0.5">
                                      {it.desc}
                                    </p>
                                  </div>
                                </LinkComponent>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}

          <Link
            href="/case-studies"
            onClick={() => window.dispatchEvent(new Event('case-studies:reset'))}
            className="hidden sm:flex items-center px-3.5 py-1.5 rounded-full transition font-medium"
          >
            Case Studies
          </Link>

          {/* Divider */}
          <span className="mx-1 h-4 w-px bg-white/20 hidden sm:block" />

          {/* Login CTA */}
          <Link
            href="/clientlogin"
            className="cursor-morph px-4 py-1.5 rounded-full bg-[#FF8101] text-white font-medium"
          >
            Login
          </Link>

          {/* Divider */}
          <span className="mx-1 h-4 w-px bg-white/20 hidden sm:block" />

          {/* Theme toggle */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle dark mode"
            suppressHydrationWarning
            className="relative flex h-8 w-8 items-center justify-center rounded-full hover:bg-white/15 transition-all duration-200 text-white shrink-0"
          >
            {mounted ? (
              <AnimatePresence mode="wait" initial={false}>
                {theme === 'dark' ? (
                  <motion.svg
                    key="sun"
                    initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                  </motion.svg>
                ) : (
                  <motion.svg
                    key="moon"
                    initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </motion.svg>
                )}
              </AnimatePresence>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
              </svg>
            )}
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            className="sm:hidden relative flex h-8 w-8 items-center justify-center rounded-full hover:bg-white/15 transition-all duration-200 text-white shrink-0"
          >
            {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </motion.div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-cream/95 dark:bg-[#111]/95 backdrop-blur-xl sm:hidden pt-24 px-6 pb-6 overflow-y-auto"
          >
            <div className="flex flex-col gap-6">
              {navItems.map((item) => (
                <div key={item.label} className="flex flex-col gap-3">
                  <div className="text-[16px] font-display font-medium text-ink dark:text-white border-b border-ink/10 dark:border-white/10 pb-2">
                    {item.label}
                  </div>
                  <div className="flex flex-col gap-2 pl-2">
                    {item.sections.map((sec) => (
                      <div key={sec.heading} className="flex flex-col gap-1.5 mt-1">
                        <div className="text-[12px] font-semibold text-ink/50 dark:text-white/40 tracking-normal mb-1">
                          {sec.heading}
                        </div>
                        {sec.items.map((it) => {
                          const isInternal = it.href?.startsWith('/');
                          const LinkComponent = isInternal ? Link : 'a';
                          const linkProps = isInternal
                            ? { href: it.href }
                            : { href: it.href || '#', target: it.href?.startsWith('http') ? '_blank' : undefined, rel: it.href?.startsWith('http') ? 'noreferrer' : undefined };

                          return (
                            <LinkComponent
                              key={it.label}
                              {...(linkProps as any)}
                              className="text-[14px] text-ink/80 dark:text-white/80 py-1.5 flex items-center gap-2"
                              onClick={() => {
                                setMobileMenuOpen(false);
                                if (it.href?.includes('hero=')) {
                                  const heroNum = it.href.split('hero=')[1];
                                  if (typeof window !== 'undefined') {
                                    window.dispatchEvent(new CustomEvent('supportpro:switch-hero', { detail: heroNum }));
                                  }
                                }
                              }}
                            >
                              <it.icon size={14} className="text-[#FF8101]" />
                              {it.label}
                            </LinkComponent>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <Link
                href="/case-studies"
                onClick={() => {
                  setMobileMenuOpen(false);
                  window.dispatchEvent(new Event('case-studies:reset'));
                }}
                className="text-lg font-display text-ink dark:text-white tracking-tight"
              >
                Case Studies
              </Link>

              <div className="flex flex-col gap-3 mt-4 pt-6 border-t border-ink/10 dark:border-white/10">
                <Link
                  href="/clientlogin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3 rounded-full bg-[#FF8101] text-white text-center font-medium"
                >
                  Login
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
