const TodoActionHandler = require('./todo_action_handler');
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
      let objectives = items.map(x=>x.text).join("<br>");
      let html = this.template.replace("${todoItem}",objectives);
      html = html.replace("${todo}",`todo=${id}`);
      res.write(html);
      res.end();
    }
  }
}

module.exports = RenderTodoHandler
