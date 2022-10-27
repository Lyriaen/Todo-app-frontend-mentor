export { handleDragStart, handleDragOver, handleDragEnd }

const handleDragStart = (event) => {
    const draggedElement = event.currentTarget
    draggedElement.classList.add('dragged')
    draggedElement.style.opacity = '0.3';
    lastMousePosition = { y: event.clientY }
}

const handleDragOver = (event) => {
    event.preventDefault();
    const taskListContainer = event.target.closest('ul')
    const draggedElement = document.querySelector('.dragged')
    const overElement = event.currentTarget
    const directionOfMove = checkMouseMove(event)
    if (draggedElement !== overElement) {
        if (directionOfMove === 'down') {
            taskListContainer.insertBefore(overElement, draggedElement)
            return
        }
        if (directionOfMove === 'up') {
            taskListContainer.insertBefore(draggedElement, overElement)
        }
    }
}

let lastMousePosition = { y: null }

const checkMouseMove = (event) => {
    const currentMousePosition = event.clientY
    const differanceInPosition = currentMousePosition - lastMousePosition.y
    const direction = differanceInPosition > 0 ? 'down'
        : differanceInPosition < 0 ? 'up'
            : ''
    lastMousePosition = { y: currentMousePosition }
    return direction
}

const handleDragEnd = (event) => {
    const draggedElement = event.currentTarget
    draggedElement.classList.remove('dragged')
    draggedElement.style = '';
    lastMousePosition = { y: null }
}