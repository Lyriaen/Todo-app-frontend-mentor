export { IncompleteTaskCounter };

class IncompleteTaskCounter {
    constructor(taskList) {
        this.value = taskList.reduce((sum, element) => { console.log(sum); return element.completed ? sum : ++sum }, 0);
    }

    increase = () => {
        ++this.value;
        console.log('zwiekszam')
    }

    decrease = () => {
        --this.value;
        console.log('zmiejszam')
    }
}