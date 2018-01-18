class ToDoItem {
  constructor (text,id) {
    this.text = text;
    this.status=false;
    this.id=id;
  }
  get itsId(){
    return this.id;
  }
  get itsText(){
    return this.text;
  }
  get itsStatus(){
    return this.status;
  }
  updateText(textToUpdate){
    return this.text=textToUpdate;
  }
  markDone(){
    this.status = true;
  }
  markNotDone(){
    this.status=false;
  }
}

module.exports = ToDoItem;
