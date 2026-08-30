"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function AudioWaveformBg() {
  // Use a fixed pseudo-random array for SSR consistency
  const baseWidths = [
    32, 54, 21, 67, 89, 43, 12, 55, 78, 34,
    22, 90, 65, 43, 15, 76, 88, 54, 32, 19,
    45, 67, 23, 89, 56, 34, 12, 78, 90, 45,
    33, 66, 22, 77, 88, 44, 11, 55, 99, 22,
    41, 62, 28, 81, 59, 37, 18, 72, 94, 48,
    27, 51, 19, 63, 85, 49, 14, 58, 74, 39
  ];

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="absolute top-0 left-0 w-[80px] md:w-[140px] h-full overflow-hidden pointer-events-none z-0 flex flex-col gap-[6px] md:gap-[8px] py-20 opacity-50">
      {baseWidths.map((width, i) => (
        <motion.div
          key={i}
          className="h-[4px] md:h-[6px] bg-indigo/40 rounded-r-full"
          initial={{ width: "0%" }}
          animate={{ 
            width: mounted ? `${width}%` : "0%",
            opacity: mounted ? 1 : 0
          }}
          transition={{
            duration: 1.5,
            delay: i * 0.02,
            ease: "easeOut"
          }}
        />
      ))}
    </div>
  );
}
