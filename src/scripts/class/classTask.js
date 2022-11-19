export { Task };

class Task {
    constructor( completed, content ) {
        this.completed = completed;
        this.content = content;
    }

    changeCompletedStatus() {
        this.completed = !this.completed;
    }
}