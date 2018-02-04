const changeStatus = function(){
  let url = "/markdone";
  let inbox = event.target;
  let todoAndItemId = inbox.parentNode.className.split("_");
  if(inbox.className=="checked")url="/markUndone"
  let todoId = todoAndItemId[0];
  let itemId = todoAndItemId[1];
  let itemData = `todoId=${todoId}&itemId=${itemId}`;
  sendAJAXReq(url,"POST",itemData,function(){
    if(inbox.className=="checked")return inbox.className=""
    return inbox.className="checked";
  })
}

const deleteItem = function (todoAndItemId){
  let itemAndTodoId = todoAndItemId.split("_");
  let todoId = itemAndTodoId[0];
  let itemId = itemAndTodoId[1];
  let itemData = `todoId=${todoId}&itemId=${itemId}`
  sendAJAXReq('/deleteItem', "POST", itemData, function(){
    let divToDelete = document.getElementsByClassName(todoAndItemId)[0];
    divToDelete.remove();
  })
}
const getEditItemForm = function (id) {
  return `
    Text:<input id="${id}" type="text" name="text" value="">
    <button type="button" name="editItem">edit item</button>`
}
const showEditFormForItem = function (id) {
  // let todoId = id.split("todo=")[1];
  let div = document.getElementsByClassName('editItemForm')[0];
  let editForm = getEditItemForm(todoId);
  div.innerHTML = editForm;
  document.getElementsByName("editItem")[0].onclick = () => {
    editItem(todoId);
  }
}
const editItem = function (itemId) {
  let title = document.getElementsByName("title")[0].value;
  let description = document.getElementsByName("description")[0].value;
  let data = `id=${itemId}&Text=${title}`;
  sendAJAXReq("/editItem", "POST", data, function () {
    let div = document.getElementsByClassName('editItemForm')[0];
    div.style.visibility = "hidden"
  })
}
