"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Menu, X, ExternalLink } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/icons/BrandIcons";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);

  // Scroll detection & active section spy
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = [...navLinks].reverse().map((l) => l.href.replace("#", ""));
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open & close on resize to desktop
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    const handleResize = () => {
      if (window.innerWidth > 960) {
        setMobileOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileOpen]);

  const handleNav = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: "0 1.5rem",
          transition: "background 0.3s, box-shadow 0.3s, backdrop-filter 0.3s",
          background: scrolled
            ? "rgba(5, 8, 22, 0.88)"
            : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        }}
      >
        <nav
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            height: "68px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          aria-label="Main navigation"
        >
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNav("#home");
            }}
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: "1.45rem",
              textDecoration: "none",
              background: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "-0.02em",
              display: "flex",
              alignItems: "center",
              gap: "0.2rem",
            }}
            aria-label="Muskan Kesharwani - Home"
          >
            MK
            <span style={{ color: "#3B82F6", WebkitTextFillColor: "#3B82F6" }}>.</span>
          </a>

          {/* Desktop Nav - hidden on <=960px via CSS class */}
          <ul className="desktop-nav">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNav(link.href);
                    }}
                    style={{
                      padding: "0.45rem 0.85rem",
                      borderRadius: "8px",
                      fontSize: "0.875rem",
                      fontWeight: 500,
                      fontFamily: "'Inter', sans-serif",
                      textDecoration: "none",
                      color: isActive ? "#93C5FD" : "var(--text-secondary)",
                      background: isActive ? "rgba(59,130,246,0.12)" : "transparent",
                      border: isActive ? "1px solid rgba(59,130,246,0.25)" : "1px solid transparent",
                      transition: "all 0.2s",
                      display: "block",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        (e.currentTarget as HTMLElement).style.color = "#fff";
                        (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
                        (e.currentTarget as HTMLElement).style.background = "transparent";
                      }
                    }}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Right Action: Desktop Resume & Mobile Hamburger Toggle */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <a
              href="/resume/Muskan-Kesharwani-Resume.pdf"
              download
              className="nav-resume-btn btn-primary"
              style={{
                padding: "0.45rem 1.15rem",
                fontSize: "0.85rem",
                textDecoration: "none",
              }}
              aria-label="Download Muskan's Resume"
            >
              <Download size={15} />
              Resume
            </a>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="mobile-menu-btn"
              aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileOpen}
              style={{
                background: mobileOpen ? "rgba(59,130,246,0.15)" : "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "10px",
                color: mobileOpen ? "#93C5FD" : "var(--text-primary)",
                cursor: "pointer",
                padding: "0.55rem",
                transition: "all 0.2s",
              }}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay & Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.6)",
                backdropFilter: "blur(4px)",
                WebkitBackdropFilter: "blur(4px)",
                zIndex: 98,
              }}
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{
                position: "fixed",
                top: "68px",
                left: 0,
                right: 0,
                zIndex: 99,
                background: "rgba(11, 17, 32, 0.98)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                borderBottom: "1px solid rgba(59,130,246,0.2)",
                boxShadow: "0 20px 40px rgba(0,0,0,0.7)",
                padding: "1.25rem 1.5rem 1.75rem",
                maxHeight: "calc(100vh - 68px)",
                overflowY: "auto",
              }}
            >
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.4rem", padding: 0, margin: 0 }}>
                {navLinks.map((link, idx) => {
                  const isActive = activeSection === link.href.replace("#", "");
                  return (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.04 }}
                    >
                      <a
                        href={link.href}
                        onClick={(e) => {
                          e.preventDefault();
                          handleNav(link.href);
                        }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "0.85rem 1.1rem",
                          borderRadius: "10px",
                          fontSize: "1rem",
                          fontWeight: 500,
                          fontFamily: "'Inter', sans-serif",
                          textDecoration: "none",
                          color: isActive ? "#fff" : "var(--text-secondary)",
                          background: isActive
                            ? "linear-gradient(90deg, rgba(59,130,246,0.2), rgba(139,92,246,0.1))"
                            : "rgba(255,255,255,0.02)",
                          border: isActive
                            ? "1px solid rgba(59,130,246,0.3)"
                            : "1px solid rgba(255,255,255,0.04)",
                          transition: "all 0.2s",
                        }}
                        aria-current={isActive ? "page" : undefined}
                      >
                        <span>{link.label}</span>
                        {isActive && (
                          <span
                            style={{
                              width: "7px",
                              height: "7px",
                              borderRadius: "50%",
                              background: "#3B82F6",
                              boxShadow: "0 0 10px #3B82F6",
                            }}
                          />
                        )}
                      </a>
                    </motion.li>
                  );
                })}

                {/* Resume Download in Drawer */}
                <motion.li
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navLinks.length * 0.04 }}
                  style={{ marginTop: "0.5rem" }}
                >
                  <a
                    href="/resume/Muskan-Kesharwani-Resume.pdf"
                    download
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.6rem",
                      padding: "0.85rem 1rem",
                      borderRadius: "10px",
                      background: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
                      color: "white",
                      fontWeight: 600,
                      fontSize: "0.95rem",
                      textDecoration: "none",
                      fontFamily: "'Inter', sans-serif",
                      boxShadow: "0 4px 16px rgba(59,130,246,0.3)",
                    }}
                  >
                    <Download size={17} />
                    Download Resume
                  </a>
                </motion.li>

                {/* Social links row in Drawer */}
                <motion.li
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: (navLinks.length + 1) * 0.04 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "1.25rem",
                    paddingTop: "1.25rem",
                    marginTop: "0.5rem",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  {[
                    { label: "GitHub", href: "https://github.com/muskan-am", icon: <GithubIcon size={18} /> },
                    { label: "LinkedIn", href: "https://www.linkedin.com/in/muskan-kesharwani-3701432aa", icon: <LinkedinIcon size={18} /> },
                    { label: "X (Twitter)", href: "https://x.com/MuskanK1120", icon: <TwitterIcon size={18} /> },
                  ].map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "36px",
                        height: "36px",
                        borderRadius: "8px",
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        color: "var(--text-secondary)",
                        textDecoration: "none",
                      }}
                    >
                      {s.icon}
                    </a>
                  ))}
                </motion.li>
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
