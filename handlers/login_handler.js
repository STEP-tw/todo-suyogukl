class LoginHandler {
  constructor() {
  }
  execute(req, res) {
    let loginPage = req.app.fs.readFileSync(`./public/login.html`, 'utf8');
    loginPage = loginPage.replace('message', req.cookies.message || '');
    res.statusCode=200;
    res.setHeader('Content-type', 'text/html');
    res.write(loginPage);
    res.end();
  }
  getRequestHandler(){
    return this.execute.bind(this);
  }
}

module.exports = LoginHandler;