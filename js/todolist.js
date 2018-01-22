const Item=require('./toDoItem.js');
class ToDo {
  constructor(title,description,id) {
    this.todoTitle=title;
    this.todoDescription=description||'';
    this.toDoItems=[];
    this.id=id;
    this.itemId=0;
  }
  updateTitle(title){
    return this.todoTitle=title;
  }
  updateDescription(description){
    return this.todoDescription=description;
  }
  addItem(item){
    this.toDoItems.push(new Item(item,++this.itemId));
    return this.toDoItems.slice(-1);
  }
  get items(){
    return this.toDoItems;
  }
  get title(){
    return this.todoTitle;
  }
  get description(){
    return this.todoDescription;
  }
  updateItemText(id,textToUpdate){
    return this.getSpecificItem(id).updateText(textToUpdate);
  }
  getSpecificItem(id){
    return this.toDoItems.find((a)=>a.itsId==id);
  }
  getItemText(id){
    return this.getSpecificItem(id).itsText;
  }
  removeItem(id){
    let index=this.toDoItems.findIndex((a)=>a.itsId==id);
    this.toDoItems.splice(index,1);
  }
  getItemStatus(itemId){
    return this.getSpecificItem(itemId).itsStatus;
  }
  changeStatusAsDone(itemId){
    this.getSpecificItem(itemId).markDone();
  }
  changeStatusAsNotDone(itemId){
    this.getSpecificItem(itemId).markNotDone();
  }
}
module.exports = ToDo;
