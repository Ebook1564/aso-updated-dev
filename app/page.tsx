import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import RankingBenefits from "@/components/RankingBenefits";
import Process from "@/components/Process";
import Pricing from "@/components/Pricing";
import Faq from "@/components/Faq";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground transition-colors duration-500">
      <main className="flex-1">
        <Hero />
        
        {/* Full-width Stats Banner Section */}
        <section className="w-full relative bg-background border-y border-white/5 py-8 overflow-hidden z-20">
          <div className="absolute inset-0 pointer-events-none data-grid opacity-10" />
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 relative z-10 flex justify-center">
             <Link href="/get-started" className="block w-full max-w-[1000px] relative rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.6)] border border-white/10 group bg-[#050505]">
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                <img 
                   src="/stats-banner.png" 
                   alt="App Download Stats - 8.62M Downloads" 
                   className="w-full h-auto object-cover transform group-hover:scale-[1.02] transition-transform duration-700" 
                />
             </Link>
          </div>
        </section>

        <Features />
        <RankingBenefits />
        <Process />
        <Pricing />
        <Faq />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
