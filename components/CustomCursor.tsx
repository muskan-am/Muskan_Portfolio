"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  const dotX = useSpring(0, { stiffness: 2000, damping: 60 });
  const dotY = useSpring(0, { stiffness: 2000, damping: 60 });
  const ringX = useSpring(0, { stiffness: 200, damping: 30 });
  const ringY = useSpring(0, { stiffness: 200, damping: 30 });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const moveCursor = (e: MouseEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[data-cursor-hover]");
      setIsHovering(!!isInteractive);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("resize", checkMobile);
    };
  }, [dotX, dotY, ringX, ringY]);

  if (isMobile) return null;

  return (
    <>
      <motion.div
        className={`cursor-dot ${isHovering ? "cursor-hover" : ""}`}
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
      />
      <motion.div
        className={`cursor-ring ${isHovering ? "cursor-hover" : ""}`}
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
      />
    </>
  );
}
