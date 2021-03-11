var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var taskIdCounter = 0;
var pageContentEl = document.querySelector("#page-content");

var taskFormHandler = function(event) {

event.preventDefault();

    var taskNameInput = document.querySelector("input[name='task-name']").value;
    
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
   // package up data as an object
 
   // check if input values are empty strings
if (!taskNameInput || !taskTypeInput) {
    alert("You need to fill out the task form!");
    return false;

  }

  formEl.reset();

  //reset form fields for the next task to be inputed
  document.querySelector("input[name='task-name']").value = "";
  document.querySelector("select[name='task-type']").selectedIndex = 0;
 

   var taskDataObj = {
    name: taskNameInput,
    type: taskTypeInput
   };
};
  // send it as an argument to createTaskEl
  createTaskEl(taskDataObj);


var createTaskEl = function(taskDataObj) {

//create list item
    var listItemEl = document.createElement("li"); 
    listItemEl.className = "task-item";
    listItemEl.setAttribute("data-task-id", taskIdCounter);

    //create div to hold task info and add to list item


    var taskInfoEl = document.createElement("div");

    //give it a class name
    taskInfoEl.className = "task-info";

    //add HTML content to div

    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

    listItemEl.appendChild(taskInfoEl);
    console.dir(listItemEl);

    taskIdCounter++;

    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);

    //add entire list item to list
    tasksToDoEl.appendChild(listItemEl);
 
    




    var createTaskActions = function(taskId) {

        var actionContainerEl = document.createElement("div");
        actionContainerEl.className = "task-actions";

        //create edit button
        var editButtonEl = document.createElement("button");
        editButtonEl.textContent = "Edit";
        editButtonEl.className = "btn edit-btn";
        editButtonEl.setAttribute("data-task-id", taskId);

        actionContainerEl.appendChild(editButtonEl);

        //create a delete button
        var deleteButtonEl = document.createElement("button");
        deleteButtonEl.textContent = "Delete";
        deleteButtonEl.className = "btn delete-btn";
        deleteButtonEl.setAttribute("data-task-id", taskId);

        actionContainerEl.appendChild(deleteButtonEl);
    };

    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    //create edit button
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(editButtonEl);

    //create delete button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(deleteButtonEl);

    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(statusSelectEl);

    var statusChoices = ["To Do", "In Progress", "Completed"];

    for (var i = 0; i < statusChoices.length; i++) {
        //create option element
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices [i];
        statusOptionEl.setAttribute("value", statusChoices[i]);

        //apend to select

    statusSelectEl.appendChild(statusOptionEl);
    }

    return actionContainerEl;
};


    formEl.addEventListener("submit", taskFormHandler);

    var taskButtonHandler = function(event) {
        //get target element from event
        var targetEl = event.target;

        //edit button was clicked
        if (targetEl.matches(".edit-btn")) {
            var taskId = targetEl.getAttribute("data-task-id");
            editTask(taskId);
        }

        //delete button was clicked
        else if (targetEl.matches(".delete-btn")) {
            var taskId = targetEl.getAttribute("data-task-id");
            deleteTask(taskId);
        }
    };

    var deleteTask = function(taskId) {
        var taskSelected = document.querySelector(".task-item[data-taks-id='" + taskId + "']");
        taskSelected.remove();
            
        };

    var editTask = function(taskId) {

        //get task list item element
        var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId +"']");

        //get content from task name and type
        var taskName = taskSelected.querySelector("h3.task-name").textContent;

        var taskType = taskSelected.querySelector("span.task-type").taskContent;

        document.querySelector("input[name='task-name']").value = taskName;

        document.querySelector("select[name='task-type']").value = taskType;

        document.querySelector("#save-task").textContent = "Save Task";

        formEl.setAttribute("data-task-id", taskId);
    };
        

    pageContentEl.addEventListener("click", taskButtonHandler);