class ToDoItem {
  constructor (text,id) {
    this._text = text;
    this._status=false;
    this._id=id;
  }
  get id(){
    return this._id;
  }
  get text(){
    return this._text;
  }
  get status(){
    return this._status;
  }
  updateText(textToUpdate){
    return this._text=textToUpdate;
  }
  markDone(){
    this._status = true;
  }
  markNotDone(){
    this._status=false;
  }
}

module.exports = ToDoItem;
