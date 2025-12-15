'use client'

import { useRef } from 'react'
import { Download, Printer, CheckCircle } from 'lucide-react'

interface ReceiptData {
    receiptNumber: string
    issuedAt: string
    customer: {
        name: string
        email: string
        phone?: string
    }
    payment: {
        amount: number
        currency: string
        method: string
    }
    order: {
        orderCode: string
        courseName?: string
        program?: string
    }
    transaction?: {
        gatewayTransactionId?: string
        gateway?: string
        paymentDate?: string
    }
}

interface ReceiptProps {
    data: ReceiptData
    onClose?: () => void
}

export default function Receipt({ data, onClose }: ReceiptProps) {
    const receiptRef = useRef<HTMLDivElement>(null)

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(amount)
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        })
    }

    const handlePrint = () => {
        window.print()
    }

    const handleDownload = async () => {
        // Create a printable version and trigger download
        const printContent = receiptRef.current
        if (!printContent) return

        // Create a new window for printing/PDF
        const printWindow = window.open('', '_blank')
        if (!printWindow) {
            alert('Vui lòng cho phép popup để tải hóa đơn')
            return
        }

        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Hóa đơn ${data.receiptNumber}</title>
                <style>
                    * { margin: 0; padding: 0; box-sizing: border-box; }
                    body { 
                        font-family: 'Segoe UI', Arial, sans-serif; 
                        padding: 40px; 
                        background: white;
                        color: #333;
                    }
                    .receipt {
                        max-width: 600px;
                        margin: 0 auto;
                        border: 2px solid #e5e7eb;
                        border-radius: 12px;
                        padding: 32px;
                    }
                    .header {
                        text-align: center;
                        padding-bottom: 24px;
                        border-bottom: 2px dashed #e5e7eb;
                        margin-bottom: 24px;
                    }
                    .logo {
                        font-size: 28px;
                        font-weight: bold;
                        color: #F7B50C;
                        margin-bottom: 8px;
                    }
                    .receipt-number {
                        font-size: 14px;
                        color: #6b7280;
                    }
                    .success-badge {
                        display: inline-block;
                        background: #dcfce7;
                        color: #16a34a;
                        padding: 8px 16px;
                        border-radius: 20px;
                        font-weight: 600;
                        margin-top: 16px;
                    }
                    .section {
                        margin-bottom: 24px;
                    }
                    .section-title {
                        font-size: 12px;
                        text-transform: uppercase;
                        color: #9ca3af;
                        margin-bottom: 12px;
                        letter-spacing: 0.5px;
                    }
                    .info-row {
                        display: flex;
                        justify-content: space-between;
                        padding: 8px 0;
                        border-bottom: 1px solid #f3f4f6;
                    }
                    .info-label {
                        color: #6b7280;
                    }
                    .info-value {
                        font-weight: 500;
                        text-align: right;
                    }
                    .amount-section {
                        background: #fef3c7;
                        padding: 20px;
                        border-radius: 8px;
                        text-align: center;
                        margin: 24px 0;
                    }
                    .amount-label {
                        font-size: 14px;
                        color: #92400e;
                    }
                    .amount-value {
                        font-size: 28px;
                        font-weight: bold;
                        color: #92400e;
                    }
                    .footer {
                        text-align: center;
                        padding-top: 24px;
                        border-top: 2px dashed #e5e7eb;
                        color: #9ca3af;
                        font-size: 12px;
                    }
                    @media print {
                        body { padding: 20px; }
                        .receipt { border: none; }
                    }
                </style>
            </head>
            <body>
                <div class="receipt">
                    <div class="header">
                        <div class="logo">N EDUCATION</div>
                        <div class="receipt-number">Mã hóa đơn: ${data.receiptNumber}</div>
                        <div class="success-badge">✓ Thanh toán thành công</div>
                    </div>
                    
                    <div class="section">
                        <div class="section-title">Thông tin khách hàng</div>
                        <div class="info-row">
                            <span class="info-label">Họ tên</span>
                            <span class="info-value">${data.customer.name}</span>
                        </div>
                        <div class="info-row">
                            <span class="info-label">Email</span>
                            <span class="info-value">${data.customer.email}</span>
                        </div>
                        ${data.customer.phone ? `
                        <div class="info-row">
                            <span class="info-label">Số điện thoại</span>
                            <span class="info-value">${data.customer.phone}</span>
                        </div>
                        ` : ''}
                    </div>
                    
                    <div class="section">
                        <div class="section-title">Chi tiết đơn hàng</div>
                        <div class="info-row">
                            <span class="info-label">Mã đơn hàng</span>
                            <span class="info-value">${data.order.orderCode}</span>
                        </div>
                        <div class="info-row">
                            <span class="info-label">Khóa học</span>
                            <span class="info-value">${data.order.courseName || data.order.program || 'N/A'}</span>
                        </div>
                        ${data.transaction?.gatewayTransactionId ? `
                        <div class="info-row">
                            <span class="info-label">Mã giao dịch</span>
                            <span class="info-value">${data.transaction.gatewayTransactionId}</span>
                        </div>
                        ` : ''}
                        <div class="info-row">
                            <span class="info-label">Ngày thanh toán</span>
                            <span class="info-value">${formatDate(data.transaction?.paymentDate || data.issuedAt)}</span>
                        </div>
                    </div>
                    
                    <div class="amount-section">
                        <div class="amount-label">Tổng thanh toán</div>
                        <div class="amount-value">${formatCurrency(data.payment.amount)}</div>
                    </div>
                    
                    <div class="footer">
                        <p>Cảm ơn bạn đã tin tưởng N Education!</p>
                        <p style="margin-top: 8px;">Ngày xuất hóa đơn: ${formatDate(data.issuedAt)}</p>
                    </div>
                </div>
            </body>
            </html>
        `)

        printWindow.document.close()

        // Wait for content to load then trigger print (which allows saving as PDF)
        setTimeout(() => {
            printWindow.print()
        }, 500)
    }

    return (
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-lg mx-auto">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-amber-500 px-6 py-8 text-center text-white">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                    <CheckCircle className="w-10 h-10" />
                </div>
                <h2 className="text-2xl font-bold mb-1">Thanh toán thành công!</h2>
                <p className="text-white/80 text-sm">Mã hóa đơn: {data.receiptNumber}</p>
            </div>

            {/* Receipt Content */}
            <div ref={receiptRef} className="p-6 space-y-6">
                {/* Customer Info */}
                <div>
                    <h3 className="text-xs uppercase tracking-wider text-gray-400 mb-3">
                        Thông tin khách hàng
                    </h3>
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span className="text-gray-500">Họ tên</span>
                            <span className="font-medium">{data.customer.name}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Email</span>
                            <span className="font-medium text-sm">{data.customer.email}</span>
                        </div>
                        {data.customer.phone && (
                            <div className="flex justify-between">
                                <span className="text-gray-500">SĐT</span>
                                <span className="font-medium">{data.customer.phone}</span>
                            </div>
                        )}
                    </div>
                </div>

                <hr className="border-dashed" />

                {/* Order Info */}
                <div>
                    <h3 className="text-xs uppercase tracking-wider text-gray-400 mb-3">
                        Chi tiết đơn hàng
                    </h3>
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span className="text-gray-500">Mã đơn</span>
                            <span className="font-mono text-sm font-medium">{data.order.orderCode}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Khóa học</span>
                            <span className="font-medium text-right max-w-[200px]">
                                {data.order.courseName || data.order.program || 'N/A'}
                            </span>
                        </div>
                        {data.transaction?.gatewayTransactionId && (
                            <div className="flex justify-between">
                                <span className="text-gray-500">Mã GD</span>
                                <span className="font-mono text-xs">{data.transaction.gatewayTransactionId}</span>
                            </div>
                        )}
                        <div className="flex justify-between">
                            <span className="text-gray-500">Ngày TT</span>
                            <span className="font-medium text-sm">
                                {formatDate(data.transaction?.paymentDate || data.issuedAt)}
                            </span>
                        </div>
                    </div>
                </div>

                <hr className="border-dashed" />

                {/* Amount */}
                <div className="bg-amber-50 -mx-6 px-6 py-4">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-medium">Tổng thanh toán</span>
                        <span className="text-2xl font-bold text-primary">
                            {formatCurrency(data.payment.amount)}
                        </span>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="px-6 pb-6 flex gap-3">
                <button
                    onClick={handleDownload}
                    className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white py-3 px-4 rounded-xl font-medium transition"
                >
                    <Download className="w-5 h-5" />
                    Tải hóa đơn
                </button>
                <button
                    onClick={handlePrint}
                    className="flex items-center justify-center gap-2 border-2 border-gray-200 hover:border-primary hover:text-primary py-3 px-4 rounded-xl font-medium transition"
                >
                    <Printer className="w-5 h-5" />
                </button>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-6 py-4 text-center text-xs text-gray-400">
                Cảm ơn bạn đã tin tưởng N Education!
            </div>
        </div>
    )
}
