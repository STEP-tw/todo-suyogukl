const fs = require('fs');


let serveFile=function(req,res){
  console.log('hello')
  let path=req.url;
  if(path=='/')path='/index.html';
  debugger;
  if(fs.existsSync(`./public${path}`)&&req.method!='POST'){
    let getDocType=path.split('.')[1];
    let getFilePath=`./public${path}`;
    res.displayContents(fs,getDocType,getFilePath,path);
  }
}


module.exports=serveFile;
