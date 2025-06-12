document.addEventListener('DOMContentLoaded', loadTasks);

function addTask() {
  const input = document.getElementById("task-input");
  const taskText = input.value.trim();

  if (taskText === "") {
    alert("Task cannot be empty!");
    return;
  }

  const task = {
    id: Date.now(),
    text: taskText,
    completed: false
  };

  saveTask(task);
  renderTask(task);
  input.value = "";
}

function renderTask(task) {
  const list = document.getElementById("task-list");

  const li = document.createElement("li");
  li.setAttribute("data-id", task.id);

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;
  checkbox.addEventListener("change", () => toggleComplete(task.id));

  const span = document.createElement("span");
  span.className = "task-text" + (task.completed ? " completed" : "");
  span.textContent = task.text;

  const actions = document.createElement("div");
  actions.className = "task-actions";

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.className = "edit-btn";
  editBtn.onclick = () => editTask(task.id);

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.className = "delete-btn";
  deleteBtn.onclick = () => deleteTask(task.id);

  actions.append(editBtn, deleteBtn);
  li.append(checkbox, span, actions);
  list.appendChild(li);
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(renderTask);
}

function saveTask(task) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function toggleComplete(id) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.map(task => {
    if (task.id === id) {
      task.completed = !task.completed;
    }
    return task;
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  refreshList();
}

function deleteTask(id) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter(task => task.id !== id);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  refreshList();
}

function editTask(id) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const task = tasks.find(t => t.id === id);
  const newText = prompt("Edit task:", task.text);
  if (newText !== null && newText.trim() !== "") {
    task.text = newText.trim();
    localStorage.setItem("tasks", JSON.stringify(tasks));
    refreshList();
  }
}

function refreshList() {
  document.getElementById("task-list").innerHTML = "";
  loadTasks();
}
