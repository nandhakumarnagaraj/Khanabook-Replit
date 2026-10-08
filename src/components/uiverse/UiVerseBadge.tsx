import React from "react";

interface UiVerseBadgeProps {
  children: React.ReactNode;
  pulseColor?: "emerald" | "amber" | "blue" | "brand";
  className?: string;
}

export function UiVerseBadge({
  children,
  pulseColor = "emerald",
  className = "",
}: UiVerseBadgeProps) {
  const dotColors = {
    emerald: "bg-emerald-400",
    amber: "bg-amber-400",
    blue: "bg-blue-400",
    brand: "bg-brand",
  };

  const pingColors = {
    emerald: "bg-emerald-400",
    amber: "bg-amber-400",
    blue: "bg-blue-400",
    brand: "bg-brand",
  };

  return (
    <div
      className={`relative inline-flex items-center gap-2.5 rounded-full p-[1px] bg-gradient-to-r from-white/10 via-white/25 to-white/5 shadow-sm backdrop-blur-md ${className}`}
    >
      <div className="flex items-center gap-2 rounded-full bg-[#1E1F20]/90 px-4 py-1.5 text-xs font-semibold text-gray-200 tracking-wide select-none">
        {/* Pulsing Radar Beacon Dot */}
        <span className="relative flex h-2 w-2">
          <span
            className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${pingColors[pulseColor]}`}
          />
          <span
            className={`relative inline-flex h-2 w-2 rounded-full ${dotColors[pulseColor]}`}
          />
        </span>
        {children}
      </div>
    </div>
  );
}
