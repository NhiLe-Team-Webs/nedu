"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Loader2, CheckCircle2 } from "lucide-react";

export default function ChallengeRegistrationForm() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        telegram: "",
        dob: "",
        gender: "",
        address: "",
        note: "",
    });
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<{
        qrUrl: string;
        orderCode: string;
        amount: number;
        accountNumber: string;
        bankCode: string;
        accountName: string;
    } | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/register-challenge", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                setResult(data);
            } else {
                alert(data.error || "Có lỗi xảy ra");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Lỗi kết nối, vui lòng thử lại.");
        } finally {
            setLoading(false);
        }
    };

    // Poll for payment status
    useEffect(() => {
        if (!result?.orderCode) return;

        const checkPayment = async () => {
            try {
                const res = await fetch(`/api/sepay/payment?orderCode=${result.orderCode}`);
                if (res.ok) {
                    const data = await res.json();
                    // Adjust this condition based on your actual API response structure
                    if (data.order && (data.order.status === 'success' || data.order.status === 'completed')) {
                        // Redirect to success page
                        router.push(`/payment-success?status=success&orderCode=${result.orderCode}`);
                    }
                }
            } catch (err) {
                console.error("Error checking payment:", err);
            }
        };

        const interval = setInterval(checkPayment, 3000); // Check every 3 seconds
        return () => clearInterval(interval);
    }, [result, router]);


    if (result) {
        return (
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 max-w-md mx-auto text-center animate-in fade-in zoom-in duration-300">
                <h3 className="text-2xl font-bold text-[#F8B516] mb-4">Quét mã thanh toán</h3>
                <p className="text-gray-600 mb-6 text-sm">
                    Vui lòng quét mã QR bên dưới để hoàn tất đăng ký.
                    <br />Hệ thống sẽ tự động xác nhận khi nhận được tiền.
                </p>

                <div className="flex justify-center mb-6">
                    <div className="relative w-[280px] h-[280px] border-2 border-[#F8B516] rounded-xl overflow-hidden p-2 bg-white">
                        <Image
                            src={result.qrUrl}
                            alt="Payment QR Code"
                            fill
                            className="object-contain"
                            unoptimized // QR codes often generated dynamically
                        />
                    </div>
                </div>

                <div className="text-left bg-gray-50 p-4 rounded-lg space-y-2 text-sm border border-gray-100">
                    <div className="flex justify-between">
                        <span className="text-gray-500">Người thụ hưởng:</span>
                        <span className="font-bold text-gray-800 uppercase">{result.accountName}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">Số tài khoản:</span>
                        <span className="font-bold text-gray-800">{result.accountNumber} ({result.bankCode})</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">Số tiền:</span>
                        <span className="font-bold text-[#F8B516] text-lg">{result.amount.toLocaleString()} VND</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-gray-200 mt-2">
                        <span className="text-gray-500">Nội dung CK:</span>
                        <span className="font-mono font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded select-all cursor-pointer"
                            onClick={() => navigator.clipboard.writeText(result.orderCode)}>
                            {result.orderCode}
                        </span>
                    </div>
                    <p className="text-xs text-center text-gray-400 mt-2 italic">(*Bấm vào nội dung để sao chép)</p>
                </div>

                <div className="mt-6 flex items-center justify-center gap-2 text-gray-500 text-sm">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Đang chờ xác nhận thanh toán...
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white p-8 rounded-[24px] shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-gray-100 max-w-lg mx-auto">
            <h3 className="text-2xl font-bold text-center mb-6 text-[#F8B516]">
                ĐĂNG KÝ THAM GIA
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Họ và tên
                    </label>
                    <input
                        type="text"
                        required
                        name="name"
                        placeholder="Nhập họ tên của bạn"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F8B516] focus:border-transparent transition"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        required
                        name="email"
                        placeholder="example@gmail.com"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F8B516] focus:border-transparent transition"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Số điện thoại *
                    </label>
                    <input
                        type="tel"
                        required
                        name="phone"
                        placeholder="Nhập số điện thoại (Zalo)"
                        pattern="[0-9]{10,11}"
                        title="Vui lòng nhập số điện thoại hợp lệ (10-11 số)"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F8B516] focus:border-transparent transition"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Username Telegram *
                    </label>
                    <input
                        type="text"
                        required
                        name="telegram"
                        placeholder="@username"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F8B516] focus:border-transparent transition"
                        value={formData.telegram}
                        onChange={handleChange}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Ngày sinh *
                        </label>
                        <input
                            type="date"
                            required
                            name="dob"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F8B516] focus:border-transparent transition"
                            value={formData.dob}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Giới tính *
                        </label>
                        <select
                            required
                            name="gender"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F8B516] focus:border-transparent transition bg-white"
                            value={formData.gender}
                            onChange={handleChange}
                        >
                            <option value="">Chọn giới tính</option>
                            <option value="Nam">Nam</option>
                            <option value="Nữ">Nữ</option>
                            <option value="Khác">Khác</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Địa chỉ
                    </label>
                    <input
                        type="text"
                        name="address"
                        placeholder="Nhập địa chỉ của bạn"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F8B516] focus:border-transparent transition"
                        value={formData.address}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Ghi chú
                    </label>
                    <textarea
                        name="note"
                        rows={3}
                        placeholder="Nhập ghi chú (nếu có)"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F8B516] focus:border-transparent transition resize-none"
                        value={formData.note}
                        onChange={handleChange}
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#F8B516] hover:bg-[#e0a214] text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Đang xử lý...
                        </>
                    ) : (
                        <>
                            THANH TOÁN (396.000đ)
                        </>
                    )}
                </button>

                <p className="text-xs text-center text-gray-400 pt-2">
                    Thông tin thanh toán sẽ được gửi và tích hợp tự động.
                </p>
            </form>
        </div>
    );
}
