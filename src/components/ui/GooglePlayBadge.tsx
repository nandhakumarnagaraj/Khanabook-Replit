import type { AnchorHTMLAttributes } from "react";
import { BUSINESS } from "@/lib/business-config";
import googlePlayBadge from "@/assets/google-play-badge.svg";

export interface GooglePlayBadgeProps extends Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href"
> {
  href?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function GooglePlayBadge({
  href = BUSINESS.playStoreUrl,
  size = "md",
  className = "",
  ...props
}: GooglePlayBadgeProps) {
  const sizeClasses = {
    sm: "h-[36px]",
    md: "h-[44px]",
    lg: "h-[50px]",
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Get it on Google Play"
      className={`inline-flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 hover:brightness-105 active:translate-y-0 active:scale-[0.99] rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 shrink-0 ${className}`}
      {...props}
    >
      <img
        src={googlePlayBadge}
        alt="Get it on Google Play"
        className={`${sizeClasses[size]} w-auto object-contain block select-none drop-shadow-sm`}
        width={180}
        height={53}
        loading="eager"
      />
    </a>
  );
}
