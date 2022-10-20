import { refreshIncompleteTaskCounterElement } from "../dom.js";

export { IncompleteTaskCounter };

class IncompleteTaskCounter {
    constructor(taskList) {
        this.value = taskList.reduce((sum, element) => element.completed ? sum : ++sum, 0);
        refreshIncompleteTaskCounterElement(this.value);
    }

    increase = () => {
        ++this.value;
        refreshIncompleteTaskCounterElement(this.value);
    }

    decrease = () => {
        --this.value;
        refreshIncompleteTaskCounterElement(this.value);
    }
}