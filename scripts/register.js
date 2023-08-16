"use strict";
// clear code dữ liệu vào

const btnSubmit = document.getElementById("btn-submit");
const inputfirtName = document.getElementById("input-firstname");
const inputlastName = document.getElementById("input-lastname");
const inputUsername = document.getElementById("input-username");
const inputPassword = document.getElementById("input-password");
const inputconfirm = document.getElementById("input-password-confirm");

// //lấy dữ liệu từ localstorage
let userArr;
if (localStorage.getItem("user")) {
  //nếu tồn tại
  userArr = getFromStorage("user");
} else {
  userArr = [];
}
//sự kện submit
btnSubmit.addEventListener("click", function () {
  let firtName = inputfirtName.value;
  let lastName = inputlastName.value;
  let username = inputUsername.value;
  let password = inputPassword.value;
  let confirmpass = inputconfirm.value;

  const newUser = new User(firtName, lastName, username, password);

  function validateData() {
    /*hiện thông báo khi nhập dữ liệu không hợp lệ */ let kq = true;
    if (firtName === "") {
      kq = false;
      alert(" Please input firtName");
    }
    if (lastName === "") {
      kq = false;
      alert(" Please input lastName");
    }
    if (username === "") {
      kq = false;
      alert(" Please input Username");
    }
    if (password === "") {
      kq = false;
      alert(" Please input Password");
    }

    if (confirmpass != password) {
      kq = false;
      alert("confirm không khớp password");
    }
    return kq;
  }
  //fomat form input về trống
  const clearInput = () => {
    inputfirtName.value = "";
    inputlastName.value = "";
    inputUsername.value = "";
    inputPassword.value = "";
    inputconfirm.value = "";
  };

  const validate = validateData(newUser);
  if (validate) {
    clearInput();
    userArr.push(newUser);
    saveToStorage("user", userArr); //lưu localstorage
    alert(" đăng ký thành công, chuyển trang login"); //thông báo login thành công
    window.location.href = "../pages/login.html"; //chuyển trang
  }
});
