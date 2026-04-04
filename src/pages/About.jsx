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

function StatCard({ num, label, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32, scale: 0.92 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, boxShadow: "0 0 60px rgba(255,190,0,0.18)" }}
      className="relative flex flex-col items-center justify-center gap-1 px-8 py-8 rounded-3xl cursor-default overflow-hidden flex-1 min-w-[110px]"
      style={{ background: "rgba(255,200,0,0.04)", border: "1px solid rgba(255,190,0,0.18)" }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, width: 36, height: 36, borderTop: "2px solid rgba(255,200,0,0.4)", borderLeft: "2px solid rgba(255,200,0,0.4)", borderRadius: "12px 0 0 0" }} />
      <div style={{ position: "absolute", bottom: 0, right: 0, width: 36, height: 36, borderBottom: "2px solid rgba(255,200,0,0.4)", borderRight: "2px solid rgba(255,200,0,0.4)", borderRadius: "0 0 12px 0" }} />
      <span
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(2.8rem, 7vw, 4.5rem)",
          lineHeight: 1,
          background: "linear-gradient(90deg, #ffd700, #f5a623, #c8790a, #f5a623, #ffd700)",
          backgroundSize: "300% auto",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          animation: "titleShimmer 4s linear infinite",
        }}
      >
        {num}
      </span>
      <span style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 500 }} className="text-[0.55rem] tracking-[0.2em] uppercase text-[rgba(255,210,80,0.5)]">
        {label}
      </span>
    </motion.div>
  );
}

export default function About({ onPopup }) {
  return (
    <section className="relative w-full overflow-hidden bg-[#0a0700]" style={{ padding: "clamp(4rem, 10vw, 8rem) 0" }}>

      {/* big faded background text */}
      <div
        aria-hidden
        style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(8rem, 28vw, 22rem)",
          lineHeight: 1,
          color: "rgba(255,180,0,0.03)",
          whiteSpace: "nowrap",
          pointerEvents: "none",
          userSelect: "none",
          letterSpacing: "0.05em",
        }}
      >
        AON 2026
      </div>

      {/* top rule */}
      <Reveal delay={0}>
        <div className="flex items-center gap-4 px-6 lg:px-[8vw] mb-12">
          <div style={{ flex: 1, height: 1, background: "linear-gradient(to right, transparent, rgba(255,190,0,0.25))" }} />
          <span style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600, fontSize: "0.6rem", letterSpacing: "0.3em", color: "rgba(255,200,60,0.4)", textTransform: "uppercase" }}>
            Assembly Of Nations · 2026
          </span>
          <div style={{ flex: 1, height: 1, background: "linear-gradient(to left, transparent, rgba(255,190,0,0.25))" }} />
        </div>
      </Reveal>

      <div className="relative z-10 w-full px-6 lg:px-[8vw]">

        {/* headline */}
        <Reveal delay={0.05}>
          <div className="mb-8">
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(5rem, 18vw, 14rem)", lineHeight: 0.88, letterSpacing: "0.02em" }}>
              <span style={{ color: "#fff", display: "block" }}>WE ARE</span>
              <span style={{ display: "block", background: "linear-gradient(90deg, #ffd700, #f5a623, #c8790a, #f5a623, #ffd700)", backgroundSize: "300% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", animation: "titleShimmer 4s linear infinite" }}>
                BACK
              </span>
            </h2>
          </div>
        </Reveal>

        {/* body + stats */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 lg:items-end mb-12">
          <Reveal delay={0.12}>
            <div style={{ maxWidth: 520 }}>
              <p style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 400, fontSize: "clamp(0.75rem, 1.6vw, 1rem)", letterSpacing: "0.08em", textTransform: "uppercase", lineHeight: 2, color: "rgba(200,165,80,0.6)" }}>
                CBS AON returns for its{" "}
                <span style={{ color: "rgba(255,210,80,0.9)", fontWeight: 600 }}>6th edition</span>{" "}
                — bringing powerful committees, dynamic debates, and the same relentless passion for diplomacy that has defined every year before it.
              </p>
              <div style={{ width: 60, height: 2, background: "linear-gradient(to right, #ffd700, transparent)", marginTop: "1.5rem" }} />
            </div>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="flex gap-3 lg:gap-4">
              <StatCard num="6TH" label="Edition" delay={0.2} />
              <StatCard num="2" label="Days" delay={0.26} />
              <StatCard num="3" label="Committees" delay={0.32} />
            </div>
          </Reveal>
        </div>

        {/* buttons */}
        <Reveal delay={0.22}>
          <div className="flex gap-4 flex-wrap">
            <motion.button
              onClick={() => onPopup("cbs")}
              style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "clamp(0.65rem, 1.4vw, 0.8rem)", letterSpacing: "0.18em" }}
              className="uppercase text-[#0a0700] bg-gradient-to-br from-[#d4a820] to-[#ffe040] px-10 py-4 rounded-full cursor-pointer border-none shadow-[0_0_30px_rgba(255,190,0,0.3)]"
              whileHover={{ scale: 1.04, boxShadow: "0 0 50px rgba(255,190,0,0.55)" }}
              whileTap={{ scale: 0.96 }}
            >
              About CBS
            </motion.button>
            <motion.button
              onClick={() => onPopup("aon")}
              style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "clamp(0.65rem, 1.4vw, 0.8rem)", letterSpacing: "0.18em" }}
              className="uppercase bg-transparent text-[rgba(255,210,80,0.8)] border border-[rgba(255,190,0,0.35)] px-10 py-4 rounded-full cursor-pointer"
              whileHover={{ scale: 1.04, borderColor: "rgba(255,190,0,0.75)", color: "#ffd700" }}
              whileTap={{ scale: 0.96 }}
            >
              About AON
            </motion.button>
          </div>
        </Reveal>
      </div>

      {/* bottom rule */}
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
