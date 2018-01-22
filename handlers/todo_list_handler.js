const TodoActionHandler = require('./todo_action_handler');
class TodoListHandler extends TodoActionHandler {
  constructor(action) {
    super()
    this.action = action;
  }
  execute(req, res) {
    let action = actions[this.action];
    action.call(this, req, res);
  }
}
let actions = {
  "delete": function (req, res) {
    let todoToDelete = req.body.todo;
    let user = req.dummyUser||this.user;
    let deleted = user.removeTodo(todoToDelete);
    console.log(deleted);
    if (req.user && !deleted) {
      res.write("false");
      res.end();
      return;
    }
    res.redirect("/homePage");
  }
}

module.exports = TodoListHandler;
