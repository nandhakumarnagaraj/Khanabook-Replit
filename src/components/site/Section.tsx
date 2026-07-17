import type { ReactNode } from "react";

export function Section({
  eyebrow,
  title,
  desc,
  children,
  className = "",
  center = true,
  id,
}: {
  eyebrow?: string;
  title?: ReactNode;
  desc?: ReactNode;
  children?: ReactNode;
  className?: string;
  center?: boolean;
  id?: string;
}) {
  return (
    <section id={id} className={`py-20 md:py-28 ${className}`}>
      <div className="container-page">
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
