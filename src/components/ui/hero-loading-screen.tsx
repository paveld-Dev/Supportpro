'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export interface HeroLoadingScreenProps {
  minDuration?: number;
  className?: string;
}

export function HeroLoadingScreen({
  minDuration = 1800,
  className = '',
}: HeroLoadingScreenProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, minDuration);
    return () => clearTimeout(timer);
  }, [minDuration]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="hero-preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
          }}
          className={`absolute inset-0 z-50 flex items-center justify-center bg-[#0A0D12] select-none pointer-events-none ${className}`}
          aria-hidden="true"
        >
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{
              fontFamily: "'Geist', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            }}
          >
            <span className="text-2xl sm:text-3xl font-medium tracking-tight text-white">
              SupportPro
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default HeroLoadingScreen;
