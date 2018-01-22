const TodoActionHandler = require('./todo_action_handler');
const toHtml = require("../toHtml/toHtml");
class RenderTodoHandler extends TodoActionHandler {
  constructor (todoTemplate) {
    super()
    this.template = todoTemplate;
  }
  isValid(url){
  let regex = new RegExp(/^\/todo[1-9]+$/);
  return regex.test(url);
}
hasTodo(id){
  return this.user.getTodo(id);
}
  execute(req,res){
    let url=req.url;
    let id =url.split('todo')[1];
    if(this.isValid(url)&&this.hasTodo(id)){
      let items=this.user.getItemsOfTodo(+id);
      let title = this.user.getTodoTitle(+id)
      let objectives = items.map(toHtml.toInput).join("");
      let html = this.template.replace("${todoItem}",objectives);
      html = html.replace(/\${todo}/g,`todo=${id}`);
      html = html.replace(/\${title}/,title);
      res.write(html);
      res.end();
    }
  }
}

module.exports = RenderTodoHandler
