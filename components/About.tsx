"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Database, Shield, Layers, GraduationCap, Briefcase } from "lucide-react";

const stats = [
  { value: "300+", label: "DSA Problems", icon: <Code2 size={20} /> },
  { value: "2+", label: "Full Stack Projects", icon: <Layers size={20} /> },
  { value: "1", label: "Industry Internship", icon: <Briefcase size={20} /> },
  { value: "2026", label: "B.Tech CSE", icon: <GraduationCap size={20} /> },
];

const techStack = [
  "Next.js", "React", "Node.js", "Express", "TypeScript",
  "PostgreSQL", "MongoDB", "Prisma", "REST APIs", "JWT & RBAC",
];

function SectionReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="about"
      style={{
        background: "var(--bg-section)",
        padding: "7rem 1.5rem",
        position: "relative",
        overflow: "hidden",
      }}
      aria-label="About Muskan Kesharwani"
    >
      {/* Background accent */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          right: "-200px",
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(59,130,246,0.05), transparent 70%)",
          transform: "translateY(-50%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Section label */}
        <SectionReveal>
          <div style={{ marginBottom: "3.5rem" }}>
            <span className="section-label">01. About Me</span>
            <h2
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                fontWeight: 700,
                marginTop: "0.5rem",
                letterSpacing: "-0.02em",
              }}
            >
              The{" "}
              <span className="gradient-text-blue-violet">Developer</span> Behind
              the Code
            </h2>
          </div>
        </SectionReveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "4rem",
            alignItems: "start",
          }}
          className="about-grid"
        >
          {/* Left: Text */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
            <SectionReveal delay={0.1}>
              <p
                style={{
                  fontSize: "1.05rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.85,
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                I am a{" "}
                <span style={{ color: "var(--text-primary)", fontWeight: 500 }}>
                  Computer Science Engineering
                </span>{" "}
                graduate from{" "}
                <span style={{ color: "#93C5FD" }}>
                  Dr. K.N Modi Institute of Engineering & Technology
                </span>
                . I enjoy building full-stack web applications and solving
                complex problems using modern technologies.
              </p>
            </SectionReveal>

            <SectionReveal delay={0.15}>
              <p
                style={{
                  fontSize: "1.05rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.85,
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                My development experience spans across building{" "}
                <span style={{ color: "var(--text-primary)", fontWeight: 500 }}>
                  production-ready applications
                </span>{" "}
                with clean architecture, secure authentication, Role-Based
                Access Control, and seamless database integrations. I have also
                solved{" "}
                <span style={{ color: "#6EE7B7", fontWeight: 600 }}>
                  300+ DSA problems
                </span>{" "}
                to strengthen my problem-solving foundation.
              </p>
            </SectionReveal>

            {/* Tech stack chips */}
            <SectionReveal delay={0.2}>
              <div>
                <p
                  style={{
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    letterSpacing: "0.12em",
                    color: "var(--text-tertiary)",
                    textTransform: "uppercase",
                    marginBottom: "0.875rem",
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  Core Technologies
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {techStack.map((tech) => (
                    <span
                      key={tech}
                      style={{
                        padding: "0.3rem 0.75rem",
                        background: "rgba(59,130,246,0.08)",
                        border: "1px solid rgba(59,130,246,0.2)",
                        borderRadius: "8px",
                        fontSize: "0.8rem",
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 500,
                        color: "#93C5FD",
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </SectionReveal>
          </div>

          {/* Right: Stats */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {/* Stats grid */}
            <SectionReveal delay={0.1}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1rem",
                  marginBottom: "0.5rem",
                }}
              >
                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.2 + i * 0.08, duration: 0.5 }}
                    className="glass-card"
                    style={{
                      padding: "1.5rem",
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.5rem",
                      cursor: "default",
                      transition: "transform 0.2s, border-color 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(59,130,246,0.3)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                      (e.currentTarget as HTMLElement).style.borderColor = "var(--glass-border)";
                    }}
                  >
                    <span style={{ color: "#3B82F6" }}>{stat.icon}</span>
                    <span
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: "2rem",
                        fontWeight: 700,
                        color: "var(--text-primary)",
                        lineHeight: 1,
                      }}
                    >
                      {stat.value}
                    </span>
                    <span
                      style={{
                        fontSize: "0.8rem",
                        color: "var(--text-secondary)",
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      {stat.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </SectionReveal>

            {/* Journey timeline */}
            <SectionReveal delay={0.25}>
              <div
                className="glass-card"
                style={{ padding: "1.75rem", position: "relative" }}
              >
                <p
                  style={{
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    color: "var(--text-tertiary)",
                    textTransform: "uppercase",
                    marginBottom: "1.25rem",
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  Developer Journey
                </p>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    position: "relative",
                    paddingLeft: "1.5rem",
                  }}
                >
                  {/* Vertical line */}
                  <div className="timeline-line" />
                  {[
                    { year: "2022", label: "Started B.Tech CSE", color: "#3B82F6" },
                    { year: "2024", label: "Built First Full-Stack Project", color: "#8B5CF6" },
                    { year: "2025", label: "Open Source Contributor — GSSoC", color: "#06B6D4" },
                    { year: "2026", label: "Full Stack Intern — Pushpendra Technology", color: "#10B981", current: true },
                  ].map((item) => (
                    <div
                      key={item.year}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "0.875rem",
                        position: "relative",
                      }}
                    >
                      {/* Dot */}
                      <div
                        style={{
                          width: "10px",
                          height: "10px",
                          borderRadius: "50%",
                          background: item.color,
                          position: "absolute",
                          left: "-1.82rem",
                          top: "4px",
                          boxShadow: `0 0 10px ${item.color}60`,
                          flexShrink: 0,
                        }}
                      />
                      <div>
                        <span
                          style={{
                            fontSize: "0.75rem",
                            fontFamily: "'Inter', sans-serif",
                            color: item.color,
                            fontWeight: 600,
                          }}
                        >
                          {item.year}
                        </span>
                        <p
                          style={{
                            fontSize: "0.875rem",
                            color: item.current ? "var(--text-primary)" : "var(--text-secondary)",
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: item.current ? 600 : 400,
                          }}
                        >
                          {item.label}
                          {item.current && (
                            <span
                              style={{
                                marginLeft: "0.5rem",
                                fontSize: "0.65rem",
                                background: "rgba(16,185,129,0.15)",
                                color: "#6EE7B7",
                                padding: "0.1rem 0.4rem",
                                borderRadius: "4px",
                                fontWeight: 600,
                              }}
                            >
                              NOW
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </div>
    </section>
  );
}


