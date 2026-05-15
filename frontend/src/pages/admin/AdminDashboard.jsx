import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Fish, Search, Bell, Upload, Settings, LayoutDashboard, 
  BarChart3, ArrowRightLeft, Users, Package, AlertCircle, 
  TestTube2, ClipboardList, ListTree, MapPin, CircleDollarSign, 
  TrendingUp, CheckCircle2, AlertTriangle, Check, X 
} from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-gray-50 font-sans text-gray-800">
      {/* ================= SIDEBAR ================= */}
      <aside className="w-60 bg-[#0a192f] text-gray-300 flex flex-col shrink-0 border-r border-gray-800 overflow-y-auto">
        <div className="p-5 border-b border-gray-800 flex items-center gap-2">
          {/* <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center text-gray-900 text-xl shadow-lg shadow-teal-500/20">
            <Fish size={20} strokeWidth={2.5} />
          </div> */}
          <div className="leading-none">
            <span className="text-[15px] font-black text-white block">AquaMarket</span>
            <span className="text-[9px] font-mono text-gray-400 uppercase tracking-widest mt-1">Admin Console</span>
          </div>
        </div>

        <div className="m-4 p-2.5 bg-orange-900/30 border border-orange-500/30 rounded-lg flex items-center gap-2">
          <span className="text-orange-500 text-[10px] animate-pulse">◆</span>
          <p className="text-[10px] text-orange-400 font-mono uppercase tracking-widest">Admin Sàn — Role 5</p>
        </div>

        <nav className="flex-1 px-3 space-y-0.5 pb-4">
          <NavSection label="Tổng quan" />
          <NavItem icon={<LayoutDashboard size={16} />} label="Dashboard" active />
          <NavItem icon={<BarChart3 size={16} />} label="Báo cáo & GMV" />

          <NavSection label="Quản lý" />
          <NavItem icon={<ArrowRightLeft size={16} />} label="Giao dịch" badge="1.2K" badgeColor="bg-gray-700 text-gray-300" />
          <NavItem icon={<Users size={16} />} label="Người dùng" badge="7" badgeColor="bg-red-500" />
          <NavItem icon={<Package size={16} />} label="Lô hàng" />
          <NavItem icon={<AlertCircle size={16} />} label="Tranh chấp" badge="3" badgeColor="bg-orange-500" />

          <NavSection label="Kiểm định" />
          <NavItem icon={<TestTube2 size={16} />} label="Nhập kết quả KĐ" />
          <NavItem icon={<ClipboardList size={16} />} label="Lịch sử kiểm định" />

          <NavSection label="Cấu hình sàn" />
          <NavItem icon={<ListTree size={16} />} label="Danh mục phụ phẩm" />
          <NavItem icon={<MapPin size={16} />} label="Khu vực địa lý" />
          <NavItem icon={<Settings size={16} />} label="Cài đặt sàn" />
        </nav>

        <div className="p-4 border-t border-gray-800 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-teal-900 border border-teal-500/50 flex items-center justify-center text-teal-400 text-xs font-bold">NT</div>
          <div>
            <p className="text-[13px] font-medium text-white">Nguyễn Thanh</p>
            <p className="text-[11px] text-gray-500 font-mono">super.admin</p>
          </div>
        </div>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-15 bg-white border-b border-gray-200 px-8 flex items-center justify-between sticky top-0 z-10 shrink-0">
          <h1 className="text-[16px] font-bold text-gray-900">Dashboard <span className="text-teal-600 font-medium">/ Tổng quan sàn</span></h1>
          
          <div className="flex items-center gap-6">
            <div className="relative">
              <input type="text" placeholder="Tìm kiếm..." className="bg-gray-100 border border-gray-200 rounded-lg pl-9 pr-4 py-1.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none w-64 transition" />
              <Search size={14} className="absolute left-3 top-2.5 text-gray-400" />
            </div>
            
            <div className="text-[11px] text-gray-500 font-mono flex items-center gap-1.5">
              <span className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.5)] animate-pulse"></span>
              Live · 14/05/2026
            </div>

            <div className="flex gap-2.5">
              <IconButton icon={<Bell size={16} />} notif />
              <IconButton icon={<Upload size={16} />} />
              <IconButton icon={<Settings size={16} />} />
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-8 bg-[#f8fafc] space-y-6">
          
          {/* KPI GRID */}
          <div className="grid grid-cols-4 gap-4">
            <KpiCard title="Doanh thu sàn (tháng)" val="4.82 tỷ" trend="▲ 12.4%" trendColor="text-green-600" sub="so tháng trước" icon={<CircleDollarSign size={28} />} color="teal" />
            <KpiCard title="GMV Tổng (tháng)" val="38.5 tỷ" trend="▲ 8.7%" trendColor="text-green-600" sub="so tháng trước" icon={<TrendingUp size={28} />} color="orange" />
            <KpiCard title="Tỷ lệ hoàn thành đơn" val="94.2%" trend="▲ 2.1%" trendColor="text-green-600" sub="so tháng trước" icon={<CheckCircle2 size={28} />} color="green" />
            <KpiCard title="Tranh chấp đang xử lý" val="3" trend="▼ 1" trendColor="text-red-500" sub="đã giải quyết hôm nay" icon={<AlertTriangle size={28} />} color="red" />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
            
            {/* TRANSACTIONS TABLE */}
            <div className="xl:col-span-8 bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                  <h3 className="text-[14px] font-bold text-gray-800">Giao dịch gần đây</h3>
                </div>
                <button className="text-[11px] font-mono text-teal-600 border border-teal-200 px-3 py-1 rounded-md hover:bg-teal-50 transition">Xem tất cả →</button>
              </div>
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-200 text-[10px] text-gray-500 uppercase tracking-widest font-bold">
                  <tr>
                    <th className="px-5 py-3">Mã lô hàng</th>
                    <th className="px-5 py-3">Phụ phẩm</th>
                    <th className="px-5 py-3">Khu vực</th>
                    <th className="px-5 py-3">KL (tấn)</th>
                    <th className="px-5 py-3">Trạng thái</th>
                    <th className="px-5 py-3">Kiểm định</th>
                  </tr>
                </thead>
                <tbody className="text-[12.5px] divide-y divide-gray-100">
                  <TxRow id="LOT-2026-0847" name="Đầu tôm sú" loc="Cà Mau" qty="12.5" status="Hoàn thành" stColor="green" lab="Đạt" labColor="green" />
                  <TxRow id="LOT-2026-0846" name="Xương cá tra" loc="An Giang" qty="8.2" status="Đang vận chuyển" stColor="blue" lab="Chờ KĐ" labColor="orange" />
                  <TxRow id="LOT-2026-0845" name="Vỏ tôm thẻ" loc="Bạc Liêu" qty="5.8" status="Hoàn thành" stColor="green" lab="Đạt" labColor="green" />
                  <TxRow id="LOT-2026-0844" name="Mỡ cá basa" loc="Đồng Tháp" qty="3.1" status="Tranh chấp" stColor="red" lab="Không đạt" labColor="red" />
                  <TxRow id="LOT-2026-0843" name="Da cá tra" loc="Vĩnh Long" qty="6.4" status="Chờ xác nhận" stColor="orange" lab="Chờ KĐ" labColor="orange" />
                  <TxRow id="LOT-2026-0842" name="Đầu cá ngừ" loc="Khánh Hòa" qty="9.7" status="Hoàn thành" stColor="green" lab="Đạt" labColor="green" />
                </tbody>
              </table>
            </div>

            {/* PENDING ACCOUNTS */}
            <div className="xl:col-span-4 bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden h-fit">
              <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <h3 className="text-[14px] font-bold text-gray-800">Tài khoản chờ duyệt</h3>
                </div>
                <span className="bg-orange-100 text-orange-600 border border-orange-200 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold">7 mới</span>
              </div>
              <div className="divide-y divide-gray-100">
                <AccountItem avatar="CT" bg="bg-teal-100" color="text-teal-700" name="Cty TNHH Thủy Sản Minh Phú" type="🏭 Nhà cung cấp · Cà Mau" date="hôm nay" />
                <AccountItem avatar="HP" bg="bg-orange-100" color="text-orange-700" name="Hải Phong Seafood Co." type="🛒 Người mua · TP.HCM" date="hôm nay" />
                <AccountItem avatar="VL" bg="bg-blue-100" color="text-blue-700" name="Vĩnh Long Fish Farm" type="🏭 Nhà cung cấp · Vĩnh Long" date="hôm qua" />
                <AccountItem avatar="AG" bg="bg-red-100" color="text-red-700" name="An Giang Export Ltd." type="🛒 Người mua · An Giang" date="hôm qua" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* DISPUTES */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between bg-red-50/30">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <h3 className="text-[14px] font-bold text-gray-800">Tranh chấp cần xử lý</h3>
                </div>
                <button className="text-[11px] font-mono text-red-600 border border-red-200 px-3 py-1 rounded-md hover:bg-red-50 transition">Xử lý →</button>
              </div>
              <div className="divide-y divide-gray-100">
                <DisputeItem id="DSP-084" title="Chất lượng không khớp mô tả" tag="Khẩn cấp" tagColor="red" meta="LOT-2026-0844 · Mỡ cá basa · Đồng Tháp · 3 ngày trước" />
                <DisputeItem id="DSP-083" title="Giao hàng trễ 5 ngày so hợp đồng" tag="Trung bình" tagColor="orange" meta="LOT-2026-0839 · Vỏ tôm thẻ · Bạc Liêu · 5 ngày trước" />
                <DisputeItem id="DSP-082" title="Khối lượng thiếu hụt ~0.3 tấn" tag="Trung bình" tagColor="orange" meta="LOT-2026-0836 · Xương cá tra · An Giang · 7 ngày trước" />
              </div>
            </div>

            {/* LAB RESULTS */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between bg-teal-50/30">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <h3 className="text-[14px] font-bold text-gray-800">Kết quả kiểm định mới nhập</h3>
                </div>
                <button className="text-[11px] font-mono text-teal-600 border border-teal-200 px-3 py-1 rounded-md hover:bg-teal-50 transition">+ Nhập KĐ</button>
              </div>
              <div className="divide-y divide-gray-100">
                <LabItem lot="LOT-0847" name="Đầu tôm sú · Cà Mau" status="Đạt" stColor="green" p="42.3%" pSt="ok" m="12.1%" mSt="ok" i="0.8%" iSt="ok" />
                <LabItem lot="LOT-0844" name="Mỡ cá basa · Đồng Tháp" status="Không đạt" stColor="red" p="18.7%" pSt="warn" m="28.4%" mSt="fail" i="3.2%" iSt="fail" />
                <LabItem lot="LOT-0842" name="Đầu cá ngừ · Khánh Hòa" status="Đạt" stColor="green" p="38.9%" pSt="ok" m="14.2%" mSt="ok" i="1.1%" iSt="ok" />
              </div>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
};

// ================= SUBCOMPONENTS =================

const NavSection = ({ label }) => <p className="px-3 text-[9px] font-mono text-gray-500 uppercase tracking-widest pt-4 pb-2">{label}</p>;

const NavItem = ({ icon, label, active, badge, badgeColor }) => (
  <a href="#" className={`flex items-center px-3 py-2.5 rounded-lg text-[13.5px] transition ${active ? 'bg-teal-900/40 text-teal-400 border border-teal-500/30' : 'hover:bg-gray-800 text-gray-400 hover:text-white'}`}>
    <span className="mr-3 opacity-80">{icon}</span>
    <span className="flex-1">{label}</span>
    {badge && <span className={`${badgeColor} text-white font-mono text-[9px] px-1.5 py-0.5 rounded-full font-bold`}>{badge}</span>}
  </a>
);

const IconButton = ({ icon, notif }) => (
  <div className="w-8 h-8 bg-white border border-gray-200 rounded-lg flex items-center justify-center text-gray-600 cursor-pointer hover:bg-gray-50 transition relative">
    {icon} {notif && <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></div>}
  </div>
);

const KpiCard = ({ title, val, trend, trendColor, sub, icon, color }) => (
  <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden group hover:border-teal-300 transition">
    <div className={`absolute bottom-0 left-0 h-0.5 w-full bg-${color === 'teal' ? 'teal-500' : color === 'blue' ? 'blue-500' : color === 'orange' ? 'orange-500' : color === 'green' ? 'green-500' : 'red-500'}`}></div>
    <div className="text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-1.5">{title}</div>
    <div className={`text-[26px] font-black leading-none mb-2 ${color === 'teal' ? 'text-teal-600' : color === 'orange' ? 'text-orange-500' : color === 'green' ? 'text-green-600' : 'text-red-500'}`}>{val}</div>
    <div className="text-[11px] text-gray-500 flex items-center gap-1.5">
      <span className={`font-mono font-bold ${trendColor}`}>{trend}</span> {sub}
    </div>
    <div className="absolute top-5 right-5 opacity-10 text-gray-500">{icon}</div>
  </div>
);

const TxRow = ({ id, name, loc, qty, status, stColor, lab, labColor }) => (
  <tr className="hover:bg-gray-50 transition cursor-pointer">
    <td className="px-5 py-3 font-mono text-[11.5px] text-teal-600">{id}</td>
    <td className="px-5 py-3 font-bold text-gray-800">{name}</td>
    <td className="px-5 py-3 text-gray-500">{loc}</td>
    <td className="px-5 py-3 text-gray-600">{qty}</td>
    <td className="px-5 py-3"><Chip label={status} color={stColor} /></td>
    <td className="px-5 py-3"><Chip label={lab} color={labColor} /></td>
  </tr>
);

const Chip = ({ label, color }) => {
  const styles = {
    green: "bg-green-100 text-green-700 border-green-200",
    orange: "bg-orange-100 text-orange-700 border-orange-200",
    red: "bg-red-100 text-red-700 border-red-200",
    blue: "bg-blue-100 text-blue-700 border-blue-200",
  };
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10.5px] font-mono font-bold border ${styles[color]}`}>
      <span className="text-[6px]">●</span> {label}
    </span>
  );
};

const AccountItem = ({ avatar, bg, color, name, type, date }) => (
  <div className="px-5 py-4 flex items-center gap-3 hover:bg-gray-50 transition cursor-pointer">
    <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-[15px] ${bg} ${color}`}>{avatar}</div>
    <div className="flex-1 min-w-0">
      <div className="text-[13px] font-bold text-gray-800 mb-0.5">{name}</div>
      <div className="text-[10px] text-gray-500 font-mono">{type}</div>
    </div>
    <div className="flex flex-col items-end gap-1.5">
      <div className="text-[10px] text-gray-400 font-mono">{date}</div>
      <div className="flex gap-1.5">
        <button className="flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-mono font-bold bg-green-50 text-green-600 border border-green-200 hover:bg-green-100 transition"><Check size={12}/> Duyệt</button>
        <button className="flex items-center justify-center px-2 py-1 rounded-md text-[10px] bg-red-50 text-red-500 border border-red-200 hover:bg-red-100 transition"><X size={12}/></button>
      </div>
    </div>
  </div>
);

const DisputeItem = ({ id, title, tag, tagColor, meta }) => (
  <div className="px-5 py-3.5 hover:bg-gray-50 transition cursor-pointer">
    <div className="flex items-center gap-2 mb-1.5">
      <span className="font-mono text-[11.5px] font-bold text-teal-600">{id}</span>
      <span className="text-[13px] font-bold text-gray-800 flex-1">{title}</span>
      <Chip label={tag} color={tagColor} />
    </div>
    <div className="text-[11px] text-gray-500 font-mono">{meta}</div>
  </div>
);

const LabItem = ({ lot, name, status, stColor, p, pSt, m, mSt, i, iSt }) => (
  <div className="px-5 py-4 hover:bg-gray-50 transition">
    <div className="flex items-center gap-2.5 mb-3">
      <span className="font-mono text-[11.5px] font-bold text-teal-600">{lot}</span>
      <span className="text-[13px] font-bold text-gray-800 flex-1">{name}</span>
      <Chip label={status} color={stColor} />
    </div>
    <div className="flex gap-3">
      <LabMetric label="Protein" val={p} status={pSt} />
      <LabMetric label="Độ ẩm" val={m} status={mSt} />
      <LabMetric label="Tạp chất" val={i} status={iSt} />
    </div>
  </div>
);

const LabMetric = ({ label, val, status }) => (
  <div className="flex flex-col items-center px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg min-w-20">
    <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">{label}</span>
    <span className={`text-[14px] font-bold mt-0.5 ${status === 'ok' ? 'text-green-600' : status === 'warn' ? 'text-orange-500' : 'text-red-500'}`}>{val}</span>
  </div>
);

export default AdminDashboard;