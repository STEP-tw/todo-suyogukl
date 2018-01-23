const TodoActionHandler = require('./todo_action_handler');
const toHtml = require("../toHtml/toHtml");
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
    if (req.user && !deleted) {
      res.write("false");
      res.end();
      return;
    }
    res.redirect("/homePage");
  },
  "addTodo":function(req,res){
    let title = req.body.title;
    let description = req.body.description;
    let user = req.dummyUser || this.user;
    user.addTodo(title,description);
    res.redirect("/homePage");
  },
  "addItem":function(req,res){
    let user = req.dummyUser || this.user;
    let todoId = req.body.todo;
    let text = req.body.text;
    let addedItem = user.addItem(todoId,text);
    res.write(toHtml.toInput(addedItem));
    res.end();
  },
  'editTodo':function(req,res){
    let user = req.dummyUser || this.user;
    let title=req.body.title;
    let description=req.body.description;
    let todoId=req.body.id;
    let addedItem = user.editTodo(todoId,title,description);
    res.redirect("/homePage");
  }
}

module.exports = TodoListHandler;
