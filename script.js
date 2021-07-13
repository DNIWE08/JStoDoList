// Selectors

const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.todo-filter');

// Events

document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteAndCheckTodo);
filterOption.addEventListener('click', filterTodos);

// Functions

function addTodo(e) {
  e.preventDefault();

  if (todoInput.value === '') return;

  const todoContainer = document.createElement('div');
  todoContainer.classList.add('todo-item');

  const todoLi = document.createElement('li');
  todoLi.innerText = todoInput.value;
  todoLi.classList.add('item-li');

  const completeBtn = document.createElement('button');
  completeBtn.classList.add('item-complete');
  completeBtn.innerHTML = '<i class="fa fa-solid fa-check"></i>';

  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('item-delete');
  deleteBtn.innerHTML = '<i class="fa fa-solid fa-trash"></i>';

  todoContainer.appendChild(todoLi);
  todoContainer.appendChild(completeBtn);
  todoContainer.appendChild(deleteBtn);

  todoList.appendChild(todoContainer);

  saveTodosInLocalStorage(todoInput.value);

  todoInput.value = '';
  todoInput.focus();
}

function deleteAndCheckTodo(e) {
  const item = e.target;
  const todo = item.parentElement;

  if (item.classList.contains('item-delete')) {
    todo.classList.add('fall');
    removeFormLocalStorage(todo)
    todo.addEventListener('transitionend', function() {
      todo.remove()
    });
  }

  if (item.classList.contains('item-complete')) {
    todo.classList.toggle('completed');
  }
}

function filterTodos(e) {
  const todos = todoList.childNodes;
  todos.forEach((todo) => {
    switch (e.target.value) {
      case 'all':
        todo.style.display = 'flex';
        break;
      case 'completed':
        if (todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
      case 'uncompleted':
        if (!todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
    }
  })
}

function saveTodosInLocalStorage(todo) {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'))
  }

  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'))
  }

  todos.forEach((todo) => {
    const todoContainer = document.createElement('div');
    todoContainer.classList.add('todo-item');

    const todoLi = document.createElement('li');
    todoLi.innerText = todo;
    todoLi.classList.add('item-li');

    const completeBtn = document.createElement('button');
    completeBtn.classList.add('item-complete');
    completeBtn.innerHTML = '<i class="fa fa-solid fa-check"></i>';

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('item-delete');
    deleteBtn.innerHTML = '<i class="fa fa-solid fa-trash"></i>';

    todoContainer.appendChild(todoLi);
    todoContainer.appendChild(completeBtn);
    todoContainer.appendChild(deleteBtn);

    todoList.appendChild(todoContainer);
  })
}

function removeFormLocalStorage(todo) {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'))
  }

  const todoIndex =todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem('todos', JSON.stringify(todos));
}