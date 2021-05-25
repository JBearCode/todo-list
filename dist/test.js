console.log('webpack disabled (testing)');

let myTodoArray = [];
let myCategoryWork = [];
let myCategoryKids = [];

const submitButton = document.getElementById('form-submit');
const mainForm = document.getElementById('main-form');

window.onload = function() {
    mainForm.addEventListener("submit", addItemToArray);
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

function addItemToArray(e) {
    e.preventDefault();
    const todoTitle = document.getElementById('todo-title-input').value;
    const categoryDropdown = document.getElementById('select-category').value;
    const currentTime = Date.now();
    const dueDate = document.getElementById('due-date-input').value;
    if (dueDate == null) { dueDate = ""};
    const urgent = document.getElementById('urgent-checkbox').checked;
    myTodoArray.push(new TodoClass(todoTitle, categoryDropdown, currentTime, dueDate, urgent, false));
}
