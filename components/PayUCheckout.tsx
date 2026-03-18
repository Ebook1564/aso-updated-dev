"use client";

import { useState } from "react";
import { CreditCard, ShieldCheck, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

interface PayUCheckoutProps {
  amount: string;
  itemId: string;
  userId: string;
  userEmail: string;
  userName: string;
}

export default function PayUCheckout({
  amount,
  itemId,
  userId,
  userEmail,
  userName
}: PayUCheckoutProps) {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    try {
      const txnid = "TXN_" + Math.floor(Math.random() * 9999999999);
      
      // 1. Generate Hash from Server
      const hashRes = await fetch("/api/payu/hash", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          txnid,
          amount,
          productinfo: itemId,
          firstname: userName,
          email: userEmail,
          udf1: userId // Using udf1 to pass userId back to callback
        }),
      });

      const { hash, error } = await hashRes.json();
      if (error) throw new Error(error);

      // 2. Prepare Form Data for PayU Redirection
      const payuConfig = {
        key: process.env.NEXT_PUBLIC_PAYU_MERCHANT_KEY || "YOUR_PAYU_KEY",
        txnid,
        amount,
        productinfo: itemId,
        firstname: userName,
        email: userEmail,
        phone: "9999999999", // Placeholder or fetch from user profile
        surl: `${window.location.origin}/api/payu/callback`,
        furl: `${window.location.origin}/api/payu/callback`,
        hash,
        udf1: userId,
        service_provider: "payu_paisa"
      };

      // 3. Create a dynamic form and submit it
      const form = document.createElement("form");
      form.method = "POST";
      form.action = "https://test.payu.in/_payment"; // Use production URL for live: https://secure.payu.in/_payment

      Object.entries(payuConfig).forEach(([key, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = value;
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
      document.body.removeChild(form);

    } catch (err) {
      console.error("PAYU_INIT_ERROR:", err);
      alert("Failed to initialize PayU payment.");
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <button
        onClick={handlePayment}
        disabled={loading}
        className="relative w-full overflow-hidden group/btn rounded-[1.2rem] transition-all active:scale-95 disabled:opacity-70"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-600 transition-all duration-500 group-hover/btn:brightness-110" />
        <div className="relative py-4 px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center">
                <CreditCard size={14} className="text-white" />
             </div>
            <span className="text-white text-[11px] font-black uppercase tracking-[0.2em]">
               {loading ? "Initializing..." : "Pay via PayU"}
            </span>
          </div>
          {loading ? (
            <Loader2 size={18} className="text-white/40 animate-spin" />
          ) : (
            <ShieldCheck size={18} className="text-white/40 group-hover:text-white transition-all transform group-hover:scale-110" />
          )}
        </div>
      </button>
      
      <p className="text-[8px] text-center text-slate-500 mt-2 font-black uppercase tracking-widest opacity-50">
        Cards · NetBanking · Wallets
      </p>
    </div>
  );
}
