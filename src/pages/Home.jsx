import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

/* ─── INJECT GLOBAL STYLES (fonts + keyframes) ─── */
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

if (
  typeof document !== "undefined" &&
  !document.getElementById("aon-global-styles")
) {
  const tag = document.createElement("style");
  tag.id = "aon-global-styles";
  tag.textContent = GLOBAL_CSS;
  document.head.appendChild(tag);
}

/* ─── GALLERY IMAGES ─── */
const galleryImages = [
  "gall/mayukh.webp",
  "gall/israel.webp",
  "gall/megacity.webp",
  "gall/aksh.webp",
  "gall/maam.webp",
  "gall/gundaboy.webp",
  "gall/flower.webp",
  "gall/mogger.webp",
  "gall/mogger2.webp",
  "gall/desiboy.webp",
  "gall/head.webp",
];

/* ─── POPUP DATA ─── */
const popupData = {
  cbs: {
    title: "Calcutta Boys' School",
    text: "Established in 1877, Calcutta Boys' School is one of the oldest and most prestigious educational institutions in India. Located in the heart of Kolkata, it has been shaping young minds for over a century, producing leaders, thinkers, and changemakers across generations.",
  },
  aon: {
    title: "Assembly Of Nations",
    text: "Assembly Of Nations (AON) is the flagship Model United Nations conference organised by Calcutta Boys' School. It brings together students from schools across the country to engage in diplomatic simulations, debate global issues, and develop critical thinking and public speaking skills. AON 2026 marks a landmark edition in the conference's legacy.",
  },
};

/* ─── SESSION KEY ─── */
const LOADER_KEY = "aon26_loader_shown";

/* ═══════════════════════════════════
   COUNTDOWN HOOK
═══════════════════════════════════ */
function useCountdown(targetDate) {
  const [time, setTime] = useState({
    days: "00",
    hours: "00",
    mins: "00",
    secs: "00",
  });
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
   ANIMATED COUNTDOWN NUMBER
═══════════════════════════════════ */
function CountNum({ value, label }) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <motion.span
        key={value}
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 380, damping: 24 }}
        className="tabular-nums leading-none"
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(1.6rem, 5vw, 3rem)",
          color: "#fff",
        }}
      >
        {value}
      </motion.span>
      <span
        className="text-[0.45rem] tracking-[0.18em] uppercase"
        style={{
          fontFamily: "'Oswald', sans-serif",
          color: "rgba(255,210,80,0.6)",
          fontWeight: 500,
        }}
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
          style={{
            width: p.size,
            height: p.size,
            background: `rgba(255,195,0,${p.opacity})`,
            left: `${p.left}%`,
            bottom: -10,
          }}
          animate={{
            y: [0, "-100vh"],
            x: [0, 28, -14, 28],
            opacity: [0, p.opacity * 3.5, p.opacity * 2, 0],
            scale: [1, 0.9, 0.6],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeIn",
          }}
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
        {
          w: "clamp(300px,40vw,600px)",
          top: "10%",
          left: "-10%",
          dur: 18,
          delay: 0,
          color: "rgba(200,140,0,0.14)",
        },
        {
          w: "clamp(200px,30vw,450px)",
          bottom: "5%",
          left: "30%",
          dur: 22,
          delay: 3,
          color: "rgba(180,120,0,0.11)",
        },
        {
          w: "clamp(150px,20vw,300px)",
          top: "20%",
          right: "5%",
          dur: 15,
          delay: 6,
          color: "rgba(220,160,0,0.10)",
        },
      ].map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: orb.w,
            height: orb.w,
            top: orb.top,
            bottom: orb.bottom,
            left: orb.left,
            right: orb.right,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
          }}
          animate={{
            x: [0, 22, -14, 0],
            y: [0, -24, 16, 0],
            scale: [1, 1.05, 0.97, 1],
          }}
          transition={{
            duration: orb.dur,
            delay: orb.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════
   TUNGSTEN ATOM
═══════════════════════════════════ */
const SIZE = 600;
const CX = SIZE / 2;
const CY = SIZE / 2;
const NUCLEUS_R = 82;
const PAD = 38;
const DOT_R = [1.6, 1.5, 1.4, 1.2, 1.4, 1.5];

const RING_START = NUCLEUS_R + 10;
const RING_END = CX - PAD;
const RING_RADII = Array.from({ length: 6 }, (_, i) => {
  return RING_START + ((RING_END - RING_START) / 5) * i;
});

const W_CONFIG = [2, 8, 18, 32, 12, 2];
const DURATIONS = [150, 120, 95, 75, 62, 52];
const DIRECTIONS = [1, -1, 1, -1, 1, -1];

const ATOM_CSS = RING_RADII.map((_, i) => {
  const dir = DIRECTIONS[i];
  return `
    @keyframes shellSpin${i} {
      from { transform: rotate(0deg); }
      to   { transform: rotate(${dir * 360}deg); }
    }
    .shell-${i} {
      transform-origin: ${CX}px ${CY}px;
      animation: shellSpin${i} ${DURATIONS[i]}s linear infinite;
    }
  `;
}).join("\n");

if (
  typeof document !== "undefined" &&
  !document.getElementById("atom-shell-css")
) {
  const s = document.createElement("style");
  s.id = "atom-shell-css";
  s.textContent = ATOM_CSS;
  document.head.appendChild(s);
}

function TungstenAtom() {
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: SIZE,
        height: SIZE,
        pointerEvents: "none",
        zIndex: 1,
      }}
    >
      <svg
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        style={{ overflow: "visible", display: "block" }}
      >
        <defs>
          <filter id="elGlow" x="-120%" y="-120%" width="340%" height="340%">
            <feGaussianBlur stdDeviation="1.4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="nucBg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1a1000" stopOpacity="1" />
            <stop offset="100%" stopColor="#0a0700" stopOpacity="1" />
          </radialGradient>
          <radialGradient id="nucHalo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#d4a820" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#c8790a" stopOpacity="0" />
          </radialGradient>
        </defs>

        {RING_RADII.map((r, i) => (
          <circle
            key={`track-${i}`}
            cx={CX}
            cy={CY}
            r={r}
            fill="none"
            stroke="rgba(212,168,32,0.07)"
            strokeWidth="0.4"
          />
        ))}

        {RING_RADII.map((r, i) => {
          const n = W_CONFIG[i];
          const dotRi = DOT_R[i];
          const dots = Array.from({ length: n }, (_, k) => {
            const angle = (k / n) * 2 * Math.PI - Math.PI / 2;
            return {
              x: CX + r * Math.cos(angle),
              y: CY + r * Math.sin(angle),
            };
          });
          return (
            <g key={`shell-${i}`} className={`shell-${i}`}>
              {dots.map((d, k) => (
                <circle
                  key={k}
                  cx={d.x}
                  cy={d.y}
                  r={dotRi}
                  fill="#f5c842"
                  opacity={0.28}
                  filter="url(#elGlow)"
                />
              ))}
            </g>
          );
        })}

        <circle
          cx={CX}
          cy={CY}
          r={NUCLEUS_R + 20}
          fill="url(#nucHalo)"
          opacity={0.3}
        />
        <circle
          cx={CX}
          cy={CY}
          r={NUCLEUS_R}
          fill="url(#nucBg)"
          stroke="rgba(212,168,32,0.18)"
          strokeWidth="0.7"
        />
      </svg>

      <img
        src="/aon26_logo.png"
        alt="AON"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: NUCLEUS_R * 2.6,
          height: NUCLEUS_R * 2.6,
          objectFit: "contain",
          filter: "drop-shadow(0 0 12px rgba(255,200,0,0.6))",
          zIndex: 3,
        }}
      />
    </div>
  );
}

/* ═══════════════════════════════════
   SCROLL-REVEAL WRAPPER
═══════════════════════════════════ */
function Reveal({ children, delay = 0, y = 28 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════
   STAT CARD
═══════════════════════════════════ */
function StatCard({ num, label, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24, scale: 0.94 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, boxShadow: "0 0 30px rgba(255,190,0,0.12)" }}
      className="flex flex-col items-center gap-1 px-8 py-5 rounded-2xl
        bg-[rgba(255,200,0,0.03)] border border-[rgba(255,190,0,0.15)] min-w-[110px] cursor-default"
    >
      <span
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(2rem,6vw,3.2rem)",
          background:
            "linear-gradient(90deg, #ffd700, #f5a623, #c8790a, #f5a623, #ffd700)",
          backgroundSize: "300% auto",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          animation: "titleShimmer 4s linear infinite",
        }}
      >
        {num}
      </span>
      <span
        style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 500 }}
        className="text-[0.5rem] tracking-[0.18em] uppercase text-[rgba(255,210,80,0.55)]"
      >
        {label}
      </span>
    </motion.div>
  );
}

/* ═══════════════════════════════════
   GALLERY
═══════════════════════════════════ */
function Gallery() {
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState(1);
  const timerRef = useRef(null);

  const startTimer = (idx) => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setDir(1);
      setCurrent((c) => (c + 1) % galleryImages.length);
    }, 3500);
  };

  useEffect(() => {
    startTimer(0);
    return () => clearInterval(timerRef.current);
  }, []);

  const go = (next) => {
    const resolved = (next + galleryImages.length) % galleryImages.length;
    setDir(next >= current ? 1 : -1);
    setCurrent(resolved);
    startTimer(resolved);
  };

  const variants = {
    enter: (d) => ({ x: d > 0 ? "8%" : "-8%", opacity: 0, scale: 1.04 }),
    center: { x: "0%", opacity: 1, scale: 1 },
    exit: (d) => ({ x: d > 0 ? "-8%" : "8%", opacity: 0, scale: 0.97 }),
  };

  return (
    <section className="w-full py-24 px-4 bg-[#080600]">
      <Reveal>
        <h2
          className="text-center mb-10"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(2.5rem,6vw,5rem)",
            color: "#fff",
            letterSpacing: "0.04em",
          }}
        >
          MOMENTS FROM
          <span style={{ color: "#ffcc00" }}> AON 25</span>
        </h2>
      </Reveal>

      <div className="relative max-w-4xl mx-auto flex flex-col items-center">
        <div
          className="relative w-full overflow-hidden rounded-2xl border border-[rgba(255,190,0,0.18)]"
          style={{ aspectRatio: "16/9" }}
        >
          <AnimatePresence custom={dir} mode="popLayout">
            <motion.div
              key={current}
              custom={dir}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: 0.38,
                ease: [0.32, 0, 0.12, 1],
              }}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${galleryImages[current]}')` }}
            />
          </AnimatePresence>

          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to right, rgba(8,6,0,0.35) 0%, transparent 15%, transparent 85%, rgba(8,6,0,0.35) 100%)",
            }}
          />

          {[
            { pos: "left-3", label: "←", onClick: () => go(current - 1) },
            { pos: "right-3", label: "→", onClick: () => go(current + 1) },
          ].map(({ pos, label, onClick }) => (
            <motion.button
              key={pos}
              onClick={onClick}
              className={`absolute ${pos} top-1/2 -translate-y-1/2 z-10 w-10 h-10
                flex items-center justify-center rounded-full
                bg-[rgba(10,7,0,0.6)] border border-[rgba(255,190,0,0.25)]
                text-[rgba(255,210,80,0.8)] text-lg`}
              whileHover={{
                scale: 1.14,
                backgroundColor: "rgba(30,20,0,0.85)",
                color: "#ffd700",
              }}
              whileTap={{ scale: 0.9 }}
            >
              {label}
            </motion.button>
          ))}
        </div>

        <div className="flex gap-2 mt-5">
          {galleryImages.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => go(i)}
              animate={{
                width: i === current ? 24 : 6,
                backgroundColor:
                  i === current ? "#ffcc00" : "rgba(255,190,0,0.3)",
              }}
              transition={{ type: "spring", stiffness: 480, damping: 30 }}
              className="h-[5px] rounded-full border-none cursor-pointer p-0"
            />
          ))}
        </div>
      </div>
    </section>
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            className="relative max-w-lg w-full rounded-2xl p-8
              bg-[rgba(10,8,2,0.97)] border border-[rgba(255,190,0,0.2)]
              shadow-[0_0_80px_rgba(200,140,0,0.14)]"
            initial={{ scale: 0.92, y: 24, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.92, y: 16, opacity: 0 }}
            transition={{ type: "spring", stiffness: 340, damping: 28 }}
          >
            <motion.button
              onClick={onClose}
              className="absolute top-4 right-4 text-[rgba(255,210,80,0.4)] text-xl bg-none border-none cursor-pointer"
              whileHover={{ color: "#ffd700", scale: 1.15 }}
              whileTap={{ scale: 0.85 }}
            >
              ✕
            </motion.button>
            <h2
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              className="text-3xl text-white mb-3"
            >
              {data.title}
            </h2>
            <p
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 400,
              }}
              className="text-sm leading-relaxed text-[rgba(255,220,140,0.75)]"
            >
              {data.text}
            </p>
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
            <span
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontWeight: 500,
                fontSize: "clamp(0.55rem, 1.2vw, 0.72rem)",
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                color: "rgba(255,200,60,0.55)",
              }}
            >
              Calcutta Boys&apos; School
            </span>

            <div
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(2.2rem, 6vw, 4.5rem)",
                lineHeight: 0.92,
                letterSpacing: "0.03em",
                textAlign: "center",
              }}
            >
              <span style={{ display: "block", color: "#ffffff" }}>
                ASSEMBLY
              </span>
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
                OF NATIONS
              </span>
            </div>

            <span
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontWeight: 600,
                fontSize: "clamp(0.6rem, 1.4vw, 0.85rem)",
                letterSpacing: "0.28em",
                color: "rgba(255,200,60,0.4)",
                marginTop: "0.25rem",
              }}
            >
              2026
            </span>
          </motion.div>

          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 rounded-full overflow-hidden"
            style={{
              width: "clamp(100px, 16vw, 160px)",
              height: "1px",
              background: "rgba(255,200,0,0.1)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{ background: "rgba(255,200,60,0.6)" }}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{
                duration: 1.35,
                ease: [0.4, 0, 0.2, 1],
                delay: 0.1,
              }}
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
    hidden: { opacity: 0, y: 18 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <>
      {!alreadySeen && !loaderDone && (
        <Loader onDone={() => setLoaderDone(true)} />
      )}

      {/* ══════════ HERO ══════════ */}
      <style>{`
        .hero-section {
          display: grid;
          min-height: 100svh;
          grid-template-rows: 48svh 1fr;
          grid-template-columns: 1fr;
        }
        .atom-sizer {
          width: 88vw;
          height: 88vw;
          max-width: 380px;
          max-height: 380px;
        }
        @media (min-width: 1024px) {
          .hero-section {
            grid-template-rows: 1fr !important;
            grid-template-columns: 1fr 1fr !important;
            align-items: center !important;
          }
          .atom-sizer {
            width: clamp(340px, 44vw, 540px) !important;
            height: clamp(340px, 44vw, 540px) !important;
            max-width: none !important;
            max-height: none !important;
          }
        }
      `}</style>

      <section className="hero-section relative w-full overflow-hidden bg-[#0a0700]">
        <Orbs />
        <Particles />

        {/* ── ATOM — row 1 on mobile, right col on desktop ── */}
        <motion.div
          className="relative flex items-center justify-center w-full h-full lg:order-2"
          style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.0, delay: heroDelay + 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="atom-sizer relative flex items-center justify-center"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          >
            <TungstenAtom />
          </motion.div>
        </motion.div>

        {/* ── HERO CONTENT — row 2 on mobile, left col on desktop ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="relative z-10 flex flex-col items-center justify-center text-center w-full
            px-6 pb-10
            lg:order-1 lg:items-start lg:text-left lg:pl-[8vw] lg:pr-6 lg:pb-0"
        >
          {/* TOP LABEL */}
          <motion.p
            variants={itemVariants}
            style={{
              fontFamily: "'Oswald', sans-serif",
              fontWeight: 600,
              fontSize: "clamp(0.6rem, 3vw, 0.9rem)",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#ffd040",
            }}
          >
            Calcutta Boys&apos; School Presents
          </motion.p>

          {/* TITLE */}
          <motion.h1
            variants={itemVariants}
            className="leading-[0.92] mt-1"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(4rem, 20vw, 9.5rem)",
            }}
          >
            <span style={{ color: "#ffffff", display: "block" }}>Assembly</span>
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
              of Nations
            </span>
          </motion.h1>

          {/* YEAR + TAGLINE */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-2 flex-wrap justify-center lg:justify-start mt-2"
          >
            <span style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600, fontSize: "clamp(0.7rem, 3vw, 0.8rem)", letterSpacing: "0.22em", color: "#ffd040" }}>
              2026
            </span>
            <span style={{ color: "rgba(255,210,80,0.3)" }}>|</span>
            <span style={{ fontFamily: "'Cinzel', serif", fontWeight: 700, fontSize: "clamp(0.6rem, 2.5vw, 0.75rem)", letterSpacing: "0.1em", color: "#e8c060" }}>
              Renascentia De Legatum
            </span>
          </motion.div>

          {/* COUNTDOWN */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-3 mt-4 px-5 py-3 rounded-xl mx-auto lg:mx-0"
            style={{ background: "rgba(20,14,0,0.5)", border: "1px solid rgba(255,190,0,0.12)", backdropFilter: "blur(6px)" }}
          >
            {[
              { val: days, label: "Days" },
              { val: hours, label: "Hrs" },
              { val: mins, label: "Min" },
              { val: secs, label: "Sec" },
            ].map(({ val, label }, i) => (
              <div key={label} className="flex items-center gap-3">
                {i > 0 && (
                  <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(1.4rem, 5vw, 1.8rem)", color: "rgba(255,190,0,0.2)", lineHeight: 1 }}>
                    :
                  </span>
                )}
                <CountNum value={val} label={label} />
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ══════════ ABOUT PREVIEW ══════════ */}
      <section className="w-full py-28 px-6 bg-[#0a0700] flex flex-col items-center gap-6 text-center">
        <Reveal>
          <h2
            className="leading-[0.88]"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(4rem, 10vw, 8rem)",
            }}
          >
            <span style={{ color: "#ffffff", display: "block" }}>WE ARE</span>
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
              BACK
            </span>
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          <p
            style={{
              fontFamily: "'Oswald', sans-serif",
              fontWeight: 400,
              fontSize: "clamp(0.55rem, 1.1vw, 0.72rem)",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              lineHeight: 2.2,
            }}
            className="max-w-xl text-[rgba(200,165,80,0.55)]"
          >
            This time CBS AON is back with its 6th edition with powerful
            exciting committees, dynamic discussions, and the same passion for
            diplomacy!
          </p>
        </Reveal>

        <div className="flex flex-wrap gap-3 mt-2 justify-center">
          <StatCard num="6TH" label="Edition" delay={0.08} />
          <StatCard num="2 DAYS" label="of conference" delay={0.16} />
          <StatCard num="3" label="Committees" delay={0.24} />
        </div>

        <Reveal delay={0.1}>
          <div className="flex gap-3 mt-2 flex-wrap justify-center">
            <motion.button
              onClick={() => setPopup("cbs")}
              style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700 }}
              className="text-[0.6rem] tracking-[0.15em] uppercase text-[#0a0700]
                bg-gradient-to-br from-[#d4a820] to-[#ffe040]
                px-7 py-3 rounded-full cursor-pointer border-none
                shadow-[0_0_20px_rgba(255,190,0,0.3)]"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 38px rgba(255,190,0,0.55)",
              }}
              whileTap={{ scale: 0.96 }}
            >
              About CBS
            </motion.button>
            <motion.button
              onClick={() => setPopup("aon")}
              style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700 }}
              className="text-[0.6rem] tracking-[0.15em] uppercase bg-transparent
                text-[rgba(255,210,80,0.75)] border border-[rgba(255,190,0,0.35)]
                px-7 py-3 rounded-full cursor-pointer"
              whileHover={{
                scale: 1.05,
                borderColor: "rgba(255,190,0,0.7)",
                color: "rgba(255,230,100,0.98)",
              }}
              whileTap={{ scale: 0.96 }}
            >
              About AON
            </motion.button>
          </div>
        </Reveal>
      </section>

      <Gallery />

      

      <Popup type={popup} onClose={() => setPopup(null)} />
    </>
  );
}
