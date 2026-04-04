import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

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

const variants = {
  enter: (d) => ({ x: d > 0 ? "8%" : "-8%", opacity: 0, scale: 1.04 }),
  center: { x: "0%", opacity: 1, scale: 1 },
  exit: (d) => ({ x: d > 0 ? "-8%" : "8%", opacity: 0, scale: 0.97 }),
};

export default function Gallery() {
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState(1);
  const timerRef = useRef(null);

  const startTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setDir(1);
      setCurrent((c) => (c + 1) % galleryImages.length);
    }, 3500);
  };

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, []);

  const go = (next) => {
    const resolved = (next + galleryImages.length) % galleryImages.length;
    setDir(next >= current ? 1 : -1);
    setCurrent(resolved);
    startTimer();
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
              transition={{ duration: 0.38, ease: [0.32, 0, 0.12, 1] }}
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
            { pos: "left-3", label: "←", delta: -1 },
            { pos: "right-3", label: "→", delta: 1 },
          ].map(({ pos, label, delta }) => (
            <motion.button
              key={pos}
              onClick={() => go(current + delta)}
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
