import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

/* ── Inject fonts ── */
if (typeof document !== "undefined" && !document.getElementById("navbar-fonts")) {
  const s = document.createElement("style");
  s.id = "navbar-fonts";
  s.textContent = `@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Cinzel:wght@600;700;900&family=Oswald:wght@500;600;700&display=swap');`;
  document.head.appendChild(s);
}

const navLinks = [
  { to: "/",             label: "Home",         end: true },
  { to: "/about",        label: "About" },
  { to: "/secretariat",  label: "Secretariat" },
  { to: "/committees",   label: "Committees" },
  { to: "/publications", label: "Publications" },
];

// All variants defined once at module level — never recreated
const NAV_VARIANTS = {
  hidden:  { y: -20, opacity: 0 },
  visible: { y: 0,   opacity: 1 },
};

const DRAWER_VARIANTS = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1 },
};

const FAST_EASE = { duration: 0.18, ease: "easeOut" };

const NAV_CONTAINER_VARIANTS = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.055, delayChildren: 0.1 } },
};

const NAV_ITEM_VARIANTS = {
  hidden:  { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2, ease: "easeOut" } },
};

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled,   setScrolled]   = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  const desktopLinkClass = ({ isActive }) =>
    [
      "flex items-center transition-all duration-200 px-3 py-[0.4rem] rounded-full border",
      "text-[0.6rem] tracking-[0.16em] uppercase",
      isActive
        ? "text-[#ffe090] border-[rgba(200,150,0,0.45)] bg-[rgba(180,130,0,0.08)] shadow-[0_0_12px_rgba(200,150,0,0.15)]"
        : "text-[rgba(200,165,80,0.55)] border-transparent hover:text-[rgba(230,195,100,0.95)] hover:bg-[rgba(200,150,0,0.06)]",
    ].join(" ");

  return (
    <>
      {/* ── NAVBAR PILL ── */}
      <motion.nav
        variants={NAV_VARIANTS}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 3.2 }}
        style={{
          fontFamily: "'Cinzel', serif",
          background: scrolled ? "rgba(8,6,1,0.92)" : "rgba(10,8,2,0.68)",
          boxShadow: scrolled
            ? "0 4px 32px rgba(0,0,0,0.55), 0 0 0 0.5px rgba(200,150,0,0.12)"
            : "none",
          transition: "background 0.4s ease, box-shadow 0.4s ease",
        }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-[1000]
          backdrop-blur-xl border border-[rgba(255,255,255,0.08)] rounded-full
          px-3 py-[0.35rem] whitespace-nowrap w-[calc(100%-2rem)] lg:w-auto"
      >
        {/* ── MOBILE ROW ── */}
        <div className="flex items-center justify-between lg:hidden">
          <Link to="/" className="flex items-center shrink-0">
            <img src="/aon26_logo.png" alt="AON" className="h-9 w-9 object-contain rounded-full" />
          </Link>

          <span style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "1.05rem",
            letterSpacing: "0.22em",
            color: "rgba(220,180,70,0.65)",
          }}>
            Assembly of Nations
          </span>

          <button
            className="flex flex-col items-center justify-center gap-[5px] p-2 rounded-full bg-transparent border-none cursor-pointer"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
          >
            {[0, 1, 2].map((i) => (
              <span key={i} className="block w-5 h-[1.5px] bg-[rgba(200,165,80,0.75)] rounded-full" />
            ))}
          </button>
        </div>

        {/* ── DESKTOP ROW ── */}
        <div className="hidden lg:flex items-center gap-3">
          <Link to="/" className="flex items-center shrink-0">
            <motion.img
              src="/aon26_logo.png" alt="AON"
              className="h-10 w-10 object-contain rounded-full"
              whileHover={{ scale: 1.1, rotate: 6 }}
              transition={{ type: "spring", stiffness: 380, damping: 18 }}
            />
          </Link>

          <ul className="flex items-center gap-[0.05rem] list-none m-0 p-0">
            {navLinks.map(({ to, label, end }) => (
              <li key={to}>
                <NavLink to={to} end={end} className={desktopLinkClass}>
                  <span style={{ fontFamily: "'Cinzel', serif", fontWeight: 600 }}>{label}</span>
                </NavLink>
              </li>
            ))}
          </ul>

          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
            <NavLink
              to="/support"
              className="flex items-center text-[0.58rem] tracking-[0.14em] uppercase
                text-[#0a0700] bg-gradient-to-br from-[#d4a820] to-[#f5c842]
                px-4 py-[0.4rem] rounded-full shadow-[0_0_18px_rgba(200,160,0,0.3)]
                hover:shadow-[0_0_28px_rgba(200,160,0,0.55)]
                transition-shadow duration-200 border-none"
              style={{ fontFamily: "'Cinzel', serif", fontWeight: 700 }}
            >
              Support
            </NavLink>
          </motion.div>
        </div>
      </motion.nav>

      {/* ── MOBILE DRAWER ── */}
      {/* Single motion.div, single opacity tween — one animated node total */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            key="drawer"
            variants={DRAWER_VARIANTS}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={FAST_EASE}
            className="fixed inset-0 z-[1100] flex flex-col"
            style={{
              background: "rgba(6,4,0,0.97)",
              fontFamily: "'Cinzel', serif",
            }}
          >
            {/* Gold border bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-px"
                 style={{ background: "linear-gradient(90deg, transparent, rgba(200,150,0,0.3), transparent)" }} />

            {/* Top bar */}
            <div className="flex items-center justify-between px-8 pt-8 pb-4">
              <Link to="/" onClick={() => setDrawerOpen(false)} className="flex items-center gap-3">
                <img
                  src="/aon26_logo.png" alt="AON"
                  className="h-11 w-11 object-contain rounded-full"
                  style={{ filter: "drop-shadow(0 0 10px rgba(255,190,0,0.35))" }}
                />
                <div className="flex flex-col">
                  <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.4rem", letterSpacing: "0.1em", color: "#fff", lineHeight: 1 }}>
                    AON
                  </span>
                  <span style={{ fontFamily: "'Cinzel', serif", fontWeight: 600, fontSize: "0.42rem", letterSpacing: "0.2em", color: "rgba(200,165,80,0.55)", textTransform: "uppercase" }}>
                    2026
                  </span>
                </div>
              </Link>

              <button
                className="flex items-center justify-center w-10 h-10 rounded-full
                  border border-[rgba(200,150,0,0.2)] bg-transparent cursor-pointer"
                style={{ color: "rgba(200,165,80,0.6)" }}
                onClick={() => setDrawerOpen(false)}
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>

            {/* Divider */}
            <div className="mx-8 h-px bg-[rgba(200,150,0,0.1)] mb-6" />

            {/* Nav links — stagger container, one motion.div per link */}
            <motion.nav
              className="flex-1 flex flex-col justify-center px-8 gap-1"
              variants={NAV_CONTAINER_VARIANTS}
              initial="hidden"
              animate="visible"
            >
              {navLinks.map(({ to, label, end }, i) => (
                <motion.div key={to} variants={NAV_ITEM_VARIANTS}>
                  <NavLink
                    to={to}
                    end={end}
                    onClick={() => setDrawerOpen(false)}
                    className={({ isActive }) =>
                      [
                        "flex items-center justify-between w-full py-4 px-2 border-b",
                        isActive
                          ? "border-[rgba(200,150,0,0.35)]"
                          : "border-[rgba(200,150,0,0.08)]",
                      ].join(" ")
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span style={{
                          fontFamily: "'Bebas Neue', sans-serif",
                          fontSize: "2.6rem",
                          letterSpacing: "0.06em",
                          lineHeight: 1,
                          color: isActive ? "#ffd040" : "rgba(230,200,120,0.75)",
                        }}>
                          {label}
                        </span>
                        <span style={{
                          fontFamily: "'Cinzel', serif",
                          fontSize: "0.65rem",
                          color: isActive ? "rgba(255,210,80,0.7)" : "rgba(200,150,0,0.25)",
                        }}>
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </>
                    )}
                  </NavLink>
                </motion.div>
              ))}

              {/* Support CTA */}
              <motion.div variants={NAV_ITEM_VARIANTS} className="mt-6">
                <NavLink
                  to="/support"
                  onClick={() => setDrawerOpen(false)}
                  className="flex items-center justify-center w-full py-4 rounded-2xl
                    text-[#0a0700] bg-gradient-to-br from-[#d4a820] to-[#f5c842]
                    shadow-[0_0_32px_rgba(200,160,0,0.25)] border-none"
                >
                  <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.8rem", letterSpacing: "0.14em" }}>
                    Support
                  </span>
                </NavLink>
              </motion.div>
            </motion.nav>

            {/* Footer */}
            <div className="px-8 pb-10 pt-4">
              <p style={{
                fontFamily: "'Cinzel', serif",
                fontWeight: 600,
                fontSize: "0.45rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "rgba(200,165,80,0.22)",
                textAlign: "center",
              }}>
                Calcutta Boys&apos; School · Assembly of Nations · 2026
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
