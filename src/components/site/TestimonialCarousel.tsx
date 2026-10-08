import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Quote, Star, Play, Pause } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { TESTIMONIALS } from "@/lib/testimonials";

export function TestimonialCarousel() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isPaused, setIsPaused] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (isPaused || shouldReduceMotion) return;
    const timer = window.setInterval(() => {
      setDirection(1);
      setActive((current) => (current + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => window.clearInterval(timer);
  }, [isPaused, shouldReduceMotion]);

  const testimonial = TESTIMONIALS[active];

  const goTo = (index: number) => {
    const nextIndex = (index + TESTIMONIALS.length) % TESTIMONIALS.length;
    setDirection(nextIndex > active ? 1 : -1);
    setActive(nextIndex);
  };

  return (
    <div
      className="mx-auto max-w-5xl w-full"
      role="region"
      aria-roledescription="carousel"
      aria-label="Customer stories"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <div className="relative min-h-[22rem] md:min-h-[19rem] flex items-center justify-center overflow-hidden rounded-3xl border border-border bg-surface-soft/80 backdrop-blur-md p-6 sm:p-10 shadow-xl">
        <Quote
          aria-hidden
          className="absolute right-6 top-6 h-20 w-20 text-brand/10 pointer-events-none"
        />

        <AnimatePresence custom={direction} mode="wait" initial={false}>
          <motion.div
            key={active}
            custom={direction}
            initial={
              shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, x: direction * 40, filter: "blur(4px)" }
            }
            animate={
              shouldReduceMotion ? { opacity: 1 } : { opacity: 1, x: 0, filter: "blur(0px)" }
            }
            exit={
              shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, x: -direction * 40, filter: "blur(4px)" }
            }
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="flex flex-col justify-between w-full h-full"
          >
            {/* Star rating */}
            <div className="flex items-center gap-1 mb-4 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
              ))}
              <span className="ml-2 text-xs font-bold text-muted-foreground">
                Restaurant Experience
              </span>
            </div>

            <blockquote className="text-lg md:text-xl font-medium leading-relaxed text-foreground mb-8">
              "{testimonial.quote}"
            </blockquote>

            <figcaption className="flex items-center gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand font-black text-brand-foreground shadow-md shadow-brand/20">
                {testimonial.initials}
              </span>
              <div>
                <span className="flex items-center gap-1.5 font-bold text-base text-foreground">
                  {testimonial.name}
                </span>
                <span className="text-xs text-muted-foreground font-medium">
                  {testimonial.role} ·{" "}
                  <strong className="text-foreground">{testimonial.business}</strong> (
                  {testimonial.location})
                </span>
              </div>
            </figcaption>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => goTo(active - 1)}
          aria-label="Previous customer story"
          className="grid h-10 w-10 place-items-center rounded-full border border-border bg-surface text-foreground shadow-sm transition-all hover:scale-105 active:scale-95 hover:border-brand hover:text-brand focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          <ChevronLeft aria-hidden="true" className="h-5 w-5" />
        </button>

        <button
          type="button"
          onClick={() => setIsPaused((prev) => !prev)}
          aria-label={
            isPaused ? "Play customer stories carousel" : "Pause customer stories carousel"
          }
          className="grid h-10 w-10 place-items-center rounded-full border border-border bg-surface text-foreground shadow-sm transition-all hover:scale-105 active:scale-95 hover:border-brand hover:text-brand focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          {isPaused ? (
            <Play aria-hidden="true" className="h-4 w-4 fill-current text-brand" />
          ) : (
            <Pause aria-hidden="true" className="h-4 w-4 text-muted-foreground" />
          )}
        </button>

        <div
          className="flex items-center gap-2"
          aria-label={`Story ${active + 1} of ${TESTIMONIALS.length}`}
        >
          {TESTIMONIALS.map((item, index) => (
            <button
              key={item.name}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`Show story ${index + 1}`}
              aria-current={index === active ? "true" : undefined}
              className={`h-2.5 rounded-full transition-all duration-300 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none ${
                index === active ? "w-8 bg-brand" : "w-2.5 bg-border hover:bg-brand/50"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => goTo(active + 1)}
          aria-label="Next customer story"
          className="grid h-10 w-10 place-items-center rounded-full border border-border bg-surface text-foreground shadow-sm transition-all hover:scale-105 active:scale-95 hover:border-brand hover:text-brand focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          <ChevronRight aria-hidden="true" className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
