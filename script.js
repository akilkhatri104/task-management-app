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

    tasks.push({
        'title':title,
        'description':description,
        'status': status
    })  
    
    formDialog.close()
})

const tasksField = document.querySelector('#tasks')
const currentlyShowing = document.querySelector('#currently-showing')

const allBtn = document.querySelector('#all-tasks-btn')
allBtn.addEventListener('click',(e) => {
    currentlyShowing.innerHTML = 'All Tasks'
    document.querySelector('#tasks').innerHTML = ''

    tasks.forEach( task => {
        console.log(task);
        displayTask(task)
    } )
})

const pendingBtn = document.querySelector('#pending-tasks-btn')
pendingBtn.addEventListener('click',e => {
    document.querySelector('#tasks').innerHTML = ''
    currentlyShowing.innerHTML = 'Pending Tasks'

    tasks.forEach(task => {
        if(task.status == 'pending')
        displayTask(task)
        console.log(task);
            
    })

})

const inProgressBtn = document.querySelector('#inprogress-tasks-btn')
inProgressBtn.addEventListener('click', () => {
    document.querySelector('#tasks').innerHTML = ''
    currentlyShowing.innerHTML = 'In Progress Tasks'
    tasks.forEach(task => {
        if(task.status == 'inprogress')
        displayTask(task)
        console.log(task);
            
    })
})

const completedBtn = document.querySelector('#completed-tasks-btn')
completedBtn.addEventListener('click',() => {
    document.querySelector('#tasks').innerHTML = ''
    currentlyShowing.innerHTML = 'Completed Tasks'
    tasks.forEach(task => {
        if(task.status == 'completed')
        displayTask(task)
        console.log(task);
            
    })
})

function displayTask(task){
    const taskListDiv = document.querySelector('#tasks')
    
    const taskDiv = document.createElement('div')
    taskDiv.className = 'task'

    const titleDiv = document.createElement('div')
    titleDiv.innerHTML = `<p id="task-title">${task.title}</p> <button id="edit-btn">Edit</button> <button id="delete-btn">Delete</button>`
    taskDiv.appendChild(titleDiv)

    const desc = document.createElement('p')
    desc.innerHTML = `${task.description}`
    taskDiv.appendChild(desc)

    taskListDiv.appendChild(taskDiv)
}
