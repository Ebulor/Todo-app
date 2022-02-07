const toggleTheme = document.querySelector(".icon");
const todoBtn = document.querySelector(".todo-btn");
const todo_input = document.querySelector(".todo-input");
const todo_list = document.querySelector(".todo-list"); 
const header = document.querySelector("header");
const body = document.querySelector("body");
const filter = document.querySelector(".filter"); 
const container = document.querySelector(".container");
const items_left = document.querySelector(".items-left");
const filters = document.querySelectorAll(".filters button");

   

//toggle darktheme
toggleTheme.addEventListener("click", ()=>{
    toggleTheme.classList.toggle("darktheme");
    header.classList.toggle("darktheme");
    body.classList.toggle("darkmode");
})


//event listeners
todoBtn.addEventListener("click", addTodo);
todo_list.addEventListener("click", removeTodo);
filter.addEventListener("click", filterTodos);


// change color of filter buttons when clicked
filters.forEach((button)=>{
    button.addEventListener("click", ()=>{
        filters.forEach((button)=>{
            button.classList.remove("active-btn");
            
        })
        button.classList.add("active-btn");
       
    })
})


//functions

// create todo on click

function addTodo(e){
    e.preventDefault(); // prevent form from submitting
    //todo div
    if(todo_input.value == ""){
        return;
    }
    else{     

    //create individual todos    

    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    todoDiv.setAttribute("draggable", true);
    

    //complete button
    const completeBtn = document.createElement("button");
    completeBtn.classList.add("complete-btn")
    todoDiv.appendChild(completeBtn);

    // create li
    const newTodo = document.createElement("li");
    newTodo.innerText = todo_input.value;
    newTodo.classList.add("todo-item");

    //append newTodo to todo div
    todoDiv.appendChild(newTodo);    

    //check remove button
    const removeBtn = document.createElement("button");
    removeBtn.classList.add("remove-btn")
    todoDiv.appendChild(removeBtn);    

    //append tododiv to todolist
    todo_list.appendChild(todoDiv)

    //clear todo input;
    todo_input.value = "";
    }    

    // add active class to filter
    filter.classList.add("active-filter");

    // add bottom text
    const text = document.querySelector(".text");
    text.style.display = "block";
    //reorder todo list
    
    const draggables = document.querySelectorAll(".todo");
    const dragContainer = document.querySelector(".todo-list");
    
    draggables.forEach(draggable =>{
        draggable.addEventListener("dragstart", ()=>{
            draggable.classList.add("dragging");
        })
        draggable.addEventListener("dragend", ()=>{
            draggable.classList.remove("dragging");
        })
    })

    dragContainer.addEventListener("dragover", e=>{
        e.preventDefault();
        const afterElement = getDragAfterElement(container, e.clientY);
        console.log(afterElement);
        const draggable = document.querySelector(".dragging");
        if(afterElement == null){
            dragContainer.appendChild(draggable)
        }
        else{
            dragContainer.insertBefore(draggable, afterElement);
        }        
    })

    // items left 
    itemsLeft();
}   

// reorder list function

function getDragAfterElement(container, y){
   const draggableElements = [...container.querySelectorAll(".todo:not(.dragging)")];

   return draggableElements.reduce((closest, child) =>{
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if(offset < 0 && offset > closest.offset){
            return { offset: offset, element: child}
        }
        else{
            return closest;
        }
   }, {offset: Number.NEGATIVE_INFINITY}).element;
}


// display items left function
    
function itemsLeft(){
    const todosLeft = todo_list.childNodes;
    const left = todosLeft.length;
    if(left == 1){
        items_left.innerText = left + " item left";
    }
    else{
        items_left.innerText = left + " items left";
    }
    
}

// function to delete todo-item

function removeTodo(e){
    const item = e.target;
    if(item.classList[0] === "remove-btn" ){
        const todo = item.parentElement;
        todo.remove();
        
    }
    if(item.classList[0] === "complete-btn"){
        item.classList.toggle("complete-bg");
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }

    itemsLeft();
    
}

// filter todo to check for active, all, completed, and clear completed

function filterTodos(e){
    const todos = todo_list.childNodes;
        
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display = "flex";
                console.log(todos)
                 break;
            case "completed":
                if(todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } 
                else{
                    todo.style.display = "none";
                }
                break;
            case "active":
                if(!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } 
                else{
                    todo.style.display = "none";
                } 
                break;
            case "clear-complete":  
                if(todo.classList.contains("completed")) {
                   const todos = document.querySelectorAll(".completed")
                    todos.forEach((todo)=>{
                        todo.remove()
                    })
                    itemsLeft();
                } 
                break;
              
        }
    })
}
