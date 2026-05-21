import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import {
  Fish, Home, ArrowRightLeft, Truck, User, LifeBuoy,
  Navigation, Search, AlertTriangle, MoreVertical, MapPin,
  Package, Scale, FolderOpen, CheckCircle2, XCircle, X, ChevronRight
} from 'lucide-react';
import mapImg from '../assets/images/map/map-dong-bang-song-cu-long.png';
import BrandLogo from '../assets/images/logo/brand.png';

const Exchange = () => {
  const navigate = useNavigate();

  // STATE điều khiển Modal chi tiết
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // === Dữ liệu Bản đồ ===
  const locations = [
    { type: 'processing', x: 20, y: 72, label: 'Cà Mau' },
    { type: 'coldstorage', x: 36.5, y: 69, label: 'Hub Bạc Liêu' },
    { type: 'processing', x: 12, y: 76, label: 'Phú Tân' },
    { type: 'coldstorage', x: 37, y: 44, label: 'Cần Thơ' },
    { type: 'consumption', x: 64, y: 29, label: 'Long An' },
    { type: 'coldstorage', x: 45, y: 55, label: '' },
    { type: 'consumption', x: 55, y: 38, label: '' },
  ];

  const routes = [
    { points: [locations[0], locations[1], locations[3]], color: 'text-blue-700' },
    { points: [locations[2], locations[5], locations[6], locations[4]], color: 'text-green-600' },
  ];

  const getPathData = (points) => {
    return points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  };

  return (
    <div className="flex h-screen bg-gray-50 font-sans text-gray-800 relative">

      {/* ================= SIDEBAR ================= */}
      <aside className="w-64 bg-[#0a192f] text-white flex flex-col shrink-0 z-10">


        <nav className="flex-1 px-4 py-6 space-y-2">
          <NavItem icon={<Home size={20} />} label="Trang chủ" onClick={() => navigate('/')} />
          <NavItem icon={<ArrowRightLeft size={20} />} label="Sàn Giao dịch" active />

          <div className="border-t border-gray-700 mt-4 pt-4">
            <NavItem icon={<Navigation size={20} />} label="Theo dõi xe" badge="Mới" onClick={() => navigate('/route-optimization')} />
          </div>
        </nav>

        <div className="p-4 bg-[#0d213f] m-4 rounded-lg">
          <h3 className="text-sm font-semibold mb-4">Công cụ ra quyết định</h3>
          <div className="space-y-4 text-sm">
            <Slider label="Hệ số tươi" value="1.00" />
            <Slider label="Tải trọng xe" value="100" />
            <Slider label="Phí vận hành" value="0.08" />
            <div className="flex items-center justify-between mt-2">
              <span className="text-gray-300">Cùng, cáp trời</span>
              <div className="w-8 h-4 bg-gray-500 rounded-full flex items-center px-1">
                <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
              </div>
            </div>
            <button className="w-full mt-4 bg-teal-600 hover:bg-teal-500 text-white py-2 rounded font-medium transition">
              Theo dõi xe
            </button>
          </div>
        </div>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1 flex flex-col overflow-hidden">

        {/* Top Header */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-8 shrink-0 z-10">
          <div className="h-16 flex items-center px-6 border-b border-gray-700">
            <img src={BrandLogo} alt="AquaMarket Logo" className="h-8 w-auto object-contain" />
            <span className="text-xl font-bold tracking-wide ml-2">AquaTrade</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm..."
                className="bg-gray-100 border-none rounded-full pl-4 pr-10 py-1.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none w-64"
              />
              <Search size={16} className="absolute right-4 top-2 text-gray-400" />
            </div>
            <div className="w-8 h-8 bg-orange-200 text-orange-600 rounded-full flex items-center justify-center font-bold">
              U
            </div>
          </div>
        </header>

        {/* Dashboard Scrollable Area */}
        <div className="flex-1 overflow-auto p-6 space-y-6">

          {/* BANNER TÓM TẮT ĐẦU TRANG */}
          <section className="bg-[#f0f9fa] border border-[#d1eef6] rounded-xl p-4 shadow-sm">
            <div className="flex justify-between items-center mb-4 px-2">
              <div className="text-[14.5px] text-gray-800 font-medium">
                Hôm nay: <strong className="font-bold">9 lô hàng</strong> · <strong className="font-bold">18.4 tấn</strong> · Chuyến xe Thứ Ba sắp xuất phát
              </div>
              <button
                onClick={() => setIsDetailModalOpen(true)}
                className="text-red-500 hover:text-red-600 font-bold text-sm hover:underline transition-colors"
              >
                Xem Chi tiết
              </button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <TopSummaryCard title="TỔNG LÔ" value="9" icon={<Package size={24} className="text-gray-400" />} />
              <TopSummaryCard title="TỔNG TẤN" value="18.4 tấn" icon={<Scale size={24} className="text-gray-400" />} />
              <TopSummaryCard title="SỐ CHUYẾN XE TUẦN NÀY" value="5" icon={<Truck size={24} className="text-gray-400" />} />
            </div>
          </section>


          <div className="mt-8 bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <button
                    onClick={() => navigate('/route-optimization')}
                    className="flex items-center gap-1 bg-teal-50 text-teal-700 hover:bg-teal-100 border border-teal-200 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors"
                  >
                    Xem chi tiết <ChevronRight size={14} />
                  </button>
              <h3 className="font-bold text-[15px] text-gray-900">Bản Đồ Lộ Trình Vận Chuyển & Phân Phối (MILP)</h3>
              <span className="text-[12px] font-mono text-teal-600 bg-teal-50 px-2 py-1 rounded-full">Trực tuyến</span>
            </div>
            <iframe src="/route-map.html" className="w-full h-[600px] border-none" title="Route Optimization Map"></iframe>
            
          </div>


          {/* Bảng Đơn hàng */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-800">Danh sách Đơn hàng mới</h2>
              <button className="text-gray-400 hover:text-gray-600">
                <MoreVertical size={20} />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-200">
                  <tr>
                    <th className="py-3 px-4">Mã ĐH</th>
                    <th className="py-3 px-4">Người bán</th>
                    <th className="py-3 px-4">Sản phẩm</th>
                    <th className="py-3 px-4">Số lượng</th>
                    <th className="py-3 px-4">Yêu cầu Vận chuyển</th>
                    <th className="py-3 px-4">Thời gian</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <OrderRow id="MI00001" seller="Người bán nguồn" product="Vỏ Tôm sú" qty="2,000 đ/kg" request="Vận chuyển" time="20/24-09-28" />
                  <OrderRow id="MI00002" seller="Người bán" product="Vỏ Tôm sú" qty="5,000 đ/kg" request="Vận chuyển" time="20/24-09-21" />
                  <OrderRow id="MI00003" seller="Người bán" product="Đầu Mực" qty="1,000 đ/kg" request="Vận chuyển" time="20/24-09-22" />
                </tbody>
              </table>
            </div>
          </section>

        </div>
      </main>

      {/* ================= MODAL CHI TIẾT LÔ HÀNG ================= */}
      {isDetailModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity">

          <div className="bg-[#f4f7f9] rounded-2xl shadow-2xl w-full max-w-5xl overflow-hidden animate-in fade-in zoom-in duration-200 border border-gray-200">

            {/* Nút Đóng */}
            <div className="flex justify-end p-2 pb-0">
              <button onClick={() => setIsDetailModalOpen(false)} className="text-gray-400 hover:text-gray-800 p-2 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="px-6 pb-6 space-y-4">

              {/* Top 3 KPI Cards trong Modal */}
              <div className="grid grid-cols-3 gap-4">
                <ModalKpiCard title="TỔNG LÔ NHẬN" value="12" icon={<FolderOpen size={24} className="text-blue-500" />} />
                <ModalKpiCard title="ĐỦ ĐIỀU KIỆN" value="9" icon={<CheckCircle2 size={24} className="text-white fill-green-500" />} color="green" />
                <ModalKpiCard title="TỪ CHỐI" value="3" icon={<XCircle size={24} className="text-white fill-red-500" />} color="red" />
              </div>

              {/* Grid Bảng và Biểu đồ */}
              <div className="grid grid-cols-3 gap-4">

                {/* Bảng Lô bị từ chối */}
                <div className="col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
                  <h3 className="font-bold text-gray-800 p-4 border-b border-gray-100 bg-white">Bảng Lô bị Từ chối</h3>
                  <div className="overflow-auto p-2">
                    <table className="w-full text-left text-sm">
                      <thead className="text-gray-600 bg-gray-50/50">
                        <tr>
                          <th className="py-2.5 px-4 font-medium border-b border-gray-100">ID</th>
                          <th className="py-2.5 px-4 font-medium border-b border-gray-100">Tên sản phẩm</th>
                          <th className="py-2.5 px-4 font-medium border-b border-gray-100">Tỉnh</th>
                          <th className="py-2.5 px-4 font-medium border-b border-gray-100">Lý do từ chối</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-50">
                          <td className="py-3 px-4 text-gray-700">LOT-003</td>
                          <td className="py-3 px-4 text-gray-700">Phế phẩm cá tra</td>
                          <td className="py-3 px-4 text-gray-700">Đồng Tháp</td>
                          <td className="py-2 px-2">
                            <div className="bg-[#ffe8e8] text-[#c92a2a] text-[13px] px-3 py-1.5 rounded flex items-start gap-1">
                              <X size={14} className="mt-0.5 shrink-0" /> Khối lượng 450kg dưới mức tối thiểu 1.000kg
                            </div>
                          </td>
                        </tr>
                        <tr className="border-b border-gray-50 bg-[#fff5f5]">
                          <td className="py-3 px-4 text-gray-700">LOT-007</td>
                          <td className="py-3 px-4 text-gray-700">Đầu tôm</td>
                          <td className="py-3 px-4 text-gray-700">Sóc Trăng</td>
                          <td className="py-2 px-2">
                            <div className="bg-[#ffe8e8] text-[#c92a2a] text-[13px] px-3 py-1.5 rounded flex items-start gap-1">
                              <X size={14} className="mt-0.5 shrink-0" /> Chi phí vận chuyển ước tính (280.000đ) chiếm 32% giá trị lô — vượt ngưỡng cho phép 30%
                            </div>
                          </td>
                        </tr>
                        <tr className="border-b border-gray-50">
                          <td className="py-3 px-4 text-gray-700">LOT-001</td>
                          <td className="py-3 px-4 text-gray-700">Vỏ tôm sú</td>
                          <td className="py-3 px-4 text-gray-700">Cà Mau</td>
                          <td className="py-2 px-2"></td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4 text-gray-700">LOT-002</td>
                          <td className="py-3 px-4 text-gray-700">Vỏ tôm thẻ</td>
                          <td className="py-3 px-4 text-gray-700">Cà Mau</td>
                          <td className="py-2 px-2"></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Cột Biểu đồ */}
                <div className="col-span-1 flex flex-col gap-4">
                  {/* Card Biểu đồ */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex-1 flex flex-col items-center">
                    <div className="w-full text-left mb-4">
                      <h3 className="font-bold text-gray-800 text-sm">Biểu đồ Tỷ lệ</h3>
                      <p className="text-[11px] text-gray-500">Kết quả Kiểm tra</p>
                    </div>

                    {/* CSS Pie Chart */}
                    <div className="relative w-36 h-36 rounded-full mb-6 shadow-sm overflow-hidden"
                      style={{ background: 'conic-gradient(#ef4444 0% 25%, #22c55e 25% 100%)' }}>
                      <div className="absolute top-0 right-0 w-1/2 h-1/2 flex items-center justify-center">
                        <span className="text-white font-bold text-xs">25%</span>
                      </div>
                      <div className="absolute bottom-0 left-0 w-full h-1/2 flex items-center justify-center">
                        <span className="text-white font-bold text-xs">75%</span>
                      </div>
                    </div>

                    {/* Legend */}
                    <div className="flex gap-4 text-[11px] font-bold text-gray-600 w-full justify-center mt-auto">
                      <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 bg-[#22c55e] rounded-sm"></div> Approved 75%</div>
                      <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 bg-[#ef4444] rounded-sm"></div> Rejected 25%</div>
                    </div>
                  </div>

                  {/* Nút CTA chuyển sang Listing Criteria */}
                  <button
                    onClick={() => {
                      setIsDetailModalOpen(false);
                      navigate('/listing-criteria');
                    }}
                    className="w-full bg-gradient-to-r from-emerald-400 to-blue-500 hover:from-emerald-500 hover:to-blue-600 text-white font-bold py-3.5 px-4 rounded-xl shadow-md flex justify-between items-center transition-all"
                  >
                    <span>Xem tiêu chí</span>
                    <ChevronRight size={20} />
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

// ================= SUBCOMPONENTS =================

const TopSummaryCard = ({ title, value, icon }) => (
  <div className="bg-white rounded-lg p-4 border border-gray-100 flex justify-between items-center shadow-sm">
    <div className="flex flex-col">
      <span className="text-[11px] text-gray-500 font-semibold mb-1 uppercase tracking-wide">{title}</span>
      <span className="text-2xl font-black text-gray-800 leading-none">{value}</span>
    </div>
    <div className="w-12 h-12 bg-gray-50 rounded-lg border border-gray-100 flex items-center justify-center">
      {icon}
    </div>
  </div>
);

const ModalKpiCard = ({ title, value, icon, color }) => (
  <div className="bg-white rounded-xl p-4 border border-gray-200 flex justify-between items-center shadow-sm">
    <div className="flex flex-col">
      <span className="text-[11px] text-gray-500 font-bold mb-1 uppercase tracking-wider">{title}</span>
      <span className="text-3xl font-black text-gray-800 leading-none">{value}</span>
    </div>
    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${color === 'green' ? 'bg-green-50' : color === 'red' ? 'bg-red-50' : 'bg-blue-50'}`}>
      {icon}
    </div>
  </div>
);

const Legend = ({ position }) => {
  const legendItems = [
    { color: 'bg-red-500', label: 'Nhà máy chế biến' },
    { color: 'bg-blue-500', label: 'Kho tập kết lạnh' },
    { color: 'bg-green-500', label: 'Nhà máy tiêu thụ' },
  ];
  return (
    <div className={`absolute p-2 bg-white/95 backdrop-blur-sm border border-gray-200 rounded shadow-sm ${position} z-10 pointer-events-none`}>
      <div className="space-y-1">
        {legendItems.map((item, index) => (
          <div key={index} className="flex items-center space-x-1.5">
            <div className={`w-2.5 h-2.5 rounded-full ${item.color}`}></div>
            <span className="text-[10px] text-gray-700 font-medium">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const Marker = ({ type, x, y, label, scale = 1 }) => {
  const colors = {
    processing: 'border-red-500 bg-white text-red-500',
    coldstorage: 'border-blue-500 bg-white text-blue-500',
    consumption: 'border-green-500 bg-white text-green-500',
  };
  const inverseScale = 1 / scale;

  return (
    <div
      className="absolute flex flex-col items-center group z-20"
      style={{ left: `${x}%`, top: `${y}%`, transform: `translate(-50%, -100%) scale(${inverseScale})` }}
    >
      <div className={`flex items-center justify-center p-0.5 border-2 rounded-full shadow-sm ${colors[type]} group-hover:scale-110 transition-transform cursor-pointer`}>
        <MapPin size={14} fill="currentColor" />
      </div>
      {label && <span className="mt-0.5 px-1 py-0.5 text-[10px] font-bold text-gray-800 bg-white/90 border border-gray-100 rounded shadow-sm whitespace-nowrap">{label}</span>}
    </div>
  );
};

const InfoLabel = ({ x, y, title, color, scale = 1, children }) => {
  const inverseScale = 1 / scale;

  return (
    <div
      className="absolute group z-20 hover:z-50 cursor-pointer"
      style={{ left: `${x}%`, top: `${y}%`, transform: `translate(-50%, -50%) scale(${inverseScale})` }}
    >
      <div className="px-2 py-1 bg-white/90 backdrop-blur-sm border border-gray-300 rounded-full shadow-sm text-[10px] font-bold text-gray-700 flex items-center gap-1 group-hover:border-teal-500 group-hover:shadow-md transition-all">
        <Truck size={12} className={color} />
        {title}
      </div>

      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 w-max p-2 bg-white/95 backdrop-blur-sm border border-gray-200 rounded shadow-lg text-[10px] text-gray-700 pointer-events-none">
        {children}
      </div>
    </div>
  );
};

const NavItem = ({ icon, label, active, badge, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center px-4 py-2.5 rounded-lg transition-colors ${active ? 'bg-teal-900 text-teal-400' : 'text-gray-300 hover:bg-gray-800 hover:text-white'
      }`}
  >
    <div className="mr-3">{icon}</div>
    <span className="flex-1 text-sm font-medium text-left">{label}</span>
    {badge && <span className="text-xs bg-orange-500 text-white px-2 py-0.5 rounded-full">{badge}</span>}
  </button>
);

const Slider = ({ label, value }) => (
  <div>
    <div className="flex justify-between text-gray-300 mb-1">
      <span>{label}</span>
      <span>{value}</span>
    </div>
    <div className="w-full bg-gray-600 h-1.5 rounded-full relative">
      <div className="bg-teal-500 h-1.5 rounded-full w-2/3"></div>
      <div className="w-3 h-3 bg-white border-2 border-teal-500 rounded-full absolute top-1/2 transform -translate-y-1/2 left-2/3"></div>
    </div>
  </div>
);

const OrderRow = ({ id, seller, product, qty, request, time }) => (
  <tr className="hover:bg-gray-50 transition text-gray-600">
    <td className="py-3 px-4 font-medium">{id}</td>
    <td className="py-3 px-4">{seller}</td>
    <td className="py-3 px-4">{product}</td>
    <td className="py-3 px-4">{qty}</td>
    <td className="py-3 px-4">{request}</td>
    <td className="py-3 px-4">{time}</td>
  </tr>
);

export default Exchange;