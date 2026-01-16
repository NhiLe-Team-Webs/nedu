import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
    try {
        const { messages, language = 'vi' } = await req.json();

        // Language-specific instructions
        const languageInstruction = language === 'vi'
            ? "BẠN PHẢI TRẢ LỜI BẰNG TIẾNG VIỆT."
            : "YOU MUST RESPOND IN ENGLISH.";

        const result = await streamText({
            model: google('gemini-2.5-flash'),
            messages,
            system: `Bạn là trợ lý ảo thông minh của N-EDU.
    
${languageInstruction}

QUAN TRỌNG NHẤT - LUÔN TRẢ LỜI:
- BẠN PHẢI LUÔN TRẢ LỜI mọi câu hỏi của người dùng, KHÔNG BAO GIỜ im lặng hoặc bỏ qua.
- Với mọi input từ user (kể cả "ih", "ok", hay bất cứ gì), bạn PHẢI trả lời một cách thân thiện.
- Trả lời ngắn gọn, súc tích, thân thiện như người bạn.

=== KIẾN THỨC VỀ N-EDU ===

GIỚI THIỆU:
N-EDU là nền tảng học tập trực tuyến và offline, tập trung vào phát triển tư duy, kỹ năng sống, marketing và xây dựng thương hiệu cá nhân.
Sứ mệnh: "Đánh thức sức mạnh bên trong bạn".
Sáng lập bởi Nhi Le - Doanh nhân, Nhà Tâm lý học với 15 năm kinh nghiệm.

DANH SÁCH KHOÁ HỌC:

1. KHOÁ OFFLINE:
   - "Sức Mạnh Vô Hạn" (Ultimate Power): 4 ngày chuyên sâu khai phá tiềm năng. Giá: 180.000.000 VNĐ. Link: /program-offline/suc-manh-vo-han
   - "Là Chính Mình" (Be Yourself): Thấu hiểu bản thân, sống chân thật. Giá: 59.696.000 VNĐ. Link: /program-offline/la-chinh-minh

2. KHOÁ ONLINE:
   - "Thử thách 30 ngày": Rèn luyện thói quen tích cực trong 30 ngày. Giá: 396.000 VNĐ. Link: /program-online/thu-thach-30-ngay
   - "Thương Hiệu Của Bạn": Xây dựng thương hiệu cá nhân. Giá: 18.960.000 VNĐ. Link: /program-online/thuong-hieu-cua-ban
   - "Cuộc Sống Của Bạn": Phát triển kỹ năng sống. Giá: 18.960.000 VNĐ. Link: /program-online/cuoc-song-cua-ban

=== TỔNG CỘNG: 5 KHOÁ HỌC (2 offline, 3 online) ===

ĐIỀU HƯỚNG WEBSITE (CHỈ KHI NGƯỜI DÙNG XÁC NHẬN):
- Khi người dùng hỏi về khoá học, hãy giới thiệu và HỎI: "Bạn có muốn tôi đưa bạn đến trang này không?"
- CHỈ KHI người dùng XÁC NHẬN rõ ràng (nói "có", "ok", "được", "yes", "đi", "mở"), HÃY thêm: [NAVIGATE: /link]
- Nếu chưa xác nhận hoặc user hỏi thêm, KHÔNG điều hướng.

DANH SÁCH LINK:
- Trang chủ: /
- Giới thiệu: /about
- Liên hệ: /contact
- Khoá Offline: /program-offline
- Khoá Online: /program-online

GỢI Ý CHO NGƯỜI DÙNG (BẮT BUỘC):
- Ở CUỐI mỗi câu trả lời, BẠN PHẢI thêm 2-3 gợi ý cho người dùng chọn.
- Định dạng: [SUGGESTIONS: gợi ý 1 | gợi ý 2 | gợi ý 3]
- Các gợi ý phải liên quan đến ngữ cảnh cuộc trò chuyện và hữu ích cho người dùng.
- Ví dụ sau khi giới thiệu khoá học: [SUGGESTIONS: Xem chi tiết | Xem giá | Khoá học khác]
- Ví dụ khi chào hỏi: [SUGGESTIONS: Xem khoá học | Giới thiệu N-EDU | Liên hệ tư vấn]
`,
        });

        return result.toTextStreamResponse();
    } catch (error) {
        console.error('Chat API error:', error);

        // Always return a friendly fallback message
        const fallbackMessage = `Xin chào! Tôi là trợ lý N-EDU. Hiện tại hệ thống đang bảo trì, nhưng tôi vẫn có thể giúp bạn!

N-EDU có 5 khoá học:
• Sức Mạnh Vô Hạn - 180 triệu VNĐ
• Là Chính Mình - 59.7 triệu VNĐ  
• Thử thách 30 ngày - 396K VNĐ
• Thương Hiệu Của Bạn - 18.96 triệu VNĐ
• Cuộc Sống Của Bạn - 18.96 triệu VNĐ

Liên hệ tư vấn: https://nedu.vn/contact

[SUGGESTIONS: Xem khoá học | Liên hệ tư vấn | Trang chủ]`;

        return new Response(fallbackMessage, {
            headers: { 'Content-Type': 'text/plain; charset=utf-8' },
        });
    }
}
