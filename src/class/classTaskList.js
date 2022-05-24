export { TaskList };

import { IncompleteTaskCounter } from './classIncompleteTaskCounter.js';
import { createTaskListElement } from '../dom.js'

class TaskList {
    constructor() {
        if (!this.checkIfTaskListExist()) {
            localStorage.setItem('taskList', '[]');
        };
        this.list = JSON.parse(localStorage.getItem('taskList'))
        console.log(JSON.parse(localStorage.getItem('taskList')))
        this.createTaskListElement();
        this.incompleteTaskCounter = new IncompleteTaskCounter(this.list);
        console.log('hello', this.incompleteTaskCounter.value)
    }

    addTask = (taskItem) => {
        this.list.push(taskItem);
        if (taskItem.completed === false) {
            this.incompleteTaskCounter.increase();
        }
        this.saveTaskList();
        // console.log(taskItem.completed, this.incompleteTaskCounter.value)
    }

    removeTask = (event) => {
        const indexOfItemToRemove = this.findTask(event);
        // console.log(itemToRemove);
        if (this.list[indexOfItemToRemove].completed === false) {
            this.incompleteTaskCounter.decrease();
        }

        console.log('1', this.incompleteTaskCounter.value);
        this.list.splice(indexOfItemToRemove, 1);
        this.saveTaskList();
    }

    createTaskListElement = () => {
        console.log(this)
        this.list.map((taskItem) => {
            createTaskListElement(taskItem);
        })
    }

    checkIfTaskListExist = () => {
        if (localStorage.getItem('taskList') === null) {
            return false;
        }
        return true;
    }

    changeTaskStatus = (event) => {
        const indexOfItemToChange = this.findTask(event);
        this.list[indexOfItemToChange].completed = event.currentTarget.querySelector('.checkbox').checked;
        if (this.list[indexOfItemToChange].completed === false) {
            this.incompleteTaskCounter.increase();
        } else {
            this.incompleteTaskCounter.decrease();
        }
        this.saveTaskList();
        console.log(this.incompleteTaskCounter.value)
    }

    findTask = (event) => {
        return this.list.indexOf(this.list.find(element => element.task === event.currentTarget.querySelector('.main__task-list__item__task').textContent));
    }

    saveTaskList = () => {
        console.log('zapisz')
        localStorage.setItem('taskList', JSON.stringify(this.list));
    }


}