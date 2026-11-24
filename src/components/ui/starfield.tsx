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

// 75 deterministic stars evenly and naturally distributed across all four quadrants
const DETERMINISTIC_STARS: Star[] = [
  // Top-left sector
  { id: 1, top: '4%', left: '3%', size: 1.5, minOpacity: 0.3, maxOpacity: 0.85, duration: '3.4s', delay: '0.2s' },
  { id: 2, top: '7%', left: '16%', size: 2.5, minOpacity: 0.4, maxOpacity: 0.95, duration: '4.2s', delay: '1.4s', hasGlow: true },
  { id: 3, top: '11%', left: '8%', size: 1, minOpacity: 0.2, maxOpacity: 0.6, duration: '2.8s', delay: '2.1s' },
  { id: 4, top: '15%', left: '26%', size: 2, minOpacity: 0.35, maxOpacity: 0.8, duration: '3.8s', delay: '0.7s' },
  { id: 5, top: '19%', left: '5%', size: 3, minOpacity: 0.5, maxOpacity: 1, duration: '4.6s', delay: '1.9s', hasGlow: true, isBrandAccent: true },
  { id: 6, top: '22%', left: '18%', size: 1.5, minOpacity: 0.25, maxOpacity: 0.7, duration: '3.1s', delay: '2.9s' },
  { id: 7, top: '27%', left: '11%', size: 1, minOpacity: 0.2, maxOpacity: 0.55, duration: '4.0s', delay: '0.4s' },
  { id: 8, top: '24%', left: '32%', size: 2, minOpacity: 0.4, maxOpacity: 0.9, duration: '3.6s', delay: '1.7s' },
  { id: 9, top: '9%', left: '38%', size: 1.5, minOpacity: 0.3, maxOpacity: 0.75, duration: '4.4s', delay: '2.4s' },

  // Mid-left sector (behind headline & subtext)
  { id: 10, top: '34%', left: '4%', size: 2, minOpacity: 0.35, maxOpacity: 0.85, duration: '3.2s', delay: '0.9s' },
  { id: 11, top: '39%', left: '15%', size: 1, minOpacity: 0.2, maxOpacity: 0.5, duration: '4.7s', delay: '3.1s' },
  { id: 12, top: '44%', left: '8%', size: 2.5, minOpacity: 0.45, maxOpacity: 0.95, duration: '3.9s', delay: '1.2s', hasGlow: true },
  { id: 13, top: '48%', left: '22%', size: 1.5, minOpacity: 0.3, maxOpacity: 0.75, duration: '4.1s', delay: '2.6s' },
  { id: 14, top: '53%', left: '3%', size: 1, minOpacity: 0.2, maxOpacity: 0.6, duration: '3.0s', delay: '0.5s' },
  { id: 15, top: '57%', left: '13%', size: 2, minOpacity: 0.4, maxOpacity: 0.9, duration: '4.5s', delay: '1.8s', isBrandAccent: true },
  { id: 16, top: '61%', left: '28%', size: 1.5, minOpacity: 0.25, maxOpacity: 0.7, duration: '3.7s', delay: '2.2s' },

  // Lower-left sector (behind CTA buttons & down to edge)
  { id: 17, top: '68%', left: '6%', size: 2, minOpacity: 0.35, maxOpacity: 0.8, duration: '4.3s', delay: '0.8s' },
  { id: 18, top: '72%', left: '19%', size: 1, minOpacity: 0.2, maxOpacity: 0.55, duration: '3.3s', delay: '2.5s' },
  { id: 19, top: '77%', left: '2%', size: 2.5, minOpacity: 0.5, maxOpacity: 1, duration: '4.8s', delay: '1.1s', hasGlow: true },
  { id: 20, top: '81%', left: '12%', size: 1.5, minOpacity: 0.3, maxOpacity: 0.75, duration: '3.5s', delay: '2.7s' },
  { id: 21, top: '86%', left: '24%', size: 2, minOpacity: 0.4, maxOpacity: 0.85, duration: '4.0s', delay: '0.3s' },
  { id: 22, top: '91%', left: '8%', size: 1, minOpacity: 0.2, maxOpacity: 0.6, duration: '3.1s', delay: '1.6s' },
  { id: 23, top: '94%', left: '18%', size: 2, minOpacity: 0.35, maxOpacity: 0.8, duration: '4.4s', delay: '2.3s' },
  { id: 24, top: '96%', left: '29%', size: 1.5, minOpacity: 0.25, maxOpacity: 0.7, duration: '3.8s', delay: '0.9s' },

  // Center column (connecting text & visual)
  { id: 25, top: '5%', left: '46%', size: 2.5, minOpacity: 0.45, maxOpacity: 0.95, duration: '4.1s', delay: '1.3s', hasGlow: true },
  { id: 26, top: '12%', left: '52%', size: 1, minOpacity: 0.2, maxOpacity: 0.55, duration: '3.6s', delay: '2.8s' },
  { id: 27, top: '18%', left: '44%', size: 2, minOpacity: 0.35, maxOpacity: 0.85, duration: '4.5s', delay: '0.6s' },
  { id: 28, top: '26%', left: '50%', size: 1.5, minOpacity: 0.3, maxOpacity: 0.7, duration: '3.2s', delay: '1.9s' },
  { id: 29, top: '35%', left: '45%', size: 2, minOpacity: 0.4, maxOpacity: 0.9, duration: '4.3s', delay: '2.4s', isBrandAccent: true },
  { id: 30, top: '42%', left: '53%', size: 1, minOpacity: 0.2, maxOpacity: 0.6, duration: '2.9s', delay: '0.4s' },
  { id: 31, top: '51%', left: '48%', size: 2.5, minOpacity: 0.45, maxOpacity: 1, duration: '4.7s', delay: '1.7s', hasGlow: true },
  { id: 32, top: '63%', left: '43%', size: 1.5, minOpacity: 0.25, maxOpacity: 0.75, duration: '3.4s', delay: '2.2s' },
  { id: 33, top: '74%', left: '51%', size: 2, minOpacity: 0.35, maxOpacity: 0.85, duration: '4.2s', delay: '0.8s' },
  { id: 34, top: '83%', left: '46%', size: 1, minOpacity: 0.2, maxOpacity: 0.55, duration: '3.7s', delay: '2.9s' },
  { id: 35, top: '92%', left: '52%', size: 2, minOpacity: 0.4, maxOpacity: 0.8, duration: '4.0s', delay: '1.4s' },

  // Top-right sector (above & around globe)
  { id: 36, top: '3%', left: '63%', size: 2, minOpacity: 0.35, maxOpacity: 0.85, duration: '3.5s', delay: '0.5s' },
  { id: 37, top: '6%', left: '76%', size: 3, minOpacity: 0.5, maxOpacity: 1, duration: '4.8s', delay: '1.6s', hasGlow: true },
  { id: 38, top: '4%', left: '89%', size: 1.5, minOpacity: 0.25, maxOpacity: 0.7, duration: '3.1s', delay: '2.7s' },
  { id: 39, top: '9%', left: '96%', size: 2, minOpacity: 0.4, maxOpacity: 0.9, duration: '4.3s', delay: '0.9s' },
  { id: 40, top: '12%', left: '68%', size: 1, minOpacity: 0.2, maxOpacity: 0.6, duration: '2.8s', delay: '2.0s' },
  { id: 41, top: '16%', left: '83%', size: 2, minOpacity: 0.35, maxOpacity: 0.85, duration: '4.4s', delay: '1.1s' },
  { id: 42, top: '14%', left: '93%', size: 1.5, minOpacity: 0.3, maxOpacity: 0.75, duration: '3.9s', delay: '3.2s' },
  { id: 43, top: '21%', left: '61%', size: 2.5, minOpacity: 0.45, maxOpacity: 0.95, duration: '4.6s', delay: '0.4s', hasGlow: true, isBrandAccent: true },
  { id: 44, top: '24%', left: '72%', size: 1, minOpacity: 0.2, maxOpacity: 0.55, duration: '3.3s', delay: '1.8s' },
  { id: 45, top: '27%', left: '87%', size: 2, minOpacity: 0.35, maxOpacity: 0.8, duration: '4.1s', delay: '2.5s' },
  { id: 46, top: '29%', left: '97%', size: 1.5, minOpacity: 0.25, maxOpacity: 0.7, duration: '3.6s', delay: '0.7s' },

  // Mid-right sector (framing globe visual)
  { id: 47, top: '35%', left: '59%', size: 1, minOpacity: 0.2, maxOpacity: 0.6, duration: '3.0s', delay: '2.1s' },
  { id: 48, top: '38%', left: '94%', size: 3, minOpacity: 0.5, maxOpacity: 1, duration: '4.9s', delay: '1.5s', hasGlow: true },
  { id: 49, top: '43%', left: '60%', size: 2, minOpacity: 0.4, maxOpacity: 0.85, duration: '3.7s', delay: '0.3s' },
  { id: 50, top: '48%', left: '98%', size: 1.5, minOpacity: 0.3, maxOpacity: 0.75, duration: '4.2s', delay: '2.8s' },
  { id: 51, top: '54%', left: '62%', size: 2.5, minOpacity: 0.45, maxOpacity: 0.95, duration: '4.5s', delay: '1.0s', hasGlow: true },
  { id: 52, top: '58%', left: '95%', size: 1, minOpacity: 0.2, maxOpacity: 0.55, duration: '3.2s', delay: '2.3s' },
  { id: 53, top: '64%', left: '58%', size: 2, minOpacity: 0.35, maxOpacity: 0.8, duration: '4.0s', delay: '0.6s' },
  { id: 54, top: '67%', left: '92%', size: 2, minOpacity: 0.4, maxOpacity: 0.9, duration: '3.8s', delay: '1.7s', isBrandAccent: true },

  // Lower-right sector (below globe & right boundary)
  { id: 55, top: '74%', left: '65%', size: 1, minOpacity: 0.2, maxOpacity: 0.6, duration: '3.4s', delay: '2.9s' },
  { id: 56, top: '77%', left: '78%', size: 2.5, minOpacity: 0.45, maxOpacity: 0.95, duration: '4.7s', delay: '0.8s', hasGlow: true },
  { id: 57, top: '79%', left: '96%', size: 1.5, minOpacity: 0.3, maxOpacity: 0.75, duration: '3.6s', delay: '2.0s' },
  { id: 58, top: '83%', left: '69%', size: 2, minOpacity: 0.35, maxOpacity: 0.85, duration: '4.3s', delay: '1.3s' },
  { id: 59, top: '85%', left: '88%', size: 1.5, minOpacity: 0.25, maxOpacity: 0.7, duration: '3.1s', delay: '3.0s' },
  { id: 60, top: '89%', left: '74%', size: 2.5, minOpacity: 0.5, maxOpacity: 1, duration: '4.6s', delay: '0.2s', hasGlow: true },
  { id: 61, top: '91%', left: '94%', size: 1, minOpacity: 0.2, maxOpacity: 0.6, duration: '3.5s', delay: '1.9s' },
  { id: 62, top: '95%', left: '66%', size: 2, minOpacity: 0.35, maxOpacity: 0.8, duration: '4.1s', delay: '2.4s' },
  { id: 63, top: '96%', left: '82%', size: 1.5, minOpacity: 0.3, maxOpacity: 0.75, duration: '3.9s', delay: '0.7s' },

  // Extra perimeter stars for rich depth
  { id: 64, top: '2%', left: '21%', size: 1, minOpacity: 0.2, maxOpacity: 0.5, duration: '4.0s', delay: '3.3s' },
  { id: 65, top: '2%', left: '49%', size: 1.5, minOpacity: 0.3, maxOpacity: 0.7, duration: '3.6s', delay: '1.5s' },
  { id: 66, top: '2%', left: '81%', size: 1, minOpacity: 0.2, maxOpacity: 0.55, duration: '4.4s', delay: '2.1s' },
  { id: 67, top: '98%', left: '14%', size: 1.5, minOpacity: 0.25, maxOpacity: 0.65, duration: '3.8s', delay: '0.4s' },
  { id: 68, top: '98%', left: '42%', size: 1, minOpacity: 0.2, maxOpacity: 0.5, duration: '4.2s', delay: '2.8s' },
  { id: 69, top: '98%', left: '71%', size: 1.5, minOpacity: 0.3, maxOpacity: 0.7, duration: '3.5s', delay: '1.2s' },
  { id: 70, top: '98%', left: '90%', size: 2, minOpacity: 0.35, maxOpacity: 0.8, duration: '4.5s', delay: '1.8s' },
];

export function Starfield({ className = '', count = DETERMINISTIC_STARS.length }: StarfieldProps) {
  const stars = useMemo(() => DETERMINISTIC_STARS.slice(0, count), [count]);

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden select-none z-0 ${className}`}
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
                willChange: 'opacity, transform',
              } as React.CSSProperties
            }
          />
        );
      })}
    </div>
  );
}

export default Starfield;
