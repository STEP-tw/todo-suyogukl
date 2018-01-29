class LoadUserHandler {
  constructor() {
  }
  execute(req, res) {
    let sessionId = req.cookies.sessionid;
    if (sessionId && req.app.sessionManager.isLoggedIn(sessionId)){
      let user = req.app.sessionManager.getUserBySessionId(sessionId);
      req.user = user;
    }
  }
  getRequestHandler() {
    return this.execute.bind(this);
  }
}

module.exports = LoadUserHandler;