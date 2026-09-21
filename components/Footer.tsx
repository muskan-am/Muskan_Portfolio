"use client";
import { ExternalLink, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/icons/BrandIcons";

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--bg-section)",
        borderTop: "1px solid var(--border-subtle)",
        padding: "3rem 1.5rem",
      }}
      aria-label="Site footer"
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
        }}
      >
        {/* Top row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1.5rem",
          }}
        >
          {/* Brand */}
          <div>
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: "1.3rem",
                background: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                letterSpacing: "-0.02em",
                display: "block",
              }}
            >
              Muskan Kesharwani
            </span>
            <span
              style={{
                fontSize: "0.8rem",
                color: "var(--text-tertiary)",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Full Stack Developer
            </span>
          </div>

          {/* Social links */}
          <div style={{ display: "flex", gap: "0.75rem" }}>
            {[
              { label: "GitHub", href: "https://github.com/muskan-am", icon: <GithubIcon size={18} /> },
              {
                label: "LinkedIn",
                href: "https://www.linkedin.com/in/muskan-kesharwani-3701432aa",
                icon: <LinkedinIcon size={18} />,
              },
              {
                              label: "X (Twitter)",
                              href: "https://x.com/MuskanK1120",
                              icon: <TwitterIcon size={18} />,
                            },
              { label: "DSA Profile", href: "https://codolio.com/profile/muskan_am", icon: <ExternalLink size={18} /> },
              { label: "Email", href: "mailto:muskankesharwani63@gmail.com", icon: <Mail size={18} /> },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("mailto") ? "_self" : "_blank"}
                rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                aria-label={link.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "38px",
                  height: "38px",
                  borderRadius: "10px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "var(--text-secondary)",
                  textDecoration: "none",
                  transition: "background 0.2s, color 0.2s, border-color 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(59,130,246,0.12)";
                  (e.currentTarget as HTMLElement).style.color = "#93C5FD";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(59,130,246,0.3)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
                  (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
                }}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "var(--border-subtle)" }} />

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "0.75rem",
          }}
        >
          <p
            style={{
              fontSize: "0.8rem",
              color: "var(--text-tertiary)",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            © 2026 Muskan Kesharwani. All rights reserved.
          </p>
          <p
            style={{
              fontSize: "0.8rem",
              color: "var(--text-tertiary)",
              fontFamily: "'Inter', sans-serif",
              display: "flex",
              alignItems: "center",
              gap: "0.3rem",
            }}
          >
            Built with
            <span style={{ color: "#3B82F6", fontWeight: 500 }}>Next.js</span>
            &
            <span style={{ color: "#3B82F6", fontWeight: 500 }}>TypeScript</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
