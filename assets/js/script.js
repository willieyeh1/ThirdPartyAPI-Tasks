let titleEl = $('#taskTitle')
let dueDateEl = $('#taskDueDate')
let descEl = $('#taskDesc')
let btn = $('buttonclick')
let toDO = ('to-do');
let deleteBtn = $('.swim-lanes')
let taskFormEl = $('#addTask')






function readTasksFromStorage() {
  
  let tasks = [];
  const savedTasks = JSON.parse(localStorage.getItem("tasks"));
  if(savedTasks){
    tasks= savedTasks;
  }
  return tasks;
}

function saveTasksToStorage(taskObjects){
  localStorage.setItem("tasks",JSON.stringify(taskObjects));
}
// Todo: create a function to create a task card
function createTaskCard(task) {
    const taskCard = $('<div>')
    taskCard.addClass('card project-card draggable my-3')
    taskCard.attr('data-project-id' , task.id)
    
    
   
    
    const title = $('<h3>')
    title.addClass('card-header h4')
    title.text(task.title)
   
    const body = $('<div>')
    body.addClass = $('card-body')
    // TODO: Create a new paragraph element and add the class `card-text`. Also set the text of the paragraph to the project type.
    const dueDate = $('<p>')
    dueDate.addClass('card-text')
    dueDate.text(task.dueDate)
  
    // TODO: Create a new paragraph element and add the class `card-text`. Also set the text of the paragraph to the project due date.
    const desc =$('<p>')
    desc.addClass('card-text')
    desc.text(task.desc)

    // const del = $('<div>')
    // deleteBtn.addClass()
    // TODO: Create a new button element and add the classes `btn`, `btn-danger`, and `delete`. Also set the text of the button to "Delete" and add a `data-project-id` attribute and set it to the project id.
  const cardDeleteBtn = $('<button>')
  cardDeleteBtn.addClass('btn btn-danger delete')
  cardDeleteBtn.text('Delete')
  cardDeleteBtn.attr('data-project-id' , task.id)

  if (task.dueDate && task.status !== 'done') {
    const now = dayjs();
    const taskDueDate = dayjs(task.dueDate, 'DD/MM/YYYY');

    // ? If the task is due today, make the card yellow. If it is overdue, make it red.
    if (now.isSame(taskDueDate, 'day')) {
      taskCard.addClass('bg-warning text-white');
    } else if (now.isAfter(taskDueDate)) {
      taskCard.addClass('bg-danger text-white');
      cardDeleteBtn.addClass('border-light');
    }
}
body.append(dueDate, desc, cardDeleteBtn)
taskCard.append(title, body)
return taskCard
}
// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
  const tasks = readTasksFromStorage();

  // ? Empty existing project cards out of the lanes
  const todoList = $("#todo-cards");
  todoList.empty();

  const inProgressList = $("#in-progress-cards");
  inProgressList.empty();

  const doneList = $("#done-cards");
  doneList.empty();

  //  Loop through projects and create project cards for each status
  for (let task of tasks) {
    const taskCards = createTaskCard(task);
    if(task.status==="to-do"){
      todoList.append(taskCards)
    }else if(task.status==="in-progress"){
      inProgressList.append(taskCards)
    } else {
      doneList.append(taskCards)
    }
  }
  $(".draggable").draggable({
    opacity: 0.7,
    zIndex: 100,
    // ? This is the function that creates the clone of the card that is dragged. This is purely visual and does not affect the data.
    helper: function (e) {
      // ? Check if the target of the drag event is the card itself or a child element. If it is the card itself, clone it, otherwise find the parent card  that is draggable and clone that.
      const original = $(e.target).hasClass("ui-draggable")
        ? $(e.target)
        : $(e.target).closest(".ui-draggable");
      // ? Return the clone with the width set to the width of the original card. This is so the clone does not take up the entire width of the lane. This is to also fix a visual bug where the card shrinks as it's dragged to the right.
      return original.clone().css({
        width: original.outerWidth(),
      });
    },
  });
}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
  // console.log ('Hello')
  event.preventDefault();

  // Get the project name, type, and due date from the form
  const taskTitle = titleEl.val()
  const taskDueDate = dueDateEl.val()
  const taskDesc = descEl.val()
  // ? Create a new project object with the data from the form
  const newTasks = {
    // ? Here we use a tool called `crypto` to generate a random id for our project. This is a unique identifier that we can use to find the project in the array. `crypto` is a built-in module that we can use in the browser and Nodejs.
    id: crypto.randomUUID(),
    title: taskTitle,
    dueDate: taskDueDate,
    desc: taskDesc,
    status: 'to-do',
  };

  console.log(newTasks)
  // ? Pull the projects from localStorage and push the new project to the array
  const tasks = readTasksFromStorage();
  tasks.push(newTasks);

  // ? Save the updated projects array to localStorage
  saveTasksToStorage(tasks);

  // ? Print project data back to the screen
  renderTaskList();

  // Clear the form inputs
  titleEl.val('');
  dueDateEl.val('');
  descEl.val('');
}







// Todo: create a function to handle deleting a task
function handleDeleteTask(){
  const taskId = $(this).attr("data-task-id");
  const td = readTasksFromStorage();
      //keep index start at -1
  let idxToDel = -1; 
  for (let i = 0; i < td.length; i++) {
      if(td[i].id===taskId){
        console.log("Id Same")
        console.log(td[i])
        idxToDel = i;
      }
  }
  td.splice(idxToDel,1);
  saveTasksToStorage(td)
  renderTaskList()
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
  const tasks = readTasksFromStorage();

  // ? Get the project id from the event
  const taskId = ui.draggable[0].dataset.projectId;

  // ? Get the id of the lane that the card was dropped into
  const newStatus = event.target.id;

  for (let task of tasks) {
    // ? Find the project card by the `id` and update the project status.
    if (task.id === taskId) {
      task.status = newStatus;
    }
  }
  // ? Save the updated projects array to localStorage (overwritting the previous one) and render the new project data to the screen.
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTaskList();
}
  
taskFormEl.on("click", handleAddTask);

// Add an event listener to listen for the delete buttons. Use event delegation to call the `handleDeleteProject` function.
deleteBtn.on("click", ".delete", handleDeleteTask);



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