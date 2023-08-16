"use strict";
const dataLogin = getFromStorage("user");
const inputUsername = document.getElementById("input-username");
const inputPassword = document.getElementById("input-password");
const btnLogin = document.getElementById("btn-submit");

// let arrdulieu = [];

let arrdulieu;
if ((arrdulieu = localStorage.getItem("currentUser"))) {
  arrdulieu = getFromStorage("currentUser");
} else {
  arrdulieu = [];
}

btnLogin.addEventListener("click", function () {
  const dulieu = {};
  dulieu.username = inputUsername.value;
  dulieu.password = inputPassword.value;

  function login(inputUsername, inputPassword) {
    // Duyệt qua mảng usersData để kiểm tra user & password
    for (let i = 0; i < dataLogin.length; i++) {
      if (
        dataLogin[i].username === dulieu.username &&
        dataLogin[i].password === dulieu.password
      ) {
        console.log(dataLogin[i]);
        saveToStorage("currentUser", JSON.stringify(dataLogin[i]));
        return true; // Trả về true nếu tìm thấy user & password trùng khớp
      }
    }
    return false; // Trả về false nếu không tìm thấy user & password trong dữ liệu có sẵn
  }
  const isAuthenticated = login(dulieu.username, dulieu.password);

  if (isAuthenticated) {
    console.log("Đăng nhập thành công!");
    btnLogin.style.display = "none";
    alert(`login comple, click "ok" next page in 1s`);
    setTimeout(next, 1000);
  } else {
    alert("Tên đăng nhập hoặc mật khẩu không đúng.");
  }
});
const next = function () {
  window.location.href = "../index.html";
};
