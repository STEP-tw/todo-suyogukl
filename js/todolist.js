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
    return this.getItem(id).updateText(textToUpdate);
  }
  getItem(id){
    return this.toDoItems.find((a)=>a.id==id);
  }
  getItemText(id){
    return this.getItem(id).text;
  }
  removeItem(id){
    let index=this.toDoItems.findIndex((a)=>a.id==id);
    if(index==-1)return false;
    this.toDoItems.splice(index,1);
    return true;
  }
  getItemStatus(itemId){
    return this.getItem(itemId).status;
  }
  changeStatusAsDone(itemId){
    let item = this.getItem(itemId);
    if(item){
      this.getItem(itemId).markDone();
      return true;
    }
  }
  changeStatusAsNotDone(itemId){
    let item = this.getItem(itemId);
    if (item) {
      this.getItem(itemId).markNotDone();
      return true;
    }
  }
}
module.exports = ToDo;
