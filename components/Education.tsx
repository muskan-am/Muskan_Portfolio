"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, BookOpen, Calendar } from "lucide-react";

const educationData = [
  {
    institution: "Dr. K.N Modi Institute of Engineering & Technology",
    degree: "B.Tech — Computer Science Engineering",
    period: "2022 – 2026",
    score: "71%",
    type: "university",
    icon: <GraduationCap size={22} />,
    color: "#3B82F6",
    details: "Relevant coursework: Data Structures & Algorithms, DBMS, Operating Systems, Computer Networks, Software Engineering.",
  },
  {
    institution: "BBS Public Inter College",
    degree: "12th — PCM with Computer Science",
    period: "2022",
    score: null,
    type: "school",
    icon: <BookOpen size={22} />,
    color: "#8B5CF6",
    details: null,
  },
  {
    institution: "BBS Public Inter College",
    degree: "10th — Secondary Education",
    period: "2020",
    score: null,
    type: "school",
    icon: <BookOpen size={22} />,
    color: "#06B6D4",
    details: null,
  },
];

export default function Education() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section
      id="education"
      style={{
        background: "var(--bg-base)",
        padding: "7rem 1.5rem",
        position: "relative",
        overflow: "hidden",
      }}
      aria-label="Education section"
    >
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: "3.5rem" }}
        >
          <span className="section-label">06. Education</span>
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 700,
              marginTop: "0.5rem",
              letterSpacing: "-0.02em",
            }}
          >
            Academic{" "}
            <span className="gradient-text-blue-violet">Background</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div style={{ position: "relative", paddingLeft: "2rem" }}>
          {/* Vertical line */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: "1.5rem",
              bottom: 0,
              width: "1px",
              background: "linear-gradient(to bottom, #3B82F6, rgba(59,130,246,0.05))",
            }}
          />

          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {educationData.map((edu, i) => (
              <EducationCard key={`${edu.institution}-${edu.period}`} edu={edu} index={i} headerInView={headerInView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function EducationCard({
  edu,
  index,
  headerInView,
}: {
  edu: typeof educationData[0];
  index: number;
  headerInView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={headerInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: 0.1 + index * 0.15, duration: 0.6, ease: "easeOut" }}
      style={{ position: "relative" }}
    >
      {/* Timeline dot */}
      <div
        style={{
          position: "absolute",
          left: "-2.45rem",
          top: "1.2rem",
          width: "14px",
          height: "14px",
          borderRadius: "50%",
          background: edu.color,
          boxShadow: `0 0 12px ${edu.color}50`,
          border: "2px solid var(--bg-base)",
        }}
      />

      <div
        className="glass-card"
        style={{
          padding: "1.5rem 1.75rem",
          marginLeft: "0.75rem",
          position: "relative",
          overflow: "hidden",
          transition: "border-color 0.2s, transform 0.2s",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = `${edu.color}35`;
          (e.currentTarget as HTMLElement).style.transform = "translateX(4px)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = "var(--glass-border)";
          (e.currentTarget as HTMLElement).style.transform = "translateX(0)";
        }}
      >
        {/* Left accent */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: "3px",
            background: `linear-gradient(to bottom, ${edu.color}, transparent)`,
            borderRadius: "0 0 0 16px",
          }}
        />

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.75rem" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.35rem" }}>
              <span style={{ color: edu.color }}>{edu.icon}</span>
              <h3
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "1rem",
                  fontWeight: 700,
                  color: "var(--text-primary)",
                }}
              >
                {edu.institution}
              </h3>
            </div>
            <p
              style={{
                fontSize: "0.875rem",
                color: "var(--text-secondary)",
                fontFamily: "'Inter', sans-serif",
                marginLeft: "1.85rem",
              }}
            >
              {edu.degree}
            </p>
            {edu.details && (
              <p
                style={{
                  fontSize: "0.8rem",
                  color: "var(--text-tertiary)",
                  fontFamily: "'Inter', sans-serif",
                  marginLeft: "1.85rem",
                  marginTop: "0.35rem",
                  lineHeight: 1.6,
                }}
              >
                {edu.details}
              </p>
            )}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem", alignItems: "flex-end" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.375rem",
                fontSize: "0.85rem",
                color: "var(--text-tertiary)",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              <Calendar size={13} />
              {edu.period}
            </div>
            {edu.score && (
              <span
                style={{
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  fontFamily: "'Inter', sans-serif",
                  color: "#6EE7B7",
                  background: "rgba(16,185,129,0.1)",
                  padding: "0.15rem 0.5rem",
                  borderRadius: "6px",
                }}
              >
                {edu.score}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

