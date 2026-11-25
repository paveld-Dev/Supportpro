'use client';

import React, { useEffect, useRef, useState } from 'react';
import createGlobe from 'cobe';

export interface LoadingGlobeProps {
  size?: number;
  className?: string;
}

export function LoadingGlobe({ size = 130, className = '' }: LoadingGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [webGLSupported, setWebGLSupported] = useState<boolean | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Detect WebGL capability safely
    try {
      const gl =
        canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setWebGLSupported(false);
        return;
      }
      setWebGLSupported(true);
    } catch {
      setWebGLSupported(false);
      return;
    }

    let phi = 0;
    let animId: number | null = null;
    let globe: ReturnType<typeof createGlobe> | null = null;

    try {
      globe = createGlobe(canvas, {
        devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
        width: size * 2,
        height: size * 2,
        phi: 0,
        theta: 0.22,
        dark: 1,
        diffuse: 1.2,
        mapSamples: 8000,
        mapBrightness: 2.2,
        mapBaseBrightness: 0.1,
        baseColor: [0.65, 0.7, 0.8],
        glowColor: [0.4, 0.45, 0.55],
        markerColor: [1.0, 0.5058, 0.0039], // #FF8101
        markers: [
          { location: [41.88, -87.63], size: 0.08 }, // Chicago HQ
          { location: [12.97, 77.59], size: 0.08 },  // South India Delivery Centre
        ],
      });

      const loop = () => {
        if (!globe) return;
        phi += 0.01;
        globe.update({ phi });
        animId = requestAnimationFrame(loop);
      };
      animId = requestAnimationFrame(loop);
    } catch {
      setWebGLSupported(false);
    }

    return () => {
      if (animId) cancelAnimationFrame(animId);
      if (globe) {
        try {
          globe.destroy();
        } catch {}
      }
    };
  }, [size]);

  return (
    <div
      className={`relative flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {/* Ambient background glow in brand orange (#FF8101) */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none animate-pulse"
        style={{
          background:
            'radial-gradient(circle, rgba(255, 129, 1, 0.22) 0%, rgba(255, 129, 1, 0.06) 50%, transparent 72%)',
          transform: 'scale(1.4)',
          animationDuration: '3.5s',
        }}
      />

      {/* Tilted orbital tech ring with smooth rotation */}
      <div
        className="absolute inset-0 rounded-full border border-[#FF8101]/25 pointer-events-none animate-spin"
        style={{
          transform: 'scale(1.22) rotateX(68deg)',
          animationDuration: '10s',
        }}
      />

      {/* Orbit beacon highlight */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none animate-spin"
        style={{
          transform: 'scale(1.22) rotateX(68deg)',
          animationDuration: '10s',
        }}
      >
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#FF8101]"
          style={{
            boxShadow: '0 0 8px #FF8101, 0 0 14px rgba(255, 129, 1, 0.8)',
          }}
        />
      </div>

      {/* 3D WebGL Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          width: size,
          height: size,
          contain: 'layout paint size',
          opacity: webGLSupported ? 1 : 0,
          transition: 'opacity 350ms ease-in',
        }}
        className="w-full h-full relative z-10"
      />

      {/* Graceful Fallback wireframe globe if WebGL is unavailable */}
      {webGLSupported === false && (
        <div className="absolute inset-0 rounded-full border border-white/20 flex items-center justify-center">
          <div
            className="w-3/4 h-3/4 rounded-full border border-[#FF8101]/30 animate-spin"
            style={{ animationDuration: '6s' }}
          />
          <div
            className="w-2 h-2 rounded-full bg-[#FF8101]"
            style={{ boxShadow: '0 0 8px #FF8101' }}
          />
        </div>
      )}
    </div>
  );
}

export default LoadingGlobe;
