import React from "react";
import { motion } from "motion/react";

interface TextShimmerProps {
  children: React.ReactNode;
  as?: "span" | "p" | "h1" | "h2" | "h3";
  className?: string;
  duration?: number;
  spread?: number;
}

export function TextShimmer({
  children,
  as: Component = "span",
  className = "",
  duration = 2.5,
  spread = 2,
}: TextShimmerProps) {
  return (
    <motion.span
      className={`relative inline-block bg-[length:250%_100%] bg-clip-text text-transparent [background-image:linear-gradient(110deg,currentColor_45%,rgba(255,255,255,0.95)_50%,currentColor_55%)] dark:[background-image:linear-gradient(110deg,currentColor_45%,rgba(255,255,255,0.95)_50%,currentColor_55%)] ${className}`}
      initial={{ backgroundPosition: "100% 0" }}
      animate={{ backgroundPosition: "-100% 0" }}
      transition={{
        repeat: Infinity,
        duration,
        ease: "linear",
      }}
      style={{
        WebkitBackgroundClip: "text",
      }}
    >
      {children}
    </motion.span>
  );
}
