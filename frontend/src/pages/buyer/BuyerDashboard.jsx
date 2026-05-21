import React, { useState } from 'react';
import { 
  Fish, Store, ShoppingCart, Wallet, Heart, BellRing, 
  Search, Bell, User, ArrowUpDown, List, Grid, 
  MapPin, FileCheck, Lock, Building2, Calendar, 
  FileText, Phone, ChevronDown, Play, Image as ImageIcon, Box
} from 'lucide-react';

const BuyerDashboard = () => {
  // 1. DỮ LIỆU ĐỘNG (MOCK DATA) - Đã thêm 2 sản phẩm mới
  const mockLots = [
    {
      id: "BCT-60-DT-2025",
      hsCode: "2301.20.10",
      species: "Pangasianodon hypophthalmus",
      name: "Bột Cá Tra Phụ Phẩm 60% Đạm – Nguyên liệu thức ăn thủy sản & gia súc gia cầm, đóng bao 50kg, xuất từ nhà máy Đồng Tháp",
      tags: [
        { label: "Thức ăn chăn nuôi", color: "bg-red-50 text-red-600 border-red-100" },
        { label: "Đang có hàng", color: "bg-green-50 text-green-700 border-green-100" },
        { label: "Mới đăng", color: "bg-yellow-400 text-gray-900 border-yellow-500 font-bold" }
      ],
      specs: [
        { label: "Đạm thô (CP)", val: "≥60", unit: "%" },
        { label: "Độ ẩm", val: "≤12", unit: "%" },
        { label: "Béo thô", val: "≤12", unit: "%" },
        { label: "Tro", val: "≤22", unit: "%" }
      ],
      priceBlock: {
        main: "8.500.000",
        unit: "đồng / Tấn (1.000 kg)",
        sub: "≈ 8.500 đ/kg · Giá CIF +150.000–300.000đ/tấn tùy tỉnh"
      },
      logistics: [
        { label: "SL TỐI THIỂU (MOQ)", val: "5 Tấn / đơn" },
        { label: "KHẢ NĂNG CUNG ỨNG", val: "500 T/tháng" },
        { label: "NƠI XUẤT HÀNG", val: "Đồng Tháp" },
        { label: "GIAO HÀNG", val: "Xe tải 5–20T" }
      ],
      pricingTable: [
        { qty: "5 – 20 tấn", price: "9.000.000", payment: "CK 30% trước, 70% khi nhận hàng", time: "3–5 ngày" },
        { qty: "21 – 50 tấn", price: "8.700.000", payment: "CK 50% – 50%, hợp đồng KT", time: "5–7 ngày" },
        { qty: ">50 tấn (HĐ dài hạn) ★", price: "8.200.000", payment: "Net 15 ngày (đối tác uy tín)", time: "7–10 ngày" }
      ],
      seller: {
        name: "CÔNG TY TNHH CHẾ BIẾN TS ĐỒNG THÁP HẢI",
        avatar: "ĐTH",
        type: "Nhà máy sản xuất",
        loc: "Huyện Châu Thành, Đồng Tháp",
        est: "Thành lập 2008",
        certs: ["HACCP", "ISO 22000", "Giấy ATTP", "ASC CoC"]
      },
      shortPrice: "8,500",
      shortTotal: "8.5M / Tấn"
    },
    {
      id: "LOT-2024-0841",
      hsCode: "0511.91.00",
      species: "Penaeus monodon",
      name: "Vỏ Tôm Sú Sấy – Cà Mau (Premium Cấp A)",
      tags: [
        { label: "Chiết xuất Chitin", color: "bg-blue-50 text-blue-600 border-blue-100" },
        { label: "Đang có hàng", color: "bg-green-50 text-green-700 border-green-100" }
      ],
      specs: [
        { label: "Đạm thô", val: "≥38", unit: "%" },
        { label: "Độ ẩm", val: "≤9.2", unit: "%" },
        { label: "Tỷ lệ vỏ thân", val: "≥78", unit: "%" },
        { label: "Tạp chất", val: "≤1", unit: "%" }
      ],
      priceBlock: {
        main: "18.500.000",
        unit: "đồng / Tấn",
        sub: "≈ 18.500 đ/kg · Giá tại kho Cà Mau"
      },
      logistics: [
        { label: "SL TỐI THIỂU (MOQ)", val: "2 Tấn / đơn" },
        { label: "KHẢ NĂNG CUNG ỨNG", val: "50 T/tháng" },
        { label: "NƠI XUẤT HÀNG", val: "Cà Mau" },
        { label: "GIAO HÀNG", val: "Xe tải 8T" }
      ],
      pricingTable: [
        { qty: "2 – 10 tấn", price: "18.500.000", payment: "Tiền mặt / CK 100%", time: "1–2 ngày" },
        { qty: ">10 tấn", price: "18.000.000", payment: "Hợp đồng nguyên tắc", time: "3–5 ngày" }
      ],
      seller: {
        name: "CTY TNHH THỦY SẢN CÀ MAU",
        avatar: "CM",
        type: "Xưởng sơ chế",
        loc: "Năm Căn, Cà Mau",
        est: "Thành lập 2015",
        certs: ["Giấy ATTP"]
      },
      shortPrice: "18,500",
      shortTotal: "92.5M / Lô"
    },
    {
      id: "MCT-TL-AG-2025",
      hsCode: "1504.20.10",
      species: "Pangasius bocourti / hypophthalmus",
      name: "Mỡ Cá Tra / Basa Tinh Luyện – Dầu cá nội địa đa dụng: thức ăn chăn nuôi, sản xuất biodiesel, chế biến thực phẩm công nghiệp, giao theo xe bồn hoặc thùng IBC 1.000L",
      tags: [
        { label: "Thực phẩm / Công nghiệp", color: "bg-yellow-50 text-yellow-700 border-yellow-200" },
        { label: "Đang có hàng", color: "bg-green-50 text-green-700 border-green-100" },
        { label: "Hàng tồn kho nhiều", color: "bg-blue-50 text-blue-700 border-blue-100" }
      ],
      specs: [
        { label: "Hàm lượng béo", val: "≥98", unit: "%" },
        { label: "Độ ẩm & tạp chất", val: "≤0,5", unit: "%" },
        { label: "Chỉ số axit (AV)", val: "≤3", unit: "mgKOH/g" },
        { label: "Màu sắc Lovibond", val: "≤5R", unit: "/ 50Y" }
      ],
      priceBlock: {
        main: "22.000.000",
        unit: "đồng / Tấn · Grade thực phẩm: +15%",
        sub: "≈ 22.000 đ/kg · Giao theo xe bồn (tối thiểu 5 tấn) hoặc thùng IBC 1.000L"
      },
      logistics: [
        { label: "SL TỐI THIỂU (MOQ)", val: "3 Tấn / đơn" },
        { label: "KHẢ NĂNG CUNG ỨNG", val: "200 T/tháng" },
        { label: "NƠI XUẤT HÀNG", val: "An Giang" },
        { label: "GIAO HÀNG", val: "Xe bồn / IBC" }
      ],
      pricingTable: [
        { qty: "3 – 10 tấn", price: "23.000.000", payment: "Thùng IBC 1.000L (x3)", time: "2–4 ngày" },
        { qty: "11 – 30 tấn", price: "22.500.000", payment: "Xe bồn chuyên dụng", time: "3–5 ngày" },
        { qty: ">30 tấn (HĐ tháng) ★", price: "21.500.000", payment: "Xe bồn + bơm hút tại kho mua", time: "5–7 ngày" }
      ],
      seller: {
        name: "CÔNG TY CP THỦY SẢN AN GIANG FOOD (AGF)",
        avatar: "AGF",
        type: "Nhà sản xuất",
        loc: "TP. Châu Đốc, An Giang",
        est: "Thành lập 2003",
        certs: ["HACCP", "ISO 22000", "Giấy ATTP", "CODEX Grade"]
      },
      shortPrice: "22,000",
      shortTotal: "22M / Tấn"
    },
    {
      id: "DTS-IQF-CM-2025",
      hsCode: "0306.99.90 | CAS Chitin: 1398-61-4",
      species: "Penaeus monodon",
      name: "Đầu Tôm Sú Đông Lạnh IQF – Nguyên liệu chiết xuất Chitin/Chitosan công nghiệp & thức ăn thủy sản, xuất tại Cà Mau, giao toàn quốc bằng xe đông lạnh",
      tags: [
        { label: "Chiết xuất Chitin", color: "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-100" },
        { label: "TĂCN thủy sản", color: "bg-orange-50 text-orange-600 border-orange-100" },
        { label: "Đang có hàng", color: "bg-green-50 text-green-700 border-green-100" }
      ],
      specs: [
        { label: "Độ ẩm (đông lạnh)", val: "≤78", unit: "%" },
        { label: "Hàm lượng Chitin", val: "22–28", unit: "% (cb khô)" },
        { label: "Nhiệt độ bảo quản", val: "≤-18", unit: "°C" },
        { label: "Hạn SD (đông lạnh)", val: "12", unit: "tháng" }
      ],
      priceBlock: {
        main: "4.500.000",
        unit: "đồng / Tấn · Grade Chitin: +25%",
        sub: "≈ 4.500 đ/kg · Giá chưa bao gồm phí xe đông lạnh"
      },
      logistics: [
        { label: "SL TỐI THIỂU (MOQ)", val: "3 Tấn / đơn" },
        { label: "KHẢ NĂNG CUNG ỨNG", val: "800 T/tháng" },
        { label: "NƠI XUẤT HÀNG", val: "Cà Mau" },
        { label: "GIAO HÀNG", val: "Xe đông lạnh" }
      ],
      pricingTable: [
        { qty: "3 – 10 tấn", price: "5.000.000", payment: "CK 50% trước, 50% nhận hàng", time: "3–5 ngày" },
        { qty: "11 – 30 tấn", price: "4.700.000", payment: "CK 30% – 70% khi giao", time: "5–8 ngày" },
        { qty: ">30 tấn (HĐ tháng) ★", price: "4.200.000", payment: "Net 15 ngày (HĐ khung)", time: "7–12 ngày" }
      ],
      seller: {
        name: "CÔNG TY CP CHẾ BIẾN TS CÀ MAU QUỐC TẾ (CMQ)",
        avatar: "CMQ",
        type: "Nhà sản xuất",
        loc: "KCN Khánh An, Cà Mau",
        est: "Thành lập 2010",
        certs: ["HACCP", "ISO 22000", "BAP 4-Star", "Giấy ATTP", "ASC CoC"]
      },
      shortPrice: "4,500",
      shortTotal: "4.5M / Tấn"
    },
    {
      id: "FPM-50-KG-2025",
      hsCode: "2301.20.90",
      species: "Mixed Marine Fish",
      name: "Bột Cá Biển 50% Đạm – Hàng nguyên chất, sấy hơi nước, đóng bao 50kg, kho Kiên Giang",
      tags: [
        { label: "Thức ăn chăn nuôi", color: "bg-red-50 text-red-600 border-red-100" },
        { label: "Đang có hàng", color: "bg-green-50 text-green-700 border-green-100" }
      ],
      specs: [
        { label: "Đạm thô (CP)", val: "≥50", unit: "%" },
        { label: "Độ ẩm", val: "≤10", unit: "%" },
        { label: "Béo thô", val: "≤10", unit: "%" },
        { label: "Tro", val: "≤26", unit: "%" }
      ],
      priceBlock: {
        main: "25.000.000",
        unit: "đồng / Tấn (1.000 kg)",
        sub: "≈ 25.000 đ/kg · Giá EXW tại kho Kiên Giang"
      },
      logistics: [
        { label: "SL TỐI THIỂU (MOQ)", val: "10 Tấn / đơn" },
        { label: "KHẢ NĂNG CUNG ỨNG", val: "300 T/tháng" },
        { label: "NƠI XUẤT HÀNG", val: "Kiên Giang" },
        { label: "GIAO HÀNG", val: "Xe tải 10-20T" }
      ],
      pricingTable: [
        { qty: "10 – 30 tấn", price: "25.000.000", payment: "CK 30% trước, 70% nhận hàng", time: "3–5 ngày" },
        { qty: ">30 tấn", price: "24.500.000", payment: "Tiền mặt / CK 100%", time: "3–5 ngày" }
      ],
      seller: {
        name: "CTY TNHH BỘT CÁ KIÊN GIANG",
        avatar: "KGF",
        type: "Nhà máy sản xuất",
        loc: "Rạch Giá, Kiên Giang",
        est: "Thành lập 2012",
        certs: ["HACCP", "Giấy ATTP"]
      },
      shortPrice: "25,000",
      shortTotal: "25M / Tấn"
    },
    {
      id: "CSC-DRIED-VT-25",
      hsCode: "0511.99.90",
      species: "Portunus pelagicus",
      name: "Vỏ Ghẹ Sấy Khô – Nguồn Canxi tự nhiên, dùng cho sản xuất phân bón hữu cơ và thức ăn chăn nuôi",
      tags: [
        { label: "Phân bón hữu cơ", color: "bg-emerald-50 text-emerald-700 border-emerald-100" },
        { label: "Đang có hàng", color: "bg-green-50 text-green-700 border-green-100" }
      ],
      specs: [
        { label: "Độ ẩm", val: "≤12", unit: "%" },
        { label: "Canxi (Ca)", val: "≥20", unit: "%" },
        { label: "Tạp chất", val: "≤2", unit: "%" },
        { label: "Kích thước", val: "Nguyên vỏ", unit: "" }
      ],
      priceBlock: {
        main: "6.500.000",
        unit: "đồng / Tấn",
        sub: "≈ 6.500 đ/kg · Giá tại kho Vũng Tàu"
      },
      logistics: [
        { label: "SL TỐI THIỂU (MOQ)", val: "5 Tấn / đơn" },
        { label: "KHẢ NĂNG CUNG ỨNG", val: "100 T/tháng" },
        { label: "NƠI XUẤT HÀNG", val: "Bà Rịa - Vũng Tàu" },
        { label: "GIAO HÀNG", val: "Xe tải 5-10T" }
      ],
      pricingTable: [
        { qty: "5 – 15 tấn", price: "6.500.000", payment: "CK 100% trước khi giao", time: "2–4 ngày" },
        { qty: ">15 tấn", price: "6.200.000", payment: "CK 50% trước, 50% nhận hàng", time: "3–5 ngày" }
      ],
      seller: {
        name: "HTX HẢI SẢN VŨNG TÀU",
        avatar: "VTC",
        type: "Hợp tác xã",
        loc: "Long Điền, BR-VT",
        est: "Thành lập 2018",
        certs: ["Tiêu chuẩn cơ sở"]
      },
      shortPrice: "6,500",
      shortTotal: "32.5M / Lô"
    },
    {
      id: "HFP-EXT-NT-2025",
      hsCode: "3101.00.99",
      species: "Mixed Fish By-products",
      name: "Dịch Đạm Cá Thủy Phân (Hydrolyzed Fish Protein) – Đậm đặc, dùng làm phân bón lá sinh học",
      tags: [
        { label: "Phân bón sinh học", color: "bg-lime-50 text-lime-700 border-lime-100" },
        { label: "Nông nghiệp tuần hoàn", color: "bg-teal-50 text-teal-700 border-teal-100" },
        { label: "Bán chạy", color: "bg-orange-50 text-orange-700 border-orange-100 font-bold" }
      ],
      specs: [
        { label: "Đạm tổng số (N)", val: "≥5", unit: "%" },
        { label: "Axit Amin", val: "≥10", unit: "%" },
        { label: "pH", val: "4.5-5.5", unit: "" },
        { label: "Tỷ trọng", val: "1.15", unit: "g/ml" }
      ],
      priceBlock: {
        main: "15.000.000",
        unit: "đồng / IBC 1.000 Lít",
        sub: "≈ 15.000 đ/lít · Phuy 200L hoặc bồn IBC 1000L"
      },
      logistics: [
        { label: "SL TỐI THIỂU (MOQ)", val: "2 IBC / đơn" },
        { label: "KHẢ NĂNG CUNG ỨNG", val: "50 IBC/tháng" },
        { label: "NƠI XUẤT HÀNG", val: "Nha Trang" },
        { label: "GIAO HÀNG", val: "Xe tải chở bồn" }
      ],
      pricingTable: [
        { qty: "2 – 5 IBC", price: "15.000.000", payment: "Tiền mặt / CK 100%", time: "3–5 ngày" },
        { qty: "6 – 10 IBC", price: "14.500.000", payment: "CK 30% trước, 70% nhận hàng", time: "5–7 ngày" },
        { qty: ">10 IBC ★", price: "13.800.000", payment: "Net 15 ngày", time: "7–10 ngày" }
      ],
      seller: {
        name: "CÔNG TY SINH HỌC BIỂN NHA TRANG",
        avatar: "NTB",
        type: "Nhà máy sản xuất",
        loc: "Nha Trang, Khánh Hòa",
        est: "Thành lập 2020",
        certs: ["ISO 9001", "Hợp chuẩn phân bón"]
      },
      shortPrice: "15,000",
      shortTotal: "15M / IBC"
    },
    {
      id: "SFB-SALMON-25",
      hsCode: "0305.20.00",
      species: "Salmo salar",
      name: "Xương/Lườn Cá Hồi Đông Lạnh – Tỷ lệ thịt còn 15-20%, thích hợp làm chà bông, thức ăn thú cưng (Pet food)",
      tags: [
        { label: "Thức ăn thú cưng", color: "bg-purple-50 text-purple-700 border-purple-100" },
        { label: "Nguyên liệu chế biến", color: "bg-pink-50 text-pink-700 border-pink-100" }
      ],
      specs: [
        { label: "Tỷ lệ thịt", val: "15-20", unit: "%" },
        { label: "Độ ẩm", val: "≤70", unit: "%" },
        { label: "Bảo quản", val: "-18", unit: "°C" },
        { label: "Quy cách", val: "Block 10kg", unit: "" }
      ],
      priceBlock: {
        main: "28.000.000",
        unit: "đồng / Tấn",
        sub: "≈ 28.000 đ/kg · Nhập khẩu Nauy, xả cont tại HCM"
      },
      logistics: [
        { label: "SL TỐI THIỂU (MOQ)", val: "1 Tấn / đơn" },
        { label: "KHẢ NĂNG CUNG ỨNG", val: "20 T/tháng" },
        { label: "NƠI XUẤT HÀNG", val: "TP. Hồ Chí Minh" },
        { label: "GIAO HÀNG", val: "Xe đông lạnh" }
      ],
      pricingTable: [
        { qty: "1 – 5 tấn", price: "28.000.000", payment: "CK 100% trước khi giao", time: "1–2 ngày" },
        { qty: ">5 tấn", price: "27.000.000", payment: "CK 30% trước, 70% nhận hàng", time: "2–4 ngày" }
      ],
      seller: {
        name: "CÔNG TY NHẬP KHẨU THỦY SẢN HCM",
        avatar: "SGN",
        type: "Nhà nhập khẩu",
        loc: "Bình Chánh, TP.HCM",
        est: "Thành lập 2016",
        certs: ["Giấy VSATTP", "Chứng từ NK"]
      },
      shortPrice: "28,000",
      shortTotal: "28M / Tấn"
    }
  ];

  // ---------------- STATE & FILTER LOGIC ----------------
  const [selectedLot, setSelectedLot] = useState(mockLots[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Tất cả');
  const [selectedLocation, setSelectedLocation] = useState('Tất cả Nơi Xuất');
  const [sortOrder, setSortOrder] = useState('asc');
  const [filterMoq, setFilterMoq] = useState('');
  const [filterSupply, setFilterSupply] = useState('');
  const [savedLots, setSavedLots] = useState([]);
  const [activeTab, setActiveTab] = useState('Sàn giao dịch');

  // Helpers
  const parsePrice = (priceStr) => parseInt(priceStr.replace(/\./g, ''), 10) || 0;
  const parseNumber = (str) => {
    if (!str) return 0;
    const match = str.match(/\d+(\.\d+)?/);
    return match ? parseFloat(match[0]) : 0;
  };

  // Derived Data
  const filteredLots = mockLots.filter(lot => {
    // 0. Tab "Lô hàng yêu thích"
    if (activeTab === 'Lô hàng yêu thích' && !savedLots.includes(lot.id)) {
      return false;
    }

    // 1. Search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      const matchName = lot.name.toLowerCase().includes(term);
      const matchTags = lot.tags.some(t => t.label.toLowerCase().includes(term));
      const matchId = lot.id.toLowerCase().includes(term);
      const matchSpecies = lot.species.toLowerCase().includes(term);
      if (!matchName && !matchTags && !matchId && !matchSpecies) return false;
    }

    // 2. Category / Functions
    if (activeCategory !== 'Tất cả') {
      const nameLC = lot.name.toLowerCase();
      const tagsLC = lot.tags.map(t => t.label.toLowerCase()).join(' ');
      const content = nameLC + ' ' + tagsLC;
      
      const isVotom = content.includes('vỏ tôm') || content.includes('vỏ ghẹ');
      const isDautom = content.includes('đầu tôm');
      const isBotca = content.includes('bột cá') || content.includes('dịch đạm') || content.includes('mỡ cá') || content.includes('xương');

      if (activeCategory === 'Vỏ tôm/ghẹ' && !isVotom) return false;
      if (activeCategory === 'Đầu tôm' && !isDautom) return false;
      if (activeCategory === 'Bột cá/Dịch đạm/Khác' && !isBotca) return false;
    }

    // 3. Location
    if (selectedLocation !== 'Tất cả Nơi Xuất') {
      const loc = lot.logistics.find(l => l.label === "NƠI XUẤT HÀNG")?.val || '';
      if (!loc.includes(selectedLocation)) return false;
    }

    // 4. MOQ
    if (filterMoq) {
      const moqStr = lot.logistics.find(l => l.label === "SL TỐI THIỂU (MOQ)")?.val || '';
      if (parseNumber(moqStr) > parseFloat(filterMoq)) return false;
    }

    // 5. Supply
    if (filterSupply) {
      const supStr = lot.logistics.find(l => l.label === "KHẢ NĂNG CUNG ỨNG")?.val || '';
      if (parseNumber(supStr) < parseFloat(filterSupply)) return false;
    }

    return true;
  }).sort((a, b) => {
    const pA = parsePrice(a.priceBlock.main);
    const pB = parsePrice(b.priceBlock.main);
    return sortOrder === 'asc' ? pA - pB : pB - pA;
  });

  return (
    <div className="flex h-screen bg-gray-50 font-sans text-gray-800">
      
      {/* ================= SIDEBAR ================= */}
      <aside className="w-60 bg-[#0a192f] text-white flex flex-col shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-gray-700">
          <img src="/logo.png" alt="AquaTrade Logo" className="h-8 w-auto object-contain" />
          <span className="text-lg font-bold ml-2">AquaTrade</span>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-1">
          <NavItem label="Sàn giao dịch" active={activeTab === 'Sàn giao dịch'} onClick={() => setActiveTab('Sàn giao dịch')} icon={<Store size={16} />} />
          <NavItem label="Đơn hàng của tôi" badge="3" icon={<ShoppingCart size={16} />} />
          <NavItem label="Chi tiêu & Ngân sách" icon={<Wallet size={16} />} />
          <p className="px-4 text-[10px] text-gray-500 uppercase font-bold py-2 mt-6">Theo dõi</p>
          <NavItem label="Lô hàng yêu thích" active={activeTab === 'Lô hàng yêu thích'} onClick={() => setActiveTab('Lô hàng yêu thích')} badge={savedLots.length > 0 ? savedLots.length.toString() : null} icon={<Heart size={16} />} />
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

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1 flex flex-col overflow-hidden">
        
        {/* HEADER */}
        <header className="h-15 bg-white border-b flex items-center gap-6 px-8 shrink-0">
          <h1 className="text-[16px] font-bold whitespace-nowrap">{activeTab === 'Lô hàng yêu thích' ? 'Lô hàng yêu thích' : 'Danh Sách Lô Hàng'}</h1>
          <div className="flex-1 max-w-md relative">
            <input 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Tìm lô hàng, tỉnh, loài tôm, chức năng..." 
              className="w-full bg-gray-100 border-none rounded-full pl-10 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-500" 
            />
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
              <Chip label="Tất cả" active={activeCategory === 'Tất cả'} onClick={() => setActiveCategory('Tất cả')} />
              <Chip label="Vỏ tôm/ghẹ" active={activeCategory === 'Vỏ tôm/ghẹ'} onClick={() => setActiveCategory('Vỏ tôm/ghẹ')} />
              <Chip label="Đầu tôm" active={activeCategory === 'Đầu tôm'} onClick={() => setActiveCategory('Đầu tôm')} />
              <Chip label="Bột cá/Dịch đạm/Khác" active={activeCategory === 'Bột cá/Dịch đạm/Khác'} onClick={() => setActiveCategory('Bột cá/Dịch đạm/Khác')} />
            </div>
            
            <div className="flex flex-wrap gap-3 ml-2 border-l border-gray-200 pl-4 items-center">
              <SelectFilter 
                options={['Tất cả Nơi Xuất', 'Cà Mau', 'Đồng Tháp', 'An Giang', 'Kiên Giang', 'Bà Rịa - Vũng Tàu', 'Nha Trang', 'TP. Hồ Chí Minh']} 
                value={selectedLocation}
                onChange={e => setSelectedLocation(e.target.value)}
              />
              
              <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-2">
                <span className="text-[10.5px] text-gray-500 font-medium">MOQ tối đa (T):</span>
                <input 
                  type="number" 
                  placeholder="Vd: 5" 
                  value={filterMoq}
                  onChange={e => setFilterMoq(e.target.value)}
                  className="w-12 outline-none text-[11.5px] py-1.5 font-bold text-gray-700 bg-transparent" 
                />
              </div>

              <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-2">
                <span className="text-[10.5px] text-gray-500 font-medium">Cung ứng (T/tháng) ≥</span>
                <input 
                  type="number" 
                  placeholder="Vd: 100" 
                  value={filterSupply}
                  onChange={e => setFilterSupply(e.target.value)}
                  className="w-14 outline-none text-[11.5px] py-1.5 font-bold text-gray-700 bg-transparent" 
                />
              </div>
            </div>

            <button 
              onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
              className="ml-auto text-xs font-bold text-gray-500 flex items-center gap-1.5 border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition"
            >
              <ArrowUpDown size={14} /> Giá {sortOrder === 'asc' ? 'tăng dần' : 'giảm dần'}
            </button>
          </div>

          {/* GRID: DANH SÁCH BÊN TRÁI - CHI TIẾT BÊN PHẢI */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
            
            {/* DANH SÁCH SẢN PHẨM (Cột Trái) */}
            <div className="xl:col-span-4 2xl:col-span-5 flex flex-col gap-4">
              <div className="flex justify-between items-center text-xs text-gray-500">
                <p>Hiển thị <strong>{filteredLots.length}</strong> kết quả</p>
              </div>

              {/* Danh sách List Lô Hàng */}
              <div className="space-y-4">
                {filteredLots.length === 0 && (
                  <div className="text-center py-10 bg-white border border-dashed border-gray-300 rounded-xl text-gray-500 text-sm">
                    Không tìm thấy sản phẩm phù hợp với bộ lọc
                  </div>
                )}
                {filteredLots.map((lot) => (
                  <div 
                    key={lot.id} 
                    onClick={() => setSelectedLot(lot)}
                    className={`p-4 rounded-xl border transition cursor-pointer flex justify-between items-center ${selectedLot.id === lot.id ? 'bg-blue-50/30 border-blue-400 shadow-sm' : 'bg-white border-gray-200 hover:border-blue-300'}`}
                  >
                    <div className="flex gap-3">
                      <div className="w-10 h-10 border border-gray-200 rounded-lg flex items-center justify-center text-gray-400 shrink-0 bg-gray-50">
                        <Fish size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800 text-[13px] line-clamp-2">{lot.name}</h4>
                        <p className="text-[10px] text-gray-400 font-mono mt-1">{lot.id}</p>
                      </div>
                    </div>
                    <div className="text-right shrink-0 ml-4">
                      <p className="text-[16px] font-black text-[#f97316] leading-none">{lot.shortPrice}</p>
                      <p className="text-[10px] text-gray-500 mt-1 uppercase font-bold tracking-tighter">{lot.shortTotal}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* PHÂN TRANG (PAGINATION) */}
              <div className="flex justify-end items-center gap-1.5 mt-2">
                {[1, 2, 3, '...', 12].map((p, i) => (
                  <button 
                    key={i} 
                    disabled={p === '...'}
                    className={`w-9 h-9 flex items-center justify-center rounded-lg border text-[13px] font-bold transition-colors ${
                      p === 1 
                        ? 'bg-teal-600 text-white border-teal-600 shadow-sm' 
                        : p === '...'
                          ? 'bg-transparent text-gray-500 border-transparent cursor-default'
                          : 'bg-white text-gray-600 border-gray-300 hover:border-teal-500 hover:text-teal-600'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>

            </div>

            {/* PANEL THÔNG TIN CHI TIẾT (Cột Phải) */}
            <div className="xl:col-span-8 2xl:col-span-7">
              <div className="bg-white rounded-xl border border-gray-200 shadow-lg p-6 sticky top-4 flex gap-6">
                
                {/* Cột Ảnh & Thumbnails */}
                <div className="w-48 shrink-0 flex flex-col gap-2">
                  <div className="aspect-square bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center p-4 text-center relative overflow-hidden">
                     <ImageIcon size={40} className="text-gray-300 absolute opacity-20" />
                     <p className="text-xs text-gray-500 z-10 leading-relaxed">
                       <strong className="text-gray-700">Ảnh 1:</strong> Sản phẩm mẫu, cận cảnh bề mặt
                     </p>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    <ThumbBox icon={<Box size={14} />} label="Kho" active />
                    <ThumbBox icon={<FileCheck size={14} />} label="COA" />
                    <ThumbBox icon={<Building2 size={14} />} label="NM" />
                    <ThumbBox icon={<Play size={14} />} label="Vid" color="text-blue-600" />
                  </div>
                </div>

                {/* Cột Thông tin chi tiết */}
                <div className="flex-1 min-w-0 flex flex-col">
                  
                  {/* Header: Tags & Nút Lưu */}
                  <div className="flex justify-between items-start mb-3">
                     <div className="flex flex-wrap gap-2">
                       {selectedLot.tags.map(t => (
                         <span key={t.label} className={`px-2 py-0.5 text-[11px] font-medium border rounded ${t.color}`}>
                           {t.label}
                         </span>
                       ))}
                     </div>
                     <button 
                       onClick={() => {
                         setSavedLots(prev => 
                           prev.includes(selectedLot.id) 
                             ? prev.filter(id => id !== selectedLot.id)
                             : [...prev, selectedLot.id]
                         );
                       }}
                       className={`flex items-center gap-1.5 px-3 py-1 border rounded-lg text-[11px] font-medium transition ${savedLots.includes(selectedLot.id) ? 'bg-pink-50 border-pink-200 text-pink-600' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
                       <Heart size={14} className={savedLots.includes(selectedLot.id) ? 'fill-current' : ''} /> {savedLots.includes(selectedLot.id) ? 'Đã lưu' : 'Lưu'}
                     </button>
                  </div>

                  {/* Tiêu đề & Meta */}
                  <h2 className="text-[18px] font-bold text-gray-900 leading-snug mb-2">
                    {selectedLot.name}
                  </h2>
                  <div className="text-[12px] text-gray-500 font-medium mb-5 flex flex-wrap gap-x-2 gap-y-1">
                    <span>Mã SP: <span className="font-mono text-gray-400">{selectedLot.id}</span></span>
                    <span className="text-gray-300">|</span>
                    <span>Mã HS: <span className="font-mono text-gray-400">{selectedLot.hsCode}</span></span>
                    <span className="text-gray-300">|</span>
                    <span>Loài: <i className="text-gray-500">{selectedLot.species}</i></span>
                  </div>

                  {/* Specs Grid */}
                  <div className="grid grid-cols-4 gap-3 mb-5">
                    {selectedLot.specs.map(s => (
                      <div key={s.label} className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                        <p className="text-[11px] text-gray-500 font-medium mb-1 line-clamp-1">{s.label}</p>
                        <p className="text-[16px] font-bold text-gray-900 leading-none mt-1">
                          {s.val} <span className="text-[11px] font-normal text-gray-400">{s.unit}</span>
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Giá & Logistics */}
                  <div className="flex gap-4 mb-6">
                    {/* Hộp Giá (Box Đỏ) */}
                    <div className="w-[45%] bg-[#fffcfc] border border-red-200 rounded-lg p-4">
                      <p className="text-[11px] font-bold text-[#f97316] mb-1">GIÁ TẠI KHO (VNĐ)</p>
                      <p className="text-[26px] font-black text-[#f97316] leading-none mb-1">{selectedLot.priceBlock.main}</p>
                      <p className="text-[12px] text-gray-600 font-medium">{selectedLot.priceBlock.unit}</p>
                      <p className="text-[10px] text-gray-400 mt-3 leading-relaxed">{selectedLot.priceBlock.sub}</p>
                    </div>

                    {/* Hộp Logistics (2x2) */}
                    <div className="flex-1 grid grid-cols-2 gap-2">
                      {selectedLot.logistics.map(l => (
                        <div key={l.label} className="bg-gray-50 border border-gray-200 rounded-lg p-3 flex flex-col justify-center">
                          <p className="text-[9.5px] text-gray-500 uppercase tracking-tight mb-1">{l.label}</p>
                          <p className="text-[13px] font-bold text-gray-900">{l.val}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* BẢNG GIÁ THEO SỐ LƯỢNG */}
                  <div className="mb-6">
                    <h3 className="text-[12px] font-bold text-gray-500 uppercase tracking-widest mb-3">Bảng giá theo số lượng</h3>
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                      <table className="w-full text-left">
                        <thead className="bg-[#1a2332] text-white text-[11px] font-medium">
                          <tr>
                            <th className="py-2.5 px-4">Số lượng đặt</th>
                            <th className="py-2.5 px-4">Đơn giá (đ/tấn)</th>
                            <th className="py-2.5 px-4">Phương thức / Đóng gói</th>
                            <th className="py-2.5 px-4">Thời gian giao</th>
                          </tr>
                        </thead>
                        <tbody className="text-[12.5px] text-gray-800 font-medium divide-y divide-gray-100">
                          {selectedLot.pricingTable.map((row, i) => (
                            <tr key={i} className={i === selectedLot.pricingTable.length - 1 ? "bg-red-50/30" : ""}>
                              <td className="py-3 px-4">{row.qty}</td>
                              <td className="py-3 px-4 font-bold text-[#f97316]">{row.price}</td>
                              <td className="py-3 px-4 text-gray-600">{row.payment}</td>
                              <td className="py-3 px-4 text-gray-600">{row.time}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* KHỐI NHÀ CUNG CẤP & ACTION */}
                  <div className="flex flex-col gap-4 border-t border-gray-100 pt-5">
                    <div className="flex gap-4">
                      {/* Logo Nhà máy */}
                      <div className="w-14 h-14 bg-[#1a2332] text-white rounded flex items-center justify-center font-bold text-lg shrink-0">
                        {selectedLot.seller.avatar}
                      </div>
                      
                      <div className="flex-1">
                        <h4 className="text-[14px] font-bold text-gray-900 uppercase mb-1.5">
                          {selectedLot.seller.name}
                        </h4>
                        <div className="flex items-center gap-3 text-[12px] text-gray-500 mb-2.5">
                          <span className="flex items-center gap-1"><Building2 size={12}/> {selectedLot.seller.type}</span>
                          <span>|</span>
                          <span className="flex items-center gap-1"><MapPin size={12}/> {selectedLot.seller.loc}</span>
                          <span>|</span>
                          <span className="flex items-center gap-1"><Calendar size={12}/> {selectedLot.seller.est}</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedLot.seller.certs.map(c => (
                            <span key={c} className="px-2 py-0.5 border border-green-500 text-green-600 text-[10px] font-medium rounded-sm">
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Nút Hành động */}
                      <div className="flex flex-col justify-center gap-2 shrink-0">
                        <button className="px-5 py-2 border border-[#f97316] text-[#f97316] rounded font-bold text-[13px] flex items-center justify-center gap-1.5 hover:bg-red-50">
                          <FileText size={16} /> Yêu cầu báo giá
                        </button>
                        <button className="px-5 py-2 bg-[#f97316] text-white rounded font-bold text-[13px] flex items-center justify-center gap-1.5 hover:bg-red-700 shadow-md shadow-red-600/20">
                          <Phone size={16} fill="currentColor" /> Liên hệ ngay
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-start">
                    <button className="flex items-center gap-1 text-[#f97316] text-[13px] font-bold hover:underline">
                      Xem chi tiết đầy đủ (thông số kỹ thuật · ảnh mô tả · hồ sơ nhà cung cấp) <ChevronDown size={16} />
                    </button>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

// ================= SUB-COMPONENTS DÙNG CHUNG =================

const ThumbBox = ({ icon, label, active, color="text-gray-500" }) => (
  <div className={`flex flex-col items-center justify-center py-2.5 border rounded-lg cursor-pointer transition ${active ? 'border-[#f97316] bg-red-50/50 text-[#f97316]' : 'border-gray-200 bg-white hover:bg-gray-50 text-gray-500'}`}>
    <div className={`mb-1 ${active ? 'text-[#f97316]' : color}`}>{icon}</div>
    <span className="text-[10px] font-medium">{label}</span>
  </div>
);

const StatSmall = ({ label, value, sub, color }) => (
  <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden">
    <div className={`absolute bottom-0 left-0 h-1 w-full bg-${color === 'teal' ? 'teal-500' : color === 'orange' ? 'orange-500' : color === 'blue' ? 'blue-500' : 'green-500'}`}></div>
    <p className="text-[9px] uppercase font-bold text-gray-500 mb-1 tracking-widest">{label}</p>
    <p className="text-[26px] font-black text-gray-800 tracking-tight">{value}</p>
    <p className="text-[11px] text-gray-500 mt-1">{sub}</p>
  </div>
);

const Chip = ({ label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`px-4 py-1.5 rounded-full text-[11.5px] font-bold border transition ${active ? 'bg-teal-500 text-white border-teal-500 shadow-sm' : 'bg-white text-gray-600 border-gray-200 hover:border-teal-400 hover:text-teal-600'}`}>
    {label}
  </button>
);

const SelectFilter = ({ options, value, onChange }) => (
  <select 
    value={value}
    onChange={onChange}
    className="bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-[11.5px] font-medium text-gray-600 outline-none focus:border-teal-500 cursor-pointer">
    {options.map(o => <option key={o} value={o}>{o}</option>)}
  </select>
);

const NavItem = ({ label, active, badge, icon, onClick }) => (
  <a href="#" onClick={(e) => { e.preventDefault(); if (onClick) onClick(); }} className={`flex items-center px-4 py-2.5 rounded-lg transition ${active ? 'bg-teal-500 text-white shadow-md font-bold' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}>
    <span className={`mr-3 ${active ? 'opacity-100' : 'opacity-80'}`}>{icon}</span>
    <span className="flex-1 text-sm">{label}</span>
    {badge && <span className={`${active ? 'bg-white text-teal-600' : 'bg-orange-500 text-white'} text-[9px] font-bold px-2 py-0.5 rounded-full`}>{badge}</span>}
  </a>
);

export default BuyerDashboard;