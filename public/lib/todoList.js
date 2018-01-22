const deleteTodo = function(id){
  let xml = new XMLHttpRequest();
  xml.open("POST","/deleteTodo");
  xml.onload = function(){
    window.location.href = xml.responseURL;
  }
  xml.send(id);
}