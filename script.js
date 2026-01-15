document.addEventListener('DOMContentLoaded',()=>{ //only runs js code when the html is fully loaded


    let input=document.getElementById('todo-input')
    let addtaskbutton=document.getElementById('add-task-btn')
    let list=document.getElementById('todo-list')
    
    
    //what we need to do is as soon as our web page loads we want to read from the local storage, grab all the tasks, 
    //store the tasks in this array and then loop through each task to display it as an html using the rendertask function
    let tasks= JSON.parse(localStorage.getItem('tasks'))||[]; //this has the array of tasks

    tasks.forEach(task => rendertask(task)); //as soon as the page loads the tasks will be printed on the console
    
    addtaskbutton.addEventListener('click',function(){
        let input_value=input.value.trim() //whatever we are passing in the input (the element id of todo-input) is stored in this variable after trimming the extra spaces
        if(input_value===""){
            return;
        }
    
        let newtask={
            id: Date.now(), //each task we make has a unique id based on the time in miliseconds
            text: input_value, //the text value of the newtask will be what we wrote in the input_vlaue
            completed: false
        }
    
        tasks.push(newtask); // pushing each task we make into the array 
        saveTasks(); //calling the function savetasks to save the array in the local memory
        rendertask(newtask)
        input.value=""; //as soon as we click the addtask button the text inside the input bar will go away
        console.log(tasks) //we want to print the array of all the tasks currently in the list
    
        //saving the tasks (or task array) in the local storage

    
        
    })
    
    //In a to-do list, rendering tasks means showing the tasks from your data (like an array or localStorage) 
    // on the screen as HTML elements
    function rendertask(task){
        const li=document.createElement('li') //creating element of type 'li'
        li.setAttribute('data-id',task.id)

        if(task.completed){
            li.classList.add('completed')
        }

        li.innerHTML=` <span>${task.text}</span> 
        <button>delete</delete>`;
        //in each <li></li> element (created for each task), we are adding the task.text and also a delete button

        li.addEventListener('click',function(event){
            if(event.target.tagName==="BUTTON"){
                return;
            }
            task.completed= !task.completed;
            li.classList.toggle("completed");
            saveTasks()
        })

        li.querySelector('button').addEventListener('click',(event)=>{
            event.stopPropagation() //stopping from bubbling up
            tasks=tasks.filter(t=>t.id !==task.id) //only keep the ones in the array whose id was not matched with the one clicked , updating the array
            li.remove()
            saveTasks()
        })

        list.appendChild(li) //we are appending each li element made for each task in the list
    
    }
    
    function saveTasks(){
        localStorage.setItem("tasks",JSON.stringify(tasks)) //this is a key,value pair where the key is the 'tasks' and the value is the array which we have converted into a string as it can only take a string as input
    }
    //it does not update the storage, the whole array is being rewritten everytime
    

})    
