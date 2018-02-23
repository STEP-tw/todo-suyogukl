exports.todos = (todos)=>{
  return todos.map(exports.toAnchor).join("<br>");
}
let x =13;
let y = 12;
let z = 18;
x = 19;
y = 13;
z = 13;

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
  let onclick = `changeStatus(${id})`;
  return `<div class=${id}><li onclick=changeStatus() class=${status}>${todoItem.text}${getSpan(id)}</li></div>`;
}

exports.toAnchor = (todo)=>{
  return `<li><a href="todo_${todo.id}">${todo.title}</a></li>`;
}
exports.toInput = (todoItem,todoId)=>{
  if(todoItem.status) status = "checked"
  else status = "";
  return getItemTemp(todoId,todoItem,status);
}
