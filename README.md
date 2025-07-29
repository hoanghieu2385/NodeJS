# NodeJS

🧠 PHẦN 1: CƠ BẢN – console, biến, xử lý logic
🔸 Bài 1: Máy tính cộng trừ nhân chia (CLI)
Mô tả: Nhập 2 số và phép tính, in ra kết quả.
Gợi ý: Dùng readline, switch-case.

🔸 Bài 2: Tính tổng các số từ 1 → N
Mô tả: Nhập n từ người dùng, tính tổng 1 + 2 + ... + n.
Gợi ý: Dùng vòng lặp for.

🔸 Bài 3: Kiểm tra số nguyên tố
Mô tả: Nhập 1 số và cho biết nó có phải số nguyên tố không.
Gợi ý: Dùng vòng lặp + if.

📂 PHẦN 2: MODULE CƠ BẢN – fs, path, readline
🔸 Bài 4: Tạo file ghi nội dung
Mô tả: Nhập nội dung từ người dùng → lưu vào file output.txt.
Gợi ý: Dùng fs.writeFileSync.

🔸 Bài 5: Đọc nội dung từ file
Mô tả: Đọc và in nội dung file output.txt.
Gợi ý: fs.readFileSync.

🔸 Bài 6: Tạo file theo tên người dùng nhập
Mô tả: Người dùng nhập tên file và nội dung → tạo file mới.
Gợi ý: readline + fs.

🌐 PHẦN 3: WEB SERVER – http, xử lý request đơn giản
🔸 Bài 7: Web server in "Hello World"
Mô tả: Tạo server trả về Hello World.
Gợi ý: Dùng http.createServer.

🔸 Bài 8: Web server cộng 2 số qua URL
Mô tả: Truy cập:
http://localhost:3000/add?a=5&b=3
→ Server trả kết quả a + b = 8.

Gợi ý: Dùng url module để tách query.

🔸 Bài 9: Server trả về file HTML
Mô tả: Tạo file index.html, cho Node.js đọc và trả về khi truy cập /.
Gợi ý: Dùng fs.readFile, http.

🧪 PHẦN 4: TỔNG HỢP
🔸 Bài 10: Todo CLI App
Mô tả: Viết app nhỏ chạy trên terminal:

Nhập lệnh add, list, remove

Lưu danh sách todo vào file todos.json

Gợi ý: Dùng readline, fs, JSON.parse/stringify

