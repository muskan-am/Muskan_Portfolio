"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Code2, GitBranch } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/icons/BrandIcons";

const profiles = [
  {
    label: "GitHub",
    username: "muskan-am",
    url: "https://github.com/muskan-am",
    description:
      "Explore my open source contributions, personal projects, and code repositories.",
    icon: <GithubIcon size={26} />,
    color: "#F9FAFB",
    bg: "rgba(249,250,251,0.04)",
    border: "rgba(249,250,251,0.1)",
    stat: "Open Source",
    statLabel: "Contributor",
  },
  {
    label: "LinkedIn",
    username: "Muskan Kesharwani",
    url: "https://www.linkedin.com/in/muskan-kesharwani-3701432aa",
    description:
      "Connect with me professionally. Let's talk about opportunities and collaborations.",
    icon: <LinkedinIcon size={26} />,
    color: "#3B82F6",
    bg: "rgba(59,130,246,0.05)",
    border: "rgba(59,130,246,0.15)",
    stat: "Full Stack",
    statLabel: "Developer",
  },
  {
    label: "X (Twitter)",
    username: "@MuskanK1120",
    url: "https://x.com/MuskanK1120",
    description:
      "Sharing tech insights, web development tips, and updates on projects.",
    icon: <TwitterIcon size={26} />,
    color: "#38BDF8",
    bg: "rgba(56,189,248,0.05)",
    border: "rgba(56,189,248,0.15)",
    stat: "Tech Updates",
    statLabel: "Follow on X",
  },
  {
    label: "DSA Profile",
    username: "Problem Solver",
    url: "https://codolio.com/profile/muskan_am",
    description:
      "300+ DSA problems solved across arrays, trees, graphs, DP, and more.",
    icon: <Code2 size={26} />,
    color: "#F59E0B",
    bg: "rgba(245,158,11,0.05)",
    border: "rgba(245,158,11,0.15)",
    stat: "300+",
    statLabel: "Problems Solved",
  },
];

export default function DeveloperActivity() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section
      id="developer-activity"
      style={{
        background: "var(--bg-section)",
        padding: "7rem 1.5rem",
        position: "relative",
        overflow: "hidden",
      }}
      aria-label="Developer activity and profiles"
    >
      <div
        style={{
          position: "absolute",
          bottom: "-100px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "600px",
          height: "300px",
          background: "radial-gradient(circle, rgba(59,130,246,0.05), transparent 70%)",
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
          <span className="section-label">07. Developer Activity</span>
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 700,
              marginTop: "0.5rem",
              letterSpacing: "-0.02em",
            }}
          >
            Find Me{" "}
            <span className="gradient-text-blue-violet">Online</span>
          </h2>
          <p
            style={{
              marginTop: "0.75rem",
              color: "var(--text-secondary)",
              fontFamily: "'Inter', sans-serif",
              fontSize: "1rem",
              maxWidth: "480px",
            }}
          >
            Actively building, contributing, and solving problems. Here&apos;s where
            you can follow my work and connect.
          </p>
        </motion.div>

        {/* Profile cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {profiles.map((profile, i) => (
            <motion.a
              key={profile.label}
              href={profile.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 40 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.6, ease: "easeOut" }}
              whileHover={{ y: -6 }}
              style={{
                textDecoration: "none",
                background: profile.bg,
                border: `1px solid ${profile.border}`,
                borderRadius: "16px",
                padding: "1.75rem",
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem",
                transition: "box-shadow 0.3s, border-color 0.3s",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = `0 12px 40px ${profile.color}18`;
                (e.currentTarget as HTMLElement).style.borderColor = `${profile.color}35`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
                (e.currentTarget as HTMLElement).style.borderColor = profile.border;
              }}
              aria-label={`Visit ${profile.label} profile`}
            >
              {/* Top accent */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "2px",
                  background: `linear-gradient(90deg, ${profile.color}, transparent)`,
                }}
              />

              {/* Header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ color: profile.color }}>{profile.icon}</div>
                <ExternalLink size={16} color="var(--text-tertiary)" />
              </div>

              {/* Content */}
              <div>
                <h3
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    marginBottom: "0.4rem",
                  }}
                >
                  {profile.label}
                </h3>
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--text-secondary)",
                    fontFamily: "'Inter', sans-serif",
                    lineHeight: 1.65,
                  }}
                >
                  {profile.description}
                </p>
              </div>

              {/* Stat */}
              <div
                style={{
                  padding: "0.75rem 1rem",
                  background: `${profile.color}08`,
                  border: `1px solid ${profile.color}18`,
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                }}
              >
                <div>
                  <p
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: "1.25rem",
                      fontWeight: 700,
                      color: profile.color,
                      lineHeight: 1,
                    }}
                  >
                    {profile.stat}
                  </p>
                  <p
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--text-tertiary)",
                      fontFamily: "'Inter', sans-serif",
                      marginTop: "0.2rem",
                    }}
                  >
                    {profile.statLabel}
                  </p>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Open source note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={headerInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          style={{
            marginTop: "2rem",
            padding: "1.25rem 1.75rem",
            background: "rgba(59,130,246,0.04)",
            border: "1px solid rgba(59,130,246,0.12)",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            gap: "0.875rem",
          }}
        >
          <GitBranch size={18} color="#3B82F6" style={{ flexShrink: 0 }} />
          <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", fontFamily: "'Inter', sans-serif", lineHeight: 1.6 }}>
            <span style={{ color: "var(--text-primary)", fontWeight: 500 }}>Open Source Contributor</span>{" "}
            — Selected for GirlScript Summer of Code 2026, contributing to real-world open source projects and
            collaborating with developers globally.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

