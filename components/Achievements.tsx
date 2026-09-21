"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Trophy, Code2, BookOpen, Award, Star } from "lucide-react";

type Achievement = {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  bg: string;
  border: string;
  year?: string;
};

const achievements: Achievement[] = [
  {
    id: "dsa",
    title: "300+ DSA Problems",
    description:
      "Solved over 300 Data Structures and Algorithms problems, strengthening problem-solving skills across arrays, graphs, trees, dynamic programming, and more.",
    icon: <Code2 size={24} />,
    color: "#3B82F6",
    bg: "rgba(59,130,246,0.08)",
    border: "rgba(59,130,246,0.2)",
  },
  {
    id: "gssoc",
    title: "GirlScript Summer of Code 2026",
    description:
      "Selected as an Open Source Contributor for GirlScript Summer of Code 2026 — one of India's largest open source programs.",
    icon: <Star size={24} />,
    color: "#8B5CF6",
    bg: "rgba(139,92,246,0.08)",
    border: "rgba(139,92,246,0.2)",
    year: "2026",
  },
  {
    id: "mongodb",
    title: "MongoDB Certification",
    description:
      "Completed Introduction to MongoDB certification — covering hands-on NoSQL basics, collections, queries, aggregations, and schema design.",
    icon: <Award size={24} />,
    color: "#22C55E",
    bg: "rgba(34,197,94,0.08)",
    border: "rgba(34,197,94,0.2)",
  },
  {
    id: "digital101",
    title: "Digital 101",
    description:
      "Certified by FutureSkills Prime for completing the Digital 101 program — covering foundational digital literacy and emerging technology concepts.",
    icon: <BookOpen size={24} />,
    color: "#F59E0B",
    bg: "rgba(245,158,11,0.08)",
    border: "rgba(245,158,11,0.2)",
  },
];

export default function Achievements() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section
      id="achievements"
      style={{
        background: "var(--bg-section)",
        padding: "7rem 1.5rem",
        position: "relative",
        overflow: "hidden",
      }}
      aria-label="Achievements section"
    >
      <div
        style={{
          position: "absolute",
          top: "20%",
          right: "-100px",
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, rgba(245,158,11,0.05), transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: "3.5rem" }}
        >
          <span className="section-label">05. Achievements</span>
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 700,
              marginTop: "0.5rem",
              letterSpacing: "-0.02em",
            }}
          >
            Recognition &{" "}
            <span className="gradient-text-blue-violet">Milestones</span>
          </h2>
        </motion.div>

        {/* Cards grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {achievements.map((achievement, i) => (
            <AchievementCard key={achievement.id} achievement={achievement} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function AchievementCard({ achievement, index }: { achievement: Achievement; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
      whileHover={{ y: -5 }}
      style={{
        background: achievement.bg,
        border: `1px solid ${achievement.border}`,
        borderRadius: "16px",
        padding: "1.75rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        position: "relative",
        overflow: "hidden",
        transition: "box-shadow 0.3s, border-color 0.3s",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = `0 12px 40px ${achievement.color}20`;
        (e.currentTarget as HTMLElement).style.borderColor = `${achievement.color}40`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
        (e.currentTarget as HTMLElement).style.borderColor = achievement.border;
      }}
    >
      {/* Top accent line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: `linear-gradient(90deg, ${achievement.color}, transparent)`,
        }}
      />

      {/* Icon + year */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "12px",
            background: `${achievement.color}15`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: achievement.color,
          }}
        >
          {achievement.icon}
        </div>
        {achievement.year && (
          <span
            style={{
              fontSize: "0.75rem",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              color: achievement.color,
              background: `${achievement.color}12`,
              padding: "0.2rem 0.5rem",
              borderRadius: "6px",
            }}
          >
            {achievement.year}
          </span>
        )}
      </div>

      <div>
        <h3
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "1.05rem",
            fontWeight: 700,
            color: "var(--text-primary)",
            marginBottom: "0.5rem",
          }}
        >
          {achievement.title}
        </h3>
        <p
          style={{
            fontSize: "0.875rem",
            color: "var(--text-secondary)",
            lineHeight: 1.7,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          {achievement.description}
        </p>
      </div>
    </motion.div>
  );
}

