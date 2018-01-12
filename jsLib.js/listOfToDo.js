class ToDoList {
  constructor() {
    this.title='';
    this.description='';
    this.toDoItems={};
  }
  addTitle(title){
    return this.title=title;
  }
  addDescription(description){
    return this.description=description;
  }
  addtoDoItem(item){
    return this.toDoItems[`${item.text}`]=item;  
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
}
