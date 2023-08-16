"use strict";
//lấy dữ liệu user trong localstorage

const datacurrentUser = getFromStorage("currentUser");

class Task {
  constructor(task, owner, isDone) {
    this.task = task;
    this.owner = owner;
    this.isDone = isDone;
  }
}

const dataOner = datacurrentUser.username;
console.log(dataOner);

const inputTask = document.getElementById("input-task");
const btnAdd = document.getElementById("btn-add");
const todoList = document.getElementById("todo-list");

let todoArr;
//xử lý ấy dữ liệu khi reload trang
if (localStorage.getItem("todolist")) {
  todoArr = getFromStorage("todolist");
  renderList(todoArr);
} else {
  todoArr = [];
}

/* làm trống thẻ input */

function clearInput() {
  inputTask.value = "";
}

/*--------------------------------*/

function selectAccount() {
  /* lọc dữ liệu đi cùng account khi đăng nhâp */
  let accountLogin = todoArr.filter((todoArr) => todoArr.owner === dataOner);
  renderList(accountLogin);
}
selectAccount(todoArr);

/* tạo danh sách task  */

function renderList(todoArr) {
  todoList.innerHTML = "";
  for (let i = 0; i < todoArr.length; i++) {
    const html = `<li>
    ${todoArr[i].task}
    <span class="close">×</span>
    </li>`;
    todoList.insertAdjacentHTML("beforeend", html);
  }

  //them su kien toggle
  toggle();

  //them su kien xoa - click vao x - khi xoa thi render lai cai list

  const xoatask = document.querySelectorAll("#todo-list .close");
  xoatask.forEach((item, vitri) => {
    item.addEventListener("click", function (e) {
      e.stopPropagation(); //cai' nay` khi nhan 'x' thi nó khong phải nhận sự kiện ngoài cho toggle cái event - isDone true -> false va nguoc lai
      todoArr.splice(vitri, 1);
      renderList(todoArr);
      saveToStorage("todolist", todoArr);
    });
  });
}
/* gán sự liện click vào nut Add khi thêm stack */

btnAdd.addEventListener("click", function () {
  let task = inputTask.value;
  let owner = datacurrentUser.username;

  let isDone = false;

  const newTask = new Task(task, owner, isDone);
  console.log(newTask);
  /*--------------------------------*/

  function validateData(data) {
    let kq = true;
    if (task === "") {
      kq = false;
      alert(" Please input task");
    }
    return kq;
  }
  /*--------------------------------*/

  const validate = validateData();
  // thực hiện truy xuất hàm
  if (validate) {
    clearInput();
    todoArr.push(newTask);
    renderList(todoArr);
    selectAccount(todoArr);
    saveToStorage("todolist", todoArr);
  }
});

//xự kiện add checked & bật tắt task hoàn thành = toggle
function toggle() {
  let accountLogin = todoArr.filter((todoArr) => todoArr.owner === dataOner);
  const listItems = document.querySelectorAll("#todo-list li");
  for (let i = 0; i < accountLogin.length; i++) {
    if (accountLogin[i].isDone === true)
      listItems[i].classList.toggle("checked");
  }
  listItems.forEach((item, vitri) => {
    item.addEventListener("click", function () {
      // có thể đánh dấu task hoàn thành
      if (accountLogin[vitri].isDone === true) {
        item.classList.toggle("checked");
        accountLogin[vitri].isDone = false;
        saveToStorage("todolist", todoArr);
      } else if (accountLogin[vitri].isDone === false) {
        item.classList.toggle("checked");
        accountLogin[vitri].isDone = true;
        saveToStorage("todolist", todoArr);
      }
    });
  });
}
