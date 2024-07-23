import './style.css';
import logo from './images/calendar-todo-fill.svg';
import add from './images/add.svg';
import createProject from './logic.js';


const img = document.createElement('img');
img.src = logo;
img.alt = 'Todo List Logo';
img.className = 'logo';

const plus = document.createElement('img');
plus.src = add;
plus.className = 'plus-sign';

document.querySelector('.header').appendChild(img);
document.querySelector('.create-project').appendChild(plus);

createProject("Project 2")
createProject("Project 2")
createProject("Project 2")