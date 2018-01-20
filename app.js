let fs = require('fs');
const LoginHandler = require("./handlers/login_handler");
const PostLoginHandler = require("./handlers/post_login_handler");
const StaticFileHandler = require("./handlers/static_file_handler");
const HomePageHandler = require("./handlers/home_page_handler");
const timeStamp = require('./time.js').timeStamp;
const storeToDos = require('./utils.js').storeToDos;
const TODOApp = require('./todoApp.js');
let toS = o=>JSON.stringify(o,null,2);
let registered_users = [{userName:'suyog',name:'suyog ukalkar',password:'a'},{userName:'shubham',name:'shubham jaybhaye',password:'shubham'}];

let logRequest = (req,res)=>{
  let text = ['------------------------------',
    `${timeStamp()}`,
    `${req.method} ${req.url}`,
    `HEADERS=> ${toS(req.headers)}`,
    `COOKIES=> ${toS(req.cookies)}`,
    `BODY=> ${toS(req.body)}`,''].join('\n');
  fs.appendFile('request.log',text,()=>{});
}
let loadUser = (req,res)=>{
  let sessionid = req.cookies.sessionid;
  let user = registered_users.find(u=>u.sessionid==sessionid);
  if(sessionid && user){
    req.user = user;
  }
};
let redirectLoggedInUserToHome = (req,res)=>{
  if(req.urlIsOneOf(['/','/addTodo','/login']) && req.user) res.redirect('/addTodo.html');
}
let redirectLoggedOutUserToLogin = (req,res)=>{
  if(req.urlIsOneOf(['/addTodo','/logout',"/homePage"]) && !req.user) res.redirect('/login');
}


const servePostAddTodoPage=(req,res)=>{
  console.log(req.method);
  console.log(req.headers);
  console.log(req.body);
  res.redirect('/addTodo');
}
const serveLogOut=(req,res)=>{
  res.setHeader('Set-Cookie',[`loginFailed=false,Expires=${new Date(1).toUTCString()}`,`sessionid=0,Expires=${new Date(1).toUTCString()}`]);
  delete req.user.sessionid;
  res.redirect('/login');
}

let homeTemp = fs.readFileSync("./templates/home","utf8");

let app = TODOApp.create();
app.use(logRequest);
app.use(loadUser);
app.use(redirectLoggedInUserToHome);
app.use(redirectLoggedOutUserToLogin);
app.use(new StaticFileHandler(fs,"public").getRequestHandler());
app.get('/login',new LoginHandler(fs).getRequestHandler());
app.post('/login', new PostLoginHandler(fs,registered_users).getRequestHandler());
app.get('/homePage',new HomePageHandler(homeTemp).getRequestHandler());
app.get('/logout',serveLogOut);

module.exports = app;
