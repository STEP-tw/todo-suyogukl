class RedirectionHandler {
  constructor() {
  }
  execute(req, res) {
    if (req.urlIsOneOf(['/', '/addTodo', '/login']) && req.user) {
      res.redirect('/addTodo.html');
    } else if (req.urlIsOneOf(['/addTodo', '/logout', "/homePage"]) && !req.user) {
      res.redirect('/login');
    }
  }
  getRequestHandler(){
    return this.execute.bind(this);
  }
}

module.exports = RedirectionHandler