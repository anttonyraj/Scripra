"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type PlanType = "free" | "pro" | "business" | "enterprise";

interface SubscriptionContextType {
  plan: PlanType;
  setPlan: (plan: PlanType) => void;
  meetingsUsed: number;
  meetingsLimit: number;
  isUpgradeModalOpen: boolean;
  openUpgradeModal: (targetPlan?: PlanType) => void;
  closeUpgradeModal: () => void;
  targetPlan: PlanType;
}

const planLimits: Record<PlanType, number> = {
  free: 5,
  pro: 30,
  business: 999, // unlimited
  enterprise: 9999,
};

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  const [plan, setPlanState] = useState<PlanType>("free");
  const [meetingsUsed, setMeetingsUsed] = useState<number>(2);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState<boolean>(false);
  const [targetPlan, setTargetPlan] = useState<PlanType>("pro");

  // Load persisted plan for testing if available
  useEffect(() => {
    try {
      const saved = localStorage.getItem("scripra_user_plan");
      if (saved && ["free", "pro", "business", "enterprise"].includes(saved)) {
        setPlanState(saved as PlanType);
      }
    } catch (e) {}
  }, []);

  const setPlan = (newPlan: PlanType) => {
    setPlanState(newPlan);
    try {
      localStorage.setItem("scripra_user_plan", newPlan);
    } catch (e) {}
  };

  const openUpgradeModal = (planToTarget: PlanType = "pro") => {
    setTargetPlan(planToTarget);
    setIsUpgradeModalOpen(true);
  };

  const closeUpgradeModal = () => {
    setIsUpgradeModalOpen(false);
  };

  return (
    <SubscriptionContext.Provider
      value={{
        plan,
        setPlan,
        meetingsUsed,
        meetingsLimit: planLimits[plan],
        isUpgradeModalOpen,
        openUpgradeModal,
        closeUpgradeModal,
        targetPlan,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error("useSubscription must be used within a SubscriptionProvider");
  }
  return context;
}
