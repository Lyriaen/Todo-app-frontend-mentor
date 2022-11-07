import { addEventListenersOnListElement } from "./event-listeners.js";
import { taskListContainerElement, incompleteTaskCounterElement } from './querySelectors.js';
import { taskList } from "./data.js";

export { createTaskListElement, clearTaskListContainerElementAndCreateNew, removeTaskItemElement, refreshIncompleteTaskCounterElement };

/* CreateTaskListElement create <li> element in <ul> list like:
<li class='main__task-list__item'>
    <input class='checkbox main__task-list__item__checkbox' type='checkbox'>
    <p class='main__task-list__item__task'>Task to do</p>
    <button class='button main__task-list__item__remove-button'></button>
</li> 
*/

const clearTaskListContainerElementAndCreateNew = (activeTab) => {
    const elementArray = [...taskListContainerElement.children]
    if (elementArray.length === 0) {
        createActiveTab(activeTab)
        return
    }
    taskListContainerElement.addEventListener('transitionend', () => {
        taskListContainerElement.replaceChildren();
        createActiveTab(activeTab)
    }, { once: true })
    elementArray.forEach((element) => { element.classList.remove('show') })
}

const createActiveTab = (activeTab) => {
    if (activeTab === 'All') {
        taskList.createTaskList();
        return;
    }
    if (activeTab === 'Completed') {
        taskList.list.filter(task => task.completed === true).map(task => createTaskListElement(task));
        return;
    }
    if (activeTab === 'Active') {
        taskList.list.filter(task => task.completed === false).map(task => createTaskListElement(task));
    }
}

const createTaskListElement = (taskItem, index) => {
    const liElement = document.createElement('li')
    setTimeout(function () {
        liElement.classList.add('show');
    }, 10);
    const taskItemContainerElement = document.createElement('div');
    taskItemContainerElement.classList.add('main__task-list__item');
    taskItemContainerElement.setAttribute('draggable', true);
    taskItemContainerElement.setAttribute('id', 'task-' + index);
    addEventListenersOnListElement(taskItemContainerElement);
    liElement.appendChild(taskItemContainerElement);
    taskListContainerElement.appendChild(liElement);
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

const removeTaskItemElement = (event, index) => {
    event.stopPropagation()
    console.log(index)
    // console.log(taskListContainerElement.children[index])
    // console.log(taskListContainerElement.children[index])
    taskListContainerElement.removeChild(taskListContainerElement.children[index]);
}