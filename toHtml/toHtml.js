exports.todos = (todos)=>{
  return todos.map(exports.toAnchor).join("<br>");
}

const getItemTemp=function(todoId,todoItem,status){
  return ` <div class=${todoId}_${todoItem.id}> <input id=${todoId}_${todoItem.id} type="checkbox" ${status} onclick="changeStatus(this.id)" value="">${todoItem.text}<button id=${todoId}_${todoItem.id} onclick="deleteItem(this.id)">x</button><br></div>`;
}

exports.toAnchor = (todo)=>{
  return `<li><a href="todo_${todo.id}">${todo.title}</a></li>`;
}
exports.toInput = (todoItem,todoId)=>{
  if(todoItem.status) status = "checked"
  else status = "";
  return getItemTemp(todoId,todoItem,status);
}