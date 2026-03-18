"use client";

import React from "react";
import { motion } from "framer-motion";
import { Search, Shield, Zap, Globe, BarChart3, Fingerprint, Activity, Target } from "lucide-react";

const MatrixPod = ({ pod, index }: { pod: any; index: number }) => {
  const Icon = pod.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ y: -5 }}
      className="relative min-h-[20rem] md:h-80 w-full rounded-3xl md:rounded-[2rem] neo-glass border-foreground/5 p-6 md:p-10 bg-foreground/[0.01] hover:bg-foreground/[0.03] hover:border-primary/20 transition-all group overflow-hidden shadow-xl dark:shadow-none"
    >
      <div className="h-full flex flex-col">
        <div className={`mb-10 w-14 h-14 rounded-2xl flex items-center justify-center ${pod.bg} ${pod.color} border border-foreground/5`}>
          <Icon size={28} strokeWidth={2} />
        </div>

        <div className="mt-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl md:text-2xl font-black text-foreground tracking-tighter uppercase">{pod.title}</h3>
            <div className="text-[9px] font-black text-primary/60 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 uppercase tracking-widest">
              {pod.stat}
            </div>
          </div>
          <p className="text-slate-500 font-medium leading-relaxed text-sm group-hover:text-slate-600 dark:group-hover:text-slate-400 transition-colors">
            {pod.description}
          </p>
        </div>
      </div>

      {/* Subtle Background Accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
};

const pods = [
  {
    title: "Manual_Analysis",
    description: "Expert human review of your app listing to find hidden growth opportunities.",
    icon: Search,
    color: "text-primary",
    bg: "bg-primary/10",
    stat: "EXPERT_REVIEW",
  },
  {
    title: "ASO_Testing",
    description: "Automated testing of variations to see which keywords drive the most installs.",
    icon: Activity,
    color: "text-secondary",
    bg: "bg-secondary/10",
    stat: "A/B_CORE",
  },
  {
    title: "Title_Optimization",
    description: "Strategically placing high-volume keywords in your title for maximum indexing.",
    icon: Zap,
    color: "text-accent",
    bg: "bg-accent/10",
    stat: "INDEX_MAX",
  },
  {
    title: "Description_ASO",
    description: "Crafting a fully optimized description that satisfies both algorithms and users.",
    icon: Fingerprint,
    color: "text-emerald-500 dark:text-emerald-400",
    bg: "bg-emerald-500/10 dark:bg-emerald-400/10",
    stat: "CONVERSION_X",
  },
  {
    title: "Icon_Refinement",
    description: "Psychological analysis and suggestions for your app icon to boost CTR.",
    icon: Globe,
    color: "text-amber-500 dark:text-amber-400",
    bg: "bg-amber-500/10 dark:bg-amber-400/10",
    stat: "VISUAL_WIN",
  },
  {
    title: "Custom_Research",
    description: "Bespoke keyword research tailored specifically to your app's unique value.",
    icon: Target,
    color: "text-foreground",
    bg: "bg-foreground/10",
    stat: "DATA_DRIVEN",
  },
  {
    title: "Competitor_X",
    description: "Full competitive analysis to see how you stack up against the market leaders.",
    icon: BarChart3,
    color: "text-primary",
    bg: "bg-primary/10",
    stat: "MARKET_SYNC",
  },
  {
    title: "Reversed_Keywords",
    description: "Reverse-engineering competitor keywords to find what drives their downloads.",
    icon: Search,
    color: "text-secondary",
    bg: "bg-secondary/10",
    stat: "REVERSE_OPS",
  },
  {
    title: "Strategy_Auth",
    description: "A complete roadmap for your app's growth with updates every 15 days.",
    icon: Activity,
    color: "text-accent",
    bg: "bg-accent/10",
    stat: "LIFECYCLE",
  },
];

export default function Features() {
  return (
    <section id="features" className="pt-20 md:pt-32 pb-10 md:pb-20 relative overflow-hidden bg-background">
      {/* Perspective Grid Background */}
      <div className="absolute inset-0 data-grid opacity-[0.03] -z-10" />

      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-end justify-between mb-16 gap-12">
          <div className="max-w-5xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-xs font-black uppercase tracking-[0.5em] text-primary mb-4"
            >
              Organic Growth Engine
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-[6rem] font-bold text-foreground leading-[0.85] tracking-tighter"
            >
              Grow Your App Organically with <span className="text-flux">Data-Driven Optimization.</span>
            </motion.h2>
            <motion.p 
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               className="text-xl md:text-2xl text-slate-500 font-medium mt-4 max-w-2xl"
            >
               We help your app get discovered by the right users through smart App Store Optimization.
            </motion.p>
          </div>
          
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pods.map((pod, index) => (
            <MatrixPod key={index} pod={pod} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
