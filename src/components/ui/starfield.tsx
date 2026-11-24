'use client';

import React, { useMemo } from 'react';

export interface StarfieldProps {
  className?: string;
  count?: number;
}

interface Star {
  id: number;
  top: string;
  left: string;
  size: number;
  minOpacity: number;
  maxOpacity: number;
  duration: string;
  delay: string;
  isBrandAccent?: boolean;
  hasGlow?: boolean;
}

// 120 deterministic stars evenly and naturally distributed across the entire screen
const DETERMINISTIC_STARS: Star[] = [
  // --- ROW 1: TOP SKY (0% - 15%) ---
  { id: 1, top: '2.5%', left: '3.2%', size: 1.5, minOpacity: 0.35, maxOpacity: 0.85, duration: '3.4s', delay: '0.2s' },
  { id: 2, top: '4.8%', left: '11.5%', size: 2.0, minOpacity: 0.45, maxOpacity: 0.95, duration: '4.2s', delay: '1.4s', hasGlow: true },
  { id: 3, top: '8.1%', left: '19.4%', size: 1.0, minOpacity: 0.30, maxOpacity: 0.75, duration: '2.8s', delay: '2.1s' },
  { id: 4, top: '3.2%', left: '28.6%', size: 2.5, minOpacity: 0.40, maxOpacity: 0.90, duration: '3.8s', delay: '0.7s', hasGlow: true },
  { id: 5, top: '6.7%', left: '37.1%', size: 1.5, minOpacity: 0.35, maxOpacity: 0.80, duration: '4.6s', delay: '1.9s' },
  { id: 6, top: '12.3%', left: '44.8%', size: 1.0, minOpacity: 0.25, maxOpacity: 0.70, duration: '3.1s', delay: '2.9s' },
  { id: 7, top: '4.1%', left: '52.3%', size: 2.5, minOpacity: 0.50, maxOpacity: 1.0, duration: '4.0s', delay: '0.4s', hasGlow: true, isBrandAccent: true },
  { id: 8, top: '9.4%', left: '61.7%', size: 1.5, minOpacity: 0.40, maxOpacity: 0.85, duration: '3.6s', delay: '1.7s' },
  { id: 9, top: '2.8%', left: '70.2%', size: 2.0, minOpacity: 0.35, maxOpacity: 0.90, duration: '4.4s', delay: '2.4s' },
  { id: 10, top: '7.5%', left: '78.9%', size: 1.0, minOpacity: 0.30, maxOpacity: 0.75, duration: '3.2s', delay: '0.9s' },
  { id: 11, top: '11.8%', left: '86.4%', size: 2.5, minOpacity: 0.45, maxOpacity: 0.95, duration: '4.7s', delay: '1.5s', hasGlow: true },
  { id: 12, top: '3.9%', left: '94.2%', size: 1.5, minOpacity: 0.40, maxOpacity: 0.85, duration: '3.5s', delay: '2.8s' },

  // --- ROW 2: UPPER FLANKS & CENTER (15% - 28%) ---
  { id: 13, top: '16.2%', left: '5.8%', size: 2.0, minOpacity: 0.40, maxOpacity: 0.90, duration: '3.9s', delay: '1.1s' },
  { id: 14, top: '21.4%', left: '14.1%', size: 1.0, minOpacity: 0.25, maxOpacity: 0.70, duration: '3.0s', delay: '0.5s' },
  { id: 15, top: '17.8%', left: '22.7%', size: 2.5, minOpacity: 0.45, maxOpacity: 0.95, duration: '4.5s', delay: '1.8s', hasGlow: true },
  { id: 16, top: '24.6%', left: '31.2%', size: 1.5, minOpacity: 0.30, maxOpacity: 0.75, duration: '3.7s', delay: '2.2s' },
  { id: 17, top: '19.1%', left: '40.5%', size: 1.0, minOpacity: 0.25, maxOpacity: 0.65, duration: '4.3s', delay: '0.8s' },
  { id: 18, top: '26.8%', left: '48.9%', size: 2.0, minOpacity: 0.35, maxOpacity: 0.85, duration: '3.3s', delay: '2.5s' },
  { id: 19, top: '18.4%', left: '58.2%', size: 1.5, minOpacity: 0.30, maxOpacity: 0.80, duration: '4.1s', delay: '1.3s' },
  { id: 20, top: '23.1%', left: '66.8%', size: 2.5, minOpacity: 0.45, maxOpacity: 1.0, duration: '4.8s', delay: '0.6s', hasGlow: true, isBrandAccent: true },
  { id: 21, top: '16.9%', left: '75.4%', size: 1.0, minOpacity: 0.25, maxOpacity: 0.70, duration: '3.5s', delay: '2.7s' },
  { id: 22, top: '22.3%', left: '83.1%', size: 2.0, minOpacity: 0.40, maxOpacity: 0.90, duration: '4.0s', delay: '1.2s' },
  { id: 23, top: '18.7%', left: '91.8%', size: 1.5, minOpacity: 0.35, maxOpacity: 0.80, duration: '3.1s', delay: '2.0s' },
  { id: 24, top: '25.9%', left: '97.5%', size: 2.0, minOpacity: 0.45, maxOpacity: 0.95, duration: '4.4s', delay: '0.3s', hasGlow: true },

  // --- ROW 3: MID-UPPER (28% - 42%) ---
  { id: 25, top: '30.5%', left: '2.4%', size: 1.0, minOpacity: 0.30, maxOpacity: 0.75, duration: '3.8s', delay: '1.6s' },
  { id: 26, top: '35.1%', left: '9.8%', size: 2.5, minOpacity: 0.50, maxOpacity: 1.0, duration: '4.2s', delay: '0.4s', hasGlow: true },
  { id: 27, top: '32.8%', left: '18.5%', size: 1.5, minOpacity: 0.35, maxOpacity: 0.80, duration: '3.6s', delay: '2.3s' },
  { id: 28, top: '39.4%', left: '26.9%', size: 1.0, minOpacity: 0.25, maxOpacity: 0.70, duration: '4.5s', delay: '1.0s' },
  { id: 29, top: '33.6%', left: '35.3%', size: 2.0, minOpacity: 0.40, maxOpacity: 0.90, duration: '3.2s', delay: '2.6s' },
  { id: 30, top: '38.2%', left: '43.7%', size: 1.5, minOpacity: 0.30, maxOpacity: 0.75, duration: '4.0s', delay: '0.9s' },
  { id: 31, top: '31.9%', left: '55.1%', size: 1.0, minOpacity: 0.25, maxOpacity: 0.65, duration: '3.4s', delay: '1.7s' },
  { id: 32, top: '37.4%', left: '63.5%', size: 2.0, minOpacity: 0.40, maxOpacity: 0.85, duration: '4.3s', delay: '2.8s' },
  { id: 33, top: '33.1%', left: '72.8%', size: 1.5, minOpacity: 0.35, maxOpacity: 0.80, duration: '3.7s', delay: '0.7s' },
  { id: 34, top: '39.8%', left: '80.4%', size: 2.5, minOpacity: 0.45, maxOpacity: 0.95, duration: '4.6s', delay: '1.5s', hasGlow: true },
  { id: 35, top: '34.2%', left: '88.9%', size: 1.0, minOpacity: 0.30, maxOpacity: 0.70, duration: '3.3s', delay: '2.1s' },
  { id: 36, top: '38.7%', left: '95.6%', size: 2.0, minOpacity: 0.40, maxOpacity: 0.90, duration: '4.1s', delay: '0.5s', isBrandAccent: true },

  // --- ROW 4: CENTER EQUATOR (42% - 56%) ---
  { id: 37, top: '44.3%', left: '4.6%', size: 2.0, minOpacity: 0.40, maxOpacity: 0.90, duration: '3.5s', delay: '1.8s' },
  { id: 38, top: '49.8%', left: '12.8%', size: 1.0, minOpacity: 0.25, maxOpacity: 0.70, duration: '4.4s', delay: '0.2s' },
  { id: 39, top: '46.1%', left: '21.3%', size: 2.5, minOpacity: 0.50, maxOpacity: 1.0, duration: '4.0s', delay: '2.4s', hasGlow: true },
  { id: 40, top: '53.5%', left: '29.7%', size: 1.5, minOpacity: 0.35, maxOpacity: 0.80, duration: '3.6s', delay: '1.1s' },
  { id: 41, top: '47.9%', left: '38.2%', size: 1.0, minOpacity: 0.25, maxOpacity: 0.65, duration: '4.7s', delay: '2.7s' },
  { id: 42, top: '54.2%', left: '46.5%', size: 2.0, minOpacity: 0.40, maxOpacity: 0.85, duration: '3.2s', delay: '0.6s' },
  { id: 43, top: '48.6%', left: '57.8%', size: 1.5, minOpacity: 0.30, maxOpacity: 0.75, duration: '4.1s', delay: '1.9s' },
  { id: 44, top: '52.7%', left: '65.2%', size: 2.5, minOpacity: 0.45, maxOpacity: 0.95, duration: '4.5s', delay: '0.8s', hasGlow: true },
  { id: 45, top: '46.8%', left: '74.6%', size: 1.0, minOpacity: 0.30, maxOpacity: 0.70, duration: '3.4s', delay: '2.2s' },
  { id: 46, top: '51.4%', left: '82.9%', size: 2.0, minOpacity: 0.40, maxOpacity: 0.90, duration: '3.9s', delay: '1.4s' },
  { id: 47, top: '45.7%', left: '91.2%', size: 1.5, minOpacity: 0.35, maxOpacity: 0.80, duration: '4.3s', delay: '2.9s' },
  { id: 48, top: '53.9%', left: '98.1%', size: 2.0, minOpacity: 0.45, maxOpacity: 0.95, duration: '3.7s', delay: '0.3s', hasGlow: true },

  // --- ROW 5: MID-LOWER (56% - 70%) ---
  { id: 49, top: '58.4%', left: '2.1%', size: 1.5, minOpacity: 0.35, maxOpacity: 0.80, duration: '4.2s', delay: '1.7s' },
  { id: 50, top: '63.9%', left: '10.5%', size: 2.5, minOpacity: 0.45, maxOpacity: 0.95, duration: '3.8s', delay: '0.5s', hasGlow: true, isBrandAccent: true },
  { id: 51, top: '59.7%', left: '18.9%', size: 1.0, minOpacity: 0.25, maxOpacity: 0.70, duration: '3.3s', delay: '2.3s' },
  { id: 52, top: '66.2%', left: '27.4%', size: 2.0, minOpacity: 0.40, maxOpacity: 0.85, duration: '4.6s', delay: '1.0s' },
  { id: 53, top: '61.5%', left: '36.8%', size: 1.5, minOpacity: 0.30, maxOpacity: 0.75, duration: '3.5s', delay: '2.8s' },
  { id: 54, top: '68.1%', left: '44.2%', size: 1.0, minOpacity: 0.25, maxOpacity: 0.65, duration: '4.1s', delay: '0.7s' },
  { id: 55, top: '62.8%', left: '54.6%', size: 2.0, minOpacity: 0.40, maxOpacity: 0.90, duration: '3.7s', delay: '2.1s' },
  { id: 56, top: '67.4%', left: '62.9%', size: 1.5, minOpacity: 0.35, maxOpacity: 0.80, duration: '4.4s', delay: '1.3s' },
  { id: 57, top: '60.9%', left: '71.5%', size: 2.5, minOpacity: 0.50, maxOpacity: 1.0, duration: '4.0s', delay: '0.4s', hasGlow: true },
  { id: 58, top: '65.7%', left: '79.8%', size: 1.0, minOpacity: 0.30, maxOpacity: 0.70, duration: '3.2s', delay: '2.6s' },
  { id: 59, top: '62.1%', left: '87.3%', size: 2.0, minOpacity: 0.40, maxOpacity: 0.85, duration: '4.5s', delay: '1.6s' },
  { id: 60, top: '67.8%', left: '94.9%', size: 1.5, minOpacity: 0.35, maxOpacity: 0.80, duration: '3.6s', delay: '0.9s' },

  // --- ROW 6: LOWER SKY (70% - 84%) ---
  { id: 61, top: '72.3%', left: '5.2%', size: 2.0, minOpacity: 0.40, maxOpacity: 0.90, duration: '3.9s', delay: '2.0s' },
  { id: 62, top: '77.8%', left: '13.6%', size: 1.0, minOpacity: 0.25, maxOpacity: 0.70, duration: '4.3s', delay: '0.8s' },
  { id: 63, top: '73.4%', left: '22.1%', size: 2.5, minOpacity: 0.45, maxOpacity: 0.95, duration: '3.4s', delay: '1.5s', hasGlow: true },
  { id: 64, top: '80.1%', left: '30.5%', size: 1.5, minOpacity: 0.35, maxOpacity: 0.80, duration: '4.7s', delay: '2.7s' },
  { id: 65, top: '75.6%', left: '39.8%', size: 1.0, minOpacity: 0.25, maxOpacity: 0.65, duration: '3.1s', delay: '0.3s' },
  { id: 66, top: '82.3%', left: '47.2%', size: 2.0, minOpacity: 0.40, maxOpacity: 0.85, duration: '4.0s', delay: '1.9s' },
  { id: 67, top: '76.9%', left: '56.7%', size: 1.5, minOpacity: 0.30, maxOpacity: 0.75, duration: '3.6s', delay: '2.4s' },
  { id: 68, top: '81.4%', left: '65.3%', size: 2.5, minOpacity: 0.50, maxOpacity: 1.0, duration: '4.2s', delay: '1.1s', hasGlow: true, isBrandAccent: true },
  { id: 69, top: '74.8%', left: '73.9%', size: 1.0, minOpacity: 0.30, maxOpacity: 0.70, duration: '3.5s', delay: '0.6s' },
  { id: 70, top: '79.2%', left: '81.6%', size: 2.0, minOpacity: 0.40, maxOpacity: 0.90, duration: '4.4s', delay: '2.2s' },
  { id: 71, top: '75.1%', left: '89.4%', size: 1.5, minOpacity: 0.35, maxOpacity: 0.80, duration: '3.8s', delay: '1.7s' },
  { id: 72, top: '82.7%', left: '96.8%', size: 2.0, minOpacity: 0.45, maxOpacity: 0.95, duration: '3.3s', delay: '0.4s', hasGlow: true },

  // --- ROW 7: BOTTOM HORIZON (84% - 98%) ---
  { id: 73, top: '87.2%', left: '3.7%', size: 1.5, minOpacity: 0.35, maxOpacity: 0.80, duration: '4.1s', delay: '1.2s' },
  { id: 74, top: '92.6%', left: '11.9%', size: 2.0, minOpacity: 0.40, maxOpacity: 0.90, duration: '3.7s', delay: '2.5s' },
  { id: 75, top: '88.4%', left: '20.4%', size: 1.0, minOpacity: 0.25, maxOpacity: 0.70, duration: '4.5s', delay: '0.7s' },
  { id: 76, top: '95.1%', left: '28.8%', size: 2.5, minOpacity: 0.45, maxOpacity: 0.95, duration: '3.9s', delay: '1.8s', hasGlow: true },
  { id: 77, top: '89.7%', left: '37.3%', size: 1.5, minOpacity: 0.30, maxOpacity: 0.75, duration: '3.2s', delay: '2.9s' },
  { id: 78, top: '96.3%', left: '45.9%', size: 1.0, minOpacity: 0.25, maxOpacity: 0.65, duration: '4.6s', delay: '0.5s' },
  { id: 79, top: '90.9%', left: '53.4%', size: 2.0, minOpacity: 0.40, maxOpacity: 0.85, duration: '3.5s', delay: '1.4s' },
  { id: 80, top: '95.8%', left: '61.8%', size: 1.5, minOpacity: 0.35, maxOpacity: 0.80, duration: '4.0s', delay: '2.6s' },
  { id: 81, top: '88.1%', left: '70.5%', size: 2.5, minOpacity: 0.50, maxOpacity: 1.0, duration: '4.3s', delay: '0.9s', hasGlow: true },
  { id: 82, top: '93.4%', left: '78.2%', size: 1.0, minOpacity: 0.30, maxOpacity: 0.70, duration: '3.6s', delay: '2.1s' },
  { id: 83, top: '89.5%', left: '86.7%', size: 2.0, minOpacity: 0.40, maxOpacity: 0.90, duration: '4.2s', delay: '1.3s' },
  { id: 84, top: '96.7%', left: '93.5%', size: 1.5, minOpacity: 0.35, maxOpacity: 0.80, duration: '3.4s', delay: '2.8s' },

  // --- COMPLEMENTARY FILLER STARS (Natural cosmic variance & depth) ---
  { id: 85, top: '1.8%', left: '16.2%', size: 1.0, minOpacity: 0.25, maxOpacity: 0.65, duration: '3.8s', delay: '3.1s' },
  { id: 86, top: '5.4%', left: '84.7%', size: 1.0, minOpacity: 0.25, maxOpacity: 0.65, duration: '4.1s', delay: '0.6s' },
  { id: 87, top: '14.5%', left: '9.3%', size: 2.0, minOpacity: 0.40, maxOpacity: 0.85, duration: '3.6s', delay: '2.0s' },
  { id: 88, top: '28.2%', left: '8.1%', size: 1.5, minOpacity: 0.30, maxOpacity: 0.75, duration: '4.4s', delay: '1.1s' },
  { id: 89, top: '41.7%', left: '7.4%', size: 1.0, minOpacity: 0.25, maxOpacity: 0.65, duration: '3.3s', delay: '2.7s' },
  { id: 90, top: '56.3%', left: '8.6%', size: 2.0, minOpacity: 0.35, maxOpacity: 0.85, duration: '4.2s', delay: '0.8s' },
  { id: 91, top: '69.8%', left: '7.9%', size: 1.5, minOpacity: 0.30, maxOpacity: 0.75, duration: '3.7s', delay: '2.2s' },
  { id: 92, top: '84.1%', left: '8.8%', size: 1.0, minOpacity: 0.25, maxOpacity: 0.65, duration: '4.0s', delay: '1.5s' },
  { id: 93, top: '13.9%', left: '92.4%', size: 1.0, minOpacity: 0.25, maxOpacity: 0.65, duration: '3.5s', delay: '0.4s' },
  { id: 94, top: '27.6%', left: '93.1%', size: 2.0, minOpacity: 0.40, maxOpacity: 0.85, duration: '4.3s', delay: '1.9s' },
  { id: 95, top: '42.1%', left: '94.5%', size: 1.5, minOpacity: 0.30, maxOpacity: 0.75, duration: '3.2s', delay: '2.5s' },
  { id: 96, top: '57.4%', left: '93.8%', size: 1.0, minOpacity: 0.25, maxOpacity: 0.65, duration: '4.6s', delay: '0.9s' },
  { id: 97, top: '71.2%', left: '92.6%', size: 2.0, minOpacity: 0.35, maxOpacity: 0.85, duration: '3.8s', delay: '2.3s' },
  { id: 98, top: '85.6%', left: '94.1%', size: 1.5, minOpacity: 0.30, maxOpacity: 0.75, duration: '4.1s', delay: '1.2s' },
  { id: 99, top: '98.2%', left: '23.5%', size: 1.0, minOpacity: 0.25, maxOpacity: 0.65, duration: '3.4s', delay: '3.0s' },
  { id: 100, top: '98.6%', left: '76.8%', size: 1.5, minOpacity: 0.30, maxOpacity: 0.75, duration: '4.5s', delay: '0.2s' },
];

export function Starfield({ className = '', count = DETERMINISTIC_STARS.length }: StarfieldProps) {
  const stars = useMemo(() => DETERMINISTIC_STARS.slice(0, count), [count]);

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden select-none z-0 ${className}`}
      style={{ contentVisibility: 'auto' }}
      aria-hidden="true"
    >
      <style>{`
        @keyframes starTwinkle {
          0%, 100% {
            opacity: var(--min-op);
            transform: scale(0.9);
          }
          50% {
            opacity: var(--max-op);
            transform: scale(1.15);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .star-particle {
            animation: none !important;
          }
        }
      `}</style>

      {/* Deterministic starfield layer */}
      {stars.map((star) => {
        const isBrand = star.isBrandAccent;
        const color = isBrand ? '#FF8101' : '#FFFFFF';
        const shadow = star.hasGlow
          ? isBrand
            ? '0 0 8px rgba(255, 129, 1, 0.9), 0 0 16px rgba(255, 129, 1, 0.45)'
            : '0 0 6px rgba(255, 255, 255, 0.9), 0 0 14px rgba(255, 255, 255, 0.4)'
          : undefined;

        return (
          <span
            key={star.id}
            className="star-particle absolute rounded-full"
            style={
              {
                top: star.top,
                left: star.left,
                width: `${star.size}px`,
                height: `${star.size}px`,
                backgroundColor: color,
                boxShadow: shadow,
                '--min-op': star.minOpacity,
                '--max-op': star.maxOpacity,
                opacity: star.minOpacity,
                animation: `starTwinkle ${star.duration} ease-in-out infinite`,
                animationDelay: star.delay,
              } as React.CSSProperties
            }
          />
        );
      })}
    </div>
  );
}

export default Starfield;
