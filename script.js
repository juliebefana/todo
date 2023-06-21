// Todo list array
let todos = [];

// Get form and list elements
const form = document.getElementById('todo-form');
const todoList = document.getElementById('todo-list');

// Function to create a new todo item
function createTodoItem(title, description) {
  const todo = {
    title,
    description,
    completed: false,
    createdDate: new Date(),
    completedDate: null
  };
  todos.push(todo);
  saveTodosToLocalStorage();
  return todo;
}

// Function to render the todo items
function renderTodoItems() {
  todoList.innerHTML = '';
  todos.forEach((todo, index) => {
    const item = document.createElement('li');
    item.classList.add('todo-item');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.addEventListener('change', () => toggleCompleted(index));
    item.appendChild(checkbox);

    const titleDescContainer = document.createElement('div');
    titleDescContainer.classList.add('title-desc-container');

    const title = document.createElement('span');
    title.textContent = todo.title;
    if (todo.completed) {
      title.classList.add('completed');
    }
    titleDescContainer.appendChild(title);

    const description = document.createElement('span');
    description.textContent = todo.description;
    if (todo.completed) {
      description.classList.add('completed');
    }
    titleDescContainer.appendChild(description);

    item.appendChild(titleDescContainer);

    const createdDate = document.createElement('span');
    createdDate.textContent = `Created: ${formatDate(todo.createdDate)}`;
    createdDate.classList.add('created-date');
    item.appendChild(createdDate);

    if (todo.completed) {
    const completedDate = document.createElement('span');
    completedDate.textContent = `Completed: ${formatDate(todo.completedDate)}`;
    completedDate.classList.add('completed-date');
    item.appendChild(document.createElement('br')); // Add a line break
    item.appendChild(completedDate);
  }

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteTodoItem(index));
    deleteButton.classList.add('delete-button');
    item.appendChild(deleteButton);

    todoList.appendChild(item);
  });
}

// Function to toggle the completed status of a todo item
function toggleCompleted(index) {
  todos[index].completed = !todos[index].completed;
  todos[index].completedDate = todos[index].completed ? new Date() : null;
  saveTodosToLocalStorage();
  renderTodoItems();
}

// Function to delete a todo item
function deleteTodoItem(index) {
  todos.splice(index, 1);
  saveTodosToLocalStorage();
  renderTodoItems();
}

