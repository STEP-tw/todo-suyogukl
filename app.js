let fs = require('fs');
const LoginHandler = require("./handlers/login_handler");
const PostLoginHandler = require("./handlers/post_login_handler");
const StaticFileHandler = require("./handlers/static_file_handler");
const HomePageHandler = require("./handlers/home_page_handler");
const LogoutHandler = require("./handlers/logout_handler");
const LogRequestHandler = require("./handlers/log_request_handler");
const LoadUserHandler= require("./handlers/load_user_Handler");
const RedirectionHandler = require("./handlers/redirection_handler");
const CompositeHandler = require("./handlers/composite_handler");
const timeStamp = require('./time.js').timeStamp;
const storeToDos = require('./utils.js').storeToDos;
const app = require('./router.js').create();
let registered_users = [{userName:'suyog',name:'suyog ukalkar',password:'a'},{userName:'shubham',name:'shubham jaybhaye',password:'shubham'}];
const compositeHandler = new CompositeHandler()
  .addHandler(new LogRequestHandler(fs))
  .addHandler(new LoadUserHandler(registered_users))
  .addHandler(new RedirectionHandler())
  .addHandler(new StaticFileHandler(fs, "public"))

const servePostAddTodoPage=(req,res)=>{
  console.log(req.method);
  console.log(req.headers);
  console.log(req.body);
  res.redirect('/addTodo');
}


let homeTemp = fs.readFileSync("./templates/home","utf8");
app.use(compositeHandler.getRequestHandler());
app.get('/login',new LoginHandler(fs));
app.post('/login', new PostLoginHandler(fs,registered_users));
app.get('/homePage',new HomePageHandler(homeTemp));
app.get('/logout',new LogoutHandler());

module.exports = app;
