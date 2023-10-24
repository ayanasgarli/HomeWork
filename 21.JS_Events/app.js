document.addEventListener('DOMContentLoaded', function () {
    let todoInput = document.getElementById('todo-input');
    let errorMessage = document.getElementById('error-message');
    let addBtn = document.getElementById('add-button');
    let clearAllBtn = document.getElementById('clear-all-button');
    let todoList = document.getElementById('todo-list');
    let noTodoText = document.querySelector('.no-todo');
    let taskCountText = document.getElementById('task-count');
    let deleteButtonColor = 'red';

    let taskCount = 0;

    addBtn.addEventListener('click', function () {
        let todoText = todoInput.value.trim();
        if (todoText === '') {
            errorMessage.style.display = 'block';
        } else {
            errorMessage.style.display = 'none';
            let todoItem = document.createElement('div');
            todoItem.className = 'todo-item';
            todoItem.innerHTML = `
                <span class="todo-text">${todoText}</span>
                <span class="delete-button">&#128465;</span>
                <span class="done-button">&#10004;</span>
            `;
            todoList.appendChild(todoItem);
            taskCount++;
            updatePendingTasksText();
            todoInput.value = '';
            noTodoText.style.display = 'none';

            let deleteButton = todoItem.querySelector('.delete-button');
            deleteButton.style.color = deleteButtonColor;
            deleteButton.addEventListener('click', function () {
                if (confirm('Are you sure to delete?')) {
                    todoList.removeChild(todoItem);
                    taskCount--;
                    updatePendingTasksText();
                    if (taskCount === 0) {
                        noTodoText.style.display = 'block';
                    }
                }
            });

            let doneButton = todoItem.querySelector('.done-button');
            let todoTextSpan = todoItem.querySelector('.todo-text');
            doneButton.addEventListener('click', function () {
                todoTextSpan.classList.toggle('done');
                if (todoTextSpan.classList.contains('done')) {
                    taskCount--;
                } else {
                    taskCount++;
                }
                updatePendingTasksText();
            });
        }
    });

    clearAllBtn.addEventListener('click', function () {
        if (taskCount > 0) {
            if (confirm('Are you sure to clear all tasks?')) {
                while (todoList.firstChild) {
                    todoList.removeChild(todoList.firstChild);
                }
                taskCount = 0;
                updatePendingTasksText();
                noTodoText.style.display = 'block';
            }
        } else {
            alert('No tasks to clear');
        }
    });

    function updatePendingTasksText() {
        taskCountText.textContent = `You have ${taskCount} pending tasks`;
    }
});