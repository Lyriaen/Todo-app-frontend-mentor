import { taskList } from './data.js';

export { handleDragStart , handleDragOver , handleDragEnd };

let lastMousePosition = { y: 0 };

const handleDragStart = ( event: MouseEvent ) => {
    const draggedElement = event.target as HTMLElement;
    draggedElement.classList.add( 'dragged' );
    draggedElement.style.opacity = '0.3';
    lastMousePosition = { y: event.clientY };
};

const handleDragOver = ( event: MouseEvent ) => {
    event.preventDefault();
    const element = event.target as HTMLElement;
    const taskListContainer = element.closest( 'ul' ) as HTMLUListElement;
    const draggedElement = document.querySelector( '.dragged' );
    const overElement = element.parentElement?.parentElement;
    if ( overElement?.tagName === 'LI' && draggedElement?.tagName === 'LI' ) {
        const directionOfMove = checkMouseMove( event );
        if ( draggedElement !== overElement ) {
            if ( directionOfMove === 'down' ) {
                taskListContainer.insertBefore( overElement , draggedElement );
            }
            if ( directionOfMove === 'up' ) {
                taskListContainer.insertBefore( draggedElement , overElement );
            }
            taskList.swapTasks( draggedElement.textContent as string , overElement.textContent as string );
        }
    }
};

const checkMouseMove = ( event: MouseEvent ) => {
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

const handleDragEnd = ( event: Event ) => {
    const draggedElement = event.target as HTMLLIElement;
    draggedElement.classList.remove( 'dragged' );
    draggedElement.setAttribute( 'style' , '' );
    lastMousePosition = { y: 0 };
};