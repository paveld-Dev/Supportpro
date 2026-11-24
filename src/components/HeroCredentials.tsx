'use client';

import { motion } from 'motion/react';
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

const credentials = [
  {
    name: 'cPanel Partner',
    icon: cPanelPartnerLogo,
    highlighted: false,
  },
  {
    name: 'Microsoft Certified',
    icon: msftCertLogo,
    highlighted: true,
  },
  {
    name: 'ISO 9001:2015',
    icon: iso9001Logo,
    highlighted: false,
  },
  {
    name: 'ISO 27001',
    icon: iso27001Logo,
    highlighted: false,
  },
  {
    name: 'AICPA SOC',
    icon: aicpaSocLogo,
    highlighted: false,
  },
  {
    name: 'AWS Certified',
    icon: awsCertLogo,
    highlighted: false,
  },
  {
    name: 'Red Hat Certified',
    icon: redHatCertLogo,
    highlighted: false,
  },
];

export function HeroCredentials({ className = '' }: { className?: string }) {
  const marqueeItems = [...credentials, ...credentials, ...credentials];

  return (
    <div className={`w-full max-w-5xl mx-auto px-4 ${className}`}>
      {/* Location line */}
      <p className="text-center text-xs sm:text-[13px] text-white/70 mb-3 sm:mb-4 tracking-normal">
        In business since 2003 — headquartered in{' '}
        <span className="text-white font-semibold">Chicago, IL</span>, with three offshore delivery
        centres in <span className="text-white font-semibold">South India</span>.
      </p>

      {/* Badges marquee strip */}
      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_30px,black_calc(100%-30px),transparent)] py-1">
        <div className="flex w-max animate-marquee items-center gap-3 sm:gap-4">
          {marqueeItems.map((item, idx) => (
            <div
              key={`${item.name}-${idx}`}
              className={`inline-flex shrink-0 items-center gap-2.5 px-4 py-2 rounded-full transition-all duration-200 select-none border-0 border-transparent ${
                item.highlighted
                  ? 'bg-[#181818] shadow-md shadow-black/50 hover:bg-[#222225]'
                  : 'bg-[#141518]/95 shadow-md shadow-black/40 hover:bg-[#1a1c22]'
              }`}
            >
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white flex items-center justify-center p-0.5 shrink-0 overflow-hidden">
                <img
                  src={getImageSrc(item.icon)}
                  alt={item.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xs sm:text-[13px] font-medium text-white/90 whitespace-nowrap">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HeroCredentials;
