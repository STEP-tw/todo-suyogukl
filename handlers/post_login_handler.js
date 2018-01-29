class PostLoginHandler {
  constructor() {
  }
  execute(req, res) {
    let user = req.app.registered_users.find(u => {
      return u.userName == req.body.userName;
    });
    if (user) {
      let userName = req.body.userName;
      let sessionid = req.app.sessionManager.createSession(userName);
      res.setHeader('Set-Cookie', `sessionid=${sessionid}`);
      res.redirect('/homePage');
      return
    }
    res.setHeader('Set-Cookie', `message=Login Failed; Max-Age=5`);
    res.redirect('/login');
    return;
  }
  getRequestHandler() {
    return this.execute.bind(this);
  }
}
module.exports = PostLoginHandler;
