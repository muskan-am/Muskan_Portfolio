"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Phone, ExternalLink, Send, CheckCircle, AlertCircle } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/icons/BrandIcons";

type FormData = {
  name: string;
  email: string;
  message: string;
};

type FormErrors = Partial<FormData>;

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim()) errors.name = "Name is required.";
  if (!data.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!data.message.trim()) {
    errors.message = "Message is required.";
  } else if (data.message.trim().length < 20) {
    errors.message = "Message must be at least 20 characters.";
  }
  return errors;
}

export default function Contact() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });

  const [form, setForm] = useState<FormData>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    // NOTE: No backend configured. This is a UI-only form.
    // To enable email sending, integrate with a service like Resend, EmailJS, or a custom API route.
    setSubmitted(true);
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
    transition: "border-color 0.2s",
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
            I&apos;m open to full-time opportunities, interesting projects and
            conversations about building modern web applications.
          </p>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.4fr",
            gap: "3rem",
            alignItems: "start",
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
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: "var(--text-secondary)",
                  letterSpacing: "0.05em",
                }}
              >
                GET IN TOUCH
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
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-primary)")}
                aria-label="Send email to Muskan"
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
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-primary)")}
                aria-label="Call Muskan"
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
                  <p style={{ fontSize: "0.9rem", fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>+91 8738007458</p>
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
            {submitted ? (
              <div
                className="glass-card"
                style={{
                  padding: "3rem 2rem",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <CheckCircle size={48} color="#10B981" />
                <h3
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "1.3rem",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                  }}
                >
                  Message Received!
                </h3>
                <p
                  style={{
                    fontSize: "0.9rem",
                    color: "var(--text-secondary)",
                    fontFamily: "'Inter', sans-serif",
                    lineHeight: 1.7,
                    maxWidth: "340px",
                  }}
                >
                  Thank you for reaching out. I&apos;ll get back to you as soon as possible.
                </p>
                <p
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--text-tertiary)",
                    fontFamily: "'Inter', sans-serif",
                    marginTop: "0.5rem",
                    padding: "0.5rem 1rem",
                    background: "rgba(245,158,11,0.08)",
                    border: "1px solid rgba(245,158,11,0.2)",
                    borderRadius: "8px",
                  }}
                >
                  ⚠ Backend integration pending — email was not actually sent.
                  <br />Please contact directly at muskankeshwarni63@gmail.com.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                aria-label="Contact form"
                className="glass-card"
                style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}
              >
                <h3
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    color: "var(--text-primary)",
                    marginBottom: "0.25rem",
                  }}
                >
                  Send a Message
                </h3>

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

                {/* Disclaimer */}
                <p
                  style={{
                    fontSize: "0.72rem",
                    color: "var(--text-tertiary)",
                    fontFamily: "'Inter', sans-serif",
                    padding: "0.5rem 0.75rem",
                    background: "rgba(245,158,11,0.06)",
                    border: "1px solid rgba(245,158,11,0.15)",
                    borderRadius: "8px",
                  }}
                >
                  ⚠ Backend integration pending — this form does not yet send emails.
                  To enable, integrate with Resend or EmailJS.
                </p>

                <button
                  type="submit"
                  className="btn-primary"
                  style={{ alignSelf: "flex-start" }}
                  aria-label="Submit contact form"
                >
                  <Send size={16} />
                  Send Message
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}


