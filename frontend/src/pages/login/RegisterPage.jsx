import { useState } from "react";
import { Link } from "react-router-dom";

export default function RegisterPage() {
    const [step, setStep] = useState(1);
    const [registered, setRegistered] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState("");

    const [form, setForm] = useState({
        fullName: "",
        cccd: "",
        position: "",
        phone: "",
        email: "",
        avatar: null,

        companyName: "",
        taxCode: "",
        foundedDate: "",
        businessLicense: null,
        headOfficeAddress: "",
        warehouseAddress: "",

        role: "",

        usernameOrEmail: "",
        password: "",
        confirmPassword: "",
    });

    const steps = ["Người đại diện", "Doanh nghiệp", "Vai trò", "Tạo tài khoản"];

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));

        setError("");
    };

    const validateStep = () => {
        if (step === 1) {
            if (!form.fullName || !form.cccd || !form.position || !form.phone || !form.email) {
                return "Vui lòng nhập đầy đủ thông tin người đại diện.";
            }
        }

        if (step === 2) {
            if (!form.companyName || !form.taxCode || !form.businessLicense || !form.headOfficeAddress) {
                return "Vui lòng nhập đầy đủ thông tin doanh nghiệp.";
            }
        }

        if (step === 3) {
            if (!form.role) {
                return "Vui lòng chọn vai trò tham gia.";
            }
        }

        if (step === 4) {
            if (!form.usernameOrEmail || !form.password || !form.confirmPassword) {
                return "Vui lòng nhập đầy đủ thông tin tài khoản.";
            }

            if (form.password !== form.confirmPassword) {
                return "Mật khẩu xác nhận không khớp.";
            }

            if (!isPasswordValid(form.password)) {
                return "Mật khẩu chưa đạt yêu cầu.";
            }
        }

        return "";
    };

    const nextStep = () => {
        const message = validateStep();

        if (message) {
            setError(message);
            return;
        }

        setError("");

        if (step < 4) {
            setStep(step + 1);
            return;
        }

        setRegistered(true);
    };

    const prevStep = () => {
        setError("");
        if (step > 1) setStep(step - 1);
    };

    const passwordChecks = {
        length: form.password.length >= 8,
        lowercase: /[a-z]/.test(form.password),
        uppercase: /[A-Z]/.test(form.password),
        number: /\d/.test(form.password),
        special: /[^A-Za-z0-9]/.test(form.password),
    };

    const strengthCount = Object.values(passwordChecks).filter(Boolean).length;

    function isPasswordValid(password) {
        return (
            password.length >= 8 &&
            /[a-z]/.test(password) &&
            /[A-Z]/.test(password) &&
            /\d/.test(password) &&
            /[^A-Za-z0-9]/.test(password)
        );
    }

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-[#f7f9fb] text-[#191c1e] overflow-x-hidden">
            <AuthBrandPanel />

            <header className="md:hidden w-full h-20 aqua-gradient flex items-center px-4">
                <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#71f8e4] text-3xl">
            waves
          </span>
                    <span className="text-2xl text-white font-bold">AquaTrade</span>
                </div>
            </header>

            <main className="w-full md:w-[60%] flex items-center justify-center px-4 py-10 md:p-10 bg-[#f7f9fb]">
                <div className="w-full max-w-[760px]">
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 px-8 md:px-10 py-8">
                        {registered ? (
                            <SuccessStep form={form} />
                        ) : (
                            <>
                                <RegisterHeader step={step} />

                                <StepBar steps={steps} currentStep={step} />

                                {error && (
                                    <div className="mt-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-start gap-3">
                    <span className="material-symbols-outlined text-[20px]">
                      error
                    </span>
                                        <p className="text-sm font-medium">{error}</p>
                                    </div>
                                )}

                                <div className="mt-8">
                                    {step === 1 && (
                                        <RepresentativeStep form={form} handleChange={handleChange} />
                                    )}

                                    {step === 2 && (
                                        <BusinessStep form={form} handleChange={handleChange} />
                                    )}

                                    {step === 3 && (
                                        <RoleStep form={form} handleChange={handleChange} />
                                    )}

                                    {step === 4 && (
                                        <AccountStep
                                            form={form}
                                            handleChange={handleChange}
                                            showPassword={showPassword}
                                            setShowPassword={setShowPassword}
                                            showConfirmPassword={showConfirmPassword}
                                            setShowConfirmPassword={setShowConfirmPassword}
                                            passwordChecks={passwordChecks}
                                            strengthCount={strengthCount}
                                        />
                                    )}
                                </div>

                                <div className="mt-8 pt-6 border-t border-gray-200 flex justify-between gap-4">
                                    <button
                                        type="button"
                                        onClick={prevStep}
                                        disabled={step === 1}
                                        className={`px-7 py-3 border font-semibold transition flex items-center gap-2 ${
                                            step === 1
                                                ? "border-gray-200 text-gray-300 cursor-not-allowed"
                                                : "border-gray-300 text-gray-700 hover:bg-gray-50"
                                        }`}
                                    >
                                        <span>←</span>
                                        Quay lại
                                    </button>

                                    <div className="flex gap-3">
                                        <button
                                            type="button"
                                            className="px-7 py-3 border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition"
                                        >
                                            Lưu nháp
                                        </button>

                                        <button
                                            type="button"
                                            onClick={nextStep}
                                            className="px-8 py-3 bg-[#00796B] text-white font-semibold hover:bg-[#00695C] transition flex items-center gap-2"
                                        >
                                            {step === 4 ? "Hoàn tất đăng ký" : "Tiếp tục"}
                                            <span>→</span>
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                    <div className="mt-8 flex flex-wrap justify-center gap-6 px-4">
                        <div className="flex items-center gap-1.5 opacity-60">
              <span className="material-symbols-outlined text-[18px]">
                verified_user
              </span>
                            <span className="text-[12px] font-semibold uppercase tracking-wider">
                SSL Secured
              </span>
                        </div>

                        <div className="flex items-center gap-1.5 opacity-60">
              <span className="material-symbols-outlined text-[18px]">
                gavel
              </span>
                            <span className="text-[12px] font-semibold uppercase tracking-wider">
                Compliance ready
              </span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

function RegisterHeader({ step }) {
    const titles = {
        1: "Đăng ký tham gia",
        2: "Thông tin doanh nghiệp",
        3: "Xác định vai trò của bạn",
        4: "Tạo tài khoản đăng nhập",
    };

    const descriptions = {
        1: "Vui lòng cung cấp thông tin người đại diện hợp pháp của doanh nghiệp.",
        2: "Vui lòng cung cấp chi tiết pháp lý để xác thực tài khoản tổ chức của bạn trên nền tảng AquaTrade.",
        3: "Việc chọn đúng vai trò giúp chúng tôi tùy chỉnh giao diện và công cụ phù hợp nhất cho doanh nghiệp của bạn trên AquaTrade.",
        4: "Thiết lập username hoặc email và mật khẩu để đăng nhập vào AquaTrade.",
    };

    return (
        <header className="mb-8">
            <h1 className="text-[28px] md:text-[30px] font-bold text-gray-800 mb-2">
                {titles[step]}
            </h1>
            <p className="text-gray-500 leading-relaxed">{descriptions[step]}</p>
        </header>
    );
}

function StepBar({ steps, currentStep }) {
    return (
        <div className="w-full">
            <div className="flex items-start justify-between">
                {steps.map((label, index) => {
                    const stepNumber = index + 1;
                    const active = stepNumber === currentStep;
                    const completed = stepNumber < currentStep;

                    return (
                        <div key={label} className="flex-1 relative">
                            <div className="flex items-center">
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold z-10 ${
                                        completed
                                            ? "bg-[#00796B] text-white"
                                            : active
                                                ? "bg-[#00796B] text-white"
                                                : "bg-white border-2 border-gray-300 text-gray-400"
                                    }`}
                                >
                                    {completed ? "✓" : stepNumber}
                                </div>

                                {index < steps.length - 1 && (
                                    <div
                                        className={`h-[2px] flex-1 ${
                                            completed ? "bg-[#00796B]" : "bg-gray-300"
                                        }`}
                                    />
                                )}
                            </div>

                            <p
                                className={`mt-2 text-xs font-semibold ${
                                    active || completed ? "text-[#00796B]" : "text-gray-500"
                                }`}
                            >
                                {label}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

function RepresentativeStep({ form, handleChange }) {
    return (
        <div className="space-y-5">
            <Input
                label="Họ và tên người đại diện *"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="Nhập họ và tên"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Input
                    label="Số CCCD *"
                    name="cccd"
                    value={form.cccd}
                    onChange={handleChange}
                    placeholder="12 chữ số"
                />

                <Select
                    label="Chức vụ *"
                    name="position"
                    value={form.position}
                    onChange={handleChange}
                    placeholder="Chọn chức vụ"
                    options={[
                        "Giám đốc",
                        "Phó giám đốc",
                        "Chủ doanh nghiệp",
                        "Đại diện pháp luật",
                        "Trưởng phòng kinh doanh",
                    ]}
                />

                <Input
                    label="Số điện thoại *"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+84"
                />

                <Input
                    label="Email cá nhân/công ty *"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="email@domain.com"
                />
            </div>

            <FileUpload
                label="Ảnh đại diện (Tùy chọn)"
                name="avatar"
                file={form.avatar}
                onChange={handleChange}
                accept="image/png,image/jpeg,image/gif"
                note="PNG, JPG, GIF tối đa 5MB"
            />
        </div>
    );
}

function BusinessStep({ form, handleChange }) {
    return (
        <div className="space-y-5">
            <Input
                label="Tên doanh nghiệp đầy đủ *"
                name="companyName"
                value={form.companyName}
                onChange={handleChange}
                placeholder="VD: Công ty Cổ phần Thủy sản AquaTrade"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Input
                    label="Mã số thuế *"
                    name="taxCode"
                    value={form.taxCode}
                    onChange={handleChange}
                    placeholder="Nhập mã số thuế"
                />

                <Input
                    label="Ngày thành lập"
                    name="foundedDate"
                    type="date"
                    value={form.foundedDate}
                    onChange={handleChange}
                />
            </div>

            <FileUpload
                label="Giấy phép kinh doanh (ERC) *"
                name="businessLicense"
                file={form.businessLicense}
                onChange={handleChange}
                accept="application/pdf,image/png,image/jpeg"
                note="Hỗ trợ PDF, JPG, PNG tối đa 10MB"
            />

            <TextArea
                label="Địa chỉ trụ sở chính *"
                name="headOfficeAddress"
                value={form.headOfficeAddress}
                onChange={handleChange}
                placeholder="Nhập địa chỉ đầy đủ theo giấy phép kinh doanh"
            />

            <div className="pt-4 border-t border-gray-200">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Địa chỉ kho bãi/nhà máy (Tùy chọn)
                </label>

                <div className="flex gap-3">
                    <input
                        name="warehouseAddress"
                        value={form.warehouseAddress}
                        onChange={handleChange}
                        placeholder="Nhập địa chỉ cơ sở"
                        className="flex-1 border border-gray-300 px-4 py-3 outline-none focus:border-[#00796B]"
                    />

                    <button
                        type="button"
                        onClick={() =>
                            handleChange({
                                target: { name: "warehouseAddress", value: "" },
                            })
                        }
                        className="w-12 border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                    >
            <span className="material-symbols-outlined text-gray-600">
              delete
            </span>
                    </button>
                </div>

                <button
                    type="button"
                    className="mt-4 text-[#00796B] font-semibold text-sm hover:underline"
                >
                    + Thêm địa điểm
                </button>
            </div>
        </div>
    );
}

function RoleStep({ form, handleChange }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <RoleCard
                icon="factory"
                title="Người bán"
                desc="Cung cấp phụ phẩm thủy sản, nguyên liệu thô cho chuỗi cung ứng toàn cầu."
                value="seller"
                selected={form.role === "seller"}
                onChange={handleChange}
            />

            <RoleCard
                icon="shopping_cart"
                title="Người mua"
                desc="Tìm mua nguyên liệu chất lượng cao cho ngành Feed/Biotech."
                value="buyer"
                selected={form.role === "buyer"}
                onChange={handleChange}
            />
        </div>
    );
}

function RoleCard({ icon, title, desc, value, selected, onChange }) {
    return (
        <label
            className={`border rounded-xl p-6 cursor-pointer transition min-h-[180px] ${
                selected
                    ? "border-[#00796B] bg-emerald-50 shadow-sm"
                    : "border-gray-300 bg-white hover:border-[#00796B]"
            }`}
        >
            <input
                type="radio"
                name="role"
                value={value}
                checked={selected}
                onChange={onChange}
                className="hidden"
            />

            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-7">
                <span className="material-symbols-outlined text-gray-700">{icon}</span>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
        </label>
    );
}

function AccountStep({
                         form,
                         handleChange,
                         showPassword,
                         setShowPassword,
                         showConfirmPassword,
                         setShowConfirmPassword,
                         passwordChecks,
                         strengthCount,
                     }) {
    return (
        <div className="space-y-5">
            <Input
                label="Username hoặc Email"
                name="usernameOrEmail"
                value={form.usernameOrEmail}
                onChange={handleChange}
                placeholder="Nhập username hoặc email"
            />

            <PasswordInput
                label="Mật khẩu"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Tạo mật khẩu"
                show={showPassword}
                onToggle={() => setShowPassword(!showPassword)}
            />

            <div>
                <div className="grid grid-cols-3 gap-2 mb-1">
                    <div
                        className={`h-1 rounded-full ${
                            strengthCount >= 1 ? "bg-red-400" : "bg-gray-200"
                        }`}
                    />
                    <div
                        className={`h-1 rounded-full ${
                            strengthCount >= 3 ? "bg-yellow-400" : "bg-gray-200"
                        }`}
                    />
                    <div
                        className={`h-1 rounded-full ${
                            strengthCount >= 5 ? "bg-green-500" : "bg-gray-200"
                        }`}
                    />
                </div>

                <p className="text-xs text-right text-gray-500">
                    {strengthCount >= 5 ? "Strong" : strengthCount >= 3 ? "Medium" : "Weak"}
                </p>
            </div>

            <div className="bg-gray-100 rounded-lg p-4">
                <p className="text-sm font-semibold text-gray-700 mb-3">
                    Mật khẩu của bạn phải chứa:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <CheckItem checked={passwordChecks.length} text="Tối thiểu 8 ký tự" />
                    <CheckItem checked={passwordChecks.uppercase} text="1 ký tự viết hoa" />
                    <CheckItem checked={passwordChecks.lowercase} text="1 ký tự viết thường" />
                    <CheckItem checked={passwordChecks.number} text="1 chữ số" />
                    <CheckItem checked={passwordChecks.special} text="1 ký tự đặc biệt" />
                </div>
            </div>

            <PasswordInput
                label="Xác nhận mật khẩu"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Nhập lại mật khẩu"
                show={showConfirmPassword}
                onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
            />
        </div>
    );
}

function SuccessStep({ form }) {
    return (
        <div className="text-center">
            <div className="w-20 h-20 mx-auto rounded-full bg-teal-50 flex items-center justify-center mb-6">
        <span className="material-symbols-outlined text-[#00796B] text-4xl">
          check_circle
        </span>
            </div>

            <h1 className="text-[28px] font-bold text-gray-800 mb-4">
                Đăng ký thành công
            </h1>

            <p className="text-gray-600 max-w-md mx-auto leading-relaxed mb-10">
                Hồ sơ doanh nghiệp của bạn đã được gửi đến AquaTrade. Chúng tôi sẽ kiểm
                tra thông tin pháp lý và giấy tờ xác minh trước khi kích hoạt đầy đủ tài
                khoản.
            </p>

            <div className="bg-gray-50 rounded-lg p-6 text-left mb-8">
                <p className="text-sm font-bold text-gray-500 uppercase mb-5">
                    Thông tin hồ sơ
                </p>

                <InfoRow label="Tên doanh nghiệp" value={form.companyName || "AquaTrade Co."} />
                <InfoRow
                    label="Vai trò"
                    value={
                        form.role === "seller"
                            ? "Người bán"
                            : form.role === "buyer"
                                ? "Người mua"
                                : "Người bán/Người mua"
                    }
                />
                <InfoRow
                    label="Trạng thái"
                    value={<span className="px-3 py-1 rounded-full bg-orange-50 text-orange-500 text-xs font-bold">Chờ xác minh</span>}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link
                    to="/login"
                    className="py-4 bg-[#00796B] text-white font-bold rounded-md hover:bg-[#00695C] transition"
                >
                    Về trang đăng nhập
                </Link>

                <button
                    type="button"
                    className="py-4 border border-gray-300 text-gray-700 font-bold rounded-md hover:bg-gray-50 transition"
                >
                    Xem trạng thái hồ sơ
                </button>
            </div>
        </div>
    );
}

function InfoRow({ label, value }) {
    return (
        <div className="flex justify-between items-center py-3">
            <span className="text-gray-500 font-semibold">{label}</span>
            <span className="text-gray-800 font-bold text-right">{value}</span>
        </div>
    );
}

function Input({ label, name, value, onChange, placeholder, type = "text" }) {
    return (
        <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
                {label}
            </label>

            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full border border-gray-300 px-4 py-3 outline-none focus:border-[#00796B]"
            />
        </div>
    );
}

function PasswordInput({
                           label,
                           name,
                           value,
                           onChange,
                           placeholder,
                           show,
                           onToggle,
                       }) {
    return (
        <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
                {label}
            </label>

            <div className="relative">
                <input
                    type={show ? "text" : "password"}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className="w-full border border-gray-300 px-4 py-3 pr-12 outline-none focus:border-[#00796B]"
                />

                <button
                    type="button"
                    onClick={onToggle}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                >
          <span className="material-symbols-outlined">
            {show ? "visibility_off" : "visibility"}
          </span>
                </button>
            </div>
        </div>
    );
}

function Select({ label, name, value, onChange, placeholder, options }) {
    return (
        <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
                {label}
            </label>

            <select
                name={name}
                value={value}
                onChange={onChange}
                className="w-full border border-gray-300 px-4 py-3 outline-none focus:border-[#00796B] bg-white"
            >
                <option value="">{placeholder}</option>

                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
}

function TextArea({ label, name, value, onChange, placeholder }) {
    return (
        <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
                {label}
            </label>

            <textarea
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                rows="4"
                className="w-full border border-gray-300 px-4 py-3 outline-none resize-none focus:border-[#00796B]"
            />
        </div>
    );
}

function FileUpload({ label, name, file, onChange, accept, note }) {
    return (
        <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
                {label}
            </label>

            <label className="w-full h-32 border border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition">
        <span className="material-symbols-outlined text-gray-500 text-3xl mb-2">
          upload_file
        </span>

                <p className="text-sm text-gray-500">
                    Kéo thả file vào đây hoặc{" "}
                    <span className="text-[#00796B] font-semibold">tải lên</span>
                </p>

                <p className="text-xs text-gray-400 mt-1">{note}</p>

                <input
                    type="file"
                    name={name}
                    accept={accept}
                    onChange={onChange}
                    className="hidden"
                />
            </label>

            {file && (
                <p className="text-sm text-gray-500 mt-2">
                    Đã chọn: <span className="font-semibold">{file.name}</span>
                </p>
            )}
        </div>
    );
}

function CheckItem({ checked, text }) {
    return (
        <div className="flex items-center gap-2 text-sm text-gray-600">
      <span
          className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] ${
              checked
                  ? "bg-[#00796B] border-[#00796B] text-white"
                  : "border-gray-400"
          }`}
      >
        {checked ? "✓" : ""}
      </span>
            {text}
        </div>
    );
}

function AuthBrandPanel() {
    return (
        <section className="aqua-gradient w-full md:w-[40%] flex-col justify-center p-10 text-white hidden md:flex relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-64 h-64 rounded-full border-4 border-[#71f8e4]" />
                <div className="absolute bottom-[10%] left-[-5%] w-32 h-32 rounded-full bg-[#71f8e4] opacity-20" />
            </div>

            <div className="z-10 max-w-md">
                <div className="flex items-center gap-3 mb-8">
          <span className="material-symbols-outlined text-[#71f8e4] text-4xl">
            waves
          </span>
                    <h1 className="text-5xl font-bold tracking-tight">AquaTrade</h1>
                </div>

                <h2 className="text-3xl font-semibold mb-6 leading-tight">
                    Nền tảng B2B cho giao dịch phụ phẩm thủy sản minh bạch
                </h2>

                <p className="text-lg mb-12 opacity-90">
                    Chuẩn hóa hồ sơ doanh nghiệp, xác thực giấy tờ và kết nối người mua —
                    người bán trong chuỗi giá trị thủy sản.
                </p>

                <div className="grid grid-cols-1 gap-6">
                    <Feature
                        icon="factory"
                        title="Số hóa nhà máy"
                        desc="Quản lý quy trình sản xuất thông minh"
                    />

                    <Feature
                        icon="set_meal"
                        title="Kiểm soát chất lượng"
                        desc="Tiêu chuẩn thủy sản quốc tế"
                    />

                    <Feature
                        icon="description"
                        title="Hợp đồng thông minh"
                        desc="Giao dịch an toàn, minh bạch"
                    />
                </div>
            </div>
        </section>
    );
}

function Feature({ icon, title, desc }) {
    return (
        <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
            <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-teal-300/20 text-[#71f8e4]">
                <span className="material-symbols-outlined">{icon}</span>
            </div>

            <div>
                <p className="text-sm font-semibold text-white">{title}</p>
                <p className="text-sm text-gray-300">{desc}</p>
            </div>
        </div>
    );
}