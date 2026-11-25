'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import logoWhite from '@/assets/SupportPRO-logo (1) 1.svg';
import { LoadingGlobe } from '@/components/ui/loading-globe';

export interface HeroLoadingScreenProps {
  minDuration?: number;
  className?: string;
}

const getImageSrc = (img: any): string => {
  if (!img) return '';
  if (typeof img === 'string') return img;
  if (typeof img === 'object' && 'src' in img) return img.src;
  return String(img);
};

export function HeroLoadingScreen({
  minDuration = 1200,
  className = '',
}: HeroLoadingScreenProps) {
  const [loading, setLoading] = useState(() => {
    if (typeof window !== 'undefined') {
      const siteLoaderTime = (window as any).__SP_SITE_LOADER_RAN;
      // If the main site loading screen already ran very recently (initial page load), don't show double loader
      if (siteLoaderTime && Date.now() - siteLoaderTime < 3500) {
        return false;
      }
    }
    return true;
  });

  useEffect(() => {
    if (!loading) return;
    const timer = setTimeout(() => {
      setLoading(false);
    }, minDuration);
    return () => clearTimeout(timer);
  }, [loading, minDuration]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="hero6-preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
          }}
          className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0A0A0A] select-none pointer-events-none text-white ${className}`}
          aria-hidden="true"
        >
          <div className="flex flex-col items-center justify-center px-4 max-w-sm text-center">
            {/* 3D Globe with Chicago & South India beacons */}
            <div className="mb-5 sm:mb-6 animate-fadeIn">
              <LoadingGlobe size={130} />
            </div>

            {/* SupportPRO Logo */}
            <div className="animate-fadeIn">
              <img
                src={getImageSrc(logoWhite)}
                alt="SupportPRO Logo"
                className="h-12 sm:h-14 w-auto object-contain mx-auto"
                loading="eager"
              />
            </div>

            {/* 160px Progress Track with 1px Orange Line */}
            <div className="w-[160px] h-[1px] bg-white/10 mt-6 mb-4 relative overflow-hidden rounded-full">
              <div
                className="h-full bg-[#FF8101] rounded-full w-full origin-left animate-loadingFill"
                style={{
                  boxShadow: '0 0 10px rgba(255, 129, 1, 0.75)',
                }}
              />
            </div>

            {/* Status text */}
            <p className="font-sans text-[12px] sm:text-[13px] text-white/70 tracking-wide font-normal">
              Connecting to our operations center…
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default HeroLoadingScreen;
