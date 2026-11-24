'use client';

import React, { useRef, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionTemplate,
} from 'motion/react';
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
        <div
          className="w-2/3 h-2/3 rounded-full border border-[#FF8101]/20 animate-spin"
          style={{ animationDuration: '6s' }}
        />
        <div className="absolute inset-0 rounded-full shadow-[0_0_30px_rgba(255,129,1,0.08)]" />
      </div>
    </div>
  ),
});

export function HeroSection6() {
  const outerSectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  // ResizeObserver for tracking stage viewport dimensions
  const [stageDimensions, setStageDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setStageDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Scroll tracking calibrated to 2 scrolls (300vh total height, 200vh scroll runway)
  const { scrollYProgress } = useScroll({
    target: outerSectionRef,
    offset: ['start start', 'end end'],
  });

  // 1. Globe Scale: holds till 12%, scales smoothly from 1x to ~3.2x by 28%
  const baseGlobeScale = useTransform(scrollYProgress, [0, 0.12, 0.28, 1], [1, 1, 3.2, 3.4]);

  // 2. Globe Opacity: sharp till 24%, fades out completely by 34%
  const baseGlobeOpacity = useTransform(scrollYProgress, [0, 0.24, 0.34, 1], [1, 1, 0, 0]);

  // 3. Content (Headline, Subhead, CTAs): sharp till 10%, fades out & blurs from 0 to 8px by 22%
  const baseContentOpacity = useTransform(scrollYProgress, [0, 0.10, 0.22, 1], [1, 1, 0, 0]);
  const baseContentBlur = useTransform(scrollYProgress, [0, 0.10, 0.22, 1], [0, 0, 8, 8]);
  // Use 'none' when blur is near-zero to prevent GPU filter-graph overhead during normal display
  const contentFilter = useTransform(baseContentBlur, (v) => v > 0.2 ? `blur(${v.toFixed(1)}px)` : 'none');

  // 4. Certification Marquee: fades out smoothly between 10% and 22%
  const baseMarqueeOpacity = useTransform(scrollYProgress, [0, 0.10, 0.22, 1], [1, 1, 0, 0]);

  // 5. Stage Background Color: fades smoothly to deep dark (#0A0A0A) between 24% and 34%
  const stageBackground = useTransform(
    scrollYProgress,
    [0, 0.24, 0.34, 1],
    ['#0A0D12', '#0A0D12', '#0A0A0A', '#0A0A0A']
  );

  // 6. Centered Transition Quote Block calibrated to 2 scrolls:
  // - 34% to 42%: Fades in & sharpens from blur down to 0px
  // - 42% to 86%: Clear, readable hold window at full 100% opacity and 0px blur
  // - 86% to 98%: Smoothly fades out and lifts slightly as the next section scrolls in
  const baseTransitionTextOpacity = useTransform(
    scrollYProgress,
    [0, 0.34, 0.42, 0.86, 0.98, 1],
    [0, 0, 1, 1, 0, 0]
  );
  const baseTransitionTextBlur = useTransform(
    scrollYProgress,
    [0, 0.34, 0.42, 0.86, 0.98, 1],
    [10, 10, 0, 0, 6, 6]
  );
  // Use 'none' when blur is near-zero so 42%-86% hold window renders crisp text with zero filter passes
  const transitionTextFilter = useTransform(baseTransitionTextBlur, (v) => v > 0.2 ? `blur(${v.toFixed(1)}px)` : 'none');
  const transitionTextY = useTransform(
    scrollYProgress,
    [0, 0.34, 0.42, 0.86, 0.98, 1],
    [20, 20, 0, 0, -16, -16]
  );

  // Fallbacks for prefers-reduced-motion (always preserve scroll-based opacity fade so elements never overlap)
  const globeScale = prefersReduced ? 1 : baseGlobeScale;
  const globeOpacity = baseGlobeOpacity;
  const contentOpacity = baseContentOpacity;
  const contentFinalFilter = prefersReduced ? 'none' : contentFilter;
  const marqueeOpacity = baseMarqueeOpacity;
  const transitionTextOpacity = baseTransitionTextOpacity;
  const transitionTextFinalFilter = prefersReduced ? 'none' : transitionTextFilter;
  const transitionFinalY = prefersReduced ? 0 : transitionTextY;

  return (
    <section
      ref={outerSectionRef}
      className="relative w-full h-[300vh] max-md:h-[260vh] bg-[#0A0D12]"
      aria-label="SupportPRO Global Infrastructure Hero Section"
    >
      {/* Pinned Stage: full-viewport stage (height: 100svh, position: sticky, top: 0) */}
      <motion.div
        ref={stageRef}
        style={{ backgroundColor: stageBackground }}
        className="sticky top-0 h-[100svh] w-full flex flex-col justify-between overflow-clip isolate text-white select-none"
      >
        {/* Deep space starfield background */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <Starfield />
        </div>

        {/* ========================================================================= */}
        {/* CENTERED GLOBE LAYER (Centered Horizontally & Vertically)                 */}
        {/* ========================================================================= */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
          aria-hidden="true"
        >
          {/* Centered Globe: Resting size strictly unchanged; scaled smoothly via transform */}
          <motion.div
            style={{
              scale: globeScale,
              opacity: globeOpacity,
              transformOrigin: 'center center',
              willChange: 'transform, opacity',
            }}
            className="pointer-events-auto flex items-center justify-center shrink-0"
          >
            <HeroGlobe showAvatars={false} />
          </motion.div>
        </div>

        {/* ========================================================================= */}
        {/* STAGE CONTENT BOUNDED TO MATCH OTHER SECTIONS (Padding & max-width)       */}
        {/* ========================================================================= */}
        <div className="relative z-20 w-full h-full max-w-[1280px] xl:max-w-[1360px] mx-auto px-5 md:px-6 lg:px-8 pointer-events-none">
          {/* TOP-LEFT: Years Badge & Headline Part 1 (75px font size) */}
          <motion.div
            style={{
              opacity: contentOpacity,
              filter: contentFinalFilter,
              willChange: 'transform, opacity, filter',
            }}
            className="absolute top-24 sm:top-28 md:top-32 lg:top-36 left-5 md:left-6 lg:left-8 max-w-xl text-left pointer-events-none"
          >
            <div className="pointer-events-auto inline-block">
              <YearsOfExcellenceBadge className="mb-3 sm:mb-4" />
            </div>

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[75px] xl:text-[75px] font-normal leading-[1.02] tracking-tight drop-shadow-[0_2px_24px_rgba(0,0,0,0.6)] text-white">
              Infrastructure<br />support that
            </h1>
          </motion.div>

          {/* BOTTOM-RIGHT: Headline Part 2 (Brought up, 75px font size, right-aligned) */}
          <motion.div
            style={{
              opacity: contentOpacity,
              filter: contentFinalFilter,
              willChange: 'transform, opacity, filter',
            }}
            className="absolute bottom-28 sm:bottom-32 lg:bottom-36 xl:bottom-40 right-5 md:right-6 lg:right-8 max-w-xl text-right pointer-events-none"
          >
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[75px] xl:text-[75px] font-normal leading-[1.02] tracking-tight drop-shadow-[0_2px_24px_rgba(0,0,0,0.6)] text-white text-right">
              <HoverOrangeSpan>stays on,</HoverOrangeSpan><br />every hour.
            </h2>
          </motion.div>

          {/* BOTTOM-LEFT: Subhead and CTAs (Brought up to match bottom-right) */}
          <motion.div
            style={{
              opacity: contentOpacity,
              filter: contentFinalFilter,
              willChange: 'transform, opacity, filter',
            }}
            className="absolute bottom-28 sm:bottom-32 lg:bottom-36 xl:bottom-40 left-5 md:left-6 lg:left-8 max-w-xs sm:max-w-sm lg:max-w-md text-left pointer-events-none"
          >
            <p className="text-xs sm:text-sm lg:text-[15px] font-normal text-white/75 leading-relaxed mb-4 sm:mb-5">
              24/7 managed infrastructure, cloud operations,<br />
              and white-label support, delivered from Chicago<br />
              and South India. Named engineers, written SLAs,<br />
              and ISO 27001 controls.
            </p>

            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pointer-events-auto">
              <a
                href="#contact-form"
                className="cursor-morph rounded-lg sm:rounded-xl bg-white text-black px-4 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white transition-all duration-200 shadow-lg shadow-black/40 flex items-center gap-1.5"
              >
                Book a Consultation
                <span className="text-[13px] leading-none">↗</span>
              </a>
              <a
                href="#services"
                className="cursor-morph rounded-lg sm:rounded-xl border border-white/20 bg-white/10 hover:bg-white/15 backdrop-blur-md text-white px-4 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white transition-all duration-200 flex items-center gap-1.5"
              >
                Explore Services
                <span className="leading-none">→</span>
              </a>
            </div>
          </motion.div>
        </div>

        {/* ========================================================================= */}
        {/* BOTTOM AREA: Certification Marquee                                        */}
        {/* ========================================================================= */}
        <motion.div
          style={{ opacity: marqueeOpacity }}
          className="absolute bottom-5 sm:bottom-7 left-0 right-0 z-30 flex flex-col items-center pointer-events-none"
        >
          <div className="w-full opacity-100">
            <CertificationMarquee showHeading={false} size="md" />
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* CENTERED TRANSITION QUOTE BLOCK                                           */}
        {/* "Past the outage, your systems stay on and your team stays calm."         */}
        {/* ========================================================================= */}
        <motion.div
          style={{
            opacity: transitionTextOpacity,
            filter: transitionTextFinalFilter,
            y: transitionFinalY,
            willChange: 'transform, opacity, filter',
          }}
          className="absolute inset-0 flex flex-col items-center justify-center z-30 px-6 sm:px-10 text-center pointer-events-none"
        >
          <div className="max-w-4xl mx-auto flex flex-col items-center justify-center">
            <blockquote className="font-display font-normal text-white text-3xl sm:text-4xl md:text-5xl lg:text-[54px] leading-[1.22] tracking-tight drop-shadow-[0_4px_32px_rgba(0,0,0,0.9)] text-center">
              &ldquo;Past the outage, your systems<br />
              stay on and your team stays<br />
              calm.&rdquo;
            </blockquote>
          </div>
        </motion.div>

        {/* Gradient edge bridge at bottom of pinned stage (positioned behind marquee) */}
        <div
          className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-b from-transparent to-[#0A0D12] pointer-events-none z-10"
          aria-hidden="true"
        />
      </motion.div>
    </section>
  );
}

export const Hero6 = HeroSection6;
export default HeroSection6;
