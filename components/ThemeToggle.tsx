"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'dark' | 'light'>('light');

  useEffect(() => {
    // Default to light unless dark is explicitly saved
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light';
    const initialTheme = savedTheme || 'light';
    
    setTheme(initialTheme);
    document.documentElement.classList.toggle('dark', initialTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem('theme', newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-8 right-8 z-[100] p-4 rounded-2xl backdrop-blur-xl border border-foreground/10 shadow-2xl transition-all duration-500 hover:scale-110 active:scale-95 group overflow-hidden bg-background/80"
      aria-label="Toggle theme"
    >
      <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
      <AnimatePresence mode="wait">
        <motion.div
          key={theme}
          initial={{ y: 20, opacity: 0, rotate: -45 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -20, opacity: 0, rotate: 45 }}
          transition={{ duration: 0.3, ease: "backOut" }}
          className="relative z-10"
        >
          {theme === 'light' ? (
            <Moon className="text-slate-600" size={24} />
          ) : (
            <Sun className="text-amber-400" size={24} />
          )}
        </motion.div>
      </AnimatePresence>
    </button>
  );
}
