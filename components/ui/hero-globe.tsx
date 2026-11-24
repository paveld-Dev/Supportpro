'use client';

import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import createGlobe from 'cobe';
import { GLOBE_AVATAR_PINS, type GlobeAvatarPin } from '@/content/locations';

export interface HeroGlobeProps {
  className?: string;
  autoRotateSpeed?: number;
  showAvatars?: boolean;
  initialPhi?: number;
}

// SupportPRO Primary Infrastructure Bases (Command Centres)
export const SUPPORTPRO_BASES = {
  chicago: {
    id: 'base-chicago',
    name: 'Base: Chicago HQ',
    city: 'Chicago, IL',
    country: 'USA',
    lat: 41.88,
    lng: -87.63,
    color: '#FF8101',
    glowColor: 'rgba(255, 129, 1, 0.95)',
  },
  southIndia: {
    id: 'base-south-india',
    name: 'Support: South India delivery',
    city: 'South India Hub',
    country: 'India',
    lat: 12.97,
    lng: 77.59,
    color: '#FF8101',
    glowColor: 'rgba(255, 129, 1, 0.95)',
  },
};

// Prominently highlighted beacons on the globe: Chicago HQ and South India delivery hub
export interface GlobeHighlightDot {
  id: string;
  name: string;
  lat: number;
  lng: number;
  size: number;        // 3D COBE marker size
  radius: number;      // 2D canvas core dot radius
  glowRadius: number;  // 2D canvas glowing halo radius
  isPrimary?: boolean; // Main HQ or Primary delivery hub
}

export const GLOBE_HIGHLIGHT_DOTS: GlobeHighlightDot[] = [
  // 1. Chicago Global Headquarters (Base marker only, no arcs touch it)
  {
    id: 'dot-chicago',
    name: 'Base: Chicago HQ',
    lat: 41.88,
    lng: -87.63,
    size: 0.04,
    radius: 4.5,
    glowRadius: 12,
    isPrimary: true,
  },
  // 2. South India Delivery Centre (Highlighted support source, all arcs begin here)
  {
    id: 'dot-india',
    name: 'Support: South India delivery',
    lat: 12.97,
    lng: 77.59,
    size: 0.04,
    radius: 4.5,
    glowRadius: 12,
    isPrimary: true,
  },
];

export interface GlobeNetworkRoute {
  id: string;
  fromBase: 'chicago' | 'southIndia';
  fromLat: number;
  fromLng: number;
  toPinId: string;
  toLat: number;
  toLng: number;
  speed: number;
  phase: number;
  color: string;
}

// Network routes originating strictly from South India (12.97, 77.59) to global client locations (15 total, long-distance global span)
export const GLOBE_NETWORK_ROUTES: GlobeNetworkRoute[] = [
  // 1. South India -> London UK Client Node
  {
    id: 'route-india-london',
    fromBase: 'southIndia',
    fromLat: 12.97,
    fromLng: 77.59,
    toPinId: 'pin-london',
    toLat: 51.5074,
    toLng: -0.1278,
    speed: 0.55,
    phase: 0.0,
    color: '#FF8101',
  },
  // 2. South India -> Frankfurt Central Europe Node
  {
    id: 'route-india-frankfurt',
    fromBase: 'southIndia',
    fromLat: 12.97,
    fromLng: 77.59,
    toPinId: 'pin-frankfurt',
    toLat: 50.1109,
    toLng: 8.6821,
    speed: 0.58,
    phase: 0.08,
    color: '#FF8101',
  },
  // 3. South India -> West Coast US Client Node (Long Distance)
  {
    id: 'route-india-west-coast',
    fromBase: 'southIndia',
    fromLat: 12.97,
    fromLng: 77.59,
    toPinId: 'pin-west-coast',
    toLat: 45.0,
    toLng: -125.0,
    speed: 0.60,
    phase: 0.15,
    color: '#FF8101',
  },
  // 4. South India -> Seattle Pacific Northwest Node (Long Distance)
  {
    id: 'route-india-seattle',
    fromBase: 'southIndia',
    fromLat: 12.97,
    fromLng: 77.59,
    toPinId: 'pin-seattle',
    toLat: 47.6062,
    toLng: -122.3321,
    speed: 0.64,
    phase: 0.22,
    color: '#FF8101',
  },
  // 5. South India -> New York US East Node (Long Distance)
  {
    id: 'route-india-new-york',
    fromBase: 'southIndia',
    fromLat: 12.97,
    fromLng: 77.59,
    toPinId: 'pin-new-york',
    toLat: 40.7128,
    toLng: -74.006,
    speed: 0.56,
    phase: 0.28,
    color: '#FF8101',
  },
  // 6. South India -> Toronto East Coast Node (Long Distance)
  {
    id: 'route-india-toronto',
    fromBase: 'southIndia',
    fromLat: 12.97,
    fromLng: 77.59,
    toPinId: 'pin-toronto',
    toLat: 43.6532,
    toLng: -79.3832,
    speed: 0.62,
    phase: 0.35,
    color: '#FF8101',
  },
  // 7. South India -> São Paulo LATAM Client Node (Long Distance)
  {
    id: 'route-india-saopaulo',
    fromBase: 'southIndia',
    fromLat: 12.97,
    fromLng: 77.59,
    toPinId: 'pin-saopaulo',
    toLat: -23.5505,
    toLng: -46.6333,
    speed: 0.52,
    phase: 0.42,
    color: '#FF8101',
  },
  // 8. South India -> Buenos Aires South America Node (Ultra Long Distance)
  {
    id: 'route-india-buenos-aires',
    fromBase: 'southIndia',
    fromLat: 12.97,
    fromLng: 77.59,
    toPinId: 'pin-buenos-aires',
    toLat: -34.6037,
    toLng: -58.3816,
    speed: 0.50,
    phase: 0.48,
    color: '#FF8101',
  },
  // 9. South India -> Lagos West Africa Client Node
  {
    id: 'route-india-africa',
    fromBase: 'southIndia',
    fromLat: 12.97,
    fromLng: 77.59,
    toPinId: 'pin-africa',
    toLat: 6.5244,
    toLng: 15.0,
    speed: 0.62,
    phase: 0.55,
    color: '#FF8101',
  },
  // 10. South India -> Cape Town South Africa Client Node
  {
    id: 'route-india-south-africa',
    fromBase: 'southIndia',
    fromLat: 12.97,
    fromLng: 77.59,
    toPinId: 'pin-south-africa',
    toLat: -33.9249,
    toLng: 18.4241,
    speed: 0.58,
    phase: 0.62,
    color: '#FF8101',
  },
  // 11. South India -> Dubai Middle East Node
  {
    id: 'route-india-dubai',
    fromBase: 'southIndia',
    fromLat: 12.97,
    fromLng: 77.59,
    toPinId: 'pin-dubai',
    toLat: 25.2048,
    toLng: 55.2708,
    speed: 0.70,
    phase: 0.68,
    color: '#FF8101',
  },
  // 12. South India -> Singapore SE Asia Node
  {
    id: 'route-india-singapore',
    fromBase: 'southIndia',
    fromLat: 12.97,
    fromLng: 77.59,
    toPinId: 'pin-singapore',
    toLat: 1.3521,
    toLng: 103.8198,
    speed: 0.68,
    phase: 0.74,
    color: '#FF8101',
  },
  // 13. South India -> Tokyo East Asia Client Node
  {
    id: 'route-india-east-asia',
    fromBase: 'southIndia',
    fromLat: 12.97,
    fromLng: 77.59,
    toPinId: 'pin-east-asia',
    toLat: 35.6762,
    toLng: 139.6503,
    speed: 0.65,
    phase: 0.80,
    color: '#FF8101',
  },
  // 14. South India -> Sydney Australia Client Node
  {
    id: 'route-india-sydney',
    fromBase: 'southIndia',
    fromLat: 12.97,
    fromLng: 77.59,
    toPinId: 'pin-sydney',
    toLat: -33.8688,
    toLng: 151.2093,
    speed: 0.58,
    phase: 0.88,
    color: '#FF8101',
  },
  // 15. South India -> Auckland New Zealand Node (Long Distance)
  {
    id: 'route-india-auckland',
    fromBase: 'southIndia',
    fromLat: 12.97,
    fromLng: 77.59,
    toPinId: 'pin-auckland',
    toLat: -36.8485,
    toLng: 174.7633,
    speed: 0.54,
    phase: 0.94,
    color: '#FF8101',
  },
];

// Helper: Convert Lat/Lng to 3D Cartesian coordinates on sphere matching COBE coordinate system
function latLngToVector3(lat: number, lng: number): [number, number, number] {
  const PI = Math.PI;
  const rLat = (lat * PI) / 180;
  const rLng = (lng * PI) / 180 - PI;
  const cosLat = Math.cos(rLat);
  return [-cosLat * Math.cos(rLng), Math.sin(rLat), cosLat * Math.sin(rLng)];
}

// Helper: Spherical Linear Interpolation (SLERP) along great circle path
function slerp(
  v1: [number, number, number],
  v2: [number, number, number],
  t: number
): [number, number, number] {
  const dot = Math.max(-1, Math.min(1, v1[0] * v2[0] + v1[1] * v2[1] + v1[2] * v2[2]));
  const omega = Math.acos(dot);
  if (Math.abs(omega) < 0.001) return v1;
  const sinOmega = Math.sin(omega);
  const factor1 = Math.sin((1 - t) * omega) / sinOmega;
  const factor2 = Math.sin(t * omega) / sinOmega;
  return [
    factor1 * v1[0] + factor2 * v2[0],
    factor1 * v1[1] + factor2 * v2[1],
    factor1 * v1[2] + factor2 * v2[2],
  ];
}

// Helper: 3D Geodesic Arc Point with graceful parabolic altitude lift
function getArcPoint3D(
  v1: [number, number, number],
  v2: [number, number, number],
  t: number,
  peakHeight = 0.07,
  radius = 0.8
): [number, number, number] {
  const unit = slerp(v1, v2, t);
  const altitude = peakHeight * Math.sin(Math.PI * t);
  const r = radius + altitude;
  return [unit[0] * r, unit[1] * r, unit[2] * r];
}

// Deterministic starfield points surrounding the sphere with multi-tier glow
const STARFIELD_POINTS = [
  { top: '3%', left: '8%', size: 2, opacity: 0.7, delay: '0s', glow: true },
  { top: '6%', left: '22%', size: 1.5, opacity: 0.5, delay: '1.4s' },
  { top: '10%', left: '85%', size: 2.5, opacity: 0.85, delay: '1s', glow: true },
  { top: '8%', left: '48%', size: 1, opacity: 0.4, delay: '2.8s' },
  { top: '14%', left: '25%', size: 1.5, opacity: 0.5, delay: '1.1s' },
  { top: '16%', left: '95%', size: 2.5, opacity: 0.8, delay: '1.5s', glow: true },
  { top: '24%', left: '5%', size: 2, opacity: 0.55, delay: '2s' },
  { top: '28%', left: '92%', size: 1.5, opacity: 0.6, delay: '0.4s' },
  { top: '30%', left: '90%', size: 2, opacity: 0.7, delay: '1.6s' },
  { top: '38%', left: '2%', size: 1.5, opacity: 0.45, delay: '0.5s' },
  { top: '44%', left: '6%', size: 1, opacity: 0.35, delay: '3.1s' },
  { top: '48%', left: '98%', size: 2, opacity: 0.7, delay: '2.5s' },
  { top: '56%', left: '3%', size: 2.5, opacity: 0.85, delay: '1.7s', glow: true, brand: true },
  { top: '64%', left: '4%', size: 2, opacity: 0.7, delay: '1.8s' },
  { top: '70%', left: '97%', size: 2, opacity: 0.6, delay: '0.2s' },
  { top: '74%', left: '2%', size: 1, opacity: 0.4, delay: '2.6s' },
  { top: '78%', left: '94%', size: 1.5, opacity: 0.55, delay: '0.8s' },
  { top: '82%', left: '6%', size: 2, opacity: 0.65, delay: '2.1s' },
  { top: '84%', left: '72%', size: 1.5, opacity: 0.5, delay: '2.4s' },
  { top: '88%', left: '14%', size: 2.5, opacity: 0.85, delay: '2.2s', glow: true },
  { top: '90%', left: '84%', size: 2, opacity: 0.65, delay: '1.2s' },
  { top: '94%', left: '32%', size: 1.5, opacity: 0.5, delay: '0.9s' },
  { top: '96%', left: '52%', size: 2, opacity: 0.7, delay: '2.7s', brand: true },
  { top: '92%', left: '94%', size: 1.5, opacity: 0.45, delay: '1.9s' },
  { top: '5%', left: '72%', size: 1, opacity: 0.4, delay: '3.3s' },
  { top: '18%', left: '8%', size: 1.5, opacity: 0.5, delay: '0.7s' },
  { top: '62%', left: '96%', size: 1, opacity: 0.45, delay: '2.9s' },
  { top: '76%', left: '90%', size: 2, opacity: 0.7, delay: '1.3s' },
];

function AvatarPinItem({
  pin,
  position,
}: {
  pin: GlobeAvatarPin;
  position?: { x: number; y: number; visible: boolean; scale: number; opacity: number };
}) {
  const [imgSrc, setImgSrc] = useState(pin.avatar);
  const isVisible = position?.visible ?? false;
  const x = position?.x ?? 0;
  const y = position?.y ?? 0;
  const scale = position?.scale ?? 1;
  const opacity = position?.opacity ?? 1;

  return (
    <div
      style={{
        position: 'absolute',
        top: `${y}px`,
        left: `${x}px`,
        transform: `translate(-50%, -50%) scale(${scale})`,
        opacity: isVisible ? opacity : 0,
        pointerEvents: isVisible ? 'auto' : 'none',
        zIndex: isVisible ? Math.round(scale * 40) : 0,
        transition: 'opacity 0.2s ease-out, transform 0.12s ease-out',
        willChange: 'transform, opacity',
      }}
    >
      <div className="group relative cursor-pointer" aria-hidden="true">
        {/* Circular portrait pin with glowing vibrant solid border */}
        <div
          className="relative rounded-full overflow-hidden transition-transform duration-300 group-hover:scale-115"
          style={{
            width: '48px',
            height: '48px',
            border: `3.5px solid ${pin.borderColor}`,
            boxShadow: `0 0 16px ${pin.glowColor}, 0 0 28px ${pin.glowColor.replace('0.85', '0.4').replace('0.8', '0.35')}, 0 4px 14px rgba(0,0,0,0.9)`,
          }}
        >
          <img
            src={imgSrc}
            alt=""
            className="w-full h-full object-cover select-none pointer-events-none"
            onError={() => setImgSrc(pin.fallbackAvatar)}
            loading="eager"
          />
        </div>
      </div>
    </div>
  );
}

export function HeroGlobe({
  className = '',
  autoRotateSpeed = 0.0024,
  showAvatars = true,
  initialPhi,
}: HeroGlobeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const arcsCanvasRef = useRef<HTMLCanvasElement>(null);
  const startPhi = useMemo(() => {
    if (initialPhi !== undefined) return initialPhi;
    if (typeof window !== 'undefined') {
      const p = new URLSearchParams(window.location.search).get('globePhi');
      if (p) {
        const val = parseFloat(p);
        if (!isNaN(val)) return val;
      }
    }
    return (300 * Math.PI) / 180;
  }, [initialPhi]);
  const phiRef = useRef(startPhi);
  const thetaRef = useRef(0.22);
  const isIntersecting = useRef(true);
  const isTabVisible = useRef(true);
  const [mounted, setMounted] = useState(false);
  const [webGLSupported, setWebGLSupported] = useState<boolean | null>(null);
  const [markerScreenPos, setMarkerScreenPos] = useState<
    Record<
      string,
      { x: number; y: number; visible: boolean; scale: number; opacity: number }
    >
  >({});

  // Detect WebGL capability safely
  useEffect(() => {
    setMounted(true);
    try {
      const canvas = document.createElement('canvas');
      const gl =
        canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      setWebGLSupported(Boolean(gl));
    } catch {
      setWebGLSupported(false);
    }
  }, []);

  // Check reduced motion preference
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // Compute 3D spherical projection identical to COBE's WebGL coordinate system
  const updateMarkerPositions = useCallback(
    (currentPhi: number, currentTheta: number, currentWidth: number) => {
      const positions: Record<
        string,
        { x: number; y: number; visible: boolean; scale: number; opacity: number }
      > = {};

      const PI = Math.PI;
      const cosTheta = Math.cos(currentTheta);
      const sinTheta = Math.sin(currentTheta);
      const cosPhi = Math.cos(currentPhi);
      const sinPhi = Math.sin(currentPhi);
      const radius = 0.8;

      GLOBE_AVATAR_PINS.forEach((pin) => {
        const rLat = (pin.lat * PI) / 180;
        const rLng = (pin.lng * PI) / 180 - PI;
        const cosLat = Math.cos(rLat);
        const t = [-cosLat * Math.cos(rLng), Math.sin(rLat), cosLat * Math.sin(rLng)];

        const p = [t[0] * radius, t[1] * radius, t[2] * radius];

        const c = cosPhi * p[0] + sinPhi * p[2];
        const s = sinPhi * sinTheta * p[0] + cosTheta * p[1] - cosPhi * sinTheta * p[2];
        const z = -sinPhi * cosTheta * p[0] + sinTheta * p[1] + cosPhi * cosTheta * p[2];

        const normX = (c + 1) / 2;
        const normY = (-s + 1) / 2;

        const visible = z > -0.02;
        const depthNorm = Math.max(0, Math.min(1, (z + 0.1) / 0.9));
        const scale = 0.72 + depthNorm * 0.36;
        const opacity = Math.min(1, Math.max(0.35, depthNorm * 1.2));

        positions[pin.id] = {
          x: Math.round(normX * currentWidth),
          y: Math.round(normY * currentWidth),
          visible,
          scale: Number(scale.toFixed(2)),
          opacity: Number(opacity.toFixed(2)),
        };
      });

      setMarkerScreenPos(positions);
    },
    []
  );

  // Render animated circular connection lines and origin base beacons
  const renderNetworkArcs = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      width: number,
      phi: number,
      theta: number,
      timestamp: number
    ) => {
      ctx.clearRect(0, 0, width, width);

      const cosTheta = Math.cos(theta);
      const sinTheta = Math.sin(theta);
      const cosPhi = Math.cos(phi);
      const sinPhi = Math.sin(phi);
      const radius = 0.8;

      const project = (p: [number, number, number]) => {
        const c = cosPhi * p[0] + sinPhi * p[2];
        const s = sinPhi * sinTheta * p[0] + cosTheta * p[1] - cosPhi * sinTheta * p[2];
        const z = -sinPhi * cosTheta * p[0] + sinTheta * p[1] + cosPhi * cosTheta * p[2];
        return {
          x: ((c + 1) / 2) * width,
          y: ((-s + 1) / 2) * width,
          z,
        };
      };

      // 1. Draw Origin Base Beacons & Highlight Dots (Chicago HQ and India constellation)
      GLOBE_HIGHLIGHT_DOTS.forEach((dot) => {
        const v = latLngToVector3(dot.lat, dot.lng);
        const p3d: [number, number, number] = [v[0] * radius, v[1] * radius, v[2] * radius];
        const pt = project(p3d);

        // Only render beacon on visible front hemisphere to avoid edge bleeding
        if (pt.z > 0.12) {
          const depthAlpha = Math.max(0, Math.min(1, (pt.z - 0.12) / 0.35));

          ctx.save();
          // Soft ambient orange halo glow
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, dot.glowRadius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 129, 1, ${0.2 * depthAlpha})`;
          ctx.fill();

          // Subtle concentric radar ring on primary hubs (Chicago & South India main)
          if (dot.isPrimary) {
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, dot.radius + 3.0, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(255, 129, 1, ${0.45 * depthAlpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }

          // Origin core dot in vibrant brand #FF8101 orange (fast raster without shadowBlur penalty)
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, dot.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 129, 1, ${depthAlpha})`;
          ctx.fill();

          // High-contrast luminous center highlight
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, dot.isPrimary ? 1.8 : 1.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(1, depthAlpha * 1.2)})`;
          ctx.fill();

          ctx.restore();
        }
      });

      // 2. Draw Each Network Route (origin strictly from base to each user pin)
      GLOBE_NETWORK_ROUTES.forEach((route) => {
        const v1 = latLngToVector3(route.fromLat, route.fromLng);
        const v2 = latLngToVector3(route.toLat, route.toLng);
        const dot = Math.max(-1, Math.min(1, v1[0] * v2[0] + v1[1] * v2[1] + v1[2] * v2[2]));
        const omega = Math.acos(dot);
        // Increased arc altitude distance & reach across the globe
        const peakHeight = Math.max(0.04, Math.min(0.12, omega * 0.08));

        const SAMPLES = 36;
        const pts: { x: number; y: number; z: number }[] = [];
        for (let i = 0; i <= SAMPLES; i++) {
          const t = i / SAMPLES;
          const pt3d = getArcPoint3D(v1, v2, t, peakHeight, radius);
          pts.push(project(pt3d));
        }

        // Draw Ghost Base Arc Trajectory in brand #FF8101 orange (faint network topology guide)
        ctx.save();
        let isDrawing = false;
        for (let i = 0; i < pts.length - 1; i++) {
          const pA = pts[i];
          const pB = pts[i + 1];
          const avgZ = (pA.z + pB.z) / 2;

          if (avgZ > -0.04) {
            const lineAlpha = Math.max(0.04, Math.min(0.16, (avgZ + 0.04) / 0.5));
            if (!isDrawing) {
              ctx.beginPath();
              ctx.moveTo(pA.x, pA.y);
              isDrawing = true;
            }
            ctx.lineTo(pB.x, pB.y);
            ctx.strokeStyle = `rgba(255, 129, 1, ${lineAlpha * 0.8})`;
            ctx.lineWidth = 0.65;
            ctx.stroke();
          } else if (isDrawing) {
            ctx.stroke();
            isDrawing = false;
          }
        }
        if (isDrawing) {
          ctx.stroke();
        }
        ctx.restore();

        // Draw The Line Itself Traveling Outward from the Origin Base
        // Phase 1 (0.00 -> 0.65): Line emerges from origin and shoots outward across the globe
        // Phase 2 (0.65 -> 0.92): Line arrives at destination, tail draws forward from origin
        // Phase 3 (0.92 -> 1.00): Brief pause before next line emerges
        const cycle = (timestamp * 0.00020 * route.speed + route.phase) % 1;
        let tMin = 0;
        let tMax = 0;
        let strokeAlpha = 0;

        if (cycle < 0.65) {
          // Line originates at base beacon (tMin=0) and draws forward to tMax
          const norm = cycle / 0.65;
          const eased = 1 - Math.pow(1 - norm, 1.5);
          tMin = 0;
          tMax = Math.max(0.02, Math.min(1.0, eased));
          strokeAlpha = 0.95;
        } else if (cycle < 0.92) {
          // Line reaches destination (tMax=1.0), tail catches up from origin
          const norm = (cycle - 0.65) / 0.27;
          tMin = Math.min(1.0, norm);
          tMax = 1.0;
          strokeAlpha = (1 - norm * 0.65) * 0.95;
        } else {
          // Pause between line travels
          strokeAlpha = 0;
        }

        if (strokeAlpha > 0.02 && tMax > tMin + 0.01) {
          const TRAVEL_STEPS = 28;
          const travelPts: { x: number; y: number; z: number; frac: number }[] = [];
          for (let step = 0; step <= TRAVEL_STEPS; step++) {
            const frac = step / TRAVEL_STEPS;
            const t = tMin + (tMax - tMin) * frac;
            const pt3d = getArcPoint3D(v1, v2, t, peakHeight, radius);
            travelPts.push({ ...project(pt3d), frac });
          }

          ctx.save();
          for (let s = 0; s < travelPts.length - 1; s++) {
            const p1 = travelPts[s];
            const p2 = travelPts[s + 1];
            const avgZ = (p1.z + p2.z) / 2;

            if (avgZ > -0.04) {
              const depthAlpha = Math.max(0, Math.min(1, (avgZ + 0.04) / 0.45));
              // Leading section glows slightly brighter while the trailing body remains solid
              const tipGlow = 0.65 + 0.35 * (p2.frac * p2.frac);
              const alpha = strokeAlpha * depthAlpha * tipGlow;

              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `rgba(255, 129, 1, ${alpha})`;
              ctx.lineWidth = 0.85 + 0.45 * p2.frac;
              ctx.shadowColor = '#FF8101';
              ctx.shadowBlur = 5 * p2.frac;
              ctx.stroke();
            }
          }

          // Crisp leading edge at the forward tip of the line as it travels
          const leadPt = travelPts[travelPts.length - 1];
          if (leadPt.z > 0.05 && cycle < 0.65) {
            const leadAlpha = Math.max(0, Math.min(1, (leadPt.z - 0.05) / 0.4)) * strokeAlpha;
            ctx.beginPath();
            ctx.arc(leadPt.x, leadPt.y, 1.8, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${leadAlpha * 0.95})`;
            ctx.shadowColor = '#FF8101';
            ctx.shadowBlur = 6;
            ctx.fill();
          }

          ctx.restore();
        }
      });
    },
    []
  );

  useEffect(() => {
    if (!mounted || webGLSupported === false) return;
    const canvas = canvasRef.current;
    const arcsCanvas = arcsCanvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let width = container.clientWidth;
    if (width === 0) width = 480;

    const isMobile = width < 360;
    const mapSamples = isMobile ? 16000 : 24000;

    // Synchronize 2D overlay canvas dimensions with DPR
    let arcsCtx = arcsCanvas?.getContext('2d');
    const updateArcsCanvasSize = (w: number) => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      if (arcsCanvas) {
        arcsCanvas.width = w * dpr;
        arcsCanvas.height = w * dpr;
        arcsCanvas.style.width = `${w}px`;
        arcsCanvas.style.height = `${w}px`;
        arcsCtx = arcsCanvas.getContext('2d');
        if (arcsCtx) {
          arcsCtx.setTransform(1, 0, 0, 1, 0, 0);
          arcsCtx.scale(dpr, dpr);
        }
      }
    };
    updateArcsCanvasSize(width);

    let globe: ReturnType<typeof createGlobe> | null = null;
    let animId: number | null = null;
    let lastTime = performance.now();
    let loop: (time: number) => void;

    const startLoopIfNeeded = () => {
      if (!animId && isIntersecting.current && isTabVisible.current && globe) {
        lastTime = performance.now();
        animId = requestAnimationFrame(loop);
      }
    };

    // Tab visibility handling: pause completely when tab is hidden
    const handleVisibilityChange = () => {
      isTabVisible.current = !document.hidden;
      if (isTabVisible.current) {
        startLoopIfNeeded();
      } else if (animId) {
        cancelAnimationFrame(animId);
        animId = null;
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Viewport intersection observer to pause completely when off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting.current = entry.isIntersecting;
        if (isIntersecting.current) {
          startLoopIfNeeded();
        } else if (animId) {
          cancelAnimationFrame(animId);
          animId = null;
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    try {
      globe = createGlobe(canvas, {
        devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
        width: width * 2,
        height: width * 2,
        phi: phiRef.current,
        theta: thetaRef.current,
        dark: 1,
        diffuse: 1.2,
        mapSamples,
        mapBrightness: 1.6,
        mapBaseBrightness: 0.12,
        baseColor: [0.6, 0.65, 0.75],
        glowColor: [0.4, 0.45, 0.55],
        markerColor: [1.0, 0.5058, 0.0039],
        markers: [
          // Chicago & India prominent highlighted orange markers
          ...GLOBE_HIGHLIGHT_DOTS.map((dot) => ({
            location: [dot.lat, dot.lng] as [number, number],
            size: dot.size,
          })),
          // When avatar pins are enabled, also include secondary international nodes
          ...(showAvatars
            ? GLOBE_AVATAR_PINS.filter(
              (pin) => pin.id !== 'pin-chicago' && pin.id !== 'pin-south-india'
            ).map((pin) => ({
              location: [pin.lat, pin.lng] as [number, number],
              size: 0.03,
            }))
            : []),
        ],
      });

      loop = (time: number) => {
        if (!globe || !isIntersecting.current || !isTabVisible.current) {
          animId = null;
          return;
        }

        const dt = Math.min((time - lastTime) / 1000, 0.1);
        lastTime = time;

        if (!prefersReducedMotion) {
          // Slower, ultra-smooth delta-time normalized rotation
          phiRef.current += autoRotateSpeed * (dt / 0.01667);
        }

        globe.update({
          phi: phiRef.current,
          theta: thetaRef.current,
        });

        // Sync avatar marker coordinates on screen
        updateMarkerPositions(phiRef.current, thetaRef.current, width);

        // Render animated circular lines and base origin beacons
        if (arcsCtx) {
          renderNetworkArcs(
            arcsCtx,
            width,
            phiRef.current,
            thetaRef.current,
            time
          );
        }
        animId = requestAnimationFrame(loop);
      };
      animId = requestAnimationFrame(loop);
    } catch (err) {
      console.warn('COBE WebGL Globe initialization failed, falling back to 2D vector sphere:', err);
      setWebGLSupported(false);
    }

    // ResizeObserver for reliable canvas re-projection on container resize
    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && container) {
      resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const newWidth = entry.contentRect.width;
          if (newWidth > 0 && newWidth !== width) {
            width = newWidth;
            updateArcsCanvasSize(width);
          }
        }
      });
      resizeObserver.observe(container);
    }

    const handleResize = () => {
      if (container) {
        const newWidth = container.clientWidth;
        if (newWidth > 0 && newWidth !== width) {
          width = newWidth;
          updateArcsCanvasSize(width);
        }
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      observer.disconnect();
      if (animId) {
        cancelAnimationFrame(animId);
      }
      if (globe) {
        globe.destroy();
      }
    };
  }, [
    mounted,
    webGLSupported,
    prefersReducedMotion,
    autoRotateSpeed,
    showAvatars,
    updateMarkerPositions,
    renderNetworkArcs,
  ]);

  return (
    <div
      ref={containerRef}
      className={`relative select-none pointer-events-none aspect-square w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px] lg:w-[480px] lg:h-[480px] xl:w-[500px] xl:h-[500px] shrink-0 mx-auto ${className}`}
      style={{ willChange: 'transform' }}
    >
      {/* Decorative Starfield */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {STARFIELD_POINTS.map((star, i) => (
          <span
            key={i}
            className="absolute rounded-full animate-pulse"
            style={{
              top: star.top,
              left: star.left,
              width: `${star.size}px`,
              height: `${star.size}px`,
              backgroundColor: (star as any).brand ? '#FF8101' : '#FFFFFF',
              boxShadow: (star as any).glow
                ? (star as any).brand
                  ? '0 0 6px rgba(255, 129, 1, 0.8)'
                  : '0 0 6px rgba(255, 255, 255, 0.8)'
                : undefined,
              opacity: star.opacity,
              animationDuration: '3.2s',
              animationDelay: star.delay,
            }}
          />
        ))}
      </div>

      {/* Luminous atmosphere edge halo (borderless, soft ambient depth only) */}
      <div
        className="absolute inset-[6%] rounded-full pointer-events-none"
        style={{
          boxShadow:
            'inset 0 0 10px rgba(255, 255, 255, 0.08), 0 0 14px rgba(255, 255, 255, 0.05)',
        }}
        aria-hidden="true"
      />

      {/* WebGL Canvas with Animated 3D Network Arcs Overlay */}
      {webGLSupported !== false ? (
        <>
          <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="w-full h-full object-contain pointer-events-none"
          />
          <canvas
            ref={arcsCanvasRef}
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-contain pointer-events-none z-10"
          />
        </>
      ) : (
        /* WebGL Fallback: Stylized Vector Wireframe Ellipse */
        <div className="relative w-full h-full flex items-center justify-center pointer-events-none" aria-hidden="true">
          <svg className="w-[88%] h-[88%] text-[#FF8101]/25" viewBox="0 0 400 400" fill="none">
            <circle cx="200" cy="200" r="180" className="stroke-white/30" strokeWidth="1.5" />
            <circle cx="200" cy="200" r="140" className="stroke-white/15" strokeDasharray="4 4" strokeWidth="1" />
            <ellipse cx="200" cy="200" rx="180" ry="60" className="stroke-[#FF8101]/35" strokeWidth="1.2" />
            <ellipse cx="200" cy="200" rx="60" ry="180" className="stroke-[#FF8101]/35" strokeWidth="1.2" />
            <ellipse cx="200" cy="200" rx="180" ry="120" className="stroke-white/20" strokeWidth="1" />
          </svg>
        </div>
      )}

      {/* Avatar Pins Layer */}
      {showAvatars &&
        GLOBE_AVATAR_PINS.map((pin) => (
          <AvatarPinItem
            key={pin.id}
            pin={pin}
            position={markerScreenPos[pin.id]}
          />
        ))}
    </div>
  );
}

export default HeroGlobe;
