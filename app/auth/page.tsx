"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, ArrowRight, UserPlus, LogIn, ChevronLeft, Eye, EyeOff, Sparkles, Shield, Globe, TrendingUp, BarChart3 } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { signupAction, loginAction } from "./actions";
import { signIn } from "next-auth/react";

// Custom Premium Google Icon
const CustomGoogleIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1 .67-2.28 1.07-3.71 1.07-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.11c-.22-.66-.35-1.36-.35-2.11s.13-1.45.35-2.11V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.83z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
    </svg>
);

export default function AuthPage() {
    const [mode, setMode] = useState<"login" | "signup">("login");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<{ type: "success" | "error" | null; message: string }>({ type: null, message: "" });
    const [formData, setFormData] = useState({ 
        firstName: "", 
        userEmail: "", 
        password: "", 
        confirmPassword: "" 
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setStatus({ type: null, message: "" });

        try {
            const result = mode === "login" 
                ? await loginAction(formData) 
                : await signupAction(formData);

            if (result?.success) {
                setStatus({ type: "success", message: result.message });
                if (mode === "signup") {
                    setFormData({ firstName: "", userEmail: "", password: "", confirmPassword: "" });
                    setTimeout(() => setMode("login"), 2000);
                }
            } else if (result?.message) {
                setStatus({ type: "error", message: result.message });
            }
        } catch (error) {
            console.error("Auth error:", error);
            // Redirection errors are handled by Next.js, but our catch might catch them.
            // Next.js redirect doesn't return anything to the caller in this pattern.
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-white dark:bg-[#050505] selection:bg-primary/30 transition-colors duration-700 overflow-x-hidden">
            <Navbar />

            {/* REFINED ATMOSPHERE */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className={`absolute inset-0 transition-opacity duration-1000 ${mode === 'login' ? 'opacity-10' : 'opacity-[0.05]'} bg-gradient-to-br from-primary via-transparent to-violet-500`} />
                <div className="absolute inset-0 opacity-[0.03] data-grid" />
            </div>

            <main className="flex-1 flex flex-col items-center justify-center relative z-10 px-6 pt-24 pb-12">
                <div className="w-full max-w-[1240px] grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                    
                    {/* LEFT SIDE: ASO MARKETING CONTENT */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="space-y-10"
                    >
                        <div className="space-y-6">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.2em]"
                            >
                                <Sparkles size={12} />
                                Intelligence Access
                            </motion.div>
                            <h1 className="text-4xl md:text-6xl font-black text-foreground tracking-tighter leading-[0.9] italic">
                                Elevate Your <br />
                                <span className="text-primary">ASO Intelligence.</span>
                            </h1>
                            <p className="text-slate-500 dark:text-slate-400 font-medium text-lg leading-relaxed max-w-md">
                                Access the world's most advanced computational engine for market dominance and keyword audit protocols.
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-8">
                            <FeatureLink icon={TrendingUp} title="Keyword Audit" desc="Deep-node ranking analysis." />
                            <FeatureLink icon={Shield} title="Ranking Defense" desc="Predictive algorithm shifts." />
                            <FeatureLink icon={Globe} title="Market Hub" desc="190+ Global storefronts." />
                            <FeatureLink icon={BarChart3} title="Growth Engine" desc="Neural conversion tracking." />
                        </div>
                    </motion.div>

                    {/* RIGHT SIDE: REFINED AUTH FORM */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="relative"
                    >
                        <div className="relative bg-white/80 dark:bg-black/40 backdrop-blur-2xl rounded-[3rem] p-10 md:p-14 shadow-[0_40px_100px_rgba(0,0,0,0.06)] dark:shadow-[0_40px_100px_rgba(0,0,0,0.4)] border border-slate-100 dark:border-white/5 transform-gpu overflow-hidden">
                            {/* Form Header */}
                            <div className="mb-10 text-center space-y-2">
                                <h2 className="text-2xl font-black text-foreground tracking-tight uppercase">
                                    {mode === "login" ? "Initiate Portal" : "Join Network"}
                                </h2>
                                <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                                    {mode === "login" ? "Welcome back, Operator" : "Begin your optimization protocol"}
                                </p>
                            </div>

                            {status.type && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`mb-6 p-4 rounded-2xl text-[11px] font-bold uppercase tracking-wider text-center ${
                                        status.type === "success" 
                                            ? "bg-green-500/10 border border-green-500/20 text-green-500" 
                                            : "bg-red-500/10 border border-red-500/20 text-red-500"
                                    }`}
                                >
                                    {status.message}
                                </motion.div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={mode}
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -10 }}
                                        transition={{ duration: 0.2 }}
                                        className="space-y-5"
                                    >
                                        {mode === "signup" && (
                                            <RefinedInput 
                                                icon={UserPlus} 
                                                name="firstName" 
                                                label="First Name" 
                                                placeholder="Enter your name" 
                                                value={formData.firstName} 
                                                onChange={handleInputChange} 
                                                required
                                            />
                                        )}
                                        <RefinedInput 
                                            icon={Mail} 
                                            type="email" 
                                            name="userEmail" 
                                            label="User Email" 
                                            placeholder="operator@link.pro" 
                                            value={formData.userEmail} 
                                            onChange={handleInputChange} 
                                            required 
                                        />
                                        <RefinedInput 
                                            icon={Lock} 
                                            type={showPassword ? "text" : "password"} 
                                            name="password" 
                                            label="Identity Key" 
                                            placeholder="Enter password" 
                                            value={formData.password} 
                                            onChange={handleInputChange} 
                                            required 
                                            isPassword 
                                            showPassword={showPassword} 
                                            togglePassword={() => setShowPassword(!showPassword)} 
                                        />
                                        {mode === "signup" && (
                                            <RefinedInput 
                                                icon={Shield} 
                                                type={showPassword ? "text" : "password"} 
                                                name="confirmPassword" 
                                                label="Confirm Key" 
                                                placeholder="Repeat password" 
                                                value={formData.confirmPassword} 
                                                onChange={handleInputChange} 
                                                required 
                                            />
                                        )}
                                    </motion.div>
                                </AnimatePresence>

                                <button 
                                    disabled={isLoading}
                                    className="w-full py-5 rounded-2xl bg-foreground dark:bg-white text-background dark:text-black font-black uppercase tracking-[0.2em] text-[11px] flex items-center justify-center gap-3 hover:translate-y-[-2px] hover:shadow-xl active:translate-y-0 transition-all duration-300"
                                >
                                    {isLoading ? "Synchronizing..." : mode === "login" ? "Enter Portal" : "Enroll Identity"}
                                    {!isLoading && <ArrowRight size={16} strokeWidth={3} />}
                                </button>
                            </form>

                            {/* Mode Toggle Link */}
                            <div className="mt-10 pt-8 border-t border-slate-100 dark:border-white/5 text-center">
                                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                                    {mode === "login" ? "Don't have an Account" : "Already an operator?"}
                                    <button 
                                        onClick={() => setMode(mode === "login" ? "signup" : "login")}
                                        className="ml-2 text-primary hover:text-primary/70 transition-colors uppercase"
                                    >
                                        {mode === "login" ? "create an a account" : "Portal Login"}
                                    </button>
                                </p>
                            </div>

                            <div className="mt-8 pt-8 border-t border-slate-100 dark:border-white/5 space-y-4">
                                <div className="text-center">
                                    <span className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.3em]">Institutional Access</span>
                                </div>
                                <button 
                                    onClick={() => signIn('google', { callbackUrl: '/get-started' })}
                                    className="w-full py-4 rounded-2xl bg-white dark:bg-white/[0.03] border-2 border-slate-100 dark:border-white/5 hover:border-primary/30 transition-all duration-300 flex items-center justify-center gap-4 group shadow-sm hover:shadow-xl"
                                >
                                    <CustomGoogleIcon />
                                    <span className="text-[11px] font-black text-slate-700 dark:text-slate-300 uppercase tracking-widest">Continue with Google</span>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

function RefinedInput({ icon: Icon, type = "text", label, placeholder, value, onChange, required, name, isPassword, showPassword, togglePassword }: any) {
    const [focused, setFocused] = useState(false);
    return (
        <div className="space-y-2 group">
            <div className="flex items-center justify-between px-2">
                <label className={`text-[10px] font-black uppercase tracking-widest transition-colors ${focused ? "text-primary" : "text-slate-400 dark:text-slate-600"}`}>
                    {label}
                </label>
            </div>
            <div className="relative">
                <div className={`absolute left-5 top-1/2 -translate-y-1/2 transition-colors ${focused ? "text-primary" : "text-slate-400 dark:text-slate-700"}`}>
                    <Icon size={16} />
                </div>
                <input 
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    required={required}
                    placeholder={placeholder}
                    className={`w-full bg-slate-50 dark:bg-white/[0.03] border-2 rounded-2xl py-4.5 pl-12 pr-6 text-sm font-bold text-foreground dark:text-white transition-all outline-none placeholder:text-slate-300 dark:placeholder:text-slate-700 ${focused ? "border-primary/50 bg-white dark:bg-white/[0.05] shadow-[0_10px_30px_rgba(var(--primary-rgb),0.05)]" : "border-transparent"}`}
                />
                {isPassword && (
                    <button type="button" onClick={togglePassword} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors">
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                )}
            </div>
        </div>
    );
}

function FeatureLink({ icon: Icon, title, desc }: any) {
    return (
        <div className="flex gap-4 group cursor-default">
            <div className="w-12 h-12 shrink-0 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <Icon size={20} />
            </div>
            <div className="space-y-1">
                <h4 className="text-xs font-black uppercase tracking-widest text-foreground">{title}</h4>
                <p className="text-[11px] font-medium text-slate-500 dark:text-slate-500 leading-tight">{desc}</p>
            </div>
        </div>
    );
}
