class RedirectionHandler {
  constructor() {
  }
  execute(req, res) {
    if (req.urlIsOneOf(['/addTodo','/addTodo.html', '/logout', "/homePage"]) && !req.user) {
      res.redirect('/login');
    }
  }
  getRequestHandler() {
    return this.execute.bind(this);
  }
}

module.exports = RedirectionHandler