import React from "react";
import { motion, HTMLMotionProps } from "motion/react";

interface UiVerseGlowingButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  variant?: "brand" | "emerald" | "blue" | "white";
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function UiVerseGlowingButton({
  children,
  variant = "brand",
  className = "",
  size = "md",
  ...props
}: UiVerseGlowingButtonProps) {
  const sizeClasses = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-7 py-3.5 text-base",
  };

  const glowColors = {
    brand: "from-brand via-amber-500 to-rose-600",
    emerald: "from-emerald-400 via-teal-500 to-green-600",
    blue: "from-blue-500 via-indigo-500 to-cyan-400",
    white: "from-white via-gray-200 to-gray-400",
  };

  const shadowColors = {
    brand: "hover:shadow-[0_0_25px_rgba(225,29,72,0.4)]",
    emerald: "hover:shadow-[0_0_25px_rgba(16,185,129,0.4)]",
    blue: "hover:shadow-[0_0_25px_rgba(59,130,246,0.4)]",
    white: "hover:shadow-[0_0_25px_rgba(255,255,255,0.3)]",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className={`relative inline-flex items-center justify-center rounded-full p-[1.5px] overflow-hidden font-bold cursor-pointer group transition-all duration-300 ${shadowColors[variant]} ${className}`}
      {...props}
    >
      {/* 1. ANIMATED ROTATING CONIC-GRADIENT BORDER (UIVERSE SIGNATURE) */}
      <span
        aria-hidden
        className={`absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#000000_0%,#ffffff_50%,#000000_100%)] opacity-30 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r ${glowColors[variant]}`}
      />

      {/* 2. INNER BUTTON SURFACE */}
      <span
        className={`relative z-10 inline-flex w-full h-full items-center justify-center gap-2 rounded-full font-bold transition-all duration-300 select-none ${
          variant === "white"
            ? "bg-white text-[#131314] hover:bg-gray-100"
            : "bg-[#1E1F20] text-white hover:bg-[#28292A]"
        } ${sizeClasses[size]}`}
      >
        {/* Subtle interior light sheen */}
        <span
          aria-hidden
          className="absolute inset-0 rounded-full bg-gradient-to-b from-white/10 to-transparent pointer-events-none"
        />
        {children}
      </span>
    </motion.button>
  );
}
