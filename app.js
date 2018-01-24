let fs = require('fs');
const app = require("express")();
const urlIsOneOf = require("./router").urlIsOneOf;
const cookieParser = require('cookie-parser')
const bodyParser  = require("body-parser");
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
let registered_users = [{userName:'suyog',name:'suyog ukalkar',password:'a'}];
let todoTemp = fs.readFileSync("./templates/todoList", "utf8");
const compositeHandler = new CompositeHandler()
  .addHandler(new LogRequestHandler(fs))
  .addHandler(new LoadUserHandler(registered_users))
  .addHandler(new RedirectionHandler())
  .addHandler(new StaticFileHandler(fs, "public"))
  .addHandler(new RenderTodoHandler(todoTemp))

let homeTemp = fs.readFileSync("./templates/home","utf8");
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req,res,next)=>{
  req.urlIsOneOf = urlIsOneOf.bind(req);
  next();
})
app.use(cookieParser());
app.use(compositeHandler.getRequestHandler());
app.post("/deleteTodo", new TodoListHandler("delete").getRequestHandler());
app.post("/addTodo", new TodoListHandler("addTodo").getRequestHandler());
app.post("/addItem", new TodoListHandler("addItem").getRequestHandler());
app.post("/editTodo", new TodoListHandler("editTodo").getRequestHandler());
app.get('/login',new LoginHandler(fs).getRequestHandler());
app.post('/login', new PostLoginHandler(fs,registered_users).getRequestHandler());
app.get('/homePage',new HomePageHandler(homeTemp).getRequestHandler());
app.get('/logout',new LogoutHandler().getRequestHandler());
module.exports = app;
