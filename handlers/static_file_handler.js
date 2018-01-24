class StaticFileHandler {
  constructor(fs, root) {
    this.fs = fs;
    this.root = root;
  }
  getContentType(filePath) {
    let extension = filePath.slice(filePath.lastIndexOf("."));
    let contentTypes = {
      '.html': 'text/html',
      '.css': 'text/css',
      '.jpg': 'image/jpg',
      '.jpeg': 'image/jpg',
      '.gif': 'image/gif',
      '.pdf': 'application/pdf',
      '.js': 'text/javascript',
      '.json': 'text/javascript',
      '.ico': 'image/x-icon'
    };
    return contentTypes[extension];
  }
  execute(req, res) {
    if (req.url == '/') req.url = '/index.html';
    let content
    let path = this.root+req.url
    let contentType = this.getContentType(path);
    try {
      content = this.fs.readFileSync(path);
    } catch (error) {
      return
    }
    res.setHeader("Content-Type", contentType);
    res.write(content)
    res.end();
  }
  getRequestHandler(){
    return this.execute.bind(this);
  }
}

module.exports = StaticFileHandler;