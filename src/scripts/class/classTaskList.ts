import { createTaskListElement } from '../dom.js';
import { IncompleteTaskCounter } from './classIncompleteTaskCounter.js';
import { Task } from './classTask.js';

export { TaskList };

class TaskList {
    public list: Task[];
    public incompleteTaskCounter: IncompleteTaskCounter;

    constructor() {
        if ( this.checkIfTaskListExist() ) {
            const temp = JSON.parse( localStorage.getItem( 'taskList' ) as string );
            this.list = temp.map( ( task: Task ) => new Task( task.completed , task.content ) );
            this.createTaskList();
        } else {
            this.list = [];
            this.saveTaskList();
        }
        this.incompleteTaskCounter = new IncompleteTaskCounter( this.list );
    }

    addTask = ( taskItem: Task ) => {
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

    removeTaskOnIndexFromList = ( indexOfItemToRemove: number ) => {
        this.list.splice( indexOfItemToRemove , 1 );
        this.saveTaskList();
    };

    findIndexOfElement = ( taskContent: string ) => {
        return this.list.map( task => task.content ).indexOf( taskContent );
    };

    clearComplete = ( taskText: string ) => {
        const indexOfItemToRemove = this.findIndexOfElement( taskText );
        this.removeTaskOnIndexFromList( indexOfItemToRemove );
    };

    public createTaskList = () => {
        this.list.map( ( taskItem: Task ) => {
            createTaskListElement( taskItem );
        } );
    };

    private checkIfTaskExist = ( taskText: string ) => {
        return this.findIndexOfElement( taskText ) !== -1;
    };

    private checkIfTaskListExist = () => {
        return localStorage.getItem( 'taskList' ) !== null;
    };

    changeTaskStatus = ( taskElement: HTMLElement ) => {
        const taskTextContainer = taskElement.querySelector( '.main__task-list__item__task' ) as HTMLElement;
        const indexOfItemToChange = this.findIndexOfElement( taskTextContainer.textContent as string );
        const taskToChange = this.list[ indexOfItemToChange ];
        taskToChange.changeCompletedStatus();
        const taskCheckbox = taskElement.querySelector( '.checkbox' ) as HTMLInputElement;
        taskCheckbox.checked ?
            this.incompleteTaskCounter.decrease() :
            this.incompleteTaskCounter.increase();
        this.saveTaskList();
    };

    public saveTaskList = () => {
        localStorage.setItem( 'taskList' , JSON.stringify( this.list ) );
    };

    public swapTasks = ( draggedElement: string , overElement: string ) => {
        const draggedElementIndex = this.findIndexOfElement( draggedElement );
        const overElementIndex = this.findIndexOfElement( overElement );
        const temp = this.list[ draggedElementIndex ];
        this.list[ draggedElementIndex ] = this.list[ overElementIndex ];
        this.list[ overElementIndex ] = temp;
        this.saveTaskList();
    };
}