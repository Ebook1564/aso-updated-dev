"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Target, Zap, TrendingUp, Search, BarChart3, Globe, ArrowRight, ShieldCheck, Activity, Cpu } from "lucide-react";
import MagneticButton from "./MagneticButton";
import Link from "next/link";

const FeedingEvent = ({ keyword, change, type }: { keyword: string; change: string; type: string }) => (
    <div className="flex items-center justify-between p-4 rounded-xl bg-foreground/[0.02] border border-foreground/5 hover:bg-foreground/[0.04] transition-colors group">
        <div className="flex items-center gap-4">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-sm font-bold text-slate-500 dark:text-slate-300">{keyword}</span>
        </div>
        <div className="flex items-center gap-6">
            <span className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest">{type}</span>
            <span className="text-sm font-black text-emerald-500 dark:text-emerald-400">{change}</span>
        </div>
    </div>
);

const MetricBlock = ({ icon: Icon, label, value, color }: { icon: any; label: string; value: string; color: string }) => (
    <div className="p-6 rounded-[2rem] bg-foreground/[0.01] border border-foreground/5 space-y-2">
        <div className="flex items-center gap-3 text-slate-500">
            <Icon size={16} className={color} />
            <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
        </div>
        <div className="text-2xl font-black text-foreground tracking-tight">{value}</div>
    </div>
);

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(false); // Force fresh mount
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-24 md:pt-32 pb-20">
      {/* UNIQUE BACKGROUND: Quantum Ascent Layers */}
      <div className="absolute inset-0 bg-background -z-20" />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/15 via-transparent to-transparent -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-primary/5 rounded-full blur-[300px] opacity-40 -z-10 pointer-events-none" />
      <div className="absolute -top-[10%] -right-[10%] w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[150px] opacity-30 -z-10 pointer-events-none animate-pulse" />
      
      {/* Connection Mesh Overlay */}
      <div className="absolute inset-0 data-grid opacity-[0.07] dark:opacity-[0.05] -z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(var(--background-rgb),0.8)_100%)] -z-10 pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="lg:grid lg:grid-cols-12 items-center gap-16">
          
          {/* Left: Content Column (User loves this part) */}
          <div className="lg:col-span-6 relative">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-primary/10 backdrop-blur-md border border-primary/20 text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-10 shadow-[0_0_30px_rgba(var(--primary-rgb),0.2)]"
            >
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Starting at Just $10 // GROWTH_READY
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-[5.5rem] font-bold leading-[0.9] md:leading-[0.9] tracking-tighter text-foreground mb-10"
            >
              Don’t You Think Your App Deserves <br />
              <span className="text-flux italic font-mono font-light tracking-[-0.05em]">More Downloads?</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-xl md:text-2xl text-slate-700 dark:text-slate-400 mb-6 max-w-xl leading-relaxed font-bold"
            >
              Push Your App Towards 1 Million Downloads with just $10
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-lg md:text-xl text-slate-600 dark:text-slate-500 mb-8 max-w-xl leading-relaxed font-medium"
            >
              Improve visibility, rank for keywords, and grow your app organically with App Store Optimization (ASO)
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-8 mb-6"
            >
              <Link href="/auth" className="w-full sm:w-auto">
                <MagneticButton>
                  <button className="w-full sm:w-auto px-8 md:px-10 py-5 md:py-6 rounded-full bg-foreground text-background font-black text-base md:text-lg hover:bg-primary hover:text-white transition-all shadow-xl shadow-primary/10 dark:shadow-[0_30px_60px_rgba(0,0,0,0.5)] flex items-center justify-center gap-4 group">
                    Get ASO for My App
                    <ChevronRight size={22} strokeWidth={4} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </MagneticButton>
              </Link>
            </motion.div>
          </div>

          {/* Right: GLOBAL RANKING COMMAND (Overhauled part) */}
          <div className="lg:col-span-6 mt-20 lg:mt-0 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative rounded-[3rem] p-12 bg-white/70 dark:bg-slate-900/40 backdrop-blur-3xl border border-foreground/10 shadow-2xl shadow-primary/10 dark:shadow-[0_60px_120px_rgba(0,0,0,0.7)] overflow-hidden"
            >
                {/* Internal Decorative Atmosphere - Brighter in light mode */}
                <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/20 dark:bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-secondary/20 dark:bg-secondary/10 rounded-full blur-[100px] pointer-events-none" />

                <div className="relative z-10 space-y-8">
                    {/* Header: Command Status */}
                    <div className="flex items-center justify-between pb-6 border-b border-foreground/5">
                        <div className="space-y-1">
                            <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">RANKING_COMMAND_HUB</div>
                            <div className="flex items-center gap-3">
                                <div className="text-3xl font-black text-foreground tracking-tighter">Live Monitor</div>
                                <div className="px-2 py-0.5 rounded-md bg-emerald-500/20 dark:bg-emerald-500/10 border border-emerald-500/20 text-[8px] font-black text-emerald-600 dark:text-emerald-500 uppercase tracking-widest animate-pulse">
                                    Active
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-foreground/5 border border-foreground/10 flex items-center justify-center text-slate-600 dark:text-slate-500">
                                <Activity size={18} />
                            </div>
                            <div className="w-10 h-10 rounded-xl bg-primary/20 dark:bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                                <Cpu size={18} />
                            </div>
                        </div>
                    </div>

                    {/* Neural Feed: Dense Event List */}
                    <div className="space-y-4">
                        <div className="text-[9px] font-black text-slate-500 dark:text-slate-600 uppercase tracking-[0.2em]">Neural_Momentum_Stream</div>
                        <div className="space-y-2 max-h-[200px] overflow-hidden relative">
                            <FeedingEvent keyword="Keyword Dominance" change="+14.2%" type="VELOCITY" />
                            <FeedingEvent keyword="Global Visibility" change="↑ #2" type="RANKING" />
                            <FeedingEvent keyword="Conversion Delta" change="+8.4x" type="CONVERSION" />
                            <FeedingEvent keyword="Index Propagation" change="SYNCED" type="ENGINE" />
                            {/* Fade overlay for bottom */}
                            <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-background to-transparent pointer-events-none" style={{ backgroundImage: 'var(--data-fade)' }} />
                        </div>
                    </div>

                    {/* Global Pulse: Integrated Metrics */}
                    <div className="grid grid-cols-2 gap-4">
                        <MetricBlock icon={Globe} label="Geo Coverage" value="192 Regions" color="text-secondary" />
                        <MetricBlock icon={Search} label="Search Depth" value="12.4M Pos" color="text-accent" />
                    </div>

                    {/* Integrated Compliance: Professional Seal */}
                    <div className="p-8 rounded-[2.5rem] bg-emerald-500/5 border border-emerald-500/10 flex items-center justify-between group/seal hover:bg-emerald-500/10 transition-all duration-500">
                        <div className="flex items-center gap-6">
                            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-500 shadow-[0_0_30px_rgba(52,211,153,0.3)]">
                                <ShieldCheck size={32} />
                            </div>
                            <div>
                                <div className="text-[10px] font-black text-emerald-600 dark:text-emerald-500 uppercase tracking-[0.4em] mb-1">ALGORITHM_SECURED</div>
                                <div className="text-xl font-black text-foreground tracking-tight">Standard v5.2 Verified</div>
                            </div>
                        </div>
                        <div className="text-[10px] font-mono text-slate-500 dark:text-slate-700">SHA-256: 8xFD9...</div>
                    </div>
                </div>

                {/* Background HUD Decor */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none opacity-[0.02] dark:opacity-[0.02]">
                    <div className="w-full h-full border-[20px] border-foreground/5 rounded-full scale-150 animate-[spin_60s_linear_infinite]" />
                </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
