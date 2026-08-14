"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

interface LogoProps {
  variant?: "primary" | "inverse";
  className?: string;
  disableAnimation?: boolean;
}

export default function Logo({ variant = "primary", className = "", disableAnimation = false }: LogoProps) {
  const containerRef = useRef<HTMLAnchorElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (disableAnimation) return;

    const root = containerRef.current;
    if (!root) return;

    const playLogo = () => {
      // Respect prefers-reduced-motion
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const lines = root.querySelectorAll<SVGPathElement>(".ln");
      const s = root.querySelector<SVGPathElement>(".sc");
      const node = root.querySelector<SVGCircleElement>(".nd");

      if (!s || !node) return;

      lines.forEach((p, i) => {
        const len = p.getTotalLength();
        p.style.strokeDasharray = len.toString();
        p.style.strokeDashoffset = len.toString();
        p.style.opacity = "1";
        p.animate(
          [{ strokeDashoffset: len }, { strokeDashoffset: 0 }],
          { duration: 420, delay: i * 110, easing: "cubic-bezier(.4,0,.2,1)", fill: "forwards" }
        );
      });

      const hold = lines.length * 110 + 420;

      lines.forEach((p) => {
        p.animate(
          [{ opacity: 1 }, { opacity: 0 }],
          { duration: 340, delay: hold + 180, easing: "ease", fill: "forwards" }
        );
      });

      const sLen = s.getTotalLength();
      s.style.strokeDasharray = sLen.toString();
      s.style.strokeDashoffset = sLen.toString();
      s.animate(
        [{ opacity: 1, strokeDashoffset: sLen }, { opacity: 1, strokeDashoffset: 0 }],
        { duration: 700, delay: hold + 240, easing: "cubic-bezier(.4,0,.2,1)", fill: "forwards" }
      );

      node.animate(
        [
          { opacity: 0, transform: "scale(.2)", transformOrigin: "31.5px 31px" },
          { opacity: 1, transform: "scale(1.5)", offset: 0.6, transformOrigin: "31.5px 31px" },
          { opacity: 1, transform: "scale(1)", transformOrigin: "31.5px 31px" },
        ],
        { duration: 620, delay: hold + 900, easing: "cubic-bezier(.34,1.5,.5,1)", fill: "forwards" }
      );

      timeoutRef.current = setTimeout(playLogo, 4000);
    };

    // Play on mount
    playLogo();

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [disableAnimation]);

  const isPrimary = variant === "primary";

  return (
    <Link
      href="/"
      ref={containerRef}
      className={`inline-flex items-center gap-[13px] cursor-pointer ${className}`}
      aria-label="Scripra Home"
    >
      <svg className="w-10 h-10 flex-shrink-0" viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <g strokeLinecap="round" fill="none">
          <path className="ln opacity-0" d="M9 9 H31" stroke={isPrimary ? "var(--indigo-lift)" : "#6E6FF5"} strokeWidth="3" />
          <path className="ln opacity-0" d="M9 16.5 H26" stroke={isPrimary ? "var(--indigo)" : "var(--indigo-lift)"} strokeWidth="3" />
          <path className="ln opacity-0" d="M14 23.5 H31" stroke={isPrimary ? "var(--indigo)" : "var(--indigo-lift)"} strokeWidth="3" />
          <path className="ln opacity-0" d="M9 31 H31" stroke={isPrimary ? "var(--indigo-deep)" : "#FFFFFF"} strokeWidth="3" />
          
          {/* Fallback state (opacity 1) for when JS is disabled or animation hasn't run */}
          <path
            className="sc"
            d="M30 10.5 C30 6.5 10 6.5 10 14 C10 20.5 30 19.5 30 26 C30 33.5 10 33.5 10 29.5"
            stroke={isPrimary ? "var(--indigo)" : "#FFFFFF"}
            strokeWidth="3.4"
            opacity={disableAnimation ? 1 : 0}
          />
        </g>
        <circle
          className="nd"
          cx="31.5"
          cy="31"
          r="3.4"
          fill="var(--amber)"
          opacity={disableAnimation ? 1 : 0}
        />
      </svg>
      <div className="flex flex-col">
        <div className={`text-[26px] font-bold tracking-[-0.03em] leading-none whitespace-nowrap ${isPrimary ? "text-ink" : "text-white"}`}>
          Scripra AI
        </div>
      </div>
    </Link>
  );
}
