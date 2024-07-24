import deleteImg from './images/delete.svg';


let projectCounter = 0;
let projects = [];

class Project {
    constructor(title) {
        this.title = title;
        this.tasks = []; // Initialize tasks as an empty array
    }
}

class Task {
    constructor(title, description, dueDate, notes) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.notes = notes;
    }
}

// functions

export function showProjectForm() {

    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    document.body.appendChild(overlay);

    const form = document.createElement('form');
    form.classList.add('project-form');
    form.innerHTML = `
        <input type="text" id="projectTitle" placeholder="Project Title" required>
        <button type="submit">Add</button>
        <button type="button" class="cancel-btn">Cancel</button>
    `;

    overlay.appendChild(form);

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('projectTitle').value;
        createProject(title);
        closeForm();
    });

    const cancelBtn = form.querySelector('.cancel-btn');
    cancelBtn.addEventListener('click', closeForm);

    function closeForm() {
        document.body.removeChild(overlay);
    }
}


function createProject(projectTitle) {

    const project = new Project(projectTitle);
    projects.push(project);
    console.log(projects);
    addProjectToList();

}

function addProjectToList () {

    projectCounter++

    const projCard = document.createElement('div');
    projCard.className ='project';
    projCard.id = `project-${projectCounter}`;

    const projectHeader = document.createElement('div');
    projectHeader.classList.add("project-header");
    projectHeader.textContent = projects[projects.length-1].title;

    const BtnBox = document.createElement('div');
    BtnBox.className = 'buttons-box'

    const addTaskBtn = document.createElement('button');
    addTaskBtn.classList.add('add-task-btn');
    addTaskBtn.textContent =  "Add New Task";

    addTaskBtn.addEventListener('click', showTaskForm);

    const deleteIcon = document.createElement('img');
    deleteIcon.src = deleteImg;
    deleteIcon.alt = 'Delete Logo';
    deleteIcon.className = 'delete-logo';

    deleteIcon.addEventListener('click', function() {
        projCard.remove();
      });

    BtnBox.appendChild(addTaskBtn);
    BtnBox.appendChild(deleteIcon);

    const content = document.getElementById('content');

    projectHeader.appendChild(BtnBox);
    projCard.appendChild(projectHeader);
    content.appendChild(projCard);
    
}


function showTaskForm() {
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    document.body.appendChild(overlay);

    const form = document.createElement('form');
    form.classList.add('task-form');
    form.innerHTML = `
        <h2>New Task</h2>
        <label for="taskTitle">Title:</label>
        <input type="text" id="taskTitle" required>

        <label for="taskDescription">Description:</label>
        <textarea id="taskDescription" rows="3"></textarea>

        <label for="taskDueDate">Due Date:</label>
        <input type="date" id="taskDueDate">

        <label for="taskNotes">Notes:</label>
        <textarea id="taskNotes" rows="3"></textarea>

        <button type="submit">Add Task</button>
        <button type="button" class="cancel-btn">Cancel</button>
    `;

    overlay.appendChild(form);

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('taskTitle').value;
        const description = document.getElementById('taskDescription').value;
        const dueDate = document.getElementById('taskDueDate').value;
        const notes = document.getElementById('taskNotes').value;
        
        createTask(title, description, dueDate, notes);
        closeForm();
    });

    const cancelBtn = form.querySelector('.cancel-btn');
    cancelBtn.addEventListener('click', closeForm);

    function closeForm() {
        document.body.removeChild(overlay);
    }
}


function createTask(title, description, dueDate, notes) {

    const task = new Task(title, description, dueDate, notes);
    projects[projectCounter-1].tasks.push(task);
    console.log(projects[projectCounter-1]);
}


function addTask(task) {
    this.tasks.push(task)
}

function deleteTask(taskNumber) {
    this.tasks.splice(taskNumber-1,1)
}

function logProjectDetails() {
    console.log(`Project: ${this.title}`);
    this.tasks.forEach((task, index) => {
        console.log(`  Task ${index + 1}: ${task.title}`);
        console.log(`    Description: ${task.description}`);
        console.log(`    Due Date: ${task.dueDate}`);
        console.log(`    Notes: ${task.notes}`);
        console.log();  
    });
}
