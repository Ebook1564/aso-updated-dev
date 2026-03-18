"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles } from "lucide-react";
import Link from "next/link";

export default function NotificationPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasClosedManually, setHasClosedManually] = useState(false);

  useEffect(() => {
    // Initial delay before first popup
    const firstTimer = setTimeout(() => {
        setIsVisible(true);
    }, 3000);

    return () => {
      clearTimeout(firstTimer);
    };
  }, []);

  const handleManualClose = () => {
      setIsVisible(false);
      setHasClosedManually(true);
      
      // Aggressively resume the notification 20 seconds after they close it
      setTimeout(() => {
          setHasClosedManually(false);
          setIsVisible(true);
      }, 20000);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 40 }}
          transition={{ type: "spring", damping: 25, stiffness: 150 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 lg:p-12 pointer-events-none"
        >
          {/* Intense Backdrop for maximum focus */}
          <div className="absolute inset-0 bg-black/70 dark:bg-black/80 backdrop-blur-md pointer-events-auto transition-opacity" onClick={handleManualClose} />

          <div className="relative group pointer-events-auto w-[95%] md:w-full max-w-[850px] z-10 flex flex-col items-center">
            
            {/* Themed Wrapper for the Popup to make it feel like a premium modal */}
            <div className="w-full relative bg-[#050505] rounded-[2rem] md:rounded-[3.5rem] p-2 md:p-3 shadow-[0_0_120px_rgba(var(--primary-rgb),0.25)] border-2 border-primary/30">
                
                {/* Close Button Overlapping the Border */}
                <button 
                  onClick={handleManualClose}
                  className="absolute -top-4 -right-2 md:-top-5 md:-right-5 p-3 rounded-full bg-white text-black hover:bg-primary hover:text-white hover:scale-110 transition-all duration-300 z-50 shadow-2xl border-4 border-[#050505]"
                >
                  <X size={20} strokeWidth={4} />
                </button>
                
                {/* Glow ring */}
                <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent rounded-[inherit] pointer-events-none" />

                <Link href="/get-started" className="w-full relative block overflow-hidden rounded-[1.5rem] md:rounded-[3rem] group/link bg-zinc-900 border border-white/5">
                    {/* Dark gradient overlay at the bottom so elements stand out */}
                    <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/60 to-transparent pointer-events-none z-10" />
                    
                    <img 
                       src="/banner.jpg" 
                       alt="Grow your app organically - Data Driven Optimization" 
                       className="w-full h-auto object-cover transform group-hover/link:scale-105 transition-transform duration-700 pointer-events-none"
                       onError={(e) => {
                           // Fallback
                           const target = e.target as HTMLImageElement;
                           // Only change src if it's currently banner.jpg, to prevent infinite loops
                           if (target.src.includes('banner.jpg')) {
                               target.src = "/hero-bg.png"; 
                           }
                       }}
                    />

                    {/* Highly Visible Action Prompt overlaying the image */}
                    <div className="absolute bottom-6 md:bottom-10 left-0 w-full flex flex-col items-center justify-center pointer-events-none z-20 space-y-4">
                        <div className="px-6 md:px-8 py-3 bg-white text-black rounded-full font-black text-sm md:text-lg uppercase tracking-widest shadow-[0_10px_40px_rgba(0,0,0,0.5)] group-hover/link:bg-primary group-hover/link:text-white transition-colors duration-300 flex items-center gap-2">
                           Claim $10 Protocol Now <Sparkles size={18} />
                        </div>
                        {/* Progress Bar Animation for the display cycle */}
                        <motion.div 
                           initial={{ width: 0 }}
                           animate={{ width: "100%" }}
                           transition={{ duration: 15, ease: "linear" }}
                           className="h-1.5 bg-primary/80 w-[60%] rounded-full shadow-[0_0_15px_rgba(var(--primary-rgb),1)]"
                        />
                    </div>

                    {/* Limited Time Offer Badge */}
                    <div className="absolute top-6 lg:top-8 left-6 lg:left-8 z-20 px-4 md:px-5 py-2 bg-gradient-to-r from-red-600 to-red-500 text-white text-[10px] md:text-xs font-black uppercase tracking-[0.2em] rounded-full shadow-[0_10px_30px_rgba(220,38,38,0.5)] border border-white/20 flex items-center gap-2.5 backdrop-blur-md">
                      <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      Limited Offer
                    </div>
                </Link>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
