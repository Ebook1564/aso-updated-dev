"use client";

import React from "react";
import { motion } from "framer-motion";
import { Cpu, Signal, Zap, Activity, Gauge, Search } from "lucide-react";

const signals = [
  { label: "Alpha Capture", value: "99.2%", description: "Signal detection in noisy categories", color: "text-primary" },
  { label: "Neural Drift", value: "0.04s", description: "Market response adaptation speed", color: "text-secondary" },
  { label: "Growth Multiplier", value: "12.4x", description: "Average ROI across elite accounts", color: "text-accent" },
];

const ComputationGraph = () => {
  return (
    <div className="relative h-full w-full min-h-[400px] flex items-center justify-center p-12">
      {/* Static Concentric Rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
        {[40, 60, 80].map((size, i) => (
          <div
            key={i}
            className={`absolute rounded-full border border-foreground/5`}
            style={{ width: `${size}%`, height: `${size}%` }}
          />
        ))}
      </div>
      
      <div className="relative z-10 flex flex-col items-center gap-8">
        <div className="p-10 neo-glass bg-primary/10 border-primary/20 rounded-[3rem] flex flex-col items-center shadow-[0_0_50px_rgba(6,182,212,0.1)]">
           <Activity className="text-primary mb-6" size={48} />
           <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mb-2">Rank Probability</div>
           <div className="text-5xl font-black text-foreground tracking-tighter">98.4%</div>
        </div>

        <div className="flex gap-4">
             <div className="px-6 py-3 rounded-full neo-glass border-foreground/10 bg-foreground/[0.02] flex items-center gap-3">
                <Gauge size={14} className="text-secondary" />
                <span className="text-[9px] font-black text-foreground uppercase tracking-widest">Low_Latency</span>
             </div>
             <div className="px-6 py-3 rounded-full neo-glass border-foreground/10 bg-foreground/[0.02] flex items-center gap-3">
                <Zap size={14} className="text-accent" />
                <span className="text-[9px] font-black text-foreground uppercase tracking-widest">Market_Sync</span>
             </div>
        </div>
      </div>
    </div>
  );
};

export default function WhyAso() {
  return (
    <section id="whyaso" className="py-40 bg-background relative overflow-hidden">
      {/* Background unique elements */}
      <div className="absolute top-0 right-0 p-12 text-[10px] font-mono text-slate-800 hidden lg:block select-none font-bold opacity-30 dark:opacity-10">
         // RUNTIME_METRIC: 0x4F2A<br/>
         // HEURISTIC_MATCH: 98.2%
      </div>

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-xs font-black uppercase tracking-[0.4em] text-primary mb-8"
            >
              The Discovery Gap
            </motion.div>

            <h2 className="text-6xl md:text-8xl font-bold text-foreground mb-12 tracking-tighter leading-[0.85]">
              Struggling with <br />
              <span className="text-flux">Low Downloads?</span>
            </h2>

            <p className="text-2xl text-slate-600 dark:text-slate-400 font-medium leading-tight tracking-tight mb-10 max-w-xl">
              Many apps don’t fail because they are bad — they fail because they are not discoverable.
            </p>

            <div className="mb-16 p-6 rounded-3xl bg-primary/5 border border-primary/10 text-primary font-black uppercase tracking-widest text-sm italic">
              "Your competitors are already optimizing their apps"
            </div>

            <div className="space-y-6">
              {[
                { icon: Search, title: "Missing the right keywords", desc: "You're targeting terms with no volume or too much competition." },
                { icon: Zap, title: "Poor title & description", desc: "Your metadata isn't optimized for indexing or user conversion." },
                { icon: Signal, title: "Low search visibility", desc: "Your app is stuck in the search results basement where no one looks." },
                { icon: Activity, title: "No competitor strategy", desc: "You're guessing while your competitors use data-driven tactics." },
                { icon: Gauge, title: "Weak conversion rate", desc: "Even when users find you, your listing fails to convince them to download." }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 group">
                  <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-foreground/5 border border-foreground/10 flex items-center justify-center group-hover:border-primary/50 transition-colors duration-500">
                    <item.icon size={20} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="text-base font-black text-foreground uppercase tracking-tight mb-0.5">{item.title}</h4>
                    <p className="text-slate-500 font-medium text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
             <div className="neo-glass rounded-[4rem] p-6 bg-foreground/[0.01] border-foreground/5 relative">
                <ComputationGraph />
                
                <div className="grid grid-cols-1 gap-4 mt-8">
                    {signals.map((stat, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ x: 5 }}
                        className="p-8 rounded-[2rem] bg-background border border-foreground/5 flex items-center justify-between transition-all hover:bg-foreground/[0.02]"
                    >
                        <div>
                            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-600 mb-2">{stat.label}</div>
                            <div className="text-slate-600 dark:text-slate-400 text-sm font-bold">{stat.description}</div>
                        </div>
                        <div className={`text-4xl font-black tracking-tighter ${stat.color}`}>{stat.value}</div>
                    </motion.div>
                    ))}
                </div>
             </div>

             {/* Dynamic Accent */}
             <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-primary/5 rounded-full blur-[100px] -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
