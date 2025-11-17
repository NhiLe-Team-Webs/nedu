# Hướng dẫn tích hợp Google Sheet với Form Liên hệ N-EDU

## Tổng quan
Chức năng này cho phép lưu thông tin từ form liên hệ website vào Google Sheet tự động.

## Bước 1: Tạo Google Sheet

1. Truy cập [Google Sheets](https://sheets.google.com)
2. Tạo spreadsheet mới với tên: **"N-EDU Contact Form"**
3. Đặt tên cho sheet đầu tiên là: **"Contacts"**
4. Tạo các cột theo đúng cấu trúc:
   - **Cột A**: STT
   - **Cột B**: Họ và Tên
   - **Cột C**: Email
   - **Cột D**: Số điện thoại
   - **Cột E**: Nội dung
   - **Cột F**: Thời gian (tự động thêm)

## Bước 2: Thiết lập Google Apps Script

1. Trong Google Sheet, vào menu `Extensions` > `Apps Script`
2. Xóa code mặc định và dán code sau:

```javascript
// Google Apps Script for handling contact form submissions
function doPost(e) {
  try {
    // Get the spreadsheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Contacts");
    
    // Get form data
    const name = e.parameter.name || '';
    const email = e.parameter.email || '';
    const phone = e.parameter.phone || '';
    const message = e.parameter.message || '';
    
    // Get current timestamp
    const timestamp = new Date();
    
    // Get next STT (serial number)
    const lastRow = sheet.getLastRow();
    const nextSTT = lastRow > 1 ? parseInt(sheet.getRange(lastRow, 1).getValue()) + 1 : 1;
    
    // Add new row with data
    sheet.appendRow([
      nextSTT,
      name,
      email,
      phone,
      message,
      timestamp // Add timestamp for reference
    ]);
    
    // Format the timestamp column
    sheet.getRange(lastRow + 1, 6).setNumberFormat("dd/MM/yyyy HH:mm:ss");
    
    // Return success response
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: 'Data saved successfully'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Log error for debugging
    Logger.log('Error: ' + error.toString());
    
    // Return error response
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: 'Failed to save data: ' + error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Function to setup the sheet with headers (run this once manually)
function setupSheet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Contacts");
  
  // Clear existing content
  sheet.clear();
  
  // Set headers
  const headers = ['STT', 'Họ và Tên', 'Email', 'Số điện thoại', 'Nội dung', 'Thời gian'];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight('bold');
  
  // Set column widths
  sheet.setColumnWidths(1, 6, [50, 200, 200, 150, 300, 150]);
  
  // Freeze header row
  sheet.setFrozenRows(1);
}
```

3. Lưu dự án với tên: **"Contact Form Handler"**

## Bước 3: Cấu hình Apps Script

1. **Chạy hàm setupSheet()** một lần để tạo header:
   - Trong menu dropdown chọn `setupSheet`
   - Nhấn `Run`
   - Cho phép quyền truy cập khi được yêu cầu

2. **Deploy Web App**:
   - Nhấn vào `Deploy` > `New deployment`
   - Chọn `Web app` làm loại deployment
   - Cấu hình:
     - **Description**: Contact Form Web App
     - **Execute as**: Me (tài khoản Google của bạn)
     - **Who has access**: Anyone
   - Nhấn `Deploy`
   - Copy URL của web app (đây là URL bạn sẽ sử dụng)

## Bước 4: Cập nhật Frontend

1. Mở file `app/contact/page.tsx`
2. Tìm dòng chứa URL Google Apps Script (dòng 23)
3. Thay thế URL hiện tại bằng URL mới từ bước 3

```javascript
const googleScriptUrl = 'URL_CỦA_BẠN_TỪ_BƯỚC_3';
```

## Bước 5: Kiểm tra chức năng

1. Mở trang liên hệ của website
2. Điền thông tin vào form
3. Nhấn "Gửi"
4. Kiểm tra Google Sheet để xác nhận dữ liệu được lưu

## Lưu ý quan trọng

- **URL hiện tại trong code**: `https://script.google.com/macros/s/AKfycbxKIMyc18J9EiRmJJLyrAUM80mKeA64CFmWoehLR-SjBylwufnae0xrFyTK2Q4crn2F/exec`
- Nếu bạn sử dụng URL hiện tại, hãy đảm bảo nó đã được deploy đúng cách
- Nếu tạo Apps Script mới, bạn cần cập nhật URL trong file frontend
- Mode `no-cors` được sử dụng để tránh CORS issues với Google Apps Script

## Xử lý lỗi

Nếu gặp lỗi:
1. Kiểm tra console browser để xem error message
2. Đảm bảo Apps Script đã được deploy với quyền truy cập "Anyone"
3. Kiểm tra lại tên sheet "Contacts" có chính xác không
4. Xem log trong Apps Script (View > Executions)

## Bảo mật

- Apps Script chạy với quyền của tài khoản Google của bạn
- Dữ liệu được lưu trong Google Sheet cá nhân
- Không lưu thông tin nhạy cảm ngoài những gì người dùng nhập