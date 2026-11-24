'use client';

import React from 'react';
import awsCertLogo from '@/assets/logos 2/image 86.png';
import redHatCertLogo from '@/assets/logos 2/image 87.png';
import cPanelPartnerLogo from '@/assets/logos 2/image 88.png';
import msftCertLogo from '@/assets/logos 2/image 89.png';
import iso9001Logo from '@/assets/logos 2/image 90.png';
import iso27001Logo from '@/assets/logos 2/image 91.png';
import aicpaSocLogo from '@/assets/logos 2/image 92.png';

const getImageSrc = (img: any): string => {
  if (!img) return '';
  if (typeof img === 'string') return img;
  if (typeof img === 'object' && 'src' in img) return img.src;
  return String(img);
};

const CERTIFICATIONS = [
  {
    name: 'ISO 27001 Certified',
    icon: iso27001Logo,
    highlighted: false,
  },
  {
    name: 'AICPA SOC 2 Type II',
    icon: aicpaSocLogo,
    highlighted: false,
  },
  {
    name: 'AWS Certified Partner',
    icon: awsCertLogo,
    highlighted: false,
  },
  {
    name: 'cPanel Premier Partner',
    icon: cPanelPartnerLogo,
    highlighted: false,
  },
  {
    name: 'Microsoft Certified',
    icon: msftCertLogo,
    highlighted: false,
  },
  {
    name: 'Red Hat Certified',
    icon: redHatCertLogo,
    highlighted: false,
  },
  {
    name: 'ISO 9001:2015',
    icon: iso9001Logo,
    highlighted: false,
  },
];

export function CertificationMarquee({
  className = '',
  showHeading = true,
  size = 'md',
}: {
  className?: string;
  showHeading?: boolean;
  size?: 'sm' | 'md';
}) {
  const isSm = size === 'sm';

  // Quadruple items to ensure seamless infinite looping on ultra-wide screens
  const marqueeItems = [
    ...CERTIFICATIONS,
    ...CERTIFICATIONS,
    ...CERTIFICATIONS,
    ...CERTIFICATIONS,
  ];

  return (
    <div className={`w-full overflow-hidden select-none ${className}`}>
      <style>{`
        @keyframes scrollRightToLeft {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        .cert-marquee-track {
          display: flex;
          width: max-content;
          animation: scrollRightToLeft 32s linear infinite;
          will-change: transform;
        }
        .cert-marquee-track:hover {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .cert-marquee-track {
            animation: none;
            flex-wrap: wrap;
            justify-content: center;
          }
        }
      `}</style>

      {/* Subtle eyebrow caption */}
      {showHeading && (
        <div className="text-center mb-3 sm:mb-4 px-4">
          <p className="text-[11px] sm:text-xs font-medium tracking-wider text-white/50 uppercase">
            Enterprise Security Standards & Industry Certifications
          </p>
        </div>
      )}

      {/* Marquee viewport with smooth edge gradient fade masks */}
      <div
        className="relative w-full overflow-hidden py-1"
        style={{
          maskImage:
            'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        }}
      >
        <div className={`cert-marquee-track items-center ${isSm ? 'gap-2 sm:gap-2.5' : 'gap-3 sm:gap-4'}`}>
          {marqueeItems.map((item, idx) => (
            <div
              key={`${item.name}-${idx}`}
              className={`inline-flex shrink-0 items-center transition-all duration-200 border-0 border-transparent ${isSm
                  ? 'gap-2 sm:gap-2.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full'
                  : 'gap-3.5 sm:gap-4 px-5 sm:px-6 py-2.5 sm:py-3.5 rounded-full'
                } ${item.highlighted
                  ? 'bg-[#181818] shadow-md shadow-black/50 hover:bg-[#222225]'
                  : 'bg-[#141518]/95 shadow-md shadow-black/40 hover:bg-[#1a1c22]'
                }`}
            >
              <div
                className={`rounded-full bg-white flex items-center justify-center shrink-0 overflow-hidden shadow-sm ${isSm
                    ? 'w-6 h-6 sm:w-7 sm:h-7 p-0.5 sm:p-1'
                    : 'w-9 h-9 sm:w-11 sm:h-11 p-1 sm:p-1.5'
                  }`}
              >
                <img
                  src={getImageSrc(item.icon)}
                  alt={item.name}
                  className="w-full h-full object-contain"
                  loading="lazy"
                  decoding="async"
                  width={44}
                  height={44}
                />
              </div>
              <span
                className={`font-semibold text-white/95 whitespace-nowrap tracking-tight ${isSm ? 'text-xs sm:text-[13px]' : 'text-sm sm:text-[15px]'
                  }`}
              >
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CertificationMarquee;
