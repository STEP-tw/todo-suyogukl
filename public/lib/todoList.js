const deleteTodo = function(id){
  let xml = new XMLHttpRequest();
  xml.open("POST","/deleteTodo");
  xml.addEventListener("load",function(){
    return
  })
  xml.send("itemId=1");
}