// ===== TODO APP - MAIN APPLICATION =====
class TodoApp {
    constructor() {
        this.inputBox = document.getElementById("input-box");
        this.listContainer = document.getElementById("list-container");
        this.currentPage = 1;
        this.itemsPerPage = 10;
        this.isLoading = false;
        this.todosWithDates = [];
        this.filteredTodos = [];
        this.originalListHTML = '';
        
        this.init();
    }

    init() {
        this.loadSavedTasks();
        this.setupEventListeners();
    }

    // ===== CORE TODO OPERATIONS =====
    async addTask() {
        if (!this.inputBox.value.trim()) {
            this.showMessage('Please enter a task before adding.', 'warning');
            return;
        }
        
        if (this.inputBox.value.length > 200) {
            this.showMessage('Task description is too long. Please keep it under 200 characters.', 'warning');
            return;
        }

        const addButton = document.getElementById('btn');
        this.showButtonLoading(addButton, 'Add');

        try {
            const newTodo = {
                title: this.inputBox.value,
                completed: false,
                createdDate: new Date().toISOString().split('T')[0]
            };

            this.todosWithDates.push(newTodo);
            this.updateFilteredTodos();
            
            // API Integration
            const apiToggle = document.getElementById("api-toggle");
            if (apiToggle.checked) {
                const isConnected = await this.checkAPIConnectivity();
                if (isConnected) {
                    await this.postTodoToAPI(newTodo.title);
                } else {
                    this.showMessage('API is not accessible. Todo saved locally only.', 'warning');
                }
            }

            this.displayTodosWithPagination();
            this.inputBox.value = "";
            this.saveData();
        } catch (error) {
            console.error('Error adding task:', error);
            this.showMessage('Failed to add task. Please try again.', 'error');
        } finally {
            this.hideButtonLoading(addButton);
        }
    }

    toggleTodo(li) {
        li.classList.toggle("checked");
        const taskText = li.textContent;
        const todoIndex = this.todosWithDates.findIndex(todo => todo.title === taskText);
        if (todoIndex !== -1) {
            this.todosWithDates[todoIndex].completed = !this.todosWithDates[todoIndex].completed;
        }
        this.saveData();
    }

    deleteTodo(li) {
        const taskText = li.textContent;
        this.todosWithDates = this.todosWithDates.filter(todo => todo.title !== taskText);
        this.filteredTodos = this.filteredTodos.filter(todo => todo.title !== taskText);
        li.remove();
        this.saveData();
        this.displayTodosWithPagination();
    }

    // ===== SEARCH & FILTERING =====
    searchTasks() {
        const searchTerm = document.getElementById("search-box").value.toLowerCase().trim();
        
        if (searchTerm === '') {
            this.filteredTodos = [...this.todosWithDates];
            this.currentPage = 1;
            this.updatePagination();
            this.displayTodosWithPagination();
            return;
        }

        this.showLoading('Searching...');
        setTimeout(() => {
            this.filteredTodos = this.todosWithDates.filter(todo => 
                todo.title.toLowerCase().includes(searchTerm)
            );
            this.currentPage = 1;
            this.displayTodosWithPagination();
            this.hideLoading();
        }, 300);
    }

    filterByDate() {
        const fromDate = document.getElementById("from-date").value;
        const toDate = document.getElementById("to-date").value;
        
        this.showLoading('Filtering by date...');
        setTimeout(() => {
            if (!fromDate && !toDate) {
                this.filteredTodos = [...this.todosWithDates];
            } else {
                this.filteredTodos = this.todosWithDates.filter(todo => {
                    const todoDate = new Date(todo.createdDate);
                    const from = fromDate ? new Date(fromDate) : null;
                    const to = toDate ? new Date(toDate) : null;
                    
                    if (from && to) return todoDate >= from && todoDate <= to;
                    if (from) return todoDate >= from;
                    if (to) return todoDate <= to;
                    return true;
                });
            }
            this.currentPage = 1;
            this.displayTodosWithPagination();
            this.hideLoading();
        }, 300);
    }

    clearDateFilter() {
        document.getElementById("from-date").value = "";
        document.getElementById("to-date").value = "";
        this.showLoading('Clearing filters...');
        setTimeout(() => {
            this.filteredTodos = [...this.todosWithDates];
            this.currentPage = 1;
            this.displayTodosWithPagination();
            this.hideLoading();
        }, 200);
    }

    // ===== PAGINATION =====
    displayTodosWithPagination() {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const todosToShow = this.filteredTodos.slice(startIndex, endIndex);
        
        this.listContainer.innerHTML = '';
        todosToShow.forEach(todo => {
            const li = document.createElement("li");
            li.innerHTML = todo.title;
            if (todo.completed) li.classList.add("checked");
            
            const span = document.createElement("span");
            span.innerHTML = "\u00d7";
            li.appendChild(span);
            this.listContainer.appendChild(li);
        });
        
        this.updatePagination();
    }

    updatePagination() {
        const totalPages = Math.ceil(this.filteredTodos.length / this.itemsPerPage);
        const startItem = (this.currentPage - 1) * this.itemsPerPage + 1;
        const endItem = Math.min(this.currentPage * this.itemsPerPage, this.filteredTodos.length);
        
        document.getElementById("pagination-info").textContent = 
            `Showing ${startItem}-${endItem} of ${this.filteredTodos.length} todos`;
        
        document.getElementById("prev-btn").disabled = this.currentPage === 1;
        document.getElementById("next-btn").disabled = this.currentPage === totalPages;
        
        this.generatePageNumbers(totalPages);
    }

    generatePageNumbers(totalPages) {
        const container = document.getElementById("page-numbers");
        container.innerHTML = '';
        
        const maxVisiblePages = 5;
        let startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
        
        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }
        
        for (let i = startPage; i <= endPage; i++) {
            const pageBtn = document.createElement("button");
            pageBtn.textContent = i;
            pageBtn.className = i === this.currentPage ? "page-btn active" : "page-btn";
            pageBtn.onclick = () => this.goToPage(i);
            container.appendChild(pageBtn);
        }
    }

    goToPage(page) {
        this.currentPage = page;
        this.displayTodosWithPagination();
    }

    previousPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.displayTodosWithPagination();
        }
    }

    nextPage() {
        const totalPages = Math.ceil(this.filteredTodos.length / this.itemsPerPage);
        if (this.currentPage < totalPages) {
            this.currentPage++;
            this.displayTodosWithPagination();
        }
    }

    changeItemsPerPage() {
        this.itemsPerPage = parseInt(document.getElementById("items-per-page").value);
        this.currentPage = 1;
        this.displayTodosWithPagination();
    }

    // ===== API OPERATIONS =====
    async fetchTodosFromAPI() {
        const fetchButton = document.getElementById('api-btn');
        this.showButtonLoading(fetchButton, 'Load Todos from API');
        
        try {
            this.showMessage('Loading todos from API...', 'info');
            const todos = await this.retryAPICall(() => this.performAPIFetch());
            
            this.showLoading('Processing todos...');
            await new Promise(resolve => setTimeout(resolve, 500));
            
            this.todosWithDates = todos.map(todo => ({
                title: todo.title,
                completed: todo.completed || false,
                createdDate: new Date().toISOString().split('T')[0]
            })).filter(todo => todo.title && typeof todo.title === 'string');
            
            this.filteredTodos = [...this.todosWithDates];
            this.saveData();
            this.displayTodosWithPagination();
            this.showMessage(`Successfully loaded ${this.todosWithDates.length} todos from API!`, 'success');
            
        } catch (error) {
            console.error('Error fetching todos:', error);
            this.handleAPIError(error, 'Failed to load todos from API.');
            this.loadFallbackData();
        } finally {
            this.hideLoading();
            this.hideButtonLoading(fetchButton);
        }
    }

    async performAPIFetch() {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const todos = await response.json();
        if (!Array.isArray(todos)) throw new Error('Invalid response format: Expected array of todos');
        
        return todos;
    }

    async postTodoToAPI(title) {
        try {
            const newTodo = await this.retryAPICall(async () => {
                const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ title, completed: false, userId: 1 })
                });
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                return await response.json();
            });
            
            console.log('Todo posted to API successfully:', newTodo);
            this.showMessage('Todo saved to API successfully!', 'success');
            return newTodo;
        } catch (error) {
            console.error('Error posting todo to API:', error);
            this.handleAPIError(error, 'Failed to save todo to API.');
            return null;
        }
    }

    async retryAPICall(apiFunction, maxRetries = 3, delay = 1000) {
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                return await apiFunction();
            } catch (error) {
                console.error(`API attempt ${attempt} failed:`, error);
                if (attempt === maxRetries) throw error;
                
                this.showMessage(`API request failed. Retrying... (${attempt}/${maxRetries})`, 'warning');
                await new Promise(resolve => setTimeout(resolve, delay * attempt));
            }
        }
    }

    async checkAPIConnectivity() {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=1', {
                method: 'HEAD', timeout: 5000
            });
            return response.ok;
        } catch (error) {
            console.error('API connectivity check failed:', error);
            return false;
        }
    }

    handleAPIError(error, defaultMessage) {
        let userMessage = defaultMessage;
        
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
            userMessage = 'Network error: Unable to connect to API. Please check your internet connection.';
        } else if (error.message.includes('404')) {
            userMessage = 'API endpoint not found. Please try again later.';
        } else if (error.message.includes('500')) {
            userMessage = 'Server error: API is temporarily unavailable. Please try again later.';
        } else if (error.message.includes('429')) {
            userMessage = 'Too many requests. Please wait a moment before trying again.';
        } else if (error.message.includes('403')) {
            userMessage = 'Access denied. Please check your API permissions.';
        } else if (error.message.includes('Invalid response format')) {
            userMessage = 'API returned invalid data format. Please try again later.';
        }
        
        this.showMessage(userMessage, 'error');
    }

    loadFallbackData() {
        const savedTodos = localStorage.getItem("todosWithDates");
        if (savedTodos) {
            try {
                this.todosWithDates = JSON.parse(savedTodos);
                this.filteredTodos = [...this.todosWithDates];
                this.displayTodosWithPagination();
                this.showMessage('Loaded existing todos from local storage.', 'info');
            } catch (parseError) {
                console.error('Error parsing saved todos:', parseError);
                this.showMessage('Unable to load saved todos. Starting with empty list.', 'warning');
            }
        }
    }

    // ===== UI & LOADING STATES =====
    showLoading(message = 'Loading...') {
        this.isLoading = true;
        const loadingOverlay = document.createElement('div');
        loadingOverlay.className = 'loading-overlay';
        loadingOverlay.id = 'loading-overlay';
        loadingOverlay.innerHTML = `
            <div class="loading-content">
                <div class="loading-spinner"></div>
                <p class="loading-text">${message}</p>
            </div>
        `;
        document.querySelector('.todo-app').appendChild(loadingOverlay);
        this.disableInteractions();
    }

    hideLoading() {
        this.isLoading = false;
        const loadingOverlay = document.getElementById('loading-overlay');
        if (loadingOverlay) loadingOverlay.remove();
        this.enableInteractions();
    }

    showButtonLoading(button, originalText) {
        button.disabled = true;
        button.innerHTML = '<div class="button-spinner"></div> Loading...';
        button.dataset.originalText = originalText;
    }

    hideButtonLoading(button) {
        button.disabled = false;
        button.innerHTML = button.dataset.originalText || 'Add';
    }

    showMessage(message, type = 'error') {
        const existingError = document.querySelector('.error-message');
        if (existingError) existingError.remove();
        
        const errorDiv = document.createElement('div');
        errorDiv.className = `error-message ${type}`;
        errorDiv.innerHTML = `
            <span>${message}</span>
            <button onclick="this.parentElement.remove()" class="error-close">×</button>
        `;
        
        const todoApp = document.querySelector('.todo-app');
        const header = todoApp.querySelector('h2');
        header.parentNode.insertBefore(errorDiv, header.nextSibling);
        
        setTimeout(() => {
            if (errorDiv.parentNode) errorDiv.remove();
        }, 5000);
    }

    disableInteractions() {
        document.querySelectorAll('button, input, select, .todo-app li').forEach(element => {
            element.style.pointerEvents = 'none';
            element.style.opacity = '0.6';
        });
    }

    enableInteractions() {
        document.querySelectorAll('button, input, select, .todo-app li').forEach(element => {
            element.style.pointerEvents = 'auto';
            element.style.opacity = '1';
        });
    }

    // ===== DATA MANAGEMENT =====
    saveData() {
        localStorage.setItem("todosWithDates", JSON.stringify(this.todosWithDates));
    }

    loadSavedTasks() {
        this.showLoading('Loading saved tasks...');
        setTimeout(() => {
            // Load todos data from localStorage
            const savedTodos = localStorage.getItem("todosWithDates");
            if (savedTodos) {
                try {
                    this.todosWithDates = JSON.parse(savedTodos);
                } catch (error) {
                    console.error('Error parsing saved todos:', error);
                    this.todosWithDates = [];
                }
            }
            
            // Always use the data from todosWithDates array, not HTML
            this.filteredTodos = [...this.todosWithDates];
            this.displayTodosWithPagination();
            this.hideLoading();
        }, 300);
    }

    updateFilteredTodos() {
        const searchBox = document.getElementById("search-box");
        const fromDate = document.getElementById("from-date").value;
        const toDate = document.getElementById("to-date").value;
        
        if (!searchBox.value && !fromDate && !toDate) {
            this.filteredTodos = [...this.todosWithDates];
        }
    }

    // ===== EVENT LISTENERS =====
    setupEventListeners() {
        this.listContainer.addEventListener("click", (e) => {
            if (e.target.tagName === "LI") {
                this.toggleTodo(e.target);
            } else if (e.target.tagName === "SPAN") {
                this.deleteTodo(e.target.parentElement);
            }
        }, false);
    }
}

// ===== GLOBAL FUNCTIONS FOR HTML ONCLICK =====
let todoApp;

function addTask() { todoApp.addTask(); }
function searchTasks() { todoApp.searchTasks(); }
function filterByDate() { todoApp.filterByDate(); }
function clearDateFilter() { todoApp.clearDateFilter(); }
function fetchTodosFromAPI() { todoApp.fetchTodosFromAPI(); }
function previousPage() { todoApp.previousPage(); }
function nextPage() { todoApp.nextPage(); }
function changeItemsPerPage() { todoApp.changeItemsPerPage(); }

// ===== INITIALIZE APP =====
document.addEventListener('DOMContentLoaded', () => {
    todoApp = new TodoApp();
});