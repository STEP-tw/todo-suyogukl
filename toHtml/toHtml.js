exports.todos = (todos)=>{
  return todos.map(exports.toAnchor).join("<br>");
}
exports.toAnchor = (todo)=>{
  return `<li><a href="todo${todo.id}">${todo.title}</a></li>`;
}
