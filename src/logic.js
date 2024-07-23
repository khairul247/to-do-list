
const projectStorage = {};
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
export default function createProject(projectTitle) {
    projectCounter++;
    const projectName = `project${projectCounter}`;
    const project = new Project(projectTitle);
    
    console.log(project)
    // Add the project to the projects array
    projects.push(project);

    console.log(projects)
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

//assign to Project
Project.prototype.addTask = addTask;
Project.prototype.deleteTask =deleteTask;
Project.prototype.logProjectDetails = logProjectDetails;

const project2 = new Project("Mobile App");

// Initialize the four tasks separately
const task1 = new Task("App Wireframing", "Design basic app structure", "2024-07-25", "Use Adobe XD");
const task2 = new Task("UI Design", "Create app interface", "2024-08-10", "Follow material design guidelines");
const task3 = new Task("Frontend Development", "Implement using React Native", "2024-09-01", "Ensure cross-platform compatibility");
const task4 = new Task("Backend Integration", "Connect to REST API", "2024-09-20", "Implement offline support");
