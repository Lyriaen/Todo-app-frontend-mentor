import { addEventListenersOnListElement } from "./event-listeners.js";
import { taskListContainerElement, incompleteTaskCounterElement } from './querySelectors.js';

export { createTaskListElement, clearTaskListContainerElement, removeTaskItemElement, refreshIncompleteTaskCounterElement };

/* CreateTaskListElement create <li> element in <ul> list like:
<li class='main__task-list__item'>
    <input class='checkbox main__task-list__item__checkbox' type='checkbox'>
    <p class='main__task-list__item__task'>Task to do</p>
    <button class='button main__task-list__item__remove-button'></button>
</li> 
*/

const clearTaskListContainerElement = () => {
    taskListContainerElement.replaceChildren();
}

const createTaskListElement = (taskItem) => {
    const taskItemContainerElement = document.createElement('li');
    taskItemContainerElement.classList.add('main__task-list__item');
    addEventListenersOnListElement(taskItemContainerElement);
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

const refreshIncompleteTaskCounterElement = (count) => {
    incompleteTaskCounterElement.textContent = `${count} items left`;
}

const removeTaskItemElement = (index) => {
    taskListContainerElement.removeChild(taskListContainerElement.children[index]);
}