"use client";

import { useState } from 'react';

export default function TestPaymentPage() {
  const [orderCode, setOrderCode] = useState('');
  const [status, setStatus] = useState('success');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleUpdateStatus = async () => {
    if (!orderCode) {
      alert('Vui lòng nhập mã đơn hàng');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/sepay/payment', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderCode, status }),
      });

      const data = await response.json();
      setResult(data);
      
      if (data.success) {
        alert('Cập nhật trạng thái thành công!');
      } else {
        alert('Lỗi: ' + data.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Đã xảy ra lỗi');
    } finally {
      setLoading(false);
    }
  };

  const handleCheckStatus = async () => {
    if (!orderCode) {
      alert('Vui lòng nhập mã đơn hàng');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/sepay/payment?orderCode=${orderCode}`);
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error:', error);
      alert('Đã xảy ra lỗi');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold mb-6">Test Payment Status</h1>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Mã đơn hàng (Order Code)
              </label>
              <input
                type="text"
                value={orderCode}
                onChange={(e) => setOrderCode(e.target.value)}
                placeholder="Nhập mã đơn hàng"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Trạng thái mới
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="success">Success</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleCheckStatus}
                disabled={loading}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg disabled:bg-gray-400"
              >
                {loading ? 'Đang kiểm tra...' : 'Kiểm tra trạng thái'}
              </button>
              
              <button
                onClick={handleUpdateStatus}
                disabled={loading}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg disabled:bg-gray-400"
              >
                {loading ? 'Đang cập nhật...' : 'Cập nhật trạng thái'}
              </button>
            </div>
          </div>

          {result && (
            <div className="mt-6">
              <h3 className="text-lg font-bold mb-2">Kết quả:</h3>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-auto text-sm">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
