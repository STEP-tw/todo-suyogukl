class PostLoginHandler {
  constructor(fs, allowedUsers) {
    this.fs = fs;
    this.registered_users = allowedUsers;
  }
  execute(req, res) {
    let sessionid = new Date().getTime();
    let user = this.registered_users.find(u => {
      return u.userName == req.body.userName;
    });
    if (user) {
      res.setHeader('Set-Cookie', `sessionid=${sessionid}`);
      user.sessionid = sessionid;
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
