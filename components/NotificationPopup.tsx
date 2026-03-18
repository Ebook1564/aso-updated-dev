"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Terminal, Shield, Zap, X, ArrowRight } from "lucide-react";
import Link from "next/link";

const NOTIFICATIONS = [
  {
    icon: Sparkles,
    id: "audit",
    title: "Initial Audit Protocol",
    message: "Deploy our advanced ASO audit to identify ranking gaps.",
    price: "$1.00",
    link: "/get-started"
  },
  {
    icon: Terminal,
    id: "matrix",
    title: "Priority Keyword Matrix",
    message: "Uncover high-intent keywords that drive organic conversion.",
    price: "$1.00",
    link: "/get-started"
  },
  {
    icon: Shield,
    id: "protection",
    title: "Algorithmic Protection",
    message: "Defend your rankings against store algorithm shifts.",
    price: "$1.00",
    link: "/get-started"
  },
  {
    icon: Zap,
    id: "surge",
    title: "Traffic Surge Protocol",
    message: "Execute specialized campaigns for rapid ranking propagation.",
    price: "$1.00",
    link: "/get-started"
  }
];

export default function NotificationPopup() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [hasClosedManually, setHasClosedManually] = useState(false);

  useEffect(() => {
    // Initial delay before first popup
    const firstTimer = setTimeout(() => {
        setIsVisible(true);
    }, 5000);

    const interval = setInterval(() => {
      if (!hasClosedManually) {
        setIsVisible(false);
        // Wait for exit animation before showing next
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % NOTIFICATIONS.length);
          setIsVisible(true);
        }, 1000);
      }
    }, 20000); // 20 second cycle

    return () => {
      clearTimeout(firstTimer);
      clearInterval(interval);
    };
  }, [hasClosedManually]);

  const current = NOTIFICATIONS[currentIndex];

  const handleManualClose = () => {
      setIsVisible(false);
      setHasClosedManually(true);
      // Resume notifications after 60 seconds of silence if closed manually
      setTimeout(() => setHasClosedManually(false), 60000);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 120 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-6 pointer-events-none"
        >
          <div className="bg-white/95 dark:bg-[#0a0a0a]/95 backdrop-blur-3xl border border-slate-200 dark:border-white/10 rounded-[2.5rem] p-8 md:p-10 shadow-[0_40px_100px_rgba(0,0,0,0.2)] relative overflow-hidden group pointer-events-auto w-full max-w-[480px]">
            {/* Ambient Background Glow */}
            <div className="absolute -top-16 -right-16 w-48 h-48 bg-primary/20 blur-[60px] rounded-full group-hover:scale-125 transition-transform duration-1000 pointer-events-none" />
            
            <button 
              onClick={handleManualClose}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 transition-colors text-slate-400 z-10"
            >
              <X size={18} />
            </button>

            <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start relative z-0 text-center sm:text-left">
              <div className="w-16 h-16 rounded-3xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0 shadow-inner group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                <current.icon size={30} strokeWidth={2.5} />
              </div>
              
              <div className="space-y-3 pt-1">
                <div className="flex items-center gap-3 flex-wrap justify-center sm:justify-start">
                  <h4 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white">
                    {current.title}
                  </h4>
                  <span className="text-[11px] font-black text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20 flex items-center gap-1.5">
                    <Sparkles size={12} /> {current.price}
                  </span>
                </div>
                
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm">
                  {current.message}
                </p>
                
                <div className="pt-3">
                    <Link 
                      href={current.link}
                      className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary hover:gap-4 transition-all duration-300 group/link bg-primary/5 hover:bg-primary/10 px-4 py-2 rounded-xl"
                    >
                      Initialize Protocol <ArrowRight size={14} strokeWidth={3} className="group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                </div>
              </div>
            </div>
            
            {/* Progress Bar Animation for the 20s cycle */}
            <motion.div 
               initial={{ width: 0 }}
               animate={{ width: "100%" }}
               transition={{ duration: 20, ease: "linear" }}
               className="absolute bottom-0 left-0 h-1 bg-primary/30"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
