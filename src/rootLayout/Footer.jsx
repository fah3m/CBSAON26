import React from 'react'
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer
      className="w-full bg-[#070500] border-t border-[rgba(255,190,0,0.1)] px-[8vw] pt-12 pb-8 max-lg:px-6"
    >
      {/* Top row */}
      <div className="flex justify-between items-start gap-10 mb-8 flex-wrap max-lg:flex-col">

        {/* Brand */}
        <div className="flex flex-col gap-3">
          <img
            src="/cbs_logo.png"
            alt="CBS"
            className="w-14 object-contain opacity-90"
            style={{ filter: "drop-shadow(0 0 14px rgba(255,190,0,0.28))" }}
          />
          <p
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "1.35rem",
              letterSpacing: "0.14em",
              color: "rgba(255,210,80,0.9)",
            }}
          >
            Calcutta Boys&apos; School
          </p>
          <motion.a
            href="https://calcuttaboysschool.edu.in/"
            target="_blank"
            rel="noreferrer"
            style={{
              fontFamily: "'Cinzel', serif",
              fontWeight: 600,
              fontSize: "0.62rem",
              letterSpacing: "0.12em",
              color: "rgba(255,190,0,0.45)",
              textDecoration: "none",
            }}
            whileHover={{ color: "#ffd700" }}
          >
            calcuttaboysschool.edu.in ↗
          </motion.a>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-3">
          <p
            style={{
              fontFamily: "'Cinzel', serif",
              fontWeight: 700,
              fontSize: "0.55rem",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "rgba(255,210,80,0.35)",
            }}
          >
            Quick Links
          </p>
          {[
            ["Support", "/support"],
            ["Resources", "/resources"],
          ].map(([label, href]) => (
            <motion.a
              key={href}
              href={href}
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "1.1rem",
                letterSpacing: "0.12em",
                color: "rgba(255,190,0,0.55)",
                textDecoration: "none",
              }}
              whileHover={{ color: "#ffd700", x: 4 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              {label}
            </motion.a>
          ))}
        </div>

        {/* AON tag */}
        <div className="flex flex-col gap-3 max-lg:hidden">
          <p
            style={{
              fontFamily: "'Cinzel', serif",
              fontWeight: 700,
              fontSize: "0.55rem",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "rgba(255,210,80,0.35)",
            }}
          >
            Conference
          </p>
          <p
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "1.1rem",
              letterSpacing: "0.12em",
              color: "rgba(255,190,0,0.55)",
              lineHeight: 1.4,
            }}
          >
            Assembly of Nations<br />
            <span style={{ color: "rgba(255,190,0,0.3)", fontSize: "0.9rem" }}>2026 · 6th Edition</span>
          </p>
          <p
            style={{
              fontFamily: "'Cinzel', serif",
              fontWeight: 600,
              fontSize: "0.55rem",
              letterSpacing: "0.1em",
              fontStyle: "italic",
              color: "rgba(200,150,60,0.35)",
            }}
          >
            Renascentia De Legatum
          </p>
        </div>
      </div>

      {/* Divider */}
      <div
        className="mb-5 h-px"
        style={{ background: "linear-gradient(90deg, rgba(255,190,0,0.12), transparent)" }}
      />

      {/* Bottom bar */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <p
          style={{
            fontFamily: "'Cinzel', serif",
            fontWeight: 600,
            fontSize: "0.55rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(200,160,60,0.35)",
          }}
        >
          Made by{" "}
          {[
            ["Fahim", "https://github.com/fah3m"],
            ["Shaunak", "https://github.com/s6aunak"],
          ].map(([name, url], i) => (
            <span key={name}>
              {i > 0 && " & "}
              <motion.a
                href={url}
                target="_blank"
                rel="noreferrer"
                style={{ color: "rgba(255,190,0,0.6)", textDecoration: "none" }}
                whileHover={{ color: "#ffd700" }}
              >
                {name}
              </motion.a>
            </span>
          ))}
        </p>

        <p
          style={{
            fontFamily: "'Cinzel', serif",
            fontWeight: 600,
            fontSize: "0.55rem",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "rgba(200,160,60,0.25)",
          }}
        >
          © 2026 CBS AON
        </p>
      </div>
    </footer>
  );
};

export default Footer;
