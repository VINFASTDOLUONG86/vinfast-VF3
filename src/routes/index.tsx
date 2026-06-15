import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Phone,
  MapPin,
  Facebook,
  MessageCircle,
  ArrowRight,
  Check,
  Sparkles,
  Battery,
  Gauge,
  ShieldCheck,
  Quote,
} from "lucide-react";
import heroImg from "@/assets/vf3-hero.jpg";
import showcaseVideo from "@/assets/video/video.mp4";
import ctaImg from "@/assets/vf3-cta.jpg";
import vinfastLogo from "@/assets/Logo.png";
import { Viewer360 } from "@/components/Viewer360";
import { FloatingCTA } from "@/components/FloatingCTA";
import { OfferPopup } from "@/components/OfferPopup";
import { QuoteModal } from "@/components/QuoteModal";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VinFast VF 3 — Đẳng cấp đô thị hiện đại | VinFast Đô Lương" },
      {
        name: "description",
        content:
          "Khám phá VinFast VF 3 — mẫu xe điện đô thị thanh lịch, tiết kiệm và đẳng cấp. Ưu đãi đặc biệt, lái thử và báo giá tại VinFast Đô Lương, Nghệ An.",
      },
      { property: "og:title", content: "VinFast VF 3 — Đẳng cấp đô thị hiện đại" },
      {
        property: "og:description",
        content: "Giá tốt nhất Nghệ An – Chăm sóc tận tình – Bảo hành tận tâm",
      },
      { property: "og:image", content: heroImg },
    ],
  }),
  component: Landing,
});

function Landing() {
  const [quoteOpen, setQuoteOpen] = useState(false);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <Reveal as="section"><Offers /></Reveal>
      <Reveal as="section"><Showcase /></Reveal>
      <Reveal as="section"><Experience360 /></Reveal>
      <Reveal as="section"><CostTable /></Reveal>
      <Reveal as="section"><Calculator /></Reveal>
      <Reveal as="section"><Testimonials /></Reveal>
      <Reveal as="section"><FinalCTA /></Reveal>
      <Footer />
      <FloatingCTA onQuoteClick={() => setQuoteOpen(true)} />
      <OfferPopup />
      <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </div>
  );
}

/* ─────────── NAV ─────────── */
function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[color-mix(in_oklab,var(--cream)_75%,transparent)] border-b border-border/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 min-w-0">
          <img src={vinfastLogo} alt="VinFast" className="h-9 w-auto max-w-full object-contain" />
          <span className="h-5 w-px bg-border" />
          <span className="font-display text-sm font-semibold tracking-wider">VinFast Đô Lương</span>
        </a>
        <nav className="hidden lg:flex items-center gap-10 text-[13px] tracking-wide text-titan">
          {["Ưu đãi", "Mẫu xe", "Chi phí", "Trả góp", "Liên hệ"].map((t, i) => (
            <a
              key={t}
              href={`#${["offers", "showcase", "cost", "finance", "contact"][i]}`}
              className="hover:text-onyx transition-colors duration-300 relative after:absolute after:left-0 after:bottom-[-6px] after:h-px after:w-0 after:bg-gold after:transition-all hover:after:w-full"
            >
              {t}
            </a>
          ))}
        </nav>
        <a href="tel:0921203388" className="hidden sm:inline-flex items-center gap-2 text-sm font-medium">
          <Phone className="w-4 h-4 text-gold" />
          092.120.3388
        </a>
      </div>
    </header>
  );
}

/* ─────────── HERO ─────────── */
function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-onyx text-cream">
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="VinFast VF 3 trong bối cảnh thành phố hiện đại"
          width={1920}
          height={1080}
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-onyx via-onyx/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-onyx/90 via-transparent to-onyx/40" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-40 pb-24 lg:pt-48 lg:pb-32 min-h-screen flex items-center">
        <div className="max-w-2xl animate-fade-up">
          <span className="eyebrow text-gold-soft">New Edition · 2026</span>
          <h1 className="mt-8 font-display text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.02] font-light text-cream">
            VinFast <span className="text-gold-gradient font-normal">VF 3</span>
          </h1>
          <p className="mt-8 text-lg md:text-xl text-cream/80 font-light leading-relaxed max-w-xl">
            Giá tốt nhất Nghệ An – Chăm sóc tận tình – Bảo hành tận tâm
          </p>
          <p className="mt-4 text-[15px] text-cream/60 font-light leading-relaxed max-w-xl whitespace-pre-line">
            Nhỏ gọn, tinh tế và tối ưu trải nghiệm di chuyển hằng ngày với chi phí vận hành vượt trội.
            {"\n"}- Giao xe tận nơi trên toàn Nghệ An.
          </p>

          <div className="mt-12 flex flex-wrap gap-4">
            <a href="#contact" className="btn-luxury bg-gold-gradient !bg-gradient-to-r !from-[oklch(0.86_0.06_85)] !to-[oklch(0.74_0.1_75)] !text-onyx">
              Nhận báo giá <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#contact" className="btn-outline-luxury">
              Đăng ký lái thử
            </a>
          </div>

          <div className="mt-20 grid grid-cols-3 gap-8 max-w-lg border-t border-cream/10 pt-8">
            {[
              { v: "210", u: "km / lần sạc" },
              { v: "32", u: "kW công suất" },
              { v: "A+", u: "an toàn" },
            ].map((s) => (
              <div key={s.u}>
                <div className="font-display text-3xl text-cream font-light">{s.v}</div>
                <div className="text-[11px] tracking-[0.2em] uppercase text-cream/50 mt-1">
                  {s.u}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.4em] text-cream/40 animate-fade-in-slow">
        SCROLL TO DISCOVER
      </div>
    </section>
  );
}

/* ─────────── OFFERS ─────────── */
function Offers() {
  const offers = [
    {
      tag: "06%",
      title: "Mãnh liệt vì tương lai xanh",
      desc: "Ưu đãi dành cho khách hàng tiên phong chuyển đổi sang phương tiện điện hóa.",
    },
    {
      tag: "05%",
      title: "Công an & Bộ đội",
      desc: "Tri ân lực lượng vũ trang với chính sách ưu đãi giá trị và đặc quyền riêng.",
    },
    {
      tag: "03%",
      title: "Mùa hè rực rỡ",
      desc: "Khởi đầu hành trình mới với combo ưu đãi mùa hè giới hạn trong tháng.",
    },
  ];
  return (
    <section id="offers" className="py-32 lg:py-40 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center max-w-2xl mx-auto">
          <span className="eyebrow justify-center inline-flex">Privilege</span>
          <h2 className="mt-6 font-display text-4xl md:text-5xl font-light leading-tight">
            Chính sách ưu đãi <em className="not-italic text-gold-gradient">đặc biệt</em>
          </h2>
          <p className="mt-5 text-muted-foreground font-light">
            Những đặc quyền được thiết kế riêng cho khách hàng VinFast,
            tôn vinh hành trình sở hữu xe đẳng cấp.
          </p>
        </div>

        <div className="mt-20 grid md:grid-cols-3 gap-6 lg:gap-8">
          {offers.map((o) => (
            <article
              key={o.tag}
              className="group relative rounded-2xl p-10 glass-card transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-luxury)]"
            >
              <div className="flex items-baseline gap-3">
                <span className="font-display text-6xl font-light text-gold-gradient">
                  {o.tag}
                </span>
                <Sparkles className="w-4 h-4 text-gold" />
              </div>
              <h3 className="mt-8 font-display text-xl font-medium leading-snug">
                {o.title}
              </h3>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed font-light">
                {o.desc}
              </p>
              <div className="mt-10 flex items-center gap-2 text-[11px] tracking-[0.3em] uppercase text-onyx group-hover:text-gold transition-colors">
                Tìm hiểu thêm <ArrowRight className="w-3 h-3" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────── EXPERIENCE 360 ─────────── */
function Experience360() {
  return (
    <section id="experience" className="py-32 lg:py-40 bg-onyx text-cream relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-60 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, color-mix(in oklab, var(--gold) 12%, transparent), transparent 60%)",
        }}
      />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-[1fr_1.6fr] gap-16 lg:gap-24 items-center">
          <div>
            <span className="eyebrow" style={{ color: "color-mix(in oklab, var(--cream) 70%, transparent)" }}>
              360° Showroom
            </span>
            <h2 className="mt-6 font-display text-4xl md:text-5xl font-light leading-[1.1]">
              Chiêm ngưỡng <em className="not-italic text-gold-gradient">trọn vẹn</em>
              <br />từng góc nhìn.
            </h2>
            <p className="mt-6 text-cream/70 font-light leading-relaxed max-w-md">
              Trải nghiệm tương tác cinematic — kéo để xoay xe theo mọi góc nhìn,
              cảm nhận từng đường nét tinh xảo của VinFast VF 3 như đang đứng
              ngay trong showroom.
            </p>
            <div className="mt-10 flex flex-col gap-4 text-sm text-cream/60 font-light">
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-gold" />
                Thiết kế tối giản chuẩn Urban
              </div>
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-gold" />
                Hiện đại & Khác biệt từ mọi góc nhìn
              </div>
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-gold" />
                Tinh gọn nhưng đầy cảm hứng.
              </div>
            </div>
          </div>
          <Viewer360 />
        </div>
      </div>
    </section>
  );
}

/* ─────────── SHOWCASE ─────────── */
function Showcase() {
  const points = [
    { icon: Sparkles, t: "Thiết kế đô thị hiện đại", d: "Đường nét tinh tế, tỉ mỉ trong từng chi tiết." },
    { icon: Battery, t: "Tiết kiệm chi phí", d: "Vận hành điện hóa, giảm đến 70% chi phí nhiên liệu." },
    { icon: Gauge, t: "Công nghệ thông minh", d: "Kết nối liền mạch, trải nghiệm trực quan." },
    { icon: ShieldCheck, t: "An toàn vượt trội", d: "Hệ thống an toàn chủ động, êm ái và bền bỉ." },
  ];
  return (
    <section id="showcase" className="py-32 lg:py-40 bg-secondary/40">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        <div className="relative">
          <div className="relative rounded-2xl overflow-hidden shadow-[var(--shadow-luxury)]">
            <video
              src={showcaseVideo}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto"
            />
          </div>
          <div className="absolute -bottom-8 -right-4 lg:-right-12 glass-card rounded-xl px-8 py-6 max-w-xs hidden sm:block">
            <div className="text-[10px] tracking-[0.35em] uppercase text-titan">GIÁ CHỈ TỪ</div>
            <div className="font-display text-3xl font-light mt-2">260<span className="text-sm text-titan ml-1">triệu</span></div>
            <div className="text-xs text-muted-foreground mt-1">Đã bao gồm pin</div>
          </div>
        </div>

        <div>
          <span className="eyebrow">Discover VF 3</span>
          <h2 className="mt-6 font-display text-4xl md:text-5xl font-light leading-[1.1]">
            Tinh tế trong từng <em className="not-italic text-gold-gradient">đường nét</em>.
          </h2>
          <p className="mt-6 text-muted-foreground font-light leading-relaxed">
            VinFast VF 3 mang đến phong cách di chuyển hoàn toàn mới —
            nơi mỗi chi tiết được chăm chút bằng tinh thần thủ công
            của một thương hiệu xe Việt vươn tầm quốc tế.
          </p>
          <div className="mt-12 grid sm:grid-cols-2 gap-8">
            {points.map((p) => (
              <div key={p.t} className="flex gap-4">
                <div className="shrink-0 w-11 h-11 rounded-full border border-gold/40 flex items-center justify-center">
                  <p.icon className="w-4 h-4 text-gold" />
                </div>
                <div>
                  <div className="font-display font-medium">{p.t}</div>
                  <div className="text-sm text-muted-foreground mt-1 font-light">{p.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────── COST ─────────── */
function CostTable() {
  const rows = [
    ["Chi phí nhiên liệu / 100 km", "≈ 0đ", "≈ 90.000đ"],
    ["Chi phí bảo dưỡng / năm", "≈ 1.500.000đ", "≈ 5.000.000đ"],
    ["Công Nghệ", "Hiện đại\u00A0 ·\nThông minh", "≈ Truyền thống, ít khác biệt"],
    ["Tiếng ồn khoang lái", "Yên tĩnh tuyệt đối", "Trung bình"],
    ["Trải nghiệm vận hành", "Êm ái · tức thì", "Độ ì cao"],
  ];
  return (
    <section id="cost" className="py-32 lg:py-40">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <div className="text-center max-w-2xl mx-auto">
          <span className="eyebrow justify-center inline-flex">Ownership</span>
          <h2 className="mt-6 font-display text-4xl md:text-5xl font-light leading-tight">
            Chi phí vận hành <em className="not-italic text-gold-gradient">tối ưu</em><br />
            cho cuộc sống hiện đại.
          </h2>
        </div>

        <div className="mt-16 rounded-2xl border border-border bg-card overflow-hidden shadow-[var(--shadow-soft)]">
          <div className="grid grid-cols-3 px-8 py-6 bg-onyx text-cream text-[11px] tracking-[0.3em] uppercase">
            <div>Hạng mục</div>
            <div className="text-center">VinFast VF 3</div>
            <div className="text-center">Xe xăng tương đương</div>
          </div>
          {rows.map((r, i) => (
            <div
              key={i}
              className="grid grid-cols-3 px-8 py-6 items-center text-sm border-t border-border/70 hover:bg-secondary/40 transition-colors"
            >
              <div className="text-muted-foreground font-light">{r[0]}</div>
              <div className="text-center font-medium flex items-center justify-center gap-2">
                <Check className="w-4 h-4 text-gold" /> {r[1]}
              </div>
              <div className="text-center text-titan font-light">{r[2]}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────── CALCULATOR ─────────── */
function Calculator() {
  const price = 240_000_000;
  const [down, setDown] = useState(30);
  const [months, setMonths] = useState(36);
  const [loanQuoteOpen, setLoanQuoteOpen] = useState(false);

  const loan = price * (1 - down / 100);
  // Lãi suất ưu đãi thực tế dao động nhẹ theo kỳ hạn (0.78% – 0.92% / tháng)
  const baseRate = 0.0085;
  const rateJitter = (((down * 13 + months * 7) % 11) - 5) * 0.00006; // ±0.00033
  const rate = Math.max(0.0078, Math.min(0.0092, baseRate + rateJitter));
  const rawMonthly = (loan * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
  // Làm tròn đến 1.000đ cho thực tế
  const monthly = Math.round(rawMonthly / 1000) * 1000;
  const downAmount = price * (down / 100);
  const totalPay = monthly * months + downAmount;
  const fmt = (n: number) => n.toLocaleString("vi-VN") + "đ";

  const summary =
    `Báo giá trả góp VF 3 — ` +
    `Giá: ${fmt(price)} · Trả trước ${down}% (${fmt(downAmount)}) · ` +
    `Vay ${fmt(loan)} trong ${months} tháng · ` +
    `Lãi suất ước tính ${(rate * 100).toFixed(2)}%/tháng · ` +
    `Trả góp ~${fmt(monthly)}/tháng · Tổng ~${fmt(totalPay)}`;

  return (
    <section id="finance" className="py-32 lg:py-40 bg-onyx text-cream relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(circle_at_30%_20%,var(--gold),transparent_60%)]" />
      <div className="relative max-w-6xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <span className="eyebrow text-gold-soft">Financing</span>
          <h2 className="mt-6 font-display text-4xl md:text-5xl font-light leading-tight text-cream">
            Dễ dàng sở hữu <em className="not-italic text-gold-gradient">VF 3</em><br />
            với giải pháp tài chính linh hoạt.
          </h2>
          <p className="mt-6 text-cream/60 font-light leading-relaxed max-w-md">
            Tùy chỉnh khoản trả trước và thời hạn vay phù hợp.
            Hỗ trợ lãi suất ưu đãi từ các ngân hàng đối tác hàng đầu.
          </p>
        </div>

        <div className="glass-dark rounded-2xl p-10">
          <div className="space-y-10">
            <Slider label="Trả trước" value={down} setValue={setDown} min={10} max={70} step={5} suffix="%" />
            <Slider label="Thời hạn vay" value={months} setValue={setMonths} min={12} max={84} step={6} suffix=" tháng" />
          </div>

          <div className="mt-10 pt-8 border-t border-cream/10 space-y-3 text-sm">
            <Row label="Trả trước" value={fmt(downAmount)} />
            <Row label="Khoản vay" value={fmt(loan)} />
            <Row label="Lãi suất ước tính" value={`${(rate * 100).toFixed(2)}% / tháng`} />
            <div className="pt-4 mt-2 border-t border-cream/10 flex items-end justify-between">
              <span className="text-[11px] tracking-[0.3em] uppercase text-cream/50">Trả góp / tháng</span>
              <span className="font-display text-3xl text-gold-gradient">~{fmt(monthly)}</span>
            </div>
            <div className="flex justify-between text-[11px] text-cream/40 pt-1">
              <span>Tổng chi trả ước tính</span>
              <span>~{fmt(totalPay)}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setLoanQuoteOpen(true)}
            className="mt-8 w-full h-12 rounded-full bg-gradient-to-r from-[oklch(0.86_0.06_85)] to-[oklch(0.74_0.1_75)] text-onyx text-[11px] font-semibold tracking-[0.22em] uppercase flex items-center justify-center gap-2 hover:shadow-[0_12px_40px_-10px_rgba(184,151,90,0.6)] transition-all"
          >
            TƯ VẤN TRẢ GÓP <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <p className="mt-3 text-[10.5px] text-cream/40 text-center leading-relaxed">
            * Con số mang tính tham khảo, có thể thay đổi nhẹ theo chính sách ngân hàng & thời điểm.
          </p>
        </div>
      </div>

      <QuoteModal
        open={loanQuoteOpen}
        onClose={() => setLoanQuoteOpen(false)}
        source="loan-calculator"
        eyebrow="Báo giá trả góp"
        title={<>BÁO GIÁ <span className="text-gold-gradient">TRẢ GÓP</span> CHÍNH XÁC</>}
        subtitle="Tư vấn viên sẽ liên hệ với phương án trả góp tối ưu nhất"
        initialNeed={summary}
      />
    </section>
  );
}

function Slider({
  label, value, setValue, min, max, step, suffix,
}: { label: string; value: number; setValue: (n: number) => void; min: number; max: number; step: number; suffix: string }) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-3">
        <span className="text-[11px] tracking-[0.3em] uppercase text-cream/60">{label}</span>
        <span className="font-display text-2xl text-cream">{value}{suffix}</span>
      </div>
      <input
        type="range"
        min={min} max={max} step={step}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="w-full h-1 rounded-full appearance-none bg-cream/15 accent-[color:var(--gold)] cursor-pointer
                   [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5
                   [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[color:var(--gold)]
                   [&::-webkit-slider-thumb]:shadow-[0_0_0_4px_color-mix(in_oklab,var(--gold)_25%,transparent)]"
      />
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-cream/70 font-light">
      <span>{label}</span><span className="text-cream">{value}</span>
    </div>
  );
}

/* ─────────── TESTIMONIALS ─────────── */
function Testimonials() {
  const items = [
    {
      n: "Anh Trần Minh Quân",
      r: "Doanh nhân · Đô Lương",
      q: "VF 3 là minh chứng cho việc xe Việt hoàn toàn có thể cạnh tranh với các thương hiệu quốc tế về thiết kế và trải nghiệm.",
    },
    {
      n: "Chị Lê Hồng Nhung",
      r: "Giám đốc Marketing · TP.Vinh\u00a0",
      q: "Vẻ ngoài thanh lịch, khoang lái tĩnh lặng và chi phí vận hành rất hợp lý cho công việc hằng ngày.",
    },
    {
      n: "Anh Phạm Văn Hải",
      r: "Kiến trúc sư · Nghệ An",
      q: "Một chiếc xe nhỏ nhưng mang lại cảm giác sở hữu rất cao cấp. Dịch vụ tại VinFast Đô Lương rất chu đáo.",
    },
  ];
  return (
    <section className="py-32 lg:py-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center max-w-2xl mx-auto">
          <span className="eyebrow justify-center inline-flex">Voices</span>
          <h2 className="mt-6 font-display text-4xl md:text-5xl font-light leading-tight">
            Khách hàng <em className="not-italic text-gold-gradient">tin chọn</em>.
          </h2>
        </div>

        <div className="mt-20 grid md:grid-cols-3 gap-8">
          {items.map((t) => (
            <figure
              key={t.n}
              className="rounded-2xl bg-card p-10 border border-border shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-luxury)] transition-all duration-500"
            >
              <Quote className="w-7 h-7 text-gold opacity-60" />
              <blockquote className="mt-6 text-[15px] leading-relaxed font-light text-foreground/85">
                "{t.q}"
              </blockquote>
              <figcaption className="mt-8 pt-6 border-t border-border flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[oklch(0.86_0.06_85)] to-[oklch(0.74_0.1_75)] flex items-center justify-center text-onyx font-display font-medium">
                  {t.n.split(" ").slice(-1)[0][0]}
                </div>
                <div>
                  <div className="font-medium text-sm">{t.n}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{t.r}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────── FINAL CTA ─────────── */
function FinalCTA() {
  return (
    <section id="contact" className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img src={ctaImg} alt="" loading="lazy" width={1920} height={1080} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-onyx via-onyx/85 to-onyx/40" />
      </div>
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-32 lg:py-44 grid lg:grid-cols-2 gap-16 items-center">
        <div className="text-cream">
          <span className="eyebrow text-gold-soft">Own the experience</span>
          <h2 className="mt-6 font-display text-4xl md:text-6xl font-light leading-[1.05]">
            Sở hữu VinFast <em className="not-italic text-gold-gradient">VF 3</em><br />
            ngay hôm nay.
          </h2>
          <p className="mt-6 text-cream/70 font-light max-w-md leading-relaxed">
            Trải nghiệm phong cách di chuyển hiện đại với những ưu đãi hấp dẫn
            chỉ có tại VinFast Đô Lương.
          </p>
        </div>

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
                  need: String(fd.get("need") || ""),
                  source: "final-cta",
                }),
              });
              form.reset();
              alert("Cảm ơn quý khách. Chúng tôi sẽ liên hệ sớm nhất.");
            } catch {
              alert("Gửi không thành công, vui lòng thử lại hoặc gọi hotline.");
            }
          }}
          className="glass-dark rounded-2xl p-8 lg:p-10 space-y-5"
        >
          <Field name="name" label="Họ và tên" placeholder="Nguyễn Văn A" type="text" />
          <Field name="phone" label="Số điện thoại" placeholder="09xx xxx xxx" type="tel" />
          <div>
            <label className="block text-[11px] tracking-[0.3em] uppercase text-cream/60 mb-2">Nhu cầu</label>
            <select name="need" className="w-full bg-transparent border-b border-cream/20 py-3 text-cream focus:border-gold focus:outline-none transition-colors">
              <option className="bg-onyx">Nhận báo giá</option>
              <option className="bg-onyx">Đăng ký lái thử</option>
              <option className="bg-onyx">Tư vấn trả góp</option>
              <option className="bg-onyx">Khác</option>
            </select>
          </div>
          <button type="submit" className="btn-luxury w-full bg-gradient-to-r from-[oklch(0.86_0.06_85)] to-[oklch(0.74_0.1_75)] !text-onyx mt-4">
            Nhận tư vấn ngay <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </section>
  );
}

function Field({ label, placeholder, type, name }: { label: string; placeholder: string; type: string; name?: string }) {
  return (
    <div>
      <label className="block text-[11px] tracking-[0.3em] uppercase text-cream/60 mb-2">{label}</label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required
        className="w-full bg-transparent border-b border-cream/20 py-3 text-cream placeholder:text-cream/30 focus:border-gold focus:outline-none transition-colors"
      />
    </div>
  );
}

/* ─────────── FOOTER ─────────── */
function Footer() {
  return (
    <footer className="bg-onyx text-cream/80 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid md:grid-cols-3 gap-12 pb-16 border-b border-cream/10">
          <div>
            <div className="flex items-center gap-3 min-w-0">
              <img src={vinfastLogo} alt="VinFast" className="h-10 w-auto max-w-full object-contain" />
              <span className="h-5 w-px bg-cream/20 shrink-0" />
              <span className="font-display text-base font-semibold tracking-wider text-cream">VinFast Đô Lương</span>
            </div>
            <p className="mt-6 text-sm font-light text-cream/60 leading-relaxed max-w-xs">
              Đại lý ủy quyền chính thức của VinFast tại Nghệ An.
              Đồng hành cùng hành trình điện hóa tương lai.
            </p>
          </div>

          <div>
            <div className="text-[11px] tracking-[0.3em] uppercase text-gold mb-5">Liên hệ</div>
            <ul className="space-y-4 text-sm font-light">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                Trục Đường 7B, Khối 6 Thị Trấn,<br />Đô Lương, Nghệ An
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gold shrink-0" />
                <span>Kinh doanh: <a href="tel:0921203388" className="text-cream hover:text-gold">092.120.3388</a></span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gold shrink-0" />
                <span>Dịch vụ: <a href="tel:0898605868" className="text-cream hover:text-gold">0898.605.868</a></span>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-[11px] tracking-[0.3em] uppercase text-gold mb-5">Kết nối</div>
            <div className="flex gap-3">
              {[
                { i: MapPin, href: "https://maps.google.com/?q=VinFast+Đô+Lương+Nghệ+An", l: "Maps" },
                { i: Facebook, href: "#", l: "Facebook" },
                { i: MessageCircle, href: "#", l: "Zalo" },
              ].map(({ i: Ico, href, l }) => (
                <a
                  key={l}
                  href={href}
                  aria-label={l}
                  className="w-11 h-11 rounded-full border border-cream/15 flex items-center justify-center hover:border-gold hover:text-gold transition-colors"
                >
                  <Ico className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-cream/40">
          <div>© 2026 VinFast Đô Lương. Đại lý ủy quyền chính thức.</div>
          <div className="tracking-[0.3em] uppercase">Mãnh liệt tinh hoa Việt Nam</div>
        </div>
      </div>
    </footer>
  );
}
