exports.todos = (todos)=>{
  return todos.map(exports.toAnchor).join("<br>");
}
exports.toAnchor = (todo)=>{
  return `<li><a href="todo_${todo.id}">${todo.title}</a></li>`;
}
exports.toInput = (todoItem,todoId)=>{
  if(todoItem.status) status = "checked"
  else status = "";
  return `<input id=${todoId}_${todoItem.id} type="checkbox" ${status} onclick="changeStatus(this.id)" value="">${todoItem.text}<br>`;
}