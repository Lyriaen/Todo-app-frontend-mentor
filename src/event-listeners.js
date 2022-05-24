import { taskList } from "./data.js";
import { createTaskListElement } from './dom.js'
import { Task } from './class/classTask.js'
export { removeTaskItemContainerElement }

const addTaskButton = document.querySelector('.main__form-contanier__submit-button');


addTaskButton.addEventListener('click', (event) => {
    event.preventDefault();
    const newItemForm = document.forms.newItemForm;
    if (newItemForm.task.value === '') {
        alert('Task is empty');
        return;
    }
    const taskItem = new Task(newItemForm.checkbox.checked, newItemForm.task.value);
    createTaskListElement(taskItem);
    taskList.addTask(taskItem);

    //clear-form
    newItemForm.task.value = '';
    newItemForm.checkbox.checked = false;

})

const removeTaskItemContainerElement = (event) => {
    if ((event.target.tagName === 'P')) {
        event.currentTarget.querySelector('.checkbox').checked = (event.currentTarget.querySelector('.checkbox').checked) ? false : true;
        taskList.changeTaskStatus(event);
        return;
    }
    // taskList.splice(taskList.indexOf(taskList.find((element) =>{
    //     return element.task === event.currentTarget.
    // })),1)
    //console.log(event.currentTarget.querySelector('.main__task-list__item__task').textContent)
    if ((event.target.tagName === 'BUTTON')) {
        event.currentTarget.parentElement.removeChild(event.currentTarget);
        taskList.removeTask(event);
        // const itemToRemove = findTask(event);
        // taskList.splice(itemToRemove, 1);

        // saveTaskList();
    }
}

// window.onbeforeunload = () => {
//     saveTaskList();
// }