import { refreshIncompleteTaskCounterElement } from '../dom.js';
export class IncompleteTaskCounter {
    constructor(taskList) {
        this.value = 0;
        this.increase = () => {
            ++this.value;
            refreshIncompleteTaskCounterElement(this.value);
        };
        this.decrease = () => {
            --this.value;
            refreshIncompleteTaskCounterElement(this.value);
        };
        this.value = taskList.reduce((sum, element) => element.completed ? sum : ++sum, 0);
        refreshIncompleteTaskCounterElement(this.value);
    }
}
