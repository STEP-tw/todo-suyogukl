exports.todos = (todos)=>{
  return todos.map(exports.toAnchor).join("<br>");
}
exports.toAnchor = (todo)=>{
  return `<li><a href="item${todo.id}">${todo.title}</a></li>`;
}
