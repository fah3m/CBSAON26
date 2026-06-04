import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import About from "./About";
import Gallery from "./Gallery";

/* ─── INJECT GLOBAL STYLES ─── */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Oswald:wght@400;500;600&family=Cinzel:wght@700&family=Montserrat:wght@400;500&display=swap');

  @keyframes titleShimmer {
    0%   { background-position: 0% 50%; }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
`;

if (typeof document !== "undefined" && !document.getElementById("aon-global-styles")) {
  const tag = document.createElement("style");
  tag.id = "aon-global-styles";
  tag.textContent = GLOBAL_CSS;
  document.head.appendChild(tag);
}

/* ─── POPUP DATA ─── */
const popupData = {

  
  wab: {
    title: "We Are Back",
    sections: [
      {
        heading: null,
        text: "After the resounding success of our fifth edition, the gates of diplomacy swing wide once more. The Calcutta Boys' School is thrilled to announce the sixth chapter of its hallmark conference — the Assembly of Nations (CBS AON) 2026. Returning to the circuit on the 29th and 30th of June, 2026, AON continues to serve as the definitive arena for intellectual rigor and statesmanship in Kolkata.",
      },
      {
        heading: null,
        text: "Following the spirit of our \"Rebirth,\" this edition moves from restoration to evolution. CBS AON has never been a mere simulation; it is a crucible where the city's most formidable young minds are tested. From our inception in 2011 to our landmark sessions through the years, we have maintained a reputation for unparalleled organizational precision and a commitment to the \"pure\" form of Model United Nations — where logic, research, and rhetoric reign supreme.",
      },
      {
        heading: "WHAT YOU ALREADY KNOW",
        text: null,
      },
      {
        heading: "UNSC (United Nations Security Council):",
        text: "The apex of global authority. As the only body capable of passing legally binding resolutions, this committee is a high-stakes arena of realpolitik. Delegates must navigate the veto power of the P5 and handle volatile international crises where every second counts and every word carries the weight of law.",
      },
      {
        heading: "UNGA-SPECPOL (United Nations General Assembly — Special Political and Decolonization):",
        text: "The bridge between history and the future. Handling a diverse mandate from decolonization and atomic radiation to the peaceful uses of outer space, SPECPOL challenges delegates to solve sensitive political issues that fall outside conventional GA scopes. It is the ultimate test of diplomatic versatility and strategic consensus-building.",
      },
      {
        heading: "THE 2026 EXPANSION: NEW HORIZONS OF DIPLOMACY",
        text: "This year, CBS AON 2026 pushes the boundaries of conventional debate by introducing three powerhouse committees designed to challenge even the most seasoned delegates:",
      },
      {
        heading: "THE G20 (Group of Twenty):",
        text: "Step into the epicentre of global economic governance. In a world of shifting financial tides, this committee demands delegates who can balance national interest with the precarious weight of global stability.",
      },
      {
        heading: "C34 (Special Committee on Peacekeeping Operations):",
        text: "A rare and technical challenge for those who understand that peace is not just a concept, but a logistical and political feat. Delegates will grapple with the complexities of UN mandates and the ground realities of conflict zones.",
      },
      {
        heading: "UNHRC (United Nations Human Rights Council):",
        text: "The conscience of the international community. Expect fierce, high-stakes discourse on the fundamental rights and protections that define our modern moral landscape.",
      },
      {
        heading: "A LEGACY OF EXCELLENCE",
        text: "Beyond the floor of the committees, CBS AON is a community. It is a tradition defined by its seasoned Executive Board, its innovative agendas, and the unique camaraderie born from two days of intense negotiation. We provide more than just a platform for debate; we offer a transformative experience that turns students into strategists and delegates into leaders.",
      },
      {
        heading: null,
        text: "As the \"vibrant chaos\" of international affairs continues to unfold across the globe, we invite you to be the voice of reason within it. Whether you are a veteran of the circuit or an aspiring diplomat ready to make your debut, CBS AON 2026 is your stage.",
      },
      {
        heading: "JOIN THE LEGACY. MASTER THE CRAFT. DEFINE THE FUTURE.",
        text: null,
      },
    ],
  },

    cbs: {
    title: "Calcutta Boys' School",
    text: "Established in 1877, Calcutta Boys' School is one of the oldest and most prestigious educational institutions in India. Located in the heart of Kolkata, it has been shaping young minds for over a century, producing leaders, thinkers, and changemakers across generations.",
  },
  aon: {
    title: "Assembly Of Nations",
    text: "Assembly Of Nations (AON) is the flagship Model United Nations conference organised by Calcutta Boys' School. It brings together students from schools across the country to engage in diplomatic simulations, debate global issues, and develop critical thinking and public speaking skills. AON 2026 marks a landmark edition in the conference's legacy.",
  },
};

const LOADER_KEY = "aon26_loader_shown";

/* ═══════════════════════════════════
   COUNTDOWN HOOK
═══════════════════════════════════ */
function useCountdown(targetDate) {
  const [time, setTime] = useState({ days: "00", hours: "00", mins: "00", secs: "00" });
  useEffect(() => {
    const pad = (n) => String(n).padStart(2, "0");
    const update = () => {
      const diff = new Date(targetDate) - new Date();
      if (diff <= 0) return;
      setTime({
        days: pad(Math.floor(diff / 86400000)),
        hours: pad(Math.floor((diff % 86400000) / 3600000)),
        mins: pad(Math.floor((diff % 3600000) / 60000)),
        secs: pad(Math.floor((diff % 60000) / 1000)),
      });
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [targetDate]);
  return time;
}

/* ═══════════════════════════════════
   COUNTDOWN NUMBER
═══════════════════════════════════ */
function CountNum({ value, label }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <motion.span
        key={value}
        initial={{ y: -14, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 380, damping: 24 }}
        className="tabular-nums leading-none"
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(2rem, 6vw, 3.8rem)",
          color: "#fff",
        }}
      >
        {value}
      </motion.span>
      <span
        className="tracking-[0.2em] uppercase"
        style={{ fontFamily: "'Oswald', sans-serif", color: "rgba(255,210,80,0.55)", fontWeight: 500, fontSize: "0.5rem" }}
      >
        {label}
      </span>
    </div>
  );
}

/* ═══════════════════════════════════
   PARTICLES
═══════════════════════════════════ */
const particleData = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  size: Math.random() * 3 + 1,
  opacity: Math.random() * 0.35 + 0.08,
  left: Math.random() * 100,
  duration: Math.random() * 14 + 9,
  delay: Math.random() * 12,
}));

function Particles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particleData.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{ width: p.size, height: p.size, background: `rgba(255,195,0,${p.opacity})`, left: `${p.left}%`, bottom: -10 }}
          animate={{ y: [0, "-100vh"], x: [0, 28, -14, 28], opacity: [0, p.opacity * 3.5, p.opacity * 2, 0], scale: [1, 0.9, 0.6] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeIn" }}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════
   ORBS
═══════════════════════════════════ */
function Orbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[
        { w: "clamp(400px,50vw,800px)", top: "5%",  left: "-15%", dur: 18, delay: 0, color: "rgba(200,140,0,0.16)" },
        { w: "clamp(250px,35vw,550px)", bottom: "5%", left: "30%", dur: 22, delay: 3, color: "rgba(180,120,0,0.12)" },
        { w: "clamp(200px,25vw,400px)", top: "20%", right: "2%",  dur: 15, delay: 6, color: "rgba(220,160,0,0.11)" },
      ].map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{ width: orb.w, height: orb.w, top: orb.top, bottom: orb.bottom, left: orb.left, right: orb.right, background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)` }}
          animate={{ x: [0, 22, -14, 0], y: [0, -24, 16, 0], scale: [1, 1.05, 0.97, 1] }}
          transition={{ duration: orb.dur, delay: orb.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════
   TUNGSTEN ATOM — bigger
═══════════════════════════════════ */
const SIZE = 700;
const CX = SIZE / 2;
const CY = SIZE / 2;
const NUCLEUS_R = 90;
const PAD = 30;
const DOT_R = [1.8, 1.7, 1.5, 1.3, 1.5, 1.7];
const RING_START = NUCLEUS_R + 12;
const RING_END = CX - PAD;
const RING_RADII = Array.from({ length: 6 }, (_, i) => RING_START + ((RING_END - RING_START) / 5) * i);
const W_CONFIG = [2, 8, 18, 32, 12, 2];
const DURATIONS = [150, 120, 95, 75, 62, 52];
const DIRECTIONS = [1, -1, 1, -1, 1, -1];

const ATOM_CSS = RING_RADII.map((_, i) => {
  const dir = DIRECTIONS[i];
  return `
    @keyframes shellSpin${i} { from { transform: rotate(0deg); } to { transform: rotate(${dir * 360}deg); } }
    .shell-${i} { transform-origin: ${CX}px ${CY}px; animation: shellSpin${i} ${DURATIONS[i]}s linear infinite; }
  `;
}).join("\n");

if (typeof document !== "undefined" && !document.getElementById("atom-shell-css")) {
  const s = document.createElement("style");
  s.id = "atom-shell-css";
  s.textContent = ATOM_CSS;
  document.head.appendChild(s);
}

function TungstenAtom() {
  return (
    <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: SIZE, height: SIZE, pointerEvents: "none", zIndex: 1 }}>
      <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} style={{ overflow: "visible", display: "block" }}>
        <defs>
          <filter id="elGlow" x="-120%" y="-120%" width="340%" height="340%">
            <feGaussianBlur stdDeviation="1.6" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <radialGradient id="nucBg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1a1000" stopOpacity="1" />
            <stop offset="100%" stopColor="#0a0700" stopOpacity="1" />
          </radialGradient>
          <radialGradient id="nucHalo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#d4a820" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#c8790a" stopOpacity="0" />
          </radialGradient>
        </defs>
        {RING_RADII.map((r, i) => (
          <circle key={`track-${i}`} cx={CX} cy={CY} r={r} fill="none" stroke="rgba(212,168,32,0.09)" strokeWidth="0.5" />
        ))}
        {RING_RADII.map((r, i) => {
          const n = W_CONFIG[i];
          const dotRi = DOT_R[i];
          const dots = Array.from({ length: n }, (_, k) => {
            const angle = (k / n) * 2 * Math.PI - Math.PI / 2;
            return { x: CX + r * Math.cos(angle), y: CY + r * Math.sin(angle) };
          });
          return (
            <g key={`shell-${i}`} className={`shell-${i}`}>
              {dots.map((d, k) => (
                <circle key={k} cx={d.x} cy={d.y} r={dotRi} fill="#f5c842" opacity={0.32} filter="url(#elGlow)" />
              ))}
            </g>
          );
        })}
        <circle cx={CX} cy={CY} r={NUCLEUS_R + 24} fill="url(#nucHalo)" opacity={0.35} />
        <circle cx={CX} cy={CY} r={NUCLEUS_R} fill="url(#nucBg)" stroke="rgba(212,168,32,0.22)" strokeWidth="0.8" />
      </svg>
      <img
        src="/aon26_logo.png"
        alt="AON"
        style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: NUCLEUS_R * 2.8, height: NUCLEUS_R * 2.8, objectFit: "contain", filter: "drop-shadow(0 0 16px rgba(255,200,0,0.7))", zIndex: 3 }}
      />
    </div>
  );
}

/* ═══════════════════════════════════
   POPUP
═══════════════════════════════════ */
function Popup({ type, onClose }) {
  const data = popupData[type];
  return (
    <AnimatePresence>
      {type && data && (
        <motion.div
          className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            className="relative max-w-2xl w-full rounded-2xl p-8 bg-[rgba(10,8,2,0.97)] border border-[rgba(255,190,0,0.2)] shadow-[0_0_80px_rgba(200,140,0,0.14)] max-h-[80vh] overflow-y-auto"
            initial={{ scale: 0.92, y: 24, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.92, y: 16, opacity: 0 }}
            transition={{ type: "spring", stiffness: 340, damping: 28 }}
          >
            {/* Sticky close */}
            <div className="sticky top-0 flex justify-end mb-2 z-10">
              <motion.button
                onClick={onClose}
                className="text-[rgba(255,210,80,0.4)] text-xl bg-transparent border-none cursor-pointer leading-none"
                whileHover={{ color: "#ffd700", scale: 1.15 }}
                whileTap={{ scale: 0.85 }}
              >✕</motion.button>
            </div>

            {/* Title */}
            <h2
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              className="text-4xl text-white mb-6 leading-none"
            >
              {data.title}
            </h2>

            {/* Sections array (wab) OR plain text (cbs / aon) */}
            {data.sections ? (
              <div className="flex flex-col gap-4">
                {data.sections.map((sec, i) => (
                  <div key={i} className="flex flex-col gap-1">
                    {sec.heading && (
                      <p style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600, letterSpacing: "0.07em", fontSize: "0.78rem", textTransform: "uppercase", color: "#ffd040" }}>
                        {sec.heading}
                      </p>
                    )}
                    {sec.text && (
                      <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 400, fontSize: "0.82rem", lineHeight: "1.75", color: "rgba(255,220,140,0.75)" }}>
                        {sec.text}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 400, fontSize: "0.82rem", lineHeight: "1.75", color: "rgba(255,220,140,0.75)" }}>
                {data.text}
              </p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════
   LOADER
═══════════════════════════════════ */
function Loader({ onDone }) {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => setVisible(false), 1600);
    return () => clearTimeout(t);
  }, []);
  const handleExitComplete = () => {
    document.body.style.overflow = "";
    sessionStorage.setItem(LOADER_KEY, "1");
    onDone();
  };
  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[3000] flex flex-col items-center justify-center bg-[#0a0700]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <motion.div
            className="flex flex-col items-center gap-1"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <span style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 500, fontSize: "clamp(0.55rem, 1.2vw, 0.72rem)", letterSpacing: "0.32em", textTransform: "uppercase", color: "rgba(255,200,60,0.55)" }}>
              Calcutta Boys&apos; School
            </span>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.2rem, 6vw, 4.5rem)", lineHeight: 0.92, letterSpacing: "0.03em", textAlign: "center" }}>
              <span style={{ display: "block", color: "#ffffff" }}>ASSEMBLY</span>
              <span style={{ display: "block", background: "linear-gradient(90deg, #ffd700, #f5a623, #c8790a, #f5a623, #ffd700)", backgroundSize: "300% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", animation: "titleShimmer 4s linear infinite" }}>
                OF NATIONS
              </span>
            </div>
            <span style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600, fontSize: "clamp(0.6rem, 1.4vw, 0.85rem)", letterSpacing: "0.28em", color: "rgba(255,200,60,0.4)", marginTop: "0.25rem" }}>2026</span>
          </motion.div>
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 rounded-full overflow-hidden"
            style={{ width: "clamp(100px, 16vw, 160px)", height: "1px", background: "rgba(255,200,0,0.1)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{ background: "rgba(255,200,60,0.6)" }}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.35, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════
   HOME PAGE
═══════════════════════════════════ */
export default function Home() {
  const { days, hours, mins, secs } = useCountdown("2026-06-29T00:00:00");
  const [popup, setPopup] = useState(null);

  const alreadySeen = sessionStorage.getItem(LOADER_KEY) === "1";
  const [loaderDone, setLoaderDone] = useState(alreadySeen);
  const heroDelay = alreadySeen ? 0.1 : 1.9;

  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.11, delayChildren: heroDelay } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 22 },
    show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <>
      {!alreadySeen && !loaderDone && <Loader onDone={() => setLoaderDone(true)} />}

      <style>{`
        .hero-section {
          display: grid;
          min-height: 100svh;
          grid-template-rows: 52svh 1fr;
          grid-template-columns: 1fr;
        }
        .atom-sizer {
          width: 98vw;
          height: 98vw;
          max-width: 440px;
          max-height: 440px;
        }
        @media (min-width: 1024px) {
          .hero-section {
            grid-template-rows: 1fr !important;
            grid-template-columns: 1fr 1fr !important;
            align-items: center !important;
          }
          .atom-sizer {
            width: clamp(420px, 50vw, 680px) !important;
            height: clamp(420px, 50vw, 680px) !important;
            max-width: none !important;
            max-height: none !important;
          }
        }
      `}</style>

      <section className="hero-section relative w-full overflow-hidden bg-[#0a0700]">
        <Orbs />
        <Particles />

        {/* ATOM */}
        <motion.div
          className="relative flex items-center justify-center w-full h-full lg:order-2"
          style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: heroDelay + 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="atom-sizer relative flex items-center justify-center"
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          >
            <TungstenAtom />
          </motion.div>
        </motion.div>

        {/* HERO TEXT */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="relative z-10 flex flex-col items-center justify-center text-center w-full
            px-6 pb-10
            lg:order-1 lg:items-start lg:text-left lg:pl-[8vw] lg:pr-6 lg:pb-0"
        >
          {/* eyebrow */}
          <motion.p
            variants={itemVariants}
            style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600, fontSize: "clamp(0.6rem, 2vw, 0.85rem)", letterSpacing: "0.28em", textTransform: "uppercase", color: "#ffd040" }}
          >
            Calcutta Boys&apos; School Presents
          </motion.p>

          {/* main title */}
          <motion.h1
            variants={itemVariants}
            className="leading-[0.88] mt-2"
            style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(5rem, 22vw, 11rem)" }}
          >
            <span style={{ color: "#ffffff", display: "block" }}>Assembly</span>
            <span style={{
              display: "block",
              background: "linear-gradient(90deg, #ffd700, #f5a623, #c8790a, #f5a623, #ffd700)",
              backgroundSize: "300% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "titleShimmer 4s linear infinite",
            }}>
              of Nations
            </span>
          </motion.h1>

          {/* year + tagline */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-3 flex-wrap justify-center lg:justify-start mt-3"
          >
            <span style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "clamp(0.7rem, 2vw, 1rem)", letterSpacing: "0.22em", color: "#ffd040" }}>2026</span>
            <span style={{ color: "rgba(255,210,80,0.25)", fontSize: "1.2rem" }}>|</span>
            <span style={{ fontFamily: "'Cinzel', serif", fontWeight: 700, fontSize: "clamp(0.6rem, 1.8vw, 0.82rem)", letterSpacing: "0.12em", color: "#e8c060" }}>
              Renascentia De Legatum
            </span>
          </motion.div>

          {/* countdown */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-4 mt-6 px-6 py-4 rounded-2xl mx-auto lg:mx-0"
            style={{ background: "rgba(20,14,0,0.6)", border: "1px solid rgba(255,190,0,0.15)", backdropFilter: "blur(8px)" }}
          >
            {[{ val: days, label: "Days" }, { val: hours, label: "Hrs" }, { val: mins, label: "Min" }, { val: secs, label: "Sec" }].map(({ val, label }, i) => (
              <div key={label} className="flex items-center gap-4">
                {i > 0 && (
                  <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(1.6rem, 5vw, 2.2rem)", color: "rgba(255,190,0,0.18)", lineHeight: 1 }}>:</span>
                )}
                <CountNum value={val} label={label} />
              </div>
            ))}
          </motion.div>

          {/* WE ARE BACK button */}
          <motion.div variants={itemVariants} className="mt-6 mx-auto lg:mx-0">
            <motion.button
              onClick={() => setPopup("wab")}
              className="relative px-8 py-3 rounded-xl text-sm tracking-[0.18em] uppercase overflow-hidden cursor-pointer border-none outline-none"
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontWeight: 600,
                background: "linear-gradient(135deg, rgba(30,20,0,0.9) 0%, rgba(15,10,0,0.95) 100%)",
                border: "1px solid rgba(255,190,0,0.3)",
                color: "#ffd040",
                boxShadow: "0 0 24px rgba(200,140,0,0.12), inset 0 1px 0 rgba(255,210,80,0.08)",
              }}
              whileHover={{
                scale: 1.04,
                boxShadow: "0 0 40px rgba(200,140,0,0.28), inset 0 1px 0 rgba(255,210,80,0.12)",
                borderColor: "rgba(255,200,0,0.55)",
              }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 340, damping: 22 }}
            >
              {/* shimmer sweep */}
              <motion.span
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "linear-gradient(105deg, transparent 30%, rgba(255,210,80,0.09) 50%, transparent 70%)",
                  backgroundSize: "200% 100%",
                }}
                animate={{ backgroundPosition: ["-200% center", "200% center"] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "linear", repeatDelay: 1.2 }}
              />
              <span className="relative z-10">✦ &nbsp;We Are Back</span>
            </motion.button>
          </motion.div>
        </motion.div>
      </section>

      <About onPopup={setPopup} />
      <Gallery />
      <Popup type={popup} onClose={() => setPopup(null)} />
    </>
  );
}