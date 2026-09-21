"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Menu, X } from "lucide-react";

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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = navLinks.map((l) => l.href.replace("#", ""));
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNav = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
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
            ? "rgba(5, 8, 22, 0.85)"
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
            onClick={(e) => { e.preventDefault(); handleNav("#home"); }}
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: "1.4rem",
              textDecoration: "none",
              background: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "-0.02em",
            }}
            aria-label="Muskan Kesharwani - Home"
          >
            Muskan Kesharwani
          </a>

          {/* Desktop Nav */}
          <ul
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.25rem",
              listStyle: "none",
            }}
            className="hidden md:flex"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleNav(link.href); }}
                    style={{
                      padding: "0.4rem 0.85rem",
                      borderRadius: "8px",
                      fontSize: "0.875rem",
                      fontWeight: 500,
                      fontFamily: "'Inter', sans-serif",
                      textDecoration: "none",
                      color: isActive ? "#fff" : "var(--text-secondary)",
                      background: isActive ? "rgba(59,130,246,0.12)" : "transparent",
                      transition: "all 0.2s",
                      display: "block",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) (e.currentTarget as HTMLElement).style.color = "#fff";
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
                    }}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* CTA + Mobile Button */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <a
              href="/resume/Muskan-Kesharwani-Resume.pdf"
              download
              className="hidden md:inline-flex btn-primary"
              style={{ padding: "0.5rem 1.25rem", fontSize: "0.85rem" }}
              aria-label="Download Muskan's Resume"
            >
              <Download size={15} />
              Resume
            </a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              style={{
                background: "none",
                border: "none",
                color: "var(--text-primary)",
                cursor: "pointer",
                padding: "0.25rem",
              }}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            style={{
              position: "fixed",
              top: "68px",
              left: 0,
              right: 0,
              zIndex: 99,
              background: "rgba(5, 8, 22, 0.97)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              padding: "1.5rem",
            }}
          >
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace("#", "");
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => { e.preventDefault(); handleNav(link.href); }}
                      style={{
                        display: "block",
                        padding: "0.75rem 1rem",
                        borderRadius: "10px",
                        fontSize: "0.95rem",
                        fontWeight: 500,
                        fontFamily: "'Inter', sans-serif",
                        textDecoration: "none",
                        color: isActive ? "#fff" : "var(--text-secondary)",
                        background: isActive ? "rgba(59,130,246,0.12)" : "transparent",
                      }}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
              <li>
                <a
                  href="/resume/Muskan-Kesharwani-Resume.pdf"
                  download
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    marginTop: "0.5rem",
                    padding: "0.75rem 1rem",
                    borderRadius: "10px",
                    background: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
                    color: "white",
                    fontWeight: 600,
                    fontSize: "0.9rem",
                    textDecoration: "none",
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  <Download size={16} />
                  Download Resume
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
