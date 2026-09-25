"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { Download, ArrowDown, Code2, ExternalLink } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/icons/BrandIcons";
import dynamic from "next/dynamic";
import HeroSceneFallback from "@/components/3d/HeroSceneFallback";

const HeroScene = dynamic(() => import("@/components/3d/HeroScene"), {
  ssr: false,
  loading: () => <HeroSceneFallback />,
});

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const itemTransition = { duration: 0.7, ease: "easeOut" as const };


export default function Hero() {
  const [imageError, setImageError] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const imgRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imgRef.current) return;
    const rect = imgRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setTilt({ x: dy * -10, y: dx * 10 });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <section
      id="home"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        padding: "0 1.5rem",
        paddingTop: "68px",
      }}
      aria-label="Hero section"
    >
      {/* Background gradient blobs */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 0 }}>
        <div
          className="gradient-orb"
          style={{
            position: "absolute",
            width: "600px",
            height: "600px",
            background: "#3B82F6",
            top: "-100px",
            right: "-100px",
            opacity: 0.12,
          }}
        />
        <div
          className="gradient-orb"
          style={{
            position: "absolute",
            width: "500px",
            height: "500px",
            background: "#8B5CF6",
            bottom: "-100px",
            left: "-100px",
            opacity: 0.1,
            animationDelay: "3s",
          }}
        />
        <div className="grid-bg" style={{ position: "absolute", inset: 0, opacity: 0.5 }} />
      </div>

      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "4rem",
          alignItems: "center",
          position: "relative",
          zIndex: 1,
          paddingTop: "2rem",
          paddingBottom: "4rem",
        }}
        className="hero-grid"
      >
        {/* Left: Text Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          {/* Available badge */}
          <motion.div variants={itemVariants} transition={itemTransition}>
            <span className="badge badge-green" style={{ width: "fit-content" }}>
              <span
                style={{
                  width: "7px",
                  height: "7px",
                  background: "#10B981",
                  borderRadius: "50%",
                  display: "inline-block",
                  animation: "pulse 2s infinite",
                }}
              />
              Available for Full-Time Opportunities
            </span>
          </motion.div>

          {/* Heading */}
          <motion.div variants={itemVariants} transition={itemTransition}>
            <h1
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                color: "var(--text-primary)",
                marginBottom: "0.5rem",
              }}
            >
              Hi, I&apos;m{" "}
              <span className="gradient-text">Muskan Kesharwani.</span>
            </h1>
            <p
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(1.1rem, 2.5vw, 1.6rem)",
                fontWeight: 500,
                color: "var(--text-secondary)",
                lineHeight: 1.4,
              }}
            >
              Full Stack Developer building{" "}
              <span style={{ color: "#93C5FD" }}>scalable</span> and{" "}
              <span style={{ color: "#C4B5FD" }}>modern</span> web applications.
            </p>
          </motion.div>

          {/* Description */}
          <motion.p
            variants={itemVariants}
              transition={itemTransition}
            style={{
              fontSize: "1rem",
              color: "var(--text-secondary)",
              lineHeight: 1.75,
              maxWidth: "520px",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            I build full-stack web applications using{" "}
            <span style={{ color: "#93C5FD" }}>Next.js</span>,{" "}
            <span style={{ color: "#93C5FD" }}>React</span>,{" "}
            <span style={{ color: "#6EE7B7" }}>Node.js</span>,{" "}
            <span style={{ color: "#6EE7B7" }}>Typescript</span>,{" "}
            <span style={{ color: "#C4B5FD" }}>PostgreSQL</span>, MongoDB and Prisma, with a focus on
            clean architecture, secure authentication and real-world user experiences.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
              transition={itemTransition}
            style={{ display: "flex", gap: "0.875rem", flexWrap: "wrap" }}
          >
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="btn-primary"
              aria-label="View Muskan's work"
            >
              <Code2 size={17} />
              View My Work
            </a>
            <a
              href="/resume/Muskan-Kesharwani-Resume.pdf"
              download
              className="btn-secondary"
              aria-label="Download resume"
            >
              <Download size={17} />
              Download Resume
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            variants={itemVariants}
              transition={itemTransition}
            style={{ display: "flex", gap: "1rem", alignItems: "center" }}
          >
            {[
              {
                label: "GitHub",
                href: "https://github.com/muskan-am",
                icon: <GithubIcon size={18} />,
              },
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
              {
                label: "DSA Profile",
                href: "https://codolio.com/profile/muskan_am",
                icon: <ExternalLink size={18} />,
              },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.375rem",
                  fontSize: "0.85rem",
                  color: "var(--text-secondary)",
                  textDecoration: "none",
                  fontFamily: "'Inter', sans-serif",
                  transition: "color 0.2s",
                  fontWeight: 500,
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#93C5FD")}
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = "var(--text-secondary)")
                }
              >
                {social.icon}
                {social.label}
              </a>
            ))}
          </motion.div>
        </motion.div>

        {/* Right: Profile Image + 3D Scene */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "520px",
          }}
        >
          {/* 3D Scene Background */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 0,
            }}
          >
            <HeroScene />
          </div>

          {/* Profile Image */}
          <motion.div
            ref={imgRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              position: "relative",
              zIndex: 2,
              transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(0)`,
              transition: "transform 0.15s ease",
              WebkitBackfaceVisibility: "hidden",
              backfaceVisibility: "hidden",
              willChange: "transform",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "300px",
                height: "300px",
              }}
            >
              {/* Glow ring */}
              <div
                style={{
                  position: "absolute",
                  inset: "-4px",
                  borderRadius: "50%",
                  background:
                    "linear-gradient(135deg, #3B82F6, #8B5CF6, #06B6D4)",
                  padding: "3px",
                  zIndex: 0,
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    background: "var(--bg-base)",
                  }}
                />
              </div>

              {/* Outer glow */}
              <div
                style={{
                  position: "absolute",
                  inset: "-16px",
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)",
                  zIndex: -1,
                }}
              />

              {/* Image container */}
              <div
                style={{
                  position: "absolute",
                  inset: "3px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  zIndex: 1,
                  background: "var(--bg-card)",
                  WebkitMaskImage: "-webkit-radial-gradient(white, black)",
                  transform: "translateZ(0)",
                }}
              >
                {!imageError ? (
                  <Image
                    src="/images/muskan-profile.jpg"
                    alt="Muskan Kesharwani - Full Stack Developer"
                    fill
                    quality={95}
                    unoptimized
                    style={{
                      objectFit: "cover",
                      objectPosition: "center 35%",
                      imageRendering: "auto",
                    }}
                    priority
                    onError={() => setImageError(true)}
                  />
                ) : (
                  /* Placeholder when image not found */
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "linear-gradient(135deg, #1a2235, #0B1120)",
                      color: "var(--text-secondary)",
                      fontSize: "0.75rem",
                      textAlign: "center",
                      padding: "1rem",
                      gap: "0.5rem",
                    }}
                  >
                    <span style={{ fontSize: "2rem" }}>MK</span>
                    <span>Place photo at</span>
                    <span style={{ color: "#93C5FD", fontSize: "0.65rem" }}>
                      /public/images/muskan-profile.jpg
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              animate={{ y: [-4, 4, -4] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              style={{
                position: "absolute",
                bottom: "-12px",
                right: "-20px",
                background: "rgba(17, 24, 39, 0.95)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(59,130,246,0.2)",
                borderRadius: "12px",
                padding: "0.5rem 0.875rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                fontSize: "0.8rem",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                color: "#93C5FD",
                whiteSpace: "nowrap",
                boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
              }}
            >
              <span style={{ color: "#10B981" }}>●</span>
              Full Stack Dev
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.375rem",
          zIndex: 2,
        }}
        aria-hidden="true"
      >
        <span
          style={{
            fontSize: "0.7rem",
            letterSpacing: "0.15em",
            color: "var(--text-tertiary)",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          SCROLL
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={16} color="var(--text-tertiary)" />
        </motion.div>
      </motion.div>
    </section>
  );
}


