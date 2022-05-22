import { Task } from './classTask.js'
import { createTaskListElement } from './dom.js'

export { taskList, addTaskToList, changeTaskStatus, removeTaskFromList }
export { incompleteTaskCount, increaseIncompleteTask, decreaseIncompleteTask }


const createTaskList = () => {
    taskList.map((taskItem) => {
        createTaskListElement(taskItem);
    })
}

const loadTaskList = () => {
    if (!checkIfTaskListExist()) {
        localStorage.setItem('taskList', '[]');
    };
    return JSON.parse(localStorage.getItem('taskList'))
}

const checkIfTaskListExist = () => {
    if (localStorage.getItem('taskList') === null) {
        return false;
    }
    return true;
}

const addTaskToList = (taskItem) => {
    taskList.push(taskItem);
    saveTaskList();
}

const removeTaskFromList = (event) => {
    const itemToRemove = findTask(event);
    taskList.splice(itemToRemove, 1);

    saveTaskList();
}

const changeTaskStatus = (event) => {
    const itemToChange = findTask(event);
    taskList[itemToChange].completed = event.currentTarget.querySelector('.checkbox').checked;
    saveTaskList();
}

const saveTaskList = () => {
    localStorage.setItem('taskList', JSON.stringify(taskList));
}

const findTask = (event) => {
    return taskList.indexOf(taskList.find(element => element.task === event.currentTarget.querySelector('.main__task-list__item__task').textContent))
}

const countIncompleteTask = () => {
    return taskList.reduce((sum, element) => { console.log(sum); return element.completed ? sum : ++sum }, 0);
}

const increaseIncompleteTask = () => {
    return ++incompleteTaskCount;
}
const decreaseIncompleteTask = () => {
    return --incompleteTaskCount;
}

const taskList = loadTaskList();
let incompleteTaskCount = countIncompleteTask();

createTaskList();