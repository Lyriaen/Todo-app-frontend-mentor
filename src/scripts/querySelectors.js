export { taskListContainerElement, incompleteTaskCounterElement, addTaskButton, clearButton, TabElements, activeTabElement, changeActiveTabElement };

const taskListContainerElement = document.querySelector('.main__task-list');
const incompleteTaskCounterElement = document.querySelector('.main__nav__incomplete-task-counter-container');
const addTaskButton = document.querySelector('.main__form-contanier__submit-button');
const clearButton = document.querySelector('.main__nav__clear-button');
const TabElements = document.querySelectorAll('.main__nav__button');
let activeTabElement = document.querySelector('.main__nav__button');
const changeActiveTabElement = (newActiveTabElement) => {
    activeTabElement = newActiveTabElement;
};