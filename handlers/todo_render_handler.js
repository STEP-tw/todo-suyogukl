const isValidUrl = (url) => {
  let regex = new RegExp(/^\/item[1-9]+$/);
  return regex.test(url);
}
const TodoActionHandler = require('./todo_action_handler');
class RenderTodoHandler extends TodoActionHandler {
  constructor (todoTemplate) {
    super()
    this.template = todoTemplate;
  }
  execute(req,res){
    let url=req.url;
    if(isValidUrl(url)){
      let id =url.split('item')[1];
      let items=this.user.getItemsOfTodo(+id);
      let objectives = items.map(x=>x.text).join("<br>");
      let html = this.template.replace("${todoItem}",objectives);
      res.write(html);
      res.end();
    }
  }
}

module.exports = RenderTodoHandler
