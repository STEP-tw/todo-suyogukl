const Item=require('./toDoItems.js');
class ToDoList {
  constructor(title,description) {
    this.title=title;
    this.description=description||'';
    this.toDoItems={};
  }
  addTitle(title){
    return this.title=title;
  }
  addDescription(description){
    return this.description=description;
  }
  addtoDoItem(item){
    this.toDoItems[`${item.text}`]=new Item(item);
    return;
  }
  get getToDoItem(){
    return this.toDoItems;
  }
  get getTitle(){
    return this.title;
  }
  get getDescription(){
    return this.description;
  }
  deleteToDoItem(text){
    delete this.toDoItems[text];
  }
  isTODOItemDone(todoItem){
    return this.toDoItems[todoItem].isDone();
  }
  markAsToDoDone(todoItem){
    this.toDoItems[todoItem].markDone();
  }
  markAsToDoNotDone(toDoItem){
    this.toDoItem[toDoItem].markNotDone();
  }
}
module.exports = ToDoList;
