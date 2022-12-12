import { Task } from './class/classTask.js';
import { taskList } from './data.js';
import { clearTaskListContainerElementAndCreateNew , createTaskListElement } from './dom.js';
import { handleDragEnd , handleDragOver , handleDragStart } from './dragAndDropFunctions.js';
import {
    activeTabElement ,
    addTaskButton ,
    body ,
    changeActiveTabElement ,
    changeThemeButton ,
    clearButton ,
    getAllTaskItems ,
    tabButtonsContainer ,
    taskListContainerElement ,
} from './querySelectors.js';

export { removeTaskItemContainerElement };

window.onload = () => {
    body.className = ( localStorage.getItem( 'theme' ) ) ||
        ( window.matchMedia( '(prefers-color-scheme: dark)' ).matches ?
            'dark-theme' :
            'light-theme' );
};

tabButtonsContainer.addEventListener( 'click' , ( event ) => {
    if ( event.target.tagName === 'BUTTON' && activeTabElement !== event.target ) {
        event.target.classList.toggle( 'main__nav__button--active' );
        activeTabElement.classList.toggle( 'main__nav__button--active' );
        changeActiveTabElement( event.target );
        clearTaskListContainerElementAndCreateNew( event.target.textContent );
    }
} );

changeThemeButton.addEventListener( 'click' , () => {
    body.classList.toggle( 'light-theme' );
    body.classList.toggle( 'dark-theme' );
    const newTheme = localStorage.getItem( 'theme' ) === 'light-theme' ? 'dark-theme' : 'light-theme';
    localStorage.setItem( 'theme' , newTheme );
} );

addTaskButton.addEventListener( 'click' , ( event ) => {
    event.preventDefault();
    const newItemForm = document.forms.newItemForm;
    if ( newItemForm.task.value === '' ) {
        alert( 'Task is empty' );
        return;
    }
    const taskItem = new Task( newItemForm.checkbox.checked , newItemForm.task.value.trim() );
    if ( !taskList.checkIfTaskExist( taskItem.content ) ) {
        createTaskListElement( taskItem );
        taskList.addTask( taskItem );
        clearForm();
        return;
    }
    alert( 'This task already exist in the list' );
} );

const removeTaskItemContainerElement = ( event ) => {
    if ( event.target.tagName === 'BUTTON' ) {
        const liElement = event.target.parentElement.parentElement;
        const ulElement = event.target.parentElement.parentElement.parentElement;
        ulElement.addEventListener( 'transitionend' , () => {
            ulElement.removeChild( liElement );
        } , { once: true } );
        liElement.classList.remove( 'show' );
        taskList.removeTask( event );
    }
};

taskListContainerElement.addEventListener( 'click' , ( event ) => {
    changeStateOfTaskElement( event );
    removeTaskItemContainerElement( event );
} );

taskListContainerElement.addEventListener( 'change' , ( event ) => {
    if ( ( event.target.tagName === 'INPUT' ) )
        taskList.changeTaskStatus( event.target.parentElement );
} );

const addEventListenersForDragAndDrop = () => {
    taskListContainerElement.addEventListener( 'dragstart' , handleDragStart );
    taskListContainerElement.addEventListener( 'dragover' , handleDragOver );
    taskListContainerElement.addEventListener( 'dragend' , handleDragEnd );
};

addEventListenersForDragAndDrop();

clearButton.addEventListener( 'click' , () => {
    const taskItems = getAllTaskItems();
    let taskListContainerElementChildrenArray = [ ...taskItems ];
    taskListContainerElementChildrenArray.reverse().map( task => {
        if ( task.firstChild.checked === true ) {
            task.parentElement.addEventListener( 'transitionend' , ( event ) => {
                if ( event.propertyName === 'opacity' ) {
                    event.stopPropagation();
                    taskListContainerElement.removeChild( task.parentElement );
                    taskList.clearComplete( task.children[ 1 ].innerText );
                }
            } );
            task.parentElement.classList.remove( 'show' );
        }
    } );
} );

const changeStateOfTaskElement = ( event ) => {
    if ( event.target.tagName === 'P' ) {
        const checkbox = event.target.parentElement.querySelector( '.checkbox' );
        checkbox.checked = !checkbox.checked;
        taskList.changeTaskStatus( event.target.parentElement );
    }
};

const clearForm = () => {
    newItemForm.task.value = '';
    newItemForm.checkbox.checked = false;
};

window.onbeforeunload = () => {
    taskList.saveTaskList();
};