class User {
  constructor(name,password) {
    this.name=name;
    this.password=password;
    this.usersTODO={};
  }
  addUsersTODO(todo){
    return this.usersTODO[`${todo.title}`]=todo;
  }
  removeUsersTODO(todo){
    delete this.usersTODO[todo.title];
  }
}
