import { Users, Target, Rocket, MousePointer2, CheckCircle2, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export default function Guide() {
  const values = [
    { title: "Broadcasters", desc: "Recover lost ad revenue by intercepting pirate nodes and redirecting viewers to authenticated pipelines.", icon: Target, gradient: "from-blue-500/10 to-blue-500/5" },
    { title: "Networks", desc: "Distributed consensus verification at the edge ensures zero-false-positive enforcement global wide.", icon: Users, gradient: "from-indigo-500/10 to-indigo-500/5" },
    { title: "Creators", desc: "Automated IP audits preserve budget integrity for high-fidelity production cycles and fans.", icon: TrendingUp, gradient: "from-emerald-500/10 to-emerald-500/5" }
  ];

  const workflow = [
    { step: "01", title: "DNA SIGNATURE INJECTION", desc: "Integrate our light-weight pHash kernel to generate a cryptographically valid DNA sequence for your broadcast stream.", action: "MOUNT FEED" },
    { step: "02", title: "GLOBAL EDGE SWEEP", desc: "Distributed AI clusters sample the multi-verse of fragmented streaming platforms, correlating transients with zero latency.", action: "ACTIVE SYNC" },
    { step: "03", title: "AUTONOMOUS RECOVERY", desc: "Upon 98% signature match, the system triggers direct API enforcement to seize monetization and redirect traffic.", action: "CLAIM ASSET" }
  ];

  return (
    <div className="max-w-screen-2xl mx-auto py-[18vh] px-4 md:px-12">
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} className="mb-40 relative">
        <div className="flex items-center gap-6 mb-10 relative z-10">
          <div className="w-12 h-[2px] bg-gradient-to-r from-white/20 to-transparent" />
          <span className="text-[12px] font-black uppercase tracking-[0.6em] text-white/35">Protocol Guidelines</span>
        </div>
        <h1 className="heading-section text-white mb-10 uppercase italic">The <br/><span className="text-amber-500">Multiverse</span></h1>
        <p className="text-xl text-white/40 max-w-2xl leading-relaxed font-medium">AetherFlow: defining the quantum state of content protection and autonomous asset recovery in a fragmented world.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-y-12 gap-x-6 mb-40">
        {values.map((item, i) => (
          <motion.div key={i} initial={{ opacity: 0, scale: 0.98, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.1 }} className="md:col-span-4 group interactive">
            <div className="bento-card p-10 h-full flex flex-col justify-between gap-8">
              <div className={`w-16 h-16 bg-gradient-to-br ${item.gradient} border border-white/[0.06] flex items-center justify-center rounded-xl group-hover:scale-110 transition-all duration-500 elevation-1`}>
                <item.icon className="w-8 h-8" />
              </div>
              <div className="space-y-5">
                <h3 className="heading-card text-white uppercase italic tracking-tighter">{item.title}</h3>
                <p className="text-white/40 text-base font-medium leading-relaxed">{item.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <section className="mb-40 border-t border-white/[0.04] pt-24">
        <h2 className="text-[12px] font-black text-white/20 mb-24 uppercase tracking-[1em]">Operational Convergence</h2>
        <div className="space-y-16">
          {workflow.map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: i * 0.1 }} className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center group interactive glass-card rounded-3xl p-8 md:p-10 hover:border-amber-500/10 transition-all duration-500">
              <div className="md:col-span-3">
                <span className="text-6xl md:text-8xl font-black text-white/[0.04] italic leading-none group-hover:text-amber-500/15 transition-colors duration-500">{item.step}</span>
              </div>
              <div className="md:col-span-6 space-y-4">
                <h3 className="text-2xl md:text-3xl font-black text-white uppercase italic tracking-tighter">{item.title}</h3>
                <p className="text-white/40 text-base font-medium leading-relaxed max-w-xl">{item.desc}</p>
              </div>
              <div className="md:col-span-3 flex justify-start md:justify-end">
                <button className="px-8 py-4 border border-white/10 text-white font-black uppercase tracking-widest text-xs rounded-xl btn-ghost glass-card hover:bg-white hover:text-black transition-all duration-500">{item.action}</button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="relative py-32 text-center">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}  className="space-y-14">
          <h2 className="heading-section text-white uppercase italic tracking-tighter leading-[0.85]">Activate the <br /> <span className="text-amber-500">Nexus</span></h2>
          <Link to="/" className="inline-block px-14 py-7 bg-gradient-to-r from-amber-500 to-orange-600 text-black font-black uppercase tracking-[0.3em] rounded-xl btn-primary shadow-neon-amber interactive">Uplink Terminal</Link>
        </motion.div>
      </section>
    </div>
  );
}


