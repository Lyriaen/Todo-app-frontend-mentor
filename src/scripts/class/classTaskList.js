import { IncompleteTaskCounter } from "./classIncompleteTaskCounter.js";
import { createTaskListElement, removeTaskItemElement } from "../dom.js";
import { Task } from "./classTask.js";

export { TaskList };

class TaskList {
    constructor() {
        if (!this.checkIfTaskListExist()) {
            localStorage.setItem('taskList', '[]');
        }
        const temp = JSON.parse(localStorage.getItem('taskList'));
        this.list = temp.map(task => new Task(task.completed, task.task));
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
        const taskText = event.currentTarget.querySelector('.main__task-list__item__task').textContent;
        const indexOfItemToRemove = this.findIndex(taskText);
        if (!this.list[indexOfItemToRemove].completed) {
            this.incompleteTaskCounter.decrease();
        }
        this.removeTaskOnIndexFromList(indexOfItemToRemove);
    }

    removeTaskOnIndexFromList = (indexOfItemToRemove) => {
        this.list.splice(indexOfItemToRemove, 1);
        this.saveTaskList();
    }

    findIndex = (taskText) => {
        const index = this.list.map(taskOfList => taskOfList.task).indexOf(taskText);
        return index;
    }

    clearComplete = (taskText) => {
        const indexOfItemToRemove = this.findIndex(taskText);
        this.removeTaskOnIndexFromList(indexOfItemToRemove);
    }

    createTaskList = () => {
        this.list.map((taskItem, index) => {
            createTaskListElement(taskItem, index);
        })
    }

    checkIfTaskListExist = () => {
        return localStorage.getItem('taskList') === null ? false : true;
    }

    changeTaskStatus = (event) => {
        const newCompletedStatus = event.currentTarget.querySelector('.checkbox').checked;
        const taskText = event.currentTarget.querySelector('.main__task-list__item__task').textContent;
        const indexOfItemToChange = this.findIndex(taskText);
        const taskToChange = this.list[indexOfItemToChange]
        taskToChange.changeCompletedStatus(newCompletedStatus)
        newCompletedStatus ?
            this.incompleteTaskCounter.decrease() :
            this.incompleteTaskCounter.increase();
        this.saveTaskList();
    }

    saveTaskList = () => {
        localStorage.setItem('taskList', JSON.stringify(this.list));
    }
}