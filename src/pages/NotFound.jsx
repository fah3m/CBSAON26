import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";

/* ── shared shimmer keyframe injected once ── */
const SHIMMER_CSS = `
  @keyframes titleShimmer {
    0%   { background-position: 0% center; }
    100% { background-position: 300% center; }
  }
  @keyframes pulseGlow {
    0%, 100% { opacity: 0.18; }
    50%       { opacity: 0.38; }
  }
  @keyframes floatY {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-14px); }
  }
  @keyframes scanline {
    0%   { top: -6%; }
    100% { top: 106%; }
  }
`;

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

/* glitchy number that flickers on mount */
function GlitchNum({ children }) {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const intervals = [400, 900, 1400, 2200, 3100];
    const timers = intervals.map((ms) =>
      setTimeout(() => {
        setGlitch(true);
        setTimeout(() => setGlitch(false), 80);
      }, ms),
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <span
      style={{
        display: "inline-block",
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: "clamp(9rem, 28vw, 22rem)",
        lineHeight: 0.85,
        background:
          "linear-gradient(90deg, #ffd700, #f5a623, #c8790a, #f5a623, #ffd700)",
        backgroundSize: "300% auto",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        animation: "titleShimmer 4s linear infinite",
        filter: glitch
          ? "drop-shadow(3px 0 0 rgba(255,80,80,0.7)) drop-shadow(-3px 0 0 rgba(0,200,255,0.7))"
          : "none",
        transform: glitch ? "skewX(-4deg)" : "none",
        transition: "filter 0.05s, transform 0.05s",
        letterSpacing: "0.02em",
      }}
    >
      {children}
    </span>
  );
}

export default function NotFound() {
  const navigate = useNavigate();

  /* inject styles once */
  useEffect(() => {
    if (document.getElementById("aon-404-styles")) return;
    const tag = document.createElement("style");
    tag.id = "aon-404-styles";
    tag.textContent = SHIMMER_CSS;
    document.head.appendChild(tag);
  }, []);

  return (
    <section
      style={{
        minHeight: "100svh",
        background: "#0a0700",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        position: "relative",
        padding: "clamp(3rem, 8vw, 6rem) clamp(1.5rem, 6vw, 8vw)",
      }}
    >
      {/* ── ambient radial glow ── */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "35%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "min(700px, 90vw)",
          height: "min(700px, 90vw)",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,190,0,0.07) 0%, transparent 70%)",
          animation: "pulseGlow 4s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />

      {/* ── ghost watermark text ── */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(6rem, 22vw, 18rem)",
          color: "rgba(255,180,0,0.025)",
          whiteSpace: "nowrap",
          pointerEvents: "none",
          userSelect: "none",
          letterSpacing: "0.06em",
        }}
      >
        AON 2026
      </div>

      {/* ── slow-moving scanline ── */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: 0,
          width: "100%",
          height: 2,
          background:
            "linear-gradient(to right, transparent, rgba(255,200,0,0.12), transparent)",
          animation: "scanline 8s linear infinite",
          pointerEvents: "none",
        }}
      />

      {/* ── corner accents ── */}
      {[
        { top: 24, left: 24 },
        { top: 24, right: 24 },
        { bottom: 24, left: 24 },
        { bottom: 24, right: 24 },
      ].map((pos, i) => (
        <div
          key={i}
          aria-hidden
          style={{
            position: "absolute",
            width: 28,
            height: 28,
            borderTop: i < 2 ? "1.5px solid rgba(255,190,0,0.28)" : "none",
            borderBottom: i >= 2 ? "1.5px solid rgba(255,190,0,0.28)" : "none",
            borderLeft:
              i % 2 === 0 ? "1.5px solid rgba(255,190,0,0.28)" : "none",
            borderRight:
              i % 2 === 1 ? "1.5px solid rgba(255,190,0,0.28)" : "none",
            borderRadius:
              i === 0
                ? "6px 0 0 0"
                : i === 1
                  ? "0 6px 0 0"
                  : i === 2
                    ? "0 0 0 6px"
                    : "0 0 6px 0",
            ...pos,
          }}
        />
      ))}

      {/* ── top rule ── */}
      <Reveal delay={0}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: "clamp(2rem, 5vw, 3.5rem)",
            width: "100%",
            maxWidth: 900,
          }}
        >
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

      {/* ── 404 number ── */}
      <Reveal delay={0.08} y={20}>
        <div style={{ animation: "floatY 6s ease-in-out infinite" }}>
          <GlitchNum>404</GlitchNum>
        </div>
      </Reveal>

      {/* ── headline ── */}
      <Reveal delay={0.18}>
        <h1
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(1.8rem, 5vw, 3.8rem)",
            letterSpacing: "0.14em",
            color: "#fff",
            textAlign: "center",
            marginTop: "clamp(0.5rem, 2vw, 1rem)",
            marginBottom: 0,
          }}
        >
          PAGE NOT FOUND
        </h1>
      </Reveal>

      {/* ── thin gold rule under headline ── */}
      <Reveal delay={0.24}>
        <div
          style={{
            width: 72,
            height: 2,
            background:
              "linear-gradient(to right, transparent, #ffd700, transparent)",
            margin: "clamp(1rem, 2.5vw, 1.5rem) auto",
          }}
        />
      </Reveal>

      {/* ── subtext ── */}
      <Reveal delay={0.3}>
        <p
          style={{
            fontFamily: "'Oswald', sans-serif",
            fontWeight: 400,
            fontSize: "clamp(0.65rem, 1.4vw, 0.85rem)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            lineHeight: 2,
            color: "rgba(200,165,80,0.55)",
            textAlign: "center",
            maxWidth: 420,
            margin: "0 auto",
          }}
        >
          The committee hall you're looking for doesn't exist — or it may have
          been adjourned.{" "}
          <span style={{ color: "rgba(255,210,80,0.85)", fontWeight: 600 }}>
            Return to session.
          </span>
        </p>
      </Reveal>

      {/* ── buttons ── */}
      <Reveal delay={0.38}>
        <div
          style={{
            display: "flex",
            gap: 16,
            flexWrap: "wrap",
            justifyContent: "center",
            marginTop: "clamp(2rem, 4vw, 2.8rem)",
          }}
        >
          {/* primary */}
          <motion.button
            onClick={() => navigate("/")}
            style={{
              fontFamily: "'Oswald', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(0.6rem, 1.3vw, 0.75rem)",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#0a0700",
              background: "linear-gradient(135deg, #d4a820, #ffe040)",
              border: "none",
              padding: "clamp(0.9rem, 2vw, 1.1rem) clamp(2rem, 4vw, 2.8rem)",
              borderRadius: 9999,
              cursor: "pointer",
              boxShadow: "0 0 28px rgba(255,190,0,0.3)",
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 50px rgba(255,190,0,0.55)",
            }}
            whileTap={{ scale: 0.96 }}
          >
            Return Home
          </motion.button>

          {/* ghost */}
          <motion.button
            onClick={() => navigate(-1)}
            style={{
              fontFamily: "'Oswald', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(0.6rem, 1.3vw, 0.75rem)",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(255,210,80,0.8)",
              background: "transparent",
              border: "1px solid rgba(255,190,0,0.35)",
              padding: "clamp(0.9rem, 2vw, 1.1rem) clamp(2rem, 4vw, 2.8rem)",
              borderRadius: 9999,
              cursor: "pointer",
            }}
            whileHover={{
              scale: 1.05,
              borderColor: "rgba(255,190,0,0.75)",
              color: "#ffd700",
            }}
            whileTap={{ scale: 0.96 }}
          >
            Go Back
          </motion.button>
        </div>
      </Reveal>

      {/* ── bottom rule ── */}
      <Reveal delay={0.44}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginTop: "clamp(2.5rem, 6vw, 4rem)",
            width: "100%",
            maxWidth: 900,
          }}
        >
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
