const addTaskBtn = document.querySelector('#add-task-btn')
const formDialog = document.querySelector('#form-dialog')
const form = document.querySelector('form')

const tasks = []

addTaskBtn.addEventListener('click',(e) => {
    formDialog.showModal()

    document.querySelector('#close-btn').addEventListener('click',(e) => {
        formDialog.close()
    })
})

form.addEventListener('submit',(e) => {
    e.preventDefault()

    const title = e.target.querySelector('#title-input').value;
    const description = e.target.querySelector('#description-input').value;
    const status = e.target.querySelector('#status-input').value

    const task = {
        'title':title,
        'description':description,
        'status': status
    }
    tasks.push(task)  
    displayTask(task);

    formDialog.close()
})

const tasksField = document.querySelector('#tasks')
const currentlyShowing = document.querySelector('#currently-showing')

const allBtn = document.querySelector('#all-tasks-btn')
const pendingBtn = document.querySelector('#pending-tasks-btn')
const inProgressBtn = document.querySelector('#inprogress-tasks-btn')
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

const completedBtn = document.querySelector('#completed-tasks-btn')
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

    const titleDiv = document.createElement('div')
    titleDiv.innerHTML = `<p id="task-title">${task.title}</p> <button id="edit-btn">Edit</button> <button id="delete-btn">Delete</button>`
    taskDiv.appendChild(titleDiv)

    const desc = document.createElement('p')
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
