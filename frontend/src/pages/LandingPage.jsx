import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Chart from 'react-apexcharts';
import {
  Home, ArrowRightLeft, Navigation, Search, AlertTriangle, MapPin, Truck, MoreVertical
} from 'lucide-react';
import BrandLogo from '../assets/images/logo/brand.png';

const LandingPage = () => {
  const navigate = useNavigate();

  // STATE ĐIỀU KHIỂN ĐĂNG NHẬP
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole'));
  const [username, setUsername] = useState(localStorage.getItem('username'));
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('username');
    setUserRole(null);
    setUsername(null);
    setShowUserDropdown(false);
    navigate('/');
  };

  // Trạng thái mở/đóng menu dropdown cho 2 biểu đồ
  const [openMenu1, setOpenMenu1] = useState(false);
  const [openMenu2, setOpenMenu2] = useState(false);

  // ================= CẤU HÌNH BIỂU ĐỒ 1 =================
  const chart1Series = [{
    name: 'Giá vỏ tôm',
    data: [8500, 9800, 11200, 14200, 12700, 10900, 11600]
  }];
  const chart1Options = {
    chart: { type: 'area', toolbar: { show: false }, zoom: { enabled: false }, fontFamily: 'Inter, sans-serif' },
    colors: ['#0d9488'],
    stroke: { curve: 'smooth', width: 2.5 },
    fill: {
      type: 'gradient',
      gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.05, stops: [0, 90, 100] }
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { style: { colors: '#9ca3af', fontSize: '11px', fontWeight: 500 } }
    },
    yaxis: {
      labels: {
        style: { colors: '#9ca3af', fontSize: '11px', fontWeight: 500 },
        formatter: (value) => (value / 1000) + 'k'
      }
    },
    grid: { borderColor: '#f3f4f6', strokeDashArray: 4, yaxis: { lines: { show: true } }, xaxis: { lines: { show: false } } },
    tooltip: { theme: 'light', y: { formatter: (val) => val.toLocaleString() + ' đ/kg' } }
  };

  // ================= CẤU HÌNH BIỂU ĐỒ 2 =================
  const chart2Series = [
    { name: 'Cà Mau', data: [44, 55, 41, 67, 22, 43, 21] },
    { name: 'Sóc Trăng', data: [13, 23, 20, 8, 13, 27, 33] },
    { name: 'Bạc Liêu', data: [11, 17, 15, 15, 21, 14, 15] }
  ];
  const chart2Options = {
    chart: { type: 'bar', stacked: true, toolbar: { show: false }, fontFamily: 'Inter, sans-serif' },
    colors: ['#0ea5e9', '#f59e0b', '#10b981'],
    plotOptions: { bar: { horizontal: false, borderRadius: 2, columnWidth: '40%' } },
    dataLabels: { enabled: false },
    stroke: { width: 0 },
    xaxis: {
      categories: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { style: { colors: '#9ca3af', fontSize: '11px', fontWeight: 500 } }
    },
    yaxis: {
      labels: {
        style: { colors: '#9ca3af', fontSize: '11px', fontWeight: 500 },
        formatter: (value) => value + 'T'
      }
    },
    grid: { borderColor: '#f3f4f6', strokeDashArray: 4, yaxis: { lines: { show: true } }, xaxis: { lines: { show: false } } },
    legend: { position: 'top', horizontalAlign: 'right', markers: { radius: 12 }, fontSize: '11px', fontWeight: 600, labels: { colors: '#6b7280' } },
    fill: { opacity: 1 },
    tooltip: { theme: 'light', y: { formatter: (val) => val + ' Tấn' } }
  };

  return (
    <div className="flex h-screen bg-gray-50 font-sans text-gray-800">

      {/* ================= SIDEBAR ================= */}
      <aside className="w-64 bg-[#0a192f] text-white flex flex-col shrink-0">

        <nav className="flex-1 px-4 py-6 space-y-2">
          <NavItem icon={<Home size={20} />} label="Trang chủ" active onClick={() => navigate('/')} />
          <NavItem icon={<ArrowRightLeft size={20} />} label="Sàn Giao dịch" onClick={() => navigate('/exchange')} />

          <div className="border-t border-gray-700 mt-4 pt-4">
            <NavItem icon={<Navigation size={20} />} label="Theo dõi xe" badge="Mới" onClick={() => navigate('/route-optimization')} />
          </div>
        </nav>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1 flex flex-col overflow-hidden">

        {/* Top Header */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-8 shrink-0">
          <div className="h-16 flex items-center px-6 border-b border-gray-700" onClick={() => window.location.href = '/'} style={{ cursor: 'pointer' }}>
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

            {/* KIỂM TRA ĐĂNG NHẬP */}
            {userRole ? (
              <div className="relative">
                {/* NÚT AVATAR MỚI: TO HƠN, CÓ TÊN, CÓ MŨI TÊN CHỈ XUỐNG */}
                <button
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                  className="flex items-center gap-2 p-1 pr-3 bg-white hover:bg-gray-50 border border-gray-200 rounded-full shadow-sm hover:shadow-md transition-all outline-none"
                >
                  {/* Vòng tròn Avatar lớn hơn (w-9 h-9) + màu sắc nổi bật + Dấu chấm xanh online */}
                  <div className="w-9 h-9 bg-gradient-to-br from-orange-400 to-red-500 text-white rounded-full flex items-center justify-center font-bold text-sm uppercase relative shrink-0">
                    {username ? username.charAt(0) : 'U'}
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
                  </div>

                  {/* Tên người dùng và nhãn (chỉ hiện trên màn hình to để tránh vỡ layout) */}
                  <div className="flex flex-col text-left hidden sm:flex">
                    <span className="text-[10px] text-gray-500 font-medium leading-none mb-0.5">Trang quản lý</span>
                    <span className="text-xs font-bold text-gray-800 leading-none capitalize truncate max-w-[80px]">{username}</span>
                  </div>

                  {/* Icon Mũi tên (Dùng SVG thuần để bạn không cần import thêm thư viện) */}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 ml-1">
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>

                {/* Phần Dropdown menu giữ nguyên... */}
                {showUserDropdown && (
                  <div className="absolute right-0 mt-2 w-52 bg-white border border-gray-200 rounded-xl shadow-xl py-1.5 z-50 overflow-hidden">
                    <div className="px-4 py-2 border-b border-gray-100 bg-gray-50/50">
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Tài khoản</p>
                      <p className="text-sm font-bold text-gray-800 capitalize truncate mt-0.5">{username}</p>
                    </div>
                    <button
                      onClick={() => { setShowUserDropdown(false); navigate(`/${userRole}`); }}
                      className="w-full text-left px-4 py-2.5 text-xs font-bold text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition-colors"
                    >
                      Trang quản lý ({userRole === 'admin' ? 'Admin' : userRole === 'seller' ? 'Người bán' : 'Người mua'})
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-xs font-bold text-red-500 hover:bg-red-50 border-t border-gray-100 transition-colors"
                    >
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button onClick={() => navigate('/login')} className="px-4 py-1.5 border border-teal-600 text-teal-600 text-xs font-bold rounded-full hover:bg-teal-50 transition shadow-sm">Đăng nhập</button>
                <button onClick={() => navigate('/register')} className="px-4 py-1.5 bg-teal-600 text-white text-xs font-bold rounded-full hover:bg-teal-700 transition shadow-sm">Đăng ký</button>
              </div>
            )}
          </div>
        </header>

        {/* Dashboard Scrollable Area */}
        <div className="flex-1 overflow-auto p-6 space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-1 gap-6">

            {/* Sức khỏe Thị trường */}
            <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col">
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
            {/* Biểu đồ 1 */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <div className="flex justify-between items-center mb-2 relative">
                <div>
                  <h3 className="font-bold text-gray-800 text-sm">Biến động giá vỏ tôm (ĐBSCL)</h3>
                  <p className="text-[11px] text-gray-500 mt-0.5">Trung bình 7 ngày qua</p>
                </div>
                <button onClick={() => setOpenMenu1(!openMenu1)} className="text-gray-400 hover:text-gray-600 p-1 rounded-md hover:bg-gray-50 transition">
                  <MoreVertical size={18} />
                </button>
                {openMenu1 && (
                  <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded shadow-lg w-32 py-1 z-10 text-xs">
                    <div className="px-3 py-1.5 hover:bg-gray-50 cursor-pointer text-gray-700">Xuất báo cáo</div>
                    <div className="px-3 py-1.5 hover:bg-gray-50 cursor-pointer text-gray-700">Xem chi tiết</div>
                  </div>
                )}
              </div>
              <div className="mt-4">
                <Chart options={chart1Options} series={chart1Series} type="area" height={220} />
              </div>
            </div>

            {/* Biểu đồ 2 */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <div className="flex justify-between items-center mb-2 relative">
                <div>
                  <h3 className="font-bold text-gray-800 text-sm">Xu hướng nguồn cung theo khu vực</h3>
                  <p className="text-[11px] text-gray-500 mt-0.5">Lượng cung ứng phụ phẩm (Tấn)</p>
                </div>
                <button onClick={() => setOpenMenu2(!openMenu2)} className="text-gray-400 hover:text-gray-600 p-1 rounded-md hover:bg-gray-50 transition">
                  <MoreVertical size={18} />
                </button>
                {openMenu2 && (
                  <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded shadow-lg w-32 py-1 z-10 text-xs">
                    <div className="px-3 py-1.5 hover:bg-gray-50 cursor-pointer text-gray-700">Xuất báo cáo</div>
                    <div className="px-3 py-1.5 hover:bg-gray-50 cursor-pointer text-gray-700">Lọc theo Tỉnh</div>
                  </div>
                )}
              </div>
              <div className="mt-4">
                <Chart options={chart2Options} series={chart2Series} type="bar" height={220} />
              </div>
            </div>
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
const NavItem = ({ icon, label, active, badge, onClick }) => (
  <div onClick={onClick} className={`flex items-center px-4 py-2.5 rounded-lg cursor-pointer transition-colors ${active ? 'bg-teal-900 text-teal-400' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`}>
    <div className="mr-3">{icon}</div>
    <span className="flex-1 text-sm font-medium">{label}</span>
    {badge && <span className="text-xs bg-orange-500 text-white px-2 py-0.5 rounded-full">{badge}</span>}
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

export default LandingPage;