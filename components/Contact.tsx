"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Mail,
  Phone,
  ExternalLink,
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
  RefreshCw,
} from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/icons/BrandIcons";

type FormData = {
  name: string;
  email: string;
  message: string;
};

type FormErrors = Partial<FormData>;

type FormStatus = "idle" | "submitting" | "success" | "error";

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};
  const trimmedName = data.name.trim();
  const trimmedEmail = data.email.trim();
  const trimmedMessage = data.message.trim();

  if (!trimmedName) {
    errors.name = "Name is required.";
  } else if (trimmedName.length < 2) {
    errors.name = "Name must be at least 2 characters.";
  } else if (trimmedName.length > 100) {
    errors.name = "Name cannot exceed 100 characters.";
  }

  if (!trimmedEmail) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
    errors.email = "Please enter a valid email address.";
  } else if (trimmedEmail.length > 150) {
    errors.email = "Email cannot exceed 150 characters.";
  }

  if (!trimmedMessage) {
    errors.message = "Message is required.";
  } else if (trimmedMessage.length < 10) {
    errors.message = "Message must be at least 10 characters.";
  } else if (trimmedMessage.length > 3000) {
    errors.message = "Message cannot exceed 3000 characters.";
  }

  return errors;
}

export default function Contact() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });

  const [form, setForm] = useState<FormData>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [serverError, setServerError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    if (serverError) {
      setServerError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "submitting") return;

    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setStatus("submitting");
    setServerError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
        setErrors({});
      } else {
        setStatus("error");
        setServerError(
          data.error ||
            "Unable to send your message. Please try again or contact me directly."
        );
      }
    } catch (err) {
      console.error("Contact form fetch error:", err);
      setStatus("error");
      setServerError(
        "Unable to send your message. Please try again or contact me directly."
      );
    }
  };

  const inputStyle = (hasError: boolean) => ({
    width: "100%",
    background: "rgba(255,255,255,0.04)",
    border: `1px solid ${hasError ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.1)"}`,
    borderRadius: "10px",
    padding: "0.85rem 1rem",
    fontSize: "0.9rem",
    color: "var(--text-primary)",
    fontFamily: "'Inter', sans-serif",
    outline: "none",
    transition: "border-color 0.2s, background-color 0.2s",
    resize: "none" as const,
  });

  return (
    <section
      id="contact"
      style={{
        background: "var(--bg-base)",
        padding: "7rem 1.5rem",
        position: "relative",
        overflow: "hidden",
      }}
      aria-label="Contact section"
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(59,130,246,0.05), transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: "3.5rem", textAlign: "center" }}
        >
          <span className="section-label">08. Contact</span>
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 700,
              marginTop: "0.5rem",
              letterSpacing: "-0.02em",
            }}
          >
            Let&apos;s Build Something{" "}
            <span className="gradient-text">Great</span>
          </h2>
          <p
            style={{
              marginTop: "0.875rem",
              color: "var(--text-secondary)",
              fontFamily: "'Inter', sans-serif",
              fontSize: "1rem",
              maxWidth: "540px",
              margin: "0.875rem auto 0",
              lineHeight: 1.75,
            }}
          >
            I&apos;m open to full-time opportunities, high-impact projects, and
            conversations about building scalable web applications.
          </p>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.4fr",
            gap: "2rem",
          }}
          className="contact-grid"
        >
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={headerInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.7, ease: "easeOut" }}
            style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
          >
            {/* Contact details */}
            <div className="glass-card" style={{ padding: "1.75rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <h3
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  color: "var(--text-primary)",
                }}
              >
                Contact Details
              </h3>

              <a
                href="mailto:muskankesharwani63@gmail.com"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.875rem",
                  textDecoration: "none",
                  color: "var(--text-primary)",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#93C5FD")}
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = "var(--text-primary)")
                }
              >
                <div
                  style={{
                    width: "42px",
                    height: "42px",
                    background: "rgba(59,130,246,0.1)",
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    color: "#3B82F6",
                  }}
                >
                  <Mail size={18} />
                </div>
                <div>
                  <p style={{ fontSize: "0.75rem", color: "var(--text-tertiary)", fontFamily: "'Inter', sans-serif" }}>Email</p>
                  <p style={{ fontSize: "0.9rem", fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>
                    muskankesharwani63@gmail.com
                  </p>
                </div>
              </a>

              <a
                href="tel:+918738007458"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.875rem",
                  textDecoration: "none",
                  color: "var(--text-primary)",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#93C5FD")}
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = "var(--text-primary)")
                }
              >
                <div
                  style={{
                    width: "42px",
                    height: "42px",
                    background: "rgba(139,92,246,0.1)",
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    color: "#8B5CF6",
                  }}
                >
                  <Phone size={18} />
                </div>
                <div>
                  <p style={{ fontSize: "0.75rem", color: "var(--text-tertiary)", fontFamily: "'Inter', sans-serif" }}>Phone</p>
                  <p style={{ fontSize: "0.9rem", fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>
                    +91 8738007458
                  </p>
                </div>
              </a>
            </div>

            {/* Social links */}
            <div className="glass-card" style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <h3
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: "var(--text-secondary)",
                  letterSpacing: "0.05em",
                }}
              >
                CONNECT
              </h3>
              {[
                { label: "GitHub", url: "https://github.com/muskan-am", icon: <GithubIcon size={16} />, color: "#F9FAFB" },
                {
                  label: "LinkedIn",
                  url: "https://www.linkedin.com/in/muskan-kesharwani-3701432aa",
                  icon: <LinkedinIcon size={16} />,
                  color: "#3B82F6",
                },
                {
                  label: "X (Twitter)",
                  url: "https://x.com/MuskanK1120",
                  icon: <TwitterIcon size={16} />,
                  color: "#38BDF8",
                },
                {
                  label: "DSA Profile",
                  url: "https://codolio.com/profile/muskan_am",
                  icon: <ExternalLink size={16} />,
                  color: "#F59E0B",
                },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    padding: "0.6rem 0.875rem",
                    borderRadius: "8px",
                    textDecoration: "none",
                    color: "var(--text-secondary)",
                    fontSize: "0.875rem",
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 500,
                    transition: "background 0.2s, color 0.2s",
                    background: "transparent",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
                    (e.currentTarget as HTMLElement).style.color = link.color;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                    (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
                  }}
                  aria-label={`Visit ${link.label}`}
                >
                  <span style={{ color: link.color }}>{link.icon}</span>
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={headerInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.25, duration: 0.7, ease: "easeOut" }}
          >
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card"
                style={{
                  padding: "3.5rem 2rem",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "1.25rem",
                }}
              >
                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "50%",
                    background: "rgba(16,185,129,0.12)",
                    border: "1px solid rgba(16,185,129,0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CheckCircle size={36} color="#10B981" />
                </div>
                <h3
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "1.4rem",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                  }}
                >
                  Message Sent Successfully!
                </h3>
                <p
                  style={{
                    fontSize: "0.95rem",
                    color: "var(--text-secondary)",
                    fontFamily: "'Inter', sans-serif",
                    lineHeight: 1.7,
                    maxWidth: "380px",
                  }}
                >
                  Thank you for reaching out. I&apos;ll get back to you soon.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setStatus("idle");
                    setServerError("");
                    setForm({ name: "", email: "", message: "" });
                  }}
                  className="btn-secondary"
                  style={{
                    marginTop: "0.5rem",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    cursor: "pointer",
                  }}
                >
                  <RefreshCw size={15} />
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                aria-label="Contact form"
                className="glass-card"
                style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}
              >
                <div>
                  <h3
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: "1.2rem",
                      fontWeight: 700,
                      color: "var(--text-primary)",
                    }}
                  >
                    Send a Message
                  </h3>
                  <p
                    style={{
                      fontSize: "0.85rem",
                      color: "var(--text-tertiary)",
                      fontFamily: "'Inter', sans-serif",
                      marginTop: "0.2rem",
                    }}
                  >
                    Directly delivered to my inbox.
                  </p>
                </div>

                {/* Server error alert banner */}
                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    role="alert"
                    style={{
                      padding: "0.875rem 1rem",
                      background: "rgba(239,68,68,0.08)",
                      border: "1px solid rgba(239,68,68,0.3)",
                      borderRadius: "10px",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "0.6rem",
                      fontSize: "0.85rem",
                      color: "#FCA5A5",
                      fontFamily: "'Inter', sans-serif",
                      lineHeight: 1.5,
                    }}
                  >
                    <AlertCircle size={16} color="#F87171" style={{ flexShrink: 0, marginTop: "2px" }} />
                    <span>{serverError || "Unable to send your message. Please try again or contact me directly."}</span>
                  </motion.div>
                )}

                {/* Name */}
                <div>
                  <label
                    htmlFor="contact-name"
                    style={{
                      display: "block",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      color: "var(--text-secondary)",
                      marginBottom: "0.4rem",
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    Name *
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    disabled={status === "submitting"}
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    style={inputStyle(!!errors.name)}
                    onFocus={(e) => {
                      (e.currentTarget as HTMLInputElement).style.borderColor = "rgba(59,130,246,0.5)";
                    }}
                    onBlur={(e) => {
                      (e.currentTarget as HTMLInputElement).style.borderColor = errors.name
                        ? "rgba(239,68,68,0.5)"
                        : "rgba(255,255,255,0.1)";
                    }}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    aria-invalid={!!errors.name}
                    autoComplete="name"
                  />
                  {errors.name && (
                    <p id="name-error" role="alert" style={{ fontSize: "0.75rem", color: "#F87171", marginTop: "0.3rem", fontFamily: "'Inter', sans-serif", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                      <AlertCircle size={12} />{errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="contact-email"
                    style={{
                      display: "block",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      color: "var(--text-secondary)",
                      marginBottom: "0.4rem",
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    Email *
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    disabled={status === "submitting"}
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    style={inputStyle(!!errors.email)}
                    onFocus={(e) => {
                      (e.currentTarget as HTMLInputElement).style.borderColor = "rgba(59,130,246,0.5)";
                    }}
                    onBlur={(e) => {
                      (e.currentTarget as HTMLInputElement).style.borderColor = errors.email
                        ? "rgba(239,68,68,0.5)"
                        : "rgba(255,255,255,0.1)";
                    }}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    aria-invalid={!!errors.email}
                    autoComplete="email"
                  />
                  {errors.email && (
                    <p id="email-error" role="alert" style={{ fontSize: "0.75rem", color: "#F87171", marginTop: "0.3rem", fontFamily: "'Inter', sans-serif", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                      <AlertCircle size={12} />{errors.email}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="contact-message"
                    style={{
                      display: "block",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      color: "var(--text-secondary)",
                      marginBottom: "0.4rem",
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    Message *
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    disabled={status === "submitting"}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project, opportunity, or question..."
                    style={inputStyle(!!errors.message)}
                    onFocus={(e) => {
                      (e.currentTarget as HTMLTextAreaElement).style.borderColor = "rgba(59,130,246,0.5)";
                    }}
                    onBlur={(e) => {
                      (e.currentTarget as HTMLTextAreaElement).style.borderColor = errors.message
                        ? "rgba(239,68,68,0.5)"
                        : "rgba(255,255,255,0.1)";
                    }}
                    aria-describedby={errors.message ? "message-error" : undefined}
                    aria-invalid={!!errors.message}
                  />
                  {errors.message && (
                    <p id="message-error" role="alert" style={{ fontSize: "0.75rem", color: "#F87171", marginTop: "0.3rem", fontFamily: "'Inter', sans-serif", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                      <AlertCircle size={12} />{errors.message}
                    </p>
                  )}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="btn-primary"
                  style={{
                    alignSelf: "flex-start",
                    opacity: status === "submitting" ? 0.75 : 1,
                    cursor: status === "submitting" ? "not-allowed" : "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                  aria-label="Submit contact form"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
