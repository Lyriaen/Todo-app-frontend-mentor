export { handleDragStart, handleDragOver, handleDragEnd, handleDrop }

const handleDragStart = (event) => {
    const draggedElement = event.currentTarget
    draggedElement.style.opacity = '0.3';
    console.log(draggedElement.id)
    event.dataTransfer.dropEffect = 'move';

    event.dataTransfer.setData('text/plain', draggedElement.innerText)
}

const handleDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
}
const handleDragEnd = (event) => {
    const draggedElement = event.currentTarget
    draggedElement.style.opacity = '1';
    console.log('drag end')
}

const handleDrop = (event) => {
    event.stopPropagation();
    const dropElement = event.currentTarget
    console.log(dropElement)
    console.log('drop')
    const data = event.dataTransfer.getData("text/plain");

    return false;
}