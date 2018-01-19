const ToDoHandler = require('./todo_action_handler');
const toHtml = require("../toHtml/toHtml.js");
class HomePageHandler extends ToDoHandler{
  constructor (temp) {
    super();
    this.temp=temp;
  }
  execute(req,res){
    let todos = this.user.titlesWithIDs;
    let html = toHtml.todos(todos);
    let home = this.temp;
    home = home.replace("todoHolder", html);
    home = home.replace("${name}", this.user.name);
    res.setHeader('Content-type', 'text/html');
    res.write(home);
    res.end();
  }
}
module.exports = HomePageHandler;
