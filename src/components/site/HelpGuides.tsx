import { useState } from "react";
import { ChevronDown, BookOpen } from "lucide-react";
import { SETUP_GUIDES } from "@/lib/help-guides";

export function HelpGuides() {
  const [openId, setOpenId] = useState<string | null>(null);

  function toggle(id: string) {
    setOpenId((prev) => (prev === id ? null : id));
  }

  return (
    <div className="max-w-3xl mx-auto space-y-3">
      <div className="flex items-center gap-2 mb-6">
        <BookOpen aria-hidden className="h-5 w-5 text-brand" />
        <h3 className="text-xl font-black">Setup Guides</h3>
      </div>

      {SETUP_GUIDES.map((guide) => {
        const isOpen = openId === guide.id;
        return (
          <div
            key={guide.id}
            className="rounded-xl border border-border bg-surface overflow-hidden transition-all duration-200"
          >
            <button
              type="button"
              onClick={() => toggle(guide.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  toggle(guide.id);
                }
              }}
              aria-expanded={isOpen}
              aria-controls={`guide-${guide.id}`}
              className="w-full px-5 py-4 flex items-center justify-between gap-4 text-left"
            >
              <div>
                <div className="font-black text-foreground">{guide.title}</div>
                <div className="text-sm text-muted-foreground mt-0.5">{guide.description}</div>
              </div>
              <ChevronDown
                aria-hidden
                className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
              />
            </button>

            <div
              id={`guide-${guide.id}`}
              role="region"
              aria-labelledby={`tab-${guide.id}`}
              className={`overflow-hidden transition-all duration-300 ease-out ${isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"}`}
            >
              <ol className="px-5 pb-5 space-y-3">
                {guide.steps.map((step, i) => (
                  <li key={i} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
                    <span className="shrink-0 w-6 h-6 rounded-full bg-brand/10 text-brand text-xs font-black flex items-center justify-center mt-0.5">
                      {i + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        );
      })}
    </div>
  );
}
