import { refreshIncompleteTaskCounterElement } from '../dom.js';
import { Task } from "./classTask";

export class IncompleteTaskCounter {
    private value = 0

    constructor( taskList: Task[] ) {
        this.value = taskList.reduce( ( sum: number , element: Task ) => element.completed ? sum : ++sum , 0 );
        refreshIncompleteTaskCounterElement( this.value );
    }

    increase = () => {
        ++this.value;
        refreshIncompleteTaskCounterElement( this.value );
    };

    decrease = () => {
        --this.value;
        refreshIncompleteTaskCounterElement( this.value );
    };
}
