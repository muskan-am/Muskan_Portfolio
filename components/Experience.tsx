"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, MapPin, Calendar } from "lucide-react";

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const headerInView = useInView(ref, { once: true });

  const responsibilities = [
    "Developing and maintaining full-stack web applications using MERN stack and Next.js.",
    "Building responsive frontend interfaces with modern UI/UX practices.",
    "Developing and documenting RESTful APIs for various application modules.",
    "Implementing secure authentication systems and role-based access control.",
    "Integrating relational and NoSQL databases (PostgreSQL, MongoDB).",
    "Debugging and resolving application issues across the stack.",
    "Implementing new features and improving existing application functionality.",
    "Collaborating with the development team on project delivery.",
  ];

  return (
    <section
      id="experience"
      style={{
        background: "var(--bg-section)",
        padding: "7rem 1.5rem",
        position: "relative",
        overflow: "hidden",
      }}
      aria-label="Work experience"
    >
      <div
        style={{
          position: "absolute",
          bottom: "-100px",
          right: "-100px",
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, rgba(6,182,212,0.06), transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: "3.5rem" }}
        >
          <span className="section-label">03. Experience</span>
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 700,
              marginTop: "0.5rem",
              letterSpacing: "-0.02em",
            }}
          >
            Professional{" "}
            <span className="gradient-text-blue-violet">Experience</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div style={{ position: "relative", paddingLeft: "2rem" }}>
          {/* Timeline line */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: "1.5rem",
              bottom: 0,
              width: "1px",
              background: "linear-gradient(to bottom, #3B82F6, rgba(59,130,246,0.1))",
            }}
          />

          {/* Experience card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={headerInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
          >
            {/* Timeline dot */}
            <div
              style={{
                position: "absolute",
                left: "-8px",
                top: "1.5rem",
                width: "16px",
                height: "16px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
                boxShadow: "0 0 0 4px rgba(59,130,246,0.15), 0 0 20px rgba(59,130,246,0.4)",
              }}
            />

            <div
              className="glass-card"
              style={{
                padding: "2rem",
                marginLeft: "1rem",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Gradient top border accent */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "2px",
                  background: "linear-gradient(90deg, #3B82F6, #8B5CF6, transparent)",
                }}
              />

              {/* Header */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  flexWrap: "wrap",
                  gap: "1rem",
                  marginBottom: "1.5rem",
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
                    <h3
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: "1.25rem",
                        fontWeight: 700,
                        color: "var(--text-primary)",
                      }}
                    >
                      Full Stack Developer Intern
                    </h3>
                    <span
                      style={{
                        fontSize: "0.65rem",
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        background: "rgba(16,185,129,0.12)",
                        color: "#6EE7B7",
                        border: "1px solid rgba(16,185,129,0.25)",
                        padding: "0.15rem 0.5rem",
                        borderRadius: "6px",
                        fontFamily: "'Inter', sans-serif",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.3rem",
                      }}
                    >
                      <span
                        style={{
                          width: "6px",
                          height: "6px",
                          borderRadius: "50%",
                          background: "#10B981",
                          display: "inline-block",
                          animation: "pulse 2s infinite",
                        }}
                      />
                      Current
                    </span>
                  </div>
                  <a
                    href="https://pushpendratechnology.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.375rem",
                      color: "#93C5FD",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "1rem",
                      fontWeight: 600,
                      textDecoration: "none",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLElement).style.color = "#60A5FA")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLElement).style.color = "#93C5FD")
                    }
                  >
                    Pushpendra Technology Private Limited
                    <ExternalLink size={14} />
                  </a>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", alignItems: "flex-end" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.375rem",
                      color: "var(--text-secondary)",
                      fontSize: "0.85rem",
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    <Calendar size={14} />
                    Aug 2026 – Present
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.375rem",
                      color: "var(--text-tertiary)",
                      fontSize: "0.8rem",
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    <MapPin size={13} />
                    Remote
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div
                style={{
                  height: "1px",
                  background: "var(--border-subtle)",
                  marginBottom: "1.5rem",
                }}
              />

              {/* Responsibilities */}
              <ul
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                  listStyle: "none",
                  padding: 0,
                }}
              >
                {responsibilities.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    animate={headerInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.35 + i * 0.06, duration: 0.5 }}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "0.75rem",
                      fontSize: "0.9rem",
                      color: "var(--text-secondary)",
                      lineHeight: 1.65,
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    <div
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: "#3B82F6",
                        flexShrink: 0,
                        marginTop: "0.45rem",
                        boxShadow: "0 0 6px rgba(59,130,246,0.6)",
                      }}
                    />
                    {item}
                  </motion.li>
                ))}
              </ul>

              {/* Tech stack used */}
              <div style={{ marginTop: "1.75rem", paddingTop: "1.5rem", borderTop: "1px solid var(--border-subtle)" }}>
                <p
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--text-tertiary)",
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginBottom: "0.75rem",
                  }}
                >
                  Stack Used
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {["MERN Stack", "Next.js", "TypeScript", "PostgreSQL", "MongoDB", "REST APIs", "JWT", "RBAC"].map((tech) => (
                    <span
                      key={tech}
                      style={{
                        padding: "0.25rem 0.65rem",
                        background: "rgba(59,130,246,0.08)",
                        border: "1px solid rgba(59,130,246,0.18)",
                        borderRadius: "6px",
                        fontSize: "0.75rem",
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
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


