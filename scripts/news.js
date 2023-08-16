"use strict";

//gọi localstorage dữ liệu setting số trang & loại bài viết
const setting = JSON.parse(localStorage.getItem("setting"));

//tạo document clear code
const newsContainer = document.getElementById("news-container");
const previous = document.getElementById("btn-prev");
const nextPage = document.getElementById("btn-next");
const numberPage = document.getElementById("page-num");

const apiKey = "ed81cf44000f454a83121f52296b1c8b";
let currentPage = 1;
let totalResults = 0;

let newsCategory; //danh mục bài viết
let pageSize; // bài viết muốn hiển thị lên trang, lấy từ trang setting

if (setting) {
  pageSize = setting.newsPerPage;
  newsCategory = setting.newsCategory;
} else {
  pageSize = 3;
  newsCategory = "General";
}
async function fetchNews() {
  try {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&category=${newsCategory}&pageSize=${pageSize}&page=${currentPage}&apiKey=${apiKey}`
    );
    const data = await response.json();
    totalResults = data.totalResults;

    //hiển thị giao diện trang
    if (data.articles && data.articles.length > 0) {
      newsContainer.innerHTML = "";
      data.articles.forEach((article) => {
        const articleElement = document.createElement("div");
        articleElement.innerHTML = `
        <div class="card flex-row flex-wrap">
        <div class="row no-gutters">
        <div class="col-md-4">
        <img
        src="${article.urlToImage}"
        class="card-img"
        alt="${article.title}"
        />
        </div>
        <div class="col-md-8">
        <div class="card-body">
        <h5 class="card-title">
        ${article.title}
        </h5>
        <p class="card-text">
        ${article.content}
        </p>
        <a
        href="${article.url}"
        class="btn btn-primary"
        >View</a
        >
        </div>
        </div>
        </div>
        <div class="card mb-3">
      `;
        newsContainer.appendChild(articleElement);
      });
    } else {
      newsContainer.innerHTML = "<p>No news articles found.</p>";
    }
    hienthi();
  } catch (error) {
    //bo lỗi nếu có
    console.error("Error fetching news:", error);
    newsContainer.innerHTML = "<p>Failed to fetch news articles.</p>";
  }
}
//funcition hiển thị số trang, nút chuyển và quay lại trang
function hienthi() {
  const maxPages = Math.ceil(totalResults / parseInt(pageSize, 10));
  previous.style.display = currentPage > 1 ? "block" : "none";
  nextPage.style.display = currentPage < maxPages ? "block" : "none";
  if (currentPage > 1) {
    previous.addEventListener("click", goToPreviousPage);
  }
  if (currentPage < maxPages) {
    nextPage.addEventListener("click", goToNextPage);
  }
}
// Function quay lại trang trang
function goToPreviousPage() {
  currentPage--;
  numberPage.textContent = currentPage;
  fetchNews();
}

// Function chuyển trang
function goToNextPage() {
  currentPage++;
  numberPage.textContent = currentPage;
  fetchNews();
}

fetchNews();
