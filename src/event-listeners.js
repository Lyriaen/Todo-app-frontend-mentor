import { taskList } from "./data.js";
import { Task } from './class/classTask.js';
import { createTaskListElement } from './dom.js';
import { addTaskButton, clearButton } from './querySelectors.js';

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

const removeTaskItemElement = (index) => {
    taskListContainerElement.removeChild(taskListContainerElement.children[index]);
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