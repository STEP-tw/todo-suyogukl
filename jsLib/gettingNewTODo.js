// let fillData = function(data){
//   console.log(564454753437345);
//   let todoList = "";
//   data.forEach(element => {
//     let title = element.title;
//     todoList += `<p>
//     <a href="/todolist/GettingNewTODo.html?title=${title}">
//     ${title}
//     </a>     ${element.description}
//     <input type="button" onclick="deleteItem('${title}')"
//         value="delete"></p>`;
//   });
//   document.getElementById('items').innerHTML = todoList;
// }
//
//
//
// let deleteItem = function (title) {
//   let req = new XMLHttpRequest();
//   req.open('delete', `/todolist`);
//   req.addEventListener('load', refresh);
//   req.send(`title=${title}`);
// }
let renderList = function(){
  let response = this.responseText;
  let todoList = JSON.parse(response);
  console.log(todoList,765576);
  // fillData(todoList);
}

let loadTodoList = function(){
  let title = document.getElementById('title').value;
  let desc = document.getElementById('desc').value;
  let req = new XMLHttpRequest();
  req.open('post','/addTodo');
  req.addEventListener('load',renderList);
  req.send(`title=${title}&description=${desc}`);
}

window.onload = loadTodoList;
