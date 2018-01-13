class ToDoItem {
    constructor (text) {
    this.text = text;
    this.status=false;
    }
    isDone(){
        return this.status;
    }
    markDone(){
        this.status = true;
        return;
    }
    markNotDone(){
        this.status=false;
        return;
    }
}

module.exports = ToDoItem;
