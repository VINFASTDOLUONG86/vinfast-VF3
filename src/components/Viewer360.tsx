import { useEffect, useRef, useState } from "react";
import { RotateCw } from "lucide-react";

import f0 from "@/assets/vf3-360/frame-00.jpg";
import f1 from "@/assets/vf3-360/frame-01.jpg";
import f2 from "@/assets/vf3-360/frame-02.jpg";
import f3 from "@/assets/vf3-360/frame-03.jpg";
import f4 from "@/assets/vf3-360/frame-04.jpg";
import f5 from "@/assets/vf3-360/frame-05.jpg";
import f6 from "@/assets/vf3-360/frame-06.jpg";
import f7 from "@/assets/vf3-360/frame-07.jpg";

const FRAMES = [f0, f1, f2, f3, f4, f5, f6, f7];
const N = FRAMES.length;

// Premium feel: slow rotation. Higher value = slower rotation.
const PIXELS_PER_FRAME = 60;
// Inertia decay per frame (60fps). Lower = stops faster.
const FRICTION = 0.94;
// Idle auto-rotate speed in frames per second.
const IDLE_SPEED = 0.35;
const IDLE_DELAY_MS = 2200;

export function Viewer360() {
  const [loaded, setLoaded] = useState(0);
  const [index, setIndex] = useState(0);
  const [dragging, setDragging] = useState(false);

  const indexRef = useRef(0); // float index
  const velocityRef = useRef(0); // frames per tick
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const idleTimerRef = useRef<number | null>(null);
  const interactedRef = useRef(false);
  const autoRotatingRef = useRef(true);

  // Preload all frames
  useEffect(() => {
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

  // Animation loop: inertia + idle auto rotate
  useEffect(() => {
    const tick = () => {
      let v = velocityRef.current;

      if (!dragging) {
        if (Math.abs(v) > 0.002) {
          v *= FRICTION;
          velocityRef.current = v;
          indexRef.current = mod(indexRef.current + v, N);
          setIndex(Math.floor(indexRef.current));
        } else if (autoRotatingRef.current && !interactedRef.current) {
          // gentle idle drift (frames per 16ms)
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

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
    setDragging(true);
    interactedRef.current = true;
    velocityRef.current = 0;
    lastXRef.current = e.clientX;
    lastTimeRef.current = performance.now();
    if (idleTimerRef.current) window.clearTimeout(idleTimerRef.current);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    const now = performance.now();
    const dx = e.clientX - lastXRef.current;
    const dt = Math.max(1, now - lastTimeRef.current);
    const frameDelta = dx / PIXELS_PER_FRAME;
    indexRef.current = mod(indexRef.current - frameDelta, N);
    setIndex(Math.floor(indexRef.current));
    // velocity in frames per ~16ms
    velocityRef.current = (-frameDelta * 16) / dt;
    lastXRef.current = e.clientX;
    lastTimeRef.current = now;
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    try {
      (e.currentTarget as HTMLDivElement).releasePointerCapture(e.pointerId);
    } catch {}
    setDragging(false);
    // dampen initial velocity for premium slow feel
    velocityRef.current *= 0.6;
    scheduleIdleResume();
  };

  const progress = Math.round((loaded / N) * 100);
  const isReady = loaded >= N;

  return (
    <div className="relative">
      {/* Stage */}
      <div
        className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl select-none touch-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, oklch(0.28 0.006 240) 0%, oklch(0.14 0.005 240) 70%, oklch(0.1 0.005 240) 100%)",
          boxShadow: "var(--shadow-luxury)",
          cursor: dragging ? "grabbing" : "grab",
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {/* Frame stack (all decoded, swap via opacity for zero flicker) */}
        {FRAMES.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={i === 0 ? "VinFast VF 3 — góc nhìn 360°" : ""}
            draggable={false}
            width={1280}
            height={768}
            loading={i === 0 ? "eager" : "lazy"}
            decoding="async"
            className="absolute inset-0 h-full w-full object-contain transition-opacity duration-75"
            style={{ opacity: i === index ? 1 : 0, willChange: "opacity" }}
          />
        ))}

        {/* Luxury reflections / vignette */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 110%, color-mix(in oklab, var(--gold) 18%, transparent) 0%, transparent 55%), linear-gradient(180deg, transparent 60%, oklch(0 0 0 / 0.35) 100%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-60"
          style={{
            background:
              "linear-gradient(115deg, transparent 30%, color-mix(in oklab, white 14%, transparent) 50%, transparent 70%)",
          }}
        />

        {/* Floor reflection bar */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent" />

        {/* Loader overlay */}
        {!isReady && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-onyx/40 backdrop-blur-sm">
            <div className="text-[10px] tracking-[0.32em] text-cream/80 uppercase mb-3">
              Đang tải trải nghiệm 360°
            </div>
            <div className="h-px w-40 bg-cream/15 overflow-hidden">
              <div
                className="h-full bg-gold-soft transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* HUD */}
        <div className="absolute top-5 left-5 flex items-center gap-2 text-[10px] tracking-[0.3em] text-cream/70 uppercase">
          <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
          Xoay 360°
        </div>
        <div className="absolute top-5 right-5 text-[10px] tracking-[0.3em] text-cream/60 uppercase tabular-nums">
          {String(Math.round((index / N) * 360)).padStart(3, "0")}°
        </div>

        {/* Drag hint */}
        <div
          className={`absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-cream/70 transition-opacity duration-500 ${
            interactedRef.current ? "opacity-0" : "opacity-100"
          }`}
        >
          <RotateCw className="h-3 w-3 text-gold" />
          Kéo để xoay
        </div>

        {/* Progress ring (frame indicator) */}
        <div className="absolute bottom-5 right-5 flex items-center gap-1.5">
          {FRAMES.map((_, i) => (
            <span
              key={i}
              className="h-px transition-all duration-300"
              style={{
                width: i === index ? 18 : 8,
                background:
                  i === index
                    ? "var(--gold)"
                    : "color-mix(in oklab, white 25%, transparent)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}
