const Item=require('./toDoItem.js');
class ToDoList {
  constructor(todoTitle,todoDescription,id) {
    this.todoTitle=todoTitle;
    this.todoDescription=todoDescription||'';
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
    return this.toDoItems.push(new Item(item,++this.itemId));
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
  getSpecificItem(text){
    return this.toDoItems.find((a)=>a.text==text);
  }
  getItemStatus(todoItem){
    return this.getSpecificItem(todoItem).getStatus;
  }
  changeStatusAsDone(todoItem){
    this.getSpecificItem(todoItem).markDone();
  }
  changeStatusAsNotDone(todoItem){
    this.getSpecificItem(todoItem).markNotDone();
  }
}
module.exports = ToDoList;
