import { taskList } from './data.js';
export { handleDragStart, handleDragOver, handleDragEnd };
let lastMousePosition = { y: 0 };
const handleDragStart = (event) => {
    const draggedElement = event.target;
    draggedElement.classList.add('dragged');
    draggedElement.style.opacity = '0.3';
    lastMousePosition = { y: event.clientY };
};
const handleDragOver = (event) => {
    var _a;
    event.preventDefault();
    const element = event.target;
    const taskListContainer = element.closest('ul');
    const draggedElement = document.querySelector('.dragged');
    const overElement = (_a = element.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement;
    if ((overElement === null || overElement === void 0 ? void 0 : overElement.tagName) === 'LI' && (draggedElement === null || draggedElement === void 0 ? void 0 : draggedElement.tagName) === 'LI') {
        const directionOfMove = checkMouseMove(event);
        if (draggedElement !== overElement) {
            if (directionOfMove === 'down') {
                taskListContainer.insertBefore(overElement, draggedElement);
            }
            if (directionOfMove === 'up') {
                taskListContainer.insertBefore(draggedElement, overElement);
            }
            taskList.swapTasks(draggedElement.textContent, overElement.textContent);
        }
    }
};
const checkMouseMove = (event) => {
    const currentMousePosition = event.clientY;
    const differanceInPosition = currentMousePosition - lastMousePosition.y;
    const direction = differanceInPosition > 0 ?
        'down' :
        differanceInPosition < 0 ?
            'up' :
            '';
    lastMousePosition = { y: currentMousePosition };
    return direction;
};
const handleDragEnd = (event) => {
    const draggedElement = event.target;
    draggedElement.classList.remove('dragged');
    draggedElement.setAttribute('style', '');
    lastMousePosition = { y: 0 };
};
