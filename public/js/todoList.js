const sendAJAXReq = function(url, method, data, callBack) {
  let xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      callBack.call(this);
    }
  };
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
