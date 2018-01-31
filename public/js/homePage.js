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

const newElement = function() {
  let title = document.getElementById("inputTitle").value;
  let desc = document.getElementById("inputDesc").value;
  if(desc==""||title=="")return
  let data = `title=${title}&description=${desc}`;
  sendAJAXReq("/addTodo","POST",data,function(){
    window.location.href = this.responseURL;
  })
}
