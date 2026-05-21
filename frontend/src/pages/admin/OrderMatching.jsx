import { useState } from "react";
import {
  ShieldCheck, Truck, Award, ChevronDown, ChevronUp,
  MapPin, Calendar, Package, Scale, Wallet, CheckCircle2,
  Star, Clock, ArrowRight, Zap, Users, BadgeCheck, AlertCircle, X
} from "lucide-react";

// ─── MOCK DATA ────────────────────────────────────────────────────────────────
const rfq = {
  id: "RFQ-2025-06847",
  product: "Đầu Tôm Sú",
  grade: "Cấp A",
  totalQty: 8,
  unit: "tấn",
  maxBudget: 75000,
  currency: "VNĐ/kg",
  deliveryDate: "28/07/2025",
  warehouse: "Kho lạnh TH-07, Cần Thơ",
  postedAt: "Hôm nay, 09:14",
  responses: 7,
};

const packages = [
  {
    id: "PKG-A",
    tag: "GIÁ TỐT NHẤT",
    tagColor: "emerald",
    title: "Gói Gom Hàng",
    subtitle: "Tối ưu chi phí",
    icon: "zap",
    avgPrice: 71500,
    totalPrice: 572000000,
    savings: 28000000,
    savingsPct: 4.7,
    deliveryMode: "DDP",
    deliveryNote: "Giá đã bao gồm toàn bộ phí giao đến Kho TH-07 Cần Thơ",
    deliveryWindow: "26–28/07/2025",
    escrow: true,
    isRecommended: true,
    suppliers: [
      {
        id: "S1",
        name: "Vựa Hoàng Phát",
        location: "Cà Mau",
        qty: 5,
        unit: "tấn",
        pricePerKg: 70000,
        grade: "Cấp A",
        rating: 4.8,
        reviews: 134,
        verified: true,
        leadTime: "2 ngày",
        note: "Đóng gói PE 20kg/thùng, bảo quản -18°C",
      },
      {
        id: "S2",
        name: "Đại Lý Minh Châu",
        location: "Bạc Liêu",
        qty: 3,
        unit: "tấn",
        pricePerKg: 74000,
        grade: "Cấp A",
        rating: 4.6,
        reviews: 89,
        verified: true,
        leadTime: "3 ngày",
        note: "Đóng gói PA/PE hút chân không, IQF",
      },
    ],
  },
  {
    id: "PKG-B",
    tag: "ỔN ĐỊNH NHẤT",
    tagColor: "blue",
    title: "Gói Đơn Nhất",
    subtitle: "Một nhà cung cấp – Rủi ro thấp nhất",
    icon: "shield",
    avgPrice: 74500,
    totalPrice: 596000000,
    savings: 4000000,
    savingsPct: 0.7,
    deliveryMode: "DDP",
    deliveryNote: "Giao toàn bộ 8 tấn một chuyến – không lo phối hợp nhiều nguồn",
    deliveryWindow: "27/07/2025",
    escrow: true,
    isRecommended: false,
    suppliers: [
      {
        id: "S3",
        name: "Công ty TNHH Thủy Sản Đại Dương Xanh",
        location: "Kiên Giang",
        qty: 8,
        unit: "tấn",
        pricePerKg: 74500,
        grade: "Cấp A",
        rating: 4.9,
        reviews: 312,
        verified: true,
        leadTime: "2 ngày",
        note: "ISO 22000:2018 · Xuất khẩu EU · Có xe lạnh riêng đến kho người mua",
      },
    ],
  },
  {
    id: "PKG-C",
    tag: "GIAO NHANH",
    tagColor: "amber",
    title: "Gói Khẩn Cấp",
    subtitle: "Ưu tiên tốc độ giao hàng",
    icon: "clock",
    avgPrice: 73000,
    totalPrice: 584000000,
    savings: 0,
    savingsPct: 0,
    deliveryMode: "DDP",
    deliveryNote: "Có thể giao trong 24h từ khi xác nhận đơn – phù hợp kế hoạch gấp",
    deliveryWindow: "25/07/2025",
    escrow: true,
    isRecommended: false,
    suppliers: [
      {
        id: "S4",
        name: "Vựa Thanh Bình",
        location: "Sóc Trăng",
        qty: 5,
        unit: "tấn",
        pricePerKg: 72000,
        grade: "Cấp A",
        rating: 4.7,
        reviews: 67,
        verified: true,
        leadTime: "24h",
        note: "Tồn kho sẵn, có thể xuất ngay",
      },
      {
        id: "S5",
        name: "HTX Thủy Sản Năm Căn",
        location: "Cà Mau",
        qty: 3,
        unit: "tấn",
        pricePerKg: 75000,
        grade: "Cấp A",
        rating: 4.5,
        reviews: 44,
        verified: true,
        leadTime: "24h",
        note: "Tồn kho sẵn, đóng gói PE 20kg",
      },
    ],
  },
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const fmt = (n) => n.toLocaleString("vi-VN");
const fmtM = (n) => (n / 1_000_000).toFixed(1) + " tỷ";

const tagStyles = {
  emerald: {
    badge: "bg-emerald-500 text-white",
    border: "ring-2 ring-emerald-400",
    accent: "text-emerald-600",
    accentBg: "bg-emerald-50",
    btn: "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200",
    bar: "bg-emerald-500",
  },
  blue: {
    badge: "bg-blue-600 text-white",
    border: "ring-2 ring-blue-400",
    accent: "text-blue-600",
    accentBg: "bg-blue-50",
    btn: "bg-blue-600 hover:bg-blue-700 shadow-blue-200",
    bar: "bg-blue-500",
  },
  amber: {
    badge: "bg-amber-500 text-white",
    border: "",
    accent: "text-amber-600",
    accentBg: "bg-amber-50",
    btn: "bg-amber-500 hover:bg-amber-600 shadow-amber-200",
    bar: "bg-amber-500",
  },
};

// ─── SUB-COMPONENTS ───────────────────────────────────────────────────────────

function TrustBar() {
  return (
    <div className="bg-slate-800 text-white">
      <div className="max-w-5xl mx-auto px-4 py-2 flex flex-wrap gap-x-6 gap-y-1 justify-center text-xs font-medium">
        <span className="flex items-center gap-1.5">
          <ShieldCheck size={13} className="text-emerald-400" />
          Thanh toán Escrow – Sàn giữ tiền đến khi nhận hàng đúng chuẩn
        </span>
        <span className="flex items-center gap-1.5">
          <Award size={13} className="text-sky-400" />
          Tất cả hàng hóa đạt chuẩn kiểm định của Sàn
        </span>
        <span className="flex items-center gap-1.5">
          <Truck size={13} className="text-violet-400" />
          Giao hàng DDP – Giá bao gồm vận chuyển đến tận kho
        </span>
      </div>
    </div>
  );
}

function RFQHeader() {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-slate-400 text-xs font-mono">{rfq.id}</span>
              <span className="text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-medium">
                {rfq.responses} nhà cung cấp phản hồi
              </span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight uppercase">
              Kết quả khớp lệnh
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Chọn gói phù hợp nhất. Sàn đã đàm phán và xác minh từng nguồn hàng thay bạn.
            </p>
          </div>
          <div className="text-xs text-slate-500 flex items-center gap-1">
            <Clock size={12} /> Đăng {rfq.postedAt}
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {[
            { icon: Package, label: "Sản phẩm", value: `${rfq.product} – ${rfq.grade}` },
            { icon: Scale, label: "Khối lượng", value: `${rfq.totalQty} ${rfq.unit}` },
            { icon: Wallet, label: "Ngân sách tối đa", value: `${fmt(rfq.maxBudget)} ${rfq.currency}` },
            { icon: Calendar, label: "Ngày giao", value: rfq.deliveryDate },
            { icon: MapPin, label: "Kho nhận hàng", value: rfq.warehouse },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="bg-white/5 border border-white/10 rounded-xl px-3 py-3">
              <div className="flex items-center gap-1.5 text-slate-400 text-[11px] mb-1">
                <Icon size={11} /> {label}
              </div>
              <div className="text-white text-sm font-semibold leading-tight">{value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StarRating({ rating }) {
  return (
    <span className="flex items-center gap-0.5 text-amber-400 text-xs">
      <Star size={11} fill="currentColor" />
      <span className="text-slate-700 font-semibold">{rating}</span>
    </span>
  );
}

function SupplierRow({ s }) {
  return (
    <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-3">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-semibold text-slate-800 text-sm">{s.name}</span>
          {s.verified && (
            <span className="inline-flex items-center gap-0.5 text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full font-medium">
              <BadgeCheck size={10} /> Đã xác minh
            </span>
          )}
        </div>
        <div className="flex items-center gap-3 mt-1 text-xs text-slate-500 flex-wrap">
          <span className="flex items-center gap-1"><MapPin size={10} />{s.location}</span>
          <StarRating rating={s.rating} />
          <span className="text-slate-400">({s.reviews} đánh giá)</span>
          <span className="flex items-center gap-1"><Clock size={10} />Giao trong {s.leadTime}</span>
        </div>
        <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed">{s.note}</p>
      </div>
      <div className="flex sm:flex-col items-center sm:items-end gap-3 sm:gap-1 shrink-0">
        <div className="text-right">
          <div className="text-lg font-bold text-slate-900">{fmt(s.pricePerKg)}<span className="text-xs font-normal text-slate-500"> đ/kg</span></div>
          <div className="text-xs text-slate-500">{s.qty} {s.unit} · {fmt(s.qty * 1000 * s.pricePerKg)} đ</div>
        </div>
        <span className="text-[10px] bg-sky-100 text-sky-700 border border-sky-200 px-2 py-0.5 rounded-full font-medium">
          {s.grade} · Đạt chuẩn Sàn
        </span>
      </div>
    </div>
  );
}

function PackageCard({ pkg, index }) {
  const [expanded, setExpanded] = useState(pkg.isRecommended);
  const [confirming, setConfirming] = useState(false);
  const s = tagStyles[pkg.tagColor];
  const budgetOk = pkg.avgPrice <= rfq.maxBudget;

  return (
    <div
      className={`bg-white rounded-2xl border border-slate-200 overflow-hidden transition-all duration-300 ${
        pkg.isRecommended ? s.border + " shadow-xl" : "shadow-sm hover:shadow-md"
      }`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Card Header */}
      <div className={`px-5 py-4 ${s.accentBg} border-b border-slate-100`}>
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`text-[10px] font-bold tracking-widest px-2.5 py-1 rounded-full ${s.badge}`}>
                {pkg.tag}
              </span>
              {pkg.isRecommended && (
                <span className="text-[10px] font-medium text-slate-500 flex items-center gap-1">
                  <CheckCircle2 size={11} className="text-emerald-500" /> Khuyến nghị
                </span>
              )}
            </div>
            <h2 className="text-xl font-bold text-slate-900 mt-2 leading-tight">{pkg.title}</h2>
            <p className="text-sm text-slate-500 mt-0.5">{pkg.subtitle}</p>
          </div>
          <div className="text-right shrink-0">
            <div className={`text-3xl font-extrabold ${s.accent}`}>
              {fmt(pkg.avgPrice)}<span className="text-base font-semibold text-slate-500"> đ/kg</span>
            </div>
            <div className="text-sm text-slate-600 font-medium mt-0.5">
              Tổng: <span className="font-bold text-slate-800">{fmtM(pkg.totalPrice)}</span>
            </div>
            {budgetOk ? (
              <span className="text-[11px] text-emerald-600 flex items-center gap-1 justify-end mt-1">
                <CheckCircle2 size={11} /> Trong ngân sách
              </span>
            ) : (
              <span className="text-[11px] text-red-500 flex items-center gap-1 justify-end mt-1">
                <AlertCircle size={11} /> Vượt ngân sách
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Trust Signals Row */}
      <div className="px-5 py-3 border-b border-slate-100 grid grid-cols-3 gap-2">
        <div className="flex flex-col items-center text-center gap-1 p-2 rounded-xl bg-emerald-50">
          <Award size={16} className="text-emerald-600" />
          <span className="text-[10px] font-semibold text-emerald-800 leading-tight">Đầu tôm Cấp A<br/>Đạt chuẩn Sàn</span>
        </div>
        <div className="flex flex-col items-center text-center gap-1 p-2 rounded-xl bg-sky-50">
          <ShieldCheck size={16} className="text-sky-600" />
          <span className="text-[10px] font-semibold text-sky-800 leading-tight">Escrow<br/>Sàn bảo lãnh</span>
        </div>
        <div className="flex flex-col items-center text-center gap-1 p-2 rounded-xl bg-violet-50">
          <Truck size={16} className="text-violet-600" />
          <span className="text-[10px] font-semibold text-violet-800 leading-tight">DDP<br/>Phí ship bao gồm</span>
        </div>
      </div>

      {/* Delivery Info */}
      <div className="px-5 py-3 bg-slate-50 border-b border-slate-100 flex flex-wrap gap-x-5 gap-y-1 text-xs text-slate-600">
        <span className="flex items-center gap-1.5">
          <Truck size={12} className="text-slate-400" />
          <span>{pkg.deliveryNote}</span>
        </span>
        <span className="flex items-center gap-1.5">
          <Calendar size={12} className="text-slate-400" />
          Dự kiến: <strong className="text-slate-800">{pkg.deliveryWindow}</strong>
        </span>
        {pkg.savingsPct > 0 && (
          <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
            <Zap size={12} />
            Tiết kiệm ~{fmt(pkg.savings)} đ so với mua lẻ
          </span>
        )}
      </div>

      {/* Supplier Summary */}
      <div className="px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Users size={14} className="text-slate-400" />
          <span>
            <strong className="text-slate-900">{pkg.suppliers.length}</strong> nhà cung cấp ·{" "}
            {pkg.suppliers.map((s) => s.location).join(", ")}
          </span>
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors"
        >
          {expanded ? (
            <><ChevronUp size={16} /> Ẩn chi tiết</>
          ) : (
            <><ChevronDown size={16} /> Xem chi tiết gói</>
          )}
        </button>
      </div>

      {/* Expandable Suppliers */}
      {expanded && (
        <div className="px-5 pb-4 flex flex-col gap-3 border-t border-slate-100 pt-3">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Danh sách nguồn hàng trong gói
          </p>
          {pkg.suppliers.map((supplier) => (
            <SupplierRow key={supplier.id} s={supplier} />
          ))}
        </div>
      )}

      {/* CTA */}
      <div className="px-5 py-4 border-t border-slate-100 bg-white">
        {confirming ? (
          <div className="flex flex-col gap-2">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-sm text-amber-800 flex items-start gap-2">
              <AlertCircle size={16} className="shrink-0 mt-0.5 text-amber-600" />
              <span>
                Xác nhận chấp nhận <strong>{pkg.title}</strong>? Sau khi xác nhận, sàn sẽ thông báo cho nhà cung cấp và khóa giao dịch Escrow.
              </span>
            </div>
            <div className="flex gap-2">
              <button
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-white font-bold text-sm shadow-lg ${s.btn} transition-all active:scale-95`}
              >
                <CheckCircle2 size={16} /> Xác nhận & Thanh toán Escrow
              </button>
              <button
                onClick={() => setConfirming(false)}
                className="px-3 py-3 rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setConfirming(true)}
            className={`w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl text-white font-bold text-base shadow-lg ${s.btn} transition-all hover:scale-[1.01] active:scale-[0.99]`}
          >
            Chấp nhận {pkg.title} &amp; Thanh toán
            <ArrowRight size={18} />
          </button>
        )}
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="min-h-screen bg-slate-100 font-sans">
      {/* Top Trust Bar */}


      {/* Nav stub */}

      {/* RFQ Header */}
      <RFQHeader />

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 py-8">

        {/* Section title */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Các Gói Đề Xuất</h2>
            <p className="text-sm text-slate-500 mt-0.5">
              Hệ thống đã tự động tối ưu từ {rfq.responses} báo giá thành {packages.length} gói tốt nhất cho bạn
            </p>
          </div>
          <div className="text-xs text-slate-500 bg-white border border-slate-200 px-3 py-1.5 rounded-full flex items-center gap-1.5">
            <Clock size={11} /> Hết hạn nhận gói sau: <strong className="text-slate-700">23:41:05</strong>
          </div>
        </div>

        {/* Package Cards Grid */}
        <div className="grid grid-cols-1 gap-6">
          {packages.map((pkg, i) => (
            <PackageCard key={pkg.id} pkg={pkg} index={i} />
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-8 p-4 bg-white border border-slate-200 rounded-2xl flex flex-col sm:flex-row gap-3 items-start">
          <ShieldCheck size={20} className="text-teal-500 shrink-0 mt-0.5" />
          <div className="text-sm text-slate-600 leading-relaxed">
            <strong className="text-slate-800">Cơ chế Escrow của AquaMarket:</strong> Tiền của bạn chỉ được chuyển cho nhà cung cấp khi hàng hóa đã được giao đến kho và xác nhận đạt chuẩn chất lượng Cấp A. Nếu có tranh chấp, đội hỗ trợ B2B sẽ can thiệp trong vòng 24h.
          </div>
        </div>
      </div>
    </div>
  );
}
