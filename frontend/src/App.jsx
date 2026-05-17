import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { 
  Fish, LayoutDashboard, BarChart3, ArrowRightLeft, Users, Package, 
  AlertCircle, TestTube2, ClipboardList, ListTree, MapPin, Settings, 
  BookOpen, Bell, Search 
} from 'lucide-react';

import LoginPage from './pages/login/LoginPage';
import ForgotPasswordPage from './pages/login/ForgotPasswordPage';
import LandingPage from './pages/LandingPage';
import SellerDashboard from './pages/seller/SellerDashboard';
import BuyerDashboard from './pages/buyer/BuyerDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import GradingStandards from './pages/admin/GradingStandards';

// ================= LAYOUT ĐIỀU HƯỚNG DÙNG CHUNG (ADMIN) =================
const AdminLayout = () => {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-gray-50 font-sans text-gray-800">
      
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-60 bg-[#0a192f] text-gray-300 flex flex-col shrink-0 border-r border-gray-800 overflow-y-auto">
        <div className="p-5 border-b border-gray-800 flex items-center gap-2">
          <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center text-gray-900 shadow-lg shadow-teal-500/20">
            <Fish size={20} strokeWidth={2.5} />
          </div>
          <div className="leading-none">
            <span className="text-[15px] font-black text-white block">AquaMarket</span>
            <span className="text-[9px] font-mono text-gray-400 uppercase tracking-widest mt-1">Admin Console</span>
          </div>
        </div>

        <div className="m-4 p-2.5 bg-orange-900/30 border border-orange-500/30 rounded-lg flex items-center gap-2">
          <div className="w-2 h-2 bg-orange-500 rotate-45 animate-pulse shrink-0"></div>
          <p className="text-[10px] text-orange-400 font-mono uppercase tracking-widest">Admin Sàn — Role 5</p>
        </div>

        <nav className="flex-1 px-3 space-y-0.5 pb-4">
          <p className="px-3 text-[9px] font-mono text-gray-500 uppercase tracking-widest pt-4 pb-2">Tổng quan</p>
          <Link to="/admin" className={`flex items-center px-3 py-2.5 rounded-lg text-[13.5px] transition ${location.pathname === '/admin' ? 'bg-teal-900/40 text-teal-400 border border-teal-500/30 font-bold' : 'hover:bg-gray-800 text-gray-400 hover:text-white'}`}>
            <LayoutDashboard size={16} className="mr-3 opacity-80" />
            <span className="flex-1">Dashboard</span>
          </Link>
          <Link to="/admin/reports" className="flex items-center px-3 py-2.5 rounded-lg text-[13.5px] transition hover:bg-gray-800 text-gray-400 hover:text-white">
            <BarChart3 size={16} className="mr-3 opacity-80" />
            <span className="flex-1">Báo cáo & GMV</span>
          </Link>

          <p className="px-3 text-[9px] font-mono text-gray-500 uppercase tracking-widest pt-4 pb-2">Quản lý</p>
          <Link to="/admin/transactions" className="flex items-center px-3 py-2.5 rounded-lg text-[13.5px] transition hover:bg-gray-800 text-gray-400 hover:text-white">
            <ArrowRightLeft size={16} className="mr-3 opacity-80" />
            <span className="flex-1">Giao dịch</span>
            <span className="bg-gray-700 text-gray-300 font-mono text-[9px] px-1.5 py-0.5 rounded-full font-bold">1.2K</span>
          </Link>
          <Link to="/admin/users" className="flex items-center px-3 py-2.5 rounded-lg text-[13.5px] transition hover:bg-gray-800 text-gray-400 hover:text-white">
            <Users size={16} className="mr-3 opacity-80" />
            <span className="flex-1">Người dùng</span>
            <span className="bg-red-500 text-white font-mono text-[9px] px-1.5 py-0.5 rounded-full font-bold">7</span>
          </Link>
          <Link to="/admin/lots" className="flex items-center px-3 py-2.5 rounded-lg text-[13.5px] transition hover:bg-gray-800 text-gray-400 hover:text-white">
            <Package size={16} className="mr-3 opacity-80" />
            <span className="flex-1">Lô hàng</span>
          </Link>
          <Link to="/admin/disputes" className="flex items-center px-3 py-2.5 rounded-lg text-[13.5px] transition hover:bg-gray-800 text-gray-400 hover:text-white">
            <AlertCircle size={16} className="mr-3 opacity-80" />
            <span className="flex-1">Tranh chấp</span>
            <span className="bg-orange-500 text-white font-mono text-[9px] px-1.5 py-0.5 rounded-full font-bold">3</span>
          </Link>

          <p className="px-3 text-[9px] font-mono text-gray-500 uppercase tracking-widest pt-4 pb-2">Kiểm định & Tiêu chuẩn</p>
          <Link to="/admin/grading-standards" className={`flex items-center px-3 py-2.5 rounded-lg text-[13.5px] transition ${location.pathname === '/admin/grading-standards' ? 'bg-teal-900/40 text-teal-400 border border-teal-500/30 font-bold' : 'hover:bg-gray-800 text-gray-400 hover:text-white'}`}>
            <BookOpen size={16} className="mr-3 opacity-80" />
            <span className="flex-1">Bộ tiêu chuẩn B2B</span>
          </Link>
          <Link to="/admin/lab-input" className="flex items-center px-3 py-2.5 rounded-lg text-[13.5px] transition hover:bg-gray-800 text-gray-400 hover:text-white">
            <TestTube2 size={16} className="mr-3 opacity-80" />
            <span className="flex-1">Nhập kết quả KĐ</span>
          </Link>
          <Link to="/admin/lab-history" className="flex items-center px-3 py-2.5 rounded-lg text-[13.5px] transition hover:bg-gray-800 text-gray-400 hover:text-white">
            <ClipboardList size={16} className="mr-3 opacity-80" />
            <span className="flex-1">Lịch sử kiểm định</span>
          </Link>

          <p className="px-3 text-[9px] font-mono text-gray-500 uppercase tracking-widest pt-4 pb-2">Cấu hình sàn</p>
          <Link to="/admin/categories" className="flex items-center px-3 py-2.5 rounded-lg text-[13.5px] transition hover:bg-gray-800 text-gray-400 hover:text-white">
            <ListTree size={16} className="mr-3 opacity-80" />
            <span className="flex-1">Danh mục phụ phẩm</span>
          </Link>
          <Link to="/admin/regions" className="flex items-center px-3 py-2.5 rounded-lg text-[13.5px] transition hover:bg-gray-800 text-gray-400 hover:text-white">
            <MapPin size={16} className="mr-3 opacity-80" />
            <span className="flex-1">Khu vực địa lý</span>
          </Link>
          <Link to="/admin/settings" className="flex items-center px-3 py-2.5 rounded-lg text-[13.5px] transition hover:bg-gray-800 text-gray-400 hover:text-white">
            <Settings size={16} className="mr-3 opacity-80" />
            <span className="flex-1">Cài đặt sàn</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-gray-800 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-teal-900 border border-teal-500/50 flex items-center justify-center text-teal-400 text-xs font-bold">NT</div>
          <div>
            <p className="text-[13px] font-medium text-white">Nguyễn Thanh</p>
            <p className="text-[11px] text-gray-500 font-mono">super.admin</p>
          </div>
        </div>
      </aside>

      {/* MAIN VIEW AREA */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-15 bg-white border-b border-gray-200 px-8 flex items-center justify-between sticky top-0 z-10 shrink-0">
          <h1 className="text-[16px] font-bold text-gray-900">
            Hệ thống Quản trị AquaMarket
          </h1>
          
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
              <div className="w-8 h-8 bg-white border border-gray-200 rounded-lg flex items-center justify-center text-gray-600 cursor-pointer hover:bg-gray-50 transition relative">
                <Bell size={16} />
                <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></div>
              </div>
              <div className="w-8 h-8 bg-white border border-gray-200 rounded-lg flex items-center justify-center text-gray-600 cursor-pointer hover:bg-gray-50 transition">
                <Settings size={16} />
              </div>
            </div>
          </div>
        </header>

        {/* Nội dung thay đổi của các trang con được đưa vào đây */}
        <div className="flex-1 overflow-auto bg-[#f8fafc]">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

function App() {
  return (
      <Router>
        <AnimatePresence mode="wait">
          <Routes>
            {/* 1. Đặt LoginPage làm trang đầu tiên khi mở dự án */}
            <Route path="/" element={<LoginPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            {/* 2. Đổi LandingPage sang một đường dẫn khác (ví dụ: /home) để không bị mất code cũ */}
            <Route path="/home" element={<LandingPage />} />

            {/* Giữ lại /login để dự phòng nếu có link nào đó trỏ đến */}
            <Route path="/login" element={<LoginPage />} />

            <Route path="/seller" element={<SellerDashboard />} />
            <Route path="/buyer" element={<BuyerDashboard />} />

            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="grading-standards" element={<GradingStandards />} />
            </Route>
          </Routes>
        </AnimatePresence>
      </Router>
  );
}

export default App;