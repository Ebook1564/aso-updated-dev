"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Database, Terminal, Send, Play, ArrowRight, CheckCircle2, Cpu, Activity } from "lucide-react";

const stages = [
  {
    id: "01",
    icon: Send,
    title: "Submit App Link",
    description: "Provide your public store link to initiate our deep-crawl audit protocol.",
    status: "INPUT_READY",
    color: "from-blue-500/20 to-primary/20",
    shadow: "shadow-primary/10",
  },
  {
    id: "02",
    icon: Cpu,
    title: "Analyze & Research",
    description: "Our experts and algorithms analyze your category and reverse-engineer competitors.",
    status: "PROCESSING",
    color: "from-primary/20 to-secondary/20",
    shadow: "shadow-secondary/10",
  },
  {
    id: "03",
    icon: Database,
    title: "Receive Report",
    description: "Get a comprehensive ASO report with exact metadata and keyword recommendations.",
    status: "DELIVERY",
    color: "from-secondary/20 to-accent/20",
    shadow: "shadow-accent/10",
  },
  {
    id: "04",
    icon: Play,
    title: "Apply & Grow",
    description: "Update your store listing with our recommendations and watch your downloads soar.",
    status: "EXECUTION",
    color: "from-accent/20 to-emerald-500/20",
    shadow: "shadow-emerald-500/10",
  },
];

const PipelineNode = ({ stage, index, isActive, onHover }: { stage: any; index: number; isActive: boolean; onHover: (id: string | null) => void }) => {
  return (
    <div 
        onMouseEnter={() => onHover(stage.id)}
        onMouseLeave={() => onHover(null)}
        className="relative flex-1 group"
    >
        {/* Connection Link (Visual Only) */}
        {index < stages.length - 1 && (
            <div className="hidden lg:block absolute top-[100px] -right-4 w-8 h-px bg-gradient-to-r from-foreground/10 to-transparent z-0" />
        )}

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.8 }}
            className={`relative z-10 p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] backdrop-blur-3xl border transition-all duration-700 ease-[0.16, 1, 0.3, 1] group/node ${
                isActive 
                ? "border-primary/50 bg-foreground/[0.04] -translate-y-6 shadow-[0_40px_80px_-15px_rgba(var(--primary-rgb),0.2)]" 
                : "border-foreground/5 bg-foreground/[0.01] hover:border-foreground/10"
            }`}
        >
            {/* Subtle Inner Glow */}
            <div className={`absolute inset-0 rounded-[inherit] bg-gradient-to-br ${stage.color} opacity-0 group-hover/node:opacity-5 transition-opacity duration-700`} />

            <div className={`mb-12 w-24 h-24 rounded-[2rem] bg-gradient-to-br ${stage.color} flex items-center justify-center text-white border border-white/10 shadow-2xl relative overflow-hidden group-hover/node:scale-110 transition-transform duration-700`}>
                <div className="absolute inset-0 bg-white opacity-0 group-hover/node:opacity-20 transition-opacity" />
                <stage.icon size={42} strokeWidth={1} className="relative z-10" />
            </div>

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-slate-500 dark:text-slate-600 uppercase tracking-[0.5em] font-mono">STEP_{stage.id}</span>
                    <div className={`flex items-center gap-2 px-3 py-1 rounded-full border border-foreground/5 bg-foreground/5 text-[8px] font-black uppercase tracking-widest ${isActive ? 'text-primary' : 'text-slate-500/50'}`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-primary animate-ping' : 'bg-slate-300 dark:bg-slate-800'}`} />
                        {stage.status}
                    </div>
                </div>
                
                <h3 className="text-3xl font-black text-foreground tracking-tighter uppercase leading-[0.9]">{stage.title}</h3>
                <p className="text-sm font-medium text-slate-500 leading-relaxed min-h-[60px] transition-colors group-hover/node:text-slate-600 dark:group-hover/node:text-slate-400">
                    {stage.description}
                </p>

                <div className="pt-8 border-t border-foreground/5 flex items-center justify-between">
                    <div className="flex -space-x-3">
                         {[1,2,3].map(i => (
                            <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[10px] font-black text-foreground shadow-sm">
                                {String.fromCharCode(64 + i)}
                            </div>
                         ))}
                    </div>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border border-foreground/5 transition-all duration-700 ${isActive ? 'bg-primary text-background border-primary translate-x-1' : 'text-slate-300 dark:text-slate-700'}`}>
                        <ArrowRight size={20} strokeWidth={3} />
                    </div>
                </div>
            </div>

            {/* Stage ID Float - More subtle */}
            <div className="absolute top-12 right-12 text-8xl font-black text-foreground/[0.03] pointer-events-none select-none tracking-tighter group-hover/node:scale-110 transition-transform duration-700">
                {stage.id}
            </div>
        </motion.div>
    </div>
  );
};

export default function Process() {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <section id="process" className="pt-20 md:pt-32 pb-10 md:pb-20 bg-background relative overflow-hidden border-y border-foreground/5">
      {/* Unique Deep Background Glows */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[250px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[200px] pointer-events-none" />
      
      {/* Background Neural Network (Static) */}
      <div className="absolute inset-0 data-grid opacity-[0.05] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-end justify-between mb-20 gap-12">
            <div className="max-w-3xl">
                    <div className="text-xs font-black uppercase tracking-[0.6em] text-primary mb-4">
                        Operational Loop
                    </div>
                <h2 className="text-4xl md:text-[6.5rem] font-bold text-foreground tracking-tighter leading-[0.85] mb-8">
                    How it <span className="text-flux italic font-mono">Works.</span>
                </h2>
                <p className="text-xl text-slate-600 dark:text-slate-500 font-medium max-w-xl leading-relaxed">
                    A simple 4-step process to transform your app's search visibility and download velocity.
                </p>
            </div>

        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-stretch pt-10 relative">
            {/* Visual Pipe Connector (Large Desktop) - Adjusted position */}
            <div className="hidden lg:block absolute top-[100px] left-10 right-10 h-px bg-foreground/5 -z-10" />

            {stages.map((stage, i) => (
                <PipelineNode 
                    key={i} 
                    stage={stage} 
                    index={i} 
                    isActive={activeId === stage.id}
                    onHover={setActiveId}
                />
            ))}
        </div>

      </div>
    </section>
  );
}
