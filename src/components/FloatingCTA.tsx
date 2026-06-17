import { useEffect, useState } from "react";
import { Phone, CalendarCheck, FileText, Facebook } from "lucide-react";

type Item = {
  key: string;
  label: string;
  mobileLabel?: string;
  icon: typeof Phone;
  href?: string;
  onClick?: () => void;
};

export function FloatingCTA({ onQuoteClick }: { onQuoteClick?: () => void }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), 400);
    return () => clearTimeout(t);
  }, []);

  const items: Item[] = [
    { key: "hotline", label: "Hotline", icon: Phone, href: "tel:0921203388" },
    { key: "facebook", label: "FaceBook", mobileLabel: "Nhắn tin", icon: Facebook, href: "https://www.facebook.com/messages/t/510119868854830" },
    { key: "quote", label: "Báo Giá", icon: FileText, onClick: onQuoteClick },
    { key: "drive", label: "Lái Thử", icon: CalendarCheck, href: "#contact" },
  ];

  return (
    <div
      className={`fixed z-40 left-1/2 -translate-x-1/2 bottom-2 sm:bottom-6 w-[calc(100%-40px)] sm:w-auto transition-all duration-700 ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      {/* Ambient glow with breathing */}
      <div
        aria-hidden
        className="absolute -inset-3 -z-10 blur-xl sm:blur-2xl"
        style={{
          background:
            "radial-gradient(ellipse at center, color-mix(in oklab, var(--gold) 22%, transparent) 0%, transparent 70%)",
          animation: "cta-glow-breathe 4s ease-in-out infinite",
        }}
      />

      <div className="relative group/bar">
        {/* Animated gold border */}
        <div
          aria-hidden
          className="absolute -inset-px rounded-full opacity-80 pointer-events-none"
          style={{
            background:
              "conic-gradient(from var(--angle, 0deg), transparent 0%, color-mix(in oklab, var(--gold) 80%, transparent) 25%, transparent 50%, color-mix(in oklab, var(--gold) 60%, transparent) 75%, transparent 100%)",
            animation: "cta-rotate 6s linear infinite",
            WebkitMask:
              "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            padding: "1px",
          }}
        />

        {/* Glass bar */}
        <div
          className="relative flex items-stretch rounded-full overflow-hidden h-[54px] sm:h-auto"
          style={{
            background:
              "linear-gradient(180deg, color-mix(in oklab, var(--onyx) 85%, transparent), color-mix(in oklab, var(--onyx) 95%, transparent))",
            backdropFilter: "blur(12px) saturate(120%)",
            border: "0.5px solid color-mix(in oklab, var(--gold) 30%, transparent)",
            boxShadow:
              "0 8px 24px -8px rgba(0,0,0,0.6), 0 0 12px -2px color-mix(in oklab, var(--gold) 8%, transparent), inset 0 1px 0 color-mix(in oklab, var(--gold) 12%, transparent)",
          }}
        >
          {/* Shimmer sweep */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(115deg, transparent 30%, color-mix(in oklab, var(--gold) 65%, transparent) 50%, transparent 70%)",
              transform: "translateX(-100%)",
              animation: "cta-shimmer 7s ease-in-out infinite",
              mixBlendMode: "screen",
              opacity: 0.6,
            }}
          />

          {items.map(({ key, label, mobileLabel, icon: Icon, href, onClick }, i) => {
            const inner = (
              <>
                <span
                  className="relative flex items-center justify-center w-8 h-8 sm:w-7 sm:h-7 rounded-full transition-all duration-500 group-hover/item:scale-110"
                  style={{
                    background:
                      "radial-gradient(circle, color-mix(in oklab, var(--gold) 22%, transparent) 0%, transparent 70%)",
                  }}
                >
                  <Icon
                    className="w-4 h-4 sm:w-3.5 sm:h-3.5 text-gold transition-all duration-500 group-hover/item:drop-shadow-[0_0_6px_color-mix(in_oklab,var(--gold)_80%,transparent)]"
                    strokeWidth={1.7}
                    style={{ filter: "drop-shadow(0 0 3px color-mix(in oklab, var(--gold) 40%, transparent))" }}
                  />
                </span>
                <span
                  className="hidden sm:inline text-[10px] font-medium tracking-[0.22em] uppercase text-cream/85 transition-colors duration-500 group-hover/item:text-gold"
                  style={{ animation: "cta-pulse 4s ease-in-out infinite" }}
                >
                  {label}
                </span>
                <span className="sm:hidden text-[7px] font-semibold tracking-[0.15em] uppercase text-cream/85 mt-0.5">
                  {mobileLabel || label}
                </span>
              </>
            );

            const cls =
              "group/item relative flex-1 sm:flex-initial flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-2.5 sm:px-5 py-2 sm:py-3 transition-all duration-500 hover:-translate-y-0.5";

            const divider =
              i < items.length - 1 ? (
                <span
                  aria-hidden
                  className="absolute sm:relative left-full top-1/2 -translate-y-1/2 sm:left-auto sm:top-auto sm:translate-y-0 w-px h-4 sm:h-6 opacity-50 sm:opacity-100 z-10"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent, color-mix(in oklab, var(--gold) 40%, transparent), transparent)",
                  }}
                />
              ) : null;

            return (
              <div key={key} className="relative flex-1 sm:flex-initial flex items-stretch">
                {href ? (
                  <a href={href} className={cls}>
                    {inner}
                    <span
                      aria-hidden
                      className="absolute inset-0 rounded-full opacity-0 group-hover/item:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background:
                          "radial-gradient(ellipse at center, color-mix(in oklab, var(--gold) 18%, transparent) 0%, transparent 70%)",
                      }}
                    />
                  </a>
                ) : (
                  <button onClick={onClick} className={cls} type="button">
                    {inner}
                    <span
                      aria-hidden
                      className="absolute inset-0 rounded-full opacity-0 group-hover/item:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background:
                          "radial-gradient(ellipse at center, color-mix(in oklab, var(--gold) 18%, transparent) 0%, transparent 70%)",
                      }}
                    />
                  </button>
                )}
                {divider}
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes cta-shimmer {
          0% { transform: translateX(-100%); }
          60%, 100% { transform: translateX(100%); }
        }
        @keyframes cta-pulse {
          0%, 100% { opacity: 0.85; }
          50% { opacity: 1; }
        }
        @keyframes cta-glow-breathe {
          0%, 100% { opacity: 0.35; transform: scale(1); }
          50% { opacity: 0.55; transform: scale(1.02); }
        }
        @property --angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }
        @keyframes cta-rotate {
          to { --angle: 360deg; }
        }
      `}</style>
    </div>
  );
}
