const ToDoHandler = require('./todo_action_handler');
const toHtml = require("../toHtml/toHtml.js");
class HomePageHandler extends ToDoHandler{
  constructor (temp) {
    super();
    this.temp=temp;
  }
  execute(req,res){
    if(!req.user) return;
    let todos = this.user.titlesWithIDs;
    let html = toHtml.todos(todos);
    let home = this.temp;
    home = home.replace("todoHolder", html);
    home = home.replace("${name}", req.user.userName);
    res.setHeader('Content-type', 'text/html');
    res.write(home);
    res.end();
  }
}
module.exports = HomePageHandler;
