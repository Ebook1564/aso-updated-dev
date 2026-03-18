"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, Globe, Mail, Phone, User, Link as LinkIcon, Send, Sparkles, Shield, Zap, TrendingUp, Clock, Check, BarChart3, Search, Smartphone } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { submitForm, checkFormStatus } from "@/app/get-started/actions";
import { useSession } from "next-auth/react";

export default function GetStarted() {
    const { data: session } = useSession();
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        country: "",
        appUrl: "",
    });
    const [isPending, setIsPending] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (session?.user?.email) {
            setFormData(prev => ({
                ...prev,
                email: session.user?.email || prev.email,
                name: session.user?.name || prev.name
            }));

            const verifyStatus = async () => {
                console.log("TACTICAL: Verifying onboarding status for", session.user?.email);
                const res = await checkFormStatus(session.user!.email!);
                if (res.success && res.status === 1) {
                    const submissionId = res.id || "";
                    console.log("TACTICAL: Operative already onboarded. Redirecting directly to Dashboard.");
                    window.location.href = `/v1/api/userdashboard/?id=${submissionId}`;
                }
            };
            verifyStatus();
        }
    }, [session]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsPending(true);
        setErrorMessage("");

        try {
            const result = await submitForm({
                name: formData.name,
                email: formData.email,
                phonenumber: formData.phone,
                country: formData.country,
                appurl: formData.appUrl,
            });

            if (result.success) {
                setSubmitted(true);
                // Attach the ID to the DOM for the user to click when ready
                (window as any).__tactical_dashboard_id = result.id;
            } else {
                setErrorMessage(result.message || "Enrollment protocol failed.");
            }
        } catch (error) {
            setErrorMessage("Connection to tactical backend refused. Verify service status.");
        } finally {
            setIsPending(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="flex flex-col min-h-screen bg-background selection:bg-primary/20 transition-colors duration-500">
            <Navbar />

            <main className="flex-1">
                {/* HERO SECTION: Theme-Aware Strategic Hub */}
                <section className="relative pt-40 pb-24 px-6 overflow-hidden text-center">
                    {/* PREMIUM BACKGROUND SYSTEM */}
                    <div className="absolute inset-0 pointer-events-none">
                        {/* 1. Animated Mesh Gradients */}
                        <div className="absolute inset-0 overflow-hidden opacity-30 dark:opacity-20 transition-opacity duration-1000">
                            <motion.div 
                                animate={{ 
                                    scale: [1, 1.2, 1],
                                    x: [-20, 20, -20],
                                    y: [-10, 10, -10]
                                }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-[radial-gradient(circle,var(--primary-glow),transparent_70%)] blur-[100px]" 
                            />
                            <motion.div 
                                animate={{ 
                                    scale: [1.2, 1, 1.2],
                                    x: [20, -20, 20],
                                    y: [10, -10, 10]
                                }}
                                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                                className="absolute top-[10%] -right-[10%] w-[50%] h-[50%] bg-[radial-gradient(circle,var(--secondary),transparent_70%)] blur-[80px]" 
                            />
                            <motion.div 
                                animate={{ 
                                    scale: [1, 1.1, 1],
                                    y: [20, -20, 20]
                                }}
                                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                                className="absolute -bottom-[20%] left-[20%] w-[70%] h-[70%] bg-[radial-gradient(circle,var(--accent),transparent_70%)] opacity-20 blur-[120px]" 
                            />
                        </div>

                        {/* 2. Grain/Noise Texture Overlay */}
                        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none mix-blend-overlay" 
                             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
                        />

                        {/* 3. Floating Abstract Glass Elements */}
                        <div className="absolute inset-0 overflow-hidden hidden md:block">
                            {[...Array(5)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 100 }}
                                    animate={{ 
                                        opacity: [0, 0.5, 0],
                                        y: [-20, -150],
                                        x: i % 2 === 0 ? [0, 50, -50] : [0, -50, 50],
                                        rotate: [0, 180]
                                    }}
                                    transition={{ 
                                        duration: 15 + i * 2, 
                                        repeat: Infinity, 
                                        delay: i * 3,
                                        ease: "easeInOut"
                                    }}
                                    className="absolute w-24 h-24 rounded-3xl border border-white/10 dark:border-white/5 bg-white/5 dark:bg-white/[0.02] backdrop-blur-[2px]"
                                    style={{ 
                                        left: `${15 + i * 20}%`,
                                        bottom: "-10%"
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-5xl mx-auto space-y-7 relative z-10"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                            <span className="relative flex h-1.5 w-1.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary"></span>
                            </span>
                            ASO Keyword Dominance
                        </div>
                        <h1 className="text-4xl md:text-7xl font-black text-foreground tracking-tighter leading-[1] md:leading-[0.95]">
                            Rank Higher. <br />
                            <span className="text-flux italic">Convert Faster.</span>
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
                            Deploy unique high-intent keywords to dominate search results on the <span className="text-foreground font-bold">App Store</span> and <span className="text-foreground font-bold">Google Play</span>.
                        </p>
                    </motion.div>
                </section>

                {/* CONTENT SECTION: Theme-Aware Refined Base */}
                <section className="py-20 md:py-32 px-6 relative z-10 transition-colors duration-500 bg-slate-100/30 dark:bg-slate-900/40 border-t border-foreground/5 dark:border-white/5">
                    <div className="max-w-[1400px] mx-auto grid lg:grid-cols-12 gap-16 lg:gap-24 items-start">
                        {/* Left: Content Card (5 Columns) */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="lg:col-span-5 space-y-12"
                        >
                            <div className="space-y-6">
                                <div className="space-y-3">
                                    <h2 className="text-4xl font-black text-foreground tracking-tighter leading-tight uppercase flex flex-col items-start gap-3">
                                        <span className="opacity-80">Optimization</span>
                                        <span className="bg-primary/10 text-primary px-5 py-1.5 rounded-2xl italic text-2xl border border-primary/20 shadow-[0_10px_30px_rgba(var(--primary-rgb),0.1)]">
                                            Protocol 01
                                        </span>
                                    </h2>
                                </div>
                                <div className="h-1 w-20 bg-primary/30 rounded-full" />
                                <p className="text-slate-500 font-medium text-lg leading-relaxed">
                                    Initialize your specialized keyword audit. Our protocol identifies <span className="text-foreground font-bold italic">proprietary ranking opportunities</span> tailored specifically to your app's metadata ecosystem.
                                </p>
                            </div>

                            <div className="space-y-10">
                                <AsoBenefit
                                    icon={Zap}
                                    title="Hi-Intent Discovery"
                                    desc="Target keywords that actually convert, not just those with high volume."
                                />
                                <AsoBenefit
                                    icon={Shield}
                                    title="Ranking Propagation"
                                    desc="Algorithm-aware strategy to ensure your app stays at the top."
                                />
                                <AsoBenefit
                                    icon={Search}
                                    title="Metadata Synergy"
                                    desc="Synchronizing your app title, subtitle, and description for maximum impact."
                                />
                            </div>

                            {/* Relocated Operational Status Card - Themed */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="bg-foreground rounded-[2rem] p-8 flex items-center justify-between shadow-2xl max-w-md group border border-foreground/5 dark:border-white/5"
                            >
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] font-black text-primary uppercase tracking-widest">Protocol Status</span>
                                        <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                                    </div>
                                    <h4 className="text-2xl font-black text-background">Rapid Deployment</h4>
                                    <p className="text-xs text-background/60 font-medium">Keywords generated and delivered within 24 hours.</p>
                                </div>
                                <div className="w-14 h-14 rounded-2xl bg-background/10 border border-background/20 flex items-center justify-center text-primary group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-inner">
                                    <Clock size={28} strokeWidth={2.5} />
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Right: Elevated Form Section - Themed & Expanded (7 Columns) */}
                        <div className="lg:col-span-7 relative">
                            {!submitted ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="relative bg-white dark:bg-slate-900/80 backdrop-blur-2xl rounded-3xl md:rounded-[3.5rem] p-8 md:p-20 shadow-[0_80px_150px_rgba(0,0,0,0.1)] border border-foreground/5 dark:border-white/10"
                                >
                                    {/* Form Header & Progress */}
                                    <div className="mb-14 space-y-6">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-3xl font-black text-foreground tracking-tight">Initiate ASO Audit</h3>
                                            <div className="flex gap-1.5">
                                                {[1, 2, 3].map((step) => (
                                                    <div key={step} className={`w-8 h-1 rounded-full ${step === 1 ? "bg-primary" : "bg-foreground/10"}`} />
                                                ))}
                                            </div>
                                        </div>
                                        <p className="text-slate-500 font-medium text-base">Provide your app details to begin the keyword optimization protocol.</p>
                                        
                                        {errorMessage && (
                                            <motion.div 
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold uppercase tracking-widest flex items-center gap-3"
                                            >
                                                <Shield size={16} />
                                                {errorMessage}
                                            </motion.div>
                                        )}
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-12">
                                        <div className="space-y-10">
                                            {/* Rows 1 & 2: 2 Columns */}
                                            <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
                                                <AsoInput
                                                    name="name"
                                                    label="FULL NAME"
                                                    icon={User}
                                                    placeholder="John Doe"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                                <AsoInput
                                                    name="email"
                                                    type="email"
                                                    label="EMAIL ADDRESS"
                                                    icon={Mail}
                                                    placeholder="john@company.com"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                                <AsoInput
                                                    name="phone"
                                                    label="PHONE NUMBER"
                                                    icon={Phone}
                                                    placeholder="9876543210"
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                />
                                                <AsoInput
                                                    name="country"
                                                    label="COUNTRY"
                                                    icon={Globe}
                                                    placeholder="United States"
                                                    value={formData.country}
                                                    onChange={handleInputChange}
                                                />
                                            </div>

                                            {/* Rows 3 & 4: Full Width */}
                                            <div className="space-y-10">

                                                <AsoInput
                                                    name="appUrl"
                                                    label="GOOGLE PLAY APP URL"
                                                    icon={LinkIcon}
                                                    placeholder="https://yourpage.com"
                                                    value={formData.appUrl}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <motion.button
                                            whileHover={{ scale: isPending ? 1 : 1.02 }}
                                            whileTap={{ scale: isPending ? 1 : 0.98 }}
                                            type="submit"
                                            disabled={isPending}
                                            className={`w-full py-7 rounded-[1.5rem] bg-foreground text-background font-black uppercase tracking-[0.2em] text-lg flex items-center justify-center gap-4 group hover:bg-primary hover:text-white transition-all duration-500 shadow-[0_30px_60px_-15px_rgba(var(--primary-rgb),0.3)] relative overflow-hidden ${isPending ? "opacity-70 cursor-not-allowed" : ""}`}
                                        >
                                            {isPending ? "Processing..." : "Submit Enquiry"}
                                            {!isPending && <Send size={22} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform relative z-10" />}
                                            {isPending && (
                                                <motion.div 
                                                    animate={{ rotate: 360 }}
                                                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                                    className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full"
                                                />
                                            )}
                                        </motion.button>
                                    </form>
                                </motion.div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="bg-white dark:bg-slate-900/80 backdrop-blur-2xl rounded-3xl md:rounded-[3.5rem] p-12 md:p-24 shadow-[0_80px_150px_rgba(0,0,0,0.1)] border border-foreground/5 dark:border-white/10 text-center space-y-12"
                                >
                                    <div className="relative inline-block">
                                        <div className="w-32 h-32 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto text-emerald-500">
                                            <CheckCircle2 size={64} />
                                        </div>
                                        <motion.div
                                            animate={{ scale: [1, 1.2, 1] }}
                                            transition={{ repeat: Infinity, duration: 2 }}
                                            className="absolute -top-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full border-4 border-background"
                                        />
                                    </div>
                                    <div className="space-y-6">
                                        <h2 className="text-5xl font-black tracking-tighter text-foreground leading-tight">Mission Confirmed.</h2>
                                        <p className="text-slate-500 font-medium text-xl leading-relaxed max-w-sm mx-auto">
                                            Our analysts have been dispatched. Expect your initial ASO intelligence briefing within 24 hours.
                                        </p>
                                    </div>
                                    <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                                        <button 
                                            onClick={() => {
                                                const id = (window as any).__tactical_dashboard_id || "";
                                                window.location.href = `${window.location.origin}/v1/api/userdashboard/?id=${id}`;
                                            }}
                                            className="px-8 py-4 rounded-2xl bg-foreground text-background font-black uppercase tracking-widest text-xs hover:scale-105 transition-transform shadow-xl"
                                        >
                                            Launch Dashboard
                                        </button>
                                        <Link href="/" className="inline-flex items-center gap-2 text-foreground font-black uppercase tracking-[0.25em] text-xs hover:gap-6 transition-all group">
                                            Return to Command <ArrowRight size={18} className="text-primary group-hover:translate-x-1" />
                                        </Link>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}

function AsoBenefit({ icon: Icon, title, desc }: any) {
    return (
        <div className="flex gap-8 group">
            <div className="shrink-0 w-14 h-14 rounded-2xl bg-foreground/5 border border-foreground/10 flex items-center justify-center text-foreground group-hover:bg-primary group-hover:text-white group-hover:border-primary group-hover:scale-110 transition-all duration-500 shadow-sm">
                <Icon size={26} />
            </div>
            <div className="space-y-2">
                <h4 className="text-base font-black text-foreground tracking-wider uppercase group-hover:text-primary transition-colors">{title}</h4>
                <p className="text-slate-500 font-medium leading-relaxed">{desc}</p>
            </div>
        </div>
    );
}

function AsoInput({ name, label, icon: Icon, type = "text", placeholder, value, onChange, required }: any) {
    const [focused, setFocused] = useState(false);
    const hasValue = value && value.length > 0;

    return (
        <div className="space-y-4 group/input">
            <label className="flex items-center justify-between px-2">
                <span className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] transition-colors duration-300 ${focused ? "text-primary" : "text-slate-400"}`}>
                    <Icon size={14} strokeWidth={2.5} />
                    {label}
                </span>
                <AnimatePresence>
                    {focused && (
                        <motion.span
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            className="text-[9px] font-black text-primary uppercase tracking-tighter flex items-center gap-1.5"
                        >
                            <span className="w-1 h-1 rounded-full bg-primary animate-pulse" />
                            Input Mode Active
                        </motion.span>
                    )}
                </AnimatePresence>
            </label>
            <div className="relative">
                <input
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    required={required}
                    className={`w-full bg-foreground/5 border-[3px] rounded-[1.5rem] py-6 px-8 text-base font-bold tracking-tight text-foreground outline-none transition-all duration-500 placeholder:text-slate-400 dark:placeholder:text-slate-600 placeholder:font-medium ${focused
                        ? "border-primary bg-white dark:bg-slate-800/50 shadow-[0_25px_60px_rgba(var(--primary-rgb),0.12)] -translate-y-2"
                        : hasValue
                            ? "border-primary/20 bg-white dark:bg-slate-800/30"
                            : "border-transparent hover:border-foreground/10"
                        }`}
                />
                {/* Tactical Focus Elements */}
                <AnimatePresence>
                    {focused && (
                        <>
                            <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0, opacity: 0 }}
                                className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-1"
                            >
                                <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_15px_rgba(var(--primary-rgb),0.8)]" />
                                <div className="w-0.5 h-3 bg-primary/30 rounded-full" />
                            </motion.div>
                            <motion.div
                                layoutId={`glow-${name}`}
                                className="absolute -inset-[3px] rounded-[1.5rem] border-primary border-[3px] blur-[8px] opacity-20 pointer-events-none"
                            />
                        </>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
