import { createTaskListElement } from '../dom.js';
import { IncompleteTaskCounter } from './classIncompleteTaskCounter.js';
import { Task } from './classTask.js';

export { TaskList };

class TaskList {
    constructor() {
        if ( this.checkIfTaskListExist() ) {
            const temp = JSON.parse( localStorage.getItem( 'taskList' ) );
            this.list = temp.map( task => new Task( task.completed , task.content ) );
            this.createTaskList();
        } else {
            this.list = [];
            this.saveTaskList();
        }
        this.incompleteTaskCounter = new IncompleteTaskCounter( this.list );
    }

    addTask = ( taskItem ) => {
        this.list.push( taskItem );
        if ( !taskItem.completed ) {
            this.incompleteTaskCounter.increase();
        }
        this.saveTaskList();
    };

    removeTask = ( event ) => {
        const indexOfItemToRemove = this.findIndexOfElement( event.target.parentElement.textContent );
        if ( !this.list[ indexOfItemToRemove ].completed ) {
            this.incompleteTaskCounter.decrease();
        }
        this.removeTaskOnIndexFromList( indexOfItemToRemove );
    };

    removeTaskOnIndexFromList = ( indexOfItemToRemove ) => {
        this.list.splice( indexOfItemToRemove , 1 );
        this.saveTaskList();
    };

    findIndexOfElement = ( taskContent ) => {
        return this.list.map( task => task.content ).indexOf( taskContent );
    };

    clearComplete = ( taskText ) => {
        const indexOfItemToRemove = this.findIndexOfElement( taskText );
        this.removeTaskOnIndexFromList( indexOfItemToRemove );
    };

    createTaskList = () => {
        this.list.map( ( taskItem , index ) => {
            createTaskListElement( taskItem , index );
        } );
    };

    checkIfTaskExist = ( taskText ) => {
        return this.findIndexOfElement( taskText ) !== -1;
    };

    checkIfTaskListExist = () => {
        return localStorage.getItem( 'taskList' ) !== null;
    };

    changeTaskStatus = ( taskElement ) => {
        const indexOfItemToChange = this.findIndexOfElement( taskElement.querySelector( '.main__task-list__item__task' ).textContent );
        const taskToChange = this.list[ indexOfItemToChange ];
        taskToChange.changeCompletedStatus();
        taskElement.querySelector( '.checkbox' ).checked ?
            this.incompleteTaskCounter.decrease() :
            this.incompleteTaskCounter.increase();
        this.saveTaskList();
    };

    saveTaskList = () => {
        localStorage.setItem( 'taskList' , JSON.stringify( this.list ) );
    };

    swapTasks = ( draggedElement , overElement ) => {
        const draggedElementIndex = this.findIndexOfElement( draggedElement );
        const overElementIndex = this.findIndexOfElement( overElement );
        const temp = this.list[ draggedElementIndex ];
        this.list[ draggedElementIndex ] = this.list[ overElementIndex ];
        this.list[ overElementIndex ] = temp;
        this.saveTaskList();
    };
}