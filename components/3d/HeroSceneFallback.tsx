"use client";
import { motion } from "framer-motion";

export default function HeroSceneFallback() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Outer glow ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute",
          width: "340px",
          height: "340px",
          borderRadius: "50%",
          border: "1px solid rgba(6, 182, 212, 0.2)",
        }}
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute",
          width: "260px",
          height: "260px",
          borderRadius: "50%",
          border: "1px solid rgba(139, 92, 246, 0.25)",
        }}
      />

      {/* Core orb */}
      <motion.div
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.85, 1, 0.85],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{
          width: "180px",
          height: "180px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 35% 35%, #60A5FA, #3B82F6 40%, #7C3AED 70%, #4F46E5)",
          boxShadow:
            "0 0 60px rgba(59, 130, 246, 0.4), 0 0 120px rgba(59, 130, 246, 0.15)",
        }}
      />

      {/* Floating particles */}
      {[
        { size: 6, x: "20%", y: "20%", delay: 0, color: "#06B6D4" },
        { size: 4, x: "80%", y: "30%", delay: 1, color: "#8B5CF6" },
        { size: 5, x: "75%", y: "75%", delay: 2, color: "#3B82F6" },
        { size: 3, x: "15%", y: "70%", delay: 0.5, color: "#06B6D4" },
        { size: 4, x: "50%", y: "10%", delay: 1.5, color: "#8B5CF6" },
      ].map((p, i) => (
        <motion.div
          key={i}
          animate={{ y: [-8, 8, -8], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
          style={{
            position: "absolute",
            width: p.size,
            height: p.size,
            left: p.x,
            top: p.y,
            borderRadius: "50%",
            background: p.color,
            boxShadow: `0 0 8px ${p.color}`,
          }}
        />
      ))}
    </div>
  );
}
