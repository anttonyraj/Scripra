"use client";

import React, { useState } from "react";
import { useSubscription, PlanType } from "@/context/SubscriptionContext";

export default function SettingsPage() {
  const { plan, setPlan, meetingsUsed, meetingsLimit, openUpgradeModal } = useSubscription();
  const [copied, setCopied] = useState(false);

  const plansList: { id: PlanType; name: string; price: string; features: string[] }[] = [
    {
      id: "free",
      name: "Free",
      price: "$0",
      features: ["5 meetings/month", "30 min cap", "3-bullet recap preview", ".txt export"],
    },
    {
      id: "pro",
      name: "Pro",
      price: "$9.99/mo",
      features: ["30 meetings/month", "2 hr cap", "Full AI recap & action items", "Resend email delivery", "Ask Scripra AI"],
    },
    {
      id: "business",
      name: "Business",
      price: "$29/user/mo",
      features: ["Unlimited meetings", "4 hr cap", "Shared workspace", "Cross-meeting memory", "Priority support"],
    },
  ];

  return (
    <div className="p-6 md:p-8 max-w-[900px] mx-auto">
      <div className="mb-8">
        <h1 className="text-[26px] font-bold tracking-tight text-ink mb-1">
          Account &amp; Subscription Settings
        </h1>
        <p className="text-[14px] text-ink-2">
          Manage your Scripra subscription tier, usage quotas, and payment details.
        </p>
      </div>

      {/* Current Subscription Card */}
      <div className="bg-card border border-line rounded-2xl p-6 mb-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-line">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-ink-3 mb-1">
              Active Tier
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[24px] font-bold text-ink capitalize">{plan} Plan</span>
              <span className="text-[11px] font-bold uppercase tracking-wider bg-indigo-wash text-indigo px-2.5 py-0.5 rounded-full">
                {plan === "free" ? "Free Forever" : "Subscribed"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {plan === "free" ? (
              <button
                onClick={() => openUpgradeModal("pro")}
                className="px-5 py-2.5 rounded-xl bg-indigo text-white text-[13px] font-semibold hover:opacity-90 active:scale-[0.99] transition-all shadow-sm"
              >
                Upgrade to Pro ($9.99/mo)
              </button>
            ) : (
              <button
                onClick={() => openUpgradeModal("business")}
                className="px-4 py-2 rounded-xl border border-line text-ink-2 hover:text-ink text-[13px] font-semibold transition-colors"
              >
                Change Plan
              </button>
            )}
          </div>
        </div>

        {/* Quota breakdown */}
        <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <div className="text-[12px] text-ink-3 mb-1">Monthly Meeting Quota</div>
            <div className="text-[18px] font-bold text-ink">
              {meetingsUsed} / {plan === "business" ? "Unlimited" : meetingsLimit}
            </div>
            <div className="text-[11px] text-ink-3 mt-1">Resets on the 1st of each month</div>
          </div>

          <div>
            <div className="text-[12px] text-ink-3 mb-1">Payment Method</div>
            <div className="text-[14px] font-semibold text-ink flex items-center gap-2">
              <span className="text-[18px]">💳</span>
              {plan === "free" ? "No card required" : "Paddle Billing (Active)"}
            </div>
            <div className="text-[11px] text-ink-3 mt-1">
              {plan === "free" ? "Add card when upgrading" : "Billed automatically"}
            </div>
          </div>

          <div>
            <div className="text-[12px] text-ink-3 mb-1">Data Retention</div>
            <div className="text-[14px] font-semibold text-ink">
              {plan === "free" ? "3 days" : plan === "pro" ? "90 days" : "1 full year"}
            </div>
            <div className="text-[11px] text-ink-3 mt-1">Zero-retention policy compliant</div>
          </div>
        </div>
      </div>

      {/* Simulator / Tier Switcher for Testing */}
      <div className="bg-raise border border-line rounded-2xl p-6 mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[14px]">⚡</span>
          <h3 className="text-[14px] font-bold text-ink">
            Subscription Tier Simulator (Preview All Tiers)
          </h3>
        </div>
        <p className="text-[12.5px] text-ink-2 mb-5">
          Switch between plans instantly to test how the dashboard features, gates, and recaps respond for each customer level.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {plansList.map((p) => {
            const isSelected = plan === p.id;
            return (
              <div
                key={p.id}
                onClick={() => setPlan(p.id)}
                className={`cursor-pointer p-4 rounded-xl border transition-all ${
                  isSelected
                    ? "bg-card border-indigo shadow-md scale-[1.02]"
                    : "bg-card/50 border-line hover:border-indigo/50 hover:bg-card"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-[15px] text-ink">{p.name}</span>
                  {isSelected && (
                    <span className="text-[10px] font-bold uppercase bg-indigo text-white px-2 py-0.5 rounded-full">
                      Current
                    </span>
                  )}
                </div>
                <div className="text-[16px] font-bold text-indigo mb-2">{p.price}</div>
                <ul className="space-y-1 text-[11.5px] text-ink-3">
                  {p.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <span className="text-indigo font-bold">·</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      {/* Webhook & Paddle Integration Info */}
      <div className="bg-card border border-line rounded-2xl p-6 shadow-sm">
        <h3 className="text-[15px] font-bold text-ink mb-1">Global Billing Engine (Paddle)</h3>
        <p className="text-[13px] text-ink-2 mb-4">
          Paddle manages automated merchant-of-record sales tax, VAT, GST, and international currency conversions for 190+ countries.
        </p>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 bg-raise rounded-xl border border-line text-[12.5px] font-mono">
          <span className="text-ink-2 truncate">Webhook: https://scripra.com/api/webhooks/paddle</span>
          <button
            onClick={() => {
              navigator.clipboard.writeText("https://scripra.com/api/webhooks/paddle");
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            className="px-3 py-1 bg-card rounded-lg border border-line text-ink font-sans text-[12px] font-medium hover:border-indigo transition-colors flex-shrink-0"
          >
            {copied ? "Copied!" : "Copy URL"}
          </button>
        </div>
      </div>
    </div>
  );
}
