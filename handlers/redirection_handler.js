class RedirectionHandler {
  constructor() {
  }
  valid(req){
    let regex = new RegExp(/^\/todo[1-9]+$|^\/item[1-9]+$/);
    return regex.test(req.url)&& !req.user;
  }
  execute(req, res) {
    if (this.valid(req)) {
      res.redirect("/login");
    }
    else if (req.urlIsOneOf(['/addTodo','/deleteTodo','/addTodo.html', '/logout', "/homePage"]) && !req.user) {
      res.redirect('/login');
    }
  }
  getRequestHandler() {
    return this.execute.bind(this);
  }
}

module.exports = RedirectionHandler