const TodoActionHandler = require('./todo_action_handler');
const toHtml = require("../toHtml/toHtml");
class RenderTodoHandler extends TodoActionHandler {
  constructor(todoTemplate) {
    super()
  }
  isValid(url) {
    let regex = new RegExp(/^\/todo_[1-9]+$/);
    return regex.test(url);
  }
  hasTodo(id,user) {
    return user.getTodo(id);
  }
  execute(req, res,next) {
    let url = req.url;
    let id = url.split('todo_')[1];
    let user  = req.app.user;
    if (this.isValid(url)&&this.hasTodo(id,user)) {
      let items = user.getItemsOfTodo(+id);
      let title = user.getTodoTitle(+id)
      let objectives = items.map(toHtml.toInput).join("");
      let temp = req.app.temp["todoTemplate"];
      let html = temp.replace("${todoItem}", objectives);
      html = html.replace(/\${todo}/g, `todo=${id}`);
      html = html.replace(/\${title}/, title);
      res.write(html);
      res.end();
    }
    else{
      next()
    }
  }
}

module.exports = RenderTodoHandler
