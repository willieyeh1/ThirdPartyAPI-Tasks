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
    
    const dueDate = $('<p>')
    dueDate.addClass('card-text')
    dueDate.text(task.dueDate)
  
    
    const desc =$('<p>')
    desc.addClass('card-text')
    desc.text(task.desc)

    
  const cardDeleteBtn = $('<button>')
  cardDeleteBtn.addClass('btn btn-danger delete')
  cardDeleteBtn.text('Delete')
  cardDeleteBtn.attr('data-project-id' , task.id)

  if (task.dueDate && task.status !== 'done') {
    const now = dayjs();
    const taskDueDate = dayjs(task.dueDate, 'DD/MM/YYYY');

    
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

function renderTaskList() {
  const tasks = readTasksFromStorage();

 
  const todoList = $("#todo-cards");
  todoList.empty();

  const inProgressList = $("#in-progress-cards");
  inProgressList.empty();

  const doneList = $("#done-cards");
  doneList.empty();

  
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
    
    helper: function (e) {
      
      const original = $(e.target).hasClass("ui-draggable")
        ? $(e.target)
        : $(e.target).closest(".ui-draggable");
      
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


  const taskTitle = titleEl.val()
  const taskDueDate = dueDateEl.val()
  const taskDesc = descEl.val()
  
  const newTasks = {
    
    id: crypto.randomUUID(),
    title: taskTitle,
    dueDate: taskDueDate,
    desc: taskDesc,
    status: 'to-do',
  };

  console.log(newTasks)
  
  const tasks = readTasksFromStorage();
  tasks.push(newTasks);

 
  saveTasksToStorage(tasks);

  
  renderTaskList();

  
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