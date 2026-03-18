"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, MessageSquare, ShieldCheck, Zap, Globe2, ArrowUpRight } from "lucide-react";

const faqs = [
  {
    question: "How fast can I see ranking changes?",
    answer: "Our advanced optimization engine propagates metadata updates within 5-15 minutes. While store indexes vary, most position shifts are detectable within 12-48 hours of deployment.",
    tag: "VELOCITY",
  },
  {
    question: "Is keyword optimization safe for my app?",
    answer: "Absolutely. We strictly adhere to Play Store and App Store compliance protocols. Our specialized logic ensures high-relevance density without over-optimization risk.",
    tag: "SAFETY",
  },
  {
    question: "Do you support all global regions?",
    answer: "Yes. We offer localized keyword dominance strategies for 190+ regions, utilizing native linguistic data to capture high-value local search volume.",
    tag: "GLOBAL",
  },
  {
    question: "How do you handle competitive keywords?",
    answer: "We employ advanced growth modeling to identify 'Gap Opportunities' and long-tail clusters, building a foundation of authority before tackling high-volume head terms.",
    tag: "STRATEGY",
  },
];

const SidebarItem = ({ icon: Icon, title, value }: { icon: any; title: string; value: string }) => (
    <div className="p-6 rounded-3xl bg-foreground/[0.02] border border-foreground/5 flex flex-col gap-2">
        <div className="flex items-center gap-3 text-slate-500 mb-2">
            <Icon size={18} className="text-primary" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">{title}</span>
        </div>
        <div className="text-lg font-bold text-foreground tracking-tight">{value}</div>
    </div>
);

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="pt-10 md:pt-20 pb-10 md:pb-20 bg-background relative overflow-hidden border-t border-foreground/5">
      {/* Unique Intelligence Layer Background */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute top-1/2 right-0 w-[1000px] h-[1000px] bg-primary/5 rounded-full blur-[300px] pointer-events-none" />
      <div className="absolute -bottom-1/4 -left-1/4 w-[800px] h-[800px] bg-secondary/10 rounded-full blur-[250px] pointer-events-none" />
      
      {/* Background Micro-Texture */}
      <div className="absolute inset-0 data-grid opacity-[0.03] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-24 md:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-xs font-black uppercase tracking-[0.6em] text-primary mb-8"
          >
            Insights & Intelligence
          </motion.div>
          <h2 className="text-5xl md:text-8xl font-bold text-foreground tracking-tighter leading-[0.9] mb-12">
            Common <br className="hidden md:block" />
            <span className="text-flux italic font-mono font-light">Questions.</span>
          </h2>
          <p className="text-xl md:text-2xl text-slate-500 font-medium leading-relaxed">
            Everything you need to know about scaling your app's organic reach.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {faqs.map((faq, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`group relative rounded-[2.5rem] md:rounded-[3rem] border transition-all duration-700 overflow-hidden ${
                openIndex === i 
                  ? 'bg-foreground/[0.04] border-primary/40 shadow-2xl dark:shadow-[0_40px_80px_rgba(0,0,0,0.5)]' 
                  : 'bg-foreground/[0.01] border-foreground/5 hover:border-foreground/10'
              }`}
            >
              <button
                className="w-full min-h-[120px] md:min-h-[160px] px-8 md:px-14 text-left flex items-center justify-between gap-8"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <div className="flex-1">
                  <span className={`text-xl md:text-4xl font-bold tracking-tight transition-all duration-500 leading-tight block ${openIndex === i ? 'text-foreground' : 'text-slate-500 dark:text-slate-400 group-hover:text-foreground'}`}>
                    {faq.question}
                  </span>
                </div>
                <div className={`w-12 h-12 md:w-16 md:h-16 shrink-0 rounded-2xl border flex items-center justify-center transition-all duration-700 ${openIndex === i ? 'bg-primary text-background border-primary rotate-180 shadow-lg shadow-primary/20' : 'bg-foreground/5 border-foreground/5 text-slate-400 dark:text-slate-600'}`}>
                  {openIndex === i ? <Minus size={24} strokeWidth={3} /> : <Plus size={24} strokeWidth={3} />}
                </div>
              </button>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="px-8 md:px-14 pb-12 md:pb-16 flex flex-col md:flex-row gap-8 items-start">
                      <div className="w-16 h-px bg-primary/40 mt-4 hidden md:block" />
                      <div className="flex-1 space-y-8">
                        <div className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 font-medium leading-relaxed max-w-2xl">
                          {faq.answer}
                        </div>
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-[10px] font-black text-primary uppercase tracking-widest">
                          Expert_Consult // {faq.tag}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}
