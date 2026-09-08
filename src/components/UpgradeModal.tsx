"use client";

import React, { useState } from "react";
import { useSubscription, PlanType } from "@/context/SubscriptionContext";

export default function UpgradeModal() {
  const { isUpgradeModalOpen, closeUpgradeModal, targetPlan, setPlan } = useSubscription();
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isUpgradeModalOpen) return null;

  const selectedTier = targetPlan === "business" ? "business" : "pro";

  const pricing = {
    pro: {
      monthly: "$9.99",
      annual: "$7.99",
      period: "/month",
      annualTotal: "$95.88 / year (Save 20%)",
    },
    business: {
      monthly: "$29",
      annual: "$22",
      period: "/user/mo",
      annualTotal: "$264 / user / year (Save 24%)",
    },
  };

  const handleCheckout = () => {
    setIsProcessing(true);
    // Simulating Paddle.Checkout.open() workflow
    setTimeout(() => {
      setPlan(selectedTier);
      setIsProcessing(false);
      setSuccessMsg(`Welcome to Scripra ${selectedTier.toUpperCase()}! Your subscription is active.`);
      setTimeout(() => {
        setSuccessMsg(null);
        closeUpgradeModal();
      }, 1500);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-card border border-line rounded-2xl w-full max-w-[500px] overflow-hidden shadow-2xl relative">
        {/* Close Button */}
        <button
          onClick={closeUpgradeModal}
          className="absolute top-4 right-4 text-ink-3 hover:text-ink transition-colors p-1 rounded-lg"
          aria-label="Close modal"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Content */}
        <div className="p-7">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-indigo-wash text-indigo text-[11px] font-bold uppercase tracking-wider mb-3">
            ⭐ Upgrade to {selectedTier.toUpperCase()}
          </div>
          <h2 className="text-[22px] font-bold text-ink tracking-tight mb-2">
            Unlock Full AI Intelligence
          </h2>
          <p className="text-[13.5px] text-ink-2 mb-6">
            Get executive recaps, action items, owner &amp; deadline extraction, and email recaps delivered automatically.
          </p>

          {/* Billing Cycle Switcher */}
          <div className="flex bg-raise p-1 rounded-xl mb-6 border border-line">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`flex-1 py-1.5 text-[13px] font-semibold rounded-lg transition-all ${
                billingCycle === "monthly" ? "bg-card text-ink shadow-sm" : "text-ink-2 hover:text-ink"
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle("annual")}
              className={`flex-1 py-1.5 text-[13px] font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                billingCycle === "annual" ? "bg-card text-ink shadow-sm" : "text-ink-2 hover:text-ink"
              }`}
            >
              Annual Billing
              <span className="text-[10px] font-bold bg-amber-wash text-amber px-1.5 py-0.5 rounded-full">
                SAVE 20%
              </span>
            </button>
          </div>

          {/* Price Box */}
          <div className="bg-raise border border-line rounded-xl p-4 mb-6 flex items-center justify-between">
            <div>
              <div className="text-[12px] font-medium text-ink-3">Plan selected</div>
              <div className="text-[16px] font-bold text-ink capitalize">{selectedTier} Plan</div>
            </div>
            <div className="text-right">
              <div className="text-[26px] font-bold text-ink leading-none">
                {pricing[selectedTier][billingCycle]}
                <span className="text-[12px] font-normal text-ink-3">
                  {pricing[selectedTier].period}
                </span>
              </div>
              {billingCycle === "annual" && (
                <div className="text-[11px] font-medium text-amber mt-1">
                  {pricing[selectedTier].annualTotal}
                </div>
              )}
            </div>
          </div>

          {/* Feature highlights */}
          <ul className="space-y-2.5 mb-7">
            <li className="flex items-center gap-2.5 text-[13.5px] text-ink-2">
              <span className="text-indigo font-bold">✓</span>
              {selectedTier === "pro" ? "30 meetings/month (2 hrs each)" : "Unlimited meetings (4 hrs each)"}
            </li>
            <li className="flex items-center gap-2.5 text-[13.5px] text-ink-2">
              <span className="text-indigo font-bold">✓</span>
              Full structured AI summary &amp; Minutes of Meeting (MoM)
            </li>
            <li className="flex items-center gap-2.5 text-[13.5px] text-ink-2">
              <span className="text-indigo font-bold">✓</span>
              Auto-extracted Action Items with owners &amp; deadlines
            </li>
            <li className="flex items-center gap-2.5 text-[13.5px] text-ink-2">
              <span className="text-indigo font-bold">✓</span>
              Instant email delivery via Resend
            </li>
            <li className="flex items-center gap-2.5 text-[13.5px] text-ink-2">
              <span className="text-teal font-bold">✓</span>
              <span>50+ Language Translation powered by <strong className="text-indigo">Scripra Multilingual AI</strong></span>
            </li>
          </ul>

          {/* Checkout Button */}
          {successMsg ? (
            <div className="p-3 bg-teal-wash border border-teal text-teal text-[13.5px] font-semibold rounded-xl text-center">
              ✓ {successMsg}
            </div>
          ) : (
            <button
              onClick={handleCheckout}
              disabled={isProcessing}
              className="w-full py-3 px-4 rounded-xl bg-indigo text-white font-semibold text-[14px] hover:opacity-90 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo/20 disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Connecting to Paddle Secure Checkout...
                </>
              ) : (
                <>
                  Subscribe with Paddle — {pricing[selectedTier][billingCycle]}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </button>
          )}

          {/* Paddle reassurance */}
          <div className="flex items-center justify-center gap-2 mt-4 text-[11px] text-ink-3">
            <svg className="w-3.5 h-3.5 text-indigo" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span>Secured by Paddle (Handles global VAT/GST &amp; 190+ currencies)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
