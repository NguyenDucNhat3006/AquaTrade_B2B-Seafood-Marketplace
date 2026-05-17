import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { 
  Fish, Home, ArrowRightLeft, Truck, User, LifeBuoy, 
  Navigation, Search, AlertTriangle, MoreVertical, MapPin 
} from 'lucide-react';
import mapImg from '../assets/images/map/map-dong-bang-song-cu-long.png';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-gray-50 font-sans text-gray-800">
      
      {/* ================= SIDEBAR ================= */}
      <aside className="w-64 bg-[#0a192f] text-white flex flex-col shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-gray-700">
          <span className="text-xl font-bold tracking-wide">AquaTrade Hub</span>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          <NavItem icon={<Home size={20} />} label="Trang chủ" active />
          <NavItem icon={<ArrowRightLeft size={20} />} label="Sàn Giao dịch" />

          <div className="border-t border-gray-700 mt-4 pt-4">
            <NavItem icon={<Navigation size={20} />} label="Theo dõi xe" badge="Mới" />
          </div>
        </nav>

        <div className="p-4 bg-[#0d213f] m-4 rounded-lg">
          <h3 className="text-sm font-semibold mb-4">Công cụ ra quyết định</h3>
          <div className="space-y-4 text-sm">
            <Slider label="Hệ số tươi" value="1.00" />
            <Slider label="Tải trọng xe" value="100" />
            <Slider label="Phí vận hành" value="0.08" />
            <Slider label="Phí vận hành" value="1.8" />
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
        <header className="h-16 bg-white border-b flex items-center justify-between px-8 shrink-0">
          <div className="flex space-x-6 text-sm font-medium text-gray-500">
            <a href="#" className="text-teal-600 border-b-2 border-teal-600 pb-1">Trang chủ</a>
            <a href="./exchange" className="hover:text-teal-600">Sàn Giao dịch</a>
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
          <div className="grid grid-cols-1 xl:grid-cols-1 gap-6">

            {/* Cột Phải: Sức khỏe Thị trường */}
            <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col h-112.5">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-lg font-bold text-gray-800">Sức khỏe Thị trường hôm nay</h2>
                  <p className="text-xs text-gray-500">Cập nhật thời gian thực</p>
                </div>
                <div className="space-x-2 flex">
                  <button className="px-3 py-1.5 border border-teal-600 text-teal-600 text-xs font-medium rounded hover:bg-teal-50 transition whitespace-nowrap">
                    Đăng ký bán
                  </button>
                  <button className="px-3 py-1.5 bg-teal-600 text-white text-xs font-medium rounded hover:bg-teal-700 transition whitespace-nowrap">
                    Yêu cầu báo giá
                  </button>
                </div>
              </div>
              
              <div className="overflow-x-auto flex-1">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-200">
                    <tr>
                      <th className="py-2 px-3">Loại Phụ phẩm</th>
                      <th className="py-2 px-3">Nguồn cung</th>
                      <th className="py-2 px-3">Đơn vị</th>
                      <th className="py-2 px-3">Giá tham khảo</th>
                      <th className="py-2 px-3 text-center">Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <TableRow item="Vỏ Tôm sú" source="Cà Mau" unit="12.5 tấn" price="15,000 đ/kg" status="Sẵn sàng" />
                    <TableRow item="Vỏ Tôm thẻ" source="Cà Mau" unit="12.5 tấn" price="12,000 đ/kg" status="Sẵn sàng" />
                    <TableRow item="Xương Cá" source="Cà Mau" unit="10.0 tấn" price="15,000 đ/kg" status="Sẵn sàng" />
                    <TableRow item="Đầu Mực" source="Cà Mau" unit="5.5 tấn" price="18,000 đ/kg" status="Sẵn sàng" />
                    <TableRow item="Vỏ Tôm sú" source="Bạc Liêu" unit="8.0 tấn" price="14,500 đ/kg" status="Sẵn sàng" />
                    <TableRow item="Đầu Cá" source="Sóc Trăng" unit="15.0 tấn" price="10,000 đ/kg" status="Sẵn sàng" />
                  </tbody>
                </table>
              </div>
            </section>
          </div>
          
          <section className="grid grid-cols-2 gap-6">
            <ChartCard title="Biến động giá vỏ tôm (7 ngày)" />
            <ChartCard title="Xu hướng Cung-Cầu" />
          </section>

          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 flex justify-between items-center">
            <div className="flex items-center text-orange-700">
              <AlertTriangle size={20} className="mr-2 shrink-0" />
              <span className="font-medium text-sm">Cảnh báo hàng sắp hỏng tại trạm thu gom Phú Tân!</span>
            </div>
            <button className="px-4 py-1.5 bg-teal-600 text-white text-sm font-medium rounded hover:bg-teal-700 transition">
              Đăng ký bán hàng
            </button>
          </div>

        </div>
      </main>
    </div>
  );
};

// ================= SUBCOMPONENTS =================

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

const NavItem = ({ icon, label, active, badge }) => (
  <a href="#" className={`flex items-center px-4 py-2.5 rounded-lg transition-colors ${active ? 'bg-teal-900 text-teal-400' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`}>
    <div className="mr-3">{icon}</div>
    <span className="flex-1 text-sm font-medium">{label}</span>
    {badge && <span className="text-xs bg-orange-500 text-white px-2 py-0.5 rounded-full">{badge}</span>}
  </a>
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

const TableRow = ({ item, source, unit, price, status }) => (
  <tr className="hover:bg-gray-50 transition">
    <td className="py-2 px-3 font-medium text-gray-800">{item}</td>
    <td className="py-2 px-3 text-gray-600">{source}</td>
    <td className="py-2 px-3 text-gray-600">{unit}</td>
    <td className="py-2 px-3 text-gray-600">{price}</td>
    <td className="py-2 px-3 text-center">
      <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-[11px] font-medium">
        {status}
      </span>
    </td>
  </tr>
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

const ChartCard = ({ title }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 h-64 flex flex-col">
    <div className="flex justify-between items-center mb-4">
      <h3 className="font-bold text-gray-800 text-sm">{title}</h3>
      <button className="text-gray-400 hover:text-gray-600">
        <MoreVertical size={20} />
      </button>
    </div>
    <div className="flex-1 bg-gray-50 border border-dashed border-gray-200 flex items-center justify-center text-gray-400 text-sm rounded">
      [ Khu vực Biểu đồ ]
    </div>
  </div>
);

export default LandingPage;