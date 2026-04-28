import { BookOpen, FileText, Share2, Zap, Shield, Globe, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function Documentation() {
  const steps = [
    {
      title: "01. Canonical Ingestion",
      description: "Broadcasters connect their legitimate CDN feeds to our edge nodes. AetherFlow generates a unique 'perceptual hash' (pHash) for every few frames.",
      icon: Globe,
      color: "text-blue-400",
      glow: "from-blue-500/10 to-blue-500/5"
    },
    {
      title: "02. Global Monitoring",
      description: "Our distributed pipeline crawls major streaming platforms (Twitch, YouTube, TikTok) sampling live streams and generating transient fingerprints.",
      icon: Zap,
      color: "text-amber-400",
      glow: "from-amber-500/10 to-amber-500/5"
    },
    {
      title: "03. pHash Matching",
      description: "We compare pirate stream hashes against our vault of legitimate feeds. Using Hamming distance, we identify matches even through resolution changes.",
      icon: Shield,
      color: "text-indigo-400",
      glow: "from-indigo-500/10 to-indigo-500/5"
    },
    {
      title: "04. Automated Enforcement",
      description: "Upon detection (94%+ confidence), our system triggers official platform APIs to file DMCA claims, demonetize, or redirect revenue in real-time.",
      icon: FileText,
      color: "text-emerald-400",
      glow: "from-emerald-500/10 to-emerald-500/5"
    }
  ];

  return (
    <div className="relative max-w-screen-2xl mx-auto py-[18vh] px-4 md:px-12">
      {/* Subtle grid background */}
      <div className="absolute inset-0 -z-10 opacity-15 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[1000px] bg-[radial-gradient(circle_at_20%_20%,rgba(245,158,11,0.04),transparent_50%)]" />
        <div className="w-full h-full bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mb-40"
      >
        <div className="flex items-center gap-6 mb-10">
          <div className="w-12 h-[2px] bg-gradient-to-r from-white/20 to-transparent" />
          <span className="text-[12px] font-black uppercase tracking-[0.6em] text-white/35">Technical Specifications</span>
        </div>
        <h1 className="heading-section text-white mb-10 uppercase italic">
          Archive <br/>
          <span className="text-amber-500">Intelligence</span>
        </h1>
        <p className="text-xl text-white/40 max-w-2xl leading-relaxed font-medium">
          A deep dive into the AetherFlow architecture: from canonical ingestion to autonomous enforcement.
        </p>
      </motion.div>

      {/* Steps — Bento Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-y-8 gap-x-6 mb-40 mt-24">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-12 lg:col-span-6 interactive group"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bento-card p-10 group">
              <div className="md:col-span-4 flex flex-col justify-between">
                <div className={`p-5 bg-gradient-to-br ${step.glow} rounded-2xl w-fit group-hover:scale-110 transition-all duration-500 elevation-1`}>
                  <step.icon className={`w-10 h-10 ${step.color}`} />
                </div>
                <div className="text-7xl font-black text-white/[0.03] tabular-nums tracking-tighter mt-4">0{i+1}</div>
              </div>
              <div className="md:col-span-8 space-y-5 flex flex-col justify-center">
                <h3 className="heading-card text-white uppercase tracking-tighter italic leading-none">{step.title.split('. ')[1]}</h3>
                <p className="text-white/40 leading-relaxed text-base font-medium">
                  {step.description}
                </p>
                <div className="pt-3 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-amber-500 group-hover:gap-4 transition-all">
                  LEARN_PROTOCOL <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* System Integrity Section */}
      <section className="mb-40 border-t border-white/[0.04] pt-24">
        <div className="grid grid-cols-12 gap-10 items-start">
          <div className="col-span-12 lg:col-span-4">
             <h2 className="heading-section text-white uppercase tracking-tighter italic mb-10">System <br/> Integrity</h2>
          </div>
          <div className="col-span-12 lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { label: "LATENCY", desc: "Global SLA under 8 minutes from injection to automated enforcement." },
              { label: "LEGALITY", desc: "Immutable cryptographic audit trails compliant with international IP laws." },
              { label: "PRECISION", desc: "98.7% accuracy across adversarial environments including high visual noise." },
              { label: "COMPUTE", desc: "Ultra-efficient pHash calculation kernels optimized for ARM edge clusters." }
            ].map((item, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.05 }}
                className="glass-card rounded-2xl p-6 space-y-4 group hover:border-amber-500/10 transition-all duration-500"
              >
                <span className="font-black text-[10px] text-amber-500 tracking-[0.4em] uppercase">{item.label}</span>
                <p className="text-white/45 text-base font-medium leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}


