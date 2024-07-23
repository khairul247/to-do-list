import './style.css';
import logo from './images/calendar-todo-fill.svg';


const img = document.createElement('img');
img.src = logo;
img.alt = 'Todo List Logo';
img.className = 'logo';

document.querySelector('.header').appendChild(img);
