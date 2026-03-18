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
      
      // Aggressively resume the notification 15 seconds after they close it
      setTimeout(() => {
          setHasClosedManually(false);
          setIsVisible(true);
      }, 15000);
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

                <Link href="/get-started" onClick={handleManualClose} className="w-full relative block group/link">
                    <img 
                       src="/stats-banner.png" 
                       alt="App Download Stats" 
                       className="w-full h-auto object-cover transform group-hover/link:scale-105 transition-transform duration-700 pointer-events-none"
                       onError={(e) => {
                           // Fallback
                           const target = e.target as HTMLImageElement;
                           // Only change src if it's currently stats-banner.png, to prevent infinite loops
                           if (target.src.includes('stats-banner.png')) {
                               target.src = "/hero-bg.png"; 
                           }
                       }}
                    />
                </Link>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
