class LoadUserHandler {
  constructor() {
  }
  execute(req, res) {
    let sessionid = req.cookies.sessionid;
    let user = req.app.registered_users.find(u => u.sessionid == sessionid);
    if (sessionid && user) {
      req.user = user;
    }
  }
  getRequestHandler() {
    return this.execute.bind(this);
  }
}

module.exports = LoadUserHandler;