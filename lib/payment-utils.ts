export interface PaymentFormData {
  fullName: string;
  email: string;
  phone: string;
  telegram: string;
  birthday?: string;
  gender: string;
  address?: string;
  note?: string;
  programId: string;
  returnUrl?: string;
}

export interface PaymentResponse {
  paymentUrl?: string;
  error?: string;
}

export const currencyFormatter = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
  minimumFractionDigits: 0,
});

/**
 * Gửi yêu cầu thanh toán đến API VNPAY
 * @param data Thông tin thanh toán
 * @returns Promise<PaymentResponse> Kết quả từ API
 */
export async function sendPaymentRequest(data: PaymentFormData): Promise<PaymentResponse> {
  try {
    console.log('Sending payment data:', data);

    const response = await fetch('https://api.nedu.nhi.sg/api/order/payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', errorText);
      
      // Cải thiện xử lý lỗi với thông báo chi tiết hơn
      if (response.status === 400) {
        throw new Error('Dữ liệu không hợp lệ. Vui lòng kiểm tra lại thông tin.');
      } else if (response.status === 500) {
        throw new Error('Lỗi server. Vui lòng thử lại sau.');
      } else {
        throw new Error(`API Error: ${response.status} - ${errorText}`);
      }
    }

    const result = await response.json();
    console.log('API Success Response:', result);
    
    return {
      paymentUrl: result.paymentUrl,
    };
  } catch (error) {
    console.error('Payment submission error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Đã xảy ra lỗi không xác định';
    return {
      error: errorMessage,
    };
  }
}

/**
 * Chuẩn bị dữ liệu thanh toán từ form
 * @param formData Dữ liệu từ form
 * @param programId ID chương trình
 * @param includeReturnUrl Có bao gồm returnUrl không
 * @returns PaymentFormData Dữ liệu đã chuẩn bị
 */
export function preparePaymentData(
  formData: any,
  programId: string,
  includeReturnUrl: boolean = true
): PaymentFormData {
  const paymentData: PaymentFormData = {
    fullName: formData.name,
    email: formData.email,
    phone: formData.phone,
    telegram: formData.telegram,
    birthday: formData.birthdate ? new Date(formData.birthdate).toISOString() : '',
    gender: formData.gender,
    address: formData.address || '',
    note: formData.note || '',
    programId: programId
  };

  // Thêm returnUrl nếu được yêu cầu
  if (includeReturnUrl) {
    paymentData.returnUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/payment-success?programId=${programId}`;
  }

  return paymentData;
}

/**
 * Xử lý phản hồi thanh toán
 * @param response Kết quả từ API
 * @param router Next.js router
 * @param onSuccess Callback khi thành công
 * @param onError Callback khi có lỗi
 */
export function handlePaymentResponse(
  response: PaymentResponse,
  router: any,
  onSuccess?: () => void,
  onError?: (error: string) => void
) {
  if (response.error) {
    const errorMessage = response.error;
    if (onError) {
      onError(errorMessage);
    }
    alert(`Lỗi khi gửi thông tin: ${errorMessage}`);
    return false;
  }

  if (response.paymentUrl) {
    // Redirect đến trang thanh toán VNPAY
    if (typeof window !== 'undefined') {
      window.location.href = response.paymentUrl;
    }
    if (onSuccess) {
      onSuccess();
    }
    return true;
  }
}