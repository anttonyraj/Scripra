"use client";

import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
  duration?: number;
  margin?: string;
}

export default function ScrollReveal({
  children,
  delay = 0,
  direction = "up",
  className = "",
  duration = 0.8,
  margin = "-50px",
}: ScrollRevealProps) {
  const directionOffset = 60;
  
  const variants: Variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? directionOffset : direction === "down" ? -directionOffset : 0,
      x: direction === "left" ? directionOffset : direction === "right" ? -directionOffset : 0,
      filter: "blur(10px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      filter: "blur(0px)",
      transition: {
        duration: duration,
        delay: delay,
        ease: [0.16, 1, 0.3, 1], // Custom extremely smooth easing
      },
    },
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
