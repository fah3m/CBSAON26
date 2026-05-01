import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

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

const CLOSE_ICON = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path
      d="M4 4L16 16M16 4L4 16"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const ARROW_ICON = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M3 8H13M13 8L9 4M13 8L9 12"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* ─────────────────────────────────────────────────────────────
   CommitteeLogo
   • If `src` is set and loads OK  → shows the image with a gold drop-shadow
   • If `src` is null / broken     → shows a dashed gold ring placeholder
     with the committee abbreviation inside
   ───────────────────────────────────────────────────────────── */
function CommitteeLogo({ src, abbr, size = 56, glowOnHover = false }) {
  const [err, setErr] = useState(false);
  const showPlaceholder = !src || err;

  return (
    <motion.div
      variants={
        glowOnHover
          ? { hover: { boxShadow: "0 0 28px rgba(255,190,0,0.35)" } }
          : {}
      }
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.18, // rounded square, not circle
        flexShrink: 0,
        position: "relative",
        overflow: "hidden",
        border: showPlaceholder
          ? "1.5px dashed rgba(255,190,0,0.28)"
          : "1.5px solid rgba(255,190,0,0.38)",
        background: showPlaceholder ? "rgba(255,190,0,0.04)" : "#0a0700",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "box-shadow 0.3s ease",
      }}
    >
      {showPlaceholder ? (
        <>
          <div
            style={{
              position: "absolute",
              inset: 5,
              borderRadius: size * 0.12,
              border: "1px solid rgba(255,190,0,0.09)",
            }}
          />
          <span
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: size * 0.21,
              letterSpacing: "0.05em",
              color: "rgba(255,200,60,0.32)",
              lineHeight: 1,
              textAlign: "center",
              padding: "0 3px",
            }}
          >
            {abbr}
          </span>
        </>
      ) : (
        <img
          src={src}
          alt={`${abbr} logo`}
          onError={() => setErr(true)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            padding: size * 0.08,
            filter: "drop-shadow(0 0 6px rgba(255,190,0,0.3))",
          }}
        />
      )}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Committee data
   → Drop image paths into the `logo` field to activate logos.
     e.g.  logo: "/logos/unsc.png"
   ───────────────────────────────────────────────────────────── */
const committees = [
  {
    id: "specpol",
    abbr: "SPECPOL",
    name: "UN General Assembly\nSPECPOL",
    type: "General Assembly · Double Delegation",
    index: "01",
    logo: "/logo/ungadisec.png",
    chairs: "Agnitra Saha (C) · Chirag Chopra (VC) · Adish Datta (Co-VC)",
    description:
      "The Special Political and Decolonization Committee addresses a broad range of issues covering decolonization, peacekeeping, outer space governance, and the peaceful uses of science and technology.",
    agenda: [
      {
        label: "Agenda",
        title:
          "Establishing Legal Barriers Against the Placement of Weapons in Orbit and the Terrestrial Targeting of Satellite Networks",
        detail:
          "As nations race to dominate the orbital domain, SPECPOL confronts the dangerous vacuum in international law governing weapons deployed in space — and the targeting of satellite infrastructure from the ground. Delegates will work toward binding frameworks to prevent an arms race beyond Earth's atmosphere.",
      },
    ],
  },
  {
    id: "unsc",
    abbr: "UNSC",
    name: "United Nations\nSecurity Council",
    type: "Security Council · Single Delegation",
    index: "02",
    logo: "/logo/unsc.png",
    chairs: "Diptesh Banerjee (C) · Soumyadeep Dev (VC)",
    description:
      "The UN Security Council holds primary responsibility for the maintenance of international peace and security. Its fifteen member states — five permanent, ten elected — convene to address the world's most pressing conflicts.",
    agenda: [
      {
        label: "Agenda",
        title: "The Situation in the Middle East",
        detail:
          "The Middle East remains one of the world's most volatile flashpoints. Delegates will confront the interlocking crises of active conflict, humanitarian catastrophe, regional power rivalries, and the breakdown of ceasefire mechanisms — navigating the diplomatic fault lines of one of history's most enduring disputes.",
      },
    ],
  },
  {
    id: "unhrc",
    abbr: "UNHRC",
    name: "UN Human Rights\nCouncil",
    type: "Human Rights Body · Double Delegation",
    index: "03",
    logo: "/logo/unhrc.png",
    chairs: "Swapnaneel Datta (C) · Adrish Hossain (VC) · Aksh Baroi (Co-VC)",
    description:
      "The UN Human Rights Council is the principal intergovernmental body tasked with strengthening the promotion and protection of human rights worldwide. It addresses situations of violations and makes recommendations.",
    agenda: [
      {
        label: "Agenda",
        title:
          "The Promotion and Protection of All Human Rights: Ensuring the Accountability of State Actors for the Safeguarding of Civilian Life and Fundamental Freedoms in Zones of Active Military Escalation",
        detail:
          "In theatres of active conflict, civilian populations bear the heaviest toll. This committee examines the obligations of state actors under international humanitarian law, the mechanisms for holding violators accountable, and the protection of fundamental freedoms when military escalation erodes the rule of law.",
      },
    ],
  },
  {
    id: "c34",
    abbr: "C-34",
    name: "UN Special Committee\non Peacekeeping",
    type: "Special Committee · Single Delegation",
    index: "04",
    logo: "/logo/unscpo.png",
    chairs: "Parthiv Mukherjee (C) · Neil Joseph Chakraborty (VC)",
    description:
      "The Special Committee on Peacekeeping Operations (C-34) reviews all questions relating to UN peacekeeping and makes recommendations to improve the effectiveness, safety, and sustainability of peacekeeping missions worldwide.",
    agenda: [
      {
        label: "Agenda",
        title:
          "Strategies for the Transition of United Nations Peacekeeping Operations to a Sustainable Peacebuilding Presence",
        detail:
          "As peacekeeping mandates mature, the question of how to exit without leaving a security vacuum becomes critical. Delegates will debate frameworks for responsible transition — transferring ownership to local institutions, sustaining hard-won stability, and ensuring that peace endures long after the blue helmets depart.",
      },
    ],
  },
  {
    id: "g20",
    abbr: "G20",
    name: "Group of\nTwenty",
    type: "Economic Forum · Single Delegation",
    index: "05",
    logo: "/logo/g20.png",
    chairs: "Mallar Mitra (C) · Kinshuk Trivedi (VC) · Agneya Goswami (Co-VC)",
    description:
      "The G20 brings together the world's major economies to coordinate policy on global economic governance, financial markets, trade, and sustainable development. It represents over 80% of world GDP.",
    agenda: [
      {
        label: "Agenda",
        title:
          "International Economic Cooperation: Assessing the Impact of Regional Instability on Global Energy Security, Supply Chain Resilience, and Macro-Economic Stability",
        detail:
          "Geopolitical shocks have exposed the fragility of globalised supply chains and energy dependencies. Delegates will examine how regional conflicts ripple through commodity markets, reshape trade routes, and threaten macroeconomic stability — crafting cooperative frameworks to build systemic resilience.",
      },
    ],
  },
];

/* ─────────────────────────────────────────────────────────────
   Agenda Modal
   ───────────────────────────────────────────────────────────── */
function AgendaModal({ committee, onClose }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end lg:items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
    >
      {/* Backdrop */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(5,3,0,0.88)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      />

      {/* Panel */}
      <motion.div
        className="relative w-full lg:w-auto lg:min-w-[640px] lg:max-w-[820px] mx-4"
        style={{
          background:
            "linear-gradient(160deg, rgba(24,17,0,0.98) 0%, rgba(10,7,0,0.99) 100%)",
          border: "1px solid rgba(255,190,0,0.2)",
          borderRadius: "20px 20px 0 0",
          maxHeight: "92vh",
          overflowY: "auto",
        }}
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 60, opacity: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Corner brackets */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 32,
            height: 32,
            borderTop: "1.5px solid rgba(255,200,0,0.4)",
            borderLeft: "1.5px solid rgba(255,200,0,0.4)",
            borderRadius: "10px 0 0 0",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 32,
            height: 32,
            borderTop: "1.5px solid rgba(255,200,0,0.4)",
            borderRight: "1.5px solid rgba(255,200,0,0.4)",
            borderRadius: "0 10px 0 0",
            pointerEvents: "none",
          }}
        />

        {/* Top glow */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "60%",
            height: 140,
            background:
              "radial-gradient(ellipse at center top, rgba(255,180,0,0.07), transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div style={{ padding: "clamp(1.8rem, 5vw, 2.8rem)" }}>
          {/* ── Header: large logo + name block + close ── */}
          <div className="flex items-start gap-5 mb-6">
            {/* Logo — larger in modal */}
            <CommitteeLogo
              src={committee.logo}
              abbr={committee.abbr}
              size={84}
            />

            {/* Name / type / chairs */}
            <div style={{ flex: 1 }}>
              <span
                style={{
                  fontFamily: "'Oswald', sans-serif",
                  fontWeight: 600,
                  fontSize: "0.52rem",
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  color: "rgba(255,200,60,0.4)",
                }}
              >
                {committee.type}
              </span>
              <h3
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "clamp(2.4rem, 6vw, 3.8rem)",
                  lineHeight: 0.9,
                  letterSpacing: "0.02em",
                  margin: "0.4rem 0 0.3rem",
                  background:
                    "linear-gradient(90deg, #ffd700, #f5a623, #c8790a, #f5a623, #ffd700)",
                  backgroundSize: "300% auto",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  animation: "titleShimmer 4s linear infinite",
                }}
              >
                {committee.abbr}
              </h3>
              <p
                style={{
                  fontFamily: "'Oswald', sans-serif",
                  fontWeight: 500,
                  fontSize: "clamp(0.65rem, 1.4vw, 0.85rem)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "rgba(255,210,80,0.5)",
                  margin: 0,
                }}
              >
                {committee.name.replace(/\n/g, " ")}
              </p>

              {/* Chair pills */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.35rem",
                  marginTop: "0.75rem",
                }}
              >
                {committee.chairs.split(" · ").map((chair, i) => (
                  <span
                    key={i}
                    style={{
                      fontFamily: "'Oswald', sans-serif",
                      fontWeight: 500,
                      fontSize: "0.5rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "rgba(255,210,80,0.6)",
                      background: "rgba(255,190,0,0.06)",
                      border: "1px solid rgba(255,190,0,0.15)",
                      borderRadius: "4px",
                      padding: "3px 8px",
                    }}
                  >
                    {chair}
                  </span>
                ))}
              </div>
            </div>

            {/* Close */}
            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.1, color: "#ffd700" }}
              whileTap={{ scale: 0.9 }}
              style={{
                background: "rgba(255,190,0,0.07)",
                border: "1px solid rgba(255,190,0,0.2)",
                borderRadius: "50%",
                width: 40,
                height: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "rgba(255,200,60,0.5)",
                flexShrink: 0,
              }}
            >
              <CLOSE_ICON />
            </motion.button>
          </div>

          {/* Description */}
          <p
            style={{
              fontFamily: "'Oswald', sans-serif",
              fontWeight: 400,
              fontSize: "clamp(0.68rem, 1.3vw, 0.82rem)",
              letterSpacing: "0.07em",
              textTransform: "uppercase",
              lineHeight: 1.9,
              color: "rgba(200,165,80,0.5)",
              marginBottom: "1.8rem",
            }}
          >
            {committee.description}
          </p>

          {/* Section rule */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              marginBottom: "1.6rem",
            }}
          >
            <div
              style={{
                flex: 1,
                height: 1,
                background:
                  "linear-gradient(to right, rgba(255,190,0,0.2), transparent)",
              }}
            />
            <span
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontWeight: 600,
                fontSize: "0.5rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "rgba(255,200,60,0.35)",
              }}
            >
              Committee Agenda
            </span>
            <div
              style={{
                flex: 1,
                height: 1,
                background:
                  "linear-gradient(to left, rgba(255,190,0,0.2), transparent)",
              }}
            />
          </div>

          {/* Agenda items */}
          <div className="flex flex-col gap-4">
            {committee.agenda.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.15 + i * 0.1,
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  background: "rgba(255,200,0,0.03)",
                  border: "1px solid rgba(255,190,0,0.1)",
                  borderLeft: "2px solid rgba(255,190,0,0.45)",
                  borderRadius: "0 12px 12px 0",
                  padding: "1.2rem 1.4rem",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Oswald', sans-serif",
                    fontWeight: 600,
                    fontSize: "0.5rem",
                    letterSpacing: "0.28em",
                    textTransform: "uppercase",
                    color: "rgba(255,200,60,0.4)",
                    display: "block",
                    marginBottom: "0.4rem",
                  }}
                >
                  {item.label}
                </span>
                <h4
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "clamp(1.1rem, 2.5vw, 1.55rem)",
                    letterSpacing: "0.04em",
                    color: "#fff",
                    margin: "0 0 0.6rem",
                    lineHeight: 1.1,
                  }}
                >
                  {item.title}
                </h4>
                <p
                  style={{
                    fontFamily: "'Oswald', sans-serif",
                    fontWeight: 400,
                    fontSize: "clamp(0.62rem, 1.1vw, 0.74rem)",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    lineHeight: 1.85,
                    color: "rgba(200,165,80,0.45)",
                    margin: 0,
                  }}
                >
                  {item.detail}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Footer note */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              marginTop: "2rem",
            }}
          >
            <div
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: "rgba(255,190,0,0.3)",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontSize: "0.5rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(200,165,80,0.25)",
              }}
            >
              Background guide available in resources · AON 2026
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Committee Card
   ───────────────────────────────────────────────────────────── */
function CommitteeCard({ committee, index, onClick }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const isLarge = index === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.65,
        delay: 0.1 + index * 0.07,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover="hover"
      onClick={onClick}
      className="relative flex flex-col justify-between overflow-hidden rounded-2xl cursor-pointer"
      style={{
        background:
          "linear-gradient(145deg, rgba(255,200,0,0.04) 0%, rgba(10,7,0,0.85) 100%)",
        border: "1px solid rgba(255,190,0,0.13)",
        padding: "clamp(1.4rem, 3vw, 2rem)",
        minHeight: isLarge
          ? "clamp(260px, 28vw, 340px)"
          : "clamp(220px, 22vw, 280px)",
      }}
    >
      {/* Hover glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        variants={{ hover: { opacity: 1 } }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        style={{
          background:
            "radial-gradient(ellipse at 15% 15%, rgba(255,190,0,0.07) 0%, transparent 65%)",
        }}
      />
      {/* Hover border */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        variants={{ hover: { opacity: 1 } }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        style={{ border: "1px solid rgba(255,190,0,0.32)" }}
      />

      {/* Corner brackets */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 24,
          height: 24,
          borderTop: "1.5px solid rgba(255,200,0,0.35)",
          borderLeft: "1.5px solid rgba(255,200,0,0.35)",
          borderRadius: "8px 0 0 0",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: 24,
          height: 24,
          borderBottom: "1.5px solid rgba(255,200,0,0.35)",
          borderRight: "1.5px solid rgba(255,200,0,0.35)",
          borderRadius: "0 0 8px 0",
        }}
      />

      {/* ── Top row: logo + type label + index watermark ── */}
      <div className="relative z-10 flex items-start justify-between mb-auto">
        <div className="flex flex-col gap-2">
          <span
            style={{
              fontFamily: "'Oswald', sans-serif",
              fontWeight: 600,
              fontSize: "0.5rem",
              letterSpacing: "0.26em",
              textTransform: "uppercase",
              color: "rgba(255,200,60,0.4)",
            }}
          >
            {committee.type}
          </span>
          <CommitteeLogo
            src={committee.logo}
            abbr={committee.abbr}
            size={isLarge ? 58 : 50}
            glowOnHover
          />
        </div>

        {/* Faded index */}
        <span
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)",
            lineHeight: 1,
            color: "rgba(255,180,0,0.05)",
            letterSpacing: "0.03em",
          }}
        >
          {committee.index}
        </span>
      </div>

      {/* ── Name + shimmer abbr ── */}
      <div className="relative z-10 mt-5 mb-3">
        <div
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: isLarge
              ? "clamp(2rem, 4vw, 3rem)"
              : "clamp(1.6rem, 3.2vw, 2.4rem)",
            lineHeight: 0.9,
            letterSpacing: "0.04em",
            color: "#fff",
            whiteSpace: "pre-line",
            marginBottom: "0.45rem",
          }}
        >
          {committee.name}
        </div>
        <span
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(1rem, 2vw, 1.4rem)",
            letterSpacing: "0.06em",
            background:
              "linear-gradient(90deg, #ffd700, #f5a623, #c8790a, #f5a623, #ffd700)",
            backgroundSize: "300% auto",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            animation: "titleShimmer 4s linear infinite",
          }}
        >
          {committee.abbr}
        </span>
      </div>

      {/* Divider */}
      <div
        style={{
          width: "100%",
          height: 1,
          background:
            "linear-gradient(to right, rgba(255,190,0,0.18), transparent)",
          margin: "0.75rem 0",
        }}
      />

      {/* ── Bottom row: chair + CTA ── */}
      <div className="relative z-10 flex items-center justify-between">
        <span
          style={{
            fontFamily: "'Oswald', sans-serif",
            fontWeight: 400,
            fontSize: "0.48rem",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "rgba(200,165,80,0.38)",
            maxWidth: "60%",
          }}
        >
          {committee.chairs.split(" · ")[0]}
        </span>
        <motion.div
          variants={{ hover: { x: 4, color: "#ffd700" } }}
          transition={{ duration: 0.2 }}
          style={{
            color: "rgba(255,200,60,0.45)",
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
          }}
        >
          <span
            style={{
              fontFamily: "'Oswald', sans-serif",
              fontWeight: 700,
              fontSize: "0.5rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
            }}
          >
            View Agenda
          </span>
          <ARROW_ICON />
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Page
   ───────────────────────────────────────────────────────────── */
export default function Committees() {
  const [active, setActive] = useState(null);
  const activeCommittee = committees.find((c) => c.id === active);

  return (
    <section
      className="relative w-full overflow-hidden bg-[#0a0700]"
      style={{ padding: "clamp(4rem, 10vw, 8rem) 0" }}
    >
      {/* Watermark */}
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
        MUN
      </div>

      {/* Top radial glow */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "80vw",
          height: "40vh",
          background:
            "radial-gradient(ellipse at center top, rgba(255,180,0,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Top rule */}
      <Reveal delay={0}>
        <div className="flex items-center gap-4 px-6 lg:px-[8vw] mb-12">
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
              fontSize: "0.6rem",
              letterSpacing: "0.3em",
              color: "rgba(255,200,60,0.4)",
              textTransform: "uppercase",
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
              <span style={{ color: "#fff", display: "block" }}>THE</span>
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
                COMMITTEES
              </span>
            </h2>
          </div>
        </Reveal>

        {/* Subtext */}
        <Reveal delay={0.12}>
          <p
            style={{
              fontFamily: "'Oswald', sans-serif",
              fontWeight: 400,
              fontSize: "clamp(0.7rem, 1.4vw, 0.9rem)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "rgba(200,165,80,0.5)",
              maxWidth: 520,
              lineHeight: 1.9,
              margin: "0 0 clamp(2.5rem, 6vw, 4rem)",
            }}
          >
            Five arenas. Five distinct challenges. Click a committee to explore
            its mandate and agenda for AON 2026.
          </p>
        </Reveal>

        {/* Grid */}
        <div
          className="grid gap-4"
          style={{ gridTemplateColumns: "repeat(12, 1fr)" }}
        >
          <div className="col-span-12 lg:col-span-5 flex flex-col gap-4">
            <CommitteeCard
              committee={committees[0]}
              index={0}
              onClick={() => setActive(committees[0].id)}
            />
            <CommitteeCard
              committee={committees[1]}
              index={1}
              onClick={() => setActive(committees[1].id)}
            />
          </div>
          <div className="col-span-12 lg:col-span-7 flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <CommitteeCard
                committee={committees[2]}
                index={2}
                onClick={() => setActive(committees[2].id)}
              />
              <CommitteeCard
                committee={committees[3]}
                index={3}
                onClick={() => setActive(committees[3].id)}
              />
            </div>
            <CommitteeCard
              committee={committees[4]}
              index={4}
              onClick={() => setActive(committees[4].id)}
            />
          </div>
        </div>

        {/* Bottom note */}
        <Reveal delay={0.55}>
          <div className="flex items-center gap-3 mt-10">
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "rgba(255,190,0,0.3)",
                flexShrink: 0,
              }}
            />
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
              All committees will hold two full sessions across the two-day
              conference · AON 2026
            </p>
          </div>
        </Reveal>
      </div>

      {/* Bottom rule */}
      <Reveal delay={0.1}>
        <div className="flex items-center gap-4 px-6 lg:px-[8vw] mt-16">
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

      {/* Modal */}
      <AnimatePresence>
        {activeCommittee && (
          <AgendaModal
            committee={activeCommittee}
            onClose={() => setActive(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
