'use client';

import React, { useEffect, useState, useRef } from 'react';
import logoWhite from '@/assets/SupportPRO-logo (1) 1.svg';
import { LoadingGlobe } from '@/components/ui/loading-globe';

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
  const [isHero6, setIsHero6] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const dismissedRef = useRef(false);

  useEffect(() => {
    // Check if Hero 6 is active:
    // 1. URL search param (?hero=6)
    // 2. localStorage ('supportpro_selected_hero' === '6')
    // 3. Document attribute data-hero="6"
    const checkHero6 = () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const heroParam = params.get('hero');
        if (heroParam === '6') return true;
        if (heroParam && heroParam !== '6') return false;
        const savedHero = localStorage.getItem('supportpro_selected_hero');
        if (savedHero === '6') return true;
        if (document.documentElement.getAttribute('data-hero') === '6') return true;
      } catch {}
      return false;
    };

    const hero6Active = checkHero6();
    setIsHero6(hero6Active);

    // 1. Check sessionStorage: skip if already visited in this session (unless testing Hero 6 explicitly via ?hero=6)
    try {
      const isExplicitHero6 = new URLSearchParams(window.location.search).get('hero') === '6';
      if (sessionStorage.getItem('supportpro_session_loaded') && !isExplicitHero6) {
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

    // Set flag so secondary hero loaders know the main site loader ran
    if (typeof window !== 'undefined') {
      (window as any).__SP_SITE_LOADER_RAN = Date.now();
    }

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

    // 4. Check for window load & globe frame readiness
    let globeReady = !hero6Active; // if not hero 6, no need to wait for canvas
    let windowLoaded = document.readyState === 'complete';

    const checkBothReady = () => {
      if (globeReady && windowLoaded) {
        // Allow a small visual moment for the line animation and globe rotation before smooth dismiss
        setTimeout(dismiss, hero6Active ? 700 : 400);
      }
    };

    const handleWindowLoad = () => {
      windowLoaded = true;
      checkBothReady();
    };

    if (!windowLoaded) {
      window.addEventListener('load', handleWindowLoad, { once: true });
    }

    // Poll briefly for the canvas to mount and render its initial frame
    let pollInterval: NodeJS.Timeout | null = null;
    let frameWait: number | null = null;

    if (hero6Active) {
      const detectGlobe = () => {
        const canvas = document.querySelector('canvas');
        if (canvas) {
          frameWait = requestAnimationFrame(() => {
            globeReady = true;
            checkBothReady();
          });
          if (pollInterval) clearInterval(pollInterval);
        }
      };

      detectGlobe();
      if (!globeReady) {
        pollInterval = setInterval(detectGlobe, 50);
      }
    } else {
      checkBothReady();
    }

    // Listen for custom hero switch events in case hero changes dynamically
    const handleSwitchHero = (e: any) => {
      if (e.detail === 6 || e.detail === '6') {
        setIsHero6(true);
      } else {
        setIsHero6(false);
      }
    };
    window.addEventListener('supportpro:switch-hero', handleSwitchHero);

    return () => {
      clearTimeout(safetyTimer);
      if (pollInterval) clearInterval(pollInterval);
      if (frameWait) cancelAnimationFrame(frameWait);
      window.removeEventListener('load', handleWindowLoad);
      window.removeEventListener('supportpro:switch-hero', handleSwitchHero);
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
        {/* Globe exclusively rendered when on Hero 6 */}
        {isHero6 && (
          <div
            className={`transition-opacity duration-600 ease-out mb-5 sm:mb-6 ${
              isReducedMotion ? 'opacity-100' : 'opacity-100 animate-fadeIn'
            }`}
          >
            <LoadingGlobe size={130} />
          </div>
        )}

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
