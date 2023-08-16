"use strict";
function saveToStorage(key, value) {
  var data = value;

  if (Array.isArray(value)) {
    data = JSON.stringify(value);
  }
  localStorage.setItem(key, data);
}

/**
 * Hàm lấy giá trị được lưu trữ trong LocalStorage*/

function getFromStorage(key, defaultValue) {
  // Lấy dữ liệu từ LocalStorage
  return localStorage.getItem(key)
    ? JSON.parse(localStorage.getItem(key))
    : defaultValue;
}
