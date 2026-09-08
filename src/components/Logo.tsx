"use client";

import React from "react";
import Link from "next/link";

interface LogoProps {
  variant?: "primary" | "inverse";
  className?: string;
  showTagline?: boolean;
}

export default function Logo({
  variant = "primary",
  className = "",
}: LogoProps) {
  const isPrimary = variant === "primary";

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2.5 cursor-pointer select-none group ${className}`}
      aria-label="Scripra Home"
    >
      <style jsx>{`
        /* Smooth, living levitation & breathing glow */
        @keyframes sLevitatePulse {
          0%, 100% {
            transform: translateY(0px) scale(1);
            filter: drop-shadow(0 2px 4px rgba(59, 74, 240, 0.25));
          }
          50% {
            transform: translateY(-2px) scale(1.03);
            filter: drop-shadow(0 4px 16px rgba(59, 74, 240, 0.6));
          }
        }

        /* Continuous voice wave sonar ring expanding from behind the logo */
        @keyframes soundWavePing {
          0% {
            transform: scale(0.65);
            opacity: 0.7;
          }
          50% {
            opacity: 0.35;
          }
          100% {
            transform: scale(1.65);
            opacity: 0;
          }
        }

        /* Luminous reflective data sheen sweeping across the curvy S */
        @keyframes sGlossSheen {
          0% {
            transform: translateX(-140%) skewX(-25deg);
            opacity: 0;
          }
          15% {
            opacity: 0.8;
          }
          50% {
            opacity: 0.8;
          }
          70% {
            transform: translateX(180%) skewX(-25deg);
            opacity: 0;
          }
          100% {
            transform: translateX(180%) skewX(-25deg);
            opacity: 0;
          }
        }

        /* Amber beacon radar ripple pulse */
        @keyframes amberBeacon {
          0% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(245, 160, 32, 0.75);
          }
          60% {
            transform: scale(1.15);
            box-shadow: 0 0 0 8px rgba(245, 160, 32, 0);
          }
          100% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(245, 160, 32, 0);
          }
        }

        .s-mark-container {
          animation: sLevitatePulse 3.8s ease-in-out infinite;
        }

        .sonar-ring {
          animation: soundWavePing 3.2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        .sonar-ring-2 {
          animation: soundWavePing 3.2s cubic-bezier(0, 0, 0.2, 1) 1.6s infinite;
        }

        .gloss-sheen {
          animation: sGlossSheen 3.6s ease-in-out infinite;
        }

        .beacon-dot {
          animation: amberBeacon 2.4s infinite cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>

      {/* The EXACT Curvy S Logo Icon with Dynamic Soundwave & Sheen Animations */}
      <div className="s-mark-container relative w-[30px] h-[36px] flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-115">
        
        {/* Concentric Voice Audio Waves Radiating Behind Logo */}
        <div className="sonar-ring absolute inset-0 -m-1 rounded-full border border-indigo/40 pointer-events-none" />
        <div className="sonar-ring-2 absolute inset-0 -m-1 rounded-full border border-teal/40 pointer-events-none" />

        {/* The Exact Curvy S Image */}
        <div className="relative w-full h-full overflow-hidden rounded-[8px]">
          <img
            src="/scripra-curvy-s-hd.png"
            alt="Scripra Logo"
            width={30}
            height={36}
            className={`w-full h-full object-contain select-none pointer-events-none ${
              !isPrimary ? "brightness-125 saturate-110" : ""
            }`}
          />

          {/* Luminous Traveling Light Sheen Across the S */}
          <div className="gloss-sheen absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />
        </div>
      </div>

      {/* Wordmark + Amber Beacon Dot */}
      <div className="flex flex-col justify-center">
        <div className="flex items-baseline leading-none">
          <span
            className={`text-[23px] font-extrabold tracking-[-0.035em] transition-all duration-300 ${
              isPrimary ? "text-ink group-hover:text-indigo" : "text-white"
            }`}
          >
            Scripra
          </span>

          {/* Warm Amber Beacon Dot */}
          <span
            className="beacon-dot w-2.5 h-2.5 rounded-full bg-amber inline-block ml-1 flex-shrink-0 transition-transform duration-300 group-hover:scale-135"
            style={{
              boxShadow: "0 0 10px rgba(245, 160, 32, 0.7)",
            }}
          />
        </div>


      </div>
    </Link>
  );
}
