import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTouch, setIsTouch] = useState(true);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for fluid motionsites.ai feel
  const springX = useSpring(mouseX, { stiffness: 450, damping: 32 });
  const springY = useSpring(mouseY, { stiffness: 450, damping: 32 });

  useEffect(() => {
    // Check if device is touch-primary or user prefers reduced motion
    if (
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setIsTouch(true);
      return;
    }
    setIsTouch(false);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest(
        'a, button, [role="button"], input, textarea, select, [data-cursor-hover], .clickable',
      );
      setIsHovered(!!interactive);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseover", handleElementHover, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseover", handleElementHover);
    };
  }, [mouseX, mouseY]);

  if (isTouch || !isVisible) return null;

  return (
    <>
      {/* Outer fluid trailing ring */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full border border-brand/60 bg-brand/10 backdrop-blur-[1px] mix-blend-multiply dark:mix-blend-screen"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isHovered ? 48 : isClicking ? 24 : 32,
          height: isHovered ? 48 : isClicking ? 24 : 32,
          opacity: isVisible ? 1 : 0,
          scale: isClicking ? 0.85 : 1,
          borderColor: isHovered ? "#b91c1c" : "rgba(185, 28, 28, 0.4)",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
      />

      {/* Center precise dot */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[10000] rounded-full bg-brand"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isHovered ? 8 : 5,
          height: isHovered ? 8 : 5,
          opacity: isVisible ? 1 : 0,
          scale: isClicking ? 1.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 600, damping: 35 }}
      />
    </>
  );
}
