const TodoActionHandler = require('./todo_action_handler');
const toHtml = require("../toHtml/toHtml");
class TodoItemHandler extends TodoActionHandler {
  constructor(action) {
    super()
    this.action = action;
  }
  execute(req, res) {
    let action = actions[this.action];
    if (req.user) action.call(this, req, res);
  }
}
const actions = {
  "markAsDone":function(req,res){
    let todoId = req.body.todoId;
    let itemId = req.body.itemId;
    let user = req.app.user;
    if(user.markAsDone(todoId,itemId)) return res.send()
    return res.status(410).end();
  },
  "markUndone":function(req,res){
    let todoId = req.body.todoId;
    let itemId = req.body.itemId;
    let user = req.app.user;
    if (user.markAsNotDone(todoId, itemId)) return res.send()
    return res.status(410).end();
  },
  "deleteItem":function(req,res){
    let todoId = req.body.todoId;
    let itemId = req.body.itemId;
    let user = req.app.user;
    if (user.deleteTodoItem(todoId, itemId)) return res.send()
    return res.status(410).end();
  }
}
module.exports = TodoItemHandler;
