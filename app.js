//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todos');


//Event Listeners
document.addEventListener('DOMContentLoaded', getTodoList);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', buttonsCheck);
filterOption.addEventListener('click', filterTodos);



//Functions
async function addTodo(event) {

  //Prevent form from submitting
  event.preventDefault();

  //Todo DIV
  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');

  //Create LI
  let newTodo = document.createElement('li');
  newTodo.innerText = todoInput.value;
  newTodo.classList.add('todo-item');
  todoDiv.appendChild(newTodo);

  let id = await postTodo(newTodo.innerText);
  console.log(id);
  newTodo = document.createElement('li');
  newTodo.innerText = id;
  newTodo.classList.add('todo-id');
  newTodo.style.display = 'none';
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

  //Check mark
  if (button.classList[0] === 'complete-btn') {
    const todoItem = button.parentElement;
    const id = todoItem.childNodes[1].innerText;

    console.log(todoItem);
    console.log(todoItem.childNodes);
    todoItem.classList.toggle('completed');
    if (todoItem.classList.contains('completed')) {
      putTodo(id, true);
    } 
    else {
      putTodo(id, false);
    }
  }
  //Delete todo
  else if (button.classList[0] === 'delete-btn') {
    const todoItem = button.parentElement;
    
    console.log('DELETED');
    //Animation
    todoItem.classList.add('fall');
    todoItem.addEventListener('transitionend', function() {
      todoItem.remove();
    })
    const id = todoItem.childNodes[1].innerText;
    deleteTodo(id);
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

function getTodoList() {
  fetch('https://6zm55pojjf.execute-api.eu-north-1.amazonaws.com/dev/todos')
    .then(response => response.json())
    .then(data => 
      importTodos(data)

    );
}

function importTodos(data) {
  console.log(data);
  for (const todo of data) {
    importTodo(todo);
  }
}

function importTodo(todo) {
  const title = todo.title;
  //Todo DIV
  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');

  //Create LI
  let newTodo = document.createElement('li');
  newTodo.innerText = title;
  newTodo.classList.add('todo-item');
  todoDiv.appendChild(newTodo);

  newTodo = document.createElement('li');
  newTodo.innerText = todo.id;
  newTodo.classList.add('todo-id');
  newTodo.style.display = 'none';
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

  if (todo.complete == true) todoDiv.classList.toggle('completed');

  //Append to todo list
  todoList.appendChild(todoDiv);

  //Clear todoInput
  todoInput.value = "";
}

function postTodo(title) {
  const data = { title: title };
  var id;

  return fetch('https://6zm55pojjf.execute-api.eu-north-1.amazonaws.com/dev/todos', {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then( function(data)  {
    return data.id;
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

function putTodo(id, completed) {
  const data = { complete: completed };

  fetch(`https://6zm55pojjf.execute-api.eu-north-1.amazonaws.com/dev/todos/${id}`, {
    method: 'PUT', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

function deleteTodo(id) {

  fetch(`https://6zm55pojjf.execute-api.eu-north-1.amazonaws.com/dev/todos/${id}`, {
    method: 'DELETE', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(response => console.log(response) )
  .catch((error) => {
    console.error('Error:', error);
  });
}