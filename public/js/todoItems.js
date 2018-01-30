const changeStatus=function(todoAndItemId){
  todoAndItemId = todoAndItemId.split("_");
  let url = "/markUndone";
  let inbox = event.target;
  if (inbox.checked) url = "/markdone"
  let todoId = todoAndItemId[0];
  let itemId = todoAndItemId[1];
  let itemData = `todoId=${todoId}&itemId=${itemId}`
  sendAJAXReq(url,"POST",itemData,()=>{return;})
}

deleteItem = function (todoAndItemId){
  let itemAndTodoId = todoAndItemId.split("_");
  let todoId = itemAndTodoId[0];
  let itemId = itemAndTodoId[1];
  let itemData = `todoId=${todoId}&itemId=${itemId}`
  sendAJAXReq('/deleteItem', "POST", itemData, function(){
    let divToDelete = document.getElementsByClassName(todoAndItemId)[0];
    divToDelete.remove();
  })
}