import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { TrendingUp, PieChart as PieIcon, BarChart3 } from 'lucide-react';
import { getMockAnalytics } from '../lib/mockBackend';

export default function AnalyticsPanel() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const isDemo = window.location.hostname.includes('github.io') || window.location.hostname.includes('netlify.app') || window.location.hostname === 'localhost';
    
    if (isDemo) {
      setData(getMockAnalytics());
    } else {
      fetch('/api/analytics').then(r => r.json()).then(setData).catch(() => {
        setData(getMockAnalytics());
      });
    }
  }, []);

  if (!data) return null;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;
    return (
      <div className="glass-panel rounded-xl p-3 text-xs border border-white/10">
        <div className="font-black text-white/60 mb-1">{label}</div>
        {payload.map((p: any, i: number) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
            <span className="text-white/40">{p.name}:</span>
            <span className="font-bold text-white">{p.value}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-gradient-to-br from-emerald-500/15 to-teal-500/10 rounded-xl">
          <TrendingUp className="w-5 h-5 text-emerald-500" />
        </div>
        <div>
          <h3 className="text-lg font-black italic tracking-tight uppercase">Live Analytics</h3>
          <p className="text-[10px] font-black uppercase text-white/25 tracking-widest">24-hour detection telemetry</p>
        </div>
      </div>

      {/* Bento Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Area Chart — Detection Trend */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-8 glass-panel rounded-3xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="text-[10px] font-black uppercase text-white/25 tracking-widest">Scan Volume & Detections</div>
            <div className="flex gap-4 text-[9px] font-black uppercase tracking-widest">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-500" /> Scans</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-500" /> Detections</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Enforced</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={data.hourlyData}>
              <defs>
                <linearGradient id="scanGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="detGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="time" tick={{ fill: 'rgba(255,255,255,0.2)', fontSize: 9 }} axisLine={false} tickLine={false} interval={3} />
              <YAxis tick={{ fill: 'rgba(255,255,255,0.15)', fontSize: 9 }} axisLine={false} tickLine={false} width={35} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="scans" stroke="#f59e0b" fill="url(#scanGrad)" strokeWidth={2} name="Scans" />
              <Area type="monotone" dataKey="detections" stroke="#ef4444" fill="url(#detGrad)" strokeWidth={2} name="Detections" />
              <Area type="monotone" dataKey="enforced" stroke="#10b981" fill="none" strokeWidth={1.5} strokeDasharray="4 4" name="Enforced" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Pie Chart — Platform Breakdown */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} 
          className="lg:col-span-4 glass-panel rounded-3xl p-6">
          <div className="text-[10px] font-black uppercase text-white/25 tracking-widest mb-4 flex items-center gap-2">
            <PieIcon className="w-3 h-3" /> Platform Distribution
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={data.platformBreakdown} cx="50%" cy="50%" innerRadius={40} outerRadius={65} paddingAngle={3} dataKey="value" stroke="none">
                {data.platformBreakdown.map((entry: any, i: number) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {data.platformBreakdown.map((p: any, i: number) => (
              <div key={i} className="flex items-center gap-2 text-[10px] font-bold text-white/40">
                <div className="w-2 h-2 rounded-full shrink-0" style={{ background: p.color }} />
                {p.name} <span className="text-white/20">{p.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Confidence Distribution Bar */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} 
        className="glass-panel rounded-3xl p-6">
        <div className="text-[10px] font-black uppercase text-white/25 tracking-widest mb-4 flex items-center gap-2">
          <BarChart3 className="w-3 h-3" /> Confidence Score Distribution
        </div>
        <ResponsiveContainer width="100%" height={120}>
          <BarChart data={data.confidenceDistribution}>
            <XAxis dataKey="range" tick={false} axisLine={false} />
            <YAxis tick={{ fill: 'rgba(255,255,255,0.15)', fontSize: 9 }} axisLine={false} tickLine={false} width={25} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="count" name="Detections" radius={[4, 4, 0, 0]}>
              {data.confidenceDistribution.map((_: any, i: number) => (
                <Cell key={i} fill={i > 15 ? '#f59e0b' : i > 10 ? 'rgba(245,158,11,0.4)' : 'rgba(255,255,255,0.08)'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}

