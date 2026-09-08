"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSubscription } from "@/context/SubscriptionContext";

interface ActionItem {
  id: string;
  task: string;
  owner: string;
  deadline: string;
  meeting: string;
  completed: boolean;
}

const initialActions: ActionItem[] = [
  {
    id: "1",
    task: "Finish Edge DOM mutation testing for Chromium audio stream pipeline",
    owner: "Michael",
    deadline: "Thursday 5 PM",
    meeting: "Product Review — August Release & Roadmap",
    completed: false,
  },
  {
    id: "2",
    task: "Draft stakeholder communication regarding revised Friday go-live schedule",
    owner: "Sarah",
    deadline: "Wednesday",
    meeting: "Product Review — August Release & Roadmap",
    completed: false,
  },
  {
    id: "3",
    task: "Escalate security audit sign-off with compliance officer",
    owner: "Antony",
    deadline: "Today",
    meeting: "Product Review — August Release & Roadmap",
    completed: false,
  },
];

export default function ActionsPage() {
  const { plan } = useSubscription();
  const [actions, setActions] = useState<ActionItem[]>(initialActions);

  const toggleTask = (id: string) => {
    setActions((prev) =>
      prev.map((a) => (a.id === id ? { ...a, completed: !a.completed } : a))
    );
  };

  const pendingCount = actions.filter((a) => !a.completed).length;

  return (
    <div className="p-6 md:p-8 max-w-[1000px] mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-[26px] font-bold tracking-tight text-ink mb-1">
            Action Items &amp; Commitments
          </h1>
          <p className="text-[14px] text-ink-2">
            Every commitment and deliverable automatically extracted and assigned by Scripra AI.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-wash text-amber text-[12px] font-bold self-start sm:self-auto">
          <span>{pendingCount} Pending Commitments</span>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {actions.map((act) => (
          <div
            key={act.id}
            onClick={() => toggleTask(act.id)}
            className={`cursor-pointer bg-card border rounded-2xl p-5 transition-all shadow-sm flex items-start gap-4 ${
              act.completed ? "border-line opacity-60" : "border-line hover:border-amber"
            }`}
          >
            {/* Checkbox */}
            <div
              className={`w-5 h-5 rounded-md border-2 mt-0.5 flex items-center justify-center transition-colors flex-shrink-0 ${
                act.completed
                  ? "bg-teal border-teal text-white"
                  : "border-line-hi hover:border-amber"
              }`}
            >
              {act.completed && (
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>

            {/* Task Content */}
            <div className="flex-1 min-w-0">
              <div
                className={`text-[15px] font-semibold transition-all ${
                  act.completed ? "line-through text-ink-3" : "text-ink"
                }`}
              >
                {act.task}
              </div>

              <div className="flex flex-wrap items-center gap-3 mt-2 text-[12px]">
                <span className="font-semibold text-indigo bg-indigo-wash px-2 py-0.5 rounded-md">
                  @{act.owner}
                </span>
                <span className="font-mono text-amber bg-amber-wash px-2 py-0.5 rounded-md font-medium">
                  Due: {act.deadline}
                </span>
                <span className="text-ink-3 font-mono">
                  {act.meeting}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
