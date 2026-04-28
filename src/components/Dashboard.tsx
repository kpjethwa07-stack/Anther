import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Activity, Shield, Zap, Search, AlertTriangle, BarChart3,
  Terminal as TerminalIcon, Fingerprint, Play, CheckCircle2, ShieldCheck
} from 'lucide-react';
import AIScanPanel from './AIScanPanel';
import AnalyticsPanel from './AnalyticsPanel';
import ThreatMap from './ThreatMap';
import { getMockLogs, getMockFeeds, getMockStats, mockEnforce, generateMockLog } from '../lib/mockBackend';

interface DetectionLog {
  id: string; timestamp: string; sourceUrl: string; matchedFeed: string;
  broadcaster: string; confidence: string; status: string;
  platform: string; enforcedAt?: string;
}

interface FeedStatus {
  id: string; name: string; broadcaster: string; status: string;
  latency: string; health: number; errorCode?: string;
}

export default function Dashboard() {
  const [logs, setLogs] = useState<DetectionLog[]>([]);
  const [feeds, setFeeds] = useState<FeedStatus[]>([]);
  const [stats, setStats] = useState({ totalScanned: 0, totalMatches: 0, avgConfidence: '0%', revenueRecovered: '$0' });
  const [isConnected, setIsConnected] = useState(false);
  const [pendingClaim, setPendingClaim] = useState<DetectionLog | null>(null);
  const [isEnforcing, setIsEnforcing] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);

  const addTerminalLog = useCallback((msg: string) => {
    setTerminalLogs(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev].slice(0, 8));
  }, []);

  useEffect(() => {
    const isDemo = window.location.hostname.includes('github.io') || window.location.hostname.includes('netlify.app') || window.location.hostname === 'localhost'; // using mock locally as well for testing

    const fetchData = async () => {
      try {
        if (isDemo) {
          setLogs(getMockLogs() as any); setFeeds(getMockFeeds() as any); setStats(getMockStats() as any);
        } else {
          const [logsRes, feedsRes, statsRes] = await Promise.all([fetch('/api/logs'), fetch('/api/feeds'), fetch('/api/stats')]);
          setLogs(await logsRes.json() as any); setFeeds(await feedsRes.json() as any); setStats(await statsRes.json() as any);
        }
        addTerminalLog("SYSTEM_INITIALIZED: Connected to SentinelLens Database.");
      } catch { addTerminalLog("ERROR: Failed to fetch initial system state."); }
    };
    fetchData();
  }, [addTerminalLog]);

  useEffect(() => {
    const isDemo = window.location.hostname.includes('github.io') || window.location.hostname.includes('netlify.app') || window.location.hostname === 'localhost';

    if (isDemo) {
      setIsConnected(true); addTerminalLog("STREAM_SYNC: Live vector feed established.");

      const interval = setInterval(() => {
        if (Math.random() > 0.7) {
          const newLog = generateMockLog() as any;
          setLogs(prev => [newLog, ...prev].slice(0, 50));
          setPendingClaim(newLog);
          addTerminalLog(`VECTOR_DETECTED: Match found on ${newLog.platform} (${newLog.confidence}%)`);
        }
        setStats(getMockStats());
        setFeeds(getMockFeeds());
      }, 3000);

      return () => clearInterval(interval);
    } else {
      const eventSource = new EventSource('/api/stream');
      eventSource.onopen = () => { setIsConnected(true); addTerminalLog("STREAM_SYNC: Live vector feed established."); };
      eventSource.onmessage = (event) => {
        const { type, data } = JSON.parse(event.data);
        switch (type) {
          case 'NEW_LOG':
            setLogs(prev => [data, ...prev].slice(0, 50));
            setPendingClaim(data);
            addTerminalLog(`VECTOR_DETECTED: Match found on ${data.platform} (${data.confidence}%)`);
            fetch('/api/stats').then(res => res.json()).then(setStats);
            break;
          case 'LOG_UPDATED':
            setLogs(prev => prev.map(log => log.id === data.id ? data : log));
            addTerminalLog(`PROTOCOL_ENFORCED: Claim confirmed for ${data.id}`);
            fetch('/api/stats').then(res => res.json()).then(setStats);
            break;
          case 'FEEDS_UPDATED':
            setFeeds(data); break;
        }
      };
      eventSource.onerror = () => { setIsConnected(false); addTerminalLog("WARNING: Feed synchronization lost. Reconnecting..."); };
      return () => eventSource.close();
    }
  }, [addTerminalLog]);

  const handleEnforce = async (logId: string) => {
    const isDemo = window.location.hostname.includes('github.io') || window.location.hostname.includes('netlify.app') || window.location.hostname === 'localhost';
    setIsEnforcing(true);
    addTerminalLog(`EXECUTING_PROTOCOL: Transmitting claim for ${logId}...`);
    try {
      if (isDemo) {
        await new Promise(r => setTimeout(r, 800));
        const updatedLog = mockEnforce(logId);
        if (updatedLog) setLogs(prev => prev.map(log => log.id === updatedLog.id ? updatedLog : log));
        addTerminalLog(`PROTOCOL_ENFORCED: Claim confirmed for ${logId}`);
      } else {
        await fetch('/api/enforce', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ logId }) });
      }
      setPendingClaim(null);
    } catch { addTerminalLog("ERROR: Enforcement protocol failed."); }
    finally { setIsEnforcing(false); }
  };

  return (
    <div className="min-h-screen pt-20 px-4 md:px-8 pb-12 text-white">
      {/* Header with Stats — Bento Grid */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center mb-10 gap-6 pb-8 border-b border-white/[0.04]">
        <div className="flex items-center gap-5">
          <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-neon-amber">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-black italic tracking-tighter uppercase">SentinelLens Terminal</h1>
            <div className="flex items-center gap-2 mt-1">
              <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]' : 'bg-red-500'}`} />
              <span className="text-[10px] font-black uppercase text-white/25 tracking-[0.3em]">
                {isConnected ? 'NODE_SYNC_ACTIVE' : 'OFFLINE_MODE'}
              </span>
            </div>
          </div>
        </div>

        {/* Stats Bento Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 w-full xl:w-auto">
          {[
            { label: 'Scanned', value: stats.totalScanned.toLocaleString(), icon: Search, color: 'from-blue-500/10 to-blue-500/5' },
            { label: 'Matches', value: stats.totalMatches.toLocaleString(), icon: AlertTriangle, color: 'from-amber-500/10 to-amber-500/5' },
            { label: 'Avg Confidence', value: stats.avgConfidence, icon: Zap, color: 'from-emerald-500/10 to-emerald-500/5' },
            { label: 'Recovered', value: stats.revenueRecovered, icon: BarChart3, color: 'from-violet-500/10 to-violet-500/5' },
          ].map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="glass-card-hover rounded-2xl p-5 min-w-[150px] group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-1.5 rounded-lg bg-gradient-to-br ${stat.color}`}>
                  <stat.icon className="w-3.5 h-3.5 text-white/60" />
                </div>
                <div className="text-[9px] font-black uppercase text-white/20 tracking-widest">{stat.label}</div>
              </div>
              <div className="text-xl font-black italic tabular-nums">{stat.value}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Main Content — Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-3 space-y-6">
          {/* Canonical Matrix */}
          <section className="glass-panel rounded-3xl p-6 overflow-hidden">
            <div className="text-[10px] font-black uppercase text-white/20 tracking-widest mb-6 flex items-center justify-between">
              <span>Canonical_Matrix</span>
              <span className="flex items-center gap-1.5 text-emerald-500">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live
              </span>
            </div>
            <div className="space-y-3">
              {feeds.map((feed) => (
                <motion.div key={feed.id} layout
                  className="p-4 rounded-xl glass-card-hover group"
                >
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-xs font-bold text-white/80">{feed.broadcaster}</span>
                    <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${feed.status === 'Stable' ? 'bg-emerald-500/10 text-emerald-400 shadow-neon-emerald' : 'bg-red-500/10 text-red-400'
                      }`}>
                      {feed.status}
                    </span>
                  </div>
                  <div className="text-[11px] font-medium text-white/35 mb-3 truncate">{feed.name}</div>
                  <div className="h-1.5 w-full bg-white/[0.04] rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${feed.health > 80 ? 'bg-gradient-to-r from-emerald-500 to-emerald-400' : 'bg-gradient-to-r from-amber-500 to-orange-500'}`}
                      animate={{ width: `${feed.health}%` }}
                      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Terminal */}
          <section className="glass-panel rounded-3xl p-6 h-[380px] flex flex-col border-emerald-500/5">
            <div className="text-[10px] font-black uppercase text-white/20 tracking-widest mb-5 flex items-center gap-2">
              <TerminalIcon className="w-3 h-3 text-emerald-500/50" /> System_Logs
            </div>
            <div className="space-y-2.5 overflow-y-auto flex-1 font-mono text-[10px] pr-2" style={{ scrollbarWidth: 'thin' }}>
              {terminalLogs.map((log, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }}
                  className="text-emerald-500/50 leading-tight">
                  <span className="text-emerald-500/25">&gt;</span> {log}
                </motion.div>
              ))}
            </div>
          </section>
        </div>

        {/* Center/Right Column */}
        <div className="lg:col-span-9 space-y-6">
          {/* Enforcement Alert */}
          <AnimatePresence>
            {pendingClaim && !pendingClaim.enforcedAt && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.98 }}
                className="bg-gradient-to-r from-amber-500 to-orange-600 text-black p-7 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative elevation-4"
              >
                <div className="absolute top-0 right-0 p-4 opacity-[0.08]">
                  <Fingerprint className="w-28 h-28" />
                </div>
                <div className="flex items-center gap-5 relative z-10">
                  <div className="w-14 h-14 bg-black/90 rounded-xl flex items-center justify-center shrink-0 elevation-2">
                    <AlertTriangle className="w-7 h-7 text-amber-500 animate-pulse" />
                  </div>
                  <div>
                    <h2 className="text-xl font-black italic tracking-tighter uppercase">Action Required: Detection Verified</h2>
                    <p className="text-sm font-bold opacity-75 mt-1">
                      Target on {pendingClaim.platform} — {pendingClaim.confidence}% confidence
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 relative z-10">
                  <button onClick={() => setPendingClaim(null)}
                    className="px-6 py-3.5 border-2 border-black/15 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-black/10 transition-colors">
                    Dismiss
                  </button>
                  <button onClick={() => handleEnforce(pendingClaim.id)} disabled={isEnforcing}
                    className="px-6 py-3.5 bg-black text-amber-500 rounded-xl font-black uppercase tracking-widest text-xs hover:scale-105 transition-all shadow-xl disabled:opacity-50">
                    {isEnforcing ? 'Processing...' : 'Execute DMCA'}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Detection Table */}
          <section className="glass-panel rounded-3xl overflow-hidden flex flex-col">
            <div className="p-7 border-b border-white/[0.04] flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black italic tracking-tight uppercase">Automated Detection Pipeline</h3>
                <p className="text-[10px] font-black uppercase text-white/25 tracking-widest mt-1">Real-time pHash matching across distributed edge nodes</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="px-3.5 py-1.5 bg-emerald-500/[0.08] text-emerald-400 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 glass-card">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                  Live_Monitoring
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/[0.04]">
                    <th className="px-7 py-5 text-[10px] font-black uppercase text-white/20 tracking-widest">Timestamp</th>
                    <th className="px-7 py-5 text-[10px] font-black uppercase text-white/20 tracking-widest">Platform</th>
                    <th className="px-7 py-5 text-[10px] font-black uppercase text-white/20 tracking-widest">Source_Vector</th>
                    <th className="px-7 py-5 text-[10px] font-black uppercase text-white/20 tracking-widest">Confidence</th>
                    <th className="px-7 py-5 text-[10px] font-black uppercase text-white/20 tracking-widest">Status</th>
                    <th className="px-7 py-5 text-[10px] font-black uppercase text-white/20 tracking-widest text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.03]">
                  <AnimatePresence initial={false}>
                    {logs.map((log, i) => (
                      <motion.tr key={log.id} initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2, delay: Math.min(i * 0.03, 0.3) }}
                        className="group hover:bg-white/[0.02] transition-colors"
                      >
                        <td className="px-7 py-5">
                          <div className="text-[11px] font-mono text-white/40">{new Date(log.timestamp).toLocaleTimeString()}</div>
                          <div className="text-[9px] font-medium text-white/15 mt-1">{new Date(log.timestamp).toLocaleDateString()}</div>
                        </td>
                        <td className="px-7 py-5">
                          <div className="flex items-center gap-2">
                            {log.platform === 'Twitch' ? <Activity className="w-4 h-4 text-purple-400" /> : <Play className="w-4 h-4 text-red-500" />}
                            <span className="text-xs font-bold">{log.platform}</span>
                          </div>
                        </td>
                        <td className="px-7 py-5">
                          <div className="max-w-[180px] truncate text-[11px] font-medium text-white/50">{log.sourceUrl}</div>
                          <div className="text-[10px] font-black uppercase text-amber-500/40 mt-1 truncate">{log.matchedFeed}</div>
                        </td>
                        <td className="px-7 py-5">
                          <div className="flex items-center gap-3">
                            <div className="flex-1 h-1 w-14 bg-white/[0.04] rounded-full overflow-hidden">
                              <div className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full" style={{ width: `${log.confidence}%` }} />
                            </div>
                            <span className="text-xs font-black italic tabular-nums">{log.confidence}%</span>
                          </div>
                        </td>
                        <td className="px-7 py-5">
                          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${log.status === 'Claimed' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-red-500/10 text-red-400 border border-red-500/20'
                            }`}>
                            {log.status === 'Claimed' ? <ShieldCheck className="w-3 h-3 shadow-neon-emerald" /> : <AlertTriangle className="w-3 h-3" />}
                            {log.status === 'Claimed' ? 'CONFIRMED' : 'ACTIVE'}
                          </div>
                        </td>
                        <td className="px-7 py-5 text-right">
                          {log.status === 'Detected' ? (
                            <button onClick={() => handleEnforce(log.id)}
                              className="px-4 py-1.5 bg-white/[0.03] hover:bg-emerald-500/20 border border-white/10 hover:border-emerald-500/30 rounded-lg transition-all text-[9px] font-black uppercase tracking-widest text-white/40 hover:text-emerald-400 flex items-center gap-2 group">
                              <Zap className="w-3 h-3 group-hover:animate-pulse" />
                              Enforce
                            </button>
                          ) : (
                            <div className="flex items-center gap-2 px-4 py-1.5 text-emerald-500 font-black text-[9px] uppercase tracking-widest">
                              <CheckCircle2 className="w-3 h-3" />
                              CONFIRMED
                            </div>
                          )}
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>

      {/* ═══ HACKATHON FEATURES ═══ */}

      {/* AI Deep Scanner */}
      <div className="mt-10">
        <AIScanPanel />
      </div>

      {/* Analytics + Threat Map Row */}
      <div className="mt-10">
        <AnalyticsPanel />
      </div>

      <div className="mt-10">
        <ThreatMap />
      </div>
    </div>
  );
}

