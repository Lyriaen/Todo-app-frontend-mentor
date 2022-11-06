export { body, taskListContainerElement, taskItems, incompleteTaskCounterElement, addTaskButton, clearButton, TabElements, changeThemeButton, activeTabElement, changeActiveTabElement };

const body = document.querySelector('body');
const taskListContainerElement = document.querySelector('.main__task-list');
const taskItems = document.querySelectorAll('.main__task-list__item')
const incompleteTaskCounterElement = document.querySelector('.main__nav__incomplete-task-counter-container');
const addTaskButton = document.querySelector('.main__form-contanier__submit-button');
const clearButton = document.querySelector('.main__nav__clear-button');
const TabElements = document.querySelectorAll('.main__nav__button');
let activeTabElement = document.querySelector('.main__nav__button');
const changeActiveTabElement = (newActiveTabElement) => {
    activeTabElement = newActiveTabElement;
};
const changeThemeButton = document.querySelector('.header__theme-toggle');