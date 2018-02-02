exports.todos = (todos)=>{
  return todos.map(exports.toAnchor).join("<br>");
}

const getDeleteButton = function(id){
  return `<button id=${id} onclick="deleteItem(this.id)">x</button>`;
}
const getEditButton = function(id){
  return `<button id=${id} onclick="editItem(this.id)value='edit'>edit</button>`;
}

const getSpan= function(id){
  return `<span id=${id} class="close" onclick="deleteItem(this.id)">X</span>`
}
const getItemTemp=function(todoId,todoItem,status){
  let id = `${todoId}_${todoItem.id}`;
  return `<div class=${id}><li>${todoItem.text}${getSpan(id)}</li></div>`;
}
// const getItemTemp=function(todoId,todoItem,status){
//   let id = `${todoId}_${todoItem.id}`;
//   return `<li class="${id}"><input id=${id} type="checkbox" ${status} onclick="changeStatus(this.id)" value="">${todoItem.text}${getDeleteButton(id)}${getEditButton(id)}"<br></li>`;
// }

exports.toAnchor = (todo)=>{
  return `<li><a href="todo_${todo.id}">${todo.title}</a></li>`;
}
exports.toInput = (todoItem,todoId)=>{
  if(todoItem.status) status = "checked"
  else status = "";
  return getItemTemp(todoId,todoItem,status);
}
