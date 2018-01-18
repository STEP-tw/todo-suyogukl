const fs = require('fs');
const ToDo = require('./js/todolist.js');

let docType={
  'html': 'text/html',
  'css' : 'text/css',
  'jpg' : 'image/jpg',
  'jpeg':'image/jpg',
  'gif' : 'image/gif',
  'pdf' : 'application/pdf',
  'js' : 'text/javascript',
  'json':'text/javascript',
  'ico':'image/x-icon'
};

let serveFile=function(req,res){
  let path=req.url;
  if(path=='/')path='/index.html';
  debugger;
  if(fs.existsSync(`./public${path}`)&&req.method!='POST'){
    let getDocType=path.split('.')[1];
    let getFilePath=`./public${path}`;
    let type=docType[getDocType];
    let content=fs.readFileSync(getFilePath);
    res.setHeader("Content-Type",type);
    res.statusCode = 200;
    debugger;
    res.write(content);
    res.end();
  }
}

let storeToDos=function(req,res){
  let todo=req.body;
  todo.Date=new Date().toLocaleString();
  let fileData=fs.readFileSync('./data/toDoDatabase.json','utf8');
  console.log(fileData);
  let parsedData = fileData&&JSON.parse(fileData)||[];
  let comment=new ToDo(todo.title,todo.description);
  parsedData[0].todoLists.unshift(comment);
  let comments=JSON.stringify(parsedData);
  fs.writeFileSync('./data/toDoDatabase.json',comments);
}

let showTODO=function(){
  let fileData=fs.readFileSync('./data/toDoDatabase.json','utf8');
  let content='';
  let data=fileData[0].todoLists;
  console.log(data);
  for(let ii=0;ii<data.length;ii++){
    let title=data[ii];
    content+`<a href="/todolist/alltodo.html?title=${title}">${title}</a><br>`
  }
  return content;
}
exports.storeToDos=storeToDos;
exports.showTODO=showTODO;
exports.serveFile=serveFile;
