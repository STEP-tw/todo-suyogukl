class LoadUserHandler {
  constructor() {
  }
  execute(req, res) {
    let isLoggedIn = false;
    let sessionId = req.cookies.sessionid;
    if (sessionId) isLoggedIn = req.app.sessionManager.isLoggedIn(sessionId);
    if (sessionId && isLoggedIn) {
      let user = req.app.sessionManager.getUserBySessionId(sessionId);
      req.user = user;
    }
  }
  getRequestHandler() {
    return this.execute.bind(this);
  }
}

module.exports = LoadUserHandler;