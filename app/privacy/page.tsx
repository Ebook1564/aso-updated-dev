"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Shield, Clock, AlertTriangle, FileText, Globe } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPolicy() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground transition-colors duration-500">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-primary transition-colors mb-12 group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              BACK_TO_HQ
            </Link>

            <div className="mb-16">
              <div className="text-xs font-black uppercase tracking-[0.5em] text-primary mb-6">
                Legal Protocol // v4.2
              </div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-none mb-8">
                Privacy Policy & <br />
                <span className="text-flux italic font-mono font-light">Professional Protocols.</span>
              </h1>
              <p className="text-xl text-slate-500 font-medium max-w-2xl">
                Last Updated: March 2026. Transparency is the foundation of our strategic methodology.
              </p>
            </div>

            <div className="space-y-16">
              {/* 01. Privacy */}
              <section className="relative p-8 md:p-12 rounded-[2.5rem] bg-foreground/[0.01] border border-foreground/5 overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
                  <Shield size={120} />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                      <Shield size={24} />
                    </div>
                    <h2 className="text-2xl font-black uppercase tracking-tight">01. Neural Data Integrity</h2>
                  </div>
                  <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                    At OPTIAPP, we treat your app data with the same precision we apply to our ranking algorithms. 
                    We do not sell, trade, or compromise your strategic information. All data processed through our discovery 
                    engine is used exclusively to fuel your growth engine and refine your market positioning.
                  </p>
                </div>
              </section>

              {/* 02. Security */}
              <section className="relative p-8 md:p-12 rounded-[2.5rem] bg-foreground/[0.01] border border-foreground/5">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary border border-secondary/20">
                    <Globe size={24} />
                  </div>
                  <h2 className="text-2xl font-black uppercase tracking-tight">02. Security & Encryption</h2>
                </div>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                  Our infrastructure utilizes multi-layered encryption protocols to ensure that your metadata, 
                  keyword strategy maps, and competitive insights remain strictly confidential. 
                  We operate under a "Privacy by Design" framework, ensuring security is baked into every optimization cycle.
                </p>
              </section>

              {/* 03. No Refund Policy */}
              <section className="relative p-8 md:p-12 rounded-[2.5rem] bg-primary/[0.03] border border-primary/20 shadow-2xl shadow-primary/5">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-[60px]" />
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/30">
                      <AlertTriangle size={24} />
                    </div>
                    <h2 className="text-2xl font-black uppercase tracking-tight text-foreground">03. Strategic Commitment (No Refund Policy)</h2>
                  </div>
                  <div className="p-6 md:p-8 rounded-3xl bg-primary/5 border border-primary/10 mb-8">
                    <p className="text-xl font-bold text-primary mb-4 uppercase tracking-widest italic">Important Protocol:</p>
                    <p className="text-2xl font-black text-foreground tracking-tight leading-tight uppercase">
                      WE DO NOT OFFER REFUNDS. ALL SALES ARE FINAL.
                    </p>
                  </div>
                  <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                    Our ASO services involve intensive manual analysis, expert research, and proprietary 
                    algorithmic implementation from the moment an order is initiated. Due to the high-value 
                    intellectual nature of our services and the immediate allocation of expert resources, 
                    we do not provide reversals or refunds once a project has commenced. We are fully 
                    committed to your success and will ensure our deliverables meet the highest professional standards.
                  </p>
                </div>
              </section>

              {/* 04. Compliance */}
              <section className="relative p-8 md:p-12 rounded-[2.5rem] bg-foreground/[0.01] border border-foreground/5">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent border border-accent/20">
                    <FileText size={24} />
                  </div>
                  <h2 className="text-2xl font-black uppercase tracking-tight">04. Global Compliance</h2>
                </div>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                  We strictly adhere to international data protection standards and guidelines. 
                  Our ASO methodologies are engineered to be 100% compliant with both the Google Play Store 
                  and Apple App Store ecosystem policies, protecting your app's longevity and reputation.
                </p>
              </section>
            </div>

            <div className="mt-24 pt-12 border-t border-foreground/5 text-center">
              <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-8">
                Questions regarding our legal protocol?
              </p>
              <a 
                href="mailto:contact@taraapplications.com" 
                className="inline-flex items-center justify-center px-10 py-5 rounded-full bg-foreground text-background font-black uppercase tracking-widest hover:bg-primary transition-all shadow-xl"
              >
                CONTACT_LEGAL_DESK
              </a>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
