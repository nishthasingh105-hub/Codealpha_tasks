// Local Storage Key
const STORAGE_KEY = 'todoList';

// Current Filter
let currentFilter = 'all';

// Initialize app
window.addEventListener('DOMContentLoaded', () => {
    loadTodos();
    attachEnterKeyListener();
    updateStats();
});

// Add event listener for Enter key
function attachEnterKeyListener() {
    const input = document.getElementById('todoInput');
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTodo();
        }
    });
}

// Add new todo
function addTodo() {
    const input = document.getElementById('todoInput');
    const text = input.value.trim();

    if (text === '') {
        alert('Please enter a task!');
        return;
    }

    const todos = getTodosFromStorage();
    const newTodo = {
        id: Date.now(),
        text: text,
        completed: false,
        createdAt: new Date().toLocaleString(),
        priority: 'medium'
    };

    todos.push(newTodo);
    saveTodosToStorage(todos);
    input.value = '';
    loadTodos();
    updateStats();
}

// Toggle todo completion
function toggleTodo(id) {
    const todos = getTodosFromStorage();
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        saveTodosToStorage(todos);
        loadTodos();
        updateStats();
    }
}

// Delete todo
function deleteTodo(id) {
    const todos = getTodosFromStorage();
    const filteredTodos = todos.filter(t => t.id !== id);
    saveTodosToStorage(filteredTodos);
    loadTodos();
    updateStats();
}

// Clear completed todos
function clearCompleted() {
    const todos = getTodosFromStorage();
    const activeTodos = todos.filter(t => !t.completed);
    if (activeTodos.length === todos.length) {
        alert('No completed tasks to clear!');
        return;
    }
    saveTodosToStorage(activeTodos);
    loadTodos();
    updateStats();
}

// Clear all todos
function clearAllTodos() {
    if (confirm('Are you sure you want to delete all tasks? This action cannot be undone.')) {
        saveTodosToStorage([]);
        loadTodos();
        updateStats();
    }
}

// Filter todos
function filterTodos(filter) {
    currentFilter = filter;

    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    loadTodos();
}

// Load and display todos
function loadTodos() {
    const todos = getTodosFromStorage();
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = '';

    let filteredTodos = todos;

    if (currentFilter === 'active') {
        filteredTodos = todos.filter(t => !t.completed);
    } else if (currentFilter === 'completed') {
        filteredTodos = todos.filter(t => t.completed);
    }

    if (filteredTodos.length === 0) {
        todoList.innerHTML = `
            <div class="empty-state">
                <div class="emoji">📝</div>
                <p>${currentFilter === 'all' ? 'No tasks yet. Add one to get started!' : `No ${currentFilter} tasks.`}</p>
            </div>
        `;
        return;
    }

    filteredTodos.forEach(todo => {
        const todoItem = createTodoElement(todo);
        todoList.appendChild(todoItem);
    });
}

// Create todo element
function createTodoElement(todo) {
    const div = document.createElement('div');
    div.className = `todo-item ${todo.completed ? 'completed' : ''}`;
    div.innerHTML = `
        <input 
            type="checkbox" 
            class="checkbox" 
            ${todo.completed ? 'checked' : ''}
            onchange="toggleTodo(${todo.id})"
        >
        <span class="todo-text">${escapeHtml(todo.text)}</span>
        <button class="delete-btn" onclick="deleteTodo(${todo.id})">Delete</button>
    `;
    return div;
}

// Get todos from localStorage
function getTodosFromStorage() {
    const todos = localStorage.getItem(STORAGE_KEY);
    return todos ? JSON.parse(todos) : [];
}

// Save todos to localStorage
function saveTodosToStorage(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

// Update statistics
function updateStats() {
    const todos = getTodosFromStorage();
    const completed = todos.filter(t => t.completed).length;
    const active = todos.length - completed;

    document.getElementById('totalCount').textContent = todos.length;
    document.getElementById('activeCount').textContent = active;
    document.getElementById('completedCount').textContent = completed;
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
