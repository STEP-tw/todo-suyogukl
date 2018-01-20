let fs = require('fs');
const LoginHandler = require("./handlers/login_handler");
const PostLoginHandler = require("./handlers/post_login_handler");
const StaticFileHandler = require("./handlers/static_file_handler");
const HomePageHandler = require("./handlers/home_page_handler");
const LogoutHandler = require("./handlers/logout_handler");
const LogRequestHandler = require("./handlers/log_request_handler");
const LoadUserHandler= require("./handlers/load_user_Handler");
const RedirectionHandler = require("./handlers/redirection_handler");
const TodoListHandler = require("./handlers/todo_list_handler");
const CompositeHandler = require("./handlers/composite_handler");
const RenderTodoHandler = require("./handlers/todo_render_handler");
const storeToDos = require('./utils.js').storeToDos;
const app = require('./router.js').create();
let registered_users = [{userName:'suyog',name:'suyog ukalkar',password:'a'}];
let todoTemp = fs.readFileSync("./templates/todoList", "utf8");
const compositeHandler = new CompositeHandler()
  .addHandler(new LogRequestHandler(fs))
  .addHandler(new LoadUserHandler(registered_users))
  .addHandler(new RedirectionHandler())
  .addHandler(new StaticFileHandler(fs, "public"))
  .addHandler(new RenderTodoHandler(todoTemp))

let homeTemp = fs.readFileSync("./templates/home","utf8");

app.use(compositeHandler);
app.post("/deleteTodo", new TodoListHandler("delete"));
app.get('/login',new LoginHandler(fs));
app.post('/login', new PostLoginHandler(fs,registered_users));
app.get('/homePage',new HomePageHandler(homeTemp));
app.get('/logout',new LogoutHandler());

module.exports = app;
