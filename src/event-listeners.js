import { taskList } from "./data.js";
import { Task } from "./class/classTask.js";
import { createTaskListElement, clearTaskListContainerElement, removeTaskItemElement } from "./dom.js";
import { addTaskButton, clearButton, TabElements, activeTabElement, changeActiveTabElement, taskListContainerElement } from "./querySelectors.js";

export { removeTaskItemContainerElement, addEventListenersOnListElement, removeTaskItemElement };

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
    const taskListContainerElementChildrenArray = [...taskListContainerElement.children]
    const taskListChildrenArrayLength = taskListContainerElementChildrenArray.length
    taskListContainerElementChildrenArray.reverse().map((task, index) => {
        if (task.firstChild.checked === true) {
            removeTaskItemElement(taskListChildrenArrayLength - index - 1)
            taskList.clearComplete(task.children[1].innerText)
        }
    })
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

window.onbeforeunload = () => {
    taskList.saveTaskList();
}