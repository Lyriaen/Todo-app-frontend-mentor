import { createTaskListElement } from '../dom.js';
import { IncompleteTaskCounter } from './classIncompleteTaskCounter.js';
import { Task } from './classTask.js';
export { TaskList };
class TaskList {
    constructor() {
        this.addTask = (taskItem) => {
            this.list.push(taskItem);
            if (!taskItem.completed) {
                this.incompleteTaskCounter.increase();
            }
            this.saveTaskList();
        };
        this.removeTask = (event) => {
            var _a;
            const element = event.target;
            const indexOfItemToRemove = this.findIndexOfElement((_a = element.parentElement) === null || _a === void 0 ? void 0 : _a.textContent);
            if (!this.list[indexOfItemToRemove].completed) {
                this.incompleteTaskCounter.decrease();
            }
            this.removeTaskOnIndexFromList(indexOfItemToRemove);
        };
        this.removeTaskOnIndexFromList = (indexOfItemToRemove) => {
            this.list.splice(indexOfItemToRemove, 1);
            this.saveTaskList();
        };
        this.findIndexOfElement = (taskContent) => {
            return this.list.map(task => task.content).indexOf(taskContent);
        };
        this.clearComplete = (taskText) => {
            const indexOfItemToRemove = this.findIndexOfElement(taskText);
            this.removeTaskOnIndexFromList(indexOfItemToRemove);
        };
        this.createTaskList = () => {
            this.list.map((taskItem) => {
                createTaskListElement(taskItem);
            });
        };
        this.checkIfTaskExist = (taskText) => {
            return this.findIndexOfElement(taskText) !== -1;
        };
        this.checkIfTaskListExist = () => {
            return localStorage.getItem('taskList') !== null;
        };
        this.changeTaskStatus = (taskElement) => {
            const taskTextContainer = taskElement.querySelector('.main__task-list__item__task');
            const indexOfItemToChange = this.findIndexOfElement(taskTextContainer.textContent);
            const taskToChange = this.list[indexOfItemToChange];
            taskToChange.changeCompletedStatus();
            const taskCheckbox = taskElement.querySelector('.checkbox');
            taskCheckbox.checked ?
                this.incompleteTaskCounter.decrease() :
                this.incompleteTaskCounter.increase();
            this.saveTaskList();
        };
        this.saveTaskList = () => {
            localStorage.setItem('taskList', JSON.stringify(this.list));
        };
        this.swapTasks = (draggedElement, overElement) => {
            const draggedElementIndex = this.findIndexOfElement(draggedElement);
            const overElementIndex = this.findIndexOfElement(overElement);
            const temp = this.list[draggedElementIndex];
            this.list[draggedElementIndex] = this.list[overElementIndex];
            this.list[overElementIndex] = temp;
            this.saveTaskList();
        };
        if (this.checkIfTaskListExist()) {
            const temp = JSON.parse(localStorage.getItem('taskList'));
            this.list = temp.map((task) => new Task(task.completed, task.content));
            this.createTaskList();
        }
        else {
            this.list = [];
            this.saveTaskList();
        }
        this.incompleteTaskCounter = new IncompleteTaskCounter(this.list);
    }
}
