class ToDoItem {
  constructor (text,id) {
    this.text = text;
    this.status=false;
    this.id=id;
  }
  get getText(){
    return this.text;
  }
  get getStatus(){
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
  get getId(){
    return this.id;
  }
}

module.exports = ToDoItem;
