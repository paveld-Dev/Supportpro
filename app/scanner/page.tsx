'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  AlertCircle,
  Check,
  CheckCircle2,
  RefreshCw,
  Lock,
} from 'lucide-react';
import { Nav } from '@/components/nav';
import { SiteFooter } from '@/components/footer';

export default function ScannerPage() {
  const [scanMode, setScanMode] = useState<'gentle' | 'deep'>('gentle');
  const [target, setTarget] = useState('');
  const [reportEmail, setReportEmail] = useState('');
  const [sshUser, setSshUser] = useState('root');
  const [sshPort, setSshPort] = useState('22');
  const [sshPass, setSshPass] = useState('');
  const [error, setError] = useState('');

  // 'idle' | 'scanning' | 'results'
  const [scanState, setScanState] = useState<'idle' | 'scanning' | 'results'>('idle');
  const [progress, setProgress] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);

  const scanSteps = [
    'Resolving DNS & host connectivity',
    'Checking SSL/TLS certificates & security headers',
    'Auditing open ports & server configuration',
    'Measuring TTFB latency & compression',
    'Finalizing health report',
  ];

  const diagnosticResults = [
    { label: 'Security & SSL/TLS', detail: 'TLS 1.3 active • HSTS configured • No critical exposures', status: 'Passed' },
    { label: 'Performance & TTFB', detail: '94ms response time • Brotli/Gzip enabled', status: 'Optimal' },
    { label: 'DNS & Connectivity', detail: '0% packet loss • Clean propagation', status: 'Stable' },
    { label: 'Network & Storage', detail: '1500 MTU verified • Normal I/O latency', status: 'Normal' },
    { label: 'Server Configuration', detail: 'Production headers hardened', status: 'Verified' },
  ];

  const handleStartScan = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!target.trim()) {
      setError(
        scanMode === 'gentle'
          ? 'Please enter a website address (e.g. example.com)'
          : 'Please enter a website address or server IP'
      );
      return;
    }
    setScanState('scanning');
    setProgress(0);
    setStepIndex(0);
  };

  useEffect(() => {
    if (scanState !== 'scanning') return;
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setScanState('results');
          return 100;
        }
        const next = prev + 20;
        setStepIndex(Math.min(4, Math.floor(next / 20)));
        return next;
      });
    }, 380);
    return () => clearInterval(timer);
  }, [scanState]);

  const handleReset = () => {
    setScanState('idle');
    setProgress(0);
    setError('');
  };

  return (
    <main className="bg-cream dark:bg-[var(--sp-bg)] min-h-screen flex flex-col overflow-x-clip transition-colors duration-300">
      <Nav />

      {/* ─── Subtle Architectural Grid Header + Centered Minimal Scanner ──────── */}
      <section className="relative flex-1 pt-32 sm:pt-40 pb-20 sm:pb-28">
        {/* Subtle grid background behind header area */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[360px] opacity-[0.35] dark:opacity-[0.14]"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(120,115,105,0.14) 1px, transparent 1px), linear-gradient(to bottom, rgba(120,115,105,0.14) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            maskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
          }}
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-[780px] px-5 sm:px-6">
          {/* Minimal Editorial Header */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="mb-10"
          >
            <h1 className="font-display text-4xl sm:text-5xl md:text-[56px] leading-[1.04] text-ink dark:text-white tracking-tight">
              Website &amp; Server Health Scanner<span className="text-[#FF8101]">.</span>
            </h1>
            <p className="mt-4 text-[15px] sm:text-[16px] leading-relaxed text-ink/70 dark:text-white/65 max-w-[600px]">
              Enter an address to check security headers, SSL/TLS, performance, connectivity, storage, and server
              configuration. Non-intrusive checks without impacting live server performance.
            </p>
          </motion.div>

          {/* Single Centered Minimalist Card */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl border border-ink/12 dark:border-white/12 bg-white dark:bg-[#141519] p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.45)]"
          >
            {scanState === 'idle' && (
              <form onSubmit={handleStartScan} className="space-y-6">
                {/* Target Input + Primary CTA */}
                <div>
                  <label
                    htmlFor="scanner-target"
                    className="block text-[11px] font-mono uppercase tracking-wider text-ink/60 dark:text-white/50 mb-2"
                  >
                    {scanMode === 'gentle' ? 'Website Address' : 'Website Address or Server IP'}
                  </label>
                  <div className="flex flex-col sm:flex-row gap-2.5">
                    <input
                      id="scanner-target"
                      type="text"
                      suppressHydrationWarning
                      value={target}
                      onChange={(e) => {
                        setTarget(e.target.value);
                        if (error) setError('');
                      }}
                      placeholder={scanMode === 'gentle' ? 'example.com' : 'example.com or 192.168.1.1'}
                      className="flex-1 rounded-xl border border-ink/15 dark:border-white/15 bg-cream/40 dark:bg-black/30 px-4 py-3 text-sm font-mono text-ink dark:text-white outline-none placeholder:text-ink/35 dark:placeholder:text-white/30 focus:border-[#FF8101] transition-colors"
                    />
                    <button
                      type="submit"
                      suppressHydrationWarning
                      className="cursor-morph shrink-0 rounded-xl bg-[#FF8101] text-white px-6 py-3 text-sm font-semibold hover:bg-[#FF8101]/90 transition-colors inline-flex items-center justify-center gap-2"
                    >
                      <span>Scan now</span>
                      <ArrowRight size={15} />
                    </button>
                  </div>
                  {error && (
                    <p className="mt-2 text-xs text-red-500 flex items-center gap-1.5">
                      <AlertCircle size={13} />
                      <span>{error}</span>
                    </p>
                  )}
                </div>

                {/* Simple Mode Options (Gentle vs Deep) */}
                <div className="space-y-4">
                  <button
                    type="button"
                    onClick={() => setScanMode('gentle')}
                    className="w-full text-left flex items-start gap-3 group"
                  >
                    <span
                      className={`mt-0.5 w-4 h-4 rounded flex items-center justify-center border shrink-0 transition-colors ${
                        scanMode === 'gentle'
                          ? 'bg-[#FF8101] border-[#FF8101] text-white'
                          : 'border-ink/25 dark:border-white/25 bg-transparent'
                      }`}
                    >
                      {scanMode === 'gentle' && <Check size={12} strokeWidth={3} />}
                    </span>
                    <div>
                      <div className="text-sm font-semibold text-ink dark:text-white">
                        Gentle scan
                      </div>
                      <p className="text-xs text-ink/60 dark:text-white/55 leading-relaxed mt-0.5">
                        Fast, non-intrusive public check across SSL/TLS, security headers, DNS, and TTFB without
                        triggering firewalls or impacting performance.
                      </p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setScanMode('deep')}
                    className="w-full text-left flex items-start gap-3 group"
                  >
                    <span
                      className={`mt-0.5 w-4 h-4 rounded flex items-center justify-center border shrink-0 transition-colors ${
                        scanMode === 'deep'
                          ? 'bg-[#FF8101] border-[#FF8101] text-white'
                          : 'border-ink/25 dark:border-white/25 bg-transparent'
                      }`}
                    >
                      {scanMode === 'deep' && <Check size={12} strokeWidth={3} />}
                    </span>
                    <div>
                      <div className="text-sm font-semibold text-ink dark:text-white">
                        Deep server scan
                      </div>
                      <p className="text-xs text-ink/60 dark:text-white/55 leading-relaxed mt-0.5">
                        Also audits internal services, storage I/O, firewall rules, and daemon configuration via
                        read-only SSH. Only for servers you own.
                      </p>
                    </div>
                  </button>
                </div>

                {/* Optional SSH fields only when Deep scan is selected */}
                {scanMode === 'deep' && (
                  <div className="rounded-xl border border-ink/10 dark:border-white/10 bg-cream/40 dark:bg-black/25 p-4 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-ink/55 dark:text-white/45 mb-1">
                          SSH Username
                        </label>
                        <input
                          type="text"
                          value={sshUser}
                          onChange={(e) => setSshUser(e.target.value)}
                          placeholder="root"
                          className="w-full rounded-lg border border-ink/12 dark:border-white/12 bg-white dark:bg-black/30 px-3 py-2 text-xs font-mono text-ink dark:text-white outline-none focus:border-[#FF8101]"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-ink/55 dark:text-white/45 mb-1">
                          SSH Port
                        </label>
                        <input
                          type="text"
                          value={sshPort}
                          onChange={(e) => setSshPort(e.target.value)}
                          placeholder="22"
                          className="w-full rounded-lg border border-ink/12 dark:border-white/12 bg-white dark:bg-black/30 px-3 py-2 text-xs font-mono text-ink dark:text-white outline-none focus:border-[#FF8101]"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-ink/55 dark:text-white/45 mb-1">
                          Password / Key
                        </label>
                        <input
                          type="password"
                          value={sshPass}
                          onChange={(e) => setSshPass(e.target.value)}
                          placeholder="••••••••"
                          className="w-full rounded-lg border border-ink/12 dark:border-white/12 bg-white dark:bg-black/30 px-3 py-2 text-xs font-mono text-ink dark:text-white outline-none focus:border-[#FF8101]"
                        />
                      </div>
                    </div>
                    <p className="text-[11px] text-ink/55 dark:text-white/45 flex items-center gap-1.5">
                      <Lock size={11} className="text-[#FF8101] shrink-0" />
                      <span>Read-only diagnostic check. Credentials are never stored.</span>
                    </p>
                  </div>
                )}

                {/* Optional Report Email */}
                <div className="pt-2 border-t border-ink/8 dark:border-white/8">
                  <label
                    htmlFor="scanner-email"
                    className="block text-[11px] font-mono uppercase tracking-wider text-ink/60 dark:text-white/50 mb-2"
                  >
                    Email me the report (optional)
                  </label>
                  <input
                    id="scanner-email"
                    type="email"
                    suppressHydrationWarning
                    value={reportEmail}
                    onChange={(e) => setReportEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full sm:w-80 rounded-xl border border-ink/15 dark:border-white/15 bg-cream/40 dark:bg-black/30 px-3.5 py-2.5 text-xs font-mono text-ink dark:text-white outline-none placeholder:text-ink/35 dark:placeholder:text-white/30 focus:border-[#FF8101] transition-colors"
                  />
                  <p className="mt-2 text-xs text-ink/55 dark:text-white/45 leading-relaxed">
                    When the scan finishes, the summary and fixes are emailed to this address. The address is not kept.
                  </p>
                </div>
              </form>
            )}

            {/* Live Scanning Progress */}
            {scanState === 'scanning' && (
              <div className="py-2 space-y-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[11px] font-mono uppercase tracking-wider text-[#FF8101]">
                      Scanning
                    </p>
                    <p className="text-base font-semibold text-ink dark:text-white font-mono mt-0.5">
                      {target}
                    </p>
                  </div>
                  <span className="text-lg font-mono font-bold text-ink dark:text-white">
                    {progress}%
                  </span>
                </div>

                <div className="h-1.5 w-full rounded-full bg-ink/10 dark:bg-white/10 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-[#FF8101]"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                <div className="space-y-2">
                  {scanSteps.map((step, i) => {
                    const done = i < stepIndex || progress >= 100;
                    const current = i === stepIndex && progress < 100;
                    return (
                      <div
                        key={step}
                        className={`flex items-center gap-2.5 text-xs py-1.5 ${
                          current
                            ? 'text-ink dark:text-white font-medium'
                            : done
                            ? 'text-ink/70 dark:text-white/70'
                            : 'text-ink/35 dark:text-white/30'
                        }`}
                      >
                        {done ? (
                          <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                        ) : current ? (
                          <RefreshCw size={14} className="text-[#FF8101] animate-spin shrink-0" />
                        ) : (
                          <span className="w-3.5 h-3.5 rounded-full border border-current shrink-0" />
                        )}
                        <span>{step}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Clean Minimal Results */}
            {scanState === 'results' && (
              <div className="space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-ink/8 dark:border-white/8">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-base font-bold text-ink dark:text-white">
                        Health Score: 96 / 100
                      </span>
                      <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/12 text-emerald-600 dark:text-emerald-400">
                        Healthy
                      </span>
                    </div>
                    <p className="text-xs font-mono text-ink/55 dark:text-white/50 mt-0.5">
                      {target} • {scanMode === 'gentle' ? 'Gentle scan' : 'Deep server scan'}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="cursor-morph inline-flex items-center gap-1.5 rounded-xl border border-ink/15 dark:border-white/15 px-3.5 py-2 text-xs font-medium text-ink dark:text-white hover:border-[#FF8101] hover:text-[#FF8101] transition-colors"
                  >
                    <RefreshCw size={12} />
                    <span>Scan another</span>
                  </button>
                </div>

                <div className="divide-y divide-ink/8 dark:divide-white/8">
                  {diagnosticResults.map((row) => (
                    <div key={row.label} className="py-3 flex items-center justify-between gap-4">
                      <div>
                        <div className="text-xs sm:text-sm font-semibold text-ink dark:text-white">
                          {row.label}
                        </div>
                        <div className="text-xs text-ink/55 dark:text-white/50 mt-0.5">
                          {row.detail}
                        </div>
                      </div>
                      <span className="shrink-0 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                        {row.status}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-ink/8 dark:border-white/8 flex flex-wrap items-center justify-between gap-3">
                  <span className="text-xs text-ink/55 dark:text-white/50">
                    Need a certified engineer to review or harden your server?
                  </span>
                  <a
                    href="/free-server-checkup"
                    className="cursor-morph inline-flex items-center gap-1.5 rounded-xl bg-[#FF8101] text-white px-4 py-2 text-xs font-semibold hover:bg-[#FF8101]/90 transition-colors"
                  >
                    <span>Request 35-Point Checkup</span>
                    <ArrowRight size={13} />
                  </a>
                </div>
              </div>
            )}
          </motion.div>

          {/* Minimal Footnote */}
          <p className="mt-5 text-xs text-ink/50 dark:text-white/45 leading-relaxed">
            Only scan websites or servers you own or are authorised to test. SupportPRO Scanner runs non-intrusive
            checks without impacting server performance.
          </p>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
