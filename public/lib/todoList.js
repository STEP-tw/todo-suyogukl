const doXmlReq = function (options, reqListener) {
  let xml = new XMLHttpRequest();
  xml.open(options.method, options.url);
  xml.addEventListener("load", reqListener);
  xml.send(options.data);
}

const deleteTodo = function(id){
  let options = {
    method:"POST",
    url:"/deleteTodo",
    data:id
  }
  doXmlReq(options,function(){
    window.location.href = this.responseURL;
  })
}


const addItem = function(id){
  let text = document.getElementsByName("addItem")[0].value;
  let postData = `${id}&text=${text}`;
  let options = {
    method:"POST",
    url:"/addItem",
    data:postData
  }
  doXmlReq(options,function(){
    let div = document.getElementsByClassName("todoItem")[0];
    div.innerHTML+=this.responseText;
  })
}
