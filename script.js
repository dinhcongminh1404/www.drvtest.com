const API_URL = "https://script.google.com/macros/s/AKfycbwd79CuVIMIFw95kY5LjP0qsmlj7Ua5sChmMwqCO3RjGYYuVeJo3hLjzVekOn3SUiHTSw/exec?action=read_all";

document.getElementById('btnFetch').addEventListener('click', function() {
    const btn = this;
    const loading = document.getElementById('loading');
    const output = document.getElementById('json-output');

    // 1. Hiển thị trạng thái đang tải
    btn.disabled = true;
    loading.style.display = "block";
    output.innerText = "";

    // 2. Gọi API bằng fetch
    fetch(API_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error("Mạng có vấn đề, không thể lấy dữ liệu");
            }
            return response.json(); // Chuyển đổi phản hồi sang dạng JSON
        })
        .then(data => {
            // 3. Hiển thị dữ liệu lên màn hình
            output.innerText = JSON.stringify(data, null, 2); 
            console.log("Dữ liệu nhận được:", data);
        })
        .catch(error => {
            // Xử lý lỗi nếu có
            output.innerText = "Lỗi: " + error.message;
            output.style.color = "red";
        })
        .finally(() => {
            // 4. Kết thúc: Ẩn trạng thái tải, mở lại nút
            loading.style.display = "none";
            btn.disabled = false;
        });
});