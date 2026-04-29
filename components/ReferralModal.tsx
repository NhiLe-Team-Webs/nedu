'use client';

import React, { useState } from 'react';
import { X, Gift, CheckCircle2, Loader2, Send, Copy, Share2, UserPlus, Zap, RefreshCw } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

import { createReferralAction } from '@/lib/actions/referral';

interface ReferralModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ReferralModal({ isOpen, onClose }: ReferralModalProps) {
    const { t } = useLanguage();
    const [step, setStep] = useState<'form' | 'success'>('form');
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        telegram: '',
        birthdate: '',
        gender: '',
        previousCourse: '',
        note: '',
    });
    const [generatedCode, setGeneratedCode] = useState('');

    if (!isOpen) return null;

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedCode);
        alert('Đã sao chép mã!');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const code = `LCM-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
            
            // Use Server Action instead of fetch to avoid connection issues
            const result = await createReferralAction({
                alumniName: formData.name,
                alumniEmail: formData.email,
                alumniPhone: formData.phone,
                alumniUserTele: formData.telegram,
                alumniBirthDate: formData.birthdate,
                alumniGender: formData.gender,
                previousCourse: formData.previousCourse,
                referralCode: code,
            });

            if (!result.success) {
                throw new Error(result.error || 'Failed to create referral');
            }

            setGeneratedCode(code);
            setStep('success');
        } catch (error: any) {
            console.error('Error creating referral code:', error);
            alert(`Có lỗi xảy ra: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-2xl rounded-[32px] shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-300">
                {/* Content Side */}
                <div className="p-6 md:p-10 bg-gray-50/50 flex flex-col justify-center">
                    <div className="relative mb-8 flex items-center justify-center">
                        {step === 'success' && (
                            <button 
                                onClick={() => setStep('form')}
                                className="absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full text-gray-400 hover:bg-gray-100 transition-colors flex items-center gap-1 text-xs font-bold uppercase tracking-wider"
                            >
                                <RefreshCw className="w-4 h-4" />
                                <span className="hidden sm:inline">Tạo lại</span>
                            </button>
                        )}
                        
                        <h3 className={`text-2xl font-black uppercase tracking-tight transition-colors duration-500 ${step === 'success' ? 'text-green-600' : 'text-gray-900'}`}>
                            {step === 'form' ? 'Lấy Mã Giới Thiệu' : 'Thành Công!'}
                        </h3>

                        <button 
                            onClick={onClose}
                            className="absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-full text-gray-400 hover:bg-gray-100 transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                    {step === 'form' ? (
                        <form onSubmit={handleSubmit} className="space-y-5">
                            
                            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                                <div className="col-span-2">
                                    <label className="block text-text-primary font-semibold mb-1 text-xs ml-1">Họ và tên <span className="text-red-500">*</span></label>
                                    <input 
                                        required
                                        type="text"
                                        className="w-full bg-gray-50 border border-gray-200 rounded-ios-md px-4 py-2.5 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm appearance-none"
                                        placeholder="Nguyễn Văn A"
                                        value={formData.name}
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    />
                                </div>

                                <div>
                                    <label className="block text-text-primary font-semibold mb-1 text-xs ml-1">Email <span className="text-red-500">*</span></label>
                                    <input 
                                        required
                                        type="email"
                                        className="w-full bg-gray-50 border border-gray-200 rounded-ios-md px-4 py-2.5 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm appearance-none"
                                        placeholder="email@example.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <label className="block text-text-primary font-semibold mb-1 text-xs ml-1">Số điện thoại <span className="text-red-500">*</span></label>
                                    <input 
                                        required
                                        type="tel"
                                        className="w-full bg-gray-50 border border-gray-200 rounded-ios-md px-4 py-2.5 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm appearance-none"
                                        placeholder="09xx xxx xxx"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                    />
                                </div>

                                <div>
                                    <label className="block text-text-primary font-semibold mb-1 text-xs ml-1">Telegram <span className="text-red-500">*</span></label>
                                    <div className="relative">
                                        <input 
                                            required
                                            type="text"
                                            className="peer w-full bg-gray-50 border border-gray-200 rounded-ios-md pl-8 pr-4 py-2.5 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm appearance-none"
                                            placeholder="username"
                                            value={formData.telegram}
                                            onChange={(e) => setFormData({...formData, telegram: e.target.value.replace(/^@+/, '')})}
                                        />
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none peer-focus:text-primary transition-colors">@</span>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-text-primary font-semibold mb-1 text-xs ml-1">Ngày sinh <span className="text-red-500">*</span></label>
                                    <input 
                                        required
                                        type="date"
                                        className="w-full bg-gray-50 border border-gray-200 rounded-ios-md px-4 py-2.5 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm appearance-none"
                                        value={formData.birthdate}
                                        onChange={(e) => setFormData({...formData, birthdate: e.target.value})}
                                    />
                                </div>

                                <div>
                                    <label className="block text-text-primary font-semibold mb-1 text-xs ml-1">Giới tính <span className="text-red-500">*</span></label>
                                    <select
                                        required
                                        className="w-full bg-gray-50 border border-gray-200 rounded-ios-md px-4 py-2.5 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm appearance-none"
                                        value={formData.gender}
                                        onChange={(e) => setFormData({...formData, gender: e.target.value})}
                                    >
                                        <option value="">Chọn giới tính</option>
                                        <option value="Nam">Nam</option>
                                        <option value="Nữ">Nữ</option>
                                        <option value="Khác">Khác</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-text-primary font-semibold mb-1 text-xs ml-1">Khóa học cũ <span className="text-red-500">*</span></label>
                                    <select
                                        required
                                        className="w-full bg-gray-50 border border-gray-200 rounded-ios-md px-4 py-2.5 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm appearance-none"
                                        value={formData.previousCourse}
                                        onChange={(e) => setFormData({...formData, previousCourse: e.target.value})}
                                    >
                                        <option value="">Chọn khóa học</option>
                                        <option value="Money & You">Money & You</option>
                                        <option value="Ignite 01">Ignite 01</option>
                                        <option value="Ignite 02">Ignite 02</option>
                                        <option value="Là Chính Mình 01">Là Chính Mình 01</option>
                                        <option value="Là Chính Mình 02">Là Chính Mình 02</option>
                                        <option value="Là Chính Mình 03">Là Chính Mình 03</option>
                                        <option value="Là Chính Mình 04">Là Chính Mình 04</option>
                                    </select>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-extrabold py-3.5 rounded-xl shadow-ios-md hover:shadow-ios-lg transition-all flex items-center justify-center gap-2 transform active:scale-[0.98] mt-4"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Đang xử lý...
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-5 h-5" />
                                        Nhận mã ngay
                                    </>
                                )}
                            </button>
                        </form>
                    ) : (
                        <div className="text-center animate-in zoom-in duration-500">
                            <div className="relative bg-white border-2 border-dashed border-yellow-400 rounded-3xl p-8 shadow-inner overflow-hidden mb-8">
                                {/* Ticket cutout dots */}
                                <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-gray-50 rounded-full border-r-2 border-dashed border-yellow-400"></div>
                                <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-gray-50 rounded-full border-l-2 border-dashed border-yellow-400"></div>
                                
                                <div className="space-y-2">
                                    <span className="text-xs font-bold text-yellow-600 uppercase tracking-widest">Mã Giới Thiệu Của Bạn</span>
                                    <div className="flex items-center justify-center gap-4 py-4">
                                        <span className="text-5xl font-black text-gray-900 tracking-tighter">
                                            {generatedCode}
                                        </span>
                                    </div>
                                    <button 
                                        onClick={handleCopy}
                                        className="inline-flex items-center gap-2 px-6 py-2 bg-yellow-100 text-yellow-700 rounded-full text-sm font-bold hover:bg-yellow-200 transition-colors active:scale-95"
                                    >
                                        <Copy className="w-4 h-4" />
                                        Sao chép mã
                                    </button>
                                </div>
                            </div>

                            <p className="text-gray-600 text-sm mb-8 leading-relaxed max-w-lg mx-auto">
                                Hãy <strong className="font-bold text-yellow-600">gửi mã</strong> này cho <strong className="font-bold text-yellow-600">học viên mới</strong>. Khi họ thanh toán thành công, bạn sẽ được tự động kích hoạt tham gia miễn phí.
                            </p>

                            <button
                                onClick={onClose}
                                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-4 rounded-2xl transition-all shadow-lg active:scale-[0.98]"
                            >
                                Xong
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
