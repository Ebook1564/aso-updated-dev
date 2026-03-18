"use client";

import { useState, useEffect } from "react";
import { CreditCard } from "lucide-react";

interface RazorpayCheckoutProps {
  amount: string;
  itemId: string;
  userId: string;
  userEmail?: string;
  userName?: string;
  onPaymentSuccess?: () => void;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function RazorpayCheckout({
  amount,
  itemId,
  userId,
  userEmail,
  userName,
  onPaymentSuccess
}: RazorpayCheckoutProps) {
  const [loading, setLoading] = useState(false);

  const loadScript = (src: string) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    setLoading(true);
    try {
      // 1. Load Razorpay Script
      const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
      if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
      }

      // 2. Create Order on Backend
      const orderRes = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: amount,
          currency: "INR",
          notes: { itemId, userId }
        }),
      });
      const orderData = await orderRes.json();

      if (!orderData.id) {
        throw new Error(orderData.error || "Order creation failed");
      }

      // 3. Open Razorpay Checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "", // Public Key
        amount: orderData.amount,
        currency: orderData.currency,
        name: "ASO Digital Protocol",
        description: `Audit for ${itemId}`,
        image: "https://lh3.googleusercontent.com/pw/AP1GczPHO-00gM2m5M3v5n5-5n5", // Placeholder logo
        order_id: orderData.id,
        handler: async function (response: any) {
          // 4. Verify Payment on Backend
          const verifyRes = await fetch("/api/razorpay/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              userId,
              itemId,
              amount,
              payerInfo: { name: userName, email: userEmail }
            }),
          });
          const verifyData = await verifyRes.json();

          if (verifyData.success) {
            alert("Payment Successful!");
            if (onPaymentSuccess) onPaymentSuccess();
          } else {
            alert("Payment verification failed: " + verifyData.error);
          }
        },
        prefill: {
          name: userName || "",
          email: userEmail || "",
          contact: ""
        },
        theme: {
          color: "#06b6d4" // Primary cyan/tactical color
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

    } catch (error: any) {
      console.error("RAZORPAY CHECKOUT ERROR:", error);
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className={`relative w-full overflow-hidden group/btn ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-violet-700 transition-all duration-500 group-hover/btn:scale-105" />
      <div className="relative py-2.5 px-4 flex items-center justify-center gap-2">
        <CreditCard size={14} className="text-white group-hover/btn:rotate-12 transition-transform" />
        <span className="text-white text-[10px] font-black uppercase tracking-[0.15em]">
          {loading ? "Initializing..." : "Razorpay"}
        </span>
      </div>
    </button>
  );
}
