import type { ReactNode } from "react";
import { useInView } from "@/hooks/use-in-view";

export function Section({
  eyebrow,
  title,
  desc,
  children,
  className = "",
  center = true,
  id,
  animate = true,
}: {
  eyebrow?: string;
  title?: ReactNode;
  desc?: ReactNode;
  children?: ReactNode;
  className?: string;
  center?: boolean;
  id?: string;
  /** Set false to disable entrance animation for this section */
  animate?: boolean;
}) {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  const animClass = animate
    ? `transition-all duration-700 ease-out ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`
    : "";

  return (
    <section
      id={id}
      ref={ref as React.RefObject<HTMLElement>}
      className={`py-20 md:py-28 ${className}`}
    >
      <div className={`container-page ${animClass}`}>
        {(eyebrow || title || desc) && (
          <div className={`max-w-3xl ${center ? "mx-auto text-center" : ""} mb-14`}>
            {eyebrow && <div className="eyebrow mb-4">{eyebrow}</div>}
            {title && (
              <h2 className="text-3xl md:text-5xl font-black leading-tight">{title}</h2>
            )}
            {desc && <p className="mt-4 text-lg text-muted-foreground">{desc}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
