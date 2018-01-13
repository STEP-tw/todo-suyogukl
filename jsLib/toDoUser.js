const ToDoList = require('./listOfToDo.js');
class User {
  constructor(name,password,userName) {
    this.name=name;
    this.password=password;
    this.userName=userName;
    this.usersTODO=[];
  }
  addUsersTODO(title,discription=''){
    this.usersTODO[title]=new ToDoList(title,discription);
    return;
  }
  removeUsersTODO(todo){
    delete this.usersTODO[todo.title];
  }
}
module.exports = User;
