export { Task };

class Task {
    constructor(completed, task) {
        this.completed = completed;
        this.task = task;
    }

    changeCompletedStatus(newStatus) {
        this.completed = newStatus
    }
}