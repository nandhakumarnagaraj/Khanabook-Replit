import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import khanabookLogo from "../../assets/khanabook-logo.webp";

export function SmoothLoader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(15);

  useEffect(() => {
    // Check if user already saw the loader in this session to keep navigation fast
    const hasSeenLoader = sessionStorage.getItem("kb_loader_seen");
    if (hasSeenLoader) {
      setLoading(false);
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setLoading(false);
            sessionStorage.setItem("kb_loader_seen", "true");
          }, 250);
          return 100;
        }
        const increment = Math.floor(Math.random() * 25) + 15;
        return Math.min(prev + increment, 100);
      });
    }, 120);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="smooth-loader"
          initial={{ opacity: 1 }}
          exit={{
            y: "-100%",
            transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-background"
        >
          {/* Subtle background ambient glow */}
          <div
            aria-hidden
            className="absolute h-72 w-72 rounded-full bg-brand/10 blur-3xl animate-pulse"
          />

          <div className="relative flex flex-col items-center">
            {/* Logo with bounce & scale */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative mb-6"
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-surface border border-border shadow-xl p-3">
                <img
                  src={khanabookLogo}
                  alt="KhanaBook"
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center">
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-brand" />
                </span>
              </div>
            </motion.div>

            {/* Brand title & tagline */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.4 }}
              className="text-center"
            >
              <h2 className="text-2xl font-black tracking-tight text-foreground">
                Khana<span className="text-brand">Book</span>
              </h2>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Offline-First Restaurant POS
              </p>
            </motion.div>

            {/* Progress bar */}
            <div className="mt-8 w-48">
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-soft border border-border">
                <motion.div
                  className="h-full bg-gradient-to-r from-brand to-gold"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "easeInOut", duration: 0.2 }}
                />
              </div>
              <div className="mt-2 flex justify-between text-[11px] font-mono font-medium text-muted-foreground">
                <span>Loading core engine...</span>
                <span>{progress}%</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
