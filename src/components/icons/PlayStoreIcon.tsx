import type { SVGProps } from "react";

export function PlayStoreIcon({ className = "h-4 w-4", ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      {...props}
    >
      {/* Left Backbone (Blue) */}
      <path
        d="M3.609 1.814C3.23 2.222 3 2.825 3 3.61v16.78c0 .785.23 1.388.609 1.796l.094.08 9.47-9.47v-.224L3.703 3.098l-.094.08z"
        fill="#00D2FF"
      />
      {/* Top Segment (Green) */}
      <path
        d="M16.396 8.101L5.314 1.809c-.666-.377-1.256-.331-1.611.045l9.47 9.47 3.223-3.223z"
        fill="#00E676"
      />
      {/* Bottom Segment (Red) */}
      <path
        d="M16.396 15.899l-3.223-3.223L3.703 22.146c.355.376.945.422 1.611.045l11.082-6.292z"
        fill="#FF3A44"
      />
      {/* Right Tip (Yellow) */}
      <path
        d="M16.326 15.939l-3.153-3.153v-.224l3.153-3.153.07.04 3.738 2.124c1.068.606 1.068 1.597 0 2.203l-3.738 2.123-.07.04z"
        fill="#FFD400"
      />
    </svg>
  );
}
