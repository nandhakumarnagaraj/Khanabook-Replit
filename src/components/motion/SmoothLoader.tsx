import React from "react";
import { Loader2 } from "lucide-react";
import khanabookLogo from "../../assets/khanabook-logo.webp";

interface SmoothLoaderProps {
  message?: string;
  className?: string;
}

/**
 * Truthful loading indicator.
 * Displays a genuine status spinner rather than a fabricated progress percentage.
 */
export function SmoothLoader({
  message = "Loading KhanaBook...",
  className = "",
}: SmoothLoaderProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`flex flex-col items-center justify-center p-8 text-center ${className}`}
    >
      <div className="relative mb-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-surface border border-border shadow-lg p-2.5">
          <img src={khanabookLogo} alt="KhanaBook" className="h-full w-full object-contain" />
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
        <Loader2 className="h-4 w-4 animate-spin text-brand" aria-hidden="true" />
        <span>{message}</span>
      </div>
      <span className="sr-only">Please wait while the content loads</span>
    </div>
  );
}
