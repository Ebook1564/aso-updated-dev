"use client";

import { motion } from "framer-motion";
import MagneticButton from "./MagneticButton";
import { Check, ShieldCheck, Activity, Zap } from "lucide-react";
import Link from "next/link";

const tiers = [
  {
    name: "Essential_ASO_Package",
    price: "$10",
    period: "/app",
    features: [
      "Manual Deep App Analysis", 
      "Premium Keyword Research", 
      "Store Title Optimization", 
      "Metadata Strategy Sharding",
      "Competitive Power Mapping",
      "Algorithmic Risk Check"
    ],
    button: "Get ASO for My App",
    popular: true,
  }
];

export default function Pricing() {
  return (
    <section id="pricing" className="pt-20 md:pt-40 pb-10 md:pb-20 bg-background relative overflow-hidden">
      {/* Dynamic Grid Overlay */}
      <div className="absolute inset-0 data-grid opacity-[0.05] -z-10" />

      <div className="container mx-auto px-6 text-center">
        <div className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-xs font-black uppercase tracking-[0.4em] text-primary mb-6"
          >
            Fixed Access Fee
          </motion.div>
          <h2 className="text-4xl md:text-[6.5rem] font-bold text-foreground tracking-tighter leading-none">
            Scale with <br />
            <span className="text-flux italic font-mono font-light">Zero Complexity.</span>
          </h2>
          <p className="text-xl md:text-2xl text-slate-500 font-medium mt-10 max-w-2xl mx-auto leading-relaxed">
             No monthly commitments. No hidden fees. 
             Just <span className="text-foreground font-black"> $10 per app</span> for full-scale expert optimization.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {tiers.map((tier, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative p-10 md:p-14 rounded-[3rem] neo-glass border-primary/20 bg-foreground/[0.01] overflow-hidden group shadow-2xl"
            >
              {/* Refined Background Accents */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
              <div className="absolute -top-20 -right-20 w-48 h-48 bg-primary/5 rounded-full blur-[80px]" />
              
              <div className="relative z-10 flex flex-col items-center">
                <div className="flex items-center gap-3 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/20 text-primary text-[9px] font-black uppercase tracking-[0.3em] mb-10">
                    <Zap size={10} className="fill-primary" />
                    Special Launch Offer
                </div>

                <div className="text-center mb-10">
                  <h3 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-4 lowercase">
                    essential<span className="text-primary italic font-mono font-light">_aso</span>
                  </h3>
                  <p className="text-slate-500 font-medium text-sm max-w-sm mx-auto leading-relaxed">
                    Complete listing overhaul built to maximize your app's organic discoverability.
                  </p>
                </div>

                {/* Compact Price */}
                <div className="mb-12 flex flex-col items-center">
                    <div className="flex items-start">
                        <span className="text-xl font-black text-primary mt-2 mr-1">$</span>
                        <span className="text-8xl md:text-9xl font-bold text-foreground leading-none tracking-tighter">10</span>
                    </div>
                    <div className="mt-4 px-4 py-1 rounded-lg bg-foreground/5 border border-foreground/5">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">One-Time Fee / App</span>
                    </div>
                </div>

                {/* Unified Features List */}
                <div className="w-full max-w-lg grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 mb-12 py-8 border-y border-foreground/5">
                   {tier.features.map((feature, j) => (
                      <div key={j} className="flex items-center gap-3">
                         <div className="flex-shrink-0 w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Check size={12} className="text-primary" strokeWidth={4} />
                         </div>
                         <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
                            {feature}
                         </span>
                      </div>
                   ))}
                </div>

                <div className="w-full max-w-sm space-y-6">
                    <Link href="/auth" className="block w-full">
                        <MagneticButton>
                            <button className="w-full py-6 rounded-[2rem] bg-primary text-white shadow-xl shadow-primary/20 font-black text-[11px] uppercase tracking-[0.3em] hover:scale-[1.02] active:scale-[0.98] transition-all overflow-hidden relative group/btn">
                                <span className="relative z-10">{tier.button}</span>
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
                            </button>
                        </MagneticButton>
                    </Link>

                    <div className="flex items-center justify-center gap-6 text-[9px] font-black text-slate-500 uppercase tracking-widest">
                        <div className="flex items-center gap-1.5 grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all">
                           <ShieldCheck size={12} className="text-primary" />
                           Protected
                        </div>
                        <div className="w-1 h-1 rounded-full bg-foreground/10" />
                        <div className="flex items-center gap-1.5 text-emerald-500/70 group-hover:text-emerald-500 transition-all">
                           <Activity size={12} />
                           Live_Sync
                        </div>
                    </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
