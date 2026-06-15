import { useEffect, useRef, useState } from "react";
import { X, Sparkles, ArrowRight } from "lucide-react";

export function OfferPopup() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const shown = useRef(false);

  useEffect(() => {
    if (shown.current) return;
    if (typeof window !== "undefined" && sessionStorage.getItem("vf3_popup_shown")) return;
    const t = setTimeout(() => {
      shown.current = true;
      setOpen(true);
      try {
        sessionStorage.setItem("vf3_popup_shown", "1");
      } catch {}
    }, 5000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
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
    "Ưu đãi 3% — Mùa hè rực rỡ",
  ];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-[fade-in-slow_0.4s_ease-out]"
      role="dialog"
      aria-modal="true"
    >
      <button
        aria-label="Đóng"
        onClick={() => setOpen(false)}
        className="absolute inset-0 bg-onyx/70 backdrop-blur-md"
      />
      <div
        className="relative w-full max-w-md rounded-2xl overflow-hidden border border-[color-mix(in_oklab,var(--gold)_35%,transparent)] shadow-[0_40px_120px_-30px_rgba(0,0,0,0.7)] animate-[scale-in_0.45s_cubic-bezier(0.2,0.8,0.2,1)]"
        style={{
          background:
            "linear-gradient(160deg, oklch(0.22 0.006 240 / 0.95), oklch(0.12 0.005 240 / 0.95))",
          backdropFilter: "blur(24px)",
        }}
      >
        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-cream/80 hover:text-cream flex items-center justify-center transition-all"
          aria-label="Đóng"
        >
          <X className="w-4 h-4" />
        </button>

        {/* gold accent line */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-gold to-transparent" />

        <div className="p-7 sm:p-9 text-cream">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span className="text-[10px] tracking-[0.32em] uppercase text-gold-soft">
              Ưu đãi giới hạn
            </span>
          </div>

          <h3 className="font-display text-2xl sm:text-[1.7rem] leading-tight tracking-tight">
            NHẬN ƯU ĐÃI <span className="text-gold-gradient">VF 3</span> NGAY HÔM NAY
          </h3>
          <p className="mt-3 text-[12.5px] tracking-[0.12em] uppercase text-cream/70 leading-relaxed">
            Giá tốt hàng đầu thị trường — Chính sách hậu mãi vượt trội
          </p>

          {!submitted ? (
            <>
              <ul className="mt-6 space-y-2.5">
                {offers.map((o) => (
                  <li
                    key={o}
                    className="flex items-start gap-3 text-sm text-cream/85 border-l border-gold/40 pl-3"
                  >
                    <span>{o}</span>
                  </li>
                ))}
              </ul>

              <form
                onSubmit={async (e) => {
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
                        source: "popup",
                      }),
                    });
                  } catch {}
                  setSubmitted(true);
                  setTimeout(() => setOpen(false), 2200);
                }}
                className="mt-7 space-y-3"
              >
                <input
                  required
                  name="name"
                  type="text"
                  placeholder="Họ và tên"
                  className="w-full h-11 px-4 rounded-full bg-white/5 border border-white/15 text-cream placeholder:text-cream/40 text-sm focus:outline-none focus:border-gold/70 transition-colors"
                />
                <input
                  required
                  name="phone"
                  type="tel"
                  pattern="[0-9 +]{8,}"
                  placeholder="Số điện thoại"
                  className="w-full h-11 px-4 rounded-full bg-white/5 border border-white/15 text-cream placeholder:text-cream/40 text-sm focus:outline-none focus:border-gold/70 transition-colors"
                />
                <button
                  type="submit"
                  className="w-full h-11 rounded-full bg-gradient-to-r from-[oklch(0.86_0.06_85)] to-[oklch(0.74_0.1_75)] text-onyx text-[11px] font-semibold tracking-[0.22em] uppercase flex items-center justify-center gap-2 hover:shadow-[0_12px_40px_-10px_rgba(184,151,90,0.6)] transition-all"
                >
                  Nhận tư vấn ngay <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
              <p className="mt-4 text-[10.5px] text-cream/45 tracking-wide text-center">
                Thông tin của bạn được bảo mật tuyệt đối
              </p>
            </>
          ) : (
            <div className="mt-8 text-center py-6">
              <div className="mx-auto w-12 h-12 rounded-full bg-gold/15 border border-gold/40 flex items-center justify-center mb-4">
                <Sparkles className="w-5 h-5 text-gold" />
              </div>
              <p className="text-sm text-cream/90">
                Cảm ơn quý khách! Chúng tôi sẽ liên hệ trong ít phút.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
