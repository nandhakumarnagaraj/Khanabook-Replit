import React from "react";
import { motion, HTMLMotionProps } from "motion/react";

interface ShinyButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  className?: string;
  variant?: "brand" | "dark" | "outline";
}

export function ShinyButton({
  children,
  className = "",
  variant = "brand",
  ...props
}: ShinyButtonProps) {
  const baseStyles =
    "relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl font-bold px-6 py-3 transition-all duration-300 text-sm md:text-base cursor-pointer select-none group";

  const variantStyles = {
    brand:
      "bg-gradient-to-r from-[#dc2626] via-[#e11d48] to-[#ea580c] text-white shadow-lg shadow-red-500/25 hover:shadow-red-500/40 hover:scale-[1.02] active:scale-[0.98]",
    dark: "bg-neutral-900 text-white shadow-lg shadow-black/20 hover:shadow-black/30 hover:scale-[1.02] active:scale-[0.98] border border-neutral-800",
    outline:
      "bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md text-foreground border border-border shadow-sm hover:border-brand/40 hover:scale-[1.02] active:scale-[0.98]",
  };

  return (
    <motion.button
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {/* Specular shimmer sweep beam */}
      <motion.div
        className="pointer-events-none absolute -inset-full w-[200%] h-[200%] rotate-45 bg-gradient-to-r from-transparent via-white/25 to-transparent"
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{
          repeat: Infinity,
          repeatDelay: 2.5,
          duration: 1.6,
          ease: "easeInOut",
        }}
      />

      {/* Button content */}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  );
}
