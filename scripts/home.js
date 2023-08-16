"use strict";
const userLogin = getFromStorage("currentUser");

const loginModal = document.getElementById("login-modal");
const mainConten = document.getElementById("main-content");
const message = document.getElementById("welcome-message");
const btnLogOut = document.getElementById("btn-logout");

if (userLogin) {
  // nếu tồn tại user đăng nhập từ trước
  loginModal.style.display = "none"; // ẩn nút loggin & regirst
  const html = `Wellcom ${userLogin.username}`; //hiển thị user đang đăng nhâp
  message.append(html);
  message.style.fontSize = "28px";
}

//sự kiện chuyên trang về login & regist ->> click logout
btnLogOut.addEventListener("click", function () {
  localStorage.removeItem("currentUser");
  window.location.href = "../pages/login.html";
});
