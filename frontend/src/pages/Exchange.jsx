import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { 
  Fish, Home, ArrowRightLeft, Truck, User, LifeBuoy, 
  Navigation, Search, AlertTriangle, MoreVertical, MapPin 
} from 'lucide-react';
import mapImg from '../assets/images/map/map-dong-bang-song-cu-long.png';

const Exchange = () => {
  const navigate = useNavigate();

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
    <div className="flex h-screen bg-gray-50 font-sans text-gray-800">
      
      {/* ================= SIDEBAR ================= */}
      <aside className="w-64 bg-[#0a192f] text-white flex flex-col shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-gray-700">
          {/* <Fish size={24} strokeWidth={2} className="text-teal-400 mr-2" /> */}
          <span className="text-xl font-bold tracking-wide">AquaTrade Hub</span>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          <NavItem icon={<Home size={20} />} label="Trang chủ" />
          <NavItem icon={<ArrowRightLeft size={20} />} label="Sàn Giao dịch" active />
          {/* <NavItem icon={<Truck size={20} />} label="Tối ưu Logistics" /> */}
          {/* <NavItem icon={<User size={20} />} label="Tài khoản" /> */}
          {/* <NavItem icon={<LifeBuoy size={20} />} label="Hỗ trợ" /> */}

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
            <a href="./" className="hover:text-teal-600">Trang chủ</a>
            <a href="./exchange" className="text-teal-600  border-b-2 border-teal-600 pb-1">Sàn Giao dịch</a>
            {/* <a href="#" className="hover:text-teal-600">Tối ưu Logistics</a> */}
            {/* <a href="#" className="hover:text-teal-600">Tài khoản</a> */}
            {/* <a href="#" className="hover:text-teal-600">Hỗ trợ</a> */}
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
            
            {/* Cột Trái: Bản đồ Tối ưu Vận tải */}
            <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col h-112.5">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-bold text-gray-800">Bản đồ Tối ưu Vận tải</h2>
                <select className="border border-gray-200 rounded px-2 py-1 text-xs text-gray-600 outline-none">
                  <option>Công cụ ra quyết định</option>
                  <option>Xem toàn tuyến</option>
                </select>
              </div>

              
              <div className="relative flex-1 border border-gray-200 rounded-lg overflow-hidden bg-gray-100 cursor-move">
                
                <TransformWrapper
                  initialScale={1}
                  minScale={0.5}
                  maxScale={5}
                  centerOnInit={true}
                  wheel={{ step: 0.1 }}
                >
                  {(utils) => {
                    const currentScale = utils.state?.scale || utils.transformState?.scale || 1;

                    return (
                      <>
                        <div className="absolute top-2 right-2 z-30 flex flex-col gap-1">
                          <button onClick={() => utils.zoomIn()} className="w-7 h-7 bg-white/90 hover:bg-white border border-gray-300 rounded shadow-sm text-gray-700 font-bold flex items-center justify-center transition-colors">+</button>
                          <button onClick={() => utils.zoomOut()} className="w-7 h-7 bg-white/90 hover:bg-white border border-gray-300 rounded shadow-sm text-gray-700 font-bold flex items-center justify-center transition-colors">-</button>
                          <button onClick={() => utils.resetTransform()} className="w-7 h-7 bg-white/90 hover:bg-white border border-gray-300 rounded shadow-sm text-gray-700 text-[10px] font-medium flex items-center justify-center transition-colors">Gốc</button>
                        </div>

                        <TransformComponent wrapperClass="!w-full !h-full" contentClass="!w-full !h-full">
                          <div className="relative w-full h-full">
                            <img 
                              src={mapImg} 
                              alt="Bản đồ Đồng Bằng Sông Cửu Long" 
                              className="w-full h-full object-cover select-none pointer-events-none"
                            />

                            {/* SVG Tuyến đường */}
                            <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                              {routes.map((route, index) => (
                                <path
                                  key={`shadow-${index}`}
                                  d={getPathData(route.points)}
                                  fill="none" stroke="white" strokeWidth="1.2"
                                  strokeLinecap="round" strokeLinejoin="round" className="opacity-70"
                                />
                              ))}
                              {routes.map((route, index) => (
                                <path
                                  key={`line-${index}`}
                                  d={getPathData(route.points)}
                                  fill="none" stroke="currentColor" strokeWidth="0.6"
                                  strokeLinecap="round" strokeLinejoin="round" className={route.color}
                                />
                              ))}
                            </svg>

                            {/* Điểm đánh dấu (Markers) */}
                            {locations.map((loc, index) => (
                              loc.label && <Marker key={`marker-${index}`} type={loc.type} x={loc.x} y={loc.y} label={loc.label} scale={currentScale} />
                            ))}

                            {/* Nhãn Xe (InfoLabels) */}
                            <InfoLabel x={28} y={75} title="Xe 1" color="text-blue-700" scale={currentScale}>
                              <div className="flex flex-col gap-0.5">
                                <span><span className="font-bold text-blue-700">Xe 1:</span> Cà Mau {'->'} Hub Bạc Liêu</span>
                                <span className="text-gray-500 text-[10px]">3.5 giờ | <span className="font-bold text-gray-800">Đạt 85% tải</span></span>
                              </div>
                            </InfoLabel>

                            <InfoLabel x={36} y={55} title="Xe 1" color="text-blue-700" scale={currentScale}>
                              <div className="flex flex-col gap-0.5">
                                <span><span className="font-bold text-blue-700">Xe 1:</span> Bạc Liêu {'->'} Cần Thơ</span>
                                <span className="text-gray-500 text-[10px]">2.0 giờ | <span className="font-bold text-gray-800">Đạt 90% tải</span></span>
                              </div>
                            </InfoLabel>

                            <InfoLabel x={30} y={62} title="Xe 2" color="text-green-600" scale={currentScale}>
                              <div className="flex flex-col gap-0.5">
                                <span><span className="font-bold text-green-600">Xe 2:</span> Phú Tân {'->'} Long An</span>
                                <span className="text-gray-500 text-[10px]">4.5 giờ | <span className="font-bold text-gray-800">Đạt 100% tải</span></span>
                              </div>
                            </InfoLabel>
                          </div>
                        </TransformComponent>
                      </>
                    );
                  }}
                </TransformWrapper>

                <Legend position="top-2 left-2" />
              </div>
            </section>

          </div>
          


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

export default Exchange;