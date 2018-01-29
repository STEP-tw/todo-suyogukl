const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')
const LoginHandler = require("./handlers/login_handler");
const PostLoginHandler = require("./handlers/post_login_handler");
const HomePageHandler = require("./handlers/home_page_handler");
const LogoutHandler = require("./handlers/logout_handler");
const LogRequestHandler = require("./handlers/log_request_handler");
const LoadUserHandler= require("./handlers/load_user_Handler");
const RedirectionHandler = require("./handlers/redirection_handler");
const TodoListHandler = require("./handlers/todo_list_handler");
const CompositeHandler = require("./handlers/composite_handler");
const RenderTodoHandler = require("./handlers/todo_render_handler");

const compositeHandler = new CompositeHandler()
.addHandler(new LogRequestHandler())
.addHandler(new LoadUserHandler())
.addHandler(new RedirectionHandler())

app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.use((req,res,next)=>{
  req.urlIsOneOf = function (urls) {
    return urls.includes(this.url);
  }
  next();
})

app.use(cookieParser());
app.use(compositeHandler.getRequestHandler());
app.use(new RenderTodoHandler().getRequestHandler());
app.post("/deleteTodo", new TodoListHandler("delete").getRequestHandler());
app.post("/addTodo", new TodoListHandler("addTodo").getRequestHandler());
app.post("/addItem", new TodoListHandler("addItem").getRequestHandler());
app.post("/editTodo", new TodoListHandler("editTodo").getRequestHandler());
app.get('/login',new LoginHandler().getRequestHandler());
app.post('/login', new PostLoginHandler().getRequestHandler());
app.get('/homePage', new HomePageHandler().getRequestHandler());
app.get('/logout',new LogoutHandler().getRequestHandler());
module.exports = app;
