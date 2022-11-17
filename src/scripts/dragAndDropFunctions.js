import { taskList } from "./data.js"

export { handleDragStart, handleDragOver, handleDragEnd }

let lastMousePosition = { y: null }

const handleDragStart = (event) => {
    const draggedElement = event.target;
    draggedElement.classList.add('dragged');
    draggedElement.style.opacity = '0.3';
    lastMousePosition = { y: event.clientY };
}

const handleDragOver = (event) => {
    event.preventDefault();
    const taskListContainer = event.target.closest('ul');

    const draggedElement = document.querySelector('.dragged');
    const overElement = event.target.parentElement.parentElement;
    if (overElement.tagName === "LI" && draggedElement.tagName === "LI") {
        const directionOfMove = checkMouseMove(event);
        if (draggedElement !== overElement) {
            if (directionOfMove === 'down') {
                taskListContainer.insertBefore(overElement, draggedElement);
            }
            if (directionOfMove === 'up') {
                taskListContainer.insertBefore(draggedElement, overElement);
            }
            taskList.swapTasks(draggedElement, overElement);
        };
    }
}

const checkMouseMove = (event) => {
    const currentMousePosition = event.clientY;
    const differanceInPosition = currentMousePosition - lastMousePosition.y;
    const direction = differanceInPosition > 0 ? 'down'
        : differanceInPosition < 0 ? 'up'
            : '';
    lastMousePosition = { y: currentMousePosition };
    return direction;
}

const handleDragEnd = (event) => {
    const draggedElement = event.target;
    draggedElement.classList.remove('dragged');
    draggedElement.style = '';
    lastMousePosition = { y: null };
}