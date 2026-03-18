"use client";

import Link from "next/link";
import { Twitter, Github, Linkedin, Globe, Shield } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-background border-t border-foreground/5 pt-20 md:pt-32 pb-8 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
          <div className="md:col-span-4">
            <Link href="/" className="flex items-center gap-3 mb-8 group">
              <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center rotate-12 group-hover:rotate-0 transition-transform duration-500">
                <Globe size={18} className="text-background" strokeWidth={3} />
              </div>
              <span className="text-2xl font-black tracking-tighter text-foreground">
                OPTI<span className="text-primary italic">APP</span>
              </span>
            </Link>
            <p className="text-slate-600 dark:text-slate-500 font-medium leading-relaxed mb-10 max-w-sm">
              The premium ASO strategy engine for apps that deserve a spot at the top of the search results.
            </p>

          </div>

          <div className="md:col-span-2">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 dark:text-slate-700 mb-8 font-mono">Services</h4>
            <ul className="space-y-4">
              {[
                { name: "Keyword Research", href: "#features" },
                { name: "Ranking Strategy", href: "#benefits" },
                { name: "Competitor Audit", href: "#features" },
                { name: "Global Localization", href: "#faq" }
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm font-bold text-slate-500 hover:text-foreground transition-colors">{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 dark:text-slate-700 mb-8 font-mono">Company</h4>
            <ul className="space-y-4">
              {[

                { name: "Pricing", href: "#pricing" },
                { name: "Success Stories", href: "#benefits" }
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm font-bold text-slate-500 hover:text-foreground transition-colors">{item.name}</Link>
                </li>
              ))}
              <li>
                <a href="mailto:contact@taraapplications.com" className="text-sm font-bold text-slate-500 hover:text-primary transition-colors">contact@taraapplications.com</a>
              </li>
              <li>
                <Link href="/privacy" className="text-sm font-bold text-slate-500 hover:text-foreground transition-colors">Privacy Policy</Link>
              </li>

            </ul>
          </div>

          <div className="md:col-span-4">
            <div className="p-6 md:p-8 neo-glass bg-foreground/[0.01] border-foreground/5">
              <h4 className="text-xs font-black uppercase tracking-widest text-foreground mb-4">Weekly ASO Insight</h4>
              <p className="text-xs text-slate-600 dark:text-slate-500 mb-6 font-medium">Get the latest store algorithm updates and growth strategies delivered weekly.</p>
              <form className="relative">
                <input
                  type="email"
                  placeholder="ENTER_YOUR_EMAIL"
                  className="w-full bg-foreground/5 border border-foreground/5 rounded-xl px-4 py-4 focus:outline-none focus:border-primary/50 text-[10px] font-mono text-foreground placeholder:text-slate-400 dark:placeholder:text-slate-800"
                />
                <button className="absolute right-2 top-2 bottom-2 bg-primary text-background px-5 rounded-lg text-[10px] font-black uppercase tracking-widest hover:brightness-110 transition-all">
                  SUBSCRIBE
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
