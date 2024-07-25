import './style.css';
import logo from './images/calendar-todo-fill.svg';
import add from './images/add.svg';
import deleteImg from './images/delete.svg';
import notesImg from './images/notes.svg';

document.addEventListener('DOMContentLoaded', loadProjectsFromLocalStorage);

//************************** *//


let projects = [];

const img = document.createElement('img');
img.src = logo;
img.alt = 'Todo List Logo';
img.className = 'logo';

const plus = document.createElement('img');
plus.src = add;
plus.className = 'plus-sign';

document.querySelector('.header').appendChild(img);
document.querySelector('.create-project').appendChild(plus);

const plusBtn = document.querySelector('.plus-sign');
plusBtn.addEventListener('click', () => {
    showProjectForm();
});

class Project {
    constructor(title) {
        this.id = Date.now();
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

function showProjectForm() {
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
        e.preventDefault(); // Still needed to prevent page reload
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
    saveProjectsToLocalStorage();
    addProjectToList(project);
}

function saveProjectsToLocalStorage() {
    localStorage.setItem('projects', JSON.stringify(projects));
}

function loadProjectsFromLocalStorage() {
    const storedProjects = localStorage.getItem('projects');
    if (storedProjects) {
        projects = JSON.parse(storedProjects);
        projects.forEach(project => addProjectToList(project));
    }
}

function createTask(projectId, title, description, dueDate, notes) {
    const task = new Task(title, description, dueDate, notes);
    const project = projects.find(p => p.id === projectId);
    project.tasks.push(task);
    saveProjectsToLocalStorage();
    addTaskToProject(projectId, task);
}

function addProjectToList(project) {
    const projCard = document.createElement('div');
    projCard.className = 'project';
    projCard.id = `project-${project.id}`;

    const projectHeader = document.createElement('div');
    projectHeader.classList.add("project-header");
    projectHeader.textContent = project.title;

    const BtnBox = document.createElement('div');
    BtnBox.className = 'buttons-box';

    const addTaskBtn = document.createElement('button');
    addTaskBtn.classList.add('add-task-btn');
    addTaskBtn.textContent = "Add New Task";

    addTaskBtn.addEventListener('click', function () {
        showTaskForm(project.id);
    });

    const deleteIcon = document.createElement('img');
    deleteIcon.src = deleteImg;
    deleteIcon.alt = 'Delete Logo';
    deleteIcon.className = 'icons';

    deleteIcon.addEventListener('click', function () {
        deleteProject(project.id);
        projCard.remove();
    });

    BtnBox.appendChild(addTaskBtn);
    BtnBox.appendChild(deleteIcon);

    const content = document.getElementById('content');

    projectHeader.appendChild(BtnBox);
    projCard.appendChild(projectHeader);
    content.appendChild(projCard);

    // Load tasks for this project
    project.tasks.forEach(task => addTaskToProject(project.id, task));
}

function showTaskForm(projectId) {
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

        createTask(projectId, title, description, dueDate, notes);
        closeForm();
    });

    const cancelBtn = form.querySelector('.cancel-btn');
    cancelBtn.addEventListener('click', closeForm);

    function closeForm() {
        document.body.removeChild(overlay);
    }
}

function addTaskToProject(projectId, task) {
    const projectElement = document.getElementById(`project-${projectId}`);

    const taskCard = document.createElement('div');
    taskCard.classList.add('task-card');

    const circle = createCircle();

    const notesIcon = document.createElement('img');
    notesIcon.src = notesImg;
    notesIcon.className = 'icons';
    notesIcon.id = 'note-icon';
    notesIcon.addEventListener('click', () => {
        showTaskDetails(task, taskCard);
    });

    const deleteIcon = document.createElement('img');
    deleteIcon.src = deleteImg;
    deleteIcon.alt = 'Delete Logo';
    deleteIcon.className = 'icons';
    deleteIcon.addEventListener('click', () => {
        const taskIndex = projects.find(p => p.id === projectId).tasks.indexOf(task);
        deleteTask(projectId, taskIndex);
        taskCard.remove();
    });

    const taskInfo = document.createElement('div');
    taskInfo.classList.add('task-info');
    taskInfo.innerHTML = `
        <h3>${task.title}</h3>
        <p class="due-date">${task.dueDate}</p>
    `;

    taskCard.appendChild(circle);
    taskCard.appendChild(taskInfo);
    taskCard.appendChild(notesIcon);
    taskCard.appendChild(deleteIcon);

    projectElement.appendChild(taskCard);
}

function createCircle() {
    const circle = document.createElement('div');
    circle.className = 'circle';
    circle.onclick = function () {
        const taskCard = this.closest('.task-card');

        this.classList.toggle('checked');
        taskCard.classList.toggle('completed');

        const taskInfo = taskCard.querySelector('.task-info');
        taskInfo.classList.toggle('completed');
    };

    return circle;
}

function showTaskDetails(task, taskCard) {
    const dialogue = document.createElement('div');
    dialogue.classList.add('task-dialogue');

    dialogue.innerHTML = `
        <h4>${task.title}</h4>
        <p><strong>Description:</strong> ${task.description}</p>
        <p><strong>Due Date:</strong> ${task.dueDate}</p>
        <p><strong>Notes:</strong> ${task.notes}</p>
        <button class="close-dialogue">Close</button>
    `;

    taskCard.appendChild(dialogue);

    const closeButton = dialogue.querySelector('.close-dialogue');
    closeButton.addEventListener('click', () => {
        dialogue.remove();
    });

    document.addEventListener('click', function closeDialogue(e) {
        if (!dialogue.contains(e.target) && e.target !== notesIcon) {
            dialogue.remove();
            document.removeEventListener('click', closeDialogue);
        }
    });
}

function deleteProject(projectId) {
    projects = projects.filter(p => p.id !== projectId);
    saveProjectsToLocalStorage();
}

function deleteTask(projectId, taskIndex) {
    const project = projects.find(p => p.id === projectId);
    project.tasks.splice(taskIndex, 1);
    saveProjectsToLocalStorage();
}
