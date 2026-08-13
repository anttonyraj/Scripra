"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    let W = 0;
    let H = 0;
    let t = 0;
    let raf: number | null = null;
    const ribbons: { y: number, len: number, x: number, sp: number, amp: number, ph: number, node: boolean, nodeT: number }[] = [];

    const C = { a: "155,156,255", b: "91,92,240", c: "61,52,196", node: "240,160,42" };

    function readColours() {
      if (typeof window === "undefined") return;
      const cs = getComputedStyle(document.documentElement);
      
      const waveA = cs.getPropertyValue("--wave-a").trim();
      if (waveA) C.a = waveA;
      
      const waveB = cs.getPropertyValue("--wave-b").trim();
      if (waveB) C.b = waveB;
      
      const waveC = cs.getPropertyValue("--wave-c").trim();
      if (waveC) C.c = waveC;
      
      C.node = document.documentElement.getAttribute("data-theme") === "dark"
        ? "245,177,74" : "240,160,42";
    }

    readColours();
    window.addEventListener("scripra-theme-change", readColours);

    function build() {
      ribbons.length = 0;
      const N = 34;
      for (let i = 0; i < N; i++) {
        ribbons.push({
          y: (i + 0.5) / N,
          len: 0.18 + Math.random() * 0.42,
          x: Math.random(),
          sp: 0.00035 + Math.random() * 0.0009,
          amp: 6 + Math.random() * 16,
          ph: Math.random() * Math.PI * 2,
          node: Math.random() < 0.22,
          nodeT: Math.random() * Math.PI * 2,
        });
      }
    }

    function size() {
      if (!cv) return;
      const r = cv.getBoundingClientRect();
      const d = Math.min(window.devicePixelRatio || 1, 2);
      cv.width = r.width * d;
      cv.height = r.height * d;
      W = r.width;
      H = r.height;
      ctx?.setTransform(d, 0, 0, d, 0, 0);
    }

    size();
    build();
    window.addEventListener("resize", size);

    function draw() {
      if (!ctx || !cv) return;
      ctx.clearRect(0, 0, W, H);

      for (const r of ribbons) {
        r.x += r.sp;
        if (r.x > 1.2) r.x = -r.len - 0.1;

        const y0 = r.y * H;
        const x0 = r.x * W;
        const x1 = (r.x + r.len) * W;

        ctx.beginPath();
        for (let x = x0; x <= x1; x += 6) {
          const u = (x - x0) / (x1 - x0 || 1);
          const fade = Math.sin(u * Math.PI);
          const y = y0 + Math.sin(u * 3.1 + t * 0.5 + r.ph) * r.amp * fade;
          if (x === x0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        
        const g = ctx.createLinearGradient(x0, 0, x1, 0);
        g.addColorStop(0, `rgba(${C.a},0)`);
        g.addColorStop(0.28, `rgba(${C.a},.40)`);
        g.addColorStop(0.62, `rgba(${C.b},.30)`);
        g.addColorStop(1, `rgba(${C.c},0)`);
        
        ctx.strokeStyle = g;
        ctx.lineWidth = 1.1;
        ctx.stroke();

        if (r.node) {
          const bx = x1 - (x1 - x0) * 0.16;
          const by = y0 + Math.sin(3.1 * 0.84 + t * 0.5 + r.ph) * r.amp * 0.5;
          const drop = 16 + Math.sin(t * 0.6 + r.nodeT) * 5;
          
          ctx.beginPath();
          ctx.moveTo(bx, by);
          ctx.quadraticCurveTo(bx + 12, by, bx + 20, by + drop);
          ctx.strokeStyle = `rgba(${C.node},.34)`;
          ctx.lineWidth = 1;
          ctx.stroke();

          const pulse = 0.5 + 0.5 * Math.sin(t * 1.4 + r.nodeT);
          ctx.beginPath();
          ctx.arc(bx + 20, by + drop, 2 + pulse * 1.6, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${C.node},${0.30 + pulse * 0.34})`;
          ctx.fill();
        }
      }

      t += 0.012;
      raf = requestAnimationFrame(draw);
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!prefersReducedMotion.matches) {
      draw();
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (prefersReducedMotion.matches) return;
        
        if (e.isIntersecting && !raf) {
          draw();
        } else if (!e.isIntersecting && raf) {
          cancelAnimationFrame(raf);
          raf = null;
        }
      });
    });
    
    observer.observe(cv);

    return () => {
      window.removeEventListener("resize", size);
      window.removeEventListener("scripra-theme-change", readColours);
      if (raf) cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="relative min-h-[84vh] overflow-hidden flex items-center justify-center px-6 py-20 mt-20">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
      <div className="relative z-10 text-center max-w-[900px] mx-auto pointer-events-none">
        <div className="inline-block text-[11.5px] font-semibold tracking-[0.22em] uppercase text-indigo bg-card border border-line rounded-full px-5 py-2 mb-8 pointer-events-auto">
          AI conversation intelligence
        </div>
        <h1 className="text-[clamp(40px,6.6vw,78px)] font-bold tracking-[-0.035em] leading-[1.02] mb-5">
          Every conversation,<br />remembered.
        </h1>
        <div className="text-[clamp(19px,2.4vw,27px)] font-semibold tracking-[-0.015em] mb-5 text-indigo-deep">
          Capture. Understand. Act. Recall.
        </div>
        <p className="text-[17px] leading-[1.65] text-ink-2 max-w-[620px] mx-auto mb-[38px]">
          Scripra turns meetings, calls and lectures into searchable transcripts,
          recaps, decisions, action items, commitments and organisational memory.
        </p>
        <div className="flex gap-3 justify-center flex-wrap pointer-events-auto">
          <Link
            href="/demo"
            className="text-[15px] font-semibold px-7 py-3.5 rounded-[10px] border border-transparent bg-indigo text-white hover:bg-[#6E6FF5] transition-all hover:-translate-y-[1px]"
          >
            Try the demo
          </Link>
          <Link
            href="/company"
            className="text-[15px] font-semibold px-7 py-3.5 rounded-[10px] border border-line bg-card text-ink hover:border-indigo-deep transition-all hover:-translate-y-[1px]"
          >
            Scripra for business
          </Link>
        </div>
      </div>
    </div>
  );
}
