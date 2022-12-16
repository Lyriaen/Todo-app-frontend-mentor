import { taskList } from './data.js';
import { incompleteTaskCounterElement , taskListContainerElement } from './querySelectors.js';
import { Task } from "./class/classTask";

export { createTaskListElement , clearTaskListContainerElementAndCreateNew , refreshIncompleteTaskCounterElement };

const clearTaskListContainerElementAndCreateNew = ( activeTab: string ) => {
    const elementArray = [ ...taskListContainerElement.children ];
    if ( elementArray.length !== 0 ) {
        taskListContainerElement.addEventListener( 'transitionend' , () => {
            taskListContainerElement.replaceChildren();
            createActiveTabTaskList( activeTab );
        } , { once: true } );
        elementArray.forEach( ( element ) => {
            element.classList.remove( 'show' );
        } );
    } else {
        createActiveTabTaskList( activeTab );
    }
};

const createActiveTabTaskList = ( activeTab: string ) => {
    const activeTabTaskList = {
        All: () => taskList.createTaskList() ,
        Completed: () => taskList.list
            .filter( task => task.completed )
            .map( task => createTaskListElement( task ) ) ,
        Active: () => taskList.list
            .filter( task => !task.completed )
            .map( task => createTaskListElement( task ) ) ,
    };
    activeTabTaskList[ activeTab as keyof typeof activeTabTaskList ]();
};

const createTaskListElement = ( taskItem: Task ) => {
    const liElement = document.createElement( 'li' );
    liElement.setAttribute( 'draggable' , 'true' );
    const taskItemContainerElement = document.createElement( 'div' );
    taskItemContainerElement.classList.add( 'main__task-list__item' );
    liElement.appendChild( taskItemContainerElement );
    taskListContainerElement.appendChild( liElement );
    taskItemContainerElement.appendChild( createCheckboxElement( taskItem.completed ) );
    taskItemContainerElement.appendChild( createParagraphElement( taskItem.content ) );
    taskItemContainerElement.appendChild( createDeleteElement() );
    setTimeout( function () {
        liElement.classList.add( 'show' );
    } , 10 );
};

const createCheckboxElement = ( completed: boolean ) => {
    const checkboxElement = document.createElement( 'input' );
    checkboxElement.type = 'checkbox';
    if ( completed ) {
        checkboxElement.setAttribute( 'checked' , 'true' );
    }
    checkboxElement.classList.add( 'checkbox' , 'main__task-list__item__checkbox' );
    return checkboxElement;
};

const createParagraphElement = ( content: string ) => {
    const taskContentElement = document.createElement( 'p' );
    taskContentElement.classList.add( 'main__task-list__item__task' );
    taskContentElement.textContent = content;
    return taskContentElement;
};

const createDeleteElement = () => {
    const deleteElement = document.createElement( 'button' );
    deleteElement.classList.add( 'button' , 'main__task-list__item__remove-button' );
    return deleteElement;
};

const refreshIncompleteTaskCounterElement = ( count: number ) => {
    incompleteTaskCounterElement.addEventListener( 'transitionend' , () => {
        incompleteTaskCounterElement.textContent = `${ count }`;
        incompleteTaskCounterElement.classList.remove( 'change-counter' );
    } , { once: true } );
    incompleteTaskCounterElement.classList.add( 'change-counter' );
};