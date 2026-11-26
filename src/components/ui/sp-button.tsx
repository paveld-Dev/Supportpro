'use client';

import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type ButtonBaseProps = {
  children: ReactNode;
  className?: string;
  href?: string;
};

type PrimaryOrSecondaryProps = ButtonBaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> &
  AnchorHTMLAttributes<HTMLAnchorElement>;

const sharedClasses =
  'cursor-morph inline-flex items-center justify-center gap-2 rounded-[var(--radius-pill)] text-sm font-semibold transition-all duration-200 hover:ring-2 hover:ring-[var(--primary)] hover:ring-offset-2 hover:ring-offset-[var(--bg-base)] focus-visible:outline-[var(--focus-ring-width)] focus-visible:outline-solid focus-visible:outline-[var(--focus-ring-color)] focus-visible:outline-offset-[var(--focus-ring-offset)]';

export function PrimaryButton({
  children,
  className,
  href,
  ...props
}: PrimaryOrSecondaryProps) {
  const classes = cn(
    sharedClasses,
    'bg-[var(--primary)] text-[var(--primary-foreground)] px-6 sm:px-7 py-3 hover:bg-[var(--primary-hover)]',
    className
  );

  if (href) {
    return (
      <a href={href} className={classes} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}

export function SecondaryButton({
  children,
  className,
  href,
  ...props
}: PrimaryOrSecondaryProps) {
  const classes = cn(
    sharedClasses,
    'font-medium border border-[var(--border-strong)] bg-[var(--surface-2)] text-[var(--text-primary)] px-6 sm:px-7 py-3 hover:border-[var(--primary)] hover:text-[var(--primary)]',
    className
  );

  if (href) {
    return (
      <a href={href} className={classes} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
