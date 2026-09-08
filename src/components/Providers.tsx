"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { SubscriptionProvider } from "@/context/SubscriptionContext";
import UpgradeModal from "@/components/UpgradeModal";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <SubscriptionProvider>
        {children}
        <UpgradeModal />
      </SubscriptionProvider>
    </SessionProvider>
  );
}

