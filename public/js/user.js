const ToDoList = require('./todolist.js');
class User {
  constructor(name,password,userName) {
    this.name=name;
    this.password=password;
    this.userName=userName;
    this.usersTODO=[];
    this.toDoId=0;
  }
  addUsersTODO(title,discription=''){
    return this.usersTODO.push(new ToDoList(title,discription,++this.toDoId));
  }
  removeUsersTODO(todo){
    delete this.usersTODO[this.toDoId];
  }

}
module.exports = User;
