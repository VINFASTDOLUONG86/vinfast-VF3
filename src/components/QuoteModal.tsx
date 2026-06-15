import { useEffect, useState } from "react";
import { X, FileText, ArrowRight, Check } from "lucide-react";

interface QuoteModalProps {
  open: boolean;
  onClose: () => void;
  initialNeed?: string;
  source?: string;
  eyebrow?: string;
  title?: React.ReactNode;
  subtitle?: string;
}

export function QuoteModal({
  open,
  onClose,
  initialNeed = "",
  source = "quote-modal",
  eyebrow = "Báo giá nhanh",
  title,
  subtitle = "Nhận báo giá chi tiết & ưu đãi mới nhất trong vòng 24 giờ",
}: QuoteModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) {
      setSubmitted(false);
      setLoading(false);
      return;
    }
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-[fade-in-slow_0.4s_ease-out]"
      role="dialog"
      aria-modal="true"
    >
      <button
        aria-label="Đóng"
        onClick={onClose}
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
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-cream/80 hover:text-cream flex items-center justify-center transition-all"
          aria-label="Đóng"
        >
          <X className="w-4 h-4" />
        </button>

        {/* gold accent line */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-gold to-transparent" />

        <div className="p-7 sm:p-9 text-cream">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-3.5 h-3.5 text-gold" />
            <span className="text-[10px] tracking-[0.32em] uppercase text-gold-soft">
              {eyebrow}
            </span>
          </div>

          <h3 className="font-display text-2xl sm:text-[1.7rem] leading-tight tracking-tight">
            {title ?? (
              <>YÊU CẦU <span className="text-gold-gradient">BÁO GIÁ</span> VF 3</>
            )}
          </h3>
          <p className="mt-3 text-[12.5px] tracking-[0.12em] uppercase text-cream/70 leading-relaxed">
            {subtitle}
          </p>

          {!submitted ? (
            <form
              onSubmit={async (e) => {
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
                      source,
                    }),
                  });
                } catch {}
                setLoading(false);
                setSubmitted(true);
                setTimeout(() => onClose(), 2500);
              }}
              className="mt-7 space-y-4"
            >
              <div>
                <label className="block text-[11px] tracking-[0.25em] uppercase text-cream/50 mb-2">
                  Họ và tên
                </label>
                <input
                  required
                  name="name"
                  type="text"
                  placeholder="Nguyễn Văn A"
                  className="w-full h-11 px-4 rounded-full bg-white/5 border border-white/15 text-cream placeholder:text-cream/40 text-sm focus:outline-none focus:border-gold/70 transition-colors"
                />
              </div>
              <div>
                <label className="block text-[11px] tracking-[0.25em] uppercase text-cream/50 mb-2">
                  Số điện thoại
                </label>
                <input
                  required
                  name="phone"
                  type="tel"
                  pattern="[0-9 +]{8,}"
                  placeholder="09xx xxx xxx"
                  className="w-full h-11 px-4 rounded-full bg-white/5 border border-white/15 text-cream placeholder:text-cream/40 text-sm focus:outline-none focus:border-gold/70 transition-colors"
                />
              </div>
              <div>
                <label className="block text-[11px] tracking-[0.25em] uppercase text-cream/50 mb-2">
                  Nhu cầu / Ghi chú
                </label>
                <textarea
                  name="need"
                  rows={3}
                  defaultValue={initialNeed}
                  placeholder="Mua trả thẳng, trả góp, màu sắc ưa thích..."
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-cream placeholder:text-cream/40 text-sm focus:outline-none focus:border-gold/70 transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full h-11 rounded-full bg-gradient-to-r from-[oklch(0.86_0.06_85)] to-[oklch(0.74_0.1_75)] text-onyx text-[11px] font-semibold tracking-[0.22em] uppercase flex items-center justify-center gap-2 hover:shadow-[0_12px_40px_-10px_rgba(184,151,90,0.6)] transition-all disabled:opacity-60"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-onyx/30 border-t-onyx rounded-full animate-spin" />
                    Đang gửi...
                  </span>
                ) : (
                  <>
                    Gửi yêu cầu báo giá <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="mt-8 text-center py-6">
              <div className="mx-auto w-12 h-12 rounded-full bg-gold/15 border border-gold/40 flex items-center justify-center mb-4">
                <Check className="w-5 h-5 text-gold" />
              </div>
              <p className="text-sm text-cream/90">
                Cảm ơn quý khách! Chúng tôi sẽ gửi báo giá trong thời gian sớm nhất.
              </p>
            </div>
          )}
          {!submitted && (
            <p className="mt-4 text-[10.5px] text-cream/45 tracking-wide text-center">
              Thông tin của bạn được bảo mật tuyệt đối
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
