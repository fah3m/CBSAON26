import { useRef } from "react";
import { motion, useInView } from "framer-motion";

function Reveal({ children, delay = 0, y = 36 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

const contacts = [
  {
    role: "Secretary General",
    name: "Chirag Chopra",
    phone: "9073391946",
    delay: 0.22,
    icon: "★",
  },
  {
    role: "Deputy Secretary General",
    name: "Aksh Baroi",
    phone: "9748860187",
    delay: 0.29,
    icon: "◆",
  },
  {
    role: "Under Secretary General (Delegate Affairs)",
    name: "Agneya Goswami",
    phone: "8910982077",
    delay: 0.36,
    icon: "▲",
  },
];

function ContactCard({ role, name, phone, delay, icon }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ boxShadow: "0 0 50px rgba(255,190,0,0.12)" }}
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        background: "rgba(255,200,0,0.04)",
        border: "1px solid rgba(255,190,0,0.16)",
        borderRadius: 16,
        padding: "1.1rem 1.2rem",
        overflow: "hidden",
        cursor: "default",
      }}
    >
      {/* left gold bar */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: "20%",
          bottom: "20%",
          width: 2,
          background:
            "linear-gradient(to bottom, transparent, rgba(255,200,0,0.5), transparent)",
          borderRadius: 2,
        }}
      />

      {/* icon badge */}
      <div
        style={{
          flexShrink: 0,
          width: 40,
          height: 40,
          borderRadius: "50%",
          background: "rgba(255,190,0,0.08)",
          border: "1px solid rgba(255,190,0,0.22)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "0.6rem",
          color: "rgba(255,200,80,0.55)",
        }}
      >
        {icon}
      </div>

      {/* text */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p
          style={{
            fontFamily: "'Oswald', sans-serif",
            fontWeight: 600,
            fontSize: "0.5rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(255,210,80,0.4)",
            lineHeight: 1.4,
            marginBottom: "0.25rem",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {role}
        </p>
        <p
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "1.4rem",
            letterSpacing: "0.06em",
            color: "#fff",
            lineHeight: 1,
            marginBottom: "0.4rem",
          }}
        >
          {name}
        </p>
        <motion.a
          href={`tel:${phone}`}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 5,
            fontFamily: "'Oswald', sans-serif",
            fontWeight: 400,
            fontSize: "0.75rem",
            letterSpacing: "0.08em",
            color: "rgba(255,200,80,0.55)",
            textDecoration: "none",
          }}
          whileHover={{ color: "#ffd700" }}
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12 19.79 19.79 0 0 1 1.07 3.4 2 2 0 0 1 3.05 1.23h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.09 8.9a16 16 0 0 0 9 9l1.04-1.24a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 24 18.92z" />
          </svg>
          {phone}
        </motion.a>
      </div>

      {/* arrow */}
      <svg
        width="13"
        height="13"
        viewBox="0 0 24 24"
        fill="none"
        stroke="rgba(255,190,0,0.2)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ flexShrink: 0 }}
      >
        <polyline points="9 18 15 12 9 6" />
      </svg>
    </motion.div>
  );
}

export default function Support() {
  return (
    <section
      className="relative w-full overflow-hidden bg-[#0a0700]"
      style={{ minHeight: "100svh", padding: "clamp(4rem, 10vw, 8rem) 0" }}
    >
      {/* ambient glow */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "min(900px, 110vw)",
          height: "min(900px, 110vw)",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,180,0,0.05) 0%, transparent 68%)",
          pointerEvents: "none",
        }}
      />

      {/* ghost watermark */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(7rem, 22vw, 18rem)",
          color: "rgba(255,180,0,0.025)",
          whiteSpace: "nowrap",
          pointerEvents: "none",
          userSelect: "none",
          letterSpacing: "0.05em",
        }}
      >
        AON 2026
      </div>

      <div className="relative z-10 w-full px-6 lg:px-[8vw]">
        {/* top rule */}
        <Reveal delay={0}>
          <div className="flex items-center gap-4 mb-10">
            <div
              style={{
                flex: 1,
                height: 1,
                background:
                  "linear-gradient(to right, transparent, rgba(255,190,0,0.25))",
              }}
            />
            <span
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontWeight: 600,
                fontSize: "0.55rem",
                letterSpacing: "0.3em",
                color: "rgba(255,200,60,0.4)",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
              }}
            >
              Assembly Of Nations · 2026
            </span>
            <div
              style={{
                flex: 1,
                height: 1,
                background:
                  "linear-gradient(to left, transparent, rgba(255,190,0,0.25))",
              }}
            />
          </div>
        </Reveal>

        {/* ── HEADLINE (always full width) ── */}
        <Reveal delay={0.05}>
          <h2
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(5rem, 18vw, 9rem)",
              lineHeight: 0.88,
              letterSpacing: "0.02em",
              marginBottom: "clamp(1.2rem, 4vw, 2rem)",
            }}
          >
            <span style={{ color: "#fff", display: "block" }}>GET IN</span>
            <span
              style={{
                display: "block",
                background:
                  "linear-gradient(90deg, #ffd700, #f5a623, #c8790a, #f5a623, #ffd700)",
                backgroundSize: "300% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "titleShimmer 4s linear infinite",
              }}
            >
              TOUCH
            </span>
          </h2>
        </Reveal>

        {/* ── TWO-COLUMN on desktop, single on mobile ── */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-[5vw] lg:items-start">
          {/* ── LEFT ── */}
          <div className="flex-1 min-w-0">
            <Reveal delay={0.1}>
              <p
                style={{
                  fontFamily: "'Oswald', sans-serif",
                  fontWeight: 400,
                  fontSize: "clamp(0.72rem, 1.2vw, 0.88rem)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  lineHeight: 2,
                  color: "rgba(200,165,80,0.6)",
                  marginBottom: "1.8rem",
                }}
              >
                Have a query, concern, or just need help navigating the
                conference? Reach out — we're here to make your experience
                seamless.
              </p>
            </Reveal>

            {/* email CTA */}
            <Reveal delay={0.14}>
              <div style={{ marginBottom: "2rem" }}>
                <p
                  style={{
                    fontFamily: "'Oswald', sans-serif",
                    fontWeight: 600,
                    fontSize: "0.5rem",
                    letterSpacing: "0.28em",
                    textTransform: "uppercase",
                    color: "rgba(255,210,80,0.33)",
                    marginBottom: "0.6rem",
                  }}
                >
                  Conference E-mail
                </p>
                <motion.a
                  href="mailto:cbsaon2026@gmail.com"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 10,
                    fontFamily: "'Oswald', sans-serif",
                    fontWeight: 700,
                    fontSize: "clamp(0.65rem, 1.2vw, 0.8rem)",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#0a0700",
                    background: "linear-gradient(135deg, #d4a820, #ffe040)",
                    padding: "0.9rem 1.4rem",
                    borderRadius: 9999,
                    textDecoration: "none",
                    boxShadow: "0 0 28px rgba(255,190,0,0.28)",
                  }}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 0 50px rgba(255,190,0,0.55)",
                  }}
                  whileTap={{ scale: 0.97 }}
                >
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <polyline points="2,4 12,13 22,4" />
                  </svg>
                  cbsaon2026@gmail.com
                </motion.a>
              </div>
            </Reveal>

            {/* teacher coordinator */}
            <Reveal delay={0.18}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  background: "rgba(255,200,0,0.04)",
                  border: "1px solid rgba(255,190,0,0.13)",
                  borderRadius: 12,
                  padding: "1rem 1.2rem",
                }}
              >
                <div
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    background: "rgba(255,190,0,0.4)",
                    flexShrink: 0,
                  }}
                />
                <div>
                  <p
                    style={{
                      fontFamily: "'Oswald', sans-serif",
                      fontWeight: 600,
                      fontSize: "0.48rem",
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: "rgba(255,210,80,0.33)",
                      marginBottom: "0.2rem",
                    }}
                  >
                    Teacher Coordinator
                  </p>
                  <p
                    style={{
                      fontFamily: "'Oswald', sans-serif",
                      fontWeight: 500,
                      fontSize: "0.88rem",
                      letterSpacing: "0.08em",
                      color: "rgba(255,205,80,0.6)",
                    }}
                  >
                    Ms. Shreeparna Dutta
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* ── RIGHT ── */}
          <div className="flex-1 min-w-0 flex flex-col gap-3">
            <Reveal delay={0.16}>
              <p
                style={{
                  fontFamily: "'Oswald', sans-serif",
                  fontWeight: 600,
                  fontSize: "0.5rem",
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  color: "rgba(255,200,60,0.3)",
                  marginBottom: "0.2rem",
                }}
              >
                Secretariat · Direct Contact
              </p>
            </Reveal>

            {contacts.map((c) => (
              <ContactCard key={c.name} {...c} />
            ))}

            <Reveal delay={0.44}>
              <div
                style={{
                  marginTop: "0.2rem",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <div
                  style={{
                    flex: 1,
                    height: 1,
                    background:
                      "linear-gradient(to right, rgba(255,190,0,0.15), transparent)",
                  }}
                />
                <span
                  style={{
                    fontFamily: "'Oswald', sans-serif",
                    fontSize: "0.46rem",
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    color: "rgba(255,190,0,0.2)",
                    whiteSpace: "nowrap",
                  }}
                >
                  Renascentia De Legatum
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* bottom rule */}
      <Reveal delay={0.1}>
        <div className="flex items-center gap-4 px-6 lg:px-[8vw] mt-14">
          <div
            style={{
              flex: 1,
              height: 1,
              background:
                "linear-gradient(to right, transparent, rgba(255,190,0,0.15))",
            }}
          />
          <div
            style={{
              width: 4,
              height: 4,
              borderRadius: "50%",
              background: "rgba(255,190,0,0.3)",
            }}
          />
          <div
            style={{
              flex: 1,
              height: 1,
              background:
                "linear-gradient(to left, transparent, rgba(255,190,0,0.15))",
            }}
          />
        </div>
      </Reveal>
    </section>
  );
}
