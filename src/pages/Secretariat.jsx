import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

/* ─── Responsive hook ─── */
function useIsMobile(breakpoint = 600) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < breakpoint : false,
  );
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const handler = (e) => setIsMobile(e.matches);
    setIsMobile(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [breakpoint]);
  return isMobile;
}

/* ─── Reveal ─── */
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

/* ─── GOLD shimmer style ─── */
const SHIMMER = {
  background:
    "linear-gradient(90deg, #ffd700, #f5a623, #c8790a, #f5a623, #ffd700)",
  backgroundSize: "300% auto",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  animation: "titleShimmer 4s linear infinite",
};

/* ─── Avatar helper ─── */
function Avatar({ name, photo, size = 64, ring = true, style = {} }) {
  if (!name) return null;
  const src = photo
    ? photo
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=1a1200&color=c8a44a&size=${size * 2}&bold=true&font-size=0.38`;
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        flexShrink: 0,
        position: "relative",
        ...style,
      }}
    >
      {ring && (
        <div
          style={{
            position: "absolute",
            inset: -2,
            borderRadius: "50%",
            background:
              "linear-gradient(135deg, rgba(255,215,0,0.55) 0%, rgba(200,121,10,0.2) 50%, rgba(255,215,0,0.55) 100%)",
            zIndex: 0,
          }}
        />
      )}
      <img
        src={src}
        alt={name}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          objectFit: "cover",
          position: "relative",
          zIndex: 1,
          border: "2px solid #0a0700",
          display: "block",
        }}
      />
    </div>
  );
}

/* ─── Bio Modal ─── */
function BioModal({ person, onClose }) {
  const isMobile = useIsMobile();
  return (
    <AnimatePresence>
      {person && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            background: "rgba(0,0,0,0.88)",
            backdropFilter: "blur(10px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
        >
          <motion.div
            initial={{ scale: 0.88, opacity: 0, y: 32 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 16 }}
            transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.45 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#0d0a02",
              border: "1px solid rgba(255,190,0,0.2)",
              borderRadius: 24,
              padding: isMobile ? "1.6rem" : "2.5rem",
              maxWidth: 460,
              width: "100%",
              position: "relative",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: 40,
                height: 40,
                borderTop: "2px solid rgba(255,200,0,0.45)",
                borderLeft: "2px solid rgba(255,200,0,0.45)",
                borderRadius: "12px 0 0 0",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                width: 40,
                height: 40,
                borderBottom: "2px solid rgba(255,200,0,0.45)",
                borderRight: "2px solid rgba(255,200,0,0.45)",
                borderRadius: "0 0 12px 0",
              }}
            />

            {/* Modal avatar */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1.2rem",
                marginBottom: "1.6rem",
              }}
            >
              <Avatar name={person.name} photo={person.photo} size={72} />
              <div>
                <p
                  style={{
                    fontFamily: "'Oswald', sans-serif",
                    fontSize: "0.52rem",
                    letterSpacing: "0.32em",
                    color: "rgba(255,200,60,0.38)",
                    textTransform: "uppercase",
                    margin: "0 0 0.35rem",
                  }}
                >
                  {person.role}
                </p>
                <h3
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: isMobile ? "1.7rem" : "2.2rem",
                    color: "#fff",
                    lineHeight: 1,
                    margin: 0,
                  }}
                >
                  {person.name || "TBD"}
                </h3>
                {person.grade && (
                  <p
                    style={{
                      fontFamily: "'Oswald', sans-serif",
                      fontSize: "0.65rem",
                      color: "rgba(255,190,0,0.45)",
                      letterSpacing: "0.15em",
                      margin: "0.25rem 0 0",
                    }}
                  >
                    {person.grade}
                  </p>
                )}
              </div>
            </div>

            <p
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontWeight: 400,
                fontSize: "0.85rem",
                color: "rgba(200,165,80,0.65)",
                lineHeight: 1.95,
                letterSpacing: "0.04em",
              }}
            >
              {person.bio || "Bio coming soon."}
            </p>
            <motion.button
              onClick={onClose}
              style={{
                marginTop: "2rem",
                fontFamily: "'Oswald', sans-serif",
                fontWeight: 700,
                fontSize: "0.6rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                background: "transparent",
                border: "1px solid rgba(255,190,0,0.28)",
                color: "rgba(255,200,60,0.65)",
                borderRadius: 999,
                padding: "0.6rem 2rem",
                cursor: "pointer",
              }}
              whileHover={{
                borderColor: "rgba(255,190,0,0.7)",
                color: "#ffd700",
              }}
              whileTap={{ scale: 0.96 }}
            >
              Close
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── SECRETARIAT FEATURED CARD (SG / DSG) ─── */
function FeaturedCard({ person, index, onBio }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const isSG = index === 0;
  const isMobile = useIsMobile();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -6, boxShadow: "0 0 70px rgba(255,190,0,0.12)" }}
      style={{
        position: "relative",
        background: isSG ? "rgba(255,200,0,0.055)" : "rgba(255,200,0,0.025)",
        border: `1px solid rgba(255,190,0,${isSG ? 0.28 : 0.12})`,
        borderRadius: 20,
        padding: "2.2rem 2rem",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        cursor: "default",
      }}
    >
      {/* number watermark */}
      <span
        aria-hidden
        style={{
          position: "absolute",
          bottom: "-0.5rem",
          right: "1rem",
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "6rem",
          lineHeight: 1,
          color: "rgba(255,190,0,0.04)",
          userSelect: "none",
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 32,
          height: 32,
          borderTop: `1.5px solid rgba(255,200,0,${isSG ? 0.5 : 0.3})`,
          borderLeft: `1.5px solid rgba(255,200,0,${isSG ? 0.5 : 0.3})`,
          borderRadius: "8px 0 0 0",
        }}
      />

      {/* Avatar */}
      <div style={{ marginBottom: "1.4rem" }}>
        <Avatar name={person.name} photo={person.photo} size={isSG ? 80 : 68} />
      </div>

      <span
        style={{
          fontFamily: "'Oswald', sans-serif",
          fontSize: "0.5rem",
          letterSpacing: "0.3em",
          color: "rgba(255,200,60,0.4)",
          textTransform: "uppercase",
          marginBottom: "0.6rem",
        }}
      >
        {person.role}
      </span>
      <span
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: isSG
            ? isMobile
              ? "1.9rem"
              : "2.4rem"
            : isMobile
              ? "1.6rem"
              : "2rem",
          color: "#fff",
          lineHeight: 1,
          marginBottom: "0.3rem",
        }}
      >
        {person.name}
      </span>
      {person.grade && (
        <span
          style={{
            fontFamily: "'Oswald', sans-serif",
            fontSize: "0.62rem",
            color: "rgba(255,190,0,0.45)",
            letterSpacing: "0.14em",
          }}
        >
          {person.grade}
        </span>
      )}
      <div style={{ flex: 1 }} />
      <motion.button
        onClick={() => onBio(person)}
        style={{
          marginTop: "1.4rem",
          fontFamily: "'Oswald', sans-serif",
          fontWeight: 600,
          fontSize: "0.5rem",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          background: "transparent",
          border: "1px solid rgba(255,190,0,0.22)",
          color: "rgba(255,200,60,0.5)",
          borderRadius: 999,
          padding: "0.5rem 1.3rem",
          cursor: "pointer",
          alignSelf: "flex-start",
        }}
        whileHover={{
          borderColor: "rgba(255,190,0,0.65)",
          color: "#ffd700",
          scale: 1.03,
        }}
        whileTap={{ scale: 0.97 }}
      >
        Read Bio →
      </motion.button>
    </motion.div>
  );
}

/* ─── SECRETARIAT USG ROW CARD ─── */
function UsgCard({ person, index, onBio }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });
  const isMobile = useIsMobile();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: 0.55,
        delay: index * 0.07,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ x: isMobile ? 0 : 6, borderColor: "rgba(255,190,0,0.28)" }}
      style={{
        display: "flex",
        alignItems: isMobile ? "flex-start" : "center",
        flexWrap: "wrap",
        gap: "1rem",
        padding: "1rem 1.4rem",
        background: "rgba(255,200,0,0.02)",
        border: "1px solid rgba(255,190,0,0.1)",
        borderRadius: 14,
        cursor: "default",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          top: "20%",
          height: "60%",
          width: 2,
          background: "rgba(255,190,0,0.25)",
          borderRadius: 2,
        }}
      />

      {/* Avatar */}
      <Avatar name={person.name} photo={person.photo} size={48} />

      <div style={{ flex: 1, minWidth: 0 }}>
        <p
          style={{
            fontFamily: "'Oswald', sans-serif",
            fontSize: "0.48rem",
            letterSpacing: "0.28em",
            color: "rgba(255,200,60,0.38)",
            textTransform: "uppercase",
            margin: 0,
          }}
        >
          {person.role}
        </p>
        <p
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "1.4rem",
            color: "#fff",
            lineHeight: 1.05,
            margin: "0.15rem 0 0",
          }}
        >
          {person.name}
        </p>
        {person.grade && (
          <p
            style={{
              fontFamily: "'Oswald', sans-serif",
              fontSize: "0.58rem",
              color: "rgba(255,190,0,0.38)",
              letterSpacing: "0.12em",
              margin: "0.15rem 0 0",
            }}
          >
            {person.grade}
          </p>
        )}
      </div>

      <motion.button
        onClick={() => onBio(person)}
        style={{
          fontFamily: "'Oswald', sans-serif",
          fontWeight: 600,
          fontSize: "0.48rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          background: "transparent",
          border: "1px solid rgba(255,190,0,0.18)",
          color: "rgba(255,200,60,0.45)",
          borderRadius: 999,
          padding: "0.45rem 1rem",
          cursor: "pointer",
          whiteSpace: "nowrap",
          flexShrink: isMobile ? 1 : 0,
          width: isMobile ? "100%" : "auto",
          marginLeft: isMobile ? "3.2rem" : 0,
        }}
        whileHover={{
          borderColor: "rgba(255,190,0,0.6)",
          color: "#ffd700",
          scale: 1.04,
        }}
        whileTap={{ scale: 0.97 }}
      >
        Bio →
      </motion.button>
    </motion.div>
  );
}

/* ─── CHAIR HERO CARD — full width strip ─── */
function ChairCard({ person, onBio }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });
  const isEmpty = !person.name;
  const isMobile = useIsMobile();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={isEmpty ? {} : { boxShadow: "0 0 80px rgba(255,190,0,0.12)" }}
      style={{
        position: "relative",
        width: "100%",
        background: "rgba(255,200,0,0.05)",
        border: "1px solid rgba(255,190,0,0.2)",
        borderRadius: 18,
        padding: isMobile ? "1.4rem 1.6rem" : "2rem 2.4rem",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: isMobile ? "flex-start" : "center",
        gap: isMobile ? "1rem" : "2rem",
        overflow: "hidden",
        opacity: isEmpty ? 0.4 : 1,
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 28,
          height: 28,
          borderTop: "1.5px solid rgba(255,200,0,0.45)",
          borderLeft: "1.5px solid rgba(255,200,0,0.45)",
          borderRadius: "8px 0 0 0",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: 28,
          height: 28,
          borderBottom: "1.5px solid rgba(255,200,0,0.45)",
          borderRight: "1.5px solid rgba(255,200,0,0.45)",
          borderRadius: "0 0 8px 0",
        }}
      />
      <span
        aria-hidden
        style={{
          position: "absolute",
          right: "1.5rem",
          top: "50%",
          transform: "translateY(-50%)",
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "5rem",
          lineHeight: 1,
          color: "rgba(255,190,0,0.04)",
          userSelect: "none",
          pointerEvents: "none",
          whiteSpace: "nowrap",
          display: isMobile ? "none" : "block",
        }}
      >
        Chairperson
      </span>

      {/* Avatar — only if named */}
      {!isEmpty && (
        <Avatar
          name={person.name}
          photo={person.photo}
          size={isMobile ? 64 : 80}
        />
      )}

      <div style={{ flex: 1 }}>
        <span
          style={{
            fontFamily: "'Oswald', sans-serif",
            fontSize: "0.5rem",
            letterSpacing: "0.3em",
            color: "rgba(255,210,80,0.55)",
            textTransform: "uppercase",
            display: "block",
            marginBottom: "0.4rem",
          }}
        >
          Chairperson
        </span>
        <span
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: isMobile
              ? "clamp(1.8rem, 7vw, 2.4rem)"
              : "clamp(2rem, 5vw, 3rem)",
            color: isEmpty ? "rgba(255,255,255,0.18)" : "#fff",
            lineHeight: 1,
            display: "block",
          }}
        >
          {person.name || "To Be Announced"}
        </span>
        {person.grade && (
          <span
            style={{
              fontFamily: "'Oswald', sans-serif",
              fontSize: "0.6rem",
              color: "rgba(255,190,0,0.45)",
              letterSpacing: "0.12em",
              display: "block",
              marginTop: "0.3rem",
            }}
          >
            {person.grade}
          </span>
        )}
      </div>

      {!isEmpty && (
        <motion.button
          onClick={() => onBio(person)}
          style={{
            fontFamily: "'Oswald', sans-serif",
            fontWeight: 600,
            fontSize: "0.52rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            background: "transparent",
            border: "1px solid rgba(255,190,0,0.25)",
            color: "rgba(255,200,60,0.55)",
            borderRadius: 999,
            padding: "0.6rem 1.6rem",
            cursor: "pointer",
            flexShrink: 0,
            width: isMobile ? "100%" : "auto",
          }}
          whileHover={{
            borderColor: "rgba(255,190,0,0.7)",
            color: "#ffd700",
            scale: 1.03,
          }}
          whileTap={{ scale: 0.97 }}
        >
          Read Bio →
        </motion.button>
      )}
    </motion.div>
  );
}

/* ─── DAIS MEMBER CARD ─── */
function DaisCard({ person, index, onBio }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });
  const isEmpty = !person.name;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: index * 0.07,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={
        isEmpty ? {} : { y: -5, boxShadow: "0 0 40px rgba(255,190,0,0.09)" }
      }
      style={{
        position: "relative",
        padding: "1.4rem 1.3rem",
        background: "rgba(255,200,0,0.02)",
        border: "1px solid rgba(255,190,0,0.1)",
        borderRadius: 16,
        display: "flex",
        flexDirection: "column",
        gap: "0.22rem",
        opacity: isEmpty ? 0.38 : 1,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          top: "18%",
          height: "64%",
          width: 2,
          background: "rgba(255,190,0,0.18)",
          borderRadius: 2,
        }}
      />

      {/* Avatar — only when named */}
      {!isEmpty && (
        <div style={{ marginBottom: "0.9rem" }}>
          <Avatar name={person.name} photo={person.photo} size={52} />
        </div>
      )}

      <span
        style={{
          fontFamily: "'Oswald', sans-serif",
          fontSize: "0.46rem",
          letterSpacing: "0.26em",
          color: "rgba(255,200,60,0.38)",
          textTransform: "uppercase",
        }}
      >
        {person.role}
      </span>
      <span
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "1.35rem",
          color: isEmpty ? "rgba(255,255,255,0.15)" : "#fff",
          lineHeight: 1,
        }}
      >
        {person.name || "To Be Announced"}
      </span>
      {person.grade && (
        <span
          style={{
            fontFamily: "'Oswald', sans-serif",
            fontSize: "0.54rem",
            color: "rgba(255,190,0,0.35)",
            letterSpacing: "0.1em",
          }}
        >
          {person.grade}
        </span>
      )}
      {!isEmpty && (
        <motion.button
          onClick={() => onBio(person)}
          style={{
            marginTop: "0.8rem",
            fontFamily: "'Oswald', sans-serif",
            fontWeight: 600,
            fontSize: "0.45rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            background: "transparent",
            border: "1px solid rgba(255,190,0,0.16)",
            color: "rgba(255,200,60,0.4)",
            borderRadius: 999,
            padding: "0.4rem 1rem",
            cursor: "pointer",
            alignSelf: "flex-start",
          }}
          whileHover={{
            borderColor: "rgba(255,190,0,0.6)",
            color: "#ffd700",
            scale: 1.03,
          }}
          whileTap={{ scale: 0.97 }}
        >
          Bio →
        </motion.button>
      )}
    </motion.div>
  );
}

/* ─── COMMITTEE BLOCK ─── */
function CommitteeBlock({ committee, index, onBio }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const chair = committee.members.find((m) => m.role === "Chairperson");
  const rest = committee.members.filter((m) => m.role !== "Chairperson");

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
      style={{
        marginBottom: "4.5rem",
        paddingBottom: "4.5rem",
        borderBottom: "1px solid rgba(255,190,0,0.07)",
      }}
    >
      {/* Committee header */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "1.5rem",
          marginBottom: "2rem",
          flexWrap: "wrap",
        }}
      >
        <span
          aria-hidden
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(4rem, 10vw, 7rem)",
            lineHeight: 1,
            color: "rgba(255,190,0,0.1)",
            flexShrink: 0,
            letterSpacing: "-0.02em",
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <div style={{ flex: 1, minWidth: 240, paddingTop: "0.4rem" }}>
          <span
            style={{
              fontFamily: "'Oswald', sans-serif",
              fontSize: "0.52rem",
              letterSpacing: "0.28em",
              color: "rgba(255,200,60,0.38)",
              textTransform: "uppercase",
              display: "block",
              marginBottom: "0.4rem",
            }}
          >
            {committee.type}
          </span>
          <h3
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(1.9rem, 5vw, 3.2rem)",
              color: "#fff",
              lineHeight: 0.95,
              margin: "0 0 0.4rem",
            }}
          >
            {committee.name}
          </h3>
          <span
            style={{
              fontFamily: "'Oswald', sans-serif",
              fontSize: "0.6rem",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              ...SHIMMER,
            }}
          >
            {committee.abbr}
          </span>
          {committee.agenda && (
            <p
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontWeight: 400,
                fontSize: "0.68rem",
                color: "rgba(200,165,80,0.5)",
                letterSpacing: "0.05em",
                marginTop: "0.8rem",
                maxWidth: 620,
                lineHeight: 1.85,
              }}
            >
              <span style={{ color: "rgba(255,200,60,0.4)", fontWeight: 600 }}>
                Agenda —{" "}
              </span>
              {committee.agenda}
            </p>
          )}
        </div>
      </div>

      {/* Chair — full width hero strip */}
      {chair && (
        <div style={{ marginBottom: "0.75rem" }}>
          <ChairCard person={chair} onBio={onBio} />
        </div>
      )}

      {/* Rest of dais — only show if there are visible members */}
      {rest.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(auto-fit, minmax(min(160px, 100%), 1fr))`,
            gap: "0.75rem",
          }}
        >
          {rest.map((m, i) => (
            <DaisCard key={i} person={m} index={i} onBio={onBio} />
          ))}
        </div>
      )}
    </motion.div>
  );
}

/* ─── DATA ─── */
const SECRETARIAT_TOP = [
  {
    name: "Chirag Chopra",
    photo: "pictures/Chirag.jpg",
    grade: "XII C",
    role: "Secretary General",
    bio: 'The man, the myth, the legend. Chirag chopra. Keyword here- he’s 6 feet tall. Chirag isn’t your typical Secretary General, he\'s a true patriot advocating for the freedom of the northeast. He’s the rare mix of diplomat, athlete, and full-time overachiever, having bagged Honorable Mentions across SMUN, AIPPM, DISEC, and even the Westphalia Congress, while also leading from the front on the basketball court with podium finishes at Bosco Utsav. True to his Marwari roots, our 182.88cm jock simply cannot be confined to commitee rooms. Whether it’s making strategic calls in stock simulations or leading from the front on the basketball court with podium finishes, he carries the same instinct everywhere—to compete, to adapt, and to win. What truly sets him apart, though, is his confidence—the kind that would make  Harvey Specter from "Suits" proud. So as we welcome our Secretary General, remember you’re not just looking at a leader or a speaker, but a personality who operates at a different level—quite literally… because he’s 6 feet tall. Oh almost forgot to mention he’s 6 feet, write that down. ',
  },
  {
    name: "Aksh Baroi",
    photo: "pictures/Aksh.jpg",
    grade: "XI H",
    role: "Deputy Secretary General",
    bio: "We present to you Aksh Baroi, the Deputy Secretary General—the man who has explored almost every committee out there, from UNSC to UNGA to crisis committees like NATO and war cabinets, just to keep things interesting. With multiple 2nd place finishes and a verbal mention at the high stakes BESCAON under his belt, Aksh clearly knows what he’s doing… even if his expressions sometimes suggest otherwise. A future diplomat with a strong interest in international relations, he handles pressure well—until the mood swings kick in and suddenly the committee has two crises to deal with. Known among his friends for being extremely approachable (which is a polite way of saying he gets harassed a lot), Aksh somehow manages to be the centre of every joke while still getting the work done. Despite the constant leg-pulling, unpredictable moods, and chaotic energy around him, one thing is certain: if there’s responsibility to be handled, Aksh will be there… probably getting teased while doing it. ",
  },
];

const SECRETARIAT_USG = [
  {
    name: "Agneya Goswami",
    photo: "pictures/Agneya.jpg",
    grade: "X D",
    role: "USG — Delegate Affairs",
    bio: 'Meet Agneya Goswami, the Head of Delegate Affairs—the man who ensures every delegate is guided, every issue is handled, and somehow manages to be online 24×7 as if he doesn\'t have boards in 200ish days. From winning Best Delegate in his very first MUN representing Russia to thriving in high-pressure crisis committees, Agneya handles, or rather, intimidates chaos with his 120 decibel voice. A truly performative personality who manages to sneak in some "Dostoevsky" time between managing delegates, he also is quite passionate about his club Barca. However, let’s be honest—his real expertise lies in networking. Agneya doesn’t just make friends, he specializes in them… the opposite gender a bit too much for his own good. Dependable, but with far more “contacts” than required, he has a unique talent for leaving a lasting impression—especially in the delegate affairs department. Safe to say, when it comes to managing people… Agneya takes the role very seriously. ',
  },
  {
    name: "Raahil Masud",
    photo: "pictures/Raahil.jpg",
    grade: "XI H",
    role: "USG — Publications",
    bio: "Finally Raahil Masud, the Head of USG Publications—the man responsible for writing the descriptions, the captions, the chair introductions, the secretariat bios, and basically every paragraph you’ve read so far and thought, “that actually sounds decent.” A seasoned debater with achievements ranging from ICSE debates to making the finals of the Clifford Hicks International Debate out of 80 schools, along with appearances at the Farida Abraham Debate at LMGC Lucknow, Raahil clearly enjoys arguing professionally. As Vice President of the Student Council, he somehow balances leadership, debating, publications, and working out—because apparently public speaking alone wasn’t enough suffering. But despite all the writing skills and achievements, there remains one issue he still hasn’t recovered from: his secretariat photo. According to him, it looks absolutely nothing like him, and he has spent an unreasonable amount of time reminding people of that fact. So if you see him staring at the posts with mild disappointment, don’t worry—it’s not the write-up he’s judging, it’s the photography. ",
  },
  {
    name: "Ahaan Mohalanobis",
    photo: "pictures/Ahaan.jpg",
    grade: "XII C",
    role: "USG — Tech",
    bio: 'Ahaan Mohalanobis, the Head of USG Tech—the man behind the Instagram posts, the edits, and basically anything that makes this MUN look cooler than it actually is. If you’ve seen a clean post or a smooth edit, chances are Ahaan has already spent hours perfecting it… probably while wearing his "₹450 Chrome hearts glasses" although he faces no optic issues whatsoever. When he’s not busy managing the digital side of things, you’ll find him on the basketball court, where he’s just as sharp and reliable.....or on the commode (a topic which we shall not delve into further). Despite that, he shows up, delivers, and keeps everything running smoothly, proving that whether it’s posts, plays, or problems… Ahaan always handles it (eventually). ',
  },
  {
    name: "Naitik Agarwal",
    photo: "pictures/Naitik.jpg",
    grade: "XII C",
    role: "USG — Finance",
    bio: "The man who makes sure the numbers add up, the budgets make sense, and no one accidentally spends the entire MUN fund on \"necessary expenses.\" A commerce student with a natural grip on accounts, Naitik is the kind of person who actually enjoys balance sheets and probably trusts Excel more than people. Having been part of AON last year, he knows how things work behind the scenes — which means if there's money involved, he's already three steps ahead. Calm, practical, and quietly efficient, he doesn't say much — but when he does, it's usually something financially responsible. Because while everyone else is busy debating policies, Naitik is busy making sure the conference doesn't go bankrupt.",
  },
];

const COMMITTEES = [
  {
    name: "UN General Assembly Special, Political And Decolonization Committee",
    abbr: "UNGA – SPECPOL",
    type: "General Assembly · Double Delegation",
    agenda:
      "Establishing legal barriers against the placement of weapons in orbit and the terrestrial targeting of satellite networks.",
    members: [
      {
        name: "Agnitra Saha",
        photo: "pictures/Agnitra.jpg",
        grade: "XII C",
        role: "Chairperson",
        bio: "Agnitra Saha is a CBS alumnus of batch 2020, currently a final year Masters student in International Studies from Christ University, Bangalore, actively interested in on-ground state and national politics. Having served as Deputy Secretary General of CBSAON '19, he considers this a homecoming. One of the better-known faces in the circuit, he has been associated with an extensive number of MUNs, debates, and write-up competitions for almost a decade. He holds a special interest in International Relations, with academic focus on social movements, international humanitarian covenants, and Track II Diplomacy — fields he believes make the world a better place.",
      },
      {
        name: "Chirag Chopra",
        photo: "pictures/Chirag.jpg",
        grade: "XII C",
        role: "Vice Chairperson",
        bio: 'The man, the myth, the legend. Chirag chopra. Keyword here- he’s 6 feet tall. Chirag isn’t your typical Secretary General, he\'s a true patriot advocating for the freedom of the northeast. He’s the rare mix of diplomat, athlete, and full-time overachiever, having bagged Honorable Mentions across SMUN, AIPPM, DISEC, and even the Westphalia Congress, while also leading from the front on the basketball court with podium finishes at Bosco Utsav. True to his Marwari roots, our 182.88cm jock simply cannot be confined to commitee rooms. Whether it’s making strategic calls in stock simulations or leading from the front on the basketball court with podium finishes, he carries the same instinct everywhere—to compete, to adapt, and to win. What truly sets him apart, though, is his confidence—the kind that would make  Harvey Specter from "Suits" proud. So as we welcome our Secretary General, remember you’re not just looking at a leader or a speaker, but a personality who operates at a different level—quite literally… because he’s 6 feet tall. Oh almost forgot to mention he’s 6 feet, write that down. ',
      },
      {
        name: "Adish Datta",
        photo: "pictures/Adish.jpg",
        grade: "XII C",
        role: "Co-Vice Chairperson",
        bio: "Adish is an active debater and a member of the drama society, so speaking a lot (with confidence) comes quite naturally to him. With 10+ MUNs under his belt, his journey had a proper “main character moment” with a Special Mention at RCFOD representing Germany, after which the awards decided to stay. He has a soft spot for slightly unconventional country allocations like Nauru and Nicaragua, mainly because of his interest in the Global South. Three Special Mentions as Nicaragua and Nauru are his way of proving that point, but he’s also managed to secure a Best Delegate representing France, showing he’s just as comfortable handling Western narratives when needed.",
      },
      { name: "", photo: "", grade: "", role: "Rapporteur", bio: "" },
      { name: "", photo: "", grade: "", role: "Tech", bio: "" },
    ],
  },
  {
    name: "United Nations Security Council",
    abbr: "UNSC",
    type: "Security Council · Single Delegation",
    agenda: "The situation in the Middle East.",
    members: [
      {
        name: "Diptesh Banerjee",
        photo: "pictures/Diptesh.jpeg",
        grade: "",
        role: "Chairperson",
        bio: "Diptesh Banerjee is a distinguished MUNer, debater, and student leader from the Indian Institute of Technology Gandhinagar, currently serving as the Convener of the Jadavpur University Debating Society. With extensive experience as both a delegate and Executive Board member across premier conferences nationwide, he brings a dynamic blend of diplomacy, analytical thinking, and leadership to the committee.",
      },
      {
        name: "Soumyadeep Dev",
        photo: "pictures/Soumyadeep.jpg",
        grade: "XIII H",
        role: "Vice Chairperson",
        bio: "",
      },
      { name: "", photo: "", grade: "", role: "Rapporteur", bio: "" },
      { name: "", photo: "", grade: "", role: "Tech", bio: "" },
    ],
  },
  {
    name: "United Nations Human Rights Council",
    abbr: "UNHRC",
    type: "Human Rights Body · Double Delegation",
    agenda:
      "The promotion and protection of all human rights: Ensuring the accountability of state actors for the safeguarding of civilian life and fundamental freedoms in zones of active military escalation.",
    members: [
      {
        name: "Swapnaneel Datta",
        photo: "pictures/Swapnaneel.jpg",
        grade: "",
        role: "Chairperson",
        bio: "Currently pursuing his undergrad at the Department of International Relations, Jadavpur University, Swapnaneel began his MUN journey in 2021. Over the course of half a decade he has won and chaired conferences across leading institutions in the country. Associated with a policy-oriented think tank based in New Delhi, he previously had the opportunity to engage with notable UN agencies such as the UNDP — an experience that deepened his passion for studying the Anthropocene and peacebuilding. Beyond his interests in teaching and writing, he sincerely believes in upholding the importance of academia within the sphere of academic simulations, and looks forward to guiding individuals who wish to walk down similar lines.",
      },
      {
        name: "Adrish Hossain",
        photo: "pictures/Adrish.jpg",
        grade: "XIII H",
        role: "Vice Chairperson",
        bio: "Adrish Hossain's presence in the MUN circuit stands out, with his interest lying in security committees. As a national-level debater, he agrees that MUNs are valuable spaces to learn and grow, but strives for academic progress above all. He refrains from calling MUNs his life, holding instead that humility, respect, and consistency in the spirit of learning matter most — making it an academic simulation in its true essence. He believes that to be a better delegate, one must first strive to be a better person. Outside of MUNs, Adrish is a Humanities student with a keen interest in economics and international relations, and a devoted Bayern Munich fan — a calm contender despite his years.",
      },
      {
        name: "Aksh Baroi",
        photo: "pictures/Aksh.jpg",
        grade: "XII H",
        role: "Co-Vice Chairperson",
        bio: "The man who has explored almost every committee out there — from UNSC to UNGA to crisis committees like NATO and war cabinets, just to keep things interesting. With a Best Delegate award, multiple 2nd place finishes, and a special mention at the high-stakes JUMUN under his belt, Aksh clearly knows what he's doing… even if his expressions sometimes suggest otherwise. A future diplomat with a strong interest in international relations and a loyal supporter of Real Madrid, he handles pressure well. Despite the constant leg-pulling, unpredictable moods, and chaotic energy around him, one thing is certain: if there's responsibility to be handled, Aksh will be there — probably getting teased while doing it.",
      },
      { name: "", photo: "", grade: "", role: "Rapporteur", bio: "" },
      { name: "", photo: "", grade: "", role: "Tech", bio: "" },
    ],
  },
  {
    name: "United Nations Special Committee on Peacekeeping Operations",
    abbr: "C-34",
    type: "Special Committee · Single Delegation",
    agenda:
      "Strategies for the transition of United Nations peacekeeping operations to a sustainable peacebuilding presence.",
    members: [
      {
        name: "Parthiv Mukherjee",
        photo: "pictures/Parthiv.jpg",
        grade: "",
        role: "Chairperson",
        bio: "A seasoned public speaker and strategist, Parthiv currently works as a consultant in Bangalore, bringing sharp analytical and negotiation skills to the corporate forefront. An alumnus of Scottish Church College with a degree in Economics, he is also a proud graduate of Calcutta Boys' School (Class of 2021) — where his MUN journey began in Grade 9. With over 8 years of experience and participation in 100+ public speaking competitions as both delegate and judge, he has made his mark across MUN conferences, parliamentary debates, and conventional debating platforms. He passionately believes that everyone has a debater within, and actively encourages individuals to embrace the art of public speaking. Deeply invested in business and economic affairs, Parthiv aspires to revolutionize the corporate realm through strategic ideation, negotiation, and diplomacy.",
      },
      {
        name: "Neil Joseph Chakraborty",
        photo: "pictures/Neil.jpg",
        grade: "",
        role: "Vice Chairperson",
        bio: "Neil is an alumnus of Calcutta Boys' School (ISC Batch of 2025) and is currently a second-year law student at National Law University Odisha. With over two years of active experience in the MUN circuit, he has participated in numerous MUN and moot court conferences, consistently demonstrating strong analytical ability, diplomacy, and leadership. Passionate about public speaking and international affairs, Neil brings professionalism, enthusiasm, and a collaborative spirit to every committee he engages with.",
      },
      { name: "", photo: "", grade: "", role: "Rapporteur", bio: "" },
      { name: "", photo: "", grade: "", role: "Tech", bio: "" },
    ],
  },
  {
    name: "Group of Twenty",
    abbr: "G20",
    type: "Economic Forum · Single Delegation",
    agenda:
      "International Economic Cooperation: Assessing the impact of regional instability on global energy security, supply chain resilience, and macro-economic stability.",
    members: [
      {
        name: "Mallar Mitra",
        photo: "pictures/Mallar.jpg",
        grade: "",
        role: "Chairperson",
        bio: "Mallar is a lawyer and alumnus of the National University of Juridical Sciences, and of Calcutta Boys' School (ISC 2021). A seasoned public speaker with over a decade of experience, he has won numerous accolades at diverse public speaking events — including international moot court and negotiation competitions, debates, and MUN conferences. He has also coached participating teams and served as a judge at several international and national-level competitions. He looks forward to returning to his alma mater and nurturing the next generation of changemakers.",
      },
      {
        name: "Kinshuk Trivedi",
        photo: "pictures/Kinshuk.jpg",
        grade: "XIII H",
        role: "Vice Chairperson",
        bio: 'Kinshuk Trivedi, his interest lies in research and especially link of every problem to the Global South. He is a burgeoning MUN and Moot Court enthusiast but has been lately working on his "academics" rather than "academic simulations" for what he calls is his "greater purpose". He emphasises on learning from our own mistakes whether it be an academic simulation or your own life and the type of guy who would joke about your insecurities while at the same time would provide the best 3 AM therapy even when he is half asleep. He is a dedicated CSK and Barcelona fan and has that calm and composure even everything in the background is just his life, exploding. And yet again he does it for the laughing emoji.',
      },
      {
        name: "Agneya Goswami",
        photo: "pictures/Agneya.jpg",
        grade: "X D",
        role: "Co-Vice Chairperson",
        bio: 'Meet Agneya Goswami, the Head of Delegate Affairs—the man who ensures every delegate is guided, every issue is handled, and somehow manages to be online 24×7 as if he doesn\'t have boards in 200ish days. From winning Best Delegate in his very first MUN representing Russia to thriving in high-pressure crisis committees, Agneya handles, or rather, intimidates chaos with his 120 decibel voice. A truly performative personality who manages to sneak in some "Dostoevsky" time between managing delegates, he also is quite passionate about his club Barca. However, let’s be honest—his real expertise lies in networking. Agneya doesn’t just make friends, he specializes in them… the opposite gender a bit too much for his own good. Dependable, but with far more “contacts” than required, he has a unique talent for leaving a lasting impression—especially in the delegate affairs department. Safe to say, when it comes to managing people… Agneya takes the role very seriously. ',
      },
      { name: "", photo: "", grade: "", role: "Rapporteur", bio: "" },
      { name: "", photo: "", grade: "", role: "Tech", bio: "" },
    ],
  },
];

/* ─── Main Page ─── */
export default function SecretariatPage() {
  const [bioModal, setBioModal] = useState(null);

  return (
    <main
      style={{
        background: "#0a0700",
        minHeight: "100vh",
        paddingTop: "clamp(5rem, 12vw, 9rem)",
        paddingBottom: "clamp(4rem, 10vw, 8rem)",
      }}
    >
      {/* Faded bg watermark */}
      <div
        aria-hidden
        style={{
          position: "fixed",
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
          zIndex: 0,
        }}
      >
        AON 2026
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 1,
          padding: "0 clamp(1.5rem, 8vw, 7rem)",
        }}
      >
        {/* top rule */}
        <Reveal delay={0}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              marginBottom: "3.5rem",
            }}
          >
            <div
              style={{
                flex: 1,
                height: 1,
                background:
                  "linear-gradient(to right, transparent, rgba(255,190,0,0.22))",
              }}
            />
            <span
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontWeight: 600,
                fontSize: "0.58rem",
                letterSpacing: "0.3em",
                color: "rgba(255,200,60,0.38)",
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
                  "linear-gradient(to left, transparent, rgba(255,190,0,0.22))",
              }}
            />
          </div>
        </Reveal>

        {/* PAGE TITLE */}
        <Reveal delay={0.04}>
          <div style={{ marginBottom: "clamp(3rem, 8vw, 6rem)" }}>
            <h1
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(5rem, 18vw, 12rem)",
                lineHeight: 0.88,
                letterSpacing: "0.02em",
                margin: 0,
              }}
            >
              <span style={{ color: "#fff", display: "block" }}>THE</span>
              <span style={{ display: "block", ...SHIMMER }}>SECRETARIAT</span>
            </h1>
            <p
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontWeight: 400,
                fontSize: "clamp(0.7rem, 1.5vw, 0.9rem)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "rgba(200,165,80,0.45)",
                marginTop: "1rem",
                maxWidth: 480,
                lineHeight: 1.9,
              }}
            >
              The leadership guiding CBS AON 2026 — from the Secretary General
              to the Dais of each committee.
            </p>
            <div
              style={{
                width: 60,
                height: 2,
                background: "linear-gradient(to right, #ffd700, transparent)",
                marginTop: "1.5rem",
                borderRadius: 2,
              }}
            />
          </div>
        </Reveal>

        {/* SECTION: SECRETARIAT */}
        <Reveal delay={0.06}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              marginBottom: "2rem",
            }}
          >
            <span
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontWeight: 700,
                fontSize: "0.56rem",
                letterSpacing: "0.32em",
                color: "rgba(255,200,60,0.5)",
                textTransform: "uppercase",
              }}
            >
              01 &nbsp;/&nbsp; Secretariat
            </span>
            <div
              style={{
                flex: 1,
                height: 1,
                background:
                  "linear-gradient(to right, rgba(255,190,0,0.18), transparent)",
              }}
            />
          </div>
        </Reveal>

        {/* SG + DSG */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "1rem",
            marginBottom: "1.2rem",
          }}
        >
          {SECRETARIAT_TOP.map((s, i) => (
            <FeaturedCard key={i} person={s} index={i} onBio={setBioModal} />
          ))}
        </div>

        {/* USGs */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "0.65rem",
            marginBottom: "5.5rem",
          }}
        >
          {SECRETARIAT_USG.map((s, i) => (
            <UsgCard key={i} person={s} index={i} onBio={setBioModal} />
          ))}
        </div>

        {/* SECTION: COMMITTEES */}
        <Reveal delay={0.06}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              marginBottom: "3rem",
            }}
          >
            <span
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontWeight: 700,
                fontSize: "0.56rem",
                letterSpacing: "0.32em",
                color: "rgba(255,200,60,0.5)",
                textTransform: "uppercase",
              }}
            >
              02 &nbsp;/&nbsp; Committees &amp; Dais
            </span>
            <div
              style={{
                flex: 1,
                height: 1,
                background:
                  "linear-gradient(to right, rgba(255,190,0,0.18), transparent)",
              }}
            />
          </div>
        </Reveal>

        {COMMITTEES.map((c, i) => (
          <CommitteeBlock key={i} committee={c} index={i} onBio={setBioModal} />
        ))}

        {/* bottom rule */}
        <Reveal delay={0.05}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              marginTop: "2rem",
            }}
          >
            <div
              style={{
                flex: 1,
                height: 1,
                background:
                  "linear-gradient(to right, transparent, rgba(255,190,0,0.12))",
              }}
            />
            <div
              style={{
                width: 4,
                height: 4,
                borderRadius: "50%",
                background: "rgba(255,190,0,0.28)",
              }}
            />
            <div
              style={{
                flex: 1,
                height: 1,
                background:
                  "linear-gradient(to left, transparent, rgba(255,190,0,0.12))",
              }}
            />
          </div>
        </Reveal>
      </div>

      <BioModal person={bioModal} onClose={() => setBioModal(null)} />
    </main>
  );
}
