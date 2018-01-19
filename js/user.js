const ToDo = require('./todolist.js');
class User {
  constructor(name,password) {
    this._name=name;
    this._password=password;
    this.todos=[];
    this.toDoId=0;
  }
  get name(){
    return this._name;
  }
  get password(){
    return this._password;
  }
  get titlesWithIDs(){
    return this.todos.map(function(todo){
      return {
        id:todo.id,
        title:todo.title
      }  
    })
  }
  get allToDo(){
    return this.todos;
  }
  addTodo(title,discription=''){
    this.todos.push(new ToDo(title,discription,++this.toDoId));
  }
  removeTodo(id){
    let index=this.todos.findIndex((a)=>a.toDoId==id);
    this.todos.splice(index,1);
  }
  getAllTodoTitles(){
    return this.todos.map((a)=>a.title);
  }
  getTodo(id){
    return this.todos.find((a)=>a.id==id);
  }
  getTodoTitle(id){
    let todo=this.getTodo(id);
    return todo.title;
  }
  updateTitleOfTodo(id,title){
    let todo=this.getTodo(id);
    todo.updateTitle(title);
  }
  getItemsOfTodo(id){
    let todo=this.getTodo(id);
    return todo.items;
  }
}
module.exports = User;
