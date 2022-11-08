import { taskList } from "./data.js";
import { Task } from "./class/classTask.js";
import { createTaskListElement, clearTaskListContainerElementAndCreateNew, removeTaskItemElement } from "./dom.js";
import { body, addTaskButton, clearButton, TabElements, changeThemeButton, activeTabElement, changeActiveTabElement, taskListContainerElement } from "./querySelectors.js";
import { handleDragEnd, handleDragOver, handleDragStart } from "./dragAndDropFunctions.js";

export { removeTaskItemContainerElement, addEventListenersOnListElement, removeTaskItemElement };

window.onload = () => {
    const theme = localStorage.getItem('theme') ?
        localStorage.getItem('theme') :
        window.matchMedia('(prefers-color-scheme: dark)').matches ?
            'dark-theme' :
            'light-theme'
    body.className = theme;
}

TabElements.forEach(tab => tab.addEventListener('click', (event) => {
    if (activeTabElement === event.target) {
        return;
    }
    event.target.classList.toggle('main__nav__button--active');
    activeTabElement.classList.toggle('main__nav__button--active');
    changeActiveTabElement(event.target);
    clearTaskListContainerElementAndCreateNew(event.target.textContent);
    // if (event.target.textContent === 'All') {
    //     taskList.createTaskList();
    //     return;
    // }
    // if (event.target.textContent === 'Completed') {
    //     taskList.list.filter(task => task.completed === true).map(task => createTaskListElement(task));
    //     return;
    // }
    // if (event.target.textContent === 'Active') {
    //     taskList.list.filter(task => task.completed === false).map(task => createTaskListElement(task));
    // }
}))

changeThemeButton.addEventListener('click', () => {
    body.classList.toggle("light-theme");
    body.classList.toggle("dark-theme");
    const oldTheme = localStorage.getItem('theme');
    const newTheme = localStorage.getItem('theme') === 'light-theme' ? 'dark-theme' : 'light-theme';
    localStorage.setItem('theme', newTheme);
})

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

const addEventListenersOnListElement = (taskItemContainerElement, parentEl) => {
    taskItemContainerElement.addEventListener('change', (event) => {
        taskList.changeTaskStatus(event);
    })
    taskItemContainerElement.addEventListener('click', (event) => {
        removeTaskItemContainerElement(event);
        changeStateOfTaskElement(event);
    })
    addEventListenerForDragAndDrop(taskItemContainerElement);
}

clearButton.addEventListener('click', () => {
    const taskItems = document.querySelectorAll('.main__task-list__item')
    let taskListContainerElementChildrenArray = [...taskItems];
    const taskListChildrenArrayLength = taskListContainerElementChildrenArray.length;
    taskListContainerElementChildrenArray.reverse().map((task, index) => {
        // console.log(task)
        if (task.firstChild.checked === true) {
            task.parentElement.addEventListener('transitionend', (event) => {
                if (event.propertyName === 'opacity') {
                    // console.log(taskListChildrenArrayLength)
                    removeTaskItemElement(event, index)

                }
            })
            task.parentElement.classList.remove('show')
            // removeTaskItemElement(taskListChildrenArrayLength - index - 1);
            taskList.clearComplete(task.children[1].innerText);
        }
    });
})

const removeTaskItemContainerElement = (event) => {
    if ((event.target.tagName === 'BUTTON')) {
        const liElement = event.currentTarget.parentElement
        const ulElement = event.currentTarget.parentElement.parentElement
        ulElement.addEventListener('transitionend', () => {
            ulElement.removeChild(liElement);
        }, { once: true })
        liElement.classList.remove('show')
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

const addEventListenerForDragAndDrop = (taskItemContainerElement) => {
    const liElement = taskItemContainerElement.parentElement
    liElement.addEventListener('dragstart', handleDragStart)
    liElement.addEventListener('dragover', handleDragOver)
    liElement.addEventListener('dragend', handleDragEnd)
}

window.onbeforeunload = () => {
    taskList.saveTaskList();
}