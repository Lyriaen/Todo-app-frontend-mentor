import { taskList } from "./data.js";
import { removeTaskItemContainerElement } from "./event-listeners.js";

export { createTaskListElement }

const taskListContainerElement = document.querySelector('.main__task-list');

const createTaskListElement = (taskItem) => {

    const taskItemContainerElement = document.createElement('li');
    taskItemContainerElement.classList.add('main__task-list__item');
    taskItemContainerElement.addEventListener('click', removeTaskItemContainerElement);

    taskListContainerElement.appendChild(taskItemContainerElement);
    taskItemContainerElement.appendChild(createCheckboxElement(taskItem.completed));
    taskItemContainerElement.appendChild(createParagraphElement(taskItem.task));
    taskItemContainerElement.appendChild(createDeleteElement());
}

const createCheckboxElement = (completed) => {
    const checkboxElement = document.createElement('input');
    checkboxElement.type = 'checkbox';
    if (completed) {
        checkboxElement.setAttribute('checked', true);
    };
    checkboxElement.classList.add('checkbox', 'main__task-list__item__checkbox');
    return checkboxElement;
}

const createParagraphElement = (content) => {
    const taskContentElement = document.createElement('p');
    taskContentElement.classList.add('main__task-list__item__task');
    taskContentElement.textContent = content;
    return taskContentElement;
}

const createDeleteElement = () => {
    const deleteElement = document.createElement('button');
    deleteElement.classList.add('button', 'main__task-list__item__remove-button');
    return deleteElement;
}
