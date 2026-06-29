import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const NEWSPAPER_ICON = ({ size = 20, color = "rgba(255,190,0,0.55)" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4 4H16V18H4V4Z"
      stroke={color}
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
    <path
      d="M16 8H20V20H6"
      stroke={color}
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6.5 7.5H13.5"
      stroke={color}
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <path
      d="M6.5 10.5H13.5"
      stroke={color}
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <path
      d="M6.5 13.5H10.5"
      stroke={color}
      strokeWidth="1.2"
      strokeLinecap="round"
    />
  </svg>
);

const LOCK_ICON = ({ size = 20, color = "rgba(255,230,200,0.85)" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="5"
      y="11"
      width="14"
      height="9"
      rx="1.5"
      stroke={color}
      strokeWidth="1.8"
    />
    <path
      d="M8 11V7.5C8 5.01 9.79 3 12 3C14.21 3 16 5.01 16 7.5V11"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <circle cx="12" cy="15.2" r="1.3" fill={color} />
  </svg>
);

const ARROW_UP_RIGHT_ICON = ({ size = 16, color = "#ffd700" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4 14L14 4M14 4H6M14 4V12"
      stroke={color}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CALENDAR_CLOCK_ICON = ({ size = 15, color = "rgba(255,190,0,0.4)" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="3"
      y="5"
      width="18"
      height="16"
      rx="2"
      stroke={color}
      strokeWidth="1.5"
    />
    <path d="M3 9H21" stroke={color} strokeWidth="1.5" />
    <path
      d="M8 3V6.5M16 3V6.5"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <circle cx="15.5" cy="15.5" r="3.6" stroke={color} strokeWidth="1.4" />
    <path
      d="M15.5 13.6V15.5L16.8 16.6"
      stroke={color}
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

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

/* ---------------------------------------------------------------
   CONTENT
   Swap these two entries for the real dispatch each day.
   "live" articles open the PDF/link; "embargoed" ones are sealed
   until their release date and cannot be clicked.
----------------------------------------------------------------*/
const publications = [
  {
    status: "live",
    day: "Day I",
    date: "June 29, 2026",
    title: "Opening Gavel:\nThe Floor Is Open",
    excerpt:
      "Delegates take their seats as the first session begins. A look inside today's opening ceremonies, committee assignments, and the issues already dividing the floor.",
    meta: "6 Min Read",
    href: "files/AON DAY ONE-INAUGRATION.pdf",
  },
  {
    status: "embargoed",
    day: "Day II",
    date: "June 30, 2026",
    title: "Tomorrow's\nDispatch",
    excerpt:
      "Sealed until tomorrow's session opens. Check back once the gavel drops to read the second dispatch.",
    meta: "Releases 9:00 AM",
  },
];

/* ----------------------------- Featured (live) card ----------------------------- */
function FeaturedCard({ pub, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.a
      href={pub.href}
      target="_blank"
      rel="noopener noreferrer"
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover="hover"
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl cursor-pointer no-underline"
      style={{
        background:
          "linear-gradient(145deg, rgba(255,200,0,0.06) 0%, rgba(10,7,0,0.85) 100%)",
        border: "1px solid rgba(255,190,0,0.22)",
        padding: "clamp(2rem, 4vw, 3.2rem)",
        minHeight: "clamp(320px, 36vw, 420px)",
      }}
    >
      {/* Live pulse glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        variants={{ hover: { opacity: 1 } }}
        initial={{ opacity: 0.55 }}
        transition={{ duration: 0.4 }}
        style={{
          background:
            "radial-gradient(ellipse at 15% 15%, rgba(255,190,0,0.10) 0%, transparent 65%)",
        }}
      />

      {/* corner brackets */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 34,
          height: 34,
          borderTop: "1.5px solid rgba(255,200,0,0.4)",
          borderLeft: "1.5px solid rgba(255,200,0,0.4)",
          borderRadius: "12px 0 0 0",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: 34,
          height: 34,
          borderBottom: "1.5px solid rgba(255,200,0,0.4)",
          borderRight: "1.5px solid rgba(255,200,0,0.4)",
          borderRadius: "0 0 12px 0",
        }}
      />

      {/* Top row */}
      <div className="relative z-10 flex items-start justify-between mb-8">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#ffd700",
                boxShadow: "0 0 10px 2px rgba(255,215,0,0.6)",
              }}
            />
            <span
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontWeight: 600,
                fontSize: "0.58rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "rgba(255,210,80,0.7)",
              }}
            >
              Published Today · {pub.date}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <NEWSPAPER_ICON size={20} color="rgba(255,190,0,0.55)" />
            <span
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontWeight: 400,
                fontSize: "0.58rem",
                letterSpacing: "0.15em",
                color: "rgba(255,200,60,0.4)",
                textTransform: "uppercase",
              }}
            >
              {pub.meta}
            </span>
          </div>
        </div>

        <span
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(1.2rem, 2vw, 1.5rem)",
            letterSpacing: "0.2em",
            color: "rgba(255,180,0,0.3)",
          }}
        >
          {pub.day}
        </span>
      </div>

      {/* Title */}
      <div className="relative z-10 flex-1 mb-6">
        <h3
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(2.6rem, 6vw, 4.6rem)",
            lineHeight: 0.92,
            letterSpacing: "0.02em",
            background: "linear-gradient(135deg, #fff 25%, #ffd700 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            whiteSpace: "pre-line",
            margin: 0,
          }}
        >
          {pub.title}
        </h3>
      </div>

      {/* Divider */}
      <div
        style={{
          width: "100%",
          height: 1,
          background:
            "linear-gradient(to right, rgba(255,190,0,0.25), transparent)",
          marginBottom: "1.2rem",
        }}
      />

      {/* Excerpt */}
      <p
        className="relative z-10 mb-8"
        style={{
          fontFamily: "'Oswald', sans-serif",
          fontWeight: 400,
          fontSize: "clamp(0.72rem, 1.3vw, 0.86rem)",
          letterSpacing: "0.04em",
          lineHeight: 1.85,
          color: "rgba(210,180,100,0.6)",
          maxWidth: "560px",
          margin: 0,
        }}
      >
        {pub.excerpt}
      </p>

      {/* CTA */}
      <div className="relative z-10 flex items-center justify-between">
        <motion.div
          className="flex items-center gap-2"
          variants={{ hover: { x: 5 } }}
          transition={{ duration: 0.2 }}
          style={{
            fontFamily: "'Oswald', sans-serif",
            fontWeight: 700,
            fontSize: "0.65rem",
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: "#ffd700",
          }}
        >
          <span>Read The Dispatch</span>
          <ARROW_UP_RIGHT_ICON size={16} color="#ffd700" />
        </motion.div>
      </div>
    </motion.a>
  );
}

/* ----------------------------- Embargoed (locked) card ----------------------------- */
function EmbargoedCard({ pub, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex flex-col justify-between overflow-hidden rounded-2xl"
      style={{
        background:
          "linear-gradient(145deg, rgba(255,200,0,0.02) 0%, rgba(10,7,0,0.7) 100%)",
        border: "1px dashed rgba(255,190,0,0.16)",
        padding: "clamp(1.8rem, 3vw, 2.4rem)",
        minHeight: "clamp(220px, 22vw, 260px)",
      }}
    >
      {/* faint diagonal texture to read as "sealed" */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "repeating-linear-gradient(135deg, rgba(255,190,0,0.025) 0px, rgba(255,190,0,0.025) 1px, transparent 1px, transparent 14px)",
          pointerEvents: "none",
        }}
      />

      <div className="relative z-10 flex items-start justify-between mb-6">
        <span
          style={{
            fontFamily: "'Oswald', sans-serif",
            fontWeight: 600,
            fontSize: "0.55rem",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "rgba(255,200,60,0.32)",
          }}
        >
          Embargoed Dispatch
        </span>
        <span
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "1.2rem",
            letterSpacing: "0.2em",
            color: "rgba(255,180,0,0.22)",
          }}
        >
          {pub.day}
        </span>
      </div>

      {/* wax-seal style lock badge — signature element */}
      <div className="relative z-10 flex items-center gap-5 mb-6">
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background:
              "radial-gradient(circle at 35% 30%, rgba(200,40,20,0.85), rgba(120,15,10,0.9))",
            boxShadow:
              "0 0 0 2px rgba(255,190,0,0.18), inset 0 2px 4px rgba(255,255,255,0.15), inset 0 -3px 6px rgba(0,0,0,0.4)",
          }}
        >
          <LOCK_ICON size={20} color="rgba(255,230,200,0.85)" />
        </div>
        <div>
          <h3
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(1.6rem, 3vw, 2.1rem)",
              lineHeight: 1,
              letterSpacing: "0.02em",
              color: "rgba(255,255,255,0.4)",
              whiteSpace: "pre-line",
              margin: 0,
            }}
          >
            {pub.title}
          </h3>
        </div>
      </div>

      <p
        className="relative z-10 mb-6"
        style={{
          fontFamily: "'Oswald', sans-serif",
          fontWeight: 400,
          fontSize: "0.74rem",
          letterSpacing: "0.04em",
          lineHeight: 1.8,
          color: "rgba(180,150,90,0.45)",
          margin: 0,
        }}
      >
        {pub.excerpt}
      </p>

      <div className="relative z-10 flex items-center gap-2">
        <CALENDAR_CLOCK_ICON size={15} color="rgba(255,190,0,0.4)" />
        <span
          style={{
            fontFamily: "'Oswald', sans-serif",
            fontWeight: 600,
            fontSize: "0.62rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(255,200,60,0.4)",
          }}
        >
          Seal Breaks {pub.date} · {pub.meta}
        </span>
      </div>
    </motion.div>
  );
}

export default function Publications() {
  const live = publications.find((p) => p.status === "live");
  const embargoed = publications.find((p) => p.status === "embargoed");

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
        PRESS
      </div>

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
            "radial-gradient(ellipse at center, rgba(255,180,0,0.04) 0%, transparent 70%)",
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
              <span style={{ color: "#fff", display: "block" }}>DAILY</span>
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
                DISPATCH
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
              margin: "0 0 3.5rem 0",
            }}
          >
            One dispatch published each day of committee. Today's is open now —
            tomorrow's breaks seal at 9 AM.
          </p>
        </Reveal>

        {/* Featured + Embargoed layout */}
        <div
          className="grid gap-5"
          style={{ gridTemplateColumns: "minmax(0, 1.7fr) minmax(0, 1fr)" }}
        >
          <div className="min-w-0">
            <FeaturedCard pub={live} delay={0.16} />
          </div>
          <div className="min-w-0 flex">
            <div className="w-full self-stretch">
              <EmbargoedCard pub={embargoed} delay={0.24} />
            </div>
          </div>
        </div>

        {/* Bottom note */}
        <Reveal delay={0.4}>
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
              New dispatches publish daily for the duration of committee
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

      {/* Responsive stack on small screens */}
      <style>{`
        @media (max-width: 860px) {
          section .grid[style*="1.7fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
