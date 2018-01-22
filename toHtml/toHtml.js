exports.todos = (todos)=>{
  return todos.map(exports.toAnchor).join("<br>");
}
exports.toAnchor = (todo)=>{
  return `<li><a href="todo_${todo.id}">${todo.title}</a></li>`;
}
exports.toInput = (todoItem)=>{
  return `<input id=${todoItem.id} type="checkbox" name="" value="${todoItem.id}">${todoItem.text}<br>`;
}
