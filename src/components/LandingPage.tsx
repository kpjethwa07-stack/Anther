import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  Shield, ArrowRight, Zap, Lock, Database, Activity, Globe,
  ChevronRight, Hexagon, Cpu, Fingerprint, Sparkles, Eye
} from 'lucide-react';
import { Link } from 'react-router-dom';

const RollingWords = React.memo(() => {
  const words = ['Universal Protection', 'Secure Governance', 'Global Trust Layer', 'Autonomous Ledger', 'Private Identity Flow'];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIndex((prev) => (prev + 1) % words.length), 2500);
    return () => clearInterval(timer);
  }, [words.length]);

  return (
    <div className="relative h-12 sm:h-16 md:h-24 lg:h-32 overflow-hidden block w-full mx-auto">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={index}
          initial={{ y: '100%', opacity: 0, rotateX: 90 }}
          animate={{ y: '0%', opacity: 1, rotateX: 0 }}
          exit={{ y: '-100%', opacity: 0, rotateX: -90 }}
          transition={{ type: 'spring', stiffness: 200, damping: 25, duration: 0.6 }}
          className="absolute inset-0 flex items-center justify-center aurora-text text-2xl sm:text-4xl md:text-6xl lg:text-7xl transform-gpu will-change-transform whitespace-nowrap p-2 font-black tracking-[0.05em]"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
});

const FeatureCard = React.memo(({ icon: Icon, title, description, badge, index }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    whileHover={{ y: -10, scale: 1.02 }}
    className="group relative bento-card p-10 will-change-transform"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[inherit]" />
    <div className="relative z-10 space-y-6">
      <div className="p-4 bg-white/[0.04] rounded-2xl w-fit group-hover:scale-110 group-hover:bg-amber-500/15 transition-all duration-500 elevation-1">
        <Icon className="w-8 h-8 text-amber-500" />
      </div>
      <div>
        <div className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-500/60 mb-2">{badge}</div>
        <h3 className="text-2xl font-black text-white tracking-tight">{title}</h3>
      </div>
      <p className="text-slate-400 text-sm leading-relaxed font-medium">{description}</p>
      <div className="pt-4 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-amber-500 group-hover:gap-4 transition-all">
        Explore Protocol <ArrowRight className="w-4 h-4" />
      </div>
    </div>
  </motion.div>
));

export const LandingPage: React.FC = () => {
  const { scrollY, scrollYProgress } = useScroll();
  const navBg = useTransform(scrollY, [0, 100], ["rgba(8, 8, 10, 0)", "rgba(8, 8, 10, 0.85)"]);
  const navBorder = useTransform(scrollY, [0, 100], ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.04)"]);

  const stats = useMemo(() => [
    { label: 'Validated Nodes', value: '4,829' },
    { label: 'Network Confidence', value: '99.98%' },
    { label: 'Protocol Version', value: 'v3.2.0-α' },
    { label: 'Sync Latency', value: '12ms' }
  ], []);

  const archives = useMemo(() => [
    { id: 'AUTH-029', status: 'CONFIRMED', type: 'Node Handshake', time: '2ms ago' },
    { id: 'SEC-912', status: 'BLOCKED', type: 'DDoS Matrix', time: '14ms ago' },
    { id: 'LEDG-445', status: 'SYNCED', type: 'Cipher Bloom', time: '1m ago' },
    { id: 'GOV-118', status: 'CONFIRMED', type: 'Epoch Vote', time: '5m ago' }
  ], []);

  return (
    <div className="relative min-h-screen bg-[#08080a] overflow-x-hidden">
      {/* Background — CSS-animated SVG flow lines (GPU compositor) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[80vw] h-[80vh] bg-amber-500/[0.04] blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-0 left-0 w-[60vw] h-[60vh] bg-white/[0.015] blur-[100px] mix-blend-overlay" />
        <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          <path d="M-100,200 C200,400 800,0 1200,600" stroke="rgba(245,158,11,0.12)" strokeWidth="0.6" fill="none" className="animate-flow-path" />
          <path d="M1400,100 C1100,400 400,200 -200,800" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" fill="none" className="animate-flow-path" style={{ animationDelay: '1s' }} />
          <path d="M-50,500 C300,200 700,600 1300,300" stroke="rgba(245,158,11,0.08)" strokeWidth="0.4" fill="none" className="animate-flow-path" style={{ animationDelay: '2s' }} />
          <path d="M1500,50 C1000,300 500,100 -100,600" stroke="rgba(139,92,246,0.06)" strokeWidth="0.4" fill="none" className="animate-flow-path" style={{ animationDelay: '3s' }} />
          <path d="M0,700 C400,500 800,800 1300,400" stroke="rgba(20,184,166,0.05)" strokeWidth="0.3" fill="none" className="animate-flow-path" style={{ animationDelay: '4s' }} />
        </svg>
      </div>

      {/* Navigation */}
      <motion.nav 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        style={{ backgroundColor: navBg, borderBottomColor: navBorder }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 w-full z-[100] px-8 md:px-12 py-8 flex items-center justify-between border-b backdrop-blur-2xl"
      >
        <Link to="/" className="flex items-center gap-4 group interactive">
          <motion.div 
            whileHover={{ rotateY: 180 }}
            className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center rounded-lg shadow-neon-amber"
          >
            <Shield className="w-6 h-6 text-white" />
          </motion.div>
          <span className="text-2xl font-black tracking-tighter text-white uppercase italic">AETHERFLOW</span>
        </Link>
        
        <div className="flex items-center gap-12">
          <div className="hidden md:flex gap-10">
            {[
              { label: 'Archive', path: '/docs' },
              { label: 'Protocol', path: '/guide' }
            ].map((item, i) => (
              <motion.div key={item.label} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} >
                <Link to={item.path} className="relative text-[11px] font-black uppercase tracking-[0.4em] text-white/40 hover:text-white transition-all interactive group btn-ghost">
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </div>
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} >
            <Link to="/dashboard" className="px-8 py-3.5 bg-gradient-to-r from-amber-500 to-orange-600 text-black text-[10px] font-black uppercase tracking-widest rounded-lg btn-primary interactive shadow-neon-amber">
              Dashboard
            </Link>
          </motion.div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative pt-[35vh] pb-[20vh] px-8 md:px-12 z-10">
        <div className="max-w-screen-2xl mx-auto grid grid-cols-12 gap-8 items-end">
          <div className="col-span-12 lg:col-span-10">
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
              <div className="flex items-center gap-4 mb-10">
                <div className="h-[2px] w-20 bg-gradient-to-r from-amber-500 to-transparent" />
                <span className="text-[12px] font-black uppercase tracking-[0.5em] text-amber-500">Decentralized Intelligence</span>
              </div>
              {/* Radial Scanner SVG */}
              <svg className="absolute -right-20 top-1/2 -translate-y-1/2 w-[30vw] h-[30vw] max-w-[400px] opacity-[0.04] hidden lg:block" viewBox="0 0 200 200" fill="none">
                <circle cx="100" cy="100" r="80" stroke="white" strokeWidth="0.3" strokeDasharray="4 6" className="animate-ring-rotate" style={{ animationDuration: '40s' }} />
                <circle cx="100" cy="100" r="50" stroke="rgba(245,158,11,0.4)" strokeWidth="0.5" strokeDasharray="8 4" className="animate-ring-rotate" style={{ animationDuration: '25s', animationDirection: 'reverse' }} />
                <circle cx="100" cy="100" r="20" stroke="white" strokeWidth="0.3" className="animate-ring-rotate" style={{ animationDuration: '15s' }} />
                <line x1="100" y1="0" x2="100" y2="200" stroke="rgba(255,255,255,0.05)" strokeWidth="0.3" />
                <line x1="0" y1="100" x2="200" y2="100" stroke="rgba(255,255,255,0.05)" strokeWidth="0.3" />
                <circle cx="100" cy="100" r="3" fill="rgba(245,158,11,0.5)" className="animate-core-pulse" />
              </svg>
              <h1 className="heading-hero text-white uppercase overflow-hidden perspective-2000 relative z-10">
                {"Auto".split("").map((char, i) => (
                  <motion.span key={i} initial={{ y: "110%", rotateX: 90, opacity: 0 }} animate={{ y: 0, rotateX: 0, opacity: 1 }} 
                     transition={{ duration: 0.6, delay: i * 0.03, ease: [0.16, 1, 0.3, 1] }}
                     className="inline-block transform-gpu">{char}</motion.span>
                ))}
                <br />
                <span className="text-amber-500">
                  {"nomous".split("").map((char, i) => (
                    <motion.span key={i} initial={{ y: "110%", rotateX: 90, opacity: 0 }} animate={{ y: 0, rotateX: 0, opacity: 1 }} 
                       transition={{ duration: 0.6, delay: (i + 4) * 0.03, ease: [0.16, 1, 0.3, 1] }}
                       className="inline-block transform-gpu">{char}</motion.span>
                  ))}
                </span>
                <br />
                {"Compute".split("").map((char, i) => (
                  <motion.span key={i} initial={{ y: "110%", rotateX: 90, opacity: 0 }} animate={{ y: 0, rotateX: 0, opacity: 1 }} 
                     transition={{ duration: 0.6, delay: (i + 10) * 0.03, ease: [0.16, 1, 0.3, 1] }}
                     className="inline-block transform-gpu text-white/90">{char}</motion.span>
                ))}
              </h1>
            </motion.div>
          </div>
          
          <div className="col-span-12 lg:col-span-2 lg:pb-10">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}   className="space-y-8">
              <p className="text-white/40 text-sm font-medium leading-relaxed max-w-[240px]">
                High-performance cryptographic infrastructure for the next epoch of global decentralized networks.
              </p>
              <div className="text-[10px] font-black text-white px-4 py-2 border border-white/15 inline-block rounded-lg glass-card animate-border-glow">
                PROTOCOL V3.2
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Bar — Glassmorphism */}
      <div className="w-full border-y border-white/[0.04] py-12 px-8 md:px-12 glass-panel">
        <div className="max-w-screen-2xl mx-auto flex flex-wrap gap-x-20 gap-y-10">
          {stats.map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}   className="space-y-3">
              <div className="text-[10px] font-black uppercase tracking-[0.5em] text-white/25">{stat.label}</div>
              <div className="text-4xl font-black text-white tabular-nums tracking-tighter italic neon-glow-amber">{stat.value}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bento Grid Features */}
      <section className="relative py-[25vh] px-8 md:px-12 z-10">
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex flex-col gap-6 mb-20">
            <div className="flex items-center gap-4">
              <div className="w-12 h-[2px] bg-gradient-to-r from-amber-500 to-transparent" />
              <span className="text-xs font-black uppercase tracking-[0.6em] text-amber-500">Core Infrastructure</span>
            </div>
            <h2 className="heading-section text-white italic tracking-tighter uppercase leading-[0.85]">
              Modular <br /> Architecture.
            </h2>
          </div>

          {/* BENTO GRID — asymmetric layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto lg:h-[800px] relative">
            {/* Crosshair Decorations */}
            <svg className="absolute -top-8 -left-8 w-16 h-16 opacity-[0.08] hidden md:block" viewBox="0 0 40 40" fill="none">
              <line x1="20" y1="0" x2="20" y2="40" stroke="white" strokeWidth="0.5" />
              <line x1="0" y1="20" x2="40" y2="20" stroke="white" strokeWidth="0.5" />
              <circle cx="20" cy="20" r="6" stroke="rgba(245,158,11,0.5)" strokeWidth="0.5" fill="none" className="animate-core-pulse" />
            </svg>
            <svg className="absolute -bottom-8 -right-8 w-16 h-16 opacity-[0.08] hidden md:block" viewBox="0 0 40 40" fill="none">
              <line x1="20" y1="0" x2="20" y2="40" stroke="white" strokeWidth="0.5" />
              <line x1="0" y1="20" x2="40" y2="20" stroke="white" strokeWidth="0.5" />
              <circle cx="20" cy="20" r="6" stroke="rgba(245,158,11,0.5)" strokeWidth="0.5" fill="none" className="animate-core-pulse" style={{ animationDelay: '1s' }} />
            </svg>

            {/* Large Hero Card */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} 
              className="md:col-span-8 bento-card p-12 md:p-16 flex flex-col justify-between group"
            >
              <div className="absolute top-0 right-0 p-12 opacity-[0.06] group-hover:opacity-[0.12] transition-opacity duration-700">
                <Globe className="w-64 h-64 text-white" />
              </div>
              <div className="relative z-10 space-y-8">
                <div className="p-4 bg-white/[0.04] rounded-2xl w-fit elevation-1">
                  <Shield className="w-12 h-12 text-amber-500" />
                </div>
                <h3 className="heading-card text-white uppercase italic leading-none max-w-xl">Global Trust Infrastructure for Autonomous Systems</h3>
                <p className="text-white/40 text-lg font-medium max-w-lg">A unified security layer that provides deterministic verification for decentralized intelligence streams across any network boundary.</p>
              </div>
              <div className="relative z-10 flex gap-4 mt-8">
                <Link to="/dashboard" className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-black font-black uppercase text-[10px] tracking-widest rounded-lg btn-primary shadow-neon-amber">Launch Protocol</Link>
                <button className="px-8 py-4 border border-white/15 text-white font-black uppercase text-[10px] tracking-widest rounded-lg btn-ghost glass-card hover:bg-white/[0.04]">Audit Source</button>
              </div>
            </motion.div>

            {/* Side Column */}
            <div className="md:col-span-4 grid grid-rows-2 gap-6">
              <motion.div 
                initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} 
                className="bg-gradient-to-br from-amber-500 to-orange-600 p-10 rounded-[clamp(1.5rem,3vw,2.5rem)] flex flex-col justify-between group cursor-pointer interactive-lift elevation-3 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Zap className="w-12 h-12 text-black relative z-10" />
                <div className="space-y-4 relative z-10">
                  <h3 className="text-3xl font-black text-black uppercase leading-none">Ultra-Low Latency Nexus</h3>
                  <div className="flex items-center gap-2 text-black/60 font-black uppercase text-xs tracking-widest">
                    <span>Performance</span> <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} 
                className="bento-card p-10 flex flex-col justify-between group"
              >
                <Fingerprint className="w-12 h-12 text-amber-500" />
                <div className="space-y-4">
                  <h3 className="text-3xl font-black text-white uppercase leading-none">Biometric Identity Sync</h3>
                  <p className="text-white/40 text-sm">Secure zero-knowledge proofs for biological identity verification.</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Large Typography Callout */}
      <section className="relative py-[12vh] px-8 md:px-12 z-10 text-center overflow-hidden border-y border-white/[0.03]">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/[0.06] via-transparent to-amber-500/[0.06] pointer-events-none" />
        <motion.div initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} 
          className="text-5xl md:text-8xl lg:text-[12vw] font-black tracking-[-0.08em] text-white/[0.04] uppercase select-none leading-none overflow-hidden whitespace-nowrap"
        >
          {"AETHER_FLOW".split("").map((char, i) => (
            <motion.span key={i} initial={{ opacity: 0, y: 100, rotateX: 45 }} animate={{ opacity: 1, y: 0, rotateX: 0 }}
                className="inline-block">
              {char === "_" ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.div>
      </section>

      {/* Archive Logs Section */}
      <section className="relative py-[25vh] px-8 md:px-12 z-10">
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-6 space-y-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-emerald-500/30 text-emerald-500 text-[10px] font-black uppercase tracking-[0.5em] rounded-full glass-card">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              System Log 24.1.0
            </div>
            <h2 className="heading-section text-white tracking-tighter leading-[0.9] uppercase italic">Archive <br /> Intelligence.</h2>
            <p className="text-white/40 text-lg leading-relaxed max-w-md">
              Complete state transparency with zero-knowledge verification. Every action is signed, verified, and forever archived in the AetherFlow lattice.
            </p>
            <div className="flex gap-16">
              <div className="space-y-2">
                <div className="text-5xl font-black text-white neon-glow-amber">12MS</div>
                <div className="text-[10px] font-black uppercase tracking-widest text-white/25">Avg Latency</div>
              </div>
              <div className="space-y-2">
                <div className="text-5xl font-black text-white neon-glow-emerald">0%</div>
                <div className="text-[10px] font-black uppercase tracking-widest text-white/25">State Leakage</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <motion.div 
              initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} 
              className="glass-panel p-10 rounded-2xl transform rotate-1 hover:rotate-0 transition-transform duration-1000 elevation-4 shimmer"
            >
              <div className="flex items-center justify-between mb-10 opacity-30">
                <span className="text-[10px] font-black uppercase tracking-wider">Live_Node_Flux.stream</span>
                <div className="flex gap-2">
                  <div className="w-2 h-2 rounded-full border border-white/40" />
                  <div className="w-2 h-2 rounded-full border border-white/40" />
                </div>
              </div>
              <div className="space-y-6 font-mono">
                {archives.map((log, i) => (
                  <motion.div 
                    key={log.id} 
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="flex justify-between items-center group/log interactive py-2 px-3 rounded-lg hover:bg-white/[0.03] transition-colors"
                  >
                    <div className="flex items-center gap-6">
                      <span className="text-white/20 text-xs">{log.id}</span>
                      <span className="text-white text-sm font-bold uppercase tracking-tight group-hover/log:text-amber-500 transition-colors">{log.type}</span>
                    </div>
                    <span className="text-white/35 text-[10px] font-bold">{log.status}</span>
                  </motion.div>
                ))}
              </div>
              <motion.div className="mt-10 pt-6 border-t border-white/[0.06] flex justify-center" whileHover={{ scale: 1.05 }}>
                <Link to="/docs" className="text-[10px] font-black uppercase tracking-[0.5em] text-white/45 hover:text-white transition-all interactive btn-ghost px-4 py-2">
                  Access History Layer. Archive_01
                </Link>
              </motion.div>
            </motion.div>
            <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-amber-500/[0.04] blur-[80px] -z-10 animate-ambient-pulse" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-[35vh] px-8 md:px-12 z-10 text-center">
        <div className="max-w-4xl mx-auto space-y-16">
          <h2 className="heading-section text-white uppercase leading-[0.8]">
            Join the <br />
            <span className="text-amber-500">New Core</span>
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-16">
            <Link to="/dashboard" className="w-full md:w-auto px-14 py-7 bg-gradient-to-r from-amber-500 to-orange-600 text-black font-black uppercase tracking-[0.2em] rounded-xl btn-primary shadow-neon-amber interactive">
              Start Dashboard
            </Link>
            <Link to="/guide" className="w-full md:w-auto px-14 py-7 border border-white/15 text-white font-black uppercase tracking-[0.2em] rounded-xl btn-ghost glass-card hover:bg-white/[0.04] interactive">
              Learn Protocol
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-24 px-8 md:px-12 z-10 border-t border-white/[0.04] glass-panel">
        <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row items-start justify-between gap-24">
          <div className="space-y-8">
            <Link to="/" className="text-3xl font-black tracking-tighter text-white uppercase italic">AETHERFLOW</Link>
            <p className="text-white/25 text-xs font-black uppercase tracking-[0.4em] max-w-sm">
              © 2024 DECENTRALIZED PROTOCOL OPS. <br />
              GLOBAL ARCHITECTURE UNIT.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-16 gap-y-10">
            {[
              { title: 'Network', links: ['Status', 'Nodes', 'Mainnet', 'Stats'] },
              { title: 'Devs', links: ['Docs', 'API', 'Guide', 'Github'] },
              { title: 'Ops', links: ['Security', 'Legal', 'Press', 'Jobs'] },
              { title: 'Social', links: ['Twitter', 'Discord', 'Github', 'LinkedIn'] },
            ].map(group => (
              <div key={group.title} className="space-y-5">
                <div className="text-[10px] font-black uppercase tracking-[0.5em] text-amber-500">{group.title}</div>
                <div className="space-y-2.5">
                  {group.links.map(link => (
                    <a key={link} href="#" className="block text-[11px] font-bold uppercase tracking-[0.15em] text-white/35 hover:text-white transition-all interactive">{link}</a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};


