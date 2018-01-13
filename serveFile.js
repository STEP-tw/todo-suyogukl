const fs = require('fs');
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


module.exports=serveFile;
