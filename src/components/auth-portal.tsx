'use client';

import { useState } from 'react';
import { Check, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { Nav } from '@/components/nav';
import { SiteFooter } from '@/components/footer';
import { PrimaryButton } from '@/components/ui/sp-button';
import logoWhite from '@/assets/SupportPRO-logo (1) 1.svg';
import logoBlack from '@/assets/SupportPRO-logo black.svg';

const getImageSrc = (img: unknown): string => {
  if (!img) return '';
  if (typeof img === 'string') return img;
  if (typeof img === 'object' && img !== null && 'src' in img) {
    return String((img as { src: string }).src);
  }
  return String(img);
};

interface AuthPortalProps {
  initialTab: 'signin' | 'signup';
}

export function AuthPortal({ initialTab }: AuthPortalProps) {
  const [tab, setTab] = useState<'signin' | 'signup'>(initialTab);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const switchTab = (next: 'signin' | 'signup') => {
    setTab(next);
    setSubmitting(false);
    setShowPassword(false);
    setCaptchaVerified(false);
  };

  return (
    <main className="bg-[var(--bg-base)] text-[var(--text-primary)] min-h-screen flex flex-col justify-between overflow-x-clip">
      <Nav />

      <section className="relative pt-28 sm:pt-32 lg:pt-36 pb-16 sm:pb-24 flex-1 flex items-center justify-center px-5 md:px-6">
        <div className="w-full max-w-[440px] mx-auto rounded-[var(--radius-card-lg)] border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-7 sm:p-10 shadow-2xl">
          {/* Emblem & Portal Title */}
          <div className="text-center space-y-3 mb-7">
            <div className="flex items-center justify-center">
              <img
                src={getImageSrc(logoBlack)}
                alt="SupportPRO"
                className="h-12 w-auto object-contain block dark:hidden"
              />
              <img
                src={getImageSrc(logoWhite)}
                alt="SupportPRO"
                className="h-12 w-auto object-contain hidden dark:block"
              />
            </div>
            <div>
              <p className="text-[11px] font-mono tracking-[0.18em] text-[var(--text-muted)]">
                CLIENT AUTHENTICATION PORTAL
              </p>
            </div>
          </div>

          {/* 2-Tab Switcher */}
          <div className="grid grid-cols-2 border-b border-[var(--border-subtle)] mb-7">
            <button
              type="button"
              suppressHydrationWarning
              onClick={() => switchTab('signin')}
              className={`pb-3 text-xs font-mono font-semibold tracking-[0.14em] transition-colors border-b-2 -mb-px ${tab === 'signin'
                  ? 'border-[var(--primary)] text-[var(--text-primary)]'
                  : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
                }`}
            >
              SIGN IN
            </button>
            <button
              type="button"
              suppressHydrationWarning
              onClick={() => switchTab('signup')}
              className={`pb-3 text-xs font-mono font-semibold tracking-[0.14em] transition-colors border-b-2 -mb-px ${tab === 'signup'
                  ? 'border-[var(--primary)] text-[var(--text-primary)]'
                  : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
                }`}
            >
              SIGN UP
            </button>
          </div>

          {/* Form */}
          <form
            action={
              tab === 'signin'
                ? 'https://www.supportpro.com/clientlogin.php'
                : 'https://www.supportpro.com/signup.php'
            }
            method="POST"
            onSubmit={() => setSubmitting(true)}
            className="space-y-5"
          >
            {tab === 'signup' && (
              <div className="space-y-2">
                <label
                  htmlFor="auth-name"
                  className="block text-[11px] font-mono tracking-[0.12em] text-[var(--text-secondary)]"
                >
                  FULL NAME
                </label>
                <input
                  id="auth-name"
                  type="text"
                  name="name"
                  required
                  suppressHydrationWarning
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alex Rivera"
                  className="w-full rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-[var(--surface-2)] px-4 py-3 text-sm text-[var(--text-primary)] outline-none transition-colors placeholder:text-[var(--text-muted)] focus:border-[var(--primary)]"
                />
              </div>
            )}

            <div className="space-y-2">
              <label
                htmlFor="auth-email"
                className="block text-[11px] font-mono tracking-[0.12em] text-[var(--text-secondary)]"
              >
                EMAIL ADDRESS
              </label>
              <input
                id="auth-email"
                type="email"
                name={tab === 'signin' ? 'username' : 'email'}
                required
                suppressHydrationWarning
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-[var(--surface-2)] px-4 py-3 text-sm text-[var(--text-primary)] outline-none transition-colors placeholder:text-[var(--text-muted)] focus:border-[var(--primary)]"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="auth-password"
                className="block text-[11px] font-mono tracking-[0.12em] text-[var(--text-secondary)]"
              >
                PASSWORD
              </label>
              <div className="relative">
                <input
                  id="auth-password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  required
                  suppressHydrationWarning
                  autoComplete={tab === 'signin' ? 'current-password' : 'new-password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-[var(--surface-2)] pl-4 pr-20 py-3 text-sm text-[var(--text-primary)] outline-none transition-colors placeholder:text-[var(--text-muted)] focus:border-[var(--primary)]"
                />
                <button
                  type="button"
                  suppressHydrationWarning
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex items-center gap-1 px-1.5 py-1 text-[11px] font-mono tracking-[0.1em] text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors"
                >
                  {showPassword ? <Eye size={13} /> : <EyeOff size={13} />}
                  <span>{showPassword ? 'HIDE' : 'SHOW'}</span>
                </button>
              </div>
            </div>

            {tab === 'signin' && (
              <div className="flex items-center justify-between text-xs">
                <label className="inline-flex items-center gap-2 text-[var(--text-secondary)] cursor-pointer select-none">
                  <input
                    type="checkbox"
                    name="rememberme"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded accent-[var(--primary)]"
                  />
                  <span>Remember me</span>
                </label>
                <a
                  href="https://www.supportpro.com/pwreset.php"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors"
                >
                  Forgot password?
                </a>
              </div>
            )}

            {tab === 'signup' && (
              <div className="rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-[var(--surface-2)] px-4 py-3 flex items-center justify-between gap-3">
                <label className="inline-flex items-center gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    required
                    checked={captchaVerified}
                    onChange={(e) => setCaptchaVerified(e.target.checked)}
                    className="sr-only"
                  />
                  <span
                    aria-hidden="true"
                    className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${captchaVerified
                        ? 'bg-[var(--success)] border-[var(--success)] text-[var(--primary-foreground)]'
                        : 'border-[var(--border-strong)] bg-[var(--bg-surface)] text-transparent'
                      }`}
                  >
                    <Check size={13} strokeWidth={3} />
                  </span>
                  <span className="text-xs sm:text-sm text-[var(--text-primary)] font-medium">
                    I&apos;m not a robot
                  </span>
                </label>
                <div className="flex items-center gap-1.5 text-[10px] font-mono tracking-[0.1em] text-[var(--text-muted)]">
                  <ShieldCheck
                    size={15}
                    className={captchaVerified ? 'text-[var(--success)]' : 'text-[var(--primary)]'}
                  />
                  <span>{captchaVerified ? 'VERIFIED' : 'CAPTCHA'}</span>
                </div>
              </div>
            )}

            <PrimaryButton
              type="submit"
              disabled={submitting}
              suppressHydrationWarning
              className="w-full rounded-[var(--radius-card)] py-3.5 text-xs font-mono tracking-[0.14em]"
            >
              {tab === 'signin'
                ? submitting
                  ? 'SIGNING IN...'
                  : 'LAUNCH SIGN IN'
                : submitting
                  ? 'CREATING ACCOUNT...'
                  : 'CREATE ACCOUNT'}
            </PrimaryButton>
          </form>

          {/* Bottom Switch */}
          <div className="mt-6 pt-5 border-t border-[var(--border-subtle)] text-center text-xs text-[var(--text-secondary)]">
            {tab === 'signin' ? (
              <>
                <span>Don&apos;t have an account? </span>
                <button
                  type="button"
                  suppressHydrationWarning
                  onClick={() => switchTab('signup')}
                  className="font-semibold text-[var(--text-primary)] hover:text-[var(--primary)] transition-colors"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                <span>Already have an account? </span>
                <button
                  type="button"
                  suppressHydrationWarning
                  onClick={() => switchTab('signin')}
                  className="font-semibold text-[var(--text-primary)] hover:text-[var(--primary)] transition-colors"
                >
                  Sign in
                </button>
              </>
            )}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
