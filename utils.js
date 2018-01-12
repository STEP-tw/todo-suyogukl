let docType={
  'html': 'text/html',
  'css' : 'text/css',
  'jpg' : 'image/jpg',
  'gif' : 'image/gif',
  'pdf' : 'application/pdf',
  'js' : 'text/javascript',
  'json':'text/javascript',
  'ico':'image/x-icon'
};

let displayContents=function(fileSystem,getDocType,getFilePath,file){
  let type=docType[getDocType];
  let content=fileSystem.readFileSync(getFilePath);
  this.writeHead(200,{'Content-Length': content.length,
  'Content-Type':type});
  debugger;
  this.write(content);
  this.end();
};
exports.displayContents=displayContents;
