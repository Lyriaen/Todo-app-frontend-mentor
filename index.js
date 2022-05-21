import { taskList } from './src/loadDate.js'
import { createLiElement } from './src/dom-manipulation.js'
import { Task } from './src/taskClass.js';

export { saveTaskList };

const addTaskButton = document.querySelector('.main__form-contanier__submit-button');

const saveTaskList = () => {
    localStorage.setItem('taskList', JSON.stringify(taskList));
}

addTaskButton.addEventListener('click', (event) => {
    event.preventDefault();
    const newItemForm = document.forms.newItemForm;
    if (newItemForm.task.value === '') {
        alert('Task is empty');
        return;
    }
    const taskItem = new Task(newItemForm.checkbox.checked, newItemForm.task.value);
    createLiElement(taskItem);
    taskList.push(taskItem);
    saveTaskList();
    newItemForm.task.value = '';
    newItemForm.checkbox.checked = false;

})