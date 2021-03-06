class RedirectionHandler {
  constructor() {
  }
  inValid(req){
    let regex = new RegExp(/^\/todo_[1-9]+$|^\/item_[1-9]+$/);
    return regex.test(req.url)&& !req.user;
  }
  execute(req, res) {
    if (this.inValid(req)) {
      res.redirect("/login");
    }
    else if (req.urlIsOneOf(['/addTodo','/deleteTodo','/addTodo.html','/', "/homePage"]) && !req.user) {
      res.redirect('/login');
    }else if (req.url =="/"&&req.user) {
      res.redirect('/homePage');
    }
  }
  getRequestHandler() {
    return this.execute.bind(this);
  }
}

module.exports = RedirectionHandler
