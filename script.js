let todoName = document.getElementById('todo-name');
let todoDate = document.getElementById('todo-date');
let addTodoBtn = document.getElementById('add-todo');
let todoContainer = document.getElementById('todo-container');
let myTodoArr = localStorage.getItem('myTodo') ? JSON.parse(localStorage.getItem('myTodo')) : [];

displayMyTodo()

addTodoBtn.addEventListener('click', addTodo);

function addTodo() {
  if(todoName.value == '') {
    alert('Please fill atleast your todo name or description')
    return;
  }
  myTodoArr.unshift({ myTodoName: todoName.value, myTodoDate: todoDate.value })
  localStorage.setItem('myTodo', JSON.stringify(myTodoArr));
  displayMyTodo()
  todoName.value = '';
  todoDate.value = '';
}

function displayMyTodo() {  
  todoContainer.innerHTML = '';
  myTodoArr.forEach((value, index) => {
    let myTodo = document.createElement('div');
    myTodo.setAttribute('class', 'my-todo');
    myTodo.setAttribute('id', index)
    myTodo.innerHTML = `
    <span id="my-todo-name-${index}">${value.myTodoName}</span>
    <span id="my-todo-date-${index}">${value.myTodoDate}</span>
    <div class="my-todo-btns" id="my-todo-btns-${index}">
      <button class="delete" onclick="deleteTodo(${index})" title="Delete">Del</button>
      <button class="edit" title="Edit" onclick="editTodo(${index})">Edit</button>
    </div>
    `;
    todoContainer.appendChild(myTodo);
  })
  let clearAllBtn = document.getElementById('clear-all');
  if(todoContainer.innerHTML == '') {
    clearAllBtn.style.backgroundColor = '#00000096';
    clearAllBtn.style.borderColor = '#00000096';
  } else {
    clearAllBtn.style.backgroundColor = 'black';
    clearAllBtn.style.borderColor = 'black';
  }
}

function deleteTodo(index) {
  myTodoArr.splice(index, 1)
  localStorage.setItem('myTodo', JSON.stringify(myTodoArr));
  displayMyTodo();
}

function editTodo(index) {
  let myTodoBtns = document.getElementById(`my-todo-btns-${index}`);
  let myTodoNameElem = document.getElementById(`my-todo-name-${index}`);
  let myTodoDateElem = document.getElementById(`my-todo-date-${index}`);
  myTodoNameElem.outerHTML = `<input type="text" id="my-todo-name-edit-${index}" value="${myTodoNameElem.innerText}">`
  myTodoDateElem.outerHTML = `<input type="date" id="my-todo-date-edit-${index}" value="${myTodoDateElem.innerText}">`
  myTodoBtns.innerHTML = `<button type="button" id="save-btn" onclick="saveEditTodo(${index})">Save</button>`;
}

function saveEditTodo(index) {
  let myTodoNameElem = document.getElementById(`my-todo-name-edit-${index}`);
  let myTodoDateElem = document.getElementById(`my-todo-date-edit-${index}`);
  myTodoArr[index].myTodoName = myTodoNameElem.value;
  myTodoArr[index].myTodoDate = myTodoDateElem.value;
  localStorage.setItem('myTodo', JSON.stringify(myTodoArr));
  displayMyTodo()
}

function clearAll() {
  myTodoArr = [];
  localStorage.setItem('myTodo', JSON.stringify(myTodoArr));
  displayMyTodo();
}