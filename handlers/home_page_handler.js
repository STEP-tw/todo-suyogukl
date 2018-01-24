const ToDoHandler = require('./todo_action_handler');
const toHtml = require("../toHtml/toHtml.js");
class HomePageHandler extends ToDoHandler{
  constructor () {
    super();
  }
  execute(req,res){
    if(!req.user) return;
    let user = req.app.user;
    let todos = user.titlesWithIDs;
    let html = toHtml.todos(todos);
    let home = req.app.temp["homeTemp"];
    home = home.replace("todoHolder", html);
    home = home.replace("${name}", req.user.userName);
    res.setHeader('Content-type', 'text/html');
    res.write(home);
    res.end();
  }
}
module.exports = HomePageHandler;
