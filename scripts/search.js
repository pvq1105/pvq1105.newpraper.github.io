"use strict";

const setting = JSON.parse(localStorage.getItem("setting")); //lấy dữ liệu trang setting nếu có

let inputSearch = document.getElementById("input-query"); //nhập dữ liệu vào input search
const btnSearch = document.getElementById("btn-submit"); //nút tìm kiếm
const numberpage = document.getElementById("page-num"); //số trang
const btnPrevios = document.getElementById("btn-prev"); //quay lại trang
const btnNext = document.getElementById("btn-next"); //chuyển trang

const apiKey = "ed81cf44000f454a83121f52296b1c8b";
let currentPage = 1;

let pageSize; // bài viết muốn hiển thị lên trang, lấy từ trang setting

if (setting) {
  pageSize = setting.newsPerPage;
} else {
  pageSize = 3;
}

let totalResults = 0;
// hàm lùi trang
function previousPage() {
  if (currentPage > 1) {
    currentPage--;
    numberpage.textContent = currentPage;
    fetchNews();
  }
}
//hàm chuyển trang
function nextPage() {
  //số trang tối đa có thể hiển thị
  const maxPages = Math.ceil(totalResults / pageSize);

  if (currentPage < maxPages) {
    currentPage++;
    numberpage.textContent = currentPage;
    fetchNews();
  }
}
//xử lý hiển thị nút chuyển và lùi trang
function display() {
  const maxPages = Math.ceil(totalResults / pageSize);
  btnPrevios.style.display = currentPage > 1 ? "block" : "none";
  btnNext.style.display = currentPage < maxPages ? "block" : "none";
}

// btnSearch.addEventListener("click", searchNews); //sự kiện click nút search

btnPrevios.addEventListener("click", previousPage); //sự kiện click nút lùi trang
btnNext.addEventListener("click", nextPage); //sự kiện click nút chuyển trang

// thực hiện gọi và trả về promise
function fetchNews() {
  const apiUrl = `https://newsapi.org/v2/everything?q=${inputSearch.value}&apiKey=${apiKey}&pageSize=${pageSize}&page=${currentPage}`;

  fetch(apiUrl)
    .then((response) => response.json()) //Promise
    .then((data) => {
      //xử lý data.articles
      totalResults = data.totalResults;
      displayResults(data.articles);
    })

    .catch((error) => console.error("Error fetching data:", error)); //báo lỗi nếu có
}
//xây dựng phần hiển thị thông tin bài viết
function displayResults(articles) {
  const searchResults = document.getElementById("news-container");
  searchResults.innerHTML = "";

  articles.forEach((article) => {
    const articleDiv = document.createElement("div");
    articleDiv.innerHTML = `<div class="card flex-row flex-wrap">
<div class="card mb-3">
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
        `;
    searchResults.appendChild(articleDiv);
  });
  display();
}

//sự kiện tìm kim
btnSearch.addEventListener("click", function () {
  inputSearch.value;
  if (inputSearch.value) {
    console.log(inputSearch.value);
    currentPage = 1;
    fetchNews();
  } else {
    alert("Vui lòng nhập từ khóa tìm kiếm");
  }
});
