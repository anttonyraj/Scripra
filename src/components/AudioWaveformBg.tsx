"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function AudioWaveformBg() {
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
    <div className="absolute top-0 left-0 w-[90px] md:w-[150px] h-full overflow-hidden pointer-events-none z-0 flex flex-col justify-between py-10 opacity-70">
      {baseWidths.map((width, i) => (
        <motion.div
          key={i}
          className="h-[3.5px] md:h-[5px] bg-gradient-to-r from-indigo/55 via-indigo/35 to-transparent rounded-r-full"
          initial={{ width: "0%" }}
          animate={{ 
            width: mounted ? [`${width * 0.75}%`, `${width}%`, `${width * 0.8}%`] : "0%",
            opacity: mounted ? [0.4, 0.8, 0.4] : 0
          }}
          transition={{
            duration: 2.2 + (i % 4) * 0.5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: (i % 8) * 0.12,
          }}
        />
      ))}
    </div>
  );
}
