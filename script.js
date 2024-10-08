const addTaskBtn = document.querySelector('#add-task-btn')
const formDialog = document.querySelector('#form-dialog')
const form = document.querySelector('form')

let tasks = []

addTaskBtn.addEventListener('click',(e) => {
    showForm()

    document.querySelector('#close-btn').addEventListener('click',(e) => {
        formDialog.close()
        form.reset()
    })
})

form.addEventListener('submit',(e) => {
    e.preventDefault()

    const title = e.target.querySelector('#title-input').value;
    const description = e.target.querySelector('#description-input').value;
    const status = e.target.querySelector('#status-input').value
    const id = nanoid()

    if(!title || !description){
        alert('Please fill out both Title and Description')
        return
    }

    const task = {
        'title':title,
        'description':description,
        'status': status,
        'id':id
    }
    
    tasks.push(task)  
    displayTask(task);
    console.log(task.id);
    
    saveTasksToLocalStorage()

    formDialog.close()
    form.reset()
    
})

const tasksField = document.querySelector('#tasks')
const currentlyShowing = document.querySelector('#currently-showing')

const allBtn = document.querySelector('#all-tasks-btn')
const pendingBtn = document.querySelector('#pending-tasks-btn')
const inProgressBtn = document.querySelector('#inprogress-tasks-btn')
const completedBtn = document.querySelector('#completed-tasks-btn')
const allStatusBtns = [allBtn,pendingBtn,inProgressBtn]
const allStatusDivs = document.querySelector('#tasks').childNodes
console.log(allStatusDivs);

allBtn.addEventListener('click',(e) => {
    currentlyShowing.innerHTML = 'All Tasks'
    allStatusDivs.forEach(child => {
        if(child.nodeName == 'DIV')
            child.style.display = 'none'
    })

    document.querySelector('#all-tasks').style.display = 'block'
    
})

pendingBtn.addEventListener('click',e => {
    
    currentlyShowing.innerHTML = 'Pending Tasks'
    allStatusDivs.forEach(child => {
        if(child.nodeName == 'DIV')
            child.style.display = 'none'
    })

    document.querySelector('#pending-tasks').style.display = 'block'

    
})
inProgressBtn.addEventListener('click', () => {
    currentlyShowing.innerHTML = 'In Progress Tasks'
    
    allStatusDivs.forEach(child => {
        if(child.nodeName == 'DIV')
            child.style.display = 'none'
    })

    document.querySelector('#inprogress-tasks').style.display = 'block'
    
})

completedBtn.addEventListener('click',() => {
    currentlyShowing.innerHTML = 'Completed Tasks'
    allStatusDivs.forEach(child => {
        if(child.nodeName == 'DIV')
            child.style.display = 'none'
    })

    document.querySelector('#completed-tasks').style.display = 'block'
    
})

function displayTask(task){
    const allTasksDiv = document.querySelector('#all-tasks')
    const pendingTaskDiv = document.querySelector('#pending-tasks')
    const inProgressTaskDiv = document.querySelector('#inprogress-tasks')
    const completedTaskDiv = document.querySelector('#completed-tasks')
    
    const createTaskDiv = () => {
    const taskDiv = document.createElement('div')
    taskDiv.className = 'task'
    taskDiv.id = task.id

    let status = undefined
    if(task.status == 'pending')
        status = `<span id='pending-icon'>Pending</span>`
    else if(task.status == 'inprogress')
        status = `<span id='inprogress-icon'>In-Progress</span>`
    else
        status = `<span id='completed-icon'>Completed</span>`

    const titleDiv = document.createElement('div')
    titleDiv.innerHTML = `<p id="task-title">${task.title}${status}</p> <button id="edit-btn">Edit</button> <button id="delete-btn">Delete</button>`
    taskDiv.appendChild(titleDiv)

    
    taskDiv.querySelector('#delete-btn').addEventListener('click',e =>{
        deleteTask(task.id)
    })
    taskDiv.querySelector('#edit-btn').addEventListener('click',e => {
        deleteTask(task.id)
        showForm(task.title,task.description,task.status)

    })

    const desc = document.createElement('p')
    desc.style.fontWeight = '100'
    desc.innerHTML = `${task.description}`
    taskDiv.appendChild(desc)
    return taskDiv

}

    allTasksDiv.appendChild(createTaskDiv())
    switch (task.status) {
        case 'pending':
            pendingTaskDiv.appendChild(createTaskDiv())
            break;
        case 'inprogress':
            inProgressTaskDiv.appendChild(createTaskDiv())
            break;
        case 'completed':
            completedTaskDiv.appendChild(createTaskDiv())
            break;
    
        default:
            break;
    }
}

function deleteTask(taskID){
    tasks = tasks.filter(task => task.id != taskID)

    // document.querySelectorAll(`#${taskID}`).forEach(task => {
    //     task.remove()
    // })

    tasksField.childNodes.forEach(taskCategory => {
        taskCategory.childNodes.forEach(task => {
            if(task.id == taskID)
                task.remove()
        })
    })

    saveTasksToLocalStorage()
}


function saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        tasks.forEach(task => displayTask(task)); // Display each task
    }
}

// Call this function when the page loads
document.addEventListener('DOMContentLoaded', loadTasksFromLocalStorage);

function showForm(title = "",desc = "",status = "pending"){
    formDialog.showModal()
    document.querySelector('#title-input').value = title
    document.querySelector('#description-input').value = desc
    document.querySelector('#status-input').value = status
}
