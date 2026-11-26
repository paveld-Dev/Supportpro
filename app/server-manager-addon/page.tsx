'use client';

import { useState } from 'react';
import {
  Activity,
  ArrowRight,
  Blocks,
  Building2,
  CheckCircle2,
  ExternalLink,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Server,
  Settings,
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

const CAPABILITIES = [
  {
    icon: Settings,
    title: 'Server & permission settings',
    body: 'Configure and save server details, enable or disable the module, remove database tables cleanly on uninstall, and manage User / User Group permissions.',
  },
  {
    icon: Activity,
    title: 'Real-time server status',
    body: 'Inspect Average Server Load, Free Memory, Live Disk Usage stats, running processes, active users, Active Apache connections, and Active MySQL connections.',
  },
  {
    icon: Mail,
    title: 'Email queue management',
    body: 'View active mail queues and per-user email counts, remove queues per user, and manage Frozen mails with View Mail, View Log, Delete Mail, and Delete All Mails.',
  },
  {
    icon: Blocks,
    title: 'WHMCS compatibility',
    body: 'Built for WHMCS v7.6, v7.7, and v7.8 (v1.0) with both Admin Panel module controls and a Client Area Server Manager widget.',
  },
];

const SETUP_STEPS = [
  {
    icon: CheckCircle2,
    title: 'Activate module in Admin Panel',
    body: 'Log in to WHMCS Admin Panel, go to Setup -> Addon Modules, activate SupportPRO Server Manager, and optionally set Full Administrator Privilege.',
  },
  {
    icon: Users,
    title: 'Assign Client Group',
    body: 'Open Clients -> View/Search Clients, select the client, go to the Profile tab, choose the Client Group from the drop-down, and save changes.',
  },
  {
    icon: Server,
    title: 'Configure server in Client Area',
    body: 'Click the Server Manager Widget on the Client Area dashboard (or Top Menu) and enter the Dedicated or Reseller Server IP, root username, and password.',
  },
  {
    icon: Activity,
    title: 'Monitor status & mail queues',
    body: 'Save your server details to immediately access live Server Status metrics and Email Queue Management including Frozen Mails.',
  },
];

export default function ServerManagerAddonPage() {
  const [formSent, setFormSent] = useState(false);
  const [message, setMessage] = useState('');

  return (
    <main className="bg-[var(--bg-base)] text-[var(--text-primary)] min-h-screen overflow-x-clip">
      <Nav />

      {/* ─── Hero Section ──────────────────────────────────────────────────────── */}
      <section className="pt-24 sm:pt-28 lg:pt-32 pb-10 sm:pb-12 border-b border-[var(--border-subtle)]">
        <div className="mx-auto max-w-[1152px] px-5 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 min-w-0 space-y-5">

              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[64px] leading-[1.04] text-[var(--text-primary)] tracking-tight">
                SupportPRO server manager
                <span className="text-[var(--primary)]">.</span>
              </h1>

              <p className="text-[15px] sm:text-[17px] leading-relaxed text-[var(--text-secondary)] max-w-[580px]">
                Fully functional SupportPRO server manager module for WHMCS to check live server status and manage server, IP, and mail queue features efficiently.
              </p>

              <div className="pt-1 flex flex-wrap items-center gap-3 sm:gap-4">
                <PrimaryButton
                  href="https://marketplace.whmcs.com/product/5233-supportpro-server-manager"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>Get it now</span>
                  <ExternalLink size={15} />
                </PrimaryButton>
                <SecondaryButton href="#setup">
                  <span>View setup steps</span>
                </SecondaryButton>
              </div>
            </div>

            <div className="lg:col-span-5 min-w-0 flex items-center justify-center">
              <img
                src={getImageSrc(supportIllustration)}
                alt="SupportPRO Server Manager WHMCS Addon"
                className="w-full max-w-[300px] sm:max-w-[340px] lg:max-w-[360px] h-auto object-contain rounded-[var(--radius-card)]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Addon Summary Row (Visible on Desktop Without Scrolling) ──────────── */}
      <section id="addon" className="py-10 sm:py-16 lg:py-24 bg-[var(--bg-surface)] border-b border-[var(--border-subtle)]">
        <div className="mx-auto max-w-[1152px] px-5 md:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
            <div>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl leading-[1.08] text-[var(--text-primary)] tracking-tight">
                WHMCS marketplace addon
                <span className="text-[var(--primary)]">.</span>
              </h2>
              <p className="text-sm sm:text-[15px] text-[var(--text-secondary)] mt-2">
                Compatible with WHMCS v7.6, v7.7, and v7.8 (v1.0).
              </p>
            </div>
            <span className="text-xs font-mono text-[var(--text-muted)] shrink-0">
              Free WHMCS module
            </span>
          </div>

          <div className="rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-[var(--surface-2)] p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4 lg:gap-6">
            <div className="min-w-0 flex-1">
              <h3 className="text-base sm:text-lg font-semibold text-[var(--text-primary)] leading-snug">
                SupportPRO Server Manager
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1 leading-relaxed">
                Server status monitoring, Apache/MySQL active connections, and Email Queue &amp; Frozen Mail management inside WHMCS.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-between lg:justify-end gap-4 sm:gap-6">
              <div className="text-left sm:text-right min-w-[90px]">
                <span className="text-lg sm:text-xl font-bold text-[var(--text-primary)]">
                  Free
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <SecondaryButton href="#capabilities" className="px-5 py-2.5 text-xs sm:text-sm">
                  Compare features
                </SecondaryButton>
                <PrimaryButton
                  href="https://marketplace.whmcs.com/product/5233-supportpro-server-manager"
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-2.5 text-xs sm:text-sm"
                >
                  <span>Get it now</span>
                  <ExternalLink size={14} />
                </PrimaryButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Capabilities Section (2-Column Grid of 16px Cards) ───────────────── */}
      <section id="capabilities" className="py-16 sm:py-20 lg:py-24 border-b border-[var(--border-subtle)]">
        <div className="mx-auto max-w-[1152px] px-5 md:px-6 lg:px-8">
          <div className="mb-8 sm:mb-12 max-w-[740px]">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl leading-[1.08] text-[var(--text-primary)] tracking-tight">
              Module capabilities
              <span className="text-[var(--primary)]">.</span>
            </h2>
            <p className="text-sm sm:text-[15px] text-[var(--text-secondary)] mt-3 leading-relaxed">
              Manage server health, active connections, and mail queues directly from your WHMCS dashboard.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {CAPABILITIES.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 space-y-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-[var(--radius-card)] bg-[var(--surface-2)] border border-[var(--border-subtle)] text-[var(--primary)] flex items-center justify-center shrink-0">
                      <Icon size={18} strokeWidth={1.75} />
                    </span>
                    <h3 className="text-base sm:text-lg font-semibold text-[var(--text-primary)]">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {item.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Setup Steps Section ──────────────────────────────────────────────── */}
      <section id="setup" className="py-16 sm:py-20 lg:py-24 bg-[var(--bg-surface)] border-b border-[var(--border-subtle)]">
        <div className="mx-auto max-w-[1152px] px-5 md:px-6 lg:px-8">
          <div className="mb-8 sm:mb-12 max-w-[740px]">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl leading-[1.08] text-[var(--text-primary)] tracking-tight">
              One-step configuration
              <span className="text-[var(--primary)]">.</span>
            </h2>
            <p className="text-sm sm:text-[15px] text-[var(--text-secondary)] mt-3 leading-relaxed">
              Follow these steps in your WHMCS Admin Panel and Client Area to activate the module.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {SETUP_STEPS.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.title}
                  className="rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-[var(--surface-2)] p-6 space-y-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-[var(--radius-card)] bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--primary)] flex items-center justify-center shrink-0">
                      <Icon size={18} strokeWidth={1.75} />
                    </span>
                    <h3 className="text-base sm:text-lg font-semibold text-[var(--text-primary)]">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {step.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Custom Integration Section ───────────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-24 border-b border-[var(--border-subtle)]">
        <div className="mx-auto max-w-[1152px] px-5 md:px-6 lg:px-8">
          <div className="rounded-[var(--radius-card)] border border-[var(--border-subtle)] border-t-2 border-t-[var(--primary)] bg-[var(--bg-surface)] p-6 sm:p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-[var(--primary)]">
                <Sparkles size={14} />
                <span>Custom WHMCS</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-[var(--text-primary)] tracking-tight">
                Need custom WHMCS development?
              </h2>
              <p className="text-sm sm:text-[15px] text-[var(--text-secondary)] leading-relaxed">
                Custom modules, server automation, and 24/7 support tailored to your WHMCS environment.
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
                      placeholder="Tell us about your WHMCS version and server management needs"
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
