import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Globe, AlertTriangle } from 'lucide-react';
import { getMockThreatMap } from '../lib/mockBackend';

interface ThreatRegion { region: string; lat: number; lng: number; threats: number; risk: string; }

export default function ThreatMap() {
  const [regions, setRegions] = useState<ThreatRegion[]>([]);
  useEffect(() => { 
    const isDemo = window.location.hostname.includes('github.io') || window.location.hostname === 'localhost';
    if (isDemo) {
      setRegions(getMockThreatMap());
    } else {
      fetch('/api/threat-map').then(r => r.json()).then(setRegions).catch(() => {
        setRegions(getMockThreatMap());
      });
    }
  }, []);

  const riskColor = (r: string) => r === 'critical' ? '#ef4444' : r === 'high' ? '#f59e0b' : r === 'medium' ? '#8b5cf6' : '#10b981';
  const riskGlow = (r: string) => r === 'critical' ? 'shadow-[0_0_20px_rgba(239,68,68,0.4)]' : r === 'high' ? 'shadow-[0_0_15px_rgba(245,158,11,0.3)]' : '';

  // Map lat/lng to SVG coordinates (simple mercator-ish projection)
  const toX = (lng: number) => ((lng + 180) / 360) * 800;
  const toY = (lat: number) => ((90 - lat) / 180) * 400;

  return (
    <div className="glass-panel rounded-3xl p-6 overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-red-500/15 to-orange-500/10 rounded-xl"><Globe className="w-5 h-5 text-red-400" /></div>
          <div>
            <h3 className="text-sm font-black italic tracking-tight uppercase">Global Threat Heatmap</h3>
            <p className="text-[9px] font-black uppercase text-white/20 tracking-widest">Real-time geographic distribution</p>
          </div>
        </div>
        <div className="flex gap-3 text-[8px] font-black uppercase tracking-widest">
          {['critical', 'high', 'medium', 'low'].map(r => (
            <span key={r} className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full" style={{ background: riskColor(r) }} />{r}</span>
          ))}
        </div>
      </div>

      {/* SVG World Map (simplified continents) */}
      <div className="relative w-full aspect-[2/1] bg-white/[0.01] rounded-2xl border border-white/[0.04] overflow-hidden">
        <svg viewBox="0 0 800 400" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {/* Grid lines */}
          {Array.from({ length: 9 }).map((_, i) => <line key={`h${i}`} x1="0" y1={i * 50} x2="800" y2={i * 50} stroke="rgba(255,255,255,0.02)" strokeWidth="0.5" />)}
          {Array.from({ length: 17 }).map((_, i) => <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="400" stroke="rgba(255,255,255,0.02)" strokeWidth="0.5" />)}

          {/* Simplified continent outlines */}
          {/* North America */}
          <path d="M80,80 L180,60 L220,90 L210,140 L180,180 L140,200 L100,190 L80,160 L60,120 Z" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
          {/* South America */}
          <path d="M160,210 L200,200 L220,230 L230,280 L210,330 L180,350 L160,320 L150,270 Z" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
          {/* Europe */}
          <path d="M370,70 L420,60 L440,80 L430,120 L400,130 L380,110 L360,100 Z" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
          {/* Africa */}
          <path d="M380,140 L420,130 L450,160 L460,220 L440,280 L400,300 L370,270 L360,210 L370,170 Z" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
          {/* Asia */}
          <path d="M450,60 L600,50 L680,80 L700,130 L660,170 L600,190 L540,180 L500,150 L460,120 L440,90 Z" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
          {/* Australia */}
          <path d="M620,260 L680,250 L710,270 L700,310 L660,320 L630,300 Z" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />

          {/* Threat markers */}
          {regions.map((region, i) => {
            const cx = toX(region.lng);
            const cy = toY(region.lat);
            const r = Math.sqrt(region.threats) * 0.8;
            const color = riskColor(region.risk);
            return (
              <g key={i}>
                {/* Pulse ring */}
                <circle cx={cx} cy={cy} r={r * 2} fill="none" stroke={color} strokeWidth="0.5" opacity="0.3" className="animate-ring-rotate" style={{ transformOrigin: `${cx}px ${cy}px`, animationDuration: '4s' }}>
                  <animate attributeName="r" values={`${r};${r * 2.5};${r}`} dur="3s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.4;0.1;0.4" dur="3s" repeatCount="indefinite" />
                </circle>
                {/* Glow */}
                <circle cx={cx} cy={cy} r={r * 1.5} fill={color} opacity="0.08" />
                {/* Core dot */}
                <circle cx={cx} cy={cy} r={Math.max(3, r * 0.4)} fill={color} opacity="0.8">
                  <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" begin={`${i * 0.3}s`} />
                </circle>
              </g>
            );
          })}

          {/* Connection lines between threats */}
          {regions.slice(0, 5).map((r1, i) =>
            regions.slice(i + 1, i + 3).map((r2, j) => (
              <line key={`${i}-${j}`} x1={toX(r1.lng)} y1={toY(r1.lat)} x2={toX(r2.lng)} y2={toY(r2.lat)}
                stroke="rgba(245,158,11,0.06)" strokeWidth="0.5" strokeDasharray="4 4" className="animate-dash-slow" />
            ))
          )}
        </svg>
      </div>

      {/* Region List */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
        {regions.slice(0, 4).map((region, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className="glass-card rounded-xl p-3 flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full shrink-0 ${riskGlow(region.risk)}`} style={{ background: riskColor(region.risk) }} />
            <div className="min-w-0">
              <div className="text-xs font-bold truncate">{region.region}</div>
              <div className="text-[9px] text-white/30 font-bold">{region.threats} threats</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

