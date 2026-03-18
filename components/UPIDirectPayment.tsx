"use client";

import { useState, useMemo, useEffect } from "react";
import { createPortal } from "react-dom";
import { QRCodeSVG } from "qrcode.react";
import { 
  CheckCircle2, 
  Loader2, 
  Zap,
  ShieldCheck,
  ChevronRight,
  Info,
  X,
  Target,
  Trophy,
  History,
  ShieldAlert,
  Fingerprint,
  QrCode,
  Camera,
  Image as ImageIcon,
  Check
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface UPIDirectPaymentProps {
  amount: string;
  itemId: string;
  userId: string;
  userEmail?: string;
  userName?: string;
  onPaymentSuccess?: () => void;
}

// -------------------------------------------------------------------------
// TACTICAL CONFIGURATION
// -------------------------------------------------------------------------
const UPI_CONFIG = {
  vpa: process.env.NEXT_PUBLIC_UPI_ID || "ASODIGITAL@okaxis", 
  name: process.env.NEXT_PUBLIC_UPI_NAME || "ASO Digital Protocol", 
  note: "Audit Protocol Fee",
};

// Removed UPI_PLATFORMS implementation to simplify flow to direct QR code.

export default function UPIDirectPayment({
  amount,
  itemId,
  userId,
  userEmail,
  userName,
  onPaymentSuccess
}: UPIDirectPaymentProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<"QR" | "VERIFY" | "PROCESSING" | "SUCCESS">("QR");
  const [utr, setUtr] = useState("");
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const displayAmount = amount; 
  const upiUrl = useMemo(() => {
    return `upi://pay?pa=${UPI_CONFIG.vpa}&pn=${encodeURIComponent(UPI_CONFIG.name)}&am=${displayAmount}&cu=INR&tn=${encodeURIComponent(`${UPI_CONFIG.note} - ${itemId}`)}`;
  }, [displayAmount, itemId]);

  // Removed handlePlatformClick as it is no longer used for direct QR flow.

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB Limit
        alert("FILE_TOO_LARGE: Please upload an image smaller than 2MB.");
        return;
      }
      
      setIsUploading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setScreenshot(reader.result as string);
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVerify = async () => {
    if (!utr || utr.length < 10) return;

    setStep("PROCESSING");
    
    try {
      console.log("TACTICAL: Sending UPI verification payload:", { userId, itemId, amount: displayAmount, utr });
      const response = await fetch("/api/upi/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          itemId,
          amount: displayAmount,
          utr,
          screenshot, // New: Sending the Base64 screenshot
          payerInfo: { name: userName, email: userEmail }
        }),
      });

      const data = await response.json();
      console.log("TACTICAL: Received UPI verification response:", data);
      
      // Artificial delay for "Wow" factor animation
      setTimeout(async () => {
        if (data.success) {
          setStep("SUCCESS");
          if (onPaymentSuccess) {
            console.log("TACTICAL: Triggering dashboard refresh...");
            await onPaymentSuccess();
          }
          
          // Auto close after showing the success tick
          setTimeout(() => {
            setIsOpen(false);
            setTimeout(() => setStep("QR"), 500);
          }, 4000);
        } else {
          alert("ERROR: Protocol rejection. " + (data.error || "Check UTR."));
          setStep("VERIFY");
        }
      }, 2500);

    } catch (error) {
      console.error("UPI_VERIFY_FAILURE:", error);
      alert("SIGNAL_LOST: Submission failed.");
      setStep("VERIFY");
    }
  };

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-slate-950/95 backdrop-blur-3xl"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            className={`relative w-full max-w-[460px] bg-[#050505] border border-white/10 rounded-[3rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,1)] ${step === 'SUCCESS' ? 'border-green-500/30' : ''}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Success Background Glow */}
            <AnimatePresence>
                {step === 'SUCCESS' && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 bg-gradient-to-b from-green-500/10 via-transparent to-transparent pointer-events-none"
                    />
                )}
            </AnimatePresence>

            {/* Tactical Header (Hides on Success) */}
            <AnimatePresence mode="wait">
                {step !== "SUCCESS" && step !== "PROCESSING" && (
                    <motion.div 
                        exit={{ opacity:0, y: -20 }}
                        className="p-8 pb-4 border-b border-white/5"
                    >
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                                    <ShieldCheck size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-black text-white uppercase tracking-tighter leading-tight">Secure Payment</h3>
                                    <p className="text-[9px] text-slate-500 font-black uppercase tracking-[0.2em]">End-to-End Encryption Enabled</p>
                                </div>
                            </div>
                            <button 
                                onClick={() => setIsOpen(false)} 
                                className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center text-slate-500 hover:text-white transition-all bg-white/5"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <div className="bg-white/[0.03] rounded-3xl p-6 border border-white/5 flex items-center justify-between">
                            <div>
                                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1.5 opacity-60">Amount Details</p>
                                <p className="text-4xl font-black text-white tracking-tighter">₹{displayAmount}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1.5 opacity-60">Status</p>
                                <span className="text-[10px] font-black text-cyan-500 bg-cyan-500/10 px-3 py-1 rounded-full uppercase border border-cyan-500/20 tracking-widest">Awaiting</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Content Area */}
            <div className={`p-8 ${step === 'SUCCESS' || step === 'PROCESSING' ? 'min-h-[400px] flex items-center justify-center' : 'max-h-[60vh] overflow-y-auto custom-scrollbar'}`}>
              
              {/* Removed SELECT and INTENT_PROMPT steps to simplify flow to direct QR code. */}

              {step === "QR" && (
                <div className="flex flex-col items-center py-2 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="bg-white p-7 rounded-[3rem] mb-10 shadow-[0_40px_100px_rgba(6,182,212,0.15)] relative group">
                        <QRCodeSVG value={upiUrl} size={220} level="H" />
                  </div>
                  <div className="text-center mb-10">
                    <h4 className="text-lg font-black text-white uppercase tracking-wider mb-2">Tactical Scan</h4>
                    <p className="text-[10px] text-slate-500 font-medium uppercase tracking-[0.2em]">Scan with any authorized UPI app</p>
                  </div>
                  <div className="w-full space-y-3">
                    <button onClick={() => setStep("VERIFY")} className="w-full py-5 rounded-2xl bg-white text-black font-black uppercase tracking-[0.2em] text-[11px] shadow-2xl">Already Paid? Verify UTR</button>
                    <button onClick={() => setIsOpen(false)} className="w-full py-2 text-[9px] font-black text-slate-600 uppercase tracking-widest hover:text-white transition-colors text-center">Cancel</button>
                  </div>
                </div>
              )}

              {step === "VERIFY" && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="bg-indigo-500/5 border border-indigo-500/10 p-5 rounded-[2rem] flex gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 shrink-0">
                        <Fingerprint size={20} />
                    </div>
                    <p className="text-[10px] text-slate-400 font-medium leading-relaxed uppercase tracking-tighter">
                        Input the <span className="text-white font-black underline decoration-indigo-500 underline-offset-4">12-digit UTR</span> from your payment success screen to bridge the block.
                    </p>
                  </div>

                    <div className="space-y-3">
                      <label className="text-[9px] font-black text-slate-600 uppercase tracking-[0.4em] block pl-2">Transaction ID (UTR)</label>
                      <input 
                          type="text"
                          value={utr}
                          onChange={(e) => setUtr(e.target.value)}
                          placeholder="412XXXXXXXXX"
                          className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-8 py-6 text-white font-mono text-2xl tracking-[0.2em] focus:outline-none focus:border-cyan-500/50 focus:bg-white/[0.05] transition-all placeholder:text-slate-800"
                      />
                    </div>

                    {/* Screenshot Upload Section */}
                    <div className="space-y-3">
                      <label className="text-[9px] font-black text-slate-600 uppercase tracking-[0.4em] block pl-2">Proof of Payment</label>
                      <div className="relative group/upload">
                        <input 
                          type="file" 
                          accept="image/*"
                          onChange={handleFileChange}
                          className="absolute inset-0 opacity-0 cursor-pointer z-10"
                        />
                        <div className={`w-full border-2 border-dashed ${screenshot ? 'border-green-500/40 bg-green-500/5' : 'border-white/10 bg-white/[0.02]'} rounded-2xl p-6 transition-all group-hover/upload:border-cyan-500/30 flex flex-col items-center justify-center gap-3 active:scale-[0.99]`}>
                          {screenshot ? (
                            <>
                              <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                                <Check size={20} />
                              </div>
                              <p className="text-[10px] text-green-500 font-black uppercase tracking-widest">Screenshot Captured</p>
                              <p className="text-[8px] text-slate-500 font-mono">Tap to change file</p>
                            </>
                          ) : isUploading ? (
                            <>
                              <Loader2 size={24} className="text-cyan-500 animate-spin" />
                              <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Processing Data...</p>
                            </>
                          ) : (
                            <>
                              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-500 group-hover/upload:text-cyan-400 transition-colors">
                                <Camera size={20} />
                              </div>
                              <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest group-hover/upload:text-slate-200 transition-colors">Upload Payment Screenshot</p>
                              <p className="text-[8px] text-slate-600 font-mono">JPG, PNG allowed (Max 2MB)</p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                  <div className="pt-4 space-y-3">
                    <button 
                      onClick={handleVerify}
                      disabled={utr.length < 10}
                      className="w-full py-5 rounded-3xl bg-cyan-500 text-white font-black uppercase tracking-[0.3em] text-[11px] shadow-[0_20px_50px_rgba(6,182,212,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center gap-3"
                    >
                      <Target size={18} /> Finalize Mission
                    </button>
                    <button onClick={() => setStep("QR")} className="w-full py-2 text-[9px] font-black text-slate-600 uppercase tracking-widest text-center hover:text-white transition-colors">Back to QR</button>
                  </div>
                </div>
              )}

              {step === "PROCESSING" && (
                <div className="text-center">
                    <div className="relative w-32 h-32 mx-auto mb-10">
                        <motion.div 
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                            className="absolute inset-0 border-t-2 border-r-2 border-cyan-500 rounded-full"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <motion.div
                                animate={{ opacity: [0.4, 1, 0.4] }}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                            >
                                <Loader2 className="animate-spin text-cyan-500" size={40} />
                            </motion.div>
                        </div>
                    </div>
                    <h4 className="text-xl font-black text-white uppercase tracking-[0.3em] mb-3 animate-pulse">Verifying Block...</h4>
                    <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">Cross-Referencing UTR Coordinates</p>
                </div>
              )}

              {step === "SUCCESS" && (
                <div className="text-center animate-in zoom-in-95 duration-700">
                    <motion.div 
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                        className="w-32 h-32 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-8 shadow-[0_0_80px_rgba(34,197,94,0.4)] relative"
                    >
                         <motion.div 
                             initial={{ opacity: 0 }}
                             animate={{ opacity: 1 }}
                             transition={{ duration: 0.8, delay: 0.2 }}
                         >
                            <svg className="w-16 h-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                                <motion.path 
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 0.5, delay: 0.3 }}
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    d="M5 13l4 4L19 7" 
                                />
                            </svg>
                         </motion.div>
                         <motion.div 
                            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="absolute -inset-4 border-4 border-green-500 rounded-full blur-sm"
                         />
                    </motion.div>
                    
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="space-y-4"
                    >
                        <h4 className="text-3xl font-black text-white uppercase tracking-tighter">Payment Received</h4>
                        <div className="flex flex-col items-center gap-2">
                            <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">Transaction Recorded</p>
                            <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl font-mono text-sm text-green-400">
                                {utr}
                            </div>
                        </div>
                        <p className="text-xs text-slate-400 font-medium leading-relaxed max-w-[280px] mx-auto py-2">
                            The transaction block has been <span className="text-green-500 font-black">Authorized</span> and logged into your Mission Control profile.
                        </p>
                    </motion.div>

                    <div className="mt-12 flex flex-col items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        <p className="text-[8px] font-black text-slate-600 uppercase tracking-[0.5em]">Session Auto-Disconnecting</p>
                    </div>
                </div>
              )}

            </div>

            {/* Secure Footer (Hides on Success) */}
            {step !== "SUCCESS" && step !== "PROCESSING" && (
                <div className="p-6 bg-white/[0.01] border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                        <div className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.6)]" />
                        <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">Secure Node: Active</span>
                    </div>
                </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="w-full">
      <button
        onClick={() => setIsOpen(true)}
        className="relative w-full overflow-hidden group/btn rounded-[1.2rem] transition-all active:scale-95"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-indigo-700 transition-all duration-500 group-hover/btn:brightness-110" />
        <div className="relative py-4 px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center">
                <Zap size={14} className="text-white fill-white" />
             </div>
            <span className="text-white text-[11px] font-black uppercase tracking-[0.2em]">
               Execute UPI Protocol
            </span>
          </div>
          <ChevronRight size={18} className="text-white/40 group-hover:text-white transition-all transform group-hover:translate-x-1" />
        </div>
      </button>

      {mounted && typeof document !== "undefined" && createPortal(modalContent, document.body)}
    </div>
  );
}
