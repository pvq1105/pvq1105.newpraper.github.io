"use strict";
const newsPerPageInput = document.getElementById("input-page-size");
const newsCategorySelect = document.getElementById("input-category");
const btnSave = document.getElementById("btn-submit");

//sự kiện lưu thay đổi hiển thị trang neww

btnSave.addEventListener("click", function () {
  let setTing = {};
  setTing.newsPerPage = newsPerPageInput.value;
  setTing.newsCategory = newsCategorySelect.value;
  console.log(setTing);
  localStorage.setItem("setting", JSON.stringify(setTing));
  alert(`seting complete, go to page News`);
  window.location.href = "../pages/news.html";
});

// hiện thông số dữ liệu khi quay lại setting

const form = JSON.parse(localStorage.getItem("setting"));
newsPerPageInput.value = form.newsPerPage;
newsCategorySelect.value = form.newsCategory;
