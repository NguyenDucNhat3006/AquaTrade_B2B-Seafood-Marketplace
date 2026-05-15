import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Fish, Store, ShoppingCart, Wallet, Heart, BellRing, 
  Search, Bell, User, ArrowUpDown, List, Grid, 
  MapPin, FileCheck, Lock 
} from 'lucide-react';

const BuyerDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-gray-50 font-sans text-gray-800">
      {/* SIDEBAR */}
      <aside className="w-60 bg-[#0a192f] text-white flex flex-col shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-gray-700">
          {/* <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center text-gray-900 shadow-lg shadow-teal-400/20">
            <Fish size={18} strokeWidth={2.5} />
          </div> */}
          <span className="text-lg font-bold ml-2">AquaMarket</span>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-1">
          <NavItem label="Sàn giao dịch" active icon={<Store size={16} />} />
          <NavItem label="Đơn hàng của tôi" badge="3" icon={<ShoppingCart size={16} />} />
          <NavItem label="Chi tiêu & Ngân sách" icon={<Wallet size={16} />} />
          <p className="px-4 text-[10px] text-gray-500 uppercase font-bold py-2 mt-6">Theo dõi</p>
          <NavItem label="Lô hàng yêu thích" icon={<Heart size={16} />} />
          <NavItem label="Thông báo giá" icon={<BellRing size={16} />} />
        </nav>
        <div className="p-4 border-t border-gray-700 flex items-center gap-3">
          <div className="w-9 h-9 bg-teal-500 rounded-full flex items-center justify-center font-bold text-gray-900">VH</div>
          <div className="text-xs">
            <p className="font-bold">Vũ Hoàng Nam</p>
            <p className="text-gray-400">CT Hải Vương</p>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-15 bg-white border-b flex items-center gap-6 px-8 shrink-0">
          <h1 className="text-[16px] font-bold whitespace-nowrap">Danh Sách Lô Hàng</h1>
          <div className="flex-1 max-w-md relative">
            <input placeholder="Tìm lô hàng, tỉnh, loài tôm..." className="w-full bg-gray-100 border-none rounded-full pl-10 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-500" />
            <Search size={16} className="absolute left-4 top-2.5 text-gray-400" />
          </div>
          <div className="flex items-center gap-3 ml-auto">
            <div className="w-9 h-9 flex items-center justify-center border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 text-gray-500"><Bell size={16} /></div>
            <div className="w-9 h-9 flex items-center justify-center border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 text-gray-500"><User size={16} /></div>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-8 space-y-6">
          {/* STATS */}
          <div className="grid grid-cols-4 gap-4">
            <StatSmall label="Lô hàng khả dụng" value="142" sub="↑ 18 lô mới" color="teal" />
            <StatSmall label="Đơn đang xử lý" value="3" sub="2 đang vận chuyển" color="orange" />
            <StatSmall label="Chi tiêu tháng" value="148M" sub="VND • 6 đơn" color="blue" />
            <StatSmall label="Lô hoàn thành" value="31" sub="Từ 14 nhà máy" color="green" />
          </div>

          {/* FILTERS */}
          <div className="bg-white p-4 rounded-xl border border-gray-200 flex flex-wrap items-center gap-4 shadow-sm">
            <span className="text-[10px] font-bold text-gray-400 uppercase">Lọc:</span>
            <div className="flex gap-2">
              <Chip label="Tất cả" active />
              <Chip label="Vỏ tôm" />
              <Chip label="Đầu tôm" />
              <Chip label="Hỗn hợp" />
            </div>
            <div className="flex gap-2 ml-4 border-l border-gray-200 pl-4">
              <SelectFilter options={['Tỉnh: Tất cả', 'Cà Mau', 'Bạc Liêu']} />
              <SelectFilter options={['Mọi cấp', 'Cấp A', 'Cấp B']} />
              <SelectFilter options={['COA: Tất cả', 'Chỉ có COA']} />
            </div>
            <button className="ml-auto text-xs font-bold text-gray-500 flex items-center gap-1.5 border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50">
              <ArrowUpDown size={14} /> Giá tăng dần
            </button>
          </div>

          {/* LISTINGS LAYOUT */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
            <div className="xl:col-span-8 space-y-4">
              <div className="flex justify-between items-center text-xs text-gray-500">
                <p>Hiển thị <strong>12</strong> / 142 lô hàng</p>
                <div className="flex gap-1">
                  <div className="w-8 h-8 bg-teal-50 text-teal-600 border border-teal-200 rounded-lg flex items-center justify-center cursor-pointer"><List size={16} /></div>
                  <div className="w-8 h-8 bg-white border border-gray-200 rounded-lg flex items-center justify-center cursor-pointer text-gray-400 hover:bg-gray-50"><Grid size={16} /></div>
                </div>
              </div>

              <LotCardBuyer name="Vỏ Tôm Sú Sấy – Cà Mau" price="18,500" total="92.5M" fresh="92" selected />
              <LotCardBuyer name="Hỗn Hợp Đầu + Vỏ Tôm Thẻ" price="12,300" total="123M" fresh="74" />
              <LotCardBuyer name="Đầu Tôm Hùm Phơi Khô" price="7,800" total="39M" fresh="41" warn />
              
              <div className="flex justify-end gap-1 mt-6">
                {[1, 2, 3, '...', 12].map((p, i) => (
                  <button key={i} className={`w-8 h-8 rounded-lg border text-xs font-bold ${p === 1 ? 'bg-teal-600 text-white border-teal-600' : 'bg-white text-gray-500 hover:bg-gray-50'}`}>{p}</button>
                ))}
              </div>
            </div>

            {/* DETAIL PANEL */}
            <div className="xl:col-span-4">
              <div className="bg-white rounded-xl border border-teal-200 shadow-xl overflow-hidden sticky top-4">
                <div className="h-40 bg-gray-50 flex items-center justify-center text-gray-300 relative border-b border-gray-100">
                  <Fish size={64} strokeWidth={1} />
                  <span className="absolute top-4 left-4 bg-orange-100 text-orange-600 border border-orange-200 text-[10px] font-bold px-2 py-1 rounded shadow-sm uppercase">Cấp A – Premium</span>
                  <span className="absolute top-4 right-4 bg-green-100 text-green-700 border border-green-200 text-[10px] font-bold px-2 py-1 rounded shadow-sm uppercase flex items-center gap-1"><FileCheck size={12}/> COA Đã Xác Thực</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-black text-gray-800">Vỏ Tôm Sú Sấy – Cà Mau</h3>
                  <p className="text-[10px] font-mono text-gray-400 mt-1 uppercase">LOT-2024-0841 • Penaeus monodon</p>
                  
                  <div className="flex items-baseline gap-2 my-4">
                    <span className="text-3xl font-black text-teal-600 tracking-tight">18,500</span>
                    <span className="text-xs text-gray-400">VND / kg</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mb-6">
                    <MiniSpec k="Khối lượng lô" v="5,000 kg" />
                    <MiniSpec k="Protein thô" v="≥ 38%" ok />
                    <MiniSpec k="Độ ẩm" v="9.2%" ok />
                    <MiniSpec k="Tỷ lệ vỏ" v="78%" ok />
                  </div>

                  {/* COA MINI TABLE */}
                  <div className="bg-green-50/50 border border-green-100 rounded-xl p-4 mb-6">
                    <p className="text-[10px] font-bold text-green-700 uppercase flex items-center gap-1.5 mb-3">
                      <FileCheck size={14} /> Kết Quả Kiểm Nghiệm COA
                    </p>
                    <div className="space-y-2 text-[11px]">
                      <div className="flex justify-between border-b border-green-100/50 pb-1">
                        <span className="text-gray-500">Salmonella</span>
                        <span className="text-green-600 font-bold">KPH / 25g ✔</span>
                      </div>
                      <div className="flex justify-between border-b border-green-100/50 pb-1">
                        <span className="text-gray-500">Phòng lab</span>
                        <span className="text-gray-700">VILAS-012 • HCM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Hiệu lực COA</span>
                        <span className="text-gray-700 font-bold">Còn 68 ngày</span>
                      </div>
                    </div>
                  </div>

                  {/* SELLER LOCK */}
                  <div className="p-3 bg-gray-50 border border-gray-100 rounded-xl flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-white border border-orange-100 rounded-full flex items-center justify-center font-bold text-orange-400">CM</div>
                    <div className="flex-1">
                      <p className="text-xs font-bold text-gray-800">Cty TNHH Thủy Sản *** ***</p>
                      <p className="text-[10px] text-gray-400 tracking-tighter">Cà Mau • 47 đơn • ★ 4.9</p>
                    </div>
                    <span className="text-[9px] font-bold text-gray-400 uppercase border border-gray-200 px-1.5 py-0.5 rounded bg-white flex items-center gap-1"><Lock size={10}/> Khóa</span>
                  </div>

                  <div className="space-y-2">
                    <button className="w-full bg-teal-600 text-white py-3 rounded-xl font-bold shadow-lg shadow-teal-100 hover:bg-teal-700 transition">ĐẶT HÀNG NGAY →</button>
                    <button className="w-full bg-orange-500 text-white py-3 rounded-xl font-bold shadow-lg shadow-orange-100 hover:bg-orange-600 transition text-sm">Đặt cọc 30% · Giữ lô hàng</button>
                    <button className="w-full text-teal-600 text-[11px] font-bold py-2 hover:underline transition">Tải COA bản gốc (PDF)</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* HISTORY TABLE */}
          <section className="space-y-4">
             <div className="flex items-center gap-3">
                <h2 className="text-lg font-bold">Lịch Sử Đơn Hàng</h2>
                <span className="bg-blue-100 text-blue-700 px-2.5 py-0.5 rounded-full text-[10px] font-bold">34 đơn</span>
             </div>
             <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 text-[10px] text-gray-500 uppercase font-bold border-b border-gray-200 tracking-widest">
                    <tr>
                      <th className="px-6 py-4">Mã đơn</th>
                      <th className="px-6 py-4">Sản phẩm</th>
                      <th className="px-6 py-4">KL (kg)</th>
                      <th className="px-6 py-4">Tổng tiền</th>
                      <th className="px-6 py-4">Ngày đặt</th>
                      <th className="px-6 py-4">Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <HistoryRow id="ORD-7821" name="Vỏ Tôm Sú Sấy • Cà Mau" qty="2,000" total="36,400,000" date="12/05/2025" status="Hoàn thành" />
                    <HistoryRow id="ORD-7814" name="Phụ phẩm tôm thẻ • Sóc Trăng" qty="5,000" total="57,500,000" date="08/05/2025" status="Đang giao" />
                  </tbody>
                </table>
             </div>
          </section>
        </div>
      </main>
    </div>
  );
};

// SUB-COMPONENTS
const StatSmall = ({ label, value, sub, color }) => (
  <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden group hover:border-teal-300 transition">
    <div className={`absolute bottom-0 left-0 h-1 w-full bg-${color === 'teal' ? 'teal-500' : color === 'orange' ? 'orange-500' : color === 'blue' ? 'blue-500' : 'green-500'}`}></div>
    <p className="text-[9px] uppercase font-bold text-gray-500 mb-1 tracking-widest">{label}</p>
    <p className="text-[26px] font-black text-gray-800 tracking-tight">{value}</p>
    <p className="text-[11px] text-gray-500 mt-1">{sub}</p>
  </div>
);

const LotCardBuyer = ({ name, price, total, fresh, selected, warn }) => (
  <div className={`p-5 rounded-xl border transition cursor-pointer flex justify-between items-center ${selected ? 'bg-teal-50/50 border-teal-300 shadow-sm shadow-teal-900/5' : 'bg-white border-gray-200 shadow-sm hover:border-teal-400'}`}>
    <div className="flex gap-4">
      <div className={`w-12 h-12 border rounded-lg flex items-center justify-center text-gray-400 shrink-0 ${selected ? 'bg-white border-teal-200' : 'bg-gray-50 border-gray-100'}`}>
        <Fish size={24} />
      </div>
      <div>
        <h4 className="font-bold text-gray-800 text-[14.5px]">{name}</h4>
        <div className="flex gap-1.5 mt-2">
          <span className="px-2 py-0.5 bg-orange-50 text-orange-600 text-[10px] font-bold rounded border border-orange-100">Cấp A</span>
          <span className="px-2 py-0.5 bg-green-50 text-green-600 text-[10px] font-bold rounded border border-green-100 flex items-center gap-1"><FileCheck size={10}/> COA</span>
          <span className={`px-2 py-0.5 text-[10px] font-bold rounded border ${warn ? 'bg-red-50 text-red-600 border-red-100' : 'bg-green-50 text-green-600 border-green-100'}`}>Độ tươi: {fresh}%</span>
        </div>
      </div>
    </div>
    <div className="flex gap-12 items-center">
      <div className="hidden md:grid grid-cols-2 gap-x-8 gap-y-1.5 text-[11.5px]">
        <div className="text-gray-500 uppercase tracking-tight">Protein: <strong className="text-gray-800">38%</strong></div>
        <div className="text-gray-500 uppercase tracking-tight">Độ ẩm: <strong className="text-gray-800">9.2%</strong></div>
      </div>
      <div className="text-right shrink-0">
        <p className="text-[20px] font-black text-teal-600 leading-none">{price} <span className="text-[9px] text-gray-400 font-normal uppercase tracking-tighter">đ/kg</span></p>
        <p className="text-[11px] text-gray-500 mt-1.5 uppercase font-bold tracking-tighter">Tổng: {total} đ</p>
      </div>
    </div>
  </div>
);

const MiniSpec = ({ k, v, ok }) => (
  <div className="bg-gray-50 p-2.5 rounded-lg text-center border border-gray-100">
    <p className="text-[9px] text-gray-500 uppercase font-bold tracking-widest mb-1">{k}</p>
    <p className={`text-[13.5px] font-bold ${ok ? 'text-teal-600' : 'text-gray-800'}`}>{v}</p>
  </div>
);

const HistoryRow = ({ id, name, qty, total, date, status }) => (
  <tr className="hover:bg-gray-50 transition">
    <td className="px-6 py-4 font-mono text-[11px] text-gray-500">{id}</td>
    <td className="px-6 py-4 font-bold text-gray-800">{name}</td>
    <td className="px-6 py-4 font-medium text-gray-600">{qty} kg</td>
    <td className="px-6 py-4 font-mono font-bold text-gray-900">{total}</td>
    <td className="px-6 py-4 text-gray-500 text-[12.5px]">{date}</td>
    <td className="px-6 py-4">
      <span className={`px-2.5 py-1 rounded-full text-[10.5px] font-bold border ${status === 'Hoàn thành' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-blue-100 text-blue-700 border-blue-200'}`}>● {status}</span>
    </td>
  </tr>
);

const Chip = ({ label, active }) => (
  <button className={`px-4 py-1.5 rounded-full text-[11.5px] font-bold border transition ${active ? 'bg-teal-500 text-white border-teal-500 shadow-sm' : 'bg-white text-gray-600 border-gray-200 hover:border-teal-400 hover:text-teal-600'}`}>{label}</button>
);

const SelectFilter = ({ options }) => (
  <select className="bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-[11.5px] font-medium text-gray-600 outline-none focus:border-teal-500 cursor-pointer">
    {options.map(o => <option key={o}>{o}</option>)}
  </select>
);

const NavItem = ({ label, active, badge, icon }) => (
  <a href="#" className={`flex items-center px-4 py-2.5 rounded-lg transition ${active ? 'bg-teal-500 text-white shadow-md font-bold' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}>
    <span className={`mr-3 ${active ? 'opacity-100' : 'opacity-80'}`}>{icon}</span>
    <span className="flex-1 text-sm">{label}</span>
    {badge && <span className={`${active ? 'bg-white text-teal-600' : 'bg-orange-500 text-white'} text-[9px] font-bold px-2 py-0.5 rounded-full`}>{badge}</span>}
  </a>
);

export default BuyerDashboard;