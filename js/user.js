const ToDo = require('./todolist.js');
class User {
  constructor(name,password) {
    this.myName=name;
    this.myPassword=password;
    this.todos=[];
    this.toDoId=0;
  }
  get name(){
    return this.myName;
  }
  get password(){
    return this.myPassword;
  }
  get allToDo(){
    return this.todos;
  }
  addUserToDo(title,discription=''){
    this.todos.push(new ToDo(title,discription,++this.toDoId));
  }
  removeUserToDo(id){
    let index=this.todos.findIndex((a)=>a.toDoId==id);
    this.todos.splice(index,1);
  }
  getAllTodoTitles(){
    return this.todos.map((a)=>a.title);
  }
  getSpecificTodo(id){
    return this.todos.find((a)=>a.id==id);
  }
  getSpecificTodoTitle(id){
    let todo=this.getSpecificTodo(id);
    return todo.title;
  }
  updateTitleOfTodo(id,title){
    let todo=this.getSpecificTodo(id);
    todo.updateTitle(title);
  }
  getItemsOfSpecificTodo(id){
    let todo=this.getSpecificTodo(id);
    return todo.items;
  }
}
module.exports = User;
