console.log('webpack disabled (testing)');

let myTodoArray = [];
let idCounter = 1;

const nav = document.getElementById('nav');
const submitButton = document.getElementById('form-submit');
const mainForm = document.getElementById('main-form');
const urgentButton = document.getElementById('checkbutton');
const main = document.getElementById('main');
const toggle = document.querySelector(".toggle");
const menu = document.querySelector(".menu");
const table = document.querySelector("#todo-table");
const homeButton = document.querySelector("#home-button");

window.onload = function() {
    populate();
    homeClick();
    mainForm.addEventListener("submit", addItemToArray);
    table.addEventListener("click", tableClick);
    nav.addEventListener("click", navClick);
}

function navClick(e) {
    console.log(e.target);
    if (e.target.classList.contains('category')) {
        let catname = e.target.getAttribute("data-catname");
        console.log(catname);
        displayCategory(catname);
    } else if (e.target.classList.contains('date-menu')) {
        let timePeriod = e.target.getAttribute('data-date');
        handleDateClick(timePeriod);
    } else if (e.target.classList.contains('home-button')) {
        homeClick();
    }
}

function displayCategory(clickedCategory) {
    console.log("Clicked category is " + clickedCategory);
    let myCategory = myTodoArray.filter(object => object.project === clickedCategory);
    showArray(myCategory);
}

function handleDateClick(timePeriod) {
    switch(timePeriod) {
        case "day":
            console.log('This code executes when "day" is clicked');
            displayByDueDate(0);
            break;
        case "week":
            console.log('This code executes when "week" is clicked');
            displayByDueDate(7);
            break;
        case "month":
            console.log('This code executes when "month" is clicked');
            displayByDueDate(30);
            break;
        default:
            return;
    }
}

function displayByDueDate(number) {
    let sortDate = getRelativeDate(number);
    console.log(sortDate);
    let dueDateArray = myTodoArray.filter(object => object.due <= sortDate);
    dueDateArray.sort((a, b) => new Date(a.due) - new Date(b.due));
    console.table(dueDateArray);
    showArray(dueDateArray);
}

function tableClick(e) {
    console.log(e);
    console.log(e.target);
    if (e.target.closest(".urgent-span") || e.target.closest(".not-urgent-span")) {
        if (e.target.tagName === "I") {
            let span = e.target.parentNode;
            updateUrgencyInArray(span);
            updateUrgencyInDOM(span);
        } else if (e.target.tagName === "SPAN") {
            let span = e.target;
            updateUrgencyInArray(span);
            updateUrgencyInDOM(span);
        }
    }
};

function updateUrgencyInArray(spanID) {
    spanID = spanID.getAttribute("data-id");
    spanID = parseInt(spanID, 10);
    let index = myTodoArray.findIndex(x => x.id == spanID);
    let urgentStatus = myTodoArray[index].urgent;
    if (urgentStatus == true) {
        myTodoArray[index].urgent = false;
    } else if (urgentStatus == false) {
        myTodoArray[index].urgent = true;
    }
}

function updateUrgencyInDOM(span) {
    if (span.classList.contains('not-urgent-span')) {
        span.classList.remove('not-urgent-span');
        span.classList.add('urgent-span');
        span.childNodes[0].classList.remove('grey');
        span.childNodes[0].classList.add('red');
    }
    else if (span.classList.contains('urgent-span')) {
        span.classList.remove('urgent-span');
        span.classList.add('not-urgent-span');
        span.childNodes[0].classList.remove('red');
        span.childNodes[0].classList.add('grey');
    }
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
    mainForm.reset();
    if (urgentButton.textContent === "Urgent") {
        toggleText();
    }
}

function showArray(inputArray) {
    const jsTable = document.getElementById('js-table');
    jsTable.innerHTML = "";
  
    for (let i = 0; i < inputArray.length; i++) {
      let newRow = jsTable.insertRow(-1);

      let dateCell = newRow.insertCell(-1);
      let dateText = document.createTextNode(inputArray[i].due);
      dateCell.appendChild(dateText);
  
      let titleCell = newRow.insertCell(-1);
      if (inputArray[i].urgent === true) {
        titleCell.innerHTML = '<span class="urgent-span" data-id="' + inputArray[i].id + '"><i class="fas fa-star red"></i></span>' + " " + inputArray[i].title;
      } else {
        titleCell.innerHTML = '<span class="not-urgent-span" data-id="' + inputArray[i].id + '"><i class="fas fa-star grey"></i></span>' + " " + inputArray[i].title;
      }
      
      let deleteIcon = newRow.insertCell(-1);
      deleteIcon.innerHTML = '<i class="fas fa-minus-circle"></i>';
    }
  }

// navigation toggle code
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

  // function for home link
  function homeClick() {
    main.style.display = "unset";
    showArray(myTodoArray);
  }
