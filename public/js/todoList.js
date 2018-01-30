const sendAJAXReq = function(url, method, data, callBack) {
  let xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      callBack.call(this);
    }
  };
  xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
  xhr.send(data);
}

const deleteTodo = function(id) {
  sendAJAXReq("/deleteTodo", "POST", id, function() {
    window.location.href = this.responseURL;
  })
}


const addItem = function(id) {
  let text = document.getElementsByName("addItem")[0].value;
  let postData = `${id}&text=${text}`;
  sendAJAXReq("/addItem", "POST", postData, function() {
    let div = document.getElementsByClassName("todoItem")[0];
    div.innerHTML += this.responseText;
  })
}

const getEditTodoForm = function(id){
  return `
    Title:<input id="${id}" type="text" name="title" value="">
    Description<input id="${id}" type="text" name="description" value="">
    <button type="button" name="editTodo">edit todo</button>`
}
const showEditForm=function(id){
  let todoId = id.split("todo=")[1];
  let div = document.getElementsByClassName('editForm')[0];
  let editForm = getEditTodoForm(todoId);
  div.innerHTML = editForm;
  document.getElementsByName("editTodo")[0].onclick = ()=>{
    editTodo(todoId);
  }
}

const editTodo = function(todoId){
  let title = document.getElementsByName("title")[0].value;
  let description =document.getElementsByName("description")[0].value;
  let data = `id=${todoId}&title=${title}&description=${description}`;
  sendAJAXReq("/editTodo","POST",data,function(){
    document.getElementById("titleHolder").innerText = title;
    let div = document.getElementsByClassName('editForm')[0];
    div.style.visibility = "hidden"
  })
}
