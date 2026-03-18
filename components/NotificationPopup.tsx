"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Link from "next/link";

export default function NotificationPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasClosedManually, setHasClosedManually] = useState(false);

  useEffect(() => {
    // Initial delay before first popup
    const firstTimer = setTimeout(() => {
        setIsVisible(true);
    }, 3000);

    const interval = setInterval(() => {
      if (!hasClosedManually) {
        setIsVisible(true);
      }
    }, 20000); // 20 second cycle

    // Automatically hide after 10 seconds if not closed manually
    const autoHideInterval = setInterval(() => {
        if (isVisible) {
            setIsVisible(false);
        }
    }, 10000);

    return () => {
      clearTimeout(firstTimer);
      clearInterval(interval);
      clearInterval(autoHideInterval);
    };
  }, [hasClosedManually, isVisible]);

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
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 30 }}
          transition={{ type: "spring", damping: 25, stiffness: 120 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 pointer-events-none"
        >
          {/* Backdrop for the popup */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto" onClick={handleManualClose} />

          <div className="bg-transparent relative group pointer-events-auto w-full max-w-[800px] z-10 flex flex-col items-center">
            
            <button 
              onClick={handleManualClose}
              className="absolute -top-4 -right-4 md:top-4 md:right-4 p-2.5 rounded-full bg-black/70 hover:bg-black transition-colors text-white z-20 backdrop-blur-md border border-white/10 shadow-xl"
            >
              <X size={24} />
            </button>

            {/* Banner Image Link */}
            <Link href="/get-started" className="w-full relative block hover:scale-[1.02] transition-transform duration-300 rounded-[2rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.5)] border-2 border-primary/20 bg-[#0a0a0a]">
                <img 
                   src="/banner.jpg" 
                   alt="ASO Promo Banner" 
                   className="w-full h-auto object-cover"
                   onError={(e) => {
                       // Fallback if image isn't named banner.jpg yet
                       const target = e.target as HTMLImageElement;
                       if (target.src.includes('banner.jpg')) {
                           target.src = "/hero-bg.png"; 
                       }
                   }}
                />
            </Link>
            
            <motion.div 
               initial={{ width: 0 }}
               animate={{ width: "100%" }}
               transition={{ duration: 10, ease: "linear" }}
               className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 h-1.5 bg-primary/80 w-[80%] rounded-full overflow-hidden z-20 shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
