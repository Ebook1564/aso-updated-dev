"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { Menu, X, Globe, ArrowRight, User, ShoppingBag, Download, LogOut } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { checkFormStatus } from "@/app/get-started/actions";

function NavbarContent() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const [numericId, setNumericId] = useState<string | null>(null);

  // Use the ID from the URL as a fallback if numericId isn't fetched yet
  const effectiveId = numericId || searchParams?.get("id");

  useEffect(() => {
    async function fetchNumericId() {
      if (session?.user?.email) {
        console.log("NAVBAR: Fetching Numeric ID for email:", session.user.email);
        const result = await checkFormStatus(session.user.email);
        if (result.success && result.id) {
          console.log("NAVBAR: Resolved Numeric ID:", result.id);
          setNumericId(result.id.toString());
        }
      }
    }
    fetchNumericId();
  }, [session]);

  useEffect(() => {
    const handleScroll = () => {
      // Use a slightly higher threshold for a more natural transition
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 pointer-events-none 
      ${scrolled ? "pt-2 md:pt-4 px-4 md:px-8" : "pt-0 px-0 md:px-6"}`}>
      
      <div className="max-w-[1300px] mx-auto pointer-events-none">
        <motion.nav
          initial={false}
          className={`pointer-events-auto flex items-center justify-between relative transition-all duration-700 ease-[0.16, 1, 0.3, 1] mx-auto w-full
            ${scrolled 
              ? "bg-white/80 dark:bg-slate-900/70 backdrop-blur-3xl rounded-xl md:rounded-3xl py-2 md:py-3 px-6 md:px-10 shadow-[0_20px_40px_rgba(0,0,0,0.05)]" 
              : "bg-transparent py-4 md:py-6 px-8 md:px-12 rounded-none"
            }`}
        >
          {/* Glow Background for Island */}
          {scrolled && (
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 pointer-events-none opacity-50 rounded-[inherit]" />
          )}

          {/* Logo Section */}
          <Link href="/" className="group flex items-center gap-2.5 relative z-[110]">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center rotate-12 group-hover:rotate-0 transition-all duration-700 shadow-[0_0_15px_rgba(6,182,212,0.2)] text-white">
              <Globe size={16} strokeWidth={3} />
            </div>
            <span className="text-lg font-black tracking-tighter text-foreground">
              OPTI<span className="text-primary italic">APP</span>
            </span>
          </Link>

          {/* Navigation Links - Desktop */}
          <div className="hidden lg:flex items-center gap-8 relative z-[110]">
            {["Features", "Intelligence", "Process", "Pricing"].map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase().replace(" ", "")}`}
                className="group flex flex-col items-center"
              >
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500 hover:text-primary transition-colors duration-300">
                  {item}
                </span>
                <div className="h-0.5 w-0 bg-primary mt-1 rounded-full group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4 md:gap-6 relative z-[110]">
            {session ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-primary/20 hover:border-primary/50 bg-primary/10 transition-colors overflow-hidden group"
                >
                  {session.user?.image ? (
                    <img src={session.user.image} alt={session.user?.name || "User"} className="w-full h-full object-cover" />
                  ) : (
                    <User size={20} className="text-primary group-hover:scale-110 transition-transform" />
                  )}
                </button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-4 w-64 bg-white/95 dark:bg-[#0a0a0a]/95 backdrop-blur-3xl border border-slate-200 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden py-2"
                    >
                      <div className="px-6 py-4 border-b border-slate-200 dark:border-white/5 mb-2">
                        <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{session.user?.name || "Operative"}</p>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 truncate mt-1">{session.user?.email}</p>
                      </div>

                      <div className="px-2">
                        {/* Profile Snapshot and Order History now use the Numeric ID from asousertable */}
                        <Link href={effectiveId ? `/v1/api/userdashboard/?id=${effectiveId}` : "/v1/api/userdashboard"} onClick={() => setIsProfileOpen(false)}>
                          <div className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-slate-100 dark:hover:bg-white/5 transition-colors group cursor-pointer text-slate-700 dark:text-slate-300">
                            <User size={16} className="text-primary group-hover:scale-110 transition-transform" />
                            <span className="text-xs font-black uppercase tracking-widest">Profile Snapshot</span>
                          </div>
                        </Link>
                        
                        <Link href={effectiveId ? `/v1/api/userdashboard/?id=${effectiveId}` : "/v1/api/userdashboard"} onClick={() => setIsProfileOpen(false)}>
                          <div className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-slate-100 dark:hover:bg-white/5 transition-colors group cursor-pointer text-slate-700 dark:text-slate-300">
                            <ShoppingBag size={16} className="text-primary group-hover:scale-110 transition-transform" />
                            <span className="text-xs font-black uppercase tracking-widest">Order History</span>
                          </div>
                        </Link>

                        <div className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-slate-100 dark:hover:bg-white/5 transition-colors group cursor-pointer text-slate-700 dark:text-slate-300">
                          <Download size={16} className="text-primary group-hover:scale-110 transition-transform" />
                          <span className="text-xs font-black uppercase tracking-widest">Downloads</span>
                        </div>
                      </div>

                      <div className="px-4 mt-2 mb-2 pt-2 border-t border-slate-200 dark:border-white/5">
                        <button 
                          onClick={() => signOut({ callbackUrl: '/' })}
                          className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-red-500/10 hover:text-red-500 text-slate-700 dark:text-slate-400 transition-colors group"
                        >
                          <LogOut size={16} className="group-hover:translate-x-1 transition-transform" />
                          <span className="text-xs font-black uppercase tracking-widest">Abort Session</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link href="/auth" className="hidden sm:block">
                <button className="relative group overflow-hidden">
                  <div className="absolute inset-0 bg-foreground group-hover:bg-primary transition-colors duration-500 rounded-xl" />
                  <div className="relative px-6 md:px-7 py-2.5 md:py-3 flex items-center gap-2.5 text-background font-black text-[10px] md:text-[11px] uppercase tracking-[0.2em]">
                    Get Started
                    <ArrowRight size={14} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              </Link>
            )}

            <button
              className="lg:hidden w-10 h-10 md:w-12 md:h-12 rounded-xl bg-foreground/5 border border-foreground/10 flex items-center justify-center text-foreground hover:bg-foreground/10 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Mobile Menu Overlay */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="absolute top-full left-0 right-0 mt-4 p-6 md:p-8 bg-white/95 dark:bg-slate-900/95 backdrop-blur-3xl border border-foreground/10 dark:border-white/10 rounded-[2rem] lg:hidden shadow-3xl overflow-hidden"
              >
                <div className="flex flex-col gap-6 md:gap-8">
                  {["Features", "Intelligence", "Process", "Pricing"].map((item) => (
                    <Link
                      key={item}
                      href={`#${item.toLowerCase().replace(" ", "")}`}
                      className="text-xl md:text-2xl font-black text-foreground hover:text-primary tracking-tighter flex items-center justify-between group"
                      onClick={() => setIsOpen(false)}
                    >
                      {item}
                      <ArrowRight size={20} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  ))}
                  <div className="pt-6 border-t border-foreground/5 dark:border-white/5">
                    <Link href="/auth" onClick={() => setIsOpen(false)}>
                      <button className="w-full py-5 rounded-2xl bg-primary text-white font-black uppercase tracking-widest text-sm shadow-xl shadow-primary/20">
                        Get Started
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      </div>
    </div>
  );
}

export default function Navbar() {
  return (
    <Suspense fallback={null}>
      <NavbarContent />
    </Suspense>
  );
}
