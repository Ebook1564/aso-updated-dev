"use client";

import { motion } from "framer-motion";
import MagneticButton from "./MagneticButton";
import { ArrowRight, Cpu } from "lucide-react";
import Link from "next/link";

export default function CtaSection() {
  return (
    <section id="cta" className="pt-10 md:pt-20 pb-20 md:pb-32 bg-background relative overflow-hidden">
      {/* Dynamic Background Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[600px] bg-primary/10 rounded-full blur-[160px] -z-10 animate-data-flux" />

      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl md:rounded-[4rem] border border-foreground/5 bg-foreground/[0.01] p-8 md:p-32 text-center backdrop-blur-3xl overflow-hidden shadow-2xl dark:shadow-none"
        >
          {/* Unique Corner Badge */}
          <div className="absolute top-0 right-0 p-12 hidden lg:block">
             <Cpu size={40} className="text-primary opacity-20" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-xs font-black uppercase tracking-[0.5em] text-slate-500 mb-10"
          >
            Terminal Access Request
          </motion.div>
          
          <h2 className="text-4xl md:text-[7.5rem] font-bold mb-12 tracking-tighter leading-[1] md:leading-[0.8] text-foreground">
            Don't Wait. <br /><span className="text-flux">Grow</span> Now.
          </h2>
          
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 mb-16 max-w-3xl mx-auto leading-relaxed font-medium">
             Your competitors are already optimizing. Secure your spot at the top of the search results for just $10.
          </p>

          <div className="flex items-center justify-center">
            <Link href="/auth" className="w-full sm:w-auto">
              <MagneticButton>
                <button className="w-full sm:w-auto px-10 md:px-16 py-5 md:py-6 rounded-2xl md:rounded-3xl bg-primary text-background font-black text-lg md:text-xl hover:scale-105 transition-all shadow-xl dark:shadow-[0_0_60px_rgba(6,182,212,0.3)] shadow-primary/20 flex items-center justify-center gap-3">
                  Optimize My App Now
                  <ArrowRight size={24} strokeWidth={3} />
                </button>
              </MagneticButton>
            </Link>
          </div>
          
        </motion.div>
      </div>
    </section>
  );
}
