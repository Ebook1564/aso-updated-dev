"use client";

import React from "react";
import { motion } from "framer-motion";
import { Search, TrendingUp, BarChart3, Globe, Zap, ArrowUpRight } from "lucide-react";

export default function DashboardPreview() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-bold mb-4 text-foreground"
          >
            Insights that Drive <span className="text-gradient">Growth</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-foreground/60 max-w-2xl mx-auto font-medium"
          >
            Don't fly blind. Our interactive dashboard gives you a bird's eye view of your app's performance and identifies instant optimization opportunities.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative glass-card border-foreground/10 overflow-hidden shadow-2xl dark:shadow-none"
        >
          {/* Dashboard Header */}
          <div className="border-b border-foreground/5 bg-foreground/5 p-4 flex items-center justify-between">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/50" />
            </div>
            <div className="bg-background px-4 py-1 rounded-md text-xs font-mono text-foreground/40 border border-foreground/5">
              optiapp.io/dashboard/analytics
            </div>
            <div className="w-16" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 min-h-[500px]">
            {/* Sidebar */}
            <div className="hidden lg:flex flex-col border-r border-foreground/5 p-6 gap-6 bg-foreground/[0.02]">
              {[
                { icon: BarChart3, label: "Analytics", active: true },
                { icon: Search, label: "Keyword Hub" },
                { icon: Globe, label: "Localization" },
                { icon: TrendingUp, label: "Competitors" },
                { icon: Zap, label: "Smart Audit" },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className={`flex items-center gap-3 text-sm font-bold transition-colors cursor-pointer ${item.active ? 'text-primary' : 'text-slate-500 dark:text-slate-600 hover:text-foreground'}`}>
                    <Icon size={18} />
                    {item.label}
                  </div>
                );
              })}
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3 p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {[
                  { label: "Visits", value: "24.5k", trend: "+12%" },
                  { label: "Conversion", value: "18.2%", trend: "+5.4%" },
                  { label: "Rank (Avg)", value: "#4.2", trend: "↑ 2" },
                ].map((stat, i) => (
                  <div key={i} className="bg-foreground/5 border border-foreground/10 rounded-xl p-6">
                    <div className="text-xs text-slate-500 dark:text-slate-600 font-bold uppercase tracking-wider mb-2">{stat.label}</div>
                    <div className="flex items-end gap-3">
                      <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                      <div className="text-xs text-emerald-500 font-bold mb-1">{stat.trend}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Fake Graph Mockup */}
              <div className="bg-foreground/5 border border-foreground/10 rounded-xl p-8 mb-8 relative h-64 flex items-end justify-between gap-2 overflow-hidden">
                <div className="absolute top-6 left-8 text-sm font-bold text-foreground opacity-60">Visibility Trend (Last 30 Days)</div>
                {[40, 60, 45, 70, 85, 60, 95, 80, 100].map((h, i) => (
                  <motion.div 
                    key={i}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${h}%` }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                    className="flex-1 bg-gradient-to-t from-primary/20 to-primary rounded-t-sm"
                  />
                ))}
              </div>

              {/* Table Mockup */}
              <div className="bg-foreground/5 border border-foreground/10 rounded-xl overflow-hidden">
                <div className="p-4 border-b border-foreground/10 text-sm font-bold text-foreground opacity-60 flex justify-between">
                  <span>Top Performing Keywords</span>
                  <ArrowUpRight size={16} />
                </div>
                <div className="p-4 space-y-4">
                  {[
                    { term: "fitness tracker", volume: "High", difficulty: "Medium", rank: "#1" },
                    { term: "workout planner", volume: "High", difficulty: "High", rank: "#3" },
                    { term: "yoga for beginners", volume: "Medium", difficulty: "Low", rank: "#2" },
                  ].map((kw, i) => (
                    <div key={i} className="flex items-center justify-between text-xs border-b border-foreground/5 pb-2 last:border-0 last:pb-0">
                      <span className="font-bold text-foreground/80">{kw.term}</span>
                      <div className="flex gap-4">
                        <span className="text-slate-500 dark:text-slate-600 font-medium">{kw.volume}</span>
                        <span className="text-primary font-black">{kw.rank}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
    </section>
  );
}
