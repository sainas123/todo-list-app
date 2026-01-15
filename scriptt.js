document.addEventListener('DOMContentLoaded',function(){

    let input=document.getElementById('todo-input')
    let addtaskbutton=document.getElementById('add-task-btn')
    let list= document.getElementById('todo-list')

    let tasks=JSON.parse(localStorage.getItem('tasks'))||[]

    tasks.forEach(task=> rendertask(task))

    addtaskbutton.addEventListener('click', function(){

        let input_value=input.value.trim();
        if (input_value===""){
            return;
        }

        let newtask={
            id: Date.now(),
            text: input_value,
            completed: false
        }


        tasks.push(newtask)

        input.value="";

        rendertask(newtask)
        savetasks()


    })

    function rendertask(task){

    let li=document.createElement('li')
    li.innerHTML=`<span>${task.text}</span> <button>delete</button>`

    list.appendChild(li)

    li.querySelector('button').addEventListener('click',function(event){
        event.stopPropagation ()
        tasks=tasks.filter(t=>t.id !==task.id) 
        savetasks()
        li.remove()
    })

    li.addEventListener('click',function(event){
        if(event.target.tagName==="BUTTON"){
            return;
        }
        li.classList.toggle("completed")
        task.completed =! task.completed
        savetasks()
    })



    }

    function savetasks(){

        localStorage.setItem('tasks',JSON.stringify(tasks))

    }



})

