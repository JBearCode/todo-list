console.log('webpack is working');

let myTodoArray = [];
let myCategoryWork = [];
let myCategoryKids = [];

const todoTitleInput = document.getElementById('todo-title-input');
const categoryDropdown = document.getElementById('select-category');
const dueDateInput = document.getElementById('do-date-input');
const submitButton = document.getElementById('form-submit');

window.onload = function() {
    submitButton.addEventListener(addItemToArray);
}

class TodoClass {
    constructor(title, project, created, due, urgent, complete) {
        this.title = title;
        this.project = project;
        this.created = created;
        this.due = due;
        this.urgent = urgent;
        this.complete = complete;
    };
};

function addItemToArray() {
    e.preventDefault();
    const todoTitle = document.getElementById('todo-title-input').value;
    const categoryDropdown = document.getElementById('select-category').value;
    const currentTime = Date.now();
    const dueDate = document.getElementById('do-date-input').value;
    const urgent = document.getElementById('urgent-checkbox').checked;
    myTodoArray.push(new TodoClass(todoTitle, categoryDropdown, currentTime, dueDate, urgent, false);
    form.reset();
}

const submitButton = document.getElementById('form-submit');

