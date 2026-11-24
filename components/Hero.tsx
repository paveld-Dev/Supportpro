'use client';

import { useRef } from 'react';
import dynamic from 'next/dynamic';
import { motion, useScroll, useTransform } from 'motion/react';
import { YearsOfExcellenceBadge } from '@/components/years-of-excellence-badge';
import { HoverOrangeSpan } from '@/components/hover-orange-span';
import { Starfield } from '@/components/ui/starfield';
import { CertificationMarquee } from '@/components/ui/certification-marquee';

const HeroGlobe = dynamic(() => import('@/components/ui/hero-globe'), {
  ssr: false,
  loading: () => (
    <div
      aria-hidden="true"
      className="w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px] lg:w-[480px] lg:h-[480px] xl:w-[500px] xl:h-[500px] shrink-0 mx-auto aspect-square flex items-center justify-center pointer-events-none"
    >
      {/* Globe skeleton placeholder while WebGL initializes */}
      <div className="relative w-4/5 h-4/5 rounded-full border border-white/10 bg-white/[0.01] flex items-center justify-center animate-pulse">
        <div className="w-2/3 h-2/3 rounded-full border border-[#FF8101]/20 animate-spin" style={{ animationDuration: '6s' }} />
        <div className="absolute inset-0 rounded-full shadow-[0_0_30px_rgba(255,129,1,0.08)]" />
      </div>
    </div>
  ),
});

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Parallax and scroll transitions when moving into the next section
  const textY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.72], [1, 0]);

  const globeY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const globeScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const globeOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const starfieldY = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const marqueeOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0.2]);

  return (
    <section
      ref={sectionRef}
      className="relative isolate min-h-[100svh] w-full flex flex-col justify-between pt-24 sm:pt-28 lg:pt-32 pb-6 sm:pb-8 overflow-x-clip bg-[#0A0D12] dark:bg-[#0B0B0B] text-white"
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true" />

      {/* Deep-space stars with subtle parallax depth on scroll */}
      <motion.div style={{ y: starfieldY }} className="absolute inset-0 pointer-events-none">
        <Starfield />
      </motion.div>

      {/* Main Content Area (Parallax lift & smooth fade on scroll to next section) */}
      <div className="relative z-10 my-auto mx-auto w-full max-w-[1280px] xl:max-w-[1360px] px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-12 xl:gap-16">
          {/* Left Column: Badge, Headline, subtext, and CTAs */}
          <motion.div
            style={{ y: textY, opacity: textOpacity }}
            className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left max-w-xl lg:max-w-2xl xl:max-w-3xl"
          >
            <YearsOfExcellenceBadge className="mb-4 sm:mb-5" />
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[80px] xl:text-[80px] 2xl:text-[80px] leading-[1.02] tracking-tight drop-shadow-[0_2px_24px_rgba(0,0,0,0.4)] break-words"
            >
              Infrastructure support that <HoverOrangeSpan>stays on,</HoverOrangeSpan> every hour.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 sm:mt-6 text-[15px] sm:text-base lg:text-[17px] font-normal text-white/80 leading-relaxed max-w-xl"
            >
              24/7 managed infrastructure, cloud operations,<br />
              and white-label support, delivered from Chicago<br />
              and South India. Named engineers, written SLAs,<br />
              and ISO 27001 controls.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="mt-7 sm:mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-4"
            >
              <a
                href="#contact-form"
                className="cursor-morph rounded-full bg-[#FF8101] text-white px-7 py-3.5 text-sm font-semibold hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF8101] focus-visible:ring-offset-2 focus-visible:ring-offset-black transition-all duration-200 shadow-lg shadow-[#FF8101]/25 hover:shadow-[#FF8101]/40"
              >
                Book a Consultation
              </a>
              <a
                href="#services"
                className="cursor-morph rounded-full border border-white/25 backdrop-blur-md bg-white/10 text-white px-7 py-3.5 text-sm font-medium hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black transition-all duration-200"
              >
                Explore Services
              </a>
            </motion.div>
          </motion.div>

          {/* Right Column: Hero Globe (Smooth scale & fade on scroll down) */}
          <motion.div
            style={{ y: globeY, scale: globeScale, opacity: globeOpacity }}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="shrink-0 flex items-center justify-center overflow-visible"
          >
            <HeroGlobe />
          </motion.div>
        </div>
      </div>

      {/* Bottom Section: Infinite Scrolling Certification Marquee with subtle fade on scroll */}
      <motion.div style={{ opacity: marqueeOpacity }} className="relative z-10 w-full mt-auto pt-4 sm:pt-6">
        <CertificationMarquee />
      </motion.div>

      {/* Seamless gradient fade bridge to the next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-16 bg-linear-to-b from-transparent to-[#0A0D12] pointer-events-none z-20"
        aria-hidden="true"
      />
    </section>
  );
}

export default Hero;
