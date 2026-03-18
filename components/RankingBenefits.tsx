"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, Search, Target, Zap, ChevronRight, CheckCircle2, ArrowRight, Lightbulb, Users, Globe2 } from "lucide-react";

const BenefitCard = ({ id, active, onClick, benefit }: { id: string; active: boolean; onClick: () => void; benefit: any }) => {
    return (
        <motion.div
            onClick={onClick}
            className={`relative p-8 rounded-[2.5rem] cursor-pointer transition-all duration-500 border ${active
                ? "bg-foreground/[0.03] border-primary/40 shadow-2xl dark:shadow-[0_0_40px_rgba(6,182,212,0.1)] shadow-primary/5"
                : "bg-foreground/[0.01] border-foreground/5 hover:border-foreground/10"
                }`}
        >
            <div className="flex items-start gap-6">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${active ? "bg-primary text-background" : "bg-foreground/5 text-slate-500 dark:text-slate-400"
                    }`}>
                    <benefit.icon size={28} />
                </div>
                <div className="flex-1">
                    <h3 className={`text-xl font-black uppercase tracking-tight mb-2 transition-colors ${active ? "text-foreground" : "text-slate-500"
                        }`}>
                        {benefit.title}
                    </h3>
                    <p className={`text-sm font-medium leading-relaxed transition-colors ${active ? "text-slate-600 dark:text-slate-300" : "text-slate-500 dark:text-slate-600"
                        }`}>
                        {benefit.description}
                    </p>
                </div>
                <div className={`transition-transform duration-500 ${active ? "rotate-90 text-primary" : "text-slate-300 dark:text-slate-800"}`}>
                    <ChevronRight size={24} />
                </div>
            </div>

            {active && (
                <motion.div
                    layoutId="activeGlow"
                    className="absolute inset-0 rounded-[2.5rem] bg-primary/5 blur-xl -z-10"
                />
            )}
        </motion.div>
    );
};

const SuccessMock = ({ benefit }: { benefit: any }) => {
    return (
        <div className="w-full h-full min-h-[400px] md:min-h-[550px] neo-glass bg-foreground/[0.01] border-foreground/10 rounded-3xl md:rounded-[3rem] p-6 md:p-10 flex flex-col items-center justify-between overflow-hidden relative shadow-2xl dark:shadow-none">
            <div className="absolute inset-0 data-grid opacity-[0.05]" />

            <AnimatePresence mode="wait">
                <motion.div
                    key={benefit.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.4 }}
                    className="w-full text-center relative z-10 py-6"
                >
                    <div className="mb-8 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-black text-primary uppercase tracking-[0.2em]">
                        Result_Proof: {benefit.metric}
                    </div>

                    {benefit.id === 'visibility' && (
                        <div className="space-y-10">
                            <div className="flex items-end justify-center gap-3 h-48">
                                {[20, 35, 25, 45, 40, 75, 70, 100].map((h, i) => (
                                    <div
                                        key={i}
                                        style={{ height: `${h}%` }}
                                        className={`w-10 rounded-t-xl transition-all duration-700 ${i === 7 ? "bg-primary shadow-xl shadow-primary/40" : "bg-foreground/10"}`}
                                    />
                                ))}
                            </div>
                            <div className="space-y-2">
                                <div className="text-5xl font-black text-foreground tracking-tighter italic">Position #1</div>
                                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Achieved in 14 Days</div>
                            </div>
                        </div>
                    )}

                    {benefit.id === 'keywords' && (
                        <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
                            {['Keyword Alpha', 'Keyword Beta', 'Keyword Gamma', 'Keyword Delta'].map((k, i) => (
                                <div key={i} className="p-6 rounded-3xl bg-foreground/5 border border-foreground/5 flex flex-col items-start gap-2 text-left">
                                    <span className="text-[10px] font-black text-slate-500 dark:text-slate-600 uppercase tracking-widest">Primary</span>
                                    <span className="text-sm font-bold text-foreground mb-2">{k}</span>
                                    <span className="text-xs font-black text-emerald-500 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">RANK #1</span>
                                </div>
                            ))}
                        </div>
                    )}

                    {benefit.id === 'conversion' && (
                        <div className="relative py-6">
                            <div className="w-56 h-56 rounded-full border-2 border-foreground/10 border-t-primary mx-auto flex flex-col items-center justify-center bg-foreground/[0.02]">
                                <TrendingUp className="text-primary mb-2" size={48} />
                                <div className="text-4xl font-black text-foreground">+420%</div>
                                <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Growth</div>
                            </div>
                            <div className="mt-10 text-xl font-bold text-slate-500 dark:text-slate-400">Conversion Optimization Mastery</div>
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>

            {/* Unique Message HUD */}
            <div className="w-full p-8 rounded-[2rem] bg-background/80 border border-foreground/10 backdrop-blur-xl relative z-20 shadow-2xl">
                <div className="flex items-center gap-3 text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-4">
                    <CheckCircle2 size={16} className="text-primary" />
                    Growth Engine Insight
                </div>
                <div className="text-base font-bold text-foreground leading-snug">
                    {benefit.message}
                </div>
            </div>
        </div>
    )
}

const benefits = [
    {
        id: "visibility",
        icon: Search,
        title: "Improve keyword rankings",
        description: "Move your app from deep pages to the top spots for high-volume keywords.",
        metric: "SEARCH_RANK_DOMINANCE",
        message: "Getting to #1 unlocks massive organic traffic which naturally lowers your customer acquisition costs by up to 80%.",
        tip: "Concentrate on 'low-difficulty high-volume' seeds for immediate impact."
    },
    {
        id: "keywords",
        icon: Target,
        title: "Increase visibility",
        description: "Ensure your app is seen by millions of users searching for similar category solutions.",
        metric: "VISIBILITY_LOCK",
        message: "Identify hidden opportunities that competitors miss. By owning these niche clusters, you build search authority.",
        tip: "Use long-tail clusters to build a foundational ranking."
    },
];

export default function RankingBenefits() {
    const [activeBenefit, setActiveBenefit] = useState(benefits[0]);

    return (
        <section id="benefits" className="py-20 md:py-40 bg-background relative overflow-hidden border-y border-foreground/5">
            {/* Background unique elements */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row-reverse gap-20 items-start">

                    {/* Right: Content Area */}
                    <div className="lg:w-1/2 flex flex-col gap-12">
                        <div className="space-y-8">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-foreground/5 border border-foreground/10 text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 dark:text-slate-400"
                            >
                                Growth Potential
                            </motion.div>
                            <h2 className="text-4xl md:text-[6.5rem] font-bold text-foreground tracking-tighter leading-[1] md:leading-[0.85]">
                                Push Your App Towards <br />
                                <span className="text-flux italic font-mono">1 Million Downloads.</span>
                            </h2>
                            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-500 font-medium leading-relaxed max-w-xl">
                                Our ASO framework is engineered to drive compound organic growth. By winning the search battle, you unlock a continuous stream of users.
                            </p>
                        </div>

                        <div className="space-y-4">
                            {benefits.map((benefit) => (
                                <BenefitCard
                                    key={benefit.id}
                                    id={benefit.id}
                                    active={activeBenefit.id === benefit.id}
                                    benefit={benefit}
                                    onClick={() => setActiveBenefit(benefit)}
                                />
                            ))}
                        </div>

                    </div>

                    {/* Left: Interactive Visualizer & CTA */}
                    <div className="lg:w-1/2 w-full sticky top-32 space-y-12">
                        <SuccessMock benefit={activeBenefit} />

                        <div className="flex flex-col gap-6 w-full">
                            {/* Feature Card 1 */}
                            <motion.div
                                whileHover={{ y: -5 }}
                                className="group relative p-8 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-[0_20px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.08)] transition-all duration-500 cursor-pointer"
                            >
                                <div className="flex items-center gap-6">
                                    <div className="w-16 h-16 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors duration-500">
                                        <Zap size={28} />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-xl font-black text-slate-800 dark:text-slate-200 tracking-tight uppercase mb-1">DRIVE ORGANIC DOWNLOADS</h4>
                                        <p className="text-sm font-medium text-slate-500 leading-relaxed">Convert impressions into loyal users with optimized store listing metadata.</p>
                                    </div>
                                    <ChevronRight size={20} className="text-slate-200 group-hover:text-primary group-hover:translate-x-1 transition-all duration-500" />
                                </div>
                            </motion.div>

                            {/* Feature Card 2 */}
                            <motion.div
                                whileHover={{ y: -5 }}
                                className="group relative p-8 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-[0_20px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.08)] transition-all duration-500 cursor-pointer"
                            >
                                <div className="flex items-center gap-6">
                                    <div className="w-16 h-16 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors duration-500">
                                        <TrendingUp size={28} />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-xl font-black text-slate-800 dark:text-slate-200 tracking-tight uppercase mb-1">COMPETE WITH TOP APPS</h4>
                                        <p className="text-sm font-medium text-slate-500 leading-relaxed">Directly challenge market leaders by out-optimizing their legacy strategies.</p>
                                    </div>
                                    <ChevronRight size={20} className="text-slate-200 group-hover:text-primary group-hover:translate-x-1 transition-all duration-500" />
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
