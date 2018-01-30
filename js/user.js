const ToDo = require('./todolist.js');
class User {
  constructor(name, password) {
    this._name = name;
    this._password = password;
    this.todos = [];
    this.toDoId = 0;
  }
  get name() {
    return this._name;
  }
  get password() {
    return this._password;
  }
  get titlesWithIDs() {
    return this.todos.map(function (todo) {
      return {
        id: todo.id,
        title: todo.title
      }
    })
  }
  get allToDo() {
    return this.todos;
  }
  addTodo(title, discription = '') {
    this.todos.push(new ToDo(title, discription, ++this.toDoId));
  }
  addItem(todoId, text) {
    let todo = this.getTodo(todoId);
    return todo.addItem(text)[0];
  }
  removeTodo(id) {
    let index = this.todos.findIndex((a) => a.id == +id);
    if (index == -1) return false;
    this.todos.splice(index, 1);
    return true;
  }
  getAllTodoTitles() {
    return this.todos.map((a) => a.title);
  }
  getTodo(id) {
    return this.todos.find((a) => a.id == id);
  }
  getTodoTitle(id) {
    let todo = this.getTodo(id);
    return todo.title;
  }
  editTodo(id, title, description) {
    this.updateTitleOfTodo(id, title);
    this.updateDescription(id, description);
  }
  updateTitleOfTodo(id, title) {
    let todo = this.getTodo(id);
    todo.updateTitle(title);
  }
  updateDescription(id, description) {
    let todo = this.getTodo(id);
    todo.updateDescription(description);
  }
  getItemsOfTodo(id) {
    let todo = this.getTodo(id);
    return todo.items;
  }
  getItemsText(id) {
    return this.getItemsOfTodo(id).map((a) => a.text);
  }
  markAsDone(todoId, itemId) {
    let todo = this.getTodo(todoId);
    return todo.changeStatusAsDone(itemId);
  }
  markAsNotDone(todoId, itemId) {
    let todo = this.getTodo(todoId);
    return todo.changeStatusAsNotDone(itemId);
  }
  deleteTodoItem(todoId, itemId){
    let todo = this.getTodo(todoId);
    return todo.removeItem(itemId);
  }
}
module.exports = User;
