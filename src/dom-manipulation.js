import { taskList, itemsLeftCount, changeCounterContainer } from "./loadDate.js";
import { saveTaskList } from "../index.js";
export { createLiElement }

const createLiElement = (taskItem) => {

    const taskItemContainerElement = document.createElement('li');
    taskItemContainerElement.classList.add('main__task-list__item');
    taskItemContainerElement.addEventListener('click', removeTaskItemContainerElement);

    taskListContainerElement.appendChild(taskItemContainerElement);
    taskItemContainerElement.appendChild(createCheckboxElement(taskItem.completed));
    taskItemContainerElement.appendChild(createParagraphElement(taskItem.task));
    taskItemContainerElement.appendChild(createDeleteElement());
}

const taskListContainerElement = document.querySelector('.main__task-list');

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

const findElement = (event) => {
    return taskList.indexOf(taskList.find(element => element.task === event.currentTarget.querySelector('.main__task-list__item__task').textContent))
}

const removeTaskItemContainerElement = (event) => {
    if ((event.target.tagName === 'P')) {
        event.currentTarget.querySelector('.checkbox').checked = (event.currentTarget.querySelector('.checkbox').checked) ? false : true;
        const itemToChange = findElement(event);
        taskList[itemToChange].completed = event.currentTarget.querySelector('.checkbox').checked;
        saveTaskList();

        return;
    }
    // taskList.splice(taskList.indexOf(taskList.find((element) =>{
    //     return element.task === event.currentTarget.
    // })),1)
    //console.log(event.currentTarget.querySelector('.main__task-list__item__task').textContent)
    if ((event.target.tagName === 'BUTTON')) {
        event.currentTarget.parentElement.removeChild(event.currentTarget);
        const itemToRemove = findElement(event);
        taskList.splice(itemToRemove, 1);

        saveTaskList();
    }
}

// window.onbeforeunload = () => {
//     saveTaskList();
// }