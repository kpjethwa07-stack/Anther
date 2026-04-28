import React from 'react';

/* ═══════════════════════════════════════════════════════
   SVG VECTOR DECORATIONS — Pure CSS, zero JS scroll listeners
   Only transform/opacity animations = compositor thread only
   ═══════════════════════════════════════════════════════ */

const CircuitPattern = React.memo(() => (
  <svg className="circuit-svg absolute top-[5%] right-[5%] w-[40vw] h-[40vw] max-w-[500px] opacity-[0.035]" viewBox="0 0 400 400" fill="none">
    <line x1="0" y1="100" x2="400" y2="100" stroke="white" strokeWidth="0.3" strokeDasharray="4 8" className="animate-dash-slow" />
    <line x1="0" y1="200" x2="400" y2="200" stroke="white" strokeWidth="0.3" strokeDasharray="4 8" className="animate-dash-slow" style={{ animationDelay: '2s' }} />
    <line x1="100" y1="0" x2="100" y2="400" stroke="white" strokeWidth="0.3" strokeDasharray="4 8" className="animate-dash-vertical" />
    <line x1="300" y1="0" x2="300" y2="400" stroke="white" strokeWidth="0.3" strokeDasharray="4 8" className="animate-dash-vertical" style={{ animationDelay: '3s' }} />
    <path d="M100,100 L200,100 L200,200 L300,200 L300,300" stroke="rgba(245,158,11,0.15)" strokeWidth="0.5" fill="none" className="animate-trace" />
  </svg>
));

const ConcentricRings = React.memo(() => (
  <svg className="absolute top-[30%] left-[50%] -translate-x-1/2 w-[40vw] h-[40vw] max-w-[500px] opacity-[0.02]" viewBox="0 0 400 400" fill="none">
    {[60, 120, 180].map((r, i) => (
      <circle key={i} cx="200" cy="200" r={r} stroke="white" strokeWidth="0.3" strokeDasharray={`${r * 0.5} ${r * 0.3}`}
        className="animate-ring-rotate" style={{ animationDuration: `${40 + i * 15}s`, animationDirection: i % 2 ? 'reverse' : 'normal' }} />
    ))}
    <circle cx="200" cy="200" r="3" fill="rgba(245,158,11,0.4)" className="animate-core-pulse" />
  </svg>
));

const FloatingOrbs = React.memo(() => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    <div className="orb orb-1" />
    <div className="orb orb-2" />
  </div>
));

export const VectorDecorations: React.FC = () => (
  <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden gpu-layer">
    {/* Static gradient blobs — no JS animation */}
    <div className="absolute top-[-10%] left-[-5%] w-[50vw] h-[50vw] opacity-[0.04] blob-morph">
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <path fill="url(#grad-amber)"
          d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.6,90,-16.3,88.5,-0.9C86.9,14.5,81.2,29.1,72.4,42.4C63.6,55.7,51.7,67.8,37.7,74.7C23.7,81.6,7.6,83.3,-8.4,81.8C-24.4,80.3,-40.3,75.6,-54.1,66.3C-67.9,57,-79.6,43.1,-84.9,27.5C-90.2,12,-89,-5.2,-84.4,-20.9C-79.8,-36.6,-71.8,-50.8,-59.9,-59.3C-48,-67.8,-32.2,-70.6,-18.2,-74.6C-4.2,-78.6,8,-83.7,23.3,-82.9C38.6,-82.1,57,-75.4,44.7,-76.4Z" />
        <defs>
          <linearGradient id="grad-amber" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" /><stop offset="100%" stopColor="#d97706" />
          </linearGradient>
        </defs>
      </svg>
    </div>

    <div className="absolute bottom-[-15%] right-[-8%] w-[40vw] h-[40vw] opacity-[0.025] blur-3xl blob-morph-reverse">
      <div className="w-full h-full rounded-full bg-white" />
    </div>

    <div className="absolute inset-0 opacity-[0.012] grid-pattern" />
    <CircuitPattern />
    <ConcentricRings />
    <FloatingOrbs />
  </div>
);
