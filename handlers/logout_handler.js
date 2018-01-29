class LogoutHandler {
  constructor() {
  }
  execute(req, res) {
    let sessionid = req.cookies.sessionid;
    res.setHeader('Set-Cookie', [`loginFailed=false,Expires=${new Date(1).toUTCString()}`, `sessionid=0,Expires=${new Date(1).toUTCString()}`]);
    if (req.user) req.app.sessionManager.deleteSession(sessionid);
    res.redirect('/login');
  }
  getRequestHandler() {
    return this.execute.bind(this);
  }
}

module.exports = LogoutHandler
