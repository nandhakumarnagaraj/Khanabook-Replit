import { useState } from "react";

export function FAQ({
  items,
  className = "w-full",
}: {
  items: { q: string; a: string }[];
  className?: string;
}) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className={`flex flex-col gap-2 w-full ${className}`}>
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div
            key={i}
            className="group rounded-2xl overflow-hidden border border-border/80 bg-surface transition-all duration-200 hover:border-brand/40 shadow-xs"
          >
            <button
              type="button"
              className="flex w-full cursor-pointer list-none items-center justify-between gap-4 min-h-14 md:min-h-16 px-5 md:px-7 py-3 text-base md:text-[22px] leading-snug md:leading-[28px] font-normal md:font-medium tracking-tight text-foreground hover:text-brand transition-colors text-left select-none"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
            >
              <span className="flex-1">{it.q}</span>
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`shrink-0 text-muted-foreground transition-transform duration-300 ease-in-out ${
                  isOpen ? "rotate-45 text-brand" : "group-hover:text-foreground"
                }`}
                aria-hidden="true"
              >
                <path
                  d="M8.325 9.675H4.5V8.325H8.325V4.5H9.675V8.325H13.5V9.675H9.675V13.5H8.325V9.675Z"
                  fill="currentColor"
                />
              </svg>
            </button>
            {isOpen && (
              <div className="m-0 text-base sm:text-lg md:text-[19px] leading-relaxed md:leading-[30px] text-muted-foreground px-5 md:px-7 pb-5 md:pb-6 border-t border-border/30 pt-4 mt-0.5">
                {it.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
