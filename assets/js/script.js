let titleEl = $('#taskTitle')
let dueDateEl = $('#taskDueDate')
let descEl = $('#taskDesc')
let btn = $('buttonclick')
let toDO = ('to-do');
let deleteBtn = $('.swim-lanes')
// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
// function generateTaskId() {
//     const newTask = {
//         // ? Here we use a tool called `crypto` to generate a random id for our project. This is a unique identifier that we can use to find the project in the array. `crypto` is a built-in module that we can use in the browser and Nodejs.
//         id: crypto.randomUUID(),
//         title: taskTitle.val(),
//         dueDate: taskDueDate.val(),
//         type: taskDesc.val(),
//         status: 'to-do',
//       };
// }


// Todo: create a function to create a task card
function createTaskCard(task) {
    const taskCard = $('<div>')
    taskCard.addClass('card project-card draggable my-3')
    taskCard.attr('data-project-id' , task-id)
    
    // TODO: Create a new card element and add the classes `card`, `project-card`, `draggable`, and `my-3`. Also add a `data-project-id` attribute and set it to the project id.
   
    // TODO: Create a new card header element and add the classes `card-header` and `h4`. Also set the text of the card header to the project name.
    const newCardHeader = $('<div>')
    newCardHeader.addClass('card-header h4')
    newCardHeader.text(task.name)
    // TODO: Create a new card body element and add the class `card-body`.
    const newCardBody = $('<div>')
    newCardBody.addClass('card-body')
    // TODO: Create a new paragraph element and add the class `card-text`. Also set the text of the paragraph to the project type.
    const newCardText = $('<p>')
    newCardText.addClass('card-text')
    newCardText.text(task.type)
  
    // TODO: Create a new paragraph element and add the class `card-text`. Also set the text of the paragraph to the project due date.
    const newCardDueDate =$('<p>')
    newCardDueDate.addClass('card-text')
    newCardDueDate.text(task.dueDate)
    // TODO: Create a new button element and add the classes `btn`, `btn-danger`, and `delete`. Also set the text of the button to "Delete" and add a `data-project-id` attribute and set it to the project id.
  const cardDeleteBtn = $('<button')
  cardDeleteBtn.addClass('btn btn-danger delete')
  cardDeleteBtn.text('Delete')
  cardDeleteBtn.attr('data-project-id' , task.id)

  if (project.dueDate && project.status !== 'done') {
    const now = dayjs();
    const taskDueDate = dayjs(project.dueDate, 'DD/MM/YYYY');

    // ? If the task is due today, make the card yellow. If it is overdue, make it red.
    if (now.isSame(taskDueDate, 'day')) {
      taskCard.addClass('bg-warning text-white');
    } else if (now.isAfter(taskDueDate)) {
      taskCard.addClass('bg-danger text-white');
      cardDeleteBtn.addClass('border-light');
    }
}
}
// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
   
}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
  console.log ('Hello')
  event.preventDefault();

  // Get the project name, type, and due date from the form
  const taskTitle = $('taskTitle')
  const taskDueDate = $('taskDueDate')
  const taskDesc = $('taskDesc')
  // ? Create a new project object with the data from the form
  const newTasks = {
    // ? Here we use a tool called `crypto` to generate a random id for our project. This is a unique identifier that we can use to find the project in the array. `crypto` is a built-in module that we can use in the browser and Nodejs.
    taskId: crypto.randomUUID(),
    title: taskTitle.val(),
    dueDate: taskDueDate.val(),
    type: taskDesc.val(),
    status: 'to-do',
  };

  console.log(newTasks)
  // ? Pull the projects from localStorage and push the new project to the array
  const tasks = readProjectsFromStorage();
  tasks.push(newTasks);

  // ? Save the updated projects array to localStorage
  saveTasksToStorage(tasks);

  // ? Print project data back to the screen
  printTaskData();

  // Clear the form inputs
  taskTitle.val('');
  taskDueDate.val('');
  taskDesc.val('');
}
let savedDatas = localStorage.getItem('tasks')
  if (savedDatas === null){
  savedDatas = []
    return savedDatas = []
  }else {
    savedDatas = JSON.parse(localStorage.getItem('tasks'))
    return savedDatas
  }
  function saveTasksToStorage(tasks) {
    JSON.stringify.localStorage.setItem('tasks', tasks)
  }
// const taskTitle = $('taskTitle')
// const taskDueDate = $('taskDueDate')
// const taskDesc = $('taskDesc')
//   const newTask = {
//     // ? Here we use a tool called `crypto` to generate a random id for our project. This is a unique identifier that we can use to find the project in the array. `crypto` is a built-in module that we can use in the browser and Nodejs.
//     taskId: crypto.randomUUID(),
//     title: taskTitle.val(),
//     dueDate: taskDueDate.val(),
//     type: taskDesc.val(),
//     status: 'to-do',
//   };
//   let savedDatas = localStorage.getItem('tasks')
//   if (savedDatas === null){
//   savedDatas = []
//     return savedDatas = []
//   }else {
//     savedDatas = JSON.parse(localStorage.getItem('tasks'))
//     return savedDatas
//   }


function saveTasksToStorage(tasks) {
JSON.stringify.localStorage.setItem('tasks', tasks)


}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
   
  }


// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    // printTaskData();

    $('#taskDueDate').datepicker({
      changeMonth: true,
      changeYear: true,
    });
  
    // ? Make lanes droppable
    $('.lane').droppable({
      accept: '.draggable',
      drop: handleDrop,
    });
  });