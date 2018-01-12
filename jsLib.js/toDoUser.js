const ToDoList = require('./listOfToDo.js');
class User {
  constructor(name,password) {
    this.name=name;
    this.password=password;
    this.usersTODO={};
  }
  addUsersTODO(title,discription=''){
    this.usersTODO[title]=new ToDoList(title,discription);
    return;
  }
  removeUsersTODO(todo){
    delete this.usersTODO[todo.title];
  }
}
