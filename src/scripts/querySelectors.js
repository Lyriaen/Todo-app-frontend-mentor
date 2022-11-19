export {
    activeTabElement,
    addTaskButton,
    body,
    changeThemeButton,
    clearButton,
    incompleteTaskCounterElement,
    taskListContainerElement,
    tabButtonsContainer,
    changeActiveTabElement,
    getAllTaskItems,
};

let activeTabElement = document.querySelector( '.main__nav__button' );
const addTaskButton = document.querySelector( '.main__form-container__submit-button' );
const body = document.querySelector( 'body' );
const changeThemeButton = document.querySelector( '.header__theme-toggle' );
const clearButton = document.querySelector( '.main__nav__clear-button' );
const incompleteTaskCounterElement = document.querySelector( '.main__nav__incomplete-task-counter-container__counter' );
const taskListContainerElement = document.querySelector( '.main__task-list' );
const tabButtonsContainer = document.querySelector( '.main__nav__button-container' );

const changeActiveTabElement = ( newActiveTabElement ) => {
    activeTabElement = newActiveTabElement;
};

const getAllTaskItems = () => {
    return document.querySelectorAll( '.main__task-list__item' );
};