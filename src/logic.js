import deleteImg from './images/delete.svg';
import notesImg from './images/notes.svg';

let projects = [];

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
    addProjectToList(project);

}

function addProjectToList (project) {

    const projCard = document.createElement('div');
    projCard.className ='project';
    projCard.id = `project-${project.id}`;

    const projectHeader = document.createElement('div');
    projectHeader.classList.add("project-header");
    projectHeader.textContent = project.title;

    const BtnBox = document.createElement('div');
    BtnBox.className = 'buttons-box'

    const addTaskBtn = document.createElement('button');
    addTaskBtn.classList.add('add-task-btn');
    addTaskBtn.textContent =  "Add New Task";

    addTaskBtn.addEventListener('click', function () {
        showTaskForm(project.id);
    });

    const deleteIcon = document.createElement('img');
    deleteIcon.src = deleteImg;
    deleteIcon.alt = 'Delete Logo';
    deleteIcon.className = 'icons';

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


function createTask(projectId,title, description, dueDate, notes) {

    const task = new Task(title, description, dueDate, notes);
    const project = projects.find(p => p.id === projectId);
    project.tasks.push(task)

    const taskCard = document.createElement('div');
    taskCard.classList.add('task-card')

    const circle = createCircle();

    const notesIcon = document.createElement('img');
    notesIcon.src = notesImg;
    notesIcon.className = 'icons';
    notesIcon.id = 'note-icon';
    notesIcon.addEventListener('click', () => {
        showTaskDetails(task,taskCard);
    })


    const deleteIcon = document.createElement('img');
    deleteIcon.src = deleteImg;
    deleteIcon.alt = 'Delete Logo';
    deleteIcon.className = 'icons';
    deleteIcon.addEventListener('click', () => {
        taskCard.remove();
    })

    const taskInfo = document.createElement('div');
    taskInfo.classList.add('task-info')
    taskInfo.innerHTML = `
    <h3>${task.title}</h3>
    <p class = "due-date" >${task.dueDate}</p>
    `;

    taskCard.appendChild(circle);
    taskCard.appendChild(taskInfo);
    taskCard.appendChild(notesIcon);
    taskCard.appendChild(deleteIcon);
  

    const projectElement =document.getElementById(`project-${projectId}`);
    projectElement.appendChild(taskCard);
}


function createCircle() {
    const circle = document.createElement('div');
    circle.className = 'circle';
    circle.onclick = function() {
        const taskCard = this.closest('.task-card');
        
        this.classList.toggle('checked');
        taskCard.classList.toggle('completed');
        
        const taskInfo = taskCard.querySelector('.task-info');
        taskInfo.classList.toggle('completed');
    };

    return circle;
}

function showTaskDetails(task, taskCard) {

    // Create dialogue container
    const dialogue = document.createElement('div');
    dialogue.classList.add('task-dialogue');

    // Create dialogue content
    dialogue.innerHTML = `
        <h4>${task.title}</h4>
        <p><strong>Description:</strong> ${task.description}</p>
        <p><strong>Due Date:</strong> ${task.dueDate}</p>
        <p><strong>Notes:</strong> ${task.notes}</p>
        <button class="close-dialogue">Close</button>
    `;

    // Append dialogue to task card
    taskCard.appendChild(dialogue);

    // Add event listener to close button
    const closeButton = dialogue.querySelector('.close-dialogue');
    closeButton.addEventListener('click', () => {
        dialogue.remove();
    });

    // Close dialogue when clicking outside of it
    document.addEventListener('click', function closeDialogue(e) {
        if (!dialogue.contains(e.target) && e.target !== notesIcon) {
            dialogue.remove();
            document.removeEventListener('click', closeDialogue);
        }
    });
}