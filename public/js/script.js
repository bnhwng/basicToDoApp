const inputBox = document.querySelector(".input-box");
const container = document.querySelector(".list-container");

// Load tasks when page loads
document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
  let taskText = inputBox.value.trim();

  if (taskText === "") {
    alert("You must write something!");
    return;
  }

  let li = document.createElement("li");
  li.textContent = taskText;

  let span = document.createElement("span");
  span.innerHTML = "\u00d7"; // Close button (×)
  span.classList.add("close");

  li.appendChild(span);
  container.appendChild(li);

  saveTask(taskText);

  inputBox.value = ""; // Clear input

  // Toggle completed task
  li.addEventListener("click", function () {
    li.classList.toggle("checked");
    updateTaskStatus(taskText, li.classList.contains("checked"));
  });

  // Remove task on close button click
  span.addEventListener("click", function (event) {
    event.stopPropagation(); // Prevent triggering li click
    removeTask(taskText);
    li.remove();
  });
}

// Save to local storage
function saveTask(task) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ text: task, completed: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from local storage
function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((task) => {
    let li = document.createElement("li");
    li.textContent = task.text;

    if (task.completed) {
      li.classList.add("checked");
    }

    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    span.classList.add("close");

    li.appendChild(span);
    container.appendChild(li);

    li.addEventListener("click", function () {
      li.classList.toggle("checked");
      updateTaskStatus(task.text, li.classList.contains("checked"));
    });

    span.addEventListener("click", function (event) {
      event.stopPropagation();
      removeTask(task.text);
      li.remove();
    });
  });
}

// Update task completion status
function updateTaskStatus(taskText, completed) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.map((task) =>
    task.text === taskText ? { text: task.text, completed: completed } : task
  );
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Remove task from local storage
function removeTask(taskText) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter((task) => task.text !== taskText);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
