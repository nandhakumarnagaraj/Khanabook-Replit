import React from "react";
import { motion } from "motion/react";
import { useTheme } from "@/lib/theme-provider";

export function UiVerseThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
      className={`relative inline-flex h-8 w-15 shrink-0 cursor-pointer items-center rounded-full p-1 transition-colors duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand select-none ${
        isDark
          ? "bg-gradient-to-r from-[#0f172a] via-[#1e1b4b] to-[#172554] border border-blue-400/20 shadow-inner"
          : "bg-gradient-to-r from-[#38bdf8] via-[#60a5fa] to-[#93c5fd] border border-amber-300/40 shadow-inner"
      } ${className}`}
    >
      {/* BACKGROUND SKY ELEMENTS */}
      <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
        {/* Night Stars (visible in dark mode) */}
        <motion.div
          animate={{ opacity: isDark ? 1 : 0, scale: isDark ? 1 : 0.5 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0"
        >
          {/* Star 1 */}
          <span className="absolute top-2 left-3 h-1 w-1 rounded-full bg-white animate-pulse" />
          {/* Star 2 */}
          <span className="absolute bottom-2 left-5 h-1.5 w-1.5 rounded-full bg-blue-200/80" />
          {/* Star 3 */}
          <span className="absolute top-3.5 left-7 h-0.5 w-0.5 rounded-full bg-white" />
        </motion.div>

        {/* Day Clouds (visible in light mode) */}
        <motion.div
          animate={{ opacity: isDark ? 0 : 1, y: isDark ? 6 : 0 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0"
        >
          {/* Cloud fluff 1 */}
          <span className="absolute bottom-1 right-2.5 h-2.5 w-4 rounded-full bg-white/70 blur-[0.5px]" />
          {/* Cloud fluff 2 */}
          <span className="absolute top-1.5 right-5 h-2 w-3 rounded-full bg-white/60 blur-[0.5px]" />
        </motion.div>
      </div>

      {/* SLIDING CELESTIAL ORB (SUN / MOON) */}
      <motion.div
        layout
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
        animate={{
          x: isDark ? 28 : 0,
        }}
        className={`relative z-10 flex h-6 w-6 items-center justify-center rounded-full shadow-md transition-all duration-300 ${
          isDark
            ? "bg-gradient-to-br from-[#e2e8f0] to-[#94a3b8] shadow-[0_0_8px_rgba(226,232,240,0.6)]"
            : "bg-gradient-to-br from-[#fde047] via-[#f59e0b] to-[#ea580c] shadow-[0_0_10px_rgba(245,158,11,0.7)]"
        }`}
      >
        {isDark ? (
          /* Moon Craters */
          <div className="relative h-full w-full rounded-full">
            <span className="absolute top-1 left-1.5 h-1.5 w-1.5 rounded-full bg-[#64748b]/40" />
            <span className="absolute bottom-1.5 right-1.5 h-1 w-1 rounded-full bg-[#64748b]/30" />
            <span className="absolute top-3 right-2 h-0.5 w-0.5 rounded-full bg-[#64748b]/50" />
          </div>
        ) : (
          /* Sun Center Rays Glow */
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
            className="h-full w-full flex items-center justify-center"
          >
            <div className="h-2 w-2 rounded-full bg-white/40" />
          </motion.div>
        )}
      </motion.div>
    </button>
  );
}
