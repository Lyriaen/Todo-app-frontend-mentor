export {
    activeTabElement ,
    addTaskButton ,
    body ,
    changeThemeButton ,
    clearButton ,
    incompleteTaskCounterElement ,
    taskListContainerElement ,
    tabButtonsContainer ,
    changeActiveTabElement ,
    getAllTaskItems ,
};

let activeTabElement = document.querySelector( '.main__nav__button' ) as HTMLButtonElement;
const addTaskButton = document.querySelector( '.main__form-container__submit-button' ) as HTMLButtonElement;
const body = document.querySelector( 'body' ) as HTMLBodyElement;
const changeThemeButton = document.querySelector( '.header__theme-toggle' ) as HTMLButtonElement;
const clearButton = document.querySelector( '.main__nav__clear-button' ) as HTMLButtonElement;
const incompleteTaskCounterElement = document.querySelector( '.main__nav__incomplete-task-counter-container__counter' ) as HTMLElement;
const taskListContainerElement = document.querySelector( '.main__task-list' ) as HTMLUListElement;
const tabButtonsContainer = document.querySelector( '.main__nav__button-container' ) as HTMLElement;

const changeActiveTabElement = ( newActiveTabElement: HTMLButtonElement ) => {
    activeTabElement = newActiveTabElement;
};

const getAllTaskItems = () => {
    return document.querySelectorAll( '.main__task-list__item' );
};