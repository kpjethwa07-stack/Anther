import React from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  BookOpen,
  LayoutDashboard,
  HelpCircle,
  Hexagon
} from 'lucide-react';

import Dashboard from './components/Dashboard';
import Documentation from './components/Documentation';
import Guide from './components/Guide';
import { LandingPage } from './components/LandingPage';
import { VectorDecorations } from './components/VectorDecorations';

function Navigation() {
  const location = useLocation();
  if (location.pathname === '/') return null;
  
  return (
    <nav className="glass-nav sticky top-0 z-50">
      <div className="max-w-[1600px] mx-auto px-8 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-4 group perspective-2000">
            <motion.div 
              whileHover={{ rotateY: 180, scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              className="w-11 h-11 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-neon-amber preserve-3d"
            >
              <Shield className="w-6 h-6 text-white" />
            </motion.div>
            <span className="text-lg font-black tracking-tighter text-white/80 uppercase italic hidden sm:inline">AetherFlow</span>
          </Link>
        
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-1.5 bg-white/[0.03] rounded-2xl p-1.5 border border-white/[0.06] backdrop-blur-3xl elevation-2">
            {[
              { path: '/guide', label: 'Protocol', icon: HelpCircle },
              { path: '/docs', label: 'Archive', icon: BookOpen },
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.15em] transition-all flex items-center gap-2.5 overflow-hidden group ${
                  location.pathname === item.path ? 'text-white' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {location.pathname === item.path && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-amber-600 to-orange-600 shadow-neon-amber rounded-xl"
                    transition={{ type: 'spring', bounce: 0.15, duration: 0.7 }}
                  />
                )}
                <item.icon className="w-3.5 h-3.5 relative z-10" />
                <span className="relative z-10">{item.label}</span>
              </Link>
            ))}
          </div>
          
          <div className="flex items-center gap-6">
            <Link to="/dashboard" className="px-5 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-black text-[10px] font-black uppercase tracking-widest rounded-lg btn-primary interactive shadow-neon-amber">
              Dashboard
            </Link>
            
            <div className="hidden lg:flex items-center gap-6 text-[10px] font-black tracking-[0.2em]">
              <div className="flex items-center gap-2.5 bg-emerald-500/[0.08] px-4 py-2 rounded-full border border-emerald-500/15 glass-card">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_12px_rgba(16,185,129,0.8)]" />
                <span className="text-emerald-400">CIPHER ACTIVE</span>
              </div>
              <span className="text-slate-600 border-l border-white/[0.06] pl-6">CORE.OS 2.4.1</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <>
      <AnimatePresence mode="popLayout">
        <motion.div key={location.pathname} className="will-change-contents">
          <Routes location={location}>
              <Route path="/" element={<LandingPage />} />
              <Route 
                path="/dashboard" 
                element={
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Dashboard />
                  </motion.div>
                } 
              />
              <Route 
                path="/docs" 
                element={
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Documentation />
                  </motion.div>
                } 
              />
              <Route 
                path="/guide" 
                element={
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Guide />
                  </motion.div>
                } 
              />
            </Routes>
        </motion.div>
      </AnimatePresence>

      <motion.div
        key={`progress-${location.pathname}`}
        initial={{ scaleX: 0, opacity: 1 }}
        animate={{ scaleX: 1, opacity: [1, 1, 0] }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 z-[210] origin-left"
      />
    </>
  );
}

function AppContent() {
  const location = useLocation();
  const isLanding = location.pathname === '/';

  return (
    <div className={`min-h-screen bg-[#08080a] font-sans flex flex-col ${!isLanding ? 'text-slate-300' : 'text-white'}`}>
      {/* Gradient Mesh Background - Always present */}
      <div className="gradient-mesh-bg" />
      
      {/* Noise Overlay */}
      <div className="noise-overlay" />
      
      <VectorDecorations />
      <Navigation />
      
      {!isLanding && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
          <div className="absolute top-[-10%] right-[-5%] w-[50%] h-[50%] bg-amber-600/[0.04] blur-[150px] glow-ambient" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[50%] h-[50%] bg-blue-600/[0.03] blur-[150px] glow-ambient" style={{ animationDelay: '2s' }} />
        </div>
      )}

      <main className={`flex-1 ${!isLanding ? 'max-w-[1600px] mx-auto w-full p-8 overflow-x-hidden' : ''}`}>
        <AnimatedRoutes />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
