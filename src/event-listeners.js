import { taskList } from "./data.js";
import { Task } from './class/classTask.js';
import { createTaskListElement, clearTaskListContainerElement, removeTaskItemElement } from './dom.js';
import { addTaskButton, clearButton, TabElements, activeTabElement, changeActiveTabElement } from './querySelectors.js';

TabElements.forEach(tab => tab.addEventListener('click', (event) => {
    if (activeTabElement === event.target) {
        return;
    }
    event.target.classList.toggle('main__nav__button--active');
    activeTabElement.classList.toggle('main__nav__button--active');
    changeActiveTabElement(event.target);
    clearTaskListContainerElement();
    if (event.target.textContent === 'All') {
        taskList.createTaskList();
        return;
    }
    if (event.target.textContent === 'Completed') {
        taskList.list.filter(task => task.completed === true).map(task => createTaskListElement(task));
        return;
    }
    if (event.target.textContent === 'Active') {
        taskList.list.filter(task => task.completed === false).map(task => createTaskListElement(task));
    }
}))

const check = (value) => {
    return value.completed === true;
}



export { removeTaskItemContainerElement, addEventListenersOnListElement, removeTaskItemElement };

addTaskButton.addEventListener('click', (event) => {
    event.preventDefault();
    const newItemForm = document.forms.newItemForm;
    if (newItemForm.task.value === '') {
        alert('Task is empty');
        return;
    }
    const taskItem = new Task(newItemForm.checkbox.checked, newItemForm.task.value);
    createTaskListElement(taskItem);
    taskList.addTask(taskItem);
    clearForm();
})

const addEventListenersOnListElement = (taskItemContainerElement) => {
    taskItemContainerElement.addEventListener('change', (event) => {
        taskList.changeTaskStatus(event);
    })
    taskItemContainerElement.addEventListener('click', (event) => {
        removeTaskItemContainerElement(event);
        changeStateOfTaskElement(event);
    })
}

clearButton.addEventListener('click', () => {
    taskList.clearComplete();
})

const removeTaskItemContainerElement = (event) => {
    if ((event.target.tagName === 'BUTTON')) {
        event.currentTarget.parentElement.removeChild(event.currentTarget);
        taskList.removeTask(event);
    }
}

const changeStateOfTaskElement = (event) => {
    if ((event.target.tagName === 'P')) {
        event.currentTarget.querySelector('.checkbox').checked = (event.currentTarget.querySelector('.checkbox').checked) ? false : true;
        taskList.changeTaskStatus(event);
    }
}

const clearForm = () => {
    newItemForm.task.value = '';
    newItemForm.checkbox.checked = false;
}

// window.onbeforeunload = () => {
//     saveTaskList();
// }