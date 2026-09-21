"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

type Skill = {
  name: string;
  color: string;
  bg: string;
};

type SkillCategory = {
  title: string;
  icon: string;
  skills: Skill[];
};

const skillCategories: SkillCategory[] = [
  {
    title: "Programming Languages",
    icon: "{ }",
    skills: [
      { name: "Java", color: "#F97316", bg: "rgba(249,115,22,0.1)" },
      { name: "C", color: "#64B5F6", bg: "rgba(100,181,246,0.1)" },
      { name: "JavaScript", color: "#F59E0B", bg: "rgba(245,158,11,0.1)" },
      { name: "TypeScript", color: "#3B82F6", bg: "rgba(59,130,246,0.12)" },
    ],
  },
  {
    title: "Frontend",
    icon: "◧",
    skills: [
      { name: "React.js", color: "#06B6D4", bg: "rgba(6,182,212,0.1)" },
      { name: "Next.js", color: "#F9FAFB", bg: "rgba(249,250,251,0.06)" },
      { name: "HTML5", color: "#F97316", bg: "rgba(249,115,22,0.1)" },
      { name: "CSS3", color: "#3B82F6", bg: "rgba(59,130,246,0.12)" },
      { name: "Tailwind CSS", color: "#06B6D4", bg: "rgba(6,182,212,0.1)" },
    ],
  },
  {
    title: "Backend",
    icon: "⚙",
    skills: [
      { name: "Node.js", color: "#22C55E", bg: "rgba(34,197,94,0.1)" },
      { name: "Express.js", color: "#9CA3AF", bg: "rgba(156,163,175,0.1)" },
      { name: "REST APIs", color: "#8B5CF6", bg: "rgba(139,92,246,0.12)" },
      { name: "JWT Auth", color: "#F59E0B", bg: "rgba(245,158,11,0.1)" },
      { name: "RBAC", color: "#EC4899", bg: "rgba(236,72,153,0.1)" },
    ],
  },
  {
    title: "Database",
    icon: "◈",
    skills: [
      { name: "PostgreSQL", color: "#3B82F6", bg: "rgba(59,130,246,0.12)" },
      { name: "MongoDB", color: "#22C55E", bg: "rgba(34,197,94,0.1)" },
      { name: "SQL", color: "#06B6D4", bg: "rgba(6,182,212,0.1)" },
      { name: "Prisma ORM", color: "#8B5CF6", bg: "rgba(139,92,246,0.12)" },
    ],
  },
  {
    title: "Tools & Deployment",
    icon: "⚡",
    skills: [
      { name: "Git", color: "#F97316", bg: "rgba(249,115,22,0.1)" },
      { name: "GitHub", color: "#F9FAFB", bg: "rgba(249,250,251,0.06)" },
      { name: "Vercel", color: "#F9FAFB", bg: "rgba(249,250,251,0.06)" },
      { name: "Netlify", color: "#06B6D4", bg: "rgba(6,182,212,0.1)" },
    ],
  },
];

function SkillCard({ skill, delay }: { skill: Skill; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.45, ease: "easeOut" }}
      whileHover={{ scale: 1.06, y: -3 }}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        padding: "0.6rem 1rem",
        background: skill.bg,
        border: `1px solid ${skill.color}25`,
        borderRadius: "10px",
        cursor: "default",
        transition: "border-color 0.2s, box-shadow 0.2s",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = `${skill.color}55`;
        (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 20px ${skill.color}20`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = `${skill.color}25`;
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}
    >
      <div
        style={{
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          background: skill.color,
          flexShrink: 0,
          boxShadow: `0 0 8px ${skill.color}80`,
        }}
      />
      <span
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.875rem",
          fontWeight: 500,
          color: skill.color,
          whiteSpace: "nowrap",
        }}
      >
        {skill.name}
      </span>
    </motion.div>
  );
}

function CategoryCard({
  category,
  cardDelay,
}: {
  category: SkillCategory;
  cardDelay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: cardDelay, duration: 0.6, ease: "easeOut" }}
      className="glass-card"
      style={{ padding: "1.75rem" }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
        <span
          style={{
            fontFamily: "monospace",
            fontSize: "1rem",
            color: "#3B82F6",
            background: "rgba(59,130,246,0.1)",
            width: "36px",
            height: "36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "8px",
          }}
        >
          {category.icon}
        </span>
        <h3
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "1rem",
            fontWeight: 600,
            color: "var(--text-primary)",
          }}
        >
          {category.title}
        </h3>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
        {category.skills.map((skill, i) => (
          <SkillCard
            key={skill.name}
            skill={skill}
            delay={inView ? cardDelay + 0.05 * i : 0}
          />
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section
      id="skills"
      style={{
        padding: "7rem 1.5rem",
        position: "relative",
        overflow: "hidden",
        background: "var(--bg-base)",
      }}
      aria-label="Skills section"
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
        }}
      >
        <div
          className="gradient-orb"
          style={{
            position: "absolute",
            width: "400px",
            height: "400px",
            background: "#8B5CF6",
            top: "10%",
            left: "-100px",
            opacity: 0.08,
          }}
        />
      </div>

      <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: "3.5rem" }}
        >
          <span className="section-label">02. Skills</span>
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 700,
              marginTop: "0.5rem",
              letterSpacing: "-0.02em",
            }}
          >
            Technologies I{" "}
            <span className="gradient-text-blue-violet">Work With</span>
          </h2>
          <p
            style={{
              marginTop: "0.75rem",
              color: "var(--text-secondary)",
              fontSize: "1rem",
              fontFamily: "'Inter', sans-serif",
              maxWidth: "480px",
            }}
          >
            A curated set of technologies I use to build modern, scalable web
            applications.
          </p>
        </motion.div>

        {/* Skills grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {skillCategories.map((cat, i) => (
            <CategoryCard key={cat.title} category={cat} cardDelay={i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  );
}

