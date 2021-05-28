console.log('webpack disabled (testing)');

let myTodoArray = [];
let myCategory = [];
let idCounter = 1;

const submitButton = document.getElementById('form-submit');
const mainForm = document.getElementById('main-form');

window.onload = function() {
    mainForm.addEventListener("submit", addItemToArray);
    populate();
}

function populate() {
    myTodoArray.push(new TodoClass("Catch the escaped giraffe", "Work", idCounter++, getRelativeDate(-3), true, true));
    myTodoArray.push(new TodoClass("Build a taller fence", "Work", idCounter++, getRelativeDate(-2), true, true));
    myTodoArray.push(new TodoClass("Catch the escaped elephant", "Work", idCounter++, getRelativeDate(0), true, false));
    myTodoArray.push(new TodoClass("Build a stronger fence", "Work", idCounter++, getRelativeDate(2), true, false));
    myTodoArray.push(new TodoClass("Prepare the bear's hibernation station", "Work", idCounter++, getRelativeDate(10), false, false));

    myTodoArray.push(new TodoClass("Find a less stressful job", "School", idCounter++, getRelativeDate(25), true, false));
    myTodoArray.push(new TodoClass("Start The Odin Project full-stack course", "School", idCounter++, getRelativeDate(-70), false, true));
    myTodoArray.push(new TodoClass("Build a site for the zoo", "School", idCounter++, getRelativeDate(6), false, false));
    myTodoArray.push(new TodoClass("Make a to-do list site to organize my life", "School", idCounter++, getRelativeDate(0), false, false));

    myTodoArray.push(new TodoClass("Take the boys to the ball game", "Kids", idCounter++, getRelativeDate(0), true, false));
    myTodoArray.push(new TodoClass("Host the zoo field trip", "Kids", idCounter++, getRelativeDate(4), false, false));
    myTodoArray.push(new TodoClass("Teach the boys to make the sound of an ocelot", "Kids", idCounter++, getRelativeDate(25), true, false));
}

function getRelativeDate(daysToAdd) {
    // get today's date
    let date = new Date();
    // add days
    date.setDate(date.getDate() + daysToAdd);
    // format to yyyy-mm-dd
    let dd = date.getDate();
    let mm = date.getMonth()+1; 
    let yyyy = date.getFullYear();
    if(dd<10) {
        dd = '0' +dd;
    } 
    if(mm<10) {
    mm = '0' + mm;
    } 
    date = yyyy + '-' + mm + '-' + dd;
    return date;
}

class TodoClass {
    constructor(title, project, id, due, urgent, complete) {
        this.title = title;
        this.project = project;
        this.id = id;
        this.due = due;
        this.urgent = urgent;
        this.complete = complete;
    };
};

let urgentButton = document.getElementById('checkbutton');

function addItemToArray(e) {
    e.preventDefault();
    const todoTitle = document.getElementById('todo-title-input').value;
    const categoryDropdown = document.getElementById('select-category').value;
    const dueDate = document.getElementById('due-date-input').value;
    if (dueDate == null) { dueDate = ""};
    let urgentButton = document.getElementById('checkbutton');
    let urgent;
    if (urgentButton.textContent == "Not Urgent") {
        urgent = false;
    } else urgent = true;
    myTodoArray.push(new TodoClass(todoTitle, categoryDropdown, idCounter++, dueDate, urgent, false));
}

// navigation toggle code
const toggle = document.querySelector(".toggle");
const menu = document.querySelector(".menu");
 
function toggleMenu() {
    if (menu.classList.contains("active")) {
        menu.classList.remove("active");
         
        // adds the menu (hamburger) icon
        toggle.querySelector("a").innerHTML = '<i class="fas fa-bars"></i>';
    } else {
        menu.classList.add("active");
         
        // adds the close (x) icon
        toggle.querySelector("a").innerHTML = '<i class="fas fa-times"></i>';
    }
}
toggle.addEventListener("click", toggleMenu, false);

const items = document.querySelectorAll(".item");
 
// submenu toggle code
function toggleItem() {
  if (this.classList.contains("submenu-active")) {
    this.classList.remove("submenu-active");
  } else if (menu.querySelector(".submenu-active")) {
    menu.querySelector(".submenu-active").classList.remove("submenu-active");
    this.classList.add("submenu-active");
  } else {
    this.classList.add("submenu-active");
  }
}
// add toggle event listeners for submenus
for (let item of items) {
    if (item.querySelector(".submenu")) {
      item.addEventListener("click", toggleItem, false);
      item.addEventListener("keypress", toggleItem, false);
    }
}

/* Close Submenu From Anywhere */
function closeSubmenu(e) {
    const mediaQuery = window.matchMedia('(min-width: 680px)');
    let isClickInside = menu.contains(e.target);
   
    if (!isClickInside && menu.querySelector(".submenu-active") && mediaQuery.matches) {
        menu.querySelector(".submenu-active").classList.remove("submenu-active");
    };
}
   
  /* Event listener */
  document.addEventListener("click", closeSubmenu, false);
  
  urgentButton.addEventListener("click", toggleText, false);

  function toggleText() {
      if (urgentButton.textContent === "Not Urgent") {
          urgentButton.textContent = "Urgent";
          urgentButton.style.backgroundColor = "#fc7f2d";

      } else {
          urgentButton.textContent = "Not Urgent";
          urgentButton.style.backgroundColor = "#58ffec";
      }
  }

