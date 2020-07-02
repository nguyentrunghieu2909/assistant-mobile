# assistant-mobile
speech processing final project

List of tasks:

-Xin chào/ tạm biệt.

-Gọi điện thoại tới số

-Nhắn tin tới số

-Soạn thư đến địa chỉ mail

-Mở App (Facebook, Instagram, Chrome,...)

-Tìm kiếm trên google

-Mở báo VnExpress, Dân trí, ...

List of questions:
-Thời tiết hôm nay thế nào ?

-Hôm nay là ngày bao nhiêu ?

-Bây giờ là mấy giờ?

-tôi đang ở đâu?


# hướng dẫn sử dụng

- "thời tiết hôm nay thế nào": Hiển thị thời tiết cả ngày cách nhau 3 tiếng

- Hôm nay là ngày bao nhiêu?

- Bây giờ là mấy giờ?

- Tôi đang ở đâu?

- "mở [tên báo]": mở trang báo tương ứng

- "mở [tên app]": mở ứng dụng tương ứng

- "tìm [nội dung]": tra google nội dung cần tìm

- "gọi [số điện thoại]": thực hiện cuộc gọi đến số

- "nhắn tin [số điện thoại]": soạn tin nhắn đến số

- "gửi thư [địa chỉ email]": soạn thư điện tử đến địa chỉ

- "kết thúc": tắt chương trình

App được thiết kế bằng ngôn ngữ React-Native tự xây dựng giao diện và có sử dụng thư viện:
- react-native-tts: Text-to-speech
- react-native-speech: Speech-to-text
- react-native-geocoder: Lấy địa chỉ theo tọa độ
- react-native-community/geolocation: Lấy tọa độ
- openweathermap.org API: lấy thông tin thời tiết qua tọa độ
- moment: lấy thông tin ngày tháng, thời gian