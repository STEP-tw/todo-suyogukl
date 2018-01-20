class LoadUserHandler {
  constructor(allowedUsers) {
    this.registered_users = allowedUsers;
  }
  execute(req, res) {
    let sessionid = req.cookies.sessionid;
    let user = this.registered_users.find(u => u.sessionid == sessionid);
    if (sessionid && user) {
      req.user = user;
    }
  }
  getRequestHandler() {
    return this.execute.bind(this);
  }
}

module.exports = LoadUserHandler;