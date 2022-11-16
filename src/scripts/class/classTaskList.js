import { IncompleteTaskCounter } from "./classIncompleteTaskCounter.js";
import { createTaskListElement } from "../dom.js";
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
        const indexOfItemToRemove = this.findIndexOfElement(event.target.parentElement);
        if (!this.list[indexOfItemToRemove].completed) {
            this.incompleteTaskCounter.decrease();
        }
        this.removeTaskOnIndexFromList(indexOfItemToRemove);
    }

    removeTaskOnIndexFromList = (indexOfItemToRemove) => {
        this.list.splice(indexOfItemToRemove, 1);
        this.saveTaskList();
    }

    findIndexOfElement = (element) => {
        const elementText = element.querySelector('.main__task-list__item__task').textContent;
        const elementIndex = this.findIndexByText(elementText);
        return elementIndex;
    }

    findIndexByText = (taskText) => {
        const index = this.list.map(taskOfList => taskOfList.task).indexOf(taskText);
        return index;
    }

    clearComplete = (taskText) => {
        const indexOfItemToRemove = this.findIndexByText(taskText);
        this.removeTaskOnIndexFromList(indexOfItemToRemove);
    }

    createTaskList = () => {
        this.list.map((taskItem, index) => {
            createTaskListElement(taskItem, index);
        })
    }

    checkIfTaskExist = (taskText) => {
        return this.findIndexByText(taskText) === -1 ? false : true;
    }

    checkIfTaskListExist = () => {
        return localStorage.getItem('taskList') === null ? false : true;
    }

    changeTaskStatus = (eventTarget) => {
        const newCompletedStatus = eventTarget.querySelector('.checkbox').checked;
        const indexOfItemToChange = this.findIndexOfElement(eventTarget);
        const taskToChange = this.list[indexOfItemToChange];
        taskToChange.changeCompletedStatus(newCompletedStatus);
        newCompletedStatus ?
            this.incompleteTaskCounter.decrease() :
            this.incompleteTaskCounter.increase();
        this.saveTaskList();
    }

    saveTaskList = () => {
        localStorage.setItem('taskList', JSON.stringify(this.list));
    }

    swapTasks = (draggedElement, overElement) => {
        const draggedElementIndex = this.findIndexOfElement(draggedElement);
        const overElementIndex = this.findIndexOfElement(overElement);
        const temp = this.list[draggedElementIndex];
        this.list[draggedElementIndex] = this.list[overElementIndex];
        this.list[overElementIndex] = temp;
        this.saveTaskList();
    }
}