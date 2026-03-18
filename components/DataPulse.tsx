"use client";

import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, ArrowUpRight, Search, Target, Layout, BarChart, ChevronRight, Activity, Shield, Zap, Globe } from "lucide-react";

const BentoCard = ({ children, className, title, icon: Icon }: { children: React.ReactNode; className?: string; title: string; icon: any }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className={`relative p-8 rounded-[2.5rem] neo-glass border-foreground/5 bg-foreground/[0.01] overflow-hidden group hover:border-primary/20 transition-all duration-500 shadow-xl dark:shadow-none ${className}`}
    >
        <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <Icon size={16} />
                </div>
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">{title}</h3>
            </div>
            <div className="w-2 h-2 rounded-full bg-emerald-500/50 animate-pulse" />
        </div>
        {children}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.div>
);

const FeedItem = ({ keyword, trend, status }: { keyword: string; trend: string; status: string }) => (
    <div className="flex items-center justify-between py-4 border-b border-foreground/5 last:border-0 group/item">
        <div className="flex items-center gap-4">
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="text-sm font-bold text-foreground tracking-tight">{keyword}</span>
        </div>
        <div className="flex items-center gap-6">
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{status}</span>
            <span className="text-sm font-black text-emerald-500 flex items-center gap-1">
                <ArrowUpRight size={14} />
                {trend}
            </span>
        </div>
    </div>
);

export default function DataPulse() {
  return (
    <section id="intelligence" className="py-20 md:py-40 relative overflow-hidden bg-background border-y border-foreground/5">
      {/* Dynamic Background Mesh */}
      <div className="absolute inset-0 data-grid opacity-[0.05] pointer-events-none" />
      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-xs font-black uppercase tracking-[0.6em] text-primary mb-8"
            >
              Intelligence Engine
            </motion.div>
            <h2 className="text-4xl md:text-7xl font-bold text-foreground mb-8 tracking-tighter leading-tight">
              Predictive <span className="text-flux italic font-mono font-light">Growth_Metrics.</span>
            </h2>
            <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
              Our advanced analytics engine reverse-engineers store algorithms to predict your app's ranking trajectory with 99.2% accuracy.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 max-w-7xl mx-auto">
            {/* Main Ranking Feed */}
            <BentoCard icon={Activity} title="Live Ranking Velocity" className="md:col-span-8">
                <div className="space-y-1">
                    <FeedItem keyword="Top Fitness Tracker" trend="+142%" status="DOMINATING" />
                    <FeedItem keyword="AI Workout Engine" trend="+88%" status="SURGING" />
                    <FeedItem keyword="Daily Yoga Planner" trend="+26%" status="INDEXING" />
                    <FeedItem keyword="Meditation Guide" trend="+12%" status="STABLE" />
                    <FeedItem keyword="Nutrition Log X" trend="+214%" status="BREAKOUT" />
                </div>
                <div className="mt-8 pt-8 border-t border-foreground/5 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[9px] font-black text-primary uppercase tracking-widest">Store_V3_Api</div>
                        <div className="text-xs font-bold text-slate-500">Last Sync: 0.4s ago</div>
                    </div>
                    <button className="text-[10px] font-black text-slate-500 hover:text-primary transition-colors flex items-center gap-2">
                        Global Index
                        <ChevronRight size={12} />
                    </button>
                </div>
            </BentoCard>

            {/* Visibility Heatmap */}
            <BentoCard icon={Globe} title="Market Penetration" className="md:col-span-4 bg-primary/[0.03]">
                <div className="h-48 flex items-center justify-center relative">
                    <div className="absolute inset-0 flex items-center justify-center opacity-20">
                        <Globe size={120} strokeWidth={0.5} className="animate-[spin_20s_linear_infinite]" />
                    </div>
                    <div className="relative text-center">
                        <div className="text-5xl font-black text-foreground tracking-tighter mb-2">192</div>
                        <div className="text-[10px] font-black text-primary uppercase tracking-widest leading-none">Active Regions <br /> Indexed</div>
                    </div>
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                    {["US", "UK", "IN", "DE", "FR", "JP"].map(c => (
                        <div key={c} className="px-3 py-1.5 rounded-xl bg-foreground/5 border border-foreground/5 text-[9px] font-bold text-slate-500">{c}</div>
                    ))}
                </div>
            </BentoCard>

            {/* Compute Metrics */}
            <BentoCard icon={Shield} title="Algorithmic Safety" className="md:col-span-4">
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-500">Compliance Rate</span>
                        <span className="text-sm font-black text-emerald-500">100%</span>
                    </div>
                    <div className="w-full h-2 bg-foreground/5 rounded-full overflow-hidden">
                        <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: "100%" }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="h-full bg-emerald-500" 
                        />
                    </div>
                    <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                        Every keyword recommendation is cross-referenced with store policy shards to ensure long-term ranking safety.
                    </p>
                </div>
            </BentoCard>

            {/* Growth Potential */}
            <BentoCard icon={TrendingUp} title="Indexing Efficiency" className="md:col-span-4">
                <div className="flex items-end gap-3 h-32 mb-6">
                    {[30, 50, 40, 70, 60, 90, 80].map((h, i) => (
                        <motion.div 
                            key={i}
                            initial={{ height: 0 }}
                            whileInView={{ height: `${h}%` }}
                            transition={{ delay: i * 0.1 }}
                            className={`flex-1 rounded-t-lg ${i === 6 ? 'bg-primary' : 'bg-foreground/10'}`} 
                        />
                    ))}
                </div>
                <div className="text-3xl font-black text-foreground tracking-tighter">+8.4x</div>
                <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mt-1">Av. Velocity Multiplier</div>
            </BentoCard>

            {/* Intelligence Insights */}
            <BentoCard icon={Zap} title="Intelligence Hub" className="md:col-span-4 bg-foreground/[0.02]">
                <div className="space-y-4">
                    <div className="p-5 rounded-3xl bg-primary/5 border border-primary/10">
                        <div className="text-[9px] font-black text-primary uppercase tracking-widest mb-2">Search Status</div>
                        <div className="text-sm font-bold text-foreground tracking-tight">Expert Protocol Active</div>
                    </div>
                    <div className="p-5 rounded-3xl bg-foreground/5 border border-foreground/5">
                        <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">Market Logic</div>
                        <div className="text-sm font-bold text-foreground tracking-tight">Verified Compliance</div>
                    </div>
                    <div className="p-5 rounded-3xl bg-foreground/5 border border-foreground/5">
                        <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">Sync Frequency</div>
                        <div className="text-sm font-bold text-foreground tracking-tight">Real-time Pulse</div>
                    </div>
                </div>
            </BentoCard>
        </div>
      </div>
    </section>
  );
}
