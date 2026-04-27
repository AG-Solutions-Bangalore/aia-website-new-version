import { ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ORANGE = "#F3831C";
const NAVY = "#0F3652";

function useAnimate() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);
  return visible;
}

function FadeUp({ children, delay = 0, style = {} }) {
  const visible = useAnimate();
  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export default function NotFound() {
  const [hoverHome, setHoverHome] = useState(false);
  const [hoverSupport, setHoverSupport] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <div
        style={{
          minHeight: "100vh",
          display: "grid",
          gridTemplateRows: "auto 1fr auto",
          position: "relative",
          overflow: "hidden",
          background: "#fafaf8",
        }}
      >
        <main
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "48px 24px",
            textAlign: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          <FadeUp delay={0}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                background: "rgba(243,131,28,0.10)",
                border: "1px solid rgba(243,131,28,0.25)",
                borderRadius: 20,
                padding: "5px 16px",
                fontSize: 11,
                fontWeight: 500,
                color: ORANGE,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: 22,
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: ORANGE,
                  animation: "pulse 2s ease infinite",
                  display: "inline-block",
                }}
              />
              Error
            </div>
          </FadeUp>

          <FadeUp delay={0.05}>
            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(110px, 22vw, 210px)",
                fontWeight: 900,
                lineHeight: 1,
                letterSpacing: "-0.04em",
                color: "transparent",
                WebkitTextStroke: `2px ${NAVY}`,
                userSelect: "none",
              }}
            >
              {"4"}
              <span style={{ WebkitTextStroke: 0, color: ORANGE }}>{"0"}</span>
              {"4"}
            </div>
          </FadeUp>

          {/* Divider */}
          <FadeUp delay={0.12}>
            <div
              style={{
                width: 52,
                height: 3,
                background: ORANGE,
                borderRadius: 2,
                margin: "18px auto 26px",
              }}
            />
          </FadeUp>

          {/* Heading */}
          <FadeUp delay={0.17}>
            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(22px, 3.5vw, 34px)",
                fontWeight: 700,
                color: NAVY,
                marginBottom: 16,
              }}
            >
              Page Not Found
            </h1>
          </FadeUp>

          {/* Body */}
          <FadeUp delay={0.22}>
            <p
              style={{
                fontSize: 15,
                fontWeight: 300,
                color: NAVY,
                opacity: 0.62,
                maxWidth: 420,
                lineHeight: 1.8,
                marginBottom: 40,
              }}
            >
              The page you&apos;re looking for may have been moved, renamed, or is
              temporarily unavailable. Let&apos;s get you back on track.
            </p>
          </FadeUp>

          <FadeUp delay={0.28}>
            <div
              style={{
                display: "flex",
                gap: 14,
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <a
                onMouseEnter={() => setHoverHome(true)}
                onMouseLeave={() => setHoverHome(false)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: hoverHome ? "#d96c10" : ORANGE,
                  color: "#fff",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 12,
                  fontWeight: 500,
                  letterSpacing: "0.07em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  padding: "14px 28px",
                  borderRadius: 6,
                  transform: hoverHome ? "translateY(-2px)" : "translateY(0)",
                  transition: "background 0.2s, transform 0.15s",
                }}
                onClick={() => navigate("/")}
              >
                <ArrowLeft size={16} />
                Return Home
              </a>

              <a
                onMouseEnter={() => setHoverSupport(true)}
                onMouseLeave={() => setHoverSupport(false)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "transparent",
                  color: NAVY,
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 12,
                  fontWeight: 500,
                  letterSpacing: "0.07em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  padding: "13px 28px",
                  borderRadius: 6,
                  border: `1.5px solid ${hoverSupport ? NAVY : "rgba(15,54,82,0.25)"}`,
                  transform: hoverSupport
                    ? "translateY(-2px)"
                    : "translateY(0)",
                  transition: "border-color 0.2s, transform 0.15s",
                }}
                onClick={() => navigate("/contact")}
              >
                Contact Support
              </a>
            </div>
          </FadeUp>
        </main>
      </div>
    </>
  );
}
