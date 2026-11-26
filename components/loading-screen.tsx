'use client';

import React, { useEffect, useState, useRef } from 'react';
import logoWhite from '@/assets/SupportPRO-logo (1) 1.svg';

const getImageSrc = (img: any): string => {
  if (!img) return '';
  if (typeof img === 'string') return img;
  if (typeof img === 'object' && 'src' in img) return img.src;
  return String(img);
};

export function LoadingScreen() {
  const [shouldRender, setShouldRender] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const dismissedRef = useRef(false);

  useEffect(() => {
    // 1. Check sessionStorage: skip if already visited in this session
    try {
      if (sessionStorage.getItem('supportpro_session_loaded')) {
        document.documentElement.classList.add('sp-loaded');
        setShouldRender(false);
        setIsVisible(false);
        return;
      }
    } catch {
      // In case sessionStorage is blocked
    }

    // Check prefers-reduced-motion
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mql.matches);

    // 2. Lock page scroll while visible
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const dismiss = () => {
      if (dismissedRef.current) return;
      dismissedRef.current = true;

      try {
        sessionStorage.setItem('supportpro_session_loaded', '1');
      } catch {}

      // Reveal underlying page content seamlessly during the 300ms fade
      document.documentElement.classList.add('sp-loaded');
      setIsVisible(false);

      // Restore scroll and remove from DOM / tab order after fade
      const fadeDuration = mql.matches ? 0 : 350;
      setTimeout(() => {
        document.body.style.overflow = originalOverflow || '';
        setShouldRender(false);
      }, fadeDuration);
    };

    // 3. Fallback: Maximum display time of 2800ms so user is never trapped
    const safetyTimer = setTimeout(dismiss, 2800);

    // 4. Check for window load readiness
    let windowLoaded = document.readyState === 'complete';

    const checkReady = () => {
      if (windowLoaded) {
        setTimeout(dismiss, 400);
      }
    };

    const handleWindowLoad = () => {
      windowLoaded = true;
      checkReady();
    };

    if (!windowLoaded) {
      window.addEventListener('load', handleWindowLoad, { once: true });
    } else {
      checkReady();
    }

    return () => {
      clearTimeout(safetyTimer);
      window.removeEventListener('load', handleWindowLoad);
      document.body.style.overflow = originalOverflow || '';
    };
  }, []);

  if (!shouldRender) return null;

  return (
    <div
      ref={overlayRef}
      id="sp-loading-screen"
      role="status"
      aria-live="polite"
      aria-hidden={!isVisible}
      inert={!isVisible ? true : undefined}
      style={{
        transition: isReducedMotion ? 'none' : 'opacity 350ms cubic-bezier(0.4, 0, 0.2, 1)',
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? 'auto' : 'none',
      }}
      className="fixed inset-0 z-[9999999] flex flex-col items-center justify-center bg-[#0A0A0A] select-none text-white cursor-default"
    >
      <div className="flex flex-col items-center justify-center px-4 max-w-sm text-center">
        {/* SupportPRO Logo (Orange wing emblem with wordmark in brackets) */}
        <div
          className={`transition-opacity duration-500 ease-out ${
            isReducedMotion ? 'opacity-100' : 'opacity-100 animate-fadeIn'
          }`}
        >
          <img
            src={getImageSrc(logoWhite)}
            alt="SupportPRO Logo"
            className="h-12 sm:h-14 w-auto object-contain mx-auto"
            loading="eager"
            decoding="sync"
          />
        </div>

        {/* 160px Progress Track with 1px Orange Line (#FF8101 / #F57C00) */}
        <div className="w-[160px] h-[1px] bg-white/10 mt-6 mb-4 relative overflow-hidden rounded-full">
          <div
            className={`h-full bg-[#FF8101] rounded-full ${
              isReducedMotion
                ? 'w-full'
                : 'w-full origin-left animate-loadingFill animate-pulseGlow'
            }`}
            style={{
              boxShadow: '0 0 10px rgba(255, 129, 1, 0.75)',
            }}
          />
        </div>

        {/* Small text in the body sans-serif */}
        <p className="font-sans text-[12px] sm:text-[13px] text-white/70 tracking-wide font-normal">
          Connecting to our operations center…
        </p>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes loadingFill {
          0% {
            transform: scaleX(0);
          }
          60% {
            transform: scaleX(0.75);
          }
          100% {
            transform: scaleX(1);
          }
        }
        @keyframes pulseGlow {
          0%, 100% {
            opacity: 0.85;
          }
          50% {
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 450ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-loadingFill {
          animation: loadingFill 1.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .animate-pulseGlow {
          animation: pulseGlow 1.6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default LoadingScreen;
