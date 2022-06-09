import { IncompleteTaskCounter } from './classIncompleteTaskCounter.js';
import { createTaskListElement, removeTaskItemElement } from '../dom.js';

export { TaskList };

class TaskList {
    constructor() {
        if (!this.checkIfTaskListExist()) {
            localStorage.setItem('taskList', '[]');
        };
        this.list = JSON.parse(localStorage.getItem('taskList'));
        this.createTaskList();
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
        //iteration start from end,
        //thanks to this we dont change index of incomplete elements 
        //during removing tasks from original task list
        for (let index = this.list.length - 1; index >= 0; --index) {
            this.list[index];
            if (this.list[index].completed) {
                this.list.splice(index, 1);
                removeTaskItemElement(index);
            }
        }
        this.saveTaskList();
    }

    createTaskList = () => {
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