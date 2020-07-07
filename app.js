//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todos');

//Event Listeners
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', buttonsCheck);
filterOption.addEventListener('click', filterTodos);

//Functions

function addTodo(event) {

  //Prevent form from submitting
  event.preventDefault();

  //Todo DIV
  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');

  //Create LI
  const newTodo = document.createElement('li');
  newTodo.innerText = todoInput.value;
  newTodo.classList.add('todo-item');
  todoDiv.appendChild(newTodo);

  //CHECK MARK BUTTON
  const completedButton = document.createElement('button');
  completedButton.innerHTML = '<i class="fas fa-check">';
  completedButton.classList.add('complete-btn');
  todoDiv.appendChild(completedButton);
  
  //DELETE BUTTON
  const deleteButton = document.createElement('button');
  deleteButton.innerHTML = '<i class="fas fa-trash">';
  deleteButton.classList.add('delete-btn');
  todoDiv.appendChild(deleteButton);

  //Append to todo list
  todoList.appendChild(todoDiv);

  //Clear todoInput
  todoInput.value = "";
}

function buttonsCheck(e) {
  const button = e.target;
  console.log(button);

  //Delete todo
  if (button.classList[0] === 'complete-btn') {
    const todoItem = button.parentElement;
    todoItem.classList.toggle('completed');
  }
  //Check mark
  else if (button.classList[0] === 'delete-btn') {
    const todoItem = button.parentElement;
    
    //Animation
    todoItem.classList.add('fall');
    todoItem.addEventListener('transitioned', function() {
      todoItem.remove();
    })
  }
}

function filterTodos(e) {
  const todos = todoList.childNodes;
  for (const todo of todos) {
    switch (e.target.value) {
      case 'all':
        todo.style.display = 'flex';
        break;
      case 'completed':
        todo.classList.contains('completed') ? 
          todo.style.display = 'flex' : todo.style.display = 'none';
        break;
      case 'uncompleted':
        !todo.classList.contains('completed') ? 
          todo.style.display = 'flex' : todo.style.display = 'none';
        break;
    }
  }
}