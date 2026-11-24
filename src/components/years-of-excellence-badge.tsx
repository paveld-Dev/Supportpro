'use client';

import React from 'react';
import { motion } from 'motion/react';
import award23Img from '@/assets/award-23.png';

interface YearsOfExcellenceBadgeProps {
  className?: string;
}

const getImageSrc = (img: any): string => {
  if (!img) return '';
  if (typeof img === 'string') return img;
  if (typeof img === 'object' && 'src' in img) return img.src;
  return String(img);
};

export function YearsOfExcellenceBadge({ className = '' }: YearsOfExcellenceBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -14, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      className={`inline-flex items-center gap-2.5 sm:gap-3 select-none ${className}`}
    >
      {/* 3D Golden Laurel Award Emblem */}
      <img
        src={getImageSrc(award23Img)}
        alt="23 Years of Experience"
        className="w-10 h-10 sm:w-12 sm:h-12 object-contain transition-transform duration-300 hover:scale-105 shrink-0"
        width={104}
        height={104}
        loading="eager"
        decoding="async"
      />

      {/* Text placed horizontally aligned to the award in font-display */}
      <span className="font-display text-[17px] sm:text-[19px] lg:text-[20px] text-white/95 tracking-wide leading-none">
        Years of Experience
      </span>
    </motion.div>
  );
}
