import { taskList } from './data.js';
import { incompleteTaskCounterElement , taskListContainerElement } from './querySelectors.js';

export { createTaskListElement , clearTaskListContainerElementAndCreateNew , refreshIncompleteTaskCounterElement };

const clearTaskListContainerElementAndCreateNew = ( activeTab ) => {
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

const createActiveTabTaskList = ( activeTab ) => {
    const activeTabTaskList = {
        All: () => taskList.createTaskList() ,
        Completed: () => taskList.list
                                 .filter( task => task.completed === true )
                                 .map( task => createTaskListElement( task ) ) ,
        Active: () => taskList.list
                              .filter( task => task.completed === false )
                              .map( task => createTaskListElement( task ) ) ,
    };
    activeTabTaskList[ activeTab ]();
};

const createTaskListElement = ( taskItem ) => {
    const liElement = document.createElement( 'li' );
    liElement.setAttribute( 'draggable' , 'true' );
    const taskItemContainerElement = document.createElement( 'div' );
    taskItemContainerElement.classList.add( 'main__task-list__item' );
    // taskItemContainerElement.setAttribute( 'id', 'task-' + index );
    liElement.appendChild( taskItemContainerElement );
    taskListContainerElement.appendChild( liElement );
    taskItemContainerElement.appendChild( createCheckboxElement( taskItem.completed ) );
    taskItemContainerElement.appendChild( createParagraphElement( taskItem.content ) );
    taskItemContainerElement.appendChild( createDeleteElement() );
    setTimeout( function () {
        liElement.classList.add( 'show' );
    } , 10 );
};

const createCheckboxElement = ( completed ) => {
    const checkboxElement = document.createElement( 'input' );
    checkboxElement.type = 'checkbox';
    if ( completed ) {
        checkboxElement.setAttribute( 'checked' , 'true' );
    }
    checkboxElement.classList.add( 'checkbox' , 'main__task-list__item__checkbox' );
    return checkboxElement;
};

const createParagraphElement = ( content ) => {
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

const refreshIncompleteTaskCounterElement = ( count ) => {
    incompleteTaskCounterElement.addEventListener( 'transitionend' , () => {
        incompleteTaskCounterElement.textContent = `${ count }`;
        incompleteTaskCounterElement.classList.remove( 'change-counter' );
    } , { once: true } );
    incompleteTaskCounterElement.classList.add( 'change-counter' );
};