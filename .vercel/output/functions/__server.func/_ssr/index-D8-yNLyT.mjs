import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { h as heroImg } from "./router-j4GV9Hdm.mjs";
import { P as Phone, A as ArrowRight, S as Sparkles, B as Battery, G as Gauge, a as ShieldCheck, C as Check, Q as Quote, M as MapPin, F as Facebook, b as MessageCircle, c as FileText, d as CalendarCheck, X, R as RotateCw } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/zod.mjs";
const showcaseVideo = "/assets/video-DO02uPd6.mp4";
const ctaImg = "/assets/vf3-cta-CniuRMyY.jpg";
const vinfastLogo = "/assets/Logo-scSnwEF4.png";
const f0 = "/assets/frame-00-Dy3c1FU0.jpg";
const f1 = "/assets/frame-01-BtK93jUb.jpg";
const f2 = "/assets/frame-02-YrCY_jQB.jpg";
const f3 = "/assets/frame-03-BxJbCKqp.jpg";
const f4 = "/assets/frame-04-B9b1qdwM.jpg";
const f5 = "/assets/frame-05-CdpVZ4nz.jpg";
const f6 = "/assets/frame-06-BYHawLOr.jpg";
const f7 = "/assets/frame-07-30qjAKjN.jpg";
const FRAMES = [f0, f1, f2, f3, f4, f5, f6, f7];
const N = FRAMES.length;
const PIXELS_PER_FRAME = 60;
const FRICTION = 0.94;
const IDLE_SPEED = 0.35;
const IDLE_DELAY_MS = 2200;
function Viewer360() {
  const [loaded, setLoaded] = reactExports.useState(0);
  const [index, setIndex] = reactExports.useState(0);
  const [dragging, setDragging] = reactExports.useState(false);
  const indexRef = reactExports.useRef(0);
  const velocityRef = reactExports.useRef(0);
  const lastXRef = reactExports.useRef(0);
  const lastTimeRef = reactExports.useRef(0);
  const rafRef = reactExports.useRef(null);
  const idleTimerRef = reactExports.useRef(null);
  const interactedRef = reactExports.useRef(false);
  const autoRotatingRef = reactExports.useRef(true);
  reactExports.useEffect(() => {
    let cancelled = false;
    let count = 0;
    FRAMES.forEach((src) => {
      const img = new Image();
      img.onload = img.onerror = () => {
        if (cancelled) return;
        count += 1;
        setLoaded(count);
      };
      img.src = src;
    });
    return () => {
      cancelled = true;
    };
  }, []);
  reactExports.useEffect(() => {
    const tick = () => {
      let v = velocityRef.current;
      if (!dragging) {
        if (Math.abs(v) > 2e-3) {
          v *= FRICTION;
          velocityRef.current = v;
          indexRef.current = mod(indexRef.current + v, N);
          setIndex(Math.floor(indexRef.current));
        } else if (autoRotatingRef.current && !interactedRef.current) {
          const drift = IDLE_SPEED / 60;
          indexRef.current = mod(indexRef.current + drift, N);
          setIndex(Math.floor(indexRef.current));
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [dragging]);
  const scheduleIdleResume = () => {
    if (idleTimerRef.current) window.clearTimeout(idleTimerRef.current);
    idleTimerRef.current = window.setTimeout(() => {
      interactedRef.current = false;
    }, IDLE_DELAY_MS);
  };
  const onPointerDown = (e) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragging(true);
    interactedRef.current = true;
    velocityRef.current = 0;
    lastXRef.current = e.clientX;
    lastTimeRef.current = performance.now();
    if (idleTimerRef.current) window.clearTimeout(idleTimerRef.current);
  };
  const onPointerMove = (e) => {
    if (!dragging) return;
    const now = performance.now();
    const dx = e.clientX - lastXRef.current;
    const dt = Math.max(1, now - lastTimeRef.current);
    const frameDelta = dx / PIXELS_PER_FRAME;
    indexRef.current = mod(indexRef.current - frameDelta, N);
    setIndex(Math.floor(indexRef.current));
    velocityRef.current = -frameDelta * 16 / dt;
    lastXRef.current = e.clientX;
    lastTimeRef.current = now;
  };
  const onPointerUp = (e) => {
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
    }
    setDragging(false);
    velocityRef.current *= 0.6;
    scheduleIdleResume();
  };
  const progress = Math.round(loaded / N * 100);
  const isReady = loaded >= N;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "relative aspect-[16/10] w-full overflow-hidden rounded-2xl select-none touch-none",
      style: {
        background: "radial-gradient(ellipse at 50% 40%, oklch(0.28 0.006 240) 0%, oklch(0.14 0.005 240) 70%, oklch(0.1 0.005 240) 100%)",
        boxShadow: "var(--shadow-luxury)",
        cursor: dragging ? "grabbing" : "grab"
      },
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel: onPointerUp,
      children: [
        FRAMES.map((src, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src,
            alt: i === 0 ? "VinFast VF 3 — góc nhìn 360°" : "",
            draggable: false,
            width: 1280,
            height: 768,
            loading: i === 0 ? "eager" : "lazy",
            decoding: "async",
            className: "absolute inset-0 h-full w-full object-contain transition-opacity duration-75",
            style: { opacity: i === index ? 1 : 0, willChange: "opacity" }
          },
          i
        )),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "pointer-events-none absolute inset-0",
            style: {
              background: "radial-gradient(ellipse at 50% 110%, color-mix(in oklab, var(--gold) 18%, transparent) 0%, transparent 55%), linear-gradient(180deg, transparent 60%, oklch(0 0 0 / 0.35) 100%)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "pointer-events-none absolute inset-0 mix-blend-overlay opacity-60",
            style: {
              background: "linear-gradient(115deg, transparent 30%, color-mix(in oklab, white 14%, transparent) 50%, transparent 70%)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent" }),
        !isReady && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center bg-onyx/40 backdrop-blur-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] tracking-[0.32em] text-cream/80 uppercase mb-3", children: "Đang tải trải nghiệm 360°" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px w-40 bg-cream/15 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "h-full bg-gold-soft transition-all duration-300",
              style: { width: `${progress}%` }
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-5 left-5 flex items-center gap-2 text-[10px] tracking-[0.3em] text-cream/70 uppercase", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-gold animate-pulse" }),
          "Xoay 360°"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-5 right-5 text-[10px] tracking-[0.3em] text-cream/60 uppercase tabular-nums", children: [
          String(Math.round(index / N * 360)).padStart(3, "0"),
          "°"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-cream/70 transition-opacity duration-500 ${interactedRef.current ? "opacity-0" : "opacity-100"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCw, { className: "h-3 w-3 text-gold" }),
              "Kéo để xoay"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-5 right-5 flex items-center gap-1.5", children: FRAMES.map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "h-px transition-all duration-300",
            style: {
              width: i === index ? 18 : 8,
              background: i === index ? "var(--gold)" : "color-mix(in oklab, white 25%, transparent)"
            }
          },
          i
        )) })
      ]
    }
  ) });
}
function mod(n, m) {
  return (n % m + m) % m;
}
function FloatingCTA({ onQuoteClick }) {
  const [show, setShow] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const t = setTimeout(() => setShow(true), 400);
    return () => clearTimeout(t);
  }, []);
  const items = [
    { key: "hotline", label: "Hotline", icon: Phone, href: "tel:0921203388" },
    { key: "facebook", label: "FaceBook", mobileLabel: "Nhắn tin", icon: Facebook, href: "https://www.facebook.com/messages/t/510119868854830" },
    { key: "quote", label: "Báo Giá", icon: FileText, onClick: onQuoteClick },
    { key: "drive", label: "Lái Thử", icon: CalendarCheck, href: "#contact" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `fixed z-40 left-1/2 -translate-x-1/2 bottom-2 sm:bottom-6 w-[calc(100%-20px)] sm:w-auto transition-all duration-700 ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            "aria-hidden": true,
            className: "absolute -inset-3 -z-10 blur-xl sm:blur-2xl",
            style: {
              background: "radial-gradient(ellipse at center, color-mix(in oklab, var(--gold) 22%, transparent) 0%, transparent 70%)",
              animation: "cta-glow-breathe 4s ease-in-out infinite"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative group/bar", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              "aria-hidden": true,
              className: "absolute -inset-px rounded-full opacity-80 pointer-events-none",
              style: {
                background: "conic-gradient(from var(--angle, 0deg), transparent 0%, color-mix(in oklab, var(--gold) 80%, transparent) 25%, transparent 50%, color-mix(in oklab, var(--gold) 60%, transparent) 75%, transparent 100%)",
                animation: "cta-rotate 6s linear infinite",
                WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
                padding: "1px"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "relative flex items-stretch rounded-full overflow-hidden h-[54px] sm:h-auto",
              style: {
                background: "linear-gradient(180deg, color-mix(in oklab, var(--onyx) 85%, transparent), color-mix(in oklab, var(--onyx) 95%, transparent))",
                backdropFilter: "blur(12px) saturate(120%)",
                border: "0.5px solid color-mix(in oklab, var(--gold) 30%, transparent)",
                boxShadow: "0 8px 24px -8px rgba(0,0,0,0.6), 0 0 12px -2px color-mix(in oklab, var(--gold) 8%, transparent), inset 0 1px 0 color-mix(in oklab, var(--gold) 12%, transparent)"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    "aria-hidden": true,
                    className: "absolute inset-0 pointer-events-none",
                    style: {
                      background: "linear-gradient(115deg, transparent 30%, color-mix(in oklab, var(--gold) 65%, transparent) 50%, transparent 70%)",
                      transform: "translateX(-100%)",
                      animation: "cta-shimmer 7s ease-in-out infinite",
                      mixBlendMode: "screen",
                      opacity: 0.6
                    }
                  }
                ),
                items.map(({ key, label, mobileLabel, icon: Icon, href, onClick }, i) => {
                  const inner = /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "relative flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full transition-all duration-500 group-hover/item:scale-110",
                        style: {
                          background: "radial-gradient(circle, color-mix(in oklab, var(--gold) 22%, transparent) 0%, transparent 70%)"
                        },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Icon,
                          {
                            className: "w-3 h-3 sm:w-3.5 sm:h-3.5 text-gold transition-all duration-500 group-hover/item:drop-shadow-[0_0_6px_color-mix(in_oklab,var(--gold)_80%,transparent)]",
                            strokeWidth: 1.7,
                            style: { filter: "drop-shadow(0 0 3px color-mix(in oklab, var(--gold) 40%, transparent))" }
                          }
                        )
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "hidden sm:inline text-[10px] font-medium tracking-[0.22em] uppercase text-cream/85 transition-colors duration-500 group-hover/item:text-gold",
                        style: { animation: "cta-pulse 4s ease-in-out infinite" },
                        children: label
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sm:hidden text-[7px] font-semibold tracking-[0.15em] uppercase text-cream/85 mt-0.5", children: mobileLabel || label })
                  ] });
                  const cls = "group/item relative flex-1 sm:flex-initial flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-2.5 sm:px-5 py-2 sm:py-3 transition-all duration-500 hover:-translate-y-0.5";
                  const divider = i < items.length - 1 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      "aria-hidden": true,
                      className: "absolute sm:relative left-full top-1/2 -translate-y-1/2 sm:left-auto sm:top-auto sm:translate-y-0 w-px h-4 sm:h-6 opacity-50 sm:opacity-100 z-10",
                      style: {
                        background: "linear-gradient(180deg, transparent, color-mix(in oklab, var(--gold) 40%, transparent), transparent)"
                      }
                    }
                  ) : null;
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 sm:flex-initial flex items-stretch", children: [
                    href ? /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href, className: cls, children: [
                      inner,
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          "aria-hidden": true,
                          className: "absolute inset-0 rounded-full opacity-0 group-hover/item:opacity-100 transition-opacity duration-500 pointer-events-none",
                          style: {
                            background: "radial-gradient(ellipse at center, color-mix(in oklab, var(--gold) 18%, transparent) 0%, transparent 70%)"
                          }
                        }
                      )
                    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick, className: cls, type: "button", children: [
                      inner,
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          "aria-hidden": true,
                          className: "absolute inset-0 rounded-full opacity-0 group-hover/item:opacity-100 transition-opacity duration-500 pointer-events-none",
                          style: {
                            background: "radial-gradient(ellipse at center, color-mix(in oklab, var(--gold) 18%, transparent) 0%, transparent 70%)"
                          }
                        }
                      )
                    ] }),
                    divider
                  ] }, key);
                })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
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
      ` })
      ]
    }
  );
}
function OfferPopup() {
  const [open, setOpen] = reactExports.useState(false);
  const [submitted, setSubmitted] = reactExports.useState(false);
  const shown = reactExports.useRef(false);
  reactExports.useEffect(() => {
    if (shown.current) return;
    if (typeof window !== "undefined" && sessionStorage.getItem("vf3_popup_shown")) return;
    const t = setTimeout(() => {
      shown.current = true;
      setOpen(true);
      try {
        sessionStorage.setItem("vf3_popup_shown", "1");
      } catch {
      }
    }, 5e3);
    return () => clearTimeout(t);
  }, []);
  reactExports.useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);
  if (!open) return null;
  const offers = [
    "Ưu đãi 6% — Mãnh liệt vì tương lai xanh",
    "Ưu đãi 5% — Công an & Bộ đội",
    "Ưu đãi 3% — Mùa hè rực rỡ"
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "fixed inset-0 z-[100] flex items-center justify-center p-4 animate-[fade-in-slow_0.4s_ease-out]",
      role: "dialog",
      "aria-modal": "true",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            "aria-label": "Đóng",
            onClick: () => setOpen(false),
            className: "absolute inset-0 bg-onyx/70 backdrop-blur-md"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "relative w-full max-w-md rounded-2xl overflow-hidden border border-[color-mix(in_oklab,var(--gold)_35%,transparent)] shadow-[0_40px_120px_-30px_rgba(0,0,0,0.7)] animate-[scale-in_0.45s_cubic-bezier(0.2,0.8,0.2,1)]",
            style: {
              background: "linear-gradient(160deg, oklch(0.22 0.006 240 / 0.95), oklch(0.12 0.005 240 / 0.95))",
              backdropFilter: "blur(24px)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: () => setOpen(false),
                  className: "absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-cream/80 hover:text-cream flex items-center justify-center transition-all",
                  "aria-label": "Đóng",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px w-full bg-gradient-to-r from-transparent via-gold to-transparent" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-7 sm:p-9 text-cream", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3.5 h-3.5 text-gold" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] tracking-[0.32em] uppercase text-gold-soft", children: "Ưu đãi giới hạn" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display text-2xl sm:text-[1.7rem] leading-tight tracking-tight", children: [
                  "NHẬN ƯU ĐÃI ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gold-gradient", children: "VF 3" }),
                  " NGAY HÔM NAY"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-[12.5px] tracking-[0.12em] uppercase text-cream/70 leading-relaxed", children: "Giá tốt hàng đầu thị trường — Chính sách hậu mãi vượt trội" }),
                !submitted ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-6 space-y-2.5", children: offers.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "li",
                    {
                      className: "flex items-start gap-3 text-sm text-cream/85 border-l border-gold/40 pl-3",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: o })
                    },
                    o
                  )) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "form",
                    {
                      onSubmit: async (e) => {
                        e.preventDefault();
                        const form = e.currentTarget;
                        const fd = new FormData(form);
                        try {
                          await fetch("/api/public/lead", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                              name: String(fd.get("name") || ""),
                              phone: String(fd.get("phone") || ""),
                              need: "Nhận ưu đãi",
                              source: "popup"
                            })
                          });
                        } catch {
                        }
                        setSubmitted(true);
                        setTimeout(() => setOpen(false), 2200);
                      },
                      className: "mt-7 space-y-3",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "input",
                          {
                            required: true,
                            name: "name",
                            type: "text",
                            placeholder: "Họ và tên",
                            className: "w-full h-11 px-4 rounded-full bg-white/5 border border-white/15 text-cream placeholder:text-cream/40 text-sm focus:outline-none focus:border-gold/70 transition-colors"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "input",
                          {
                            required: true,
                            name: "phone",
                            type: "tel",
                            pattern: "[0-9 +]{8,}",
                            placeholder: "Số điện thoại",
                            className: "w-full h-11 px-4 rounded-full bg-white/5 border border-white/15 text-cream placeholder:text-cream/40 text-sm focus:outline-none focus:border-gold/70 transition-colors"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "button",
                          {
                            type: "submit",
                            className: "w-full h-11 rounded-full bg-gradient-to-r from-[oklch(0.86_0.06_85)] to-[oklch(0.74_0.1_75)] text-onyx text-[11px] font-semibold tracking-[0.22em] uppercase flex items-center justify-center gap-2 hover:shadow-[0_12px_40px_-10px_rgba(184,151,90,0.6)] transition-all",
                            children: [
                              "Nhận tư vấn ngay ",
                              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3.5 h-3.5" })
                            ]
                          }
                        )
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-[10.5px] text-cream/45 tracking-wide text-center", children: "Thông tin của bạn được bảo mật tuyệt đối" })
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 text-center py-6", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto w-12 h-12 rounded-full bg-gold/15 border border-gold/40 flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-5 h-5 text-gold" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-cream/90", children: "Cảm ơn quý khách! Chúng tôi sẽ liên hệ trong ít phút." })
                ] })
              ] })
            ]
          }
        )
      ]
    }
  );
}
function QuoteModal({
  open,
  onClose,
  initialNeed = "",
  source = "quote-modal",
  eyebrow = "Báo giá nhanh",
  title,
  subtitle = "Nhận báo giá chi tiết & ưu đãi mới nhất trong vòng 24 giờ"
}) {
  const [submitted, setSubmitted] = reactExports.useState(false);
  const [loading, setLoading] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!open) {
      setSubmitted(false);
      setLoading(false);
      return;
    }
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);
  if (!open) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "fixed inset-0 z-[100] flex items-center justify-center p-4 animate-[fade-in-slow_0.4s_ease-out]",
      role: "dialog",
      "aria-modal": "true",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            "aria-label": "Đóng",
            onClick: onClose,
            className: "absolute inset-0 bg-onyx/70 backdrop-blur-md"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "relative w-full max-w-md rounded-2xl overflow-hidden border border-[color-mix(in_oklab,var(--gold)_35%,transparent)] shadow-[0_40px_120px_-30px_rgba(0,0,0,0.7)] animate-[scale-in_0.45s_cubic-bezier(0.2,0.8,0.2,1)]",
            style: {
              background: "linear-gradient(160deg, oklch(0.22 0.006 240 / 0.95), oklch(0.12 0.005 240 / 0.95))",
              backdropFilter: "blur(24px)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: onClose,
                  className: "absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-cream/80 hover:text-cream flex items-center justify-center transition-all",
                  "aria-label": "Đóng",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px w-full bg-gradient-to-r from-transparent via-gold to-transparent" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-7 sm:p-9 text-cream", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-3.5 h-3.5 text-gold" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] tracking-[0.32em] uppercase text-gold-soft", children: eyebrow })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl sm:text-[1.7rem] leading-tight tracking-tight", children: title ?? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  "YÊU CẦU ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gold-gradient", children: "BÁO GIÁ" }),
                  " VF 3"
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-[12.5px] tracking-[0.12em] uppercase text-cream/70 leading-relaxed", children: subtitle }),
                !submitted ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "form",
                  {
                    onSubmit: async (e) => {
                      e.preventDefault();
                      const form = e.currentTarget;
                      const fd = new FormData(form);
                      setLoading(true);
                      try {
                        await fetch("/api/public/lead", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({
                            name: String(fd.get("name") || ""),
                            phone: String(fd.get("phone") || ""),
                            need: String(fd.get("need") || ""),
                            source
                          })
                        });
                      } catch {
                      }
                      setLoading(false);
                      setSubmitted(true);
                      setTimeout(() => onClose(), 2500);
                    },
                    className: "mt-7 space-y-4",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[11px] tracking-[0.25em] uppercase text-cream/50 mb-2", children: "Họ và tên" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "input",
                          {
                            required: true,
                            name: "name",
                            type: "text",
                            placeholder: "Nguyễn Văn A",
                            className: "w-full h-11 px-4 rounded-full bg-white/5 border border-white/15 text-cream placeholder:text-cream/40 text-sm focus:outline-none focus:border-gold/70 transition-colors"
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[11px] tracking-[0.25em] uppercase text-cream/50 mb-2", children: "Số điện thoại" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "input",
                          {
                            required: true,
                            name: "phone",
                            type: "tel",
                            pattern: "[0-9 +]{8,}",
                            placeholder: "09xx xxx xxx",
                            className: "w-full h-11 px-4 rounded-full bg-white/5 border border-white/15 text-cream placeholder:text-cream/40 text-sm focus:outline-none focus:border-gold/70 transition-colors"
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[11px] tracking-[0.25em] uppercase text-cream/50 mb-2", children: "Nhu cầu / Ghi chú" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "textarea",
                          {
                            name: "need",
                            rows: 3,
                            defaultValue: initialNeed,
                            placeholder: "Mua trả thẳng, trả góp, màu sắc ưa thích...",
                            className: "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-cream placeholder:text-cream/40 text-sm focus:outline-none focus:border-gold/70 transition-colors resize-none"
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "submit",
                          disabled: loading,
                          className: "w-full h-11 rounded-full bg-gradient-to-r from-[oklch(0.86_0.06_85)] to-[oklch(0.74_0.1_75)] text-onyx text-[11px] font-semibold tracking-[0.22em] uppercase flex items-center justify-center gap-2 hover:shadow-[0_12px_40px_-10px_rgba(184,151,90,0.6)] transition-all disabled:opacity-60",
                          children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 border-2 border-onyx/30 border-t-onyx rounded-full animate-spin" }),
                            "Đang gửi..."
                          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                            "Gửi yêu cầu báo giá ",
                            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3.5 h-3.5" })
                          ] })
                        }
                      )
                    ]
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 text-center py-6", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto w-12 h-12 rounded-full bg-gold/15 border border-gold/40 flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-5 h-5 text-gold" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-cream/90", children: "Cảm ơn quý khách! Chúng tôi sẽ gửi báo giá trong thời gian sớm nhất." })
                ] }),
                !submitted && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-[10.5px] text-cream/45 tracking-wide text-center", children: "Thông tin của bạn được bảo mật tuyệt đối" })
              ] })
            ]
          }
        )
      ]
    }
  );
}
function Reveal({ children, delay = 0, className = "", as = "div" }) {
  const ref = reactExports.useRef(null);
  const [visible, setVisible] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const Tag = as;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Tag,
    {
      ref,
      style: {
        transitionDelay: `${delay}ms`,
        filter: visible ? "blur(0px)" : "blur(10px)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: "opacity 1100ms cubic-bezier(0.2,0.8,0.2,1), transform 1100ms cubic-bezier(0.2,0.8,0.2,1), filter 1100ms cubic-bezier(0.2,0.8,0.2,1)",
        willChange: "opacity, transform, filter"
      },
      className,
      children
    }
  );
}
function Landing() {
  const [quoteOpen, setQuoteOpen] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Nav, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Hero, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { as: "section", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Offers, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { as: "section", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Showcase, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { as: "section", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Experience360, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { as: "section", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CostTable, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { as: "section", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Calculator, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { as: "section", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Testimonials, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { as: "section", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FinalCTA, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingCTA, { onQuoteClick: () => setQuoteOpen(true) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(OfferPopup, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(QuoteModal, { open: quoteOpen, onClose: () => setQuoteOpen(false) })
  ] });
}
function Nav() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[color-mix(in_oklab,var(--cream)_75%,transparent)] border-b border-border/60", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "#", className: "flex items-center gap-3 min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: vinfastLogo, alt: "VinFast", className: "h-9 w-auto max-w-full object-contain" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-5 w-px bg-border" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-sm font-semibold tracking-wider", children: "VinFast Đô Lương" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "hidden lg:flex items-center gap-10 text-[13px] tracking-wide text-titan", children: ["Ưu đãi", "Mẫu xe", "Chi phí", "Trả góp", "Liên hệ"].map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `#${["offers", "showcase", "cost", "finance", "contact"][i]}`, className: "hover:text-onyx transition-colors duration-300 relative after:absolute after:left-0 after:bottom-[-6px] after:h-px after:w-0 after:bg-gold after:transition-all hover:after:w-full", children: t }, t)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "tel:0921203388", className: "hidden sm:inline-flex items-center gap-2 text-sm font-medium", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-4 h-4 text-gold" }),
      "092.120.3388"
    ] })
  ] }) });
}
function Hero() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative min-h-screen overflow-hidden bg-onyx text-cream", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: heroImg, alt: "VinFast VF 3 trong bối cảnh thành phố hiện đại", width: 1920, height: 1080, className: "w-full h-full object-cover opacity-80" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-onyx via-onyx/70 to-transparent" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-onyx/90 via-transparent to-onyx/40" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative max-w-7xl mx-auto px-6 lg:px-10 pt-40 pb-24 lg:pt-48 lg:pb-32 min-h-screen flex items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl animate-fade-up", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "eyebrow text-gold-soft", children: "New Edition · 2026" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-8 font-display text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.02] font-light text-cream", children: [
        "VinFast ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gold-gradient font-normal", children: "VF 3" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-8 text-lg md:text-xl text-cream/80 font-light leading-relaxed max-w-xl", children: "Giá tốt nhất Nghệ An – Chăm sóc tận tình – Bảo hành tận tâm" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-4 text-[15px] text-cream/60 font-light leading-relaxed max-w-xl whitespace-pre-line", children: [
        "Nhỏ gọn, tinh tế và tối ưu trải nghiệm di chuyển hằng ngày với chi phí vận hành vượt trội.",
        "\n",
        "- Giao xe tận nơi trên toàn Nghệ An."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 flex flex-wrap gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "#contact", className: "btn-luxury bg-gold-gradient !bg-gradient-to-r !from-[oklch(0.86_0.06_85)] !to-[oklch(0.74_0.1_75)] !text-onyx", children: [
          "Nhận báo giá ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#contact", className: "btn-outline-luxury", children: "Đăng ký lái thử" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-20 grid grid-cols-3 gap-8 max-w-lg border-t border-cream/10 pt-8", children: [{
        v: "210",
        u: "km / lần sạc"
      }, {
        v: "32",
        u: "kW công suất"
      }, {
        v: "A+",
        u: "an toàn"
      }].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-3xl text-cream font-light", children: s.v }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] tracking-[0.2em] uppercase text-cream/50 mt-1", children: s.u })
      ] }, s.u)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.4em] text-cream/40 animate-fade-in-slow", children: "SCROLL TO DISCOVER" })
  ] });
}
function Offers() {
  const offers = [{
    tag: "06%",
    title: "Mãnh liệt vì tương lai xanh",
    desc: "Ưu đãi dành cho khách hàng tiên phong chuyển đổi sang phương tiện điện hóa."
  }, {
    tag: "05%",
    title: "Công an & Bộ đội",
    desc: "Tri ân lực lượng vũ trang với chính sách ưu đãi giá trị và đặc quyền riêng."
  }, {
    tag: "03%",
    title: "Mùa hè rực rỡ",
    desc: "Khởi đầu hành trình mới với combo ưu đãi mùa hè giới hạn trong tháng."
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "offers", className: "py-32 lg:py-40 relative", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-6 lg:px-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center max-w-2xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "eyebrow justify-center inline-flex", children: "Privilege" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-6 font-display text-4xl md:text-5xl font-light leading-tight", children: [
        "Chính sách ưu đãi ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("em", { className: "not-italic text-gold-gradient", children: "đặc biệt" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 text-muted-foreground font-light", children: "Những đặc quyền được thiết kế riêng cho khách hàng VinFast, tôn vinh hành trình sở hữu xe đẳng cấp." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-20 grid md:grid-cols-3 gap-6 lg:gap-8", children: offers.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "group relative rounded-2xl p-10 glass-card transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-luxury)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-6xl font-light text-gold-gradient", children: o.tag }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4 text-gold" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-8 font-display text-xl font-medium leading-snug", children: o.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-sm text-muted-foreground leading-relaxed font-light", children: o.desc }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 flex items-center gap-2 text-[11px] tracking-[0.3em] uppercase text-onyx group-hover:text-gold transition-colors", children: [
        "Tìm hiểu thêm ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3 h-3" })
      ] })
    ] }, o.tag)) })
  ] }) });
}
function Experience360() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "experience", className: "py-32 lg:py-40 bg-onyx text-cream relative overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 opacity-60 pointer-events-none", style: {
      background: "radial-gradient(ellipse at 50% 0%, color-mix(in oklab, var(--gold) 12%, transparent), transparent 60%)"
    } }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative max-w-7xl mx-auto px-6 lg:px-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-[1fr_1.6fr] gap-16 lg:gap-24 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "eyebrow", style: {
          color: "color-mix(in oklab, var(--cream) 70%, transparent)"
        }, children: "360° Showroom" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-6 font-display text-4xl md:text-5xl font-light leading-[1.1]", children: [
          "Chiêm ngưỡng ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("em", { className: "not-italic text-gold-gradient", children: "trọn vẹn" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "từng góc nhìn."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-cream/70 font-light leading-relaxed max-w-md", children: "Trải nghiệm tương tác cinematic — kéo để xoay xe theo mọi góc nhìn, cảm nhận từng đường nét tinh xảo của VinFast VF 3 như đang đứng ngay trong showroom." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 flex flex-col gap-4 text-sm text-cream/60 font-light", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-px w-8 bg-gold" }),
            "Thiết kế tối giản chuẩn Urban"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-px w-8 bg-gold" }),
            "Hiện đại & Khác biệt từ mọi góc nhìn"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-px w-8 bg-gold" }),
            "Tinh gọn nhưng đầy cảm hứng."
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Viewer360, {})
    ] }) })
  ] });
}
function Showcase() {
  const points = [{
    icon: Sparkles,
    t: "Thiết kế đô thị hiện đại",
    d: "Đường nét tinh tế, tỉ mỉ trong từng chi tiết."
  }, {
    icon: Battery,
    t: "Tiết kiệm chi phí",
    d: "Vận hành điện hóa, giảm đến 70% chi phí nhiên liệu."
  }, {
    icon: Gauge,
    t: "Công nghệ thông minh",
    d: "Kết nối liền mạch, trải nghiệm trực quan."
  }, {
    icon: ShieldCheck,
    t: "An toàn vượt trội",
    d: "Hệ thống an toàn chủ động, êm ái và bền bỉ."
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "showcase", className: "py-32 lg:py-40 bg-secondary/40", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-16 lg:gap-24 items-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative rounded-2xl overflow-hidden shadow-[var(--shadow-luxury)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("video", { src: showcaseVideo, autoPlay: true, loop: true, muted: true, playsInline: true, className: "w-full h-auto" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute -bottom-8 -right-4 lg:-right-12 glass-card rounded-xl px-8 py-6 max-w-xs hidden sm:block", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] tracking-[0.35em] uppercase text-titan", children: "GIÁ CHỈ TỪ" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-display text-3xl font-light mt-2", children: [
          "260",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-titan ml-1", children: "triệu" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mt-1", children: "Đã bao gồm pin" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "eyebrow", children: "Discover VF 3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-6 font-display text-4xl md:text-5xl font-light leading-[1.1]", children: [
        "Tinh tế trong từng ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("em", { className: "not-italic text-gold-gradient", children: "đường nét" }),
        "."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-muted-foreground font-light leading-relaxed", children: "VinFast VF 3 mang đến phong cách di chuyển hoàn toàn mới — nơi mỗi chi tiết được chăm chút bằng tinh thần thủ công của một thương hiệu xe Việt vươn tầm quốc tế." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 grid sm:grid-cols-2 gap-8", children: points.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0 w-11 h-11 rounded-full border border-gold/40 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(p.icon, { className: "w-4 h-4 text-gold" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-medium", children: p.t }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground mt-1 font-light", children: p.d })
        ] })
      ] }, p.t)) })
    ] })
  ] }) });
}
function CostTable() {
  const rows = [["Chi phí nhiên liệu / 100 km", "≈ 0đ", "≈ 90.000đ"], ["Chi phí bảo dưỡng / năm", "≈ 1.500.000đ", "≈ 5.000.000đ"], ["Công Nghệ", "Hiện đại  ·\nThông minh", "≈ Truyền thống, ít khác biệt"], ["Tiếng ồn khoang lái", "Yên tĩnh tuyệt đối", "Trung bình"], ["Trải nghiệm vận hành", "Êm ái · tức thì", "Độ ì cao"]];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "cost", className: "py-32 lg:py-40", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-6 lg:px-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center max-w-2xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "eyebrow justify-center inline-flex", children: "Ownership" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-6 font-display text-4xl md:text-5xl font-light leading-tight", children: [
        "Chi phí vận hành ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("em", { className: "not-italic text-gold-gradient", children: "tối ưu" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "cho cuộc sống hiện đại."
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-16 rounded-2xl border border-border bg-card overflow-hidden shadow-[var(--shadow-soft)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 px-8 py-6 bg-onyx text-cream text-[11px] tracking-[0.3em] uppercase", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Hạng mục" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center", children: "VinFast VF 3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center", children: "Xe xăng tương đương" })
      ] }),
      rows.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 px-8 py-6 items-center text-sm border-t border-border/70 hover:bg-secondary/40 transition-colors", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground font-light", children: r[0] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center font-medium flex items-center justify-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4 text-gold" }),
          " ",
          r[1]
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center text-titan font-light", children: r[2] })
      ] }, i))
    ] })
  ] }) });
}
function Calculator() {
  const price = 24e7;
  const [down, setDown] = reactExports.useState(30);
  const [months, setMonths] = reactExports.useState(36);
  const [loanQuoteOpen, setLoanQuoteOpen] = reactExports.useState(false);
  const loan = price * (1 - down / 100);
  const baseRate = 85e-4;
  const rateJitter = ((down * 13 + months * 7) % 11 - 5) * 6e-5;
  const rate = Math.max(78e-4, Math.min(92e-4, baseRate + rateJitter));
  const rawMonthly = loan * rate * Math.pow(1 + rate, months) / (Math.pow(1 + rate, months) - 1);
  const monthly = Math.round(rawMonthly / 1e3) * 1e3;
  const downAmount = price * (down / 100);
  const totalPay = monthly * months + downAmount;
  const fmt = (n) => n.toLocaleString("vi-VN") + "đ";
  const summary = `Báo giá trả góp VF 3 — Giá: ${fmt(price)} · Trả trước ${down}% (${fmt(downAmount)}) · Vay ${fmt(loan)} trong ${months} tháng · Lãi suất ước tính ${(rate * 100).toFixed(2)}%/tháng · Trả góp ~${fmt(monthly)}/tháng · Tổng ~${fmt(totalPay)}`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "finance", className: "py-32 lg:py-40 bg-onyx text-cream relative overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 opacity-[0.04] bg-[radial-gradient(circle_at_30%_20%,var(--gold),transparent_60%)]" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-6xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "eyebrow text-gold-soft", children: "Financing" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-6 font-display text-4xl md:text-5xl font-light leading-tight text-cream", children: [
          "Dễ dàng sở hữu ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("em", { className: "not-italic text-gold-gradient", children: "VF 3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "với giải pháp tài chính linh hoạt."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-cream/60 font-light leading-relaxed max-w-md", children: "Tùy chỉnh khoản trả trước và thời hạn vay phù hợp. Hỗ trợ lãi suất ưu đãi từ các ngân hàng đối tác hàng đầu." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-dark rounded-2xl p-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Slider, { label: "Trả trước", value: down, setValue: setDown, min: 10, max: 70, step: 5, suffix: "%" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Slider, { label: "Thời hạn vay", value: months, setValue: setMonths, min: 12, max: 84, step: 6, suffix: " tháng" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 pt-8 border-t border-cream/10 space-y-3 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Trả trước", value: fmt(downAmount) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Khoản vay", value: fmt(loan) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Lãi suất ước tính", value: `${(rate * 100).toFixed(2)}% / tháng` }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-4 mt-2 border-t border-cream/10 flex items-end justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] tracking-[0.3em] uppercase text-cream/50", children: "Trả góp / tháng" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-3xl text-gold-gradient", children: [
              "~",
              fmt(monthly)
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-[11px] text-cream/40 pt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Tổng chi trả ước tính" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "~",
              fmt(totalPay)
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setLoanQuoteOpen(true), className: "mt-8 w-full h-12 rounded-full bg-gradient-to-r from-[oklch(0.86_0.06_85)] to-[oklch(0.74_0.1_75)] text-onyx text-[11px] font-semibold tracking-[0.22em] uppercase flex items-center justify-center gap-2 hover:shadow-[0_12px_40px_-10px_rgba(184,151,90,0.6)] transition-all", children: [
          "TƯ VẤN TRẢ GÓP ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3.5 h-3.5" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-[10.5px] text-cream/40 text-center leading-relaxed", children: "* Con số mang tính tham khảo, có thể thay đổi nhẹ theo chính sách ngân hàng & thời điểm." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(QuoteModal, { open: loanQuoteOpen, onClose: () => setLoanQuoteOpen(false), source: "loan-calculator", eyebrow: "Báo giá trả góp", title: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      "BÁO GIÁ ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gold-gradient", children: "TRẢ GÓP" }),
      " CHÍNH XÁC"
    ] }), subtitle: "Tư vấn viên sẽ liên hệ với phương án trả góp tối ưu nhất", initialNeed: summary })
  ] });
}
function Slider({
  label,
  value,
  setValue,
  min,
  max,
  step,
  suffix
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline justify-between mb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] tracking-[0.3em] uppercase text-cream/60", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-2xl text-cream", children: [
        value,
        suffix
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "range", min, max, step, value, onChange: (e) => setValue(Number(e.target.value)), className: "w-full h-1 rounded-full appearance-none bg-cream/15 accent-[color:var(--gold)] cursor-pointer\n                   [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5\n                   [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[color:var(--gold)]\n                   [&::-webkit-slider-thumb]:shadow-[0_0_0_4px_color-mix(in_oklab,var(--gold)_25%,transparent)]" })
  ] });
}
function Row({
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-cream/70 font-light", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-cream", children: value })
  ] });
}
function Testimonials() {
  const items = [{
    n: "Anh Trần Minh Quân",
    r: "Doanh nhân · Đô Lương",
    q: "VF 3 là minh chứng cho việc xe Việt hoàn toàn có thể cạnh tranh với các thương hiệu quốc tế về thiết kế và trải nghiệm."
  }, {
    n: "Chị Lê Hồng Nhung",
    r: "Giám đốc Marketing · TP.Vinh ",
    q: "Vẻ ngoài thanh lịch, khoang lái tĩnh lặng và chi phí vận hành rất hợp lý cho công việc hằng ngày."
  }, {
    n: "Anh Phạm Văn Hải",
    r: "Kiến trúc sư · Nghệ An",
    q: "Một chiếc xe nhỏ nhưng mang lại cảm giác sở hữu rất cao cấp. Dịch vụ tại VinFast Đô Lương rất chu đáo."
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-32 lg:py-40", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-6 lg:px-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center max-w-2xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "eyebrow justify-center inline-flex", children: "Voices" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-6 font-display text-4xl md:text-5xl font-light leading-tight", children: [
        "Khách hàng ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("em", { className: "not-italic text-gold-gradient", children: "tin chọn" }),
        "."
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-20 grid md:grid-cols-3 gap-8", children: items.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("figure", { className: "rounded-2xl bg-card p-10 border border-border shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-luxury)] transition-all duration-500", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Quote, { className: "w-7 h-7 text-gold opacity-60" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("blockquote", { className: "mt-6 text-[15px] leading-relaxed font-light text-foreground/85", children: [
        '"',
        t.q,
        '"'
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("figcaption", { className: "mt-8 pt-6 border-t border-border flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-11 h-11 rounded-full bg-gradient-to-br from-[oklch(0.86_0.06_85)] to-[oklch(0.74_0.1_75)] flex items-center justify-center text-onyx font-display font-medium", children: t.n.split(" ").slice(-1)[0][0] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-sm", children: t.n }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mt-0.5", children: t.r })
        ] })
      ] })
    ] }, t.n)) })
  ] }) });
}
function FinalCTA() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "contact", className: "relative overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: ctaImg, alt: "", loading: "lazy", width: 1920, height: 1080, className: "w-full h-full object-cover" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-onyx via-onyx/85 to-onyx/40" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-7xl mx-auto px-6 lg:px-10 py-32 lg:py-44 grid lg:grid-cols-2 gap-16 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-cream", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "eyebrow text-gold-soft", children: "Own the experience" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-6 font-display text-4xl md:text-6xl font-light leading-[1.05]", children: [
          "Sở hữu VinFast ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("em", { className: "not-italic text-gold-gradient", children: "VF 3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "ngay hôm nay."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-cream/70 font-light max-w-md leading-relaxed", children: "Trải nghiệm phong cách di chuyển hiện đại với những ưu đãi hấp dẫn chỉ có tại VinFast Đô Lương." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const fd = new FormData(form);
        try {
          await fetch("/api/public/lead", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              name: String(fd.get("name") || ""),
              phone: String(fd.get("phone") || ""),
              need: String(fd.get("need") || ""),
              source: "final-cta"
            })
          });
          form.reset();
          alert("Cảm ơn quý khách. Chúng tôi sẽ liên hệ sớm nhất.");
        } catch {
          alert("Gửi không thành công, vui lòng thử lại hoặc gọi hotline.");
        }
      }, className: "glass-dark rounded-2xl p-8 lg:p-10 space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { name: "name", label: "Họ và tên", placeholder: "Nguyễn Văn A", type: "text" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { name: "phone", label: "Số điện thoại", placeholder: "09xx xxx xxx", type: "tel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[11px] tracking-[0.3em] uppercase text-cream/60 mb-2", children: "Nhu cầu" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { name: "need", className: "w-full bg-transparent border-b border-cream/20 py-3 text-cream focus:border-gold focus:outline-none transition-colors", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { className: "bg-onyx", children: "Nhận báo giá" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { className: "bg-onyx", children: "Đăng ký lái thử" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { className: "bg-onyx", children: "Tư vấn trả góp" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { className: "bg-onyx", children: "Khác" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "submit", className: "btn-luxury w-full bg-gradient-to-r from-[oklch(0.86_0.06_85)] to-[oklch(0.74_0.1_75)] !text-onyx mt-4", children: [
          "Nhận tư vấn ngay ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
        ] })
      ] })
    ] })
  ] });
}
function Field({
  label,
  placeholder,
  type,
  name
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[11px] tracking-[0.3em] uppercase text-cream/60 mb-2", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { name, type, placeholder, required: true, className: "w-full bg-transparent border-b border-cream/20 py-3 text-cream placeholder:text-cream/30 focus:border-gold focus:outline-none transition-colors" })
  ] });
}
function Footer() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "bg-onyx text-cream/80 pt-20 pb-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-6 lg:px-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-3 gap-12 pb-16 border-b border-cream/10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: vinfastLogo, alt: "VinFast", className: "h-10 w-auto max-w-full object-contain" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-5 w-px bg-cream/20 shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-base font-semibold tracking-wider text-cream", children: "VinFast Đô Lương" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-sm font-light text-cream/60 leading-relaxed max-w-xs", children: "Đại lý ủy quyền chính thức của VinFast tại Nghệ An. Đồng hành cùng hành trình điện hóa tương lai." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] tracking-[0.3em] uppercase text-gold mb-5", children: "Liên hệ" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-4 text-sm font-light", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4 text-gold shrink-0 mt-0.5" }),
            "Trục Đường 7B, Khối 6 Thị Trấn,",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            "Đô Lương, Nghệ An"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-4 h-4 text-gold shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "Kinh doanh: ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "tel:0921203388", className: "text-cream hover:text-gold", children: "092.120.3388" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-4 h-4 text-gold shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "Dịch vụ: ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "tel:0898605868", className: "text-cream hover:text-gold", children: "0898.605.868" })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] tracking-[0.3em] uppercase text-gold mb-5", children: "Kết nối" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-3", children: [{
          i: MapPin,
          href: "https://maps.google.com/?q=VinFast+Đô+Lương+Nghệ+An",
          l: "Maps"
        }, {
          i: Facebook,
          href: "#",
          l: "Facebook"
        }, {
          i: MessageCircle,
          href: "#",
          l: "Zalo"
        }].map(({
          i: Ico,
          href,
          l
        }) => /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href, "aria-label": l, className: "w-11 h-11 rounded-full border border-cream/15 flex items-center justify-center hover:border-gold hover:text-gold transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Ico, { className: "w-4 h-4" }) }, l)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-cream/40", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "© 2026 VinFast Đô Lương. Đại lý ủy quyền chính thức." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tracking-[0.3em] uppercase", children: "Mãnh liệt tinh hoa Việt Nam" })
    ] })
  ] }) });
}
export {
  Landing as component
};
