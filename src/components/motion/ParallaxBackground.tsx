import { useScroll, useTransform, motion } from "motion/react";

export function ParallaxBackground() {
  const { scrollY } = useScroll();

  // Different layer speeds for rich 3D parallax depth
  const orb1Y = useTransform(scrollY, [0, 2000], [0, 350]);
  const orb2Y = useTransform(scrollY, [0, 2000], [0, -250]);
  const orb3Y = useTransform(scrollY, [0, 2000], [0, 180]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Dynamic ambient orb 1 — Top Right (Brand red / crimson) */}
      <motion.div
        style={{ y: orb1Y }}
        className="absolute -top-32 -right-32 h-[550px] w-[550px] rounded-full bg-brand/10 blur-[130px]"
      />

      {/* Dynamic ambient orb 2 — Middle Left (Gold / Amber) */}
      <motion.div
        style={{ y: orb2Y }}
        className="absolute top-[45%] -left-32 h-[480px] w-[480px] rounded-full bg-gold/15 blur-[120px]"
      />

      {/* Dynamic ambient orb 3 — Lower Right */}
      <motion.div
        style={{ y: orb3Y }}
        className="absolute bottom-10 right-10 h-[400px] w-[400px] rounded-full bg-brand/5 blur-[100px]"
      />

      {/* Subtle background tech grid */}
      <div
        className="absolute inset-0 opacity-[0.025] dark:opacity-[0.05]"
        style={{
          backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />
    </div>
  );
}
