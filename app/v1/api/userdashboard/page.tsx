"use client";

import React, { useEffect, useState, Suspense } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { Activity, Shield, CheckCircle2, FileText, Download } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PayPalCheckout from "@/components/PayPalCheckout";
import UPIDirectPayment from "@/components/UPIDirectPayment";
import PayUCheckout from "@/components/PayUCheckout";
import { getUserDashboardData } from "./dashboard-actions";

const SERVICES = [
  { id: "audit_protocol", name: "OPTIAPP Initial Audit Protocol", price: "1.00", date: "Mar 16, 2026", inv: "#INV-2026-001" },
  { id: "keyword_matrix", name: "Priority Keyword Matrix (Add-on)", price: "1.00", date: "Mar 14, 2026", inv: "#INV-2026-002" },
];

function DashboardContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<any>(null);

  async function refreshData() {
    console.log("TACTICAL FRONTEND: refreshing data for ID:", id);
    if (id) {
      const data = await getUserDashboardData(id);
      console.log("TACTICAL FRONTEND: Received data:", data);
      setDashboardData(data);
    }
  }

  useEffect(() => {
    async function init() {
      await refreshData();
      setIsLoading(false);
    }
    init();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#050505] transition-colors duration-500 flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-8" />
        <p className="text-primary font-black uppercase tracking-widest text-sm animate-pulse">Initializing Tactical Display...</p>
      </div>
    );
  }

  const payments = dashboardData?.payments || [];
  const userName = dashboardData?.user?.username || "AWAITING_ASSIGNMENT";

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#050505] transition-colors duration-500 selection:bg-primary/30 text-slate-900 dark:text-white overflow-x-hidden flex flex-col">
      <Navbar />

      <main className="flex-1 pt-32 pb-24 px-6 relative z-10 w-full">
        {/* Atmosphere */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[500px] bg-primary/10 blur-[120px] rounded-full opacity-50" />
          <div className="absolute inset-0 opacity-[0.02] data-grid dark:invert-0 invert" />
        </div>

        <div className="max-w-[1400px] mx-auto w-full relative z-10">
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-4"
              >
                <Shield size={12} />
                Clearance Level: Alpha
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none"
              >
                Mission Control
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-slate-400 font-medium mt-4 text-lg"
              >
                Operative: <span className="text-white font-mono">{userName}</span>
              </motion.p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-8 bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 rounded-3xl p-6 md:p-8 shadow-sm dark:shadow-none backdrop-blur-xl relative overflow-hidden transition-colors duration-500"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white/90 tracking-tight transition-colors duration-500">Order history</h2>
              <button className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 font-bold text-xs uppercase tracking-widest flex items-center gap-2 transition-colors">
                <Activity size={14} /> Refund requests
              </button>
            </div>

            <div className="w-full overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-white/10 transition-colors duration-500">
                    <th className="py-4 px-2 text-[10px] font-black uppercase tracking-widest text-slate-500 whitespace-nowrap">Date</th>
                    <th className="py-4 px-2 text-[10px] font-black uppercase tracking-widest text-slate-500 whitespace-nowrap">Description</th>
                    <th className="py-4 px-2 text-[10px] font-black uppercase tracking-widest text-slate-500 whitespace-nowrap">Price</th>
                    <th className="py-4 px-2 text-[10px] font-black uppercase tracking-widest text-slate-500 whitespace-nowrap">Status</th>
                    <th className="py-4 px-2 text-[10px] font-black uppercase tracking-widest text-slate-500 whitespace-nowrap">Invoice</th>
                    <th className="py-4 px-2 text-[10px] font-black uppercase tracking-widest text-slate-500 whitespace-nowrap">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {SERVICES.map((service) => {
                    const payment = payments.find((p: any) => p.item_id === service.id);
                    const isPaid = payment && (payment.payment_status === 'COMPLETED' || payment.payment_status === 'completed');

                    return (
                      <tr key={service.id} className="border-b border-slate-100 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors duration-300 group">
                        <td className="py-5 px-2 text-sm font-medium text-slate-700 dark:text-slate-300 whitespace-nowrap">{service.date}</td>
                        <td className="py-5 px-2 text-sm font-bold text-slate-900 dark:text-white max-w-[200px] truncate">{service.name}</td>
                        <td className="py-5 px-2 text-sm font-mono text-slate-700 dark:text-slate-300 transition-colors duration-500">${service.price}</td>
                        <td className="py-5 px-2">
                          {isPaid ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/10 text-green-600 dark:text-green-500 text-[10px] font-black uppercase tracking-wider">
                              <div className="w-1.5 h-1.5 rounded-full bg-green-500" /> Done
                            </span>
                          ) : payment?.payment_status === 'PENDING_VERIFICATION' ? (
                            <div className="flex flex-col items-start gap-1">
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-500 text-[10px] font-black uppercase tracking-wider animate-pulse">
                                <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" /> Verifying...
                              </span>
                              <span className="text-[8px] font-mono text-slate-400 pl-1">ID: {payment.transactionid}</span>
                            </div>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-500 text-[10px] font-black uppercase tracking-wider">
                              <div className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Pending
                            </span>
                          )}
                        </td>
                        <td className="py-5 px-2 text-sm font-medium text-slate-500 dark:text-slate-400">{service.inv}</td>
                        <td className="py-5 px-2">
                          {isPaid ? (() => {
                            // Find delivery for this specific service
                            const delivery = (dashboardData?.deliveredKeywords || []).find((k: any) => k.item_id === service.id);
                            const hasDelivery = delivery && delivery.keyword_upload;

                            return hasDelivery ? (
                              <button 
                                onClick={() => {
                                  if (delivery.keyword_upload.startsWith('data:')) {
                                    // Handle base64
                                    const win = window.open();
                                    win?.document.write(`<iframe src="${delivery.keyword_upload}" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>`);
                                  } else {
                                    // Handle URL
                                    window.open(delivery.keyword_upload, '_blank');
                                  }
                                }}
                                className="group inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-primary/90 to-primary text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300 active:scale-95 border border-primary/20"
                              >
                                <FileText size={14} className="group-hover:rotate-6 transition-transform opacity-90" />
                                <span>View Keywords</span>
                                <Download size={12} className="opacity-50 group-hover:opacity-100 group-hover:translate-y-0.5 transition-all ml-1" />
                              </button>
                            ) : (
                              <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest italic">
                                Processing Delivery...
                              </span>
                            );
                          })() : payment?.payment_status === 'PENDING_VERIFICATION' ? (
                            <div className="text-[10px] font-black text-cyan-500 uppercase tracking-widest bg-cyan-500/5 p-2 rounded-lg border border-cyan-500/10 text-center">
                              Protocol Verifying...
                            </div>
                          ) : (
                            <div className="flex flex-col gap-2 min-w-[180px]">
                              {dashboardData?.user?.id ? (
                                <div className="flex flex-col gap-3">
                                  <div className="space-y-1">
                                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest pl-1">Global Protocol</span>
                                    <PayPalCheckout amount={service.price} itemId={service.id} userId={dashboardData.user.id} onPaymentSuccess={refreshData} />
                                  </div>
                                  <div className="space-y-1">
                                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest pl-1">Domestic Protocol</span>
                                    <UPIDirectPayment
                                      amount={service.price}
                                      itemId={service.id}
                                      userId={dashboardData.user.id}
                                      userEmail={dashboardData.user.email}
                                      userName={dashboardData.user.username}
                                      onPaymentSuccess={refreshData}
                                    />
                                  </div>
                                </div>
                              ) : (
                                <div className="space-y-3">
                                  <div className="h-10 w-40 bg-slate-200 dark:bg-white/5 animate-pulse rounded-xl" />
                                  <div className="h-10 w-40 bg-slate-200 dark:bg-white/5 animate-pulse rounded-xl" />
                                </div>
                              )}
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function UserDashboard() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 dark:bg-[#050505] flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-8" />
        <p className="text-primary font-black uppercase tracking-widest text-sm animate-pulse">Initializing Tactical Display...</p>
      </div>
    }>
      <DashboardContent />
    </Suspense>
  );
}
