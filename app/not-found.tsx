"use client";

import Link from "next/link";
import { Suspense } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Home } from "lucide-react";

function NotFoundContent() {
  return (
    <div className="flex flex-col items-center justify-center text-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-9xl font-black tracking-tighter text-primary/20">404</h1>
      </motion.div>
      
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-4"
      >
        Identity Not Detected
      </motion.h2>
      
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-slate-500 max-w-md mb-12 text-lg"
      >
        The protocol you're searching for does not exist in our database. 
        It may have been purged or moved to a restricted sector.
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Link href="/">
          <button className="flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-sm hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20">
            <Home size={18} />
            Return to Base
          </button>
        </Link>
      </motion.div>
    </div>
  );
}

export default function NotFound() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center bg-background min-h-[70vh] relative overflow-hidden">
      {/* Atmosphere */}
      <div className="absolute inset-0 pointer-events-none data-grid opacity-[0.03]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full" />
      
      <Suspense fallback={<div className="animate-pulse text-primary font-black uppercase tracking-widest">Re-initializing...</div>}>
        <NotFoundContent />
      </Suspense>
    </main>
  );
}
