import { useRef } from "react";
import { motion, useInView } from "framer-motion";

function Reveal({ children, delay = 0, y = 40 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
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

const PDF_ICON = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 2H18L24 8V26H6V2Z" stroke="rgba(255,190,0,0.5)" strokeWidth="1.2" fill="none" />
    <path d="M17 2V9H24" stroke="rgba(255,190,0,0.5)" strokeWidth="1.2" fill="none" />
    <rect x="3" y="14" width="14" height="8" rx="1" fill="rgba(255,190,0,0.12)" stroke="rgba(255,200,0,0.6)" strokeWidth="1" />
    <text x="10" y="20.5" textAnchor="middle" fontSize="5" fontFamily="'Oswald', sans-serif" fontWeight="700" fill="#ffd700" letterSpacing="0.3">PDF</text>
  </svg>
);

const ARROW_ICON = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 9H15M15 9L10 4M15 9L10 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const DOWNLOAD_ICON = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 2V10M8 10L5 7M8 10L11 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2 12H14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

const resources = [
  {
    id: "handbook",
    tag: "Delegate Guide",
    title: "Delegate\nHandbook",
    desc: "Everything you need to know before stepping into the chamber. Rules, protocols, and preparation essentials.",
    pages: "24 Pages",
    pdf: "/resources/delegate-handbook.pdf",
    accent: "#ffd700",
    index: "01",
  },
  {
    id: "rop",
    tag: "Procedure",
    title: "Rules of\nProcedure",
    desc: "The complete formal rules governing debate, motions, voting, and committee conduct at AON 2026.",
    pages: "18 Pages",
    pdf: "/resources/rules-of-procedure.pdf",
    accent: "#f5a623",
    index: "02",
  },
  {
    id: "position",
    tag: "Writing Guide",
    title: "Position\nPaper Guide",
    desc: "Craft a position paper that stands out. Structure, tone, argumentation, and formatting — all covered.",
    pages: "12 Pages",
    pdf: "/resources/position-paper-guide.pdf",
    accent: "#e8c84a",
    index: "03",
  },
  {
    id: "background",
    tag: "Committee Brief",
    title: "Background\nGuide",
    desc: "Deep-dive into this year's committee topics. Research the issues, understand the landscape, arrive ready.",
    pages: "36 Pages",
    pdf: "/resources/background-guide.pdf",
    accent: "#c8a800",
    index: "04",
  },
];

function ResourceCard({ resource, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.a
      href={resource.pdf}
      target="_blank"
      rel="noopener noreferrer"
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover="hover"
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl cursor-pointer no-underline"
      style={{
        background: "linear-gradient(145deg, rgba(255,200,0,0.04) 0%, rgba(10,7,0,0.8) 100%)",
        border: "1px solid rgba(255,190,0,0.14)",
        padding: "clamp(1.5rem, 3vw, 2.2rem)",
        minHeight: "clamp(280px, 32vw, 360px)",
      }}
    >
      {/* Hover glow layer */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        variants={{
          hover: { opacity: 1 },
        }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        style={{
          background: `radial-gradient(ellipse at 20% 20%, rgba(255,190,0,0.07) 0%, transparent 70%)`,
        }}
      />

      {/* Corner brackets */}
      <div style={{ position: "absolute", top: 0, left: 0, width: 28, height: 28, borderTop: "1.5px solid rgba(255,200,0,0.35)", borderLeft: "1.5px solid rgba(255,200,0,0.35)", borderRadius: "10px 0 0 0" }} />
      <div style={{ position: "absolute", bottom: 0, right: 0, width: 28, height: 28, borderBottom: "1.5px solid rgba(255,200,0,0.35)", borderRight: "1.5px solid rgba(255,200,0,0.35)", borderRadius: "0 0 10px 0" }} />

      {/* Top row */}
      <div className="relative z-10 flex items-start justify-between mb-6">
        <div className="flex flex-col gap-2">
          <span
            style={{
              fontFamily: "'Oswald', sans-serif",
              fontWeight: 600,
              fontSize: "0.52rem",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "rgba(255,200,60,0.45)",
            }}
          >
            {resource.tag}
          </span>
          <div className="flex items-center gap-2">
            <PDF_ICON />
            <span
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontWeight: 400,
                fontSize: "0.55rem",
                letterSpacing: "0.15em",
                color: "rgba(255,200,60,0.35)",
              }}
            >
              {resource.pages}
            </span>
          </div>
        </div>

        <span
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
            lineHeight: 1,
            color: "rgba(255,180,0,0.06)",
            letterSpacing: "0.03em",
          }}
        >
          {resource.index}
        </span>
      </div>

      {/* Title */}
      <div className="relative z-10 flex-1 mb-4">
        <h3
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(2.2rem, 4.5vw, 3.2rem)",
            lineHeight: 0.92,
            letterSpacing: "0.03em",
            background: `linear-gradient(135deg, #fff 30%, ${resource.accent} 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            whiteSpace: "pre-line",
            margin: 0,
          }}
        >
          {resource.title}
        </h3>
      </div>

      {/* Divider */}
      <div style={{ width: "100%", height: 1, background: "linear-gradient(to right, rgba(255,190,0,0.2), transparent)", marginBottom: "1rem" }} />

      {/* Desc */}
      <p
        className="relative z-10 mb-6"
        style={{
          fontFamily: "'Oswald', sans-serif",
          fontWeight: 400,
          fontSize: "clamp(0.65rem, 1.2vw, 0.78rem)",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          lineHeight: 1.8,
          color: "rgba(200,165,80,0.5)",
          margin: 0,
        }}
      >
        {resource.desc}
      </p>

      {/* CTA row */}
      <div className="relative z-10 flex items-center justify-between mt-4">
        <motion.div
          className="flex items-center gap-2"
          variants={{ hover: { x: 4 } }}
          transition={{ duration: 0.2 }}
          style={{
            fontFamily: "'Oswald', sans-serif",
            fontWeight: 700,
            fontSize: "0.6rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "rgba(255,210,80,0.7)",
          }}
        >
          <span>Open PDF</span>
          <ARROW_ICON />
        </motion.div>

        <motion.div
          className="flex items-center justify-center rounded-full"
          variants={{
            hover: { background: "rgba(255,200,0,0.18)", borderColor: "rgba(255,190,0,0.6)" },
          }}
          style={{
            width: 34,
            height: 34,
            border: "1px solid rgba(255,190,0,0.25)",
            color: "rgba(255,200,60,0.6)",
            transition: "all 0.25s ease",
          }}
        >
          <DOWNLOAD_ICON />
        </motion.div>
      </div>
    </motion.a>
  );
}

export default function Resources() {
  return (
    <section
      className="relative w-full overflow-hidden bg-[#0a0700]"
      style={{ padding: "clamp(4rem, 10vw, 8rem) 0" }}
    >
      {/* Big faded background text */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(8rem, 28vw, 22rem)",
          lineHeight: 1,
          color: "rgba(255,180,0,0.025)",
          whiteSpace: "nowrap",
          pointerEvents: "none",
          userSelect: "none",
          letterSpacing: "0.05em",
        }}
      >
        DOCS
      </div>

      {/* Subtle radial glow */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "80vw",
          height: "40vh",
          background: "radial-gradient(ellipse at center, rgba(255,180,0,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Top rule */}
      <Reveal delay={0}>
        <div className="flex items-center gap-4 px-6 lg:px-[8vw] mb-12">
          <div style={{ flex: 1, height: 1, background: "linear-gradient(to right, transparent, rgba(255,190,0,0.25))" }} />
          <span
            style={{
              fontFamily: "'Oswald', sans-serif",
              fontWeight: 600,
              fontSize: "0.6rem",
              letterSpacing: "0.3em",
              color: "rgba(255,200,60,0.4)",
              textTransform: "uppercase",
            }}
          >
            Assembly Of Nations · 2026
          </span>
          <div style={{ flex: 1, height: 1, background: "linear-gradient(to left, transparent, rgba(255,190,0,0.25))" }} />
        </div>
      </Reveal>

      <div className="relative z-10 w-full px-6 lg:px-[8vw]">

        {/* Headline */}
        <Reveal delay={0.05}>
          <div className="mb-4">
            <h2
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(4rem, 15vw, 11rem)",
                lineHeight: 0.88,
                letterSpacing: "0.02em",
                margin: 0,
              }}
            >
              <span style={{ color: "#fff", display: "block" }}>DELEGATE</span>
              <span
                style={{
                  display: "block",
                  background: "linear-gradient(90deg, #ffd700, #f5a623, #c8790a, #f5a623, #ffd700)",
                  backgroundSize: "300% auto",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  animation: "titleShimmer 4s linear infinite",
                }}
              >
                RESOURCES
              </span>
            </h2>
          </div>
        </Reveal>

        {/* Subtext */}
        <Reveal delay={0.12}>
          <div className="flex items-center gap-6 mb-14">
            <p
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontWeight: 400,
                fontSize: "clamp(0.7rem, 1.4vw, 0.9rem)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "rgba(200,165,80,0.5)",
                maxWidth: 480,
                lineHeight: 1.9,
                margin: 0,
              }}
            >
              Everything your delegation needs — handbooks, procedures, and guides — all in one place.
            </p>
            <div style={{ flex: 1, height: 1, background: "linear-gradient(to right, rgba(255,190,0,0.15), transparent)", display: "none" }} className="lg:block" />
          </div>
        </Reveal>

        {/* Cards grid */}
        <div
          className="grid gap-4"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))" }}
        >
          {resources.map((r, i) => (
            <ResourceCard key={r.id} resource={r} delay={0.14 + i * 0.08} />
          ))}
        </div>

        {/* Bottom note */}
        <Reveal delay={0.5}>
          <div className="flex items-center gap-3 mt-10">
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(255,190,0,0.3)", flexShrink: 0 }} />
            <p
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontWeight: 400,
                fontSize: "0.58rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(200,165,80,0.3)",
                margin: 0,
              }}
            >
              All documents are official AON 2026 publications · Last updated April 2026
            </p>
          </div>
        </Reveal>

      </div>

      {/* Bottom rule */}
      <Reveal delay={0.1}>
        <div className="flex items-center gap-4 px-6 lg:px-[8vw] mt-16">
          <div style={{ flex: 1, height: 1, background: "linear-gradient(to right, transparent, rgba(255,190,0,0.15))" }} />
          <div style={{ width: 4, height: 4, borderRadius: "50%", background: "rgba(255,190,0,0.3)" }} />
          <div style={{ flex: 1, height: 1, background: "linear-gradient(to left, transparent, rgba(255,190,0,0.15))" }} />
        </div>
      </Reveal>

    </section>
  );
}