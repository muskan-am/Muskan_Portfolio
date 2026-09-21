"use client";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  X,
  ExternalLink,
  ChevronRight,
  Layers,
  ShieldCheck,
  LayoutDashboard,
  CheckCircle2,
  ArrowDown,
  ArrowRight,
  Cpu,
} from "lucide-react";
import { GithubIcon } from "@/components/icons/BrandIcons";

type TechCategory = {
  category: string;
  items: string[];
};

type Project = {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  isFeatured: boolean;
  accentColor: string;
  description: string;
  tech: string[];
  features: string[];
  liveUrl: string;
  githubUrl?: string;
  overview: string;
  problem: string;
  solution: string;
  keyFeaturesList: string[];
  techStackCategories: TechCategory[];
  architecture: {
    layers: string[];
    auth?: string;
    external?: string[];
  };
  authRbac: string;
  adminDashboard: string;
  workflow: string[];
};

const projects: Project[] = [
  {
    id: "prime-rides",
    title: "Prime Rides",
    subtitle: "Self-Drive Car Rental Platform",
    badge: "Featured Project",
    isFeatured: true,
    accentColor: "#3B82F6",
    description:
      "A full-stack self-drive car rental platform designed to manage vehicle rentals, bookings, locations, inventory and complete customer workflows — from booking to refund.",
    liveUrl: "https://prime-rides-two.vercel.app",
    tech: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Prisma ORM",
      "Razorpay",
      "Nodemailer",
      "RBAC",
    ],
    features: [
      "Customer booking workflow",
      "Vehicle & inventory management",
      "Location management",
      "Availability tracking & dynamic pricing",
      "Coupon management",
      "Booking & refund workflow",
      "Admin dashboard",
      "Team management",
      "Enquiry management",
      "Secure Razorpay payments",
      "Email notifications via Nodemailer",
      "Role-Based Access Control",
    ],
    overview:
      "A full-stack self-drive car rental platform designed to manage vehicle rentals, bookings, locations, inventory and complete customer workflows — from booking to refund.",
    problem:
      "The client needed a complete end-to-end car rental management system — handling everything from customer-facing vehicle browsing and booking to admin-side fleet management, payment processing, and team operations.",
    solution:
      "Built a full-stack platform using Next.js App Router with TypeScript, PostgreSQL as the database managed through Prisma ORM. Implemented secure RBAC with distinct customer, admin, and team roles. Integrated Razorpay for payment collection and Nodemailer for transactional email notifications.",
    keyFeaturesList: [
      "Customer booking workflow",
      "Vehicle & inventory management",
      "Location management",
      "Availability tracking & dynamic pricing",
      "Coupon management",
      "Booking & refund workflow",
      "Admin dashboard",
      "Team management",
      "Enquiry management",
      "Razorpay payment integration",
      "Nodemailer email alerts",
      "Role-Based Access Control",
    ],
    techStackCategories: [
      { category: "Frontend", items: ["Next.js (App Router)", "TypeScript", "Tailwind CSS"] },
      { category: "Backend", items: ["Next.js API Routes", "Server Actions"] },
      { category: "Database", items: ["PostgreSQL", "Prisma ORM"] },
      { category: "Payments", items: ["Razorpay"] },
      { category: "Email", items: ["Nodemailer"] },
      { category: "Authentication", items: ["Role-Based Access Control (RBAC)"] },
    ],
    architecture: {
      layers: [
        "User Interface (Next.js App Router)",
        "API Layer (Next.js API Routes)",
        "Business Logic & Server Actions",
        "Prisma ORM",
        "PostgreSQL Database",
      ],
      auth: "Role-Based Access Control (RBAC)",
      external: ["Razorpay Payments", "Nodemailer Email"],
    },
    authRbac:
      "Multi-tier Role-Based Access Control secures customer bookings, team management permissions, and administrative operations with distinct authorization levels.",
    adminDashboard:
      "Comprehensive control center for fleet inventory, booking statuses, dynamic availability pricing, customer enquiries, and refund processing.",
    workflow: [
      "Vehicle Discovery",
      "Availability & Pricing",
      "Customer Booking",
      "Razorpay Payment",
      "Email Confirmation",
      "Fleet & Refund Management",
    ],
  },
  {
    id: "library-management",
    title: "Library Management System",
    subtitle: "Full-Stack MERN Library Platform",
    badge: "Full-Stack Project",
    isFeatured: false,
    accentColor: "#8B5CF6",
    description:
      "A full-stack library management platform designed to simplify and manage books, users, issue/return workflows, and day-to-day library operations through a responsive admin dashboard.",
    liveUrl: "https://digitallibrary11.netlify.app",
    tech: [
      "MongoDB",
      "Express.js",
      "React.js",
      "Node.js",
      "JWT",
      "REST APIs",
    ],
    features: [
      "User authentication",
      "JWT-based secure authentication",
      "Role-Based Access Control",
      "Book management",
      "User management",
      "Book issue and return workflow",
      "Search and book discovery",
      "Due-date tracking",
      "Admin dashboard",
      "Library operations management",
      "RESTful APIs",
      "Responsive interface",
    ],
    overview:
      "A full-stack MERN application for managing books, users and common library operations.",
    problem:
      "Traditional library workflows can require manual tracking of books, users, issue/return records and due dates.",
    solution:
      "The platform centralizes library operations through a web-based interface with authentication, role-based access and dedicated management workflows.",
    keyFeaturesList: [
      "Authentication",
      "JWT",
      "RBAC",
      "Book management",
      "User management",
      "Issue/return workflow",
      "Search",
      "Due-date tracking",
      "Admin dashboard",
    ],
    techStackCategories: [
      { category: "Frontend", items: ["React.js"] },
      { category: "Backend", items: ["Node.js", "Express.js"] },
      { category: "Database", items: ["MongoDB"] },
      { category: "Authentication", items: ["JWT"] },
      { category: "API", items: ["REST APIs"] },
    ],
    architecture: {
      layers: [
        "User",
        "React Frontend",
        "REST APIs",
        "Node.js + Express.js",
        "MongoDB",
      ],
      auth: "JWT",
    },
    authRbac:
      "JWT-based authentication is used to secure accounts and role-based access control restricts functionality according to user roles.",
    adminDashboard:
      "The admin dashboard provides management functionality for books, users, search and due-date tracking.",
    workflow: [
      "Book",
      "Available Books",
      "Issue Book",
      "Due Date Tracking",
      "Return Book",
      "Library Record Updated",
    ],
  },
];

function ArchitectureFlowView({
  arch,
  accentColor,
}: {
  arch: Project["architecture"];
  accentColor: string;
}) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "14px",
        padding: "1.5rem",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          marginBottom: "1.25rem",
        }}
      >
        <Cpu size={16} color={accentColor} />
        <p
          style={{
            fontSize: "0.75rem",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--text-tertiary)",
          }}
        >
          6. Architecture
        </p>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          gap: "0",
        }}
      >
        {arch.layers.map((layer, i) => (
          <div key={layer} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              style={{
                width: "100%",
                padding: "0.6rem 1rem",
                textAlign: "center",
                background:
                  i === 0
                    ? "rgba(59,130,246,0.12)"
                    : i === arch.layers.length - 1
                    ? "rgba(16,185,129,0.1)"
                    : "rgba(255,255,255,0.03)",
                border: `1px solid ${
                  i === 0
                    ? "rgba(59,130,246,0.3)"
                    : i === arch.layers.length - 1
                    ? "rgba(16,185,129,0.3)"
                    : "rgba(255,255,255,0.08)"
                }`,
                borderRadius: "8px",
                fontSize: "0.85rem",
                color:
                  i === 0
                    ? "#93C5FD"
                    : i === arch.layers.length - 1
                    ? "#6EE7B7"
                    : "var(--text-primary)",
                fontWeight: 600,
              }}
            >
              {layer}
            </motion.div>
            {i < arch.layers.length - 1 && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "24px",
                  color: "rgba(255,255,255,0.3)",
                }}
              >
                <ArrowDown size={14} />
              </div>
            )}
          </div>
        ))}

        {arch.auth && (
          <div
            style={{
              marginTop: "1rem",
              padding: "0.6rem 0.85rem",
              background: "rgba(139,92,246,0.08)",
              border: "1px solid rgba(139,92,246,0.25)",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontSize: "0.8rem",
            }}
          >
            <span style={{ color: "var(--text-tertiary)" }}>Authentication:</span>
            <span style={{ color: "#C4B5FD", fontWeight: 600 }}>{arch.auth}</span>
          </div>
        )}

        {arch.external && arch.external.length > 0 && (
          <div
            style={{
              marginTop: "0.75rem",
              paddingTop: "0.75rem",
              borderTop: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <p
              style={{
                fontSize: "0.7rem",
                color: "var(--text-tertiary)",
                marginBottom: "0.5rem",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              External Integrations
            </p>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {arch.external.map((srv) => (
                <span
                  key={srv}
                  style={{
                    padding: "0.25rem 0.6rem",
                    background: "rgba(245,158,11,0.08)",
                    border: "1px solid rgba(245,158,11,0.2)",
                    borderRadius: "6px",
                    fontSize: "0.75rem",
                    color: "#FCD34D",
                    fontWeight: 500,
                  }}
                >
                  {srv}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function CoreWorkflowView({
  workflow,
  accentColor,
}: {
  workflow: string[];
  accentColor: string;
}) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "14px",
        padding: "1.5rem",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          marginBottom: "1.25rem",
        }}
      >
        <Layers size={16} color={accentColor} />
        <p
          style={{
            fontSize: "0.75rem",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--text-tertiary)",
          }}
        >
          9. Core Workflow
        </p>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0",
        }}
      >
        {workflow.map((step, i) => (
          <div key={step} style={{ display: "flex", flexDirection: "column", alignItems: "stretch" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.55rem 0.85rem",
                background:
                  i === 0
                    ? "rgba(59,130,246,0.08)"
                    : i === workflow.length - 1
                    ? "rgba(16,185,129,0.08)"
                    : "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "8px",
              }}
            >
              <span
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  background:
                    i === 0
                      ? "#3B82F6"
                      : i === workflow.length - 1
                      ? "#10B981"
                      : "rgba(255,255,255,0.15)",
                  color: "#fff",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {i + 1}
              </span>
              <span
                style={{
                  fontSize: "0.85rem",
                  fontWeight: 500,
                  color:
                    i === 0
                      ? "#93C5FD"
                      : i === workflow.length - 1
                      ? "#6EE7B7"
                      : "var(--text-primary)",
                }}
              >
                {step}
              </span>
            </div>

            {i < workflow.length - 1 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "20px",
                  color: "rgba(255,255,255,0.3)",
                }}
              >
                <ArrowDown size={13} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.85)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1rem",
          overflowY: "auto",
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
        role="dialog"
        aria-modal="true"
        aria-label={`${project.title} Case Study`}
      >
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.96 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--glass-border)",
            borderRadius: "20px",
            width: "100%",
            maxWidth: "860px",
            maxHeight: "90vh",
            overflowY: "auto",
            position: "relative",
            boxShadow: `0 24px 64px rgba(0,0,0,0.6), 0 0 40px ${project.accentColor}15`,
          }}
        >
          {/* Top accent line */}
          <div
            style={{
              height: "3px",
              background: `linear-gradient(90deg, ${project.accentColor}, #8B5CF6, #06B6D4)`,
              borderRadius: "20px 20px 0 0",
            }}
          />

          <div style={{ padding: "2rem" }}>
            {/* Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "1.5rem",
              }}
            >
              <div>
                <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginBottom: "0.5rem" }}>
                  <span
                    className={project.isFeatured ? "badge badge-blue" : "badge badge-purple"}
                    style={{
                      background: project.isFeatured ? undefined : "rgba(139,92,246,0.15)",
                      color: project.isFeatured ? undefined : "#C4B5FD",
                      border: project.isFeatured ? undefined : "1px solid rgba(139,92,246,0.3)",
                    }}
                  >
                    {project.badge}
                  </span>
                  {project.isFeatured && (
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
                      }}
                    >
                      Production Deployed
                    </span>
                  )}
                </div>
                <h2
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "1.75rem",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {project.title}
                </h2>
                <p
                  style={{
                    color: "var(--text-secondary)",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.95rem",
                    marginTop: "0.25rem",
                    fontWeight: 500,
                  }}
                >
                  {project.subtitle}
                </p>
              </div>

              <button
                onClick={onClose}
                aria-label="Close modal"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "none",
                  color: "var(--text-secondary)",
                  cursor: "pointer",
                  padding: "0.5rem",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "background 0.2s, color 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.12)";
                  (e.currentTarget as HTMLElement).style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)";
                  (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Tech badges pill bar */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.5rem",
                marginBottom: "2rem",
                paddingBottom: "1.5rem",
                borderBottom: "1px solid var(--border-subtle)",
              }}
            >
              {project.tech.map((t) => (
                <span
                  key={t}
                  style={{
                    padding: "0.3rem 0.75rem",
                    background: `${project.accentColor}12`,
                    border: `1px solid ${project.accentColor}30`,
                    borderRadius: "8px",
                    fontSize: "0.8rem",
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 600,
                    color: project.accentColor === "#3B82F6" ? "#93C5FD" : "#C4B5FD",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Section 1: Overview */}
            <div
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "14px",
                padding: "1.5rem",
                marginBottom: "1.5rem",
              }}
            >
              <p
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#60A5FA",
                  marginBottom: "0.5rem",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                1. Overview
              </p>
              <p
                style={{
                  fontSize: "0.95rem",
                  color: "var(--text-primary)",
                  lineHeight: 1.7,
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {project.overview}
              </p>
            </div>

            {/* Section 2 & 3: Problem and Solution */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1.25rem",
                marginBottom: "1.5rem",
              }}
              className="modal-grid"
            >
              {/* Problem */}
              <div
                style={{
                  background: "rgba(239,68,68,0.04)",
                  border: "1px solid rgba(239,68,68,0.2)",
                  borderRadius: "14px",
                  padding: "1.5rem",
                }}
              >
                <p
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#F87171",
                    marginBottom: "0.5rem",
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  2. Problem
                </p>
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--text-secondary)",
                    lineHeight: 1.7,
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  {project.problem}
                </p>
              </div>

              {/* Solution */}
              <div
                style={{
                  background: "rgba(16,185,129,0.04)",
                  border: "1px solid rgba(16,185,129,0.2)",
                  borderRadius: "14px",
                  padding: "1.5rem",
                }}
              >
                <p
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#34D399",
                    marginBottom: "0.5rem",
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  3. Solution
                </p>
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--text-secondary)",
                    lineHeight: 1.7,
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  {project.solution}
                </p>
              </div>
            </div>

            {/* Section 4: Key Features */}
            <div
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "14px",
                padding: "1.5rem",
                marginBottom: "1.5rem",
              }}
            >
              <p
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--text-tertiary)",
                  marginBottom: "1rem",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                4. Key Features
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                  gap: "0.75rem",
                }}
              >
                {project.keyFeaturesList.map((f) => (
                  <div
                    key={f}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      fontSize: "0.85rem",
                      color: "var(--text-secondary)",
                      fontFamily: "'Inter', sans-serif",
                      background: "rgba(255,255,255,0.02)",
                      padding: "0.5rem 0.75rem",
                      borderRadius: "8px",
                      border: "1px solid rgba(255,255,255,0.05)",
                    }}
                  >
                    <CheckCircle2 size={15} color={project.accentColor} style={{ flexShrink: 0 }} />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 5: Technology Stack */}
            <div
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "14px",
                padding: "1.5rem",
                marginBottom: "1.5rem",
              }}
            >
              <p
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#A78BFA",
                  marginBottom: "1rem",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                5. Technology Stack
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))",
                  gap: "1rem",
                }}
              >
                {project.techStackCategories.map((cat) => (
                  <div
                    key={cat.category}
                    style={{
                      padding: "0.875rem",
                      background: "rgba(255,255,255,0.03)",
                      borderRadius: "10px",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "0.75rem",
                        color: "var(--text-tertiary)",
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        marginBottom: "0.4rem",
                      }}
                    >
                      {cat.category}:
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                      {cat.items.map((item) => (
                        <span
                          key={item}
                          style={{
                            fontSize: "0.85rem",
                            fontWeight: 600,
                            color: "var(--text-primary)",
                            fontFamily: "'Inter', sans-serif",
                          }}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 6 & 9: Architecture & Core Workflow Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1.25rem",
                marginBottom: "1.5rem",
              }}
              className="modal-grid"
            >
              <ArchitectureFlowView arch={project.architecture} accentColor={project.accentColor} />
              <CoreWorkflowView workflow={project.workflow} accentColor={project.accentColor} />
            </div>

            {/* Section 7 & 8: Authentication & RBAC + Admin Dashboard */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1.25rem",
                marginBottom: "2rem",
              }}
              className="modal-grid"
            >
              {/* 7. Auth & RBAC */}
              <div
                style={{
                  background: "rgba(139,92,246,0.04)",
                  border: "1px solid rgba(139,92,246,0.2)",
                  borderRadius: "14px",
                  padding: "1.5rem",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.6rem" }}>
                  <ShieldCheck size={16} color="#A78BFA" />
                  <p
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "#A78BFA",
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    7. Authentication & RBAC
                  </p>
                </div>
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--text-secondary)",
                    lineHeight: 1.7,
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  {project.authRbac}
                </p>
              </div>

              {/* 8. Admin Dashboard */}
              <div
                style={{
                  background: "rgba(59,130,246,0.04)",
                  border: "1px solid rgba(59,130,246,0.2)",
                  borderRadius: "14px",
                  padding: "1.5rem",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.6rem" }}>
                  <LayoutDashboard size={16} color="#60A5FA" />
                  <p
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "#60A5FA",
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    8. Admin Dashboard
                  </p>
                </div>
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--text-secondary)",
                    lineHeight: 1.7,
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  {project.adminDashboard}
                </p>
              </div>
            </div>

            {/* Bottom Actions */}
            <div
              style={{
                display: "flex",
                gap: "1rem",
                paddingTop: "1.5rem",
                borderTop: "1px solid var(--border-subtle)",
                flexWrap: "wrap",
              }}
            >
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                aria-label={`View live demo of ${project.title}`}
              >
                <ExternalLink size={16} />
                Live Demo
              </a>
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                  aria-label={`View ${project.title} on GitHub`}
                >
                  <GithubIcon size={16} />
                  GitHub
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function ProjectCard({
  project,
  onOpen,
  index,
}: {
  project: Project;
  onOpen: () => void;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setTilt({ x: dy * -4, y: dx * 4 });
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.7, ease: "easeOut" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: "transform 0.15s ease",
        width: "100%",
      }}
      className="featured-card"
    >
      <div
        className="glass-card"
        style={{
          padding: "2.5rem",
          position: "relative",
          overflow: "hidden",
          display: "grid",
          gridTemplateColumns: "1.1fr 0.9fr",
          gap: "2.5rem",
          height: "100%",
          cursor: "pointer",
          transition: "border-color 0.3s, box-shadow 0.3s",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = `${project.accentColor}45`;
          (e.currentTarget as HTMLElement).style.boxShadow = `0 12px 48px ${project.accentColor}18`;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = "var(--glass-border)";
          (e.currentTarget as HTMLElement).style.boxShadow = "none";
        }}
        onClick={onOpen}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && onOpen()}
        aria-label={`View ${project.title} case study`}
      >
        {/* Gradient accent top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "2px",
            background: `linear-gradient(90deg, ${project.accentColor}, #8B5CF6, transparent)`,
          }}
        />

        {/* Glow blob */}
        <div
          style={{
            position: "absolute",
            top: "-40px",
            right: "-40px",
            width: "220px",
            height: "220px",
            background: `radial-gradient(circle, ${project.accentColor}18, transparent 70%)`,
            pointerEvents: "none",
          }}
        />

        {/* Left Column: Info, Badges, Tech, Actions */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {/* Header Badges */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", flexWrap: "wrap" }}>
              <span
                className={project.isFeatured ? "badge badge-blue" : "badge badge-purple"}
                style={{
                  background: project.isFeatured ? undefined : "rgba(139,92,246,0.15)",
                  color: project.isFeatured ? undefined : "#C4B5FD",
                  border: project.isFeatured ? undefined : "1px solid rgba(139,92,246,0.3)",
                }}
              >
                {project.badge}
              </span>
              {project.isFeatured && (
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
                  }}
                >
                  Production Deployed
                </span>
              )}
            </div>

            {/* Title & Subtitle */}
            <div>
              <h3
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "1.6rem",
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  letterSpacing: "-0.02em",
                }}
              >
                {project.title}
              </h3>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.9rem",
                  color: project.accentColor === "#3B82F6" ? "#93C5FD" : "#C4B5FD",
                  marginTop: "0.25rem",
                  fontWeight: 500,
                }}
              >
                {project.subtitle}
              </p>
            </div>

            {/* Description */}
            <p
              style={{
                fontSize: "0.9rem",
                color: "var(--text-secondary)",
                lineHeight: 1.7,
                fontFamily: "'Inter', sans-serif",
              }}
            >
              {project.description}
            </p>

            {/* Technology Badges */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem" }}>
              {project.tech.map((t) => (
                <span
                  key={t}
                  style={{
                    padding: "0.25rem 0.65rem",
                    background: `${project.accentColor}12`,
                    border: `1px solid ${project.accentColor}30`,
                    borderRadius: "6px",
                    fontSize: "0.75rem",
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 500,
                    color: project.accentColor === "#3B82F6" ? "#93C5FD" : "#C4B5FD",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom Actions */}
          <div
            style={{
              display: "flex",
              gap: "1rem",
              paddingTop: "1rem",
              borderTop: "1px solid rgba(255,255,255,0.06)",
              alignItems: "center",
            }}
          >
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="btn-primary"
              style={{
                padding: "0.5rem 1.1rem",
                fontSize: "0.85rem",
                textDecoration: "none",
              }}
              aria-label={`Live demo of ${project.title}`}
            >
              <ExternalLink size={15} />
              Live Demo
            </a>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpen();
              }}
              className="btn-secondary"
              style={{
                padding: "0.5rem 1.1rem",
                fontSize: "0.85rem",
                cursor: "pointer",
              }}
              aria-label={`View ${project.title} case study`}
            >
              <Layers size={15} />
              Case Study
            </button>
          </div>
        </div>

        {/* Right Column: KEY FEATURES Panel */}
        <div
          style={{
            background: "rgba(255,255,255,0.02)",
            borderRadius: "14px",
            padding: "1.75rem",
            border: "1px solid var(--border-subtle)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "1.25rem",
              }}
            >
              <p
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--text-tertiary)",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                KEY FEATURES
              </p>
              <span
                style={{
                  fontSize: "0.7rem",
                  color: project.accentColor,
                  fontWeight: 600,
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {project.features.length} Highlights
              </span>
            </div>

            <ul
              style={{
                listStyle: "none",
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: "0.55rem",
                padding: 0,
                margin: 0,
              }}
            >
              {project.features.map((f) => (
                <li
                  key={f}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.55rem",
                    fontSize: "0.85rem",
                    color: "var(--text-secondary)",
                    fontFamily: "'Inter', sans-serif",
                    lineHeight: 1.4,
                  }}
                >
                  <div
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: project.accentColor,
                      flexShrink: 0,
                    }}
                  />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          <div
            style={{
              marginTop: "1.25rem",
              paddingTop: "0.75rem",
              borderTop: "1px solid rgba(255,255,255,0.05)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontSize: "0.75rem",
              color: "var(--text-tertiary)",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            <span>Interactive Architecture & Workflow</span>
            <span
              style={{
                color: project.accentColor,
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: "0.25rem",
              }}
            >
              Case Study <ChevronRight size={13} />
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section
      id="projects"
      style={{
        background: "var(--bg-base)",
        padding: "7rem 1.5rem",
        position: "relative",
        overflow: "hidden",
      }}
      aria-label="Projects section"
    >
      {/* Background ambient glow */}
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "-200px",
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(139,92,246,0.06), transparent 70%)",
          transform: "translateY(-50%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          right: "-150px",
          width: "450px",
          height: "450px",
          background: "radial-gradient(circle, rgba(59,130,246,0.06), transparent 70%)",
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
          <span className="section-label">04. Projects</span>
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 700,
              marginTop: "0.5rem",
              letterSpacing: "-0.02em",
            }}
          >
            Featured <span className="gradient-text-blue-violet">Projects</span>
          </h2>
          <p
            style={{
              marginTop: "0.75rem",
              color: "var(--text-secondary)",
              fontFamily: "'Inter', sans-serif",
              fontSize: "1rem",
              maxWidth: "540px",
            }}
          >
            Production-ready full-stack applications with scalable architectures, real workflows, and clean UI engineering.
          </p>
        </motion.div>

        {/* Projects list - both in detailed two-column presentation */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2.5rem",
          }}
          className="projects-grid"
        >
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onOpen={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      {/* Case Study Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
