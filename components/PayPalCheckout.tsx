"use client";

import { useEffect, useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

interface PayPalCheckoutProps {
  amount?: string;
  itemId?: string;
  userId?: string;
  onPaymentSuccess?: () => void;
}

export default function PayPalCheckout({ 
  amount = "499.00", 
  itemId = "audit_protocol",
  userId,
  onPaymentSuccess 
}: PayPalCheckoutProps) {
  const [mounted, setMounted] = useState(false);
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "";

  useEffect(() => {
    setMounted(true);
    if (!clientId) {
      console.warn("TACTICAL ALERT: Missing NEXT_PUBLIC_PAYPAL_CLIENT_ID in .env.local");
    }
  }, [clientId]);

  const createOrder = async () => {
    try {
      console.log("TACTICAL: Requesting Order Creation for item:", itemId, "amount:", amount, "user:", userId);
      
      const response = await fetch("/api/orders/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cart: {
            id: itemId,
            amount: amount,
            quantity: "1",
            userId: userId || "unassigned" // Fallback to avoid empty strings
          },
        }),
      });

      const orderData = await response.json();
      console.log("TACTICAL: Received Order Data (JSON):", orderData);

      if (orderData.id) {
        return orderData.id;
      } else {
        const errorDetail = orderData?.details?.[0];
        const errorMessage = errorDetail
          ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
          : JSON.stringify(orderData);
        throw new Error(errorMessage);
      }
    } catch (error: any) {
      console.error("TACTICAL FRONTEND ERROR:", error);
      alert("PayPal Error: " + error.message);
      throw error;
    }
  };

  const onApprove = async (data: any, actions: any) => {
    try {
      console.log("TACTICAL: User Approved Payment. Capturing ID:", data.orderID);
      
      const response = await fetch("/api/orders/capture", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderID: data.orderID,
        }),
      });

      const orderData = await response.json();
      const errorDetail = orderData?.details?.[0];

      if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
        return actions.restart();
      } else if (errorDetail) {
        throw new Error(`${errorDetail.description} (${orderData.debug_id})`);
      } else if (!orderData.purchase_units) {
        throw new Error(JSON.stringify(orderData));
      } else {
        console.log("TACTICAL: Capture result confirmed:", orderData);
        alert(`Transaction completed successfully! Order ID: ${orderData.id}`);
        
        // Trigger the callback to refresh the dashboard instantly
        if (onPaymentSuccess) {
          onPaymentSuccess();
        } else {
          window.location.reload();
        }
      }
    } catch (error: any) {
      console.error("TACTICAL CAPTURE ERROR:", error);
      alert("Sorry, your transaction could not be processed.");
    }
  };

  if (!mounted) {
    return <div className="min-w-[150px] h-[35px] bg-slate-200 dark:bg-white/5 animate-pulse rounded"></div>;
  }

  if (!clientId) {
    return (
      <div className="min-w-[150px] px-3 py-2 bg-amber-500/10 border border-amber-500/20 rounded flex items-center justify-center">
        <p className="text-amber-500 text-[10px] font-bold uppercase tracking-widest text-center">
          Missing API Key
        </p>
      </div>
    );
  }

  return (
    <div className="min-w-[160px] max-w-[250px] relative z-10 block">
      <PayPalScriptProvider options={{ 
        clientId: clientId,
        currency: "USD",
        intent: "capture",
        components: "buttons", 
      }}>
        <PayPalButtons
          style={{
            shape: "rect",
            layout: "horizontal",
            color: "gold",
            label: "paypal",
            height: 35,
          }}
          createOrder={createOrder}
          onApprove={onApprove}
          onError={(err) => {
            console.error("TACTICAL SDK ERROR:", err);
            alert("PayPal SDK Error: " + JSON.stringify(err));
          }}
        />
      </PayPalScriptProvider>
    </div>
  );
}
