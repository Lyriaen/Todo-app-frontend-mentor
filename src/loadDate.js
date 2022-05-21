import { Task } from './taskClass.js'
import { createLiElement } from './dom-manipulation.js'

export { taskList, itemsLeftCount, changeCounterContainer }


const checkIfTaskListExist = () => {
    if (localStorage.getItem('taskList') === null) {
        return false;
    }
    return true;
}

const createTaskList = () => {
    if (!checkIfTaskListExist()) {
        localStorage.setItem('taskList', '[]');
    };
    return JSON.parse(localStorage.getItem('taskList'))
}

const taskList = createTaskList();
var itemsLeftCount = taskList.reduce((sum, element) => { console.log(sum); return element.completed ? sum : ++sum }, 0)

const counterContainer = document.querySelector('.main__nav__items-left');
const changeCounterContainer = () => {
    console.log(itemsLeftCount)
    counterContainer.textContent = `${itemsLeftCount} items left`
}
changeCounterContainer();

taskList.map((taskItem) => {
    createLiElement(taskItem);
})
