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
    body.className = (localStorage.getItem( 'theme' )) ||
        (window.matchMedia( '(prefers-color-scheme: dark)' ).matches ?
            'dark-theme' :
            'light-theme');
};

tabButtonsContainer.addEventListener( 'click' , ( event: MouseEvent ) => {
    const element = event.target as HTMLButtonElement
    if ( element.tagName === 'BUTTON' && activeTabElement !== event.target ) {
        element.classList.toggle( 'main__nav__button--active' );
        activeTabElement.classList.toggle( 'main__nav__button--active' );
        console.log( element.textContent )
        changeActiveTabElement( element );
        clearTaskListContainerElementAndCreateNew( element.textContent as string );
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
    const newItemForm = document.forms[ 0 ];
    if ( newItemForm.task.value === '' ) {
        alert( 'Task is empty' );
        return;
    }
    const taskItem = new Task( newItemForm.checkbox.checked , newItemForm.task.value.trim() );
    if ( taskList.checkIfTaskExist( taskItem.content ) ) {
        alert( 'This task already exist in the list' );
        return;
    }
    createTaskListElement( taskItem );
    taskList.addTask( taskItem );
    clearForm();
} );

const removeTaskItemContainerElement = ( event: Event ) => {
    const element = event.target as HTMLElement;
    if ( element.tagName === 'BUTTON' ) {
        const liElement = element.parentElement?.parentElement as HTMLLIElement;
        const ulElement = liElement.parentElement as HTMLUListElement;
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
    const element = event.target as HTMLElement
    if ( (element.tagName === 'INPUT') && element.parentElement )
        taskList.changeTaskStatus( element.parentElement );
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
        if ( (task.firstChild as HTMLInputElement).checked ) {
            task.parentElement?.addEventListener( 'transitionend' , ( event ) => {
                if ( event.propertyName === 'opacity' && task.parentElement ) {
                    event.stopPropagation();
                    taskListContainerElement.removeChild( task.parentElement );
                    taskList.clearComplete( task.children[ 1 ].textContent as string );
                }
            } );
            task.parentElement?.classList.remove( 'show' );
        }
    } );
} );

const changeStateOfTaskElement = ( event: Event ) => {
    const element = event.target as HTMLElement
    if ( element.tagName === 'P' && element.parentElement ) {
        const checkbox = element.parentElement.querySelector( '.checkbox' ) as HTMLInputElement;
        checkbox.checked = !checkbox.checked;
        taskList.changeTaskStatus( element.parentElement );
    }
};

const clearForm = () => {
    document.forms[ 0 ].task.value = '';
    document.forms[ 0 ].checkbox.checked = false;
};

window.onbeforeunload = () => {
    taskList.saveTaskList();
};