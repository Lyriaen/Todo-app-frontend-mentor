import { IncompleteTaskCounter } from './classIncompleteTaskCounter.js';
import { createTaskListElement, removeTaskItemElement } from '../dom.js';

export { TaskList };

class TaskList {
    constructor() {
        if (!this.checkIfTaskListExist()) {
            localStorage.setItem('taskList', '[]');
        };
        this.list = JSON.parse(localStorage.getItem('taskList'));
        this.createTaskListElement();
        this.incompleteTaskCounter = new IncompleteTaskCounter(this.list);
    }

    addTask = (taskItem) => {
        this.list.push(taskItem);
        if (!taskItem.completed) {
            this.incompleteTaskCounter.increase();
        }
        this.saveTaskList();
    }

    removeTask = (event) => {
        const indexOfItemToRemove = this.findTask(event);
        if (!this.list[indexOfItemToRemove].completed) {
            this.incompleteTaskCounter.decrease();
        }
        this.list.splice(indexOfItemToRemove, 1);
        this.saveTaskList();
    }

    clearComplete = () => {
        const helperList = this.list.map(task => task);
        //reverse array due to remove completed task starting from end.
        //thanks to this we dont change index of incomplete elements 
        //during removing tasks from original task list
        helperList.reverse().map((task, index) => {
            if (task.completed) {
                this.list.splice(helperList.length - 1 - index, 1);
                removeTaskItemElement(helperList.length - 1 - index);
            }
        })
        console.log(this.list);
        this.saveTaskList();
    }

    createTaskListElement = () => {
        this.list.map((taskItem) => {
            createTaskListElement(taskItem);
        })
    }

    checkIfTaskListExist = () => {
        return localStorage.getItem('taskList') === null ? false : true;
    }

    changeTaskStatus = (event) => {
        const indexOfItemToChange = this.findTask(event);
        this.list[indexOfItemToChange].completed = event.currentTarget.querySelector('.checkbox').checked;
        this.list[indexOfItemToChange].completed === false ?
            this.incompleteTaskCounter.increase() :
            this.incompleteTaskCounter.decrease();
        this.saveTaskList();
    }

    findTask = (event) => {
        return this.list.indexOf(this.list.find(element => element.task === event.currentTarget.querySelector('.main__task-list__item__task').textContent));
    }

    saveTaskList = () => {
        localStorage.setItem('taskList', JSON.stringify(this.list));
    }
}