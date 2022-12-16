export { Task };

class Task {
    constructor( public completed: boolean , public content: string ) {
    }

    changeCompletedStatus() {
        this.completed = !this.completed;
    }
}